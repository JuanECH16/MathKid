import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTestComponent } from './game-test.component';

describe('GameTestComponent', () => {
  let component: GameTestComponent;
  let fixture: ComponentFixture<GameTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameTestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
