import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity("news")
export class NewsEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  news: string;
}