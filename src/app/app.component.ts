import { Component, NgZone } from '@angular/core';

import { Observable } from 'rxjs';

import { Http } from '@angular/http';

import * as d3 from 'd3';

import { Builder } from 'escher-vis';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	data: any;

	constructor(private http: Http, private zone: NgZone) {

		// Observable.forkJoin([
		// 	this.http.get('http://escher.github.io/1-0-0/5/maps/Escherichia%20coli/e_coli_core.Core%20metabolism.json'),
		// 	this.http.get('http://escher.github.io/1-0-0/5/models/Escherichia%20coli/e_coli_core.json')
		// ]).subscribe(
		// 	(data) => {
		// 		var first = data[0].json();
		// 		var second = data[1].json();

		// 		this.zone.run(() => {
		// 			this.data = first;
		// 			this.model = second;
		// 		});
		// 	});
	}

	fileUploaded(file: File): void {
		let fileReader = new FileReader();

		fileReader.onload = (loadEvent: ProgressEvent) => {
			this.zone.run(() => {
				this.data = JSON.parse(fileReader.result);
			});
		};

		fileReader.readAsText(file);
	}
}
