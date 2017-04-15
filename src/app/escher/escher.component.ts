import { Component, OnInit, ViewChild, Input } from '@angular/core';

import * as d3 from 'd3';

import { Http } from '@angular/http';

import { Builder } from 'escher-vis';

@Component({
	selector: 'escher',
	templateUrl: './escher.component.html',
	styleUrls: ['./escher.component.css']
})
export class EscherComponent implements OnInit {

	@ViewChild('escherHolder') escherHolder;

	private _escherData: any;
	@Input() private options: any;

	constructor() { }

	@Input()
	set escherData(value: any) {
		this._escherData = value;

		this.tryBuildingMap();
	}

	tryBuildingMap(): void {
		if (this._escherData) {
			console.log(Builder(this._escherData, null, null, null, this.getOptions(), d3.select('.escher-holder')[0]));
		}
	}

	getOptions() {
		return {
			...this.options,
			menu: 'zoom',
			first_load_callback: this.onModelLoaded.bind(this)
			// TODO ADD SOME OPTIONS FOR ALL CASES HERE
		}
	}

	onModelLoaded(): void {
		let container = document.querySelector('.escher-container');
		this.escherHolder.nativeElement.appendChild(container);
	}

	ngOnInit() {
	}
}
