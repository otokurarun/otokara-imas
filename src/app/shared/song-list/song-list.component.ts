import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SongsService } from '../../songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  // 取得した楽曲の配列
  @Input()
  public songs: any[] | undefined = undefined;

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {}

  /**
   * デンモクアプリを起動するためのURLの取得
   * @param song 楽曲の配列
   * @returns デンモクアプリを起動するためのURL (ただし、PCの場合は公式WebサイトのURL)
   */
  public getReserveIntentUrl(song: { damRequestNo: string }) {
    // URLを生成
    let url: string;
    if (navigator.userAgent.match(/(iPhone|iPad)/)) {
      // iOS
      url = `denmoku://reserve?reqno=${song.damRequestNo.replace(/-/g, '')}`;
    } else if (navigator.userAgent.match(/Android/)) {
      // Android
      url = `intent://reserve/?reqno=${song.damRequestNo.replace(
        /-/g,
        ''
      )}#Intent;scheme=denmoku;package=jp.co.dkkaraoke.denmokumini01;end;`;
    } else {
      // その他
      url = `https://www.clubdam.com/karaokesearch/songleaf.html?requestNo=${song.damRequestNo}`;
    }

    // 信頼のできるURLとしてマークして返す
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
