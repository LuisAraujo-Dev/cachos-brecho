import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Marca } from './Marca';

type StatusPeca = 'Limpeza' | 'Reparo' | 'Pronta p/ Consignação' | 'Em Consignação' | 'Vendida' | 'Perdida' | 'Devolução';
type OrigemPeca = 'Compra' | 'Doação' | 'Própria';

@Entity('pecas')
export class Peca {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    nome!: string;

    @Column({ type: 'text', nullable: true })
    descricao?: string;
    
    @ManyToOne(() => Marca)
    @JoinColumn({ name: 'marca_id' }) 
    marca!: Marca;
    
    @Column({ name: 'marca_id', type: 'integer' })
    marcaId!: number; 
    
    @Column({ type: 'integer' })
    categoriaId!: number;
    
    @Column({ type: 'integer' })
    tipoId!: number;
    
    @Column({ type: 'integer' })
    tamanhoId!: number;

    @Column({ type: 'enum', enum: ['Compra', 'Doação', 'Própria'] })
    origem!: OrigemPeca;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    valorCusto?: number;

    @Column({ type: 'date', nullable: true, name: 'data_aquisicao' })
    dataAquisicao?: string;
    
    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    precoVenda?: number;

    @Column({ type: 'enum', enum: ['Limpeza', 'Reparo', 'Pronta p/ Consignação', 'Em Consignação', 'Vendida', 'Perdida', 'Devolução'] })
    status!: StatusPeca;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'data_status_atual' })
    dataStatusAtual!: Date;
    
    @Column({ type: 'varchar', length: 100, nullable: true, name: 'cor_principal' })
    corPrincipal?: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'brecho_parceiro' })
    brechoParceiro?: string;
}