import { Component, OnInit, Input } from '@angular/core';

import { NodeDictionary } from '../models/escher';

@Component({
	selector: 'escher-data',
	templateUrl: './escher-data.component.html',
	styleUrls: ['./escher-data.component.css']
})
export class EscherDataComponent implements OnInit {

	@Input() public analyticsData: NodeDictionary

	dictionaryKeys(): string[] {
		return Object.keys(this.analyticsData);
	}

	constructor() { }

	ngOnInit() {
	}
}
