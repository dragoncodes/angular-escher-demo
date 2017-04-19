import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneDuplicationComponent } from './gene-duplication.component';

describe('GeneDuplicationComponent', () => {
	let component: GeneDuplicationComponent;
	let fixture: ComponentFixture<GeneDuplicationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GeneDuplicationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GeneDuplicationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
