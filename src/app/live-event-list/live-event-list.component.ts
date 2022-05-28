import { Component, Input, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-live-event-list',
  templateUrl: './live-event-list.component.html',
  styleUrls: ['./live-event-list.component.scss'],
})
export class LiveEventListComponent implements OnInit {
  public liveEvents: any[] = [];

  @Input()
  public brandName: string = '';

  constructor(public songsService: SongsService) {}

  async ngOnInit(): Promise<void> {
    this.liveEvents = await this.songsService.getLiveEventsByBrandName(
      this.brandName
    );
  }
}
