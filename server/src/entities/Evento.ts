import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('eventos')
export class Evento {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    nome!: string;

    @Column({ type: 'date' })
    data!: string;
    
    @Column({ type: 'time' })
    horario!: string;

    @Column({ type: 'varchar', length: 255 })
    local!: string;
    
    @Column({ type: 'text', nullable: true })
    observacoes?: string;
}