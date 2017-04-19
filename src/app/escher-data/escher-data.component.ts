import { Component, OnInit, Input } from '@angular/core';

import { NodeDictionary, GeneDuplicationDictionary, Gene, Reaction, ReactionDictionary } from '../models/escher';

@Component({
	selector: 'app-escher-data',
	templateUrl: './escher-data.component.html',
	styleUrls: ['./escher-data.component.css']
})
export class EscherDataComponent implements OnInit {

	@Input() public analyticsData: NodeDictionary;
	@Input() public geneDuplicationData: GeneDuplicationDictionary;
	@Input() public reactions: ReactionDictionary;

	dictionaryKeys(dictionary): string[] {
		return Object.keys(dictionary);
	}

	constructor() { }

	ngOnInit() {
	}
}
