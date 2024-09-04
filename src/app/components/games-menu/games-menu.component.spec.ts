import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMenuComponent } from './games-menu.component';

describe('GamesMenuComponent', () => {
  let component: GamesMenuComponent;
  let fixture: ComponentFixture<GamesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
