import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Csv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'source' })
  source: string;

  @Column({ name: 'save_date' })
  save_date: string;

  @Column({ name: 'client' })
  client: string;

  @Column({ name: 'number_bande' })
  number_bande: string;

  @Column({ name: 'type_of_eq' })
  type_of_eq: string;
}
