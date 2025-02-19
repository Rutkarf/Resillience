import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticulBGComponent } from './particul-bg.component';

describe('ParticulBGComponent', () => {
  let component: ParticulBGComponent;
  let fixture: ComponentFixture<ParticulBGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticulBGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticulBGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
