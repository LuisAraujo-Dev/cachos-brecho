import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('config')
export class Config {
    @PrimaryColumn({ type: 'integer', default: 1 })
    id!: number; 

    @Column({ type: 'text', nullable: true, default: '' })
    compromissosFixos?: string; 

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
    valorGuardadoCaixa!: number;
}