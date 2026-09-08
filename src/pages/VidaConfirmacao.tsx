import { Link } from 'react-router-dom';
import { DEMO_USER } from '../demoUser';
import { formatarBRL } from '../jornada';
import { ASSISTENCIAS_VIDA, COBERTURAS_VIDA } from '../vida';
import { formatarCapital, useVida } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaConfirmacao.module.css';

// Esta tela é uma RECONSTRUÇÃO: na loja ela fica atrás da criação de conta e
// não foi possível vê-la. O conteúdo é uma proposta, não uma cópia.

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className={className} aria-hidden="true">
      <circle cx="44" cy="44" r="44" className={p.circulo} />
      <path
        d="M26 45.5 38 57.5 62 31"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Vida — Confirmação 10/10. Fecha a jornada: não tem "Continuar".
 *
 * O ajuste da pesquisa que aparece aqui é a pendência da DPS. Adiar a
 * declaração de saúde só é defensável se a cobrança dela sobreviver ao fim do
 * fluxo — por isso, quando a pessoa adiou, a tela de sucesso carrega o aviso e
 * o caminho de volta em vez de dar a compra por encerrada.
 */
export default function VidaConfirmacao() {
  const { sim, totalMensal, protocolo, capitalSugerido } = useVida();

  // Fallback para quem abre /vida-confirmacao direto pelo menu "Telas", sem ter
  // passado pela escolha de capital.
  const capital = sim.capitalSegurado || capitalSugerido;

  const coberturasAtivas = COBERTURAS_VIDA.filter(
    (c) =>
      !c.opcional ||
      (c.codigo === 'coberturaCancer' && sim.coberturaCancer) ||
      (c.codigo === 'coberturaMorteAcidental' && sim.coberturaMorteAcidental),
  ).length;
  const assistenciasAtivas = ASSISTENCIAS_VIDA.filter((a) => sim.assistencias[a.codigo]).length;

  const linhas: Array<[string, string]> = [
    ['Protocolo', protocolo],
    ['Titular', DEMO_USER.nomeCompleto],
    ['Capital segurado', formatarCapital(capital)],
    ['Valor mensal', formatarBRL(totalMensal)],
    ['Coberturas', `${coberturasAtivas} ativas`],
    ['Assistências', assistenciasAtivas === 0 ? 'Nenhuma' : `${assistenciasAtivas} contratadas`],
  ];

  return (
    <section className={s.wrapper}>
      <div className={p.conteudo}>
        <div className={p.cabecalho}>
          <CheckIcon className={p.icone} />
          <h1 className={s.title}>Contratação concluída</h1>
          <p className={s.subtitle}>
            {sim.dpsAdiada
              ? 'Sua contratação foi registrada. Falta só a Declaração Pessoal de Saúde para a apólice ser emitida.'
              : 'Seu Seguro de Vida está ativo. Enviamos os detalhes para o e-mail do titular.'}
          </p>
        </div>

        <div className={s.card}>
          <dl className={p.linhas}>
            {linhas.map(([rotulo, valor]) => (
              <div className={p.linha} key={rotulo}>
                <dt className={p.rotulo}>{rotulo}</dt>
                <dd className={p.valor}>{valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        {sim.dpsAdiada && (
          <div className={p.pendencia}>
            <p className={p.pendenciaTitulo}>Falta a Declaração Pessoal de Saúde</p>
            <p className={s.avisoAtencao}>
              A apólice só é emitida depois que você responder as 5 perguntas. Até lá a cobertura não está ativa, e você
              pode pedir o estorno a qualquer momento.
            </p>
            <Link to="/vida-dps" className={p.pendenciaLink}>
              Responder agora
            </Link>
          </div>
        )}

        <div className={`${s.acoes} ${p.acoes}`}>
          <button type="button" className={s.botaoSecundario}>
            Baixar apólice
          </button>
          <button type="button" className={s.botaoSecundario}>
            Ver minhas compras
          </button>
          <Link to="/" className={s.botaoPrimario}>
            Voltar para a home
          </Link>
        </div>

        <p className={s.legal}>Protótipo: nenhuma contratação foi feita e nenhum dado foi enviado.</p>
      </div>
    </section>
  );
}
