import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class KaraokeSong {
  @Column()
  title: string;

  @Column()
  titleYomi: string;

  @Column()
  artist: string;

  @Column()
  artistYomi: string;

  @PrimaryColumn()
  damRequestNo: string;

  @Column()
  damArtistCode: number;

  @Column()
  damReleaseDate: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  damPlaybackTime?: number;
}
