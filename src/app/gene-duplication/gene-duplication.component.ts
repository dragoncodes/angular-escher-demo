import { Component, OnInit, Input } from '@angular/core';
import { GeneDuplicationDictionary, ReactionDictionary, GeneDuplicationObject } from '../models/escher';

@Component({
	selector: 'app-gene-duplication',
	templateUrl: './gene-duplication.component.html',
	styleUrls: ['./gene-duplication.component.css']
})
export class GeneDuplicationComponent implements OnInit {

	@Input() public reactions: ReactionDictionary;
	@Input() public geneDuplicationData: GeneDuplicationObject;

	public infoExpanded: boolean;

	constructor() { }

	expandInfo(event: Event) {
		this.infoExpanded = !this.infoExpanded;
	}

	ngOnInit() {
		this.infoExpanded = false;
	}

}
