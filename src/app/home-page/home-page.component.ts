import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * ホーム画面のコンポーネント
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * 楽曲の曲名検索(検索フォーム用)
   * @param songName 検索曲名
   */
  async searchSongBySongName(songName: string) {
    // URLを「/imasSongs/songName/アイドルマスター」のように変更 (画面遷移される)
    this.router.navigate(['imasSongs', 'songName', songName]);
  }

  /**
   * 楽曲のキーワード検索(検索フォーム用)
   * @param keyword 検索キーワード
   */
  async searchSongByKeyword(keyword: string) {
    // URLを「/imasSongs/keyword/アイドルマスター」のように変更 (画面遷移される)
    this.router.navigate(['imasSongs', 'keyword', keyword]);
  }
}
