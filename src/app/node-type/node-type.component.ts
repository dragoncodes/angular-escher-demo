import { Component, OnInit, Input } from '@angular/core';
import { NodeData } from '../models/escher';

@Component({
	selector: 'node-type',
	templateUrl: './node-type.component.html',
	styleUrls: ['./node-type.component.css']
})
export class NodeTypeComponent implements OnInit {

	@Input() public name: string;
	@Input() public node: NodeData;

	constructor() { }

	ngOnInit() {
	}

}
