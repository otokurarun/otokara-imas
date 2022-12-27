import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSearchPageComponent } from './song-search-page.component';

describe('SongSearchPageComponent', () => {
  let component: SongSearchPageComponent;
  let fixture: ComponentFixture<SongSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
