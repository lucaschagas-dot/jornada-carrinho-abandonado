import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { ChevronDownIcon } from '../components/icons';
import { DEMO_USER } from '../demoUser';
import s from './jornadaComum.module.css';

type TipoResidencia = 'casa' | 'apartamento' | null;

/** Residencial — Cotação 1/5. Réplica da loja. */
export default function ResidencialCotacao() {
  const [cep, setCep] = useState('');
  const [tipo, setTipo] = useState<TipoResidencia>(null);
  const [moradia, setMoradia] = useState('habitual');

  const cepPreenchido = cep.replace(/\D/g, '').length === 8;
  const podeContinuar = cepPreenchido && tipo !== null;

  return (
    <section className={s.wrapper}>
      <StepBreadcrumb category="Seguro Residencial" step="Cotação" current={1} total={5} />

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

        <div className={s.campo}>
          <label htmlFor="res-moradia" className={s.label}>
            Tipo de moradia
          </label>
          <div className={s.selectWrap}>
            <select id="res-moradia" className={s.select} value={moradia} onChange={(e) => setMoradia(e.target.value)}>
              <option value="habitual">Habitual</option>
              <option value="veraneio">Veraneio</option>
            </select>
            <ChevronDownIcon className={s.selectIcon} />
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

      <p className={s.avisoAtencao}>
        ⚠ Atenção: Não realizamos a venda do Seguro Residencial em casos de residências construídas por algum material
        combustível.
      </p>

      <p className={s.legal}>
        Ao clicar em "Continuar", você está ciente de que a Seguros Unimed irá coletar e tratar seus dados pessoais de acordo
        com a Política de Privacidade.
      </p>

      <div className={s.acoes}>
        {podeContinuar ? (
          <Link to="/residencial-coberturas" className={s.botaoPrimario} state={{ tipo }}>
            Continuar
          </Link>
        ) : (
          <button type="button" className={s.botaoPrimario} disabled>
            Continuar
          </button>
        )}
      </div>
    </section>
  );
}
