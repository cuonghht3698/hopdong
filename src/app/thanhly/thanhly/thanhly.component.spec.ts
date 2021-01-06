import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhlyComponent } from './thanhly.component';

describe('ThanhlyComponent', () => {
  let component: ThanhlyComponent;
  let fixture: ComponentFixture<ThanhlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanhlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
