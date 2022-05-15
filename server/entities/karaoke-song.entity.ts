import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KaraokeSong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  titleYomi: string;

  @Column()
  artist: string;

  @Column()
  artistYomi: string;

  @Column()
  damRequestNo: string;

  @Column()
  damArtistCode: number;

  @Column()
  damReleaseDate: string;

  @Column()
  damPlaybackTime: number;
}
