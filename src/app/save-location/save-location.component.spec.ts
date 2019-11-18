import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLocationComponent } from './save-location.component';

describe('SaveLocationComponent', () => {
  let component: SaveLocationComponent;
  let fixture: ComponentFixture<SaveLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
