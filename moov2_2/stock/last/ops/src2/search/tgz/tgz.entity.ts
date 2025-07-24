import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tgz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file' })
  source: string;

  @Column({ name: 'type_cdr' })
  type_cdr: string;

  @Column({ name: 'year' })
  year: string;

  @Column({ name: 'month' })
  month: string;

  @Column({ name: 'file' })
  file: string;

  @Column({ name: 'extension' })
  extension: string;
}
