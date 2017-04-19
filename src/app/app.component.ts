import { Component, NgZone } from '@angular/core';

import { EscherDataService } from './services/escher-data';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	data: any;

	constructor(private zone: NgZone, private escherDataService: EscherDataService) {

	}

	fileUploaded(file: File): void {
		const fileReader = new FileReader();

		fileReader.onload = (loadEvent: ProgressEvent) => {
			this.zone.run(() => {

				this.data = JSON.parse(fileReader.result);
				this.escherDataService.rawData = this.data;

			});
		};

		fileReader.readAsText(file);
	}
}
