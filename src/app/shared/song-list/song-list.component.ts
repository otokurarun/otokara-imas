import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../../songs.service';
import { SearchParams, SearchType, SortType } from './search';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit, OnChanges {
  // 検索モード
  @Input()
  public searchType: SearchType;

  // 検索パラメータ
  @Input()
  public searchParams: SearchParams;

  // ソート
  @Input()
  public sortType?: SortType;

  // 検索結果
  public songs?: any[] = undefined;

  constructor(private songsService: SongsService) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {
    this.load();
  }

  /**
   * "@Input" で指定されたプロパティが変更されたときの処理
   * @param changes 変更内容
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  /**
   * 楽曲の検索パラメータによって検索処理を実行
   */
  public async load() {
    this.songs = undefined;

    // キーワードがあれば、楽曲の検索処理を実行
    if (this.searchType == 'keyword' && this.searchParams.keyword) {
      this.songs = await this.songsService.getSongsByKeyword(
        this.searchParams.keyword
      );
    }

    // 曲名があれば、楽曲の検索処理を実行
    if (this.searchType == 'songName' && this.searchParams.songName) {
      this.songs = await this.songsService.getSongsBySongName(
        this.searchParams.songName
      );
    }

    // ライブイベントのIDがあれば、楽曲の検索処理を実行
    if (this.searchType == 'liveEvent' && this.searchParams.liveEventId) {
      this.songs = await this.songsService.getSongsByLiveEventId(
        this.searchParams.liveEventId
      );
    }

    // ブランド名があれば、楽曲の検索処理を実行
    if (this.searchType == 'all' && this.searchParams.brandName) {
      this.songs = await this.songsService.getSongsByBrandName(
        this.searchParams.brandName
      );
    }

    if (!this.songs) {
      return;
    }

    // 配信が新しい順にソート
    if (this.sortType && this.sortType == 'newer') {
      this.songs.sort((a: any, b: any) => {
        if (!a.damReleaseDate) return -1;
        if (!b.damReleaseDate) return 1;
        if (
          new Date(b.damReleaseDate).getTime() <
          new Date(a.damReleaseDate).getTime()
        )
          return -1;
        if (
          new Date(b.damReleaseDate).getTime() >
          new Date(a.damReleaseDate).getTime()
        )
          return 1;
        return 0;
      });
    }

    // 50音順にソート
    if (this.sortType && this.sortType == 'alphabetical') {
      this.songs.sort((a: any, b: any) =>
        a.titleYomi.localeCompare(b.titleYomi, 'ja')
      );
    }
  }
}
