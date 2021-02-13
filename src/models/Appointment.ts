import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// importar instancia de User para estipular o tipo de relacionamento
//  Um para um (OneToOne)
//  Um para Muitos (OneToMany)
//  Muitos para Muitos (ManyToMany)
import User from './User';

// a classe vai ser um parametro enviado por Entity(decoration)
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // parametro vazio indica varchar
  // provider_id vai fazer referencia ao id do user cadastrado(tabela users)
  @Column()
  // eslint-disable-next-line camelcase
  provider_id: string;

  // --------------------------------------
  // muitos agendamentos para um usuario
  @ManyToOne(() => User)
  // qual a coluna que ira identificar qual o prestador do agendamento
  @JoinColumn({ name: 'provider_id' })
  provider: User;
  // --------------------------------------

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  update_at: Date;
}

export default Appointment;
