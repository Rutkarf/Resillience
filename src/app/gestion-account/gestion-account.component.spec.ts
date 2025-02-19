import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAccountComponent } from './gestion-account.component';

describe('GestionAccountComponent', () => {
  let component: GestionAccountComponent;
  let fixture: ComponentFixture<GestionAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
