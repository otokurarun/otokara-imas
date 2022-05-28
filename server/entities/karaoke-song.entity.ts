import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class KaraokeSong extends BaseEntity {
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

  @Column({
    nullable: true,
    type: 'int',
  })
  damRank?: number;

  @Column()
  brand: string;
}
