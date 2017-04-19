import { Component, OnInit, Input } from '@angular/core';

import { EscherDataService } from '../services/escher-data';

import { GeneDuplicationDictionary, ReactionDictionary, GeneDuplicationObject } from '../models/escher';

@Component({
	selector: 'app-gene-duplication',
	templateUrl: './gene-duplication.component.html',
	styleUrls: ['./gene-duplication.component.css']
})
export class GeneDuplicationComponent implements OnInit {

	public reactions: ReactionDictionary;
	@Input() public geneDuplicationData: GeneDuplicationObject;

	public infoExpanded: boolean;

	constructor(private escherDataService: EscherDataService) { }

	expandInfo(event: Event) {
		this.infoExpanded = !this.infoExpanded;
	}

	ngOnInit() {
		this.reactions = this.escherDataService.coreData.reactions;
		this.infoExpanded = false;
	}
}
