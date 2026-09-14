import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MarsIcon, VenusIcon } from '../components/iconesSexo';
import { DEMO_USER } from '../demoUser';
import i from './ResidencialIdentificacao.module.css';
import s from './jornadaComum.module.css';

/**
 * Residencial — Identificação 3/5. Réplica da loja.
 *
 * Esta é a única etapa do Residencial sem resumo lateral: na loja o "Continuar"
 * mora dentro do próprio card, alinhado à esquerda, e não na caixa de resumo
 * que as outras três etapas usam. Por isso aqui não entra a `BarraEtapa`.
 */
export default function ResidencialIdentificacao() {
  const [sexo, setSexo] = useState<'masculino' | 'feminino'>('masculino');

  return (
    <section className={s.wrapper}>
      <h1 className={s.title}>Identificação</h1>

      <div className={s.card}>
        <div className={`${s.linhaCampos} ${i.linha1}`}>
          <div className={s.campo}>
            <label htmlFor="ri-cpf" className={s.label}>
              CPF
            </label>
            <input
              id="ri-cpf"
              className={`${s.input} ${i.somenteLeitura}`}
              type="text"
              inputMode="numeric"
              readOnly
              defaultValue={DEMO_USER.cpf}
            />
          </div>
          <div className={s.campo}>
            <label htmlFor="ri-nome" className={s.label}>
              Nome completo do titular
            </label>
            <input id="ri-nome" className={s.input} type="text" defaultValue={DEMO_USER.nomeCompleto} autoComplete="name" />
          </div>
        </div>

        <div className={`${s.linhaCampos} ${i.linha2}`}>
          <div className={s.campo}>
            <label htmlFor="ri-nasc" className={s.label}>
              Data de nascimento
            </label>
            <input id="ri-nasc" className={s.input} type="text" inputMode="numeric" defaultValue={DEMO_USER.dataNascimento} />
          </div>
          <div className={s.campo}>
            <label htmlFor="ri-celular" className={s.label}>
              Celular
            </label>
            <input id="ri-celular" className={s.input} type="tel" defaultValue={DEMO_USER.celular} autoComplete="tel" />
          </div>
          <div className={s.campo}>
            <label htmlFor="ri-email" className={s.label}>
              Email
            </label>
            <input id="ri-email" className={s.input} type="email" defaultValue={DEMO_USER.email} autoComplete="email" />
          </div>
          <div className={s.campo}>
            <span className={s.label}>Sexo</span>
            <div className={s.toggleGrupo}>
              <button
                type="button"
                aria-pressed={sexo === 'masculino'}
                className={`${s.toggle} ${i.toggleSexo} ${sexo === 'masculino' ? s.toggleAtivo : ''}`}
                onClick={() => setSexo('masculino')}
              >
                <MarsIcon /> Masculino
              </button>
              <button
                type="button"
                aria-pressed={sexo === 'feminino'}
                className={`${s.toggle} ${i.toggleSexo} ${sexo === 'feminino' ? s.toggleAtivo : ''}`}
                onClick={() => setSexo('feminino')}
              >
                <VenusIcon /> Feminino
              </button>
            </div>
          </div>
        </div>

        <div className={`${s.linhaCampos} ${i.linha3}`}>
          <div className={s.campo}>
            <label htmlFor="ri-cep" className={s.label}>
              CEP
            </label>
            <input id="ri-cep" className={s.input} type="text" inputMode="numeric" defaultValue="01310-100" />
            <p className={s.enderecoPreview}>AVENIDA PAULISTA - BELA VISTA, SAO PAULO - SP</p>
          </div>
          <div className={s.campo}>
            <label htmlFor="ri-numero" className={s.label}>
              Número
            </label>
            <input id="ri-numero" className={s.input} type="text" inputMode="numeric" />
          </div>
          <div className={s.campo}>
            <label htmlFor="ri-compl" className={s.label}>
              Complemento
            </label>
            <input id="ri-compl" className={s.input} type="text" />
          </div>
        </div>

        <Link to="/residencial-pagamento" className={`${s.botaoPrimario} ${i.continuar}`}>
          Continuar
        </Link>
      </div>

      <p className={`${s.legal} ${i.legalCentrado}`}>
        *A alteração dos seus dados não garante a atualização do seu cadastro junto à sua singular.
      </p>
    </section>
  );
}
