import { Injectable, EventEmitter } from '@angular/core';

import { EscherNode, EscherCoreData, EscherMetadata } from '../../models';

export interface DataLoadedListener {
	onEscherDataLoaded(escherCoreData: EscherCoreData);
}

@Injectable()
export class EscherDataService {

	private _escherMetadata: EscherMetadata;
	private _escherCoreData: EscherCoreData;

	constructor() { }

	public set rawData(rawEscherData: any) {
		if (rawEscherData && rawEscherData[0] && rawEscherData[1]) {
			this._escherMetadata = rawEscherData[0];
			this._escherCoreData = rawEscherData[1];
		}
	}

	public get rawData(): any {
		return [this._escherMetadata, this._escherCoreData];
	}

	public get coreData(): EscherCoreData {
		return this._escherCoreData;
	}
}
