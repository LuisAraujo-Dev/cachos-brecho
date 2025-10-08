import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type CategoriaDespesa = 'Limpeza' | 'Reparo' | 'Envio' | 'Embalagem' | 'Marketing' | 'Fixo' | 'Outros';

@Entity('despesas')
export class Despesa {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    data!: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    valor!: number;

    @Column({ type: 'text' })
    descricao!: string;

    @Column({ type: 'enum', enum: ['Limpeza', 'Reparo', 'Envio', 'Embalagem', 'Marketing', 'Fixo', 'Outros'] })
    categoria!: CategoriaDespesa;
}