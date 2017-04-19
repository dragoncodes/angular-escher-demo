import { Component, OnInit, Input } from '@angular/core';
import { NodeData } from '../models/escher';

@Component({
	selector: 'app-node-type',
	templateUrl: './node-type.component.html',
	styleUrls: ['./node-type.component.css']
})
export class NodeTypeComponent implements OnInit {

	@Input() public name: string;
	@Input() public nodeData: NodeData;

	public infoExpanded: boolean;

	constructor() {
		this.infoExpanded = false;
	}

	expandInfo(event: Event) {
		this.infoExpanded = !this.infoExpanded;
	}

	ngOnInit() {
	}

}
