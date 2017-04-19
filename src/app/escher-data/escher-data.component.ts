import { Component, OnInit, Input } from '@angular/core';

import { EscherDataService } from '../services/escher-data';

import { NodeDictionary, GeneDuplicationDictionary, Gene, Reaction, ReactionDictionary, } from '../models/escher';

@Component({
	selector: 'app-escher-data',
	templateUrl: './escher-data.component.html',
	styleUrls: ['./escher-data.component.css']
})
export class EscherDataComponent implements OnInit {

	@Input() public analyticsData: NodeDictionary;
	@Input() public geneDuplicationData: GeneDuplicationDictionary;

	public reactions: ReactionDictionary;

	dictionaryKeys(dictionary): string[] {
		return Object.keys(dictionary);
	}

	constructor(private escherDataService: EscherDataService) { }

	ngOnInit() {
		this.reactions = this.escherDataService.coreData.reactions;
	}
}
