import type { Peca } from "../types/Peca";

export interface DashboardMetrics {
    totalPecas: number;
    pecasEmProcessamento: number;
    pecasProntasParaConsignacao: number;
    valorInvestidoMes: number;
    faturamentoMes: number;
    lucroBrutoMes: number;
    alertas: string[];
}

export const calculateMetrics = (pecas: Peca[]): DashboardMetrics => {
    const today = new Date();
    const currentYearMonth = today.toISOString().substring(0, 7);

    let valorInvestidoMes = 0;
    let faturamentoMes = 0;
    let pecasEmProcessamento = 0;
    let pecasProntasParaConsignacao = 0;
    const alertas: string[] = [];

    const totalPecas = pecas.filter(p => p.status !== 'Perdida' && p.status !== 'Devolução').length;

    pecas.forEach(peca => {
        const dataAquisicaoMes = peca.dataAquisicao?.substring(0, 7);
        const dataStatusAtual = peca.dataStatusAtual
            ? new Date(peca.dataStatusAtual)
            : today;
        const dataStatusMes = dataStatusAtual.toISOString().substring(0, 7);

        const diffTime = Math.abs(today.getTime() - dataStatusAtual.getTime());

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dataAquisicaoMes === currentYearMonth && peca.origem === 'Compra' && peca.valorCusto) {
            valorInvestidoMes += peca.valorCusto;
        }

        if (peca.status === 'Vendida' && dataStatusMes === currentYearMonth) {
            faturamentoMes += peca.precoVenda || 0;
        }

        if (peca.status === 'Limpeza' || peca.status === 'Reparo') {
            pecasEmProcessamento++;
        }
        if (peca.status === 'Pronta p/ Consignação' || peca.status === 'Em Consignação') {
            pecasProntasParaConsignacao++;
        }

        if ((peca.status === 'Limpeza' || peca.status === 'Reparo') && diffDays > 7) {
            alertas.push(`[${peca.status}] Peça #${peca.id} (${peca.nome}) parada há ${diffDays} dias.`);
        }

        if (peca.status === 'Em Consignação' && diffDays > 60) {
            alertas.push(`[CONSIGNADA] Peça #${peca.id} (${peca.nome}) em consignação há mais de 60 dias.`);
        }
    });

    const lucroBrutoMes = faturamentoMes - valorInvestidoMes;

    return {
        totalPecas: totalPecas,
        pecasEmProcessamento,
        pecasProntasParaConsignacao,
        valorInvestidoMes,
        faturamentoMes,
        lucroBrutoMes,
        alertas,
    };
};