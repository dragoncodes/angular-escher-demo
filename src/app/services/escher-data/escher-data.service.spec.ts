import { TestBed, inject } from '@angular/core/testing';

import { EscherDataService } from './escher-data.service';

describe('EscherDataService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EscherDataService]
		});
	});

	it('should ...', inject([EscherDataService], (service: EscherDataService) => {
		expect(service).toBeTruthy();
	}));
});
