import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { LocalUser } from './local-user.entity';
import { SocialUser } from './social-user.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  mihoyoCookie: string;

  @Column()
  email: string;

  @OneToOne(() => LocalUser, {
    onDelete: 'CASCADE',
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  localUser: LocalUser;

  @OneToOne(() => SocialUser, {
    onDelete: 'CASCADE',
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  socialUser: SocialUser;
}
