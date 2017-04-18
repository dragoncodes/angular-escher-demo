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

	private infoExpanded: boolean;

	constructor() {
		this.infoExpanded = false;
	}

	expandInfo() {
		this.infoExpanded = !this.infoExpanded;
	}

	ngOnInit() {
	}

}
