import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// a classe vai ser um parametro enviado por Entity(decoration)
// nome da tabela
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // parametro vazio indica varchar
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  update_at: Date;
}

export default User;
