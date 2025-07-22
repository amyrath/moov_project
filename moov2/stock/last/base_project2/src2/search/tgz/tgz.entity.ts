import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tgz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  type_cdr: string;

  @Column()
  year: string;

  @Column()
  month: string;

  @Column()
  file: string;

  @Column()
  extension: string;
}
