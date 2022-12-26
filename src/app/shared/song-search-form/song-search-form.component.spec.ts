import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSearchFormComponent } from './song-search-form.component';

describe('SongSearchFormComponent', () => {
  let component: SongSearchFormComponent;
  let fixture: ComponentFixture<SongSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
