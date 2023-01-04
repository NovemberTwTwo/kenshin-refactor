import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocalUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;
}
