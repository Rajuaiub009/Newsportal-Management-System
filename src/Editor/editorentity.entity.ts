import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity("editor")
export class EditorEntity{
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


}