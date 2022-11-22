import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxComponent } from './cx.component';

describe('CxComponent', () => {
  let component: CxComponent;
  let fixture: ComponentFixture<CxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
