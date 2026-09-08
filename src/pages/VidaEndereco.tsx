import { useState } from 'react';
import { ChevronDownIcon } from '../components/icons';
import { ResumoVida } from '../components/ResumoVida';
import { DEMO_USER } from '../demoUser';
import { UFS } from '../vida';
import s from './jornadaComum.module.css';

/** DEMO_USER.endereco vem como "LOGRADOURO - BAIRRO, CIDADE - UF". */
function quebrarEndereco(texto: string) {
  const [ruaBairro = '', cidadeUf = ''] = texto.split(',').map((parte) => parte.trim());
  const [logradouro = '', bairro = ''] = ruaBairro.split(' - ').map((parte) => parte.trim());
  const [cidade = '', uf = ''] = cidadeUf.split(' - ').map((parte) => parte.trim());
  return { logradouro, bairro, cidade, uf: UFS.includes(uf) ? uf : '' };
}

const ENDERECO_CADASTRO = quebrarEndereco(DEMO_USER.endereco);

type BlocoEnderecoProps = {
  /** Prefixo dos ids, para os dois blocos não colidirem. */
  id: string;
  valores?: { cep?: string; logradouro?: string; bairro?: string; cidade?: string; uf?: string };
};

function BlocoEndereco({ id, valores = {} }: BlocoEnderecoProps) {
  return (
    <>
      <div className={s.linhaCampos}>
        <div className={s.campo}>
          <label htmlFor={`${id}-cep`} className={s.label}>
            CEP
          </label>
          <input
            id={`${id}-cep`}
            className={s.input}
            type="text"
            inputMode="numeric"
            placeholder="00000-000"
            defaultValue={valores.cep ?? ''}
          />
          <div className={s.enderecoPreview}>
            <button type="button" className={s.linkDiscreto}>
              Não sei meu CEP
            </button>
          </div>
        </div>

        <div className={s.campo}>
          <label htmlFor={`${id}-logradouro`} className={s.label}>
            Logradouro
          </label>
          <input
            id={`${id}-logradouro`}
            className={s.input}
            type="text"
            placeholder="Rua, avenida, alameda"
            defaultValue={valores.logradouro ?? ''}
          />
        </div>

        <div className={s.campo}>
          <label htmlFor={`${id}-numero`} className={s.label}>
            Número
          </label>
          <input id={`${id}-numero`} className={s.input} type="text" inputMode="numeric" placeholder="000" />
        </div>
      </div>

      <div className={s.linhaCampos}>
        <div className={s.campo}>
          <label htmlFor={`${id}-complemento`} className={s.label}>
            Complemento
          </label>
          <input id={`${id}-complemento`} className={s.input} type="text" placeholder="Apto, bloco, casa (opcional)" />
        </div>

        <div className={s.campo}>
          <label htmlFor={`${id}-bairro`} className={s.label}>
            Bairro
          </label>
          <input id={`${id}-bairro`} className={s.input} type="text" placeholder="Bairro" defaultValue={valores.bairro ?? ''} />
        </div>
      </div>

      <div className={s.linhaCampos}>
        <div className={s.campo}>
          <label htmlFor={`${id}-cidade`} className={s.label}>
            Cidade
          </label>
          <input id={`${id}-cidade`} className={s.input} type="text" placeholder="Cidade" defaultValue={valores.cidade ?? ''} />
        </div>

        <div className={s.campo}>
          <label htmlFor={`${id}-uf`} className={s.label}>
            UF
          </label>
          <div className={s.selectWrap}>
            <select id={`${id}-uf`} className={s.select} defaultValue={valores.uf ?? ''}>
              <option value="" disabled hidden></option>
              {UFS.map((uf) => (
                <option value={uf} key={uf}>
                  {uf}
                </option>
              ))}
            </select>
            <ChevronDownIcon className={s.selectIcon} />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Vida — Endereço 6/10.
 *
 * Réplica da loja: endereço principal já preenchido com o CEP do cadastro e a
 * opção de usar o mesmo endereço para correspondência, marcada por padrão —
 * quem desmarca ganha um segundo bloco, vazio. Nada é validado nem enviado.
 */
export default function VidaEndereco() {
  const [mesmoEndereco, setMesmoEndereco] = useState(true);

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Endereço</h1>
          <p className={s.subtitle}>Onde você mora hoje.</p>

          <p className={s.pergunta}>Endereço principal</p>
          <div className={s.card}>
            <BlocoEndereco id="principal" valores={{ cep: DEMO_USER.cep, ...ENDERECO_CADASTRO }} />

            <label className={`${s.checkRow} ${mesmoEndereco ? s.checkRowMarcada : ''}`}>
              <input
                type="checkbox"
                className={s.checkbox}
                checked={mesmoEndereco}
                onChange={() => setMesmoEndereco((atual) => !atual)}
              />
              <span className={s.checkTexto}>
                <span className={s.checkTitulo}>Usar este mesmo endereço para correspondência.</span>
                <span className={s.checkDescricao}>
                  É para onde enviamos a apólice e os avisos do seguro.
                </span>
              </span>
            </label>
          </div>

          {!mesmoEndereco && (
            <>
              <p className={s.pergunta}>Endereço de correspondência</p>
              <div className={s.card}>
                <BlocoEndereco id="correspondencia" />
              </div>
            </>
          )}
        </div>

        <ResumoVida continuarPara="/vida-beneficiario" />
      </div>
    </section>
  );
}
