import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Builder } from 'escher-vis';

import { EscherNodeDictionary, EscherNode, NodeDictionary, ReactionSegment, Reaction } from '../models/escher';

import * as d3 from 'd3';

declare var $: any;

@Component({
	selector: 'escher',
	templateUrl: './escher.component.html',
	styleUrls: ['./escher.component.css']
})
export class EscherComponent implements OnInit {

	public styleOverriden: boolean = false;
	public nextColorText: string = 'Green';

	public analyticsShown: boolean = false;
	public analyticsData: NodeDictionary;

	private fromNodeName: string;
	private toNodeName: string;

	private _escherRawData: any;

	private escherMetadata: {
		homepage: string;
		map_description: string;
		map_id: string;
		map_name: string;
		schema: string;
	};

	private escherSvgData: {
		canvas: Object;
		nodes: { [nodeId: string]: EscherNode };
		reaction: { [reactionId: string]: Reaction }
	}

	@ViewChild('escherHolder') escherHolder;
	@Input() private options: any;

	constructor() { }

	@Input()
	public set escherData(value: Object) {
		this._escherRawData = value;

		if (value) {
			this.analyticsShown = true;
		}

		this.tryBuildingMap();
	}

	public get escherData(): Object {
		return this._escherRawData;
	}

	calculations(data: EscherNodeDictionary) {
		let analyticsData = <NodeDictionary>{};

		for (let key in data) {
			let node: EscherNode = data[key];
			let nodeType = node.node_type;

			if (!analyticsData[nodeType]) {
				analyticsData[nodeType] = {
					count: 0,
					nodes: []
				};
			}

			analyticsData[nodeType].nodes.push(node);
			analyticsData[nodeType].count++;
		}

		this.analyticsData = analyticsData;
	}

	switchColorScheme(event) {

		if (!this.escherData) {
			return;
		}

		$('.escher-svg path').css('stroke', this.styleOverriden ? '' : '#00ff00');

		this.nextColorText = this.styleOverriden ? 'Green' : 'Default';

		this.styleOverriden = !this.styleOverriden;
	}

	tryBuildingMap(): void {
		if (this._escherRawData) {

			this.escherMetadata = this._escherRawData[0];
			this.escherSvgData = this._escherRawData[1];

			Builder(this._escherRawData, null, null, this.escherHolder.nativeElement, this.getOptions());
		}
	}

	getOptions(): Object {
		return {
			...this.options,
			menu: 'zoom',
			fill_screen: true,
			first_load_callback: this.onModelLoaded.bind(this)
			// TODO ADD SOME OPTIONS FOR ALL CASES HERE
		}
	}

	onSegmentClicked(segment: ReactionSegment): void {

		this.fromNodeName = this.escherSvgData.nodes[segment.from_node_id].name || 'unknown';

		this.toNodeName = this.escherSvgData.nodes[segment.to_node_id].name || 'unknown';
	}

	onModelLoaded(): void {

		this.calculations(this.escherData[1].nodes);

		let reactions = this.escherData[1].reactions;

		for (var reactionKey in reactions) {
			let segments: { [segmentKey: string]: ReactionSegment } = reactions[reactionKey].segments;

			for (var segmentKey in segments) {
				$('#s' + segmentKey).on('click', this.onSegmentClicked.bind(this, segments[segmentKey]));
			}
		}
	}

	ngOnInit() {
	}
}

