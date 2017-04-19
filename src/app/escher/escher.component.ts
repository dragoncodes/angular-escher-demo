import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { EscherDataService } from '../services/escher-data';
import { Builder } from 'escher-vis';

import {
	EscherNodeDictionary,
	EscherNode,
	NodeDictionary,
	ReactionSegment,
	Reaction,
	Gene,
	ReactionDictionary,
	EscherCoreData,
	GeneDuplicationDictionary
} from '../models/escher';

import * as d3 from 'd3';

declare var $: any;

@Component({
	selector: 'app-escher',
	templateUrl: './escher.component.html',
	styleUrls: ['./escher.component.css']
})
export class EscherComponent implements OnInit {

	private escherData: EscherCoreData;

	// Svg related
	public styleOverriden = false;
	public nextColorText = 'Green';

	// EscherDataComponent related
	public analyticsShown = false;
	public analyticsData: NodeDictionary;
	public geneDuplicationData: GeneDuplicationDictionary;

	// Possible nodes connecting path clicked
	private fromNodeNames: string[];
	private toNodeNames: string[];

	// Simple from-to node
	// Some nodes are missing a name
	private fromNodeName: string;
	private toNodeName: string;

	@ViewChild('escherHolder') escherHolder;
	@Input() private options: any;

	constructor(private zone: NgZone, private escherDataService: EscherDataService) { }

	calculateCountPerNodeType(data: EscherNodeDictionary) {
		const analyticsData = <NodeDictionary>{};

		for (const key in data) {

			if (!data.hasOwnProperty(key)) {
				continue;
			}

			const node: EscherNode = data[key];
			const nodeType = node.node_type;

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
		Builder(this.escherDataService.rawData, null, null, this.escherHolder.nativeElement, this.getOptions());
	}

	getOptions(): Object {
		return {
			menu: 'zoom',
			...this.options,
			fill_screen: true,
			first_load_callback: this.onModelLoaded.bind(this)
		};
	}

	onSegmentClicked(segment: ReactionSegment, reaction: Reaction): void {

		const nodes = this.escherData.nodes;

		this.fromNodeName = nodes[segment.from_node_id].name || `${segment.from_node_id}`;
		this.toNodeName = nodes[segment.to_node_id].name || `${segment.to_node_coefficient}`;

		// TODO This needs improvement
		// Doesn't work in all cases

		const segments = reaction.segments;
		const segmentKeys = Object.keys(segments);

		const workSegments: ReactionSegment[] = [];

		for (let i = 0; i < segmentKeys.length; i++) {
			const curSegment = segments[segmentKeys[i]];
			if (!!curSegment.b1) {
				workSegments.push(curSegment);
			}
		}

		workSegments.sort((segmentA, segmentB) => {
			return segmentB.b1.x - segmentA.b1.x;
		});

		const toNodeNames = [];
		const fromNodeNames = [];

		const tempB1 = <{
			x: number;
			y: number;
		}>{ x: 0, y: 0 };

		if (!segment.b1) {
			const arrCoords = $('#s' + `${segment.segment_id} path`).attr('d').split(' ')[0].replace('M', '').split(',');
			tempB1.x = arrCoords[0];
			tempB1.y = arrCoords[1];
		} else {
			tempB1.x = segment.b1.x;
			tempB1.y = segment.b1.y;
		}

		const fromCoef = (segment.from_node_coefficient || 1);

		if (workSegments.length > 1) {

			for (let i = 0; i < workSegments.length; i++) {

				const delta = tempB1.x - workSegments[i].b1.x;

				if (fromCoef < 0) {
					if (delta < 0) {
						continue;
					}
				}

				const fromName = nodes[workSegments[i].from_node_id].name;
				const toName = nodes[workSegments[i].to_node_id].name;

				if (!!fromName) {
					fromNodeNames.push(fromName);
				} else if (!!toName) {
					toNodeNames.push(toName);
				}
			}
		} else {
			// Easy out

			fromNodeNames.push(nodes[workSegments[0].from_node_id].name);
			toNodeNames.push(fromNodeNames[0]);
		}

		this.zone.run(() => {

			if (toNodeNames.length === 0 && reaction.reversibility) {
				toNodeNames.push(fromNodeNames[0]);
			}

			this.fromNodeNames = fromNodeNames;
			this.toNodeNames = toNodeNames;
		});
	}

	calculateGenesDuplications(reactions: { [reactionId: string]: Reaction }): void {
		const genesRes: GeneDuplicationDictionary = {};

		const reactionKeys: string[] = Object.keys(reactions);

		for (let i = 0; i < reactionKeys.length; i++) {
			const reaction = reactions[reactionKeys[i]];
			const genes: Gene[] = reaction.genes;

			for (let j = 0; j < genes.length; j++) {
				const gene = genes[j];
				if (!genesRes[gene.bigg_id]) {
					genesRes[gene.bigg_id] = {
						gene: gene,
						reactionIds: []
					};
				}

				if (genesRes[gene.bigg_id].reactionIds.indexOf(reactionKeys[i]) === -1) {
					genesRes[gene.bigg_id].reactionIds.push(reactionKeys[i]);
				}
			}
		}

		for (const geneKey in genesRes) {
			if (!genesRes.hasOwnProperty(geneKey)) {
				continue;
			}

			if (genesRes[geneKey].reactionIds.length < 2) {
				delete genesRes[geneKey];
			}
		}

		this.geneDuplicationData = genesRes;
	}

	onModelLoaded(): void {

		this.calculateCountPerNodeType(this.escherData.nodes);
		this.calculateGenesDuplications(this.escherData.reactions);

		const reactions = this.escherData.reactions;

		for (const reactionKey in reactions) {

			if (!reactions.hasOwnProperty(reactionKey)) {
				continue;
			}

			const reaction = reactions[reactionKey];

			const segments: { [segmentKey: string]: ReactionSegment } = reaction.segments;

			for (const segmentKey in segments) {

				if (!segments.hasOwnProperty(segmentKey)) {
					continue;
				}

				$('#s' + segmentKey).on('click', this.onSegmentClicked.bind(this, segments[segmentKey], reaction));
			}
		}
	}

	ngOnInit() {

		const escherData = this.escherData = this.escherDataService.coreData;

		if (escherData) {
			this.analyticsShown = true;
		}

		this.tryBuildingMap();
	}
}

