import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarraEtapa } from '../components/BarraEtapa';
import { DEMO_USER } from '../demoUser';
import b from './residencialBarra.module.css';
import p from './ResidencialCotacao.module.css';
import s from './jornadaComum.module.css';

type TipoResidencia = 'casa' | 'apartamento' | null;
type TipoMoradia = 'habitual' | 'locacao' | 'veraneio' | null;

const MORADIAS: Array<{ id: Exclude<TipoMoradia, null>; rotulo: string }> = [
  { id: 'habitual', rotulo: 'Habitual' },
  { id: 'locacao', rotulo: 'Locação' },
  { id: 'veraneio', rotulo: 'Veraneio' },
];

function AvisoIcon() {
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" aria-hidden="true" className={p.atencaoIcone}>
      <path d="M7 1 13 12H1L7 1Z" fill="currentColor" />
      <path d="M7 5v3.2" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="10.1" r="0.75" fill="#ffffff" />
    </svg>
  );
}

/** Residencial — Cotação 1/5. Réplica da loja. */
export default function ResidencialCotacao() {
  const [cep, setCep] = useState('');
  const [tipo, setTipo] = useState<TipoResidencia>(null);
  const [moradia, setMoradia] = useState<TipoMoradia>(null);
  const [combustivel, setCombustivel] = useState<boolean | null>(null);

  const cepPreenchido = cep.replace(/\D/g, '').length === 8;

  // Casa de material combustível não sai por cotação automática: a loja troca o
  // valor por um aviso de análise, então aqui o Continuar também para.
  const precisaAnalise = combustivel === true;
  const podeContinuar = cepPreenchido && tipo !== null && moradia !== null && combustivel !== null && !precisaAnalise;

  return (
    <section className={s.wrapper}>
      <h1 className={s.title}>Cotação</h1>
      <p className={s.pergunta}>Qual o CEP da residência a ser segurada?</p>

      <div className={s.card}>
        <div className={s.linhaCampos}>
          <div className={s.campo}>
            <label htmlFor="res-cep" className={s.label}>
              CEP
            </label>
            <input
              id="res-cep"
              className={s.input}
              type="text"
              inputMode="numeric"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            {cepPreenchido && <p className={s.enderecoPreview}>AVENIDA PAULISTA - BELA VISTA, SÃO PAULO - SP</p>}
          </div>

          <div className={s.campo}>
            <label htmlFor="res-nome" className={s.label}>
              Nome completo do titular
            </label>
            <input id="res-nome" className={s.input} type="text" defaultValue={DEMO_USER.nomeCompleto} autoComplete="name" />
          </div>

          <div className={s.campo}>
            <label htmlFor="res-nome-social" className={s.label}>
              Nome social
            </label>
            <input id="res-nome-social" className={s.input} type="text" autoComplete="off" />
          </div>
        </div>

        <div className={s.linhaCampos}>
          <div className={s.campo}>
            <label htmlFor="res-email" className={s.label}>
              E-mail
            </label>
            <input id="res-email" className={s.input} type="email" defaultValue={DEMO_USER.email} autoComplete="email" />
          </div>

          <div className={s.campo}>
            <label htmlFor="res-celular" className={s.label}>
              Celular
            </label>
            <input id="res-celular" className={s.input} type="tel" defaultValue={DEMO_USER.celular} autoComplete="tel" />
          </div>
        </div>

        <div>
          <p className={s.pergunta}>Qual o tipo da residência você quer proteger?</p>
          <div className={s.toggleGrupo}>
            <button
              type="button"
              aria-pressed={tipo === 'casa'}
              className={`${s.toggle} ${tipo === 'casa' ? s.toggleAtivo : ''}`}
              onClick={() => setTipo('casa')}
            >
              Casa
            </button>
            <button
              type="button"
              aria-pressed={tipo === 'apartamento'}
              className={`${s.toggle} ${tipo === 'apartamento' ? s.toggleAtivo : ''}`}
              onClick={() => setTipo('apartamento')}
            >
              Apartamento
            </button>
          </div>
        </div>

        <div>
          <p className={s.pergunta} id="pergunta-moradia">
            Qual é o tipo de moradia?
          </p>
          <p className={p.explicacao}>
            Moradia <strong>habitual</strong> é aquela que se habita, com ânimo de permanência. Escolha{' '}
            <strong>locação</strong> se você for o locatário (não é o proprietário) da residência. Casa de{' '}
            <strong>veraneio</strong> é um local utilizado como moradia de lazer e descanso em finais de semana,
            feriados e férias.
          </p>
          <p className={p.atencao}>
            <AvisoIcon />
            <span>
              Atenção: o seguro residencial não possui cobertura para imóveis de aluguel por temporada. Exemplo:
              imóveis alugados apenas para o fim de semana.
            </span>
          </p>
          <div className={s.toggleGrupo} role="group" aria-labelledby="pergunta-moradia">
            {MORADIAS.map((m) => (
              <button
                type="button"
                key={m.id}
                aria-pressed={moradia === m.id}
                className={`${s.toggle} ${moradia === m.id ? s.toggleAtivo : ''}`}
                onClick={() => setMoradia(m.id)}
              >
                {m.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={s.pergunta} id="pergunta-combustivel">
            Sua residência é de madeira ou de algum outro material combustível?
          </p>
          <p className={p.explicacao}>Considere materiais combustíveis como plástico, isopor, isopainel entre outros.</p>
          <div className={s.toggleGrupo} role="group" aria-labelledby="pergunta-combustivel">
            <button
              type="button"
              aria-pressed={combustivel === false}
              className={`${s.toggle} ${combustivel === false ? s.toggleAtivo : ''}`}
              onClick={() => setCombustivel(false)}
            >
              Não
            </button>
            <button
              type="button"
              aria-pressed={combustivel === true}
              className={`${s.toggle} ${combustivel === true ? s.toggleAtivo : ''}`}
              onClick={() => setCombustivel(true)}
            >
              Sim
            </button>
          </div>
        </div>
      </div>

      <label className={s.checkRow} style={{ marginTop: 'var(--space-3x)' }}>
        <input type="checkbox" className={s.checkbox} />
        <span className={s.checkTexto}>
          <span className={s.checkDescricao}>
            Tenho interesse em receber comunicação com condições especiais e ofertas de produtos da Seguros Unimed.
          </span>
        </span>
      </label>

      <p className={s.legal}>
        Ao clicar em "Continuar", você está ciente de que a Seguros Unimed irá coletar e tratar seus dados pessoais de acordo
        com a Política de Privacidade.
      </p>

      {/* Fica logo acima do Continuar: é ali que a loja põe a mensagem, no
          lugar onde o valor da cotação apareceria. */}
      {precisaAnalise && (
        <div className={p.analise} role="status">
          <p className={p.analiseTitulo}>
            Sua residência parece ter características especiais que necessitam de uma análise mais criteriosa.
          </p>
          <p className={p.analiseTexto}>
            Para mais detalhes,{' '}
            <a className={p.analiseLink} href="#/">
              clique aqui
            </a>{' '}
            e entre em contato com a Seguros Unimed.
          </p>
        </div>
      )}

      {/* Ainda não há valor nesta etapa: a barra carrega só a ação. */}
      <BarraEtapa>
        {podeContinuar ? (
          <Link to="/residencial-coberturas" className={`${s.botaoPrimario} ${b.cta}`} state={{ tipo }}>
            Continuar
          </Link>
        ) : (
          <button type="button" className={`${s.botaoPrimario} ${b.cta}`} disabled>
            Continuar
          </button>
        )}
      </BarraEtapa>
    </section>
  );
}
