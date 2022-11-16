import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpboxComponent } from './helpbox.component';

describe('HelpboxComponent', () => {
  let component: HelpboxComponent;
  let fixture: ComponentFixture<HelpboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
