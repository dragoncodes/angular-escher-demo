import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Http } from '@angular/http';

import { Builder } from 'escher-vis';

@Component({
	selector: 'escher',
	templateUrl: './escher.component.html',
	styleUrls: ['./escher.component.css']
})
export class EscherComponent implements OnInit {

	@ViewChild('escherHolder') escherHolder;

	private _escherModel: any;
	private _escherData: any;
	@Input() private options: any;

	constructor() { }

	@Input()
	set escherData(value: any) {
		this._escherData = value;

		this.tryBuildingMap();
	}

	@Input()
	set escherModel(value: any) {
		this._escherModel = value;

		this.tryBuildingMap();
	}

	tryBuildingMap(): void {
		if (this._escherData && this._escherModel) {
			console.log(this._escherData, this._escherModel);
			Builder(this._escherData, this._escherModel, null, null, this.getOptions(), this.escherHolder.nativeElement);
		}
	}

	getOptions() {
		return {
			...this.options
			// TODO ADD SOME OPTIONS FOR ALL CASES HERE
		}
	}

	ngOnInit() {
	}
}
