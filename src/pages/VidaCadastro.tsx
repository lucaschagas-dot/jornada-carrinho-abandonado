import { useState } from 'react';
import { ChevronDownIcon } from '../components/icons';
import { ResumoVida } from '../components/ResumoVida';
import { DEMO_USER } from '../demoUser';
import { formatarBRL } from '../jornada';
import { ESTADOS_CIVIS, OPCOES_PEP, TEXTO_PEP, UFS } from '../vida';
import { useVida } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaCadastro.module.css';

/**
 * Vida — Identificação 5/10. Réplica do formulário da loja, na mesma ordem de
 * campos. O que veio da cotação (nascimento, sexo, renda e profissão) aparece
 * como texto, não como campo — é assim na loja.
 *
 * Ajuste da pesquisa: sai o aviso de criação de conta no rodapé, entra a
 * confirmação de quem está comprando (ver comentário no fim do formulário).
 */
export default function VidaCadastro() {
  const { sim } = useVida();

  const [estadoCivil, setEstadoCivil] = useState(DEMO_USER.estadoCivilLabel);
  const [uf, setUf] = useState('SP');
  const [pep, setPep] = useState(OPCOES_PEP[0]);
  const [profissaoEhOcupacao, setProfissaoEhOcupacao] = useState(true);
  const [aceitaContato, setAceitaContato] = useState(false);
  const [aceitaPolitica, setAceitaPolitica] = useState(false);

  // Quem abre esta tela direto pelo menu não passou pela cotação: nesse caso
  // vale o mesmo perfil usado no mapeamento da loja.
  const nascimento = sim.dataNascimento || DEMO_USER.dataNascimento;
  const sexo = sim.sexo ?? DEMO_USER.sexo;
  const renda = formatarBRL(sim.rendaMensal ?? 8000);
  const profissao = sim.profissao?.descricao || sim.profissaoLivre || 'Analista de Sistemas';

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Identificação</h1>
          <p className={s.subtitle}>Confirme seus dados para seguir com a contratação.</p>

          <div className={s.card}>
            <div className={p.linhaCpf}>
              <div className={s.campo}>
                <label htmlFor="vc-cpf" className={s.label}>
                  CPF
                </label>
                <input id="vc-cpf" className={s.input} type="text" inputMode="numeric" defaultValue={DEMO_USER.cpf} />
              </div>
            </div>

            <div className={s.linhaCampos}>
              <div className={s.campo}>
                <label htmlFor="vc-nome" className={s.label}>
                  Nome completo do titular
                </label>
                <input
                  id="vc-nome"
                  className={s.input}
                  type="text"
                  autoComplete="name"
                  defaultValue={DEMO_USER.nomeCompleto}
                />
              </div>
              <div className={s.campo}>
                <label htmlFor="vc-nome-social" className={s.label}>
                  Nome social
                </label>
                <input id="vc-nome-social" className={s.input} type="text" />
              </div>
            </div>

            <div className={p.linhaQuatro}>
              <div className={s.campo}>
                <label htmlFor="vc-estado-civil" className={s.label}>
                  Estado civil
                </label>
                <div className={s.selectWrap}>
                  <select
                    id="vc-estado-civil"
                    className={s.select}
                    value={estadoCivil}
                    onChange={(e) => setEstadoCivil(e.target.value)}
                  >
                    {ESTADOS_CIVIS.map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className={s.selectIcon} />
                </div>
              </div>
              <div className={s.campo}>
                <label htmlFor="vc-celular" className={s.label}>
                  Celular
                </label>
                <input
                  id="vc-celular"
                  className={s.input}
                  type="tel"
                  autoComplete="tel"
                  defaultValue={DEMO_USER.celular}
                />
              </div>
              <div className={s.campo}>
                <label htmlFor="vc-telefone" className={s.label}>
                  Telefone
                </label>
                <input id="vc-telefone" className={s.input} type="tel" />
              </div>
              <CampoDaCotacao rotulo="Data de nascimento" valor={nascimento} />
            </div>

            <div className={s.linhaCampos}>
              <div className={s.campo}>
                <label htmlFor="vc-email" className={s.label}>
                  Email
                </label>
                <input
                  id="vc-email"
                  className={s.input}
                  type="email"
                  autoComplete="email"
                  defaultValue={DEMO_USER.email}
                />
              </div>
              <CampoDaCotacao rotulo="Sexo" valor={sexo} />
            </div>

            <div className={p.linhaQuatro}>
              <div className={s.campo}>
                <label htmlFor="vc-rg" className={s.label}>
                  Número do RG
                </label>
                <input id="vc-rg" className={s.input} type="text" inputMode="numeric" />
              </div>
              <div className={s.campo}>
                <label htmlFor="vc-orgao" className={s.label}>
                  Orgão Emissor
                </label>
                <input id="vc-orgao" className={s.input} type="text" />
              </div>
              <div className={s.campo}>
                <label htmlFor="vc-uf" className={s.label}>
                  UF
                </label>
                <div className={s.selectWrap}>
                  <select id="vc-uf" className={s.select} value={uf} onChange={(e) => setUf(e.target.value)}>
                    {UFS.map((sigla) => (
                      <option key={sigla} value={sigla}>
                        {sigla}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className={s.selectIcon} />
                </div>
              </div>
              <CampoDaCotacao rotulo="Renda Mensal" valor={renda} />
            </div>

            <div className={s.linhaCampos}>
              <CampoDaCotacao rotulo="Profissão" valor={profissao} />
            </div>

            <label className={`${s.checkRow} ${profissaoEhOcupacao ? s.checkRowMarcada : ''}`}>
              <input
                type="checkbox"
                className={s.checkbox}
                checked={profissaoEhOcupacao}
                onChange={() => setProfissaoEhOcupacao((v) => !v)}
              />
              <span className={s.checkTexto}>
                <span className={s.checkTitulo}>Minha Profissão é a minha ocupação.</span>
              </span>
            </label>

            <div className={p.pep}>
              <span className={s.label} id="pergunta-pep">
                PEP (Pessoa Exposta Politicamente)?
              </span>
              <p className={p.pepTexto}>{TEXTO_PEP}</p>
              <div className={s.toggleGrupo} role="group" aria-labelledby="pergunta-pep">
                {OPCOES_PEP.map((opcao) => (
                  <button
                    type="button"
                    key={opcao}
                    aria-pressed={pep === opcao}
                    className={`${s.toggle} ${pep === opcao ? s.toggleAtivo : ''}`}
                    onClick={() => setPep(opcao)}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <label className={`${s.checkRow} ${aceitaContato ? s.checkRowMarcada : ''}`}>
              <input
                type="checkbox"
                className={s.checkbox}
                checked={aceitaContato}
                onChange={() => setAceitaContato((v) => !v)}
              />
              <span className={s.checkTexto}>
                <span className={s.checkTitulo}>Aceito receber contato por e-mail, SMS e WhatsApp.</span>
              </span>
            </label>

            <label className={`${s.checkRow} ${aceitaPolitica ? s.checkRowMarcada : ''}`}>
              <input
                type="checkbox"
                className={s.checkbox}
                checked={aceitaPolitica}
                onChange={() => setAceitaPolitica((v) => !v)}
              />
              <span className={s.checkTexto}>
                <span className={s.checkTitulo}>
                  Li e concordo com a{' '}
                  <a
                    className={p.link}
                    href="https://www.segurosunimed.com.br/politica-de-privacidade"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Política de Privacidade
                  </a>
                </span>
              </span>
            </label>

            {/* Ajuste da pesquisa: no rodapé a loja avisa que "uma conta será criada
                com os dados informados" — com o login virando etapa própria antes
                daqui, a conta já existe, então o aviso vira confirmação. */}
            <div className={s.alerta}>
              <span>
                Você já está identificado como <strong>{DEMO_USER.nomeCurto}</strong>. Nenhuma conta nova será criada.
              </span>
            </div>
          </div>
        </div>

        <ResumoVida continuarPara={aceitaPolitica ? '/vida-endereco' : undefined} />
      </div>
    </section>
  );
}

/** Campo que já veio da cotação: a loja mostra o valor como texto, sem edição. */
function CampoDaCotacao({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className={s.campo}>
      <span className={s.label}>{rotulo}</span>
      <span className={p.valorFixo}>{valor}</span>
    </div>
  );
}
