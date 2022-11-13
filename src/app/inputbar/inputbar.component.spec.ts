import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputbarComponent } from './inputbar.component';

describe('InputbarComponent', () => {
  let component: InputbarComponent;
  let fixture: ComponentFixture<InputbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
