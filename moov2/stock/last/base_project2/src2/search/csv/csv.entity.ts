import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Csv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  save_date: string;

  @Column()
  client: string;

  @Column()
  number_bande: string;

  @Column()
  type_of_eq: string;

  @Column({ nullable: true })
  type_cdr: string;
}
