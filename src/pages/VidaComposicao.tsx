import { ResumoVida } from '../components/ResumoVida';
import { formatarBRL } from '../jornada';
import {
  ASSISTENCIAS_VIDA,
  BENEFICIOS_VIDA,
  COBERTURAS_VIDA,
  FUNERAL_CAPITAL_FIXO,
  type CoberturaVida,
} from '../vida';
import { formatarCapital, useVida } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaComposicao.module.css';

function valorDaCobertura(valor: CoberturaVida['valor'], capital: number): string {
  switch (valor) {
    case 'fixo10k':
      return formatarCapital(FUNERAL_CAPITAL_FIXO);
    case 'dezPorCentoDoCapital':
      return formatarCapital(capital * 0.1);
    case 'capitalEmDobro':
      return `+${formatarCapital(capital)}`;
    default:
      return formatarCapital(capital);
  }
}

/**
 * Vida — Composição 4/10.
 *
 * Tela só de conferência, sem campo nenhum: o preço mensal em destaque e três
 * tabelas repetindo o que foi escolhido nas etapas anteriores.
 */
export default function VidaComposicao() {
  const { sim, capitalSugerido, totalMensal } = useVida();

  // Mesmo fallback do cálculo de preço em vidaEstado: quem entra direto nesta
  // rota pela navegação do protótipo ainda não passou pela etapa do capital.
  const capital = sim.capitalSegurado || capitalSugerido;

  const coberturasAtivas = COBERTURAS_VIDA.filter(
    (c) =>
      !c.opcional ||
      (c.codigo === 'coberturaCancer' && sim.coberturaCancer) ||
      (c.codigo === 'coberturaMorteAcidental' && sim.coberturaMorteAcidental),
  );
  const assistenciasAtivas = ASSISTENCIAS_VIDA.filter((a) => sim.assistencias[a.codigo]);

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Composição</h1>
          <p className={s.pergunta}>Confira como ficou o seu seguro</p>

          <div className={p.cardPreco}>
            <strong className={p.preco}>{formatarBRL(totalMensal)}</strong>
            <span className={p.precoLegenda}>Mensais</span>
          </div>

          <div className={p.secao}>
            <h2 className={p.secaoTitulo}>Coberturas inclusas</h2>
            <table className={p.tabela}>
              <thead>
                <tr>
                  <th scope="col">Coberturas</th>
                  <th scope="col" className={p.valor}>
                    Capital segurado
                  </th>
                </tr>
              </thead>
              <tbody>
                {coberturasAtivas.map((cobertura) => (
                  <tr key={cobertura.codigo}>
                    <td className={p.item}>{cobertura.titulo}</td>
                    <td className={p.valor}>{valorDaCobertura(cobertura.valor, capital)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={p.secao}>
            <h2 className={p.secaoTitulo}>Benefícios inclusos</h2>
            <table className={p.tabela}>
              <thead>
                <tr>
                  <th scope="col">Benefícios</th>
                  <th scope="col" className={p.valor}>
                    Sem custo adicional
                  </th>
                </tr>
              </thead>
              <tbody>
                {BENEFICIOS_VIDA.map((beneficio) => (
                  <tr key={beneficio.codigo}>
                    <td className={p.item}>{beneficio.titulo}</td>
                    <td className={p.valor}>Incluso</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={p.secao}>
            <h2 className={p.secaoTitulo}>Assistências opcionais</h2>
            <table className={p.tabela}>
              <thead>
                <tr>
                  <th scope="col">Assistências</th>
                  <th scope="col" className={p.valor}>
                    Valor mensal
                  </th>
                </tr>
              </thead>
              <tbody>
                {assistenciasAtivas.length === 0 ? (
                  <tr>
                    <td className={p.vazio} colSpan={2}>
                      Nenhuma assistência selecionada
                    </td>
                  </tr>
                ) : (
                  assistenciasAtivas.map((assistencia) => (
                    <tr key={assistencia.codigo}>
                      <td className={p.item}>{assistencia.titulo}</td>
                      <td className={p.valor}>{formatarBRL(assistencia.precoMensal)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ResumoVida continuarPara="/vida-login" />
      </div>
    </section>
  );
}
