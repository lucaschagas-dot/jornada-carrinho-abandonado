import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '../components/icons';
import { DEMO_USER } from '../demoUser';
import { rotuloPessoas, useJornada } from '../jornada';
import styles from './Odonto4.module.css';

// Ícones inline específicos desta tela (o Figma usa glifos Font Awesome, que
// não fazem parte do projeto — ver regra 8/4: não editar icons.tsx).
function InfoCircleIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

function PlusCircleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MarsIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="9.5" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 5.5l4-4M9.5 1.5h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VenusIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11v4M5.5 13.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type Sexo = 'masculino' | 'feminino' | null;

export default function Odonto4() {
  // Chega-se aqui já logado e com os dados do cadastro carregados, então os
  // campos vêm preenchidos (mas continuam editáveis).
  const [sexo, setSexo] = useState<Sexo>('masculino');
  const { pessoas } = useJornada();
  const dependentes = pessoas - 1;

  return (
    <section className={styles.wrapper}>
      <div className={styles.headingRow}>
        <h1 className={styles.title}>Identificação</h1>

        <div className={styles.infoBox}>
          <InfoCircleIcon size={32} className={styles.infoIcon} />
          <div className={styles.infoText}>
            <p>
              Você está comprando um plano para <strong className={styles.infoName}>{DEMO_USER.nomeCompleto}</strong>
            </p>
            <button type="button" className={styles.infoLink}>
              Comprar em nome de outra pessoa <ChevronRightIcon size={8} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.fieldsRowA}>
          <div className={styles.field}>
            <label htmlFor="cpf" className={styles.label}>
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              defaultValue={DEMO_USER.cpf}
              autoComplete="off"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="nomeTitular" className={styles.label}>
              Nome completo do titular
            </label>
            <input
              id="nomeTitular"
              name="nomeTitular"
              type="text"
              defaultValue={DEMO_USER.nomeCompleto}
              autoComplete="name"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="dataNascimento" className={styles.label}>
              Data de nascimento
            </label>
            <input
              id="dataNascimento"
              name="dataNascimento"
              type="text"
              inputMode="numeric"
              placeholder="__/__/____"
              defaultValue={DEMO_USER.dataNascimento}
              autoComplete="bday"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="estadoCivil" className={styles.label}>
              Estado civil
            </label>
            <div className={styles.selectWrap}>
              <select id="estadoCivil" name="estadoCivil" defaultValue={DEMO_USER.estadoCivil} className={styles.select}>
                <option value="" disabled hidden></option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
                <option value="separado">Separado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="outros">Outros</option>
              </select>
              <ChevronDownIcon className={styles.selectIcon} />
            </div>
          </div>
        </div>

        <div className={styles.fieldsRowB}>
          <div className={styles.field}>
            <label htmlFor="celular" className={styles.label}>
              Celular
            </label>
            <input
              id="celular"
              name="celular"
              type="tel"
              inputMode="tel"
              placeholder="(00) 00000-0000"
              defaultValue={DEMO_USER.celular}
              autoComplete="tel"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={DEMO_USER.email}
              autoComplete="email"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="nomeMae" className={styles.label}>
              Nome completo da mãe
            </label>
            <input id="nomeMae" name="nomeMae" type="text" autoComplete="off" className={styles.input} />
          </div>
        </div>

        <div className={styles.sexoRow}>
          <span className={styles.label}>Sexo</span>
          <div className={styles.sexoButtons}>
            <button
              type="button"
              aria-pressed={sexo === 'masculino'}
              className={`${styles.sexoButton} ${sexo === 'masculino' ? styles.sexoButtonActive : ''}`}
              onClick={() => setSexo('masculino')}
            >
              <MarsIcon /> Masculino
            </button>
            <button
              type="button"
              aria-pressed={sexo === 'feminino'}
              className={`${styles.sexoButton} ${sexo === 'feminino' ? styles.sexoButtonActive : ''}`}
              onClick={() => setSexo('feminino')}
            >
              <VenusIcon /> Feminino
            </button>
          </div>
        </div>

        <div className={styles.fieldsRowC}>
          <div className={styles.field}>
            <label htmlFor="cep" className={styles.label}>
              CEP
            </label>
            <input
              id="cep"
              name="cep"
              type="text"
              inputMode="numeric"
              placeholder="00000-000"
              defaultValue={DEMO_USER.cep}
              autoComplete="postal-code"
              className={styles.input}
            />
            <p className={styles.addressPreview}>{DEMO_USER.endereco}</p>
          </div>

          <div className={styles.field}>
            <label htmlFor="numero" className={styles.label}>
              Número
            </label>
            <input id="numero" name="numero" type="text" inputMode="numeric" autoComplete="off" className={styles.input} />
          </div>

          <div className={styles.field}>
            <label htmlFor="complemento" className={styles.label}>
              Complemento
            </label>
            <input
              id="complemento"
              name="complemento"
              type="text"
              autoComplete="address-line2"
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {/* Proposta da pesquisa: como o nº de pessoas já foi informado no início,
          os dependentes chegam previstos aqui em vez de virarem surpresa de preço. */}
      {dependentes > 0 && (
        <div className={styles.dependentesBloco}>
          <p className={styles.dependentesTitulo}>
            Dependentes ({dependentes} de {dependentes})
          </p>
          <p className={styles.dependentesNota}>
            Você informou {rotuloPessoas(pessoas)} no início da cotação, então o total mostrado
            na cotação já contava com todo mundo.
          </p>
          <ul className={styles.dependentesLista}>
            {Array.from({ length: dependentes }, (_, i) => (
              <li className={styles.dependenteItem} key={i}>
                <span className={styles.dependenteNome}>Dependente {i + 1}</span>
                <button type="button" className={styles.dependentePreencher}>
                  Preencher dados
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.actionsRow}>
        {/* Sem ação real neste protótipo (regra 10) */}
        <button type="button" className={styles.addDependentButton}>
          <PlusCircleIcon /> Adicionar dependente
        </button>
      </div>

      <div className={styles.continueRow}>
        <Link to="/odonto-5" className={styles.continueButton}>
          Continuar
        </Link>
      </div>

      <p className={styles.disclaimer}>
        *A alteração dos seus dados não garante a atualização do seu cadastro junto à sua singular.
      </p>
    </section>
  );
}
