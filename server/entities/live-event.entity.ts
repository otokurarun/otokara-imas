import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class LiveEvent extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column({
    type: 'simple-array',
  })
  brandNames: string[];

  @Column({
    default: 0,
  })
  numOfMatchedSongs: number;

  @Column({
    type: 'jsonb',
  })
  songs: {
    title: string;
    artist: string;
    damRequestNo?: string;
  }[];
}
