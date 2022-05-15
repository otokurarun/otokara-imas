import { Component, Input, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  // 取得した楽曲の配列
  public songs: any[] | undefined = undefined;

  // 楽曲の検索タイプ
  @Input()
  public searchType: 'keyword' | 'songName' | 'ranking' | 'none' = 'none';

  @Input()
  public searchParams: {
    keyword?: string;
    songName?: string;
    brandName?: string;
  };

  constructor(public songsService: SongsService) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {
    await this.search();
  }

  public async search() {
    // キーワードがあれば、楽曲の検索処理を実行
    if (this.searchParams.keyword) {
      this.songs = await this.songsService.getSongsByKeyword(
        this.searchParams.keyword
      );
    }

    // 曲名があれば、楽曲の検索処理を実行
    if (this.searchParams.songName) {
      this.songs = await this.songsService.getSongsBySongName(
        this.searchParams.songName
      );
    }

    // ブランド名があれば、楽曲の検索処理を実行
    if (this.searchParams.brandName) {
      this.songs = await this.songsService.getImasSongsByBrandName(
        this.searchParams.brandName
      );
    }
  }

  public getReserveIntentUrl(song: { damRequestNo: string }) {
    return `denmoku://reserve?reqno=${song.damRequestNo.replace(/-/g, '')}`;
  }
}
