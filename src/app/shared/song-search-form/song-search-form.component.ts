import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchParams } from '../song-list/search';

@Component({
  selector: 'app-song-search-form',
  templateUrl: './song-search-form.component.html',
  styleUrls: ['./song-search-form.component.scss'],
})
export class SongSearchFormComponent implements OnInit {
  // 検索パラメータ
  @Input()
  public searchParams?: SearchParams;

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
