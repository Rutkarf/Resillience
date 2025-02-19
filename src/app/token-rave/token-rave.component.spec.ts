import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRaveComponent } from './token-rave.component';

describe('TokenRaveComponent', () => {
  let component: TokenRaveComponent;
  let fixture: ComponentFixture<TokenRaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenRaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenRaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
