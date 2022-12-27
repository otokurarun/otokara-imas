import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SongsService } from '../../songs.service';

@Component({
  selector: 'app-live-event-list',
  templateUrl: './live-event-list.component.html',
  styleUrls: ['./live-event-list.component.scss'],
})
export class LiveEventListComponent implements OnInit, OnChanges {
  public liveEvents: any[] = [];

  @Input()
  public brandName: string = '';

  constructor(public songsService: SongsService) {}

  async ngOnInit(): Promise<void> {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  async load() {
    this.liveEvents = await this.songsService.getLiveEventsByBrandName(
      this.brandName
    );
  }
}
