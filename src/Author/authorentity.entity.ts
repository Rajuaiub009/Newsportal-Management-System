import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity("author")
export class AuthorEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  contact: string;
  
  @Column()
  filename: string;

}