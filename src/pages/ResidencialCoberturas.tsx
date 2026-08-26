import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { formatarBRL } from '../jornada';
import {
  ALERTA_APARTAMENTO,
  COBERTURAS,
  COMBOS,
  RECOMENDADAS_POR_PADRAO,
  formatarCapital,
} from '../residencial';
import s from './jornadaComum.module.css';
import p from './ResidencialCoberturas.module.css';

function CheckIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M1 5l4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TITULO_POR_CODIGO = Object.fromEntries(COBERTURAS.map((c) => [c.codigo, c.titulo]));

export default function ResidencialCoberturas() {
  const { state } = useLocation() as { state: { tipo?: 'casa' | 'apartamento' } | null };
  const tipo = state?.tipo ?? 'casa';

  const [comboEscolhido, setComboEscolhido] = useState<number | null>(null);
  const [personalizando, setPersonalizando] = useState(false);

  // PROPOSTA DA PESQUISA: na personalização, as coberturas de uso amplo já vêm
  // MARCADAS. Antes, só as duas obrigatórias vinham — e o cliente descobria a
  // falta de "rompimento de tubulação" apenas no sinistro.
  const [marcadas, setMarcadas] = useState<Set<string>>(
    () => new Set([...COBERTURAS.filter((c) => c.obrigatoria).map((c) => c.codigo), ...RECOMENDADAS_POR_PADRAO]),
  );

  const alternar = (codigo: string) =>
    setMarcadas((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(codigo)) proximo.delete(codigo);
      else proximo.add(codigo);
      return proximo;
    });

  // Estimativa simples só para o protótipo ter um número que reage às escolhas.
  const totalPersonalizado = useMemo(
    () => COBERTURAS.filter((c) => marcadas.has(c.codigo)).reduce((soma, c) => soma + c.limiteMinimo / 1000, 0),
    [marcadas],
  );

  const podeContinuar = personalizando ? marcadas.size > 0 : comboEscolhido !== null;

  return (
    <section className={s.wrapper}>
      <StepBreadcrumb category="Seguro Residencial" step="Coberturas" current={2} total={5} />

      <h1 className={s.title}>Escolha o combo que mais atenda as necessidades da sua residência</h1>

      {!personalizando ? (
        <>
          <div className={p.grid}>
            {COMBOS.map((combo) => {
              const escolhido = comboEscolhido === combo.id;
              return (
                <button
                  type="button"
                  key={combo.id}
                  aria-pressed={escolhido}
                  className={`${p.card} ${escolhido ? p.cardEscolhido : ''}`}
                  onClick={() => setComboEscolhido(combo.id)}
                >
                  <span className={p.comboNome}>{combo.nome}</span>
                  <span className={p.parcelas}>Em até {combo.parcelas} vezes de</span>
                  <span className={p.mensal}>{formatarBRL(combo.mensal)}</span>
                  <span className={p.anual}>
                    Valor anual <strong>{formatarBRL(combo.anual)}</strong>
                  </span>

                  <span className={p.listaCoberturas}>
                    {Object.entries(combo.coberturas).map(([codigo, capital]) => (
                      <span className={p.itemCobertura} key={codigo}>
                        <CheckIcon />
                        <span>
                          <span className={p.itemTitulo}>{TITULO_POR_CODIGO[codigo]}</span>
                          <span className={p.itemCapital}>{formatarCapital(capital)}</span>
                        </span>
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={p.downloads}>
            <button type="button" className={s.linkDiscreto}>
              Baixar Condições Gerais e Especiais
            </button>
            <button type="button" className={s.linkDiscreto}>
              Baixar Quadro de Assistências
            </button>
            <button type="button" className={s.linkDiscreto}>
              Enviar por e-mail
            </button>
          </div>

          <div className={s.acoes}>
            {podeContinuar ? (
              <Link to="/residencial-identificacao" className={s.botaoPrimario}>
                Continuar
              </Link>
            ) : (
              <button type="button" className={s.botaoPrimario} disabled>
                Continuar
              </button>
            )}
          </div>

          {/* PROPOSTA DA PESQUISA: na loja, "Quero personalizar minhas coberturas
              e valores" é um link em destaque DENTRO de cada card, acima do
              "Continuar" — e puxa a pessoa para uma edição que consome 30-40 min
              e é onde muita gente desiste. Aqui ele vira um link discreto,
              DEPOIS do Continuar. */}
          <div className={p.personalizarRodape}>
            <button type="button" className={s.linkDiscreto} onClick={() => setPersonalizando(true)}>
              Prefiro montar minhas coberturas uma a uma
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={s.subtitle}>
            Estas são as coberturas que costumam fazer sentido para a maioria das residências — já deixamos marcadas.
            Desmarque o que não fizer sentido para você.
          </p>

          <div className={p.listaPersonalizar}>
            {COBERTURAS.map((cobertura) => {
              const marcada = marcadas.has(cobertura.codigo);
              const recomendada = RECOMENDADAS_POR_PADRAO.includes(cobertura.codigo);
              const alerta = tipo === 'apartamento' ? ALERTA_APARTAMENTO[cobertura.codigo] : undefined;

              return (
                <div key={cobertura.codigo}>
                  <label className={`${s.checkRow} ${marcada ? s.checkRowMarcada : ''}`}>
                    <input
                      type="checkbox"
                      className={s.checkbox}
                      checked={marcada}
                      disabled={cobertura.obrigatoria}
                      onChange={() => alternar(cobertura.codigo)}
                    />
                    <span className={s.checkTexto}>
                      <span className={s.checkTitulo}>{cobertura.titulo}</span>
                      <span className={s.checkDescricao}>
                        Capital segurado a partir de {formatarCapital(cobertura.limiteMinimo)}
                      </span>
                      {cobertura.obrigatoria && <span className={s.selo}>Sempre incluída</span>}
                      {!cobertura.obrigatoria && recomendada && <span className={s.selo}>Recomendado</span>}
                    </span>
                  </label>

                  {alerta && marcada && <p className={s.alerta}>{alerta}</p>}
                </div>
              );
            })}
          </div>

          <p className={p.estimativa}>
            Estimativa mensal: <strong>{formatarBRL(totalPersonalizado)}</strong> · {marcadas.size} coberturas
          </p>

          <div className={s.acoes}>
            <Link to="/residencial-identificacao" className={s.botaoPrimario}>
              Continuar
            </Link>
            <button type="button" className={s.botaoSecundario} onClick={() => setPersonalizando(false)}>
              Voltar para os combos
            </button>
          </div>
        </>
      )}
    </section>
  );
}
