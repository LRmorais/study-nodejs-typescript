import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

// a classe vai ser um parametro enviado por Entity(decoration)
@Entity('appointments')
class Appointment {
  @PrimaryColumn('uuid')
  id: string;

  // parametro vazio indica varchar
  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
