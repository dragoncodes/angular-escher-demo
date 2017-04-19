import { Component, NgZone } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	data: any;

	constructor(private zone: NgZone) {

	}

	fileUploaded(file: File): void {
		const fileReader = new FileReader();

		fileReader.onload = (loadEvent: ProgressEvent) => {
			this.zone.run(() => {
				this.data = JSON.parse(fileReader.result);
			});
		};

		fileReader.readAsText(file);
	}
}
