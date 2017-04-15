import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

	@Input() fileTypes: string;

	@Output() onFileUpload = new EventEmitter<File>();

	constructor() {
		this.fileTypes = '*';
	}

	fileChange(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];

			this.onFileUpload.emit(file);
		}
	}

	ngOnInit() {
	}
}
