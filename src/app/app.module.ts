import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EscherComponent } from './escher/escher.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EscherDataComponent } from './escher-data/escher-data.component';
import { NodeTypeComponent } from './node-type/node-type.component';
import { GeneDuplicationComponent } from './gene-duplication/gene-duplication.component';

@NgModule({
	declarations: [
		AppComponent,
		EscherComponent,
		FileUploadComponent,
		EscherDataComponent,
		NodeTypeComponent,
		GeneDuplicationComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
