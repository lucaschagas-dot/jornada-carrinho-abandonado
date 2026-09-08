import { useMemo, useState } from 'react';
import { ResumoVida } from '../components/ResumoVida';
import { PROFISSOES, RELACOES_CIGARRO, SUGESTOES_PROFISSAO, type Profissao } from '../vida';
import { formatarCapital, useVida } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaCotacao.module.css';

/**
 * Vida — Cotação 1/10. Formulário progressivo, como na loja: cada resposta
 * revela a próxima pergunta.
 *
 * Ajustes da pesquisa de carrinho abandonado:
 * 1. Saída para profissão fora da lista — hoje quem não se encontra recebe só
 *    silêncio ("a plataforma não fala nada, não aparece um texto").
 * 2. Duas perguntas de perfil no fim, que alimentam as assistências.
 */
export default function VidaCotacao() {
  const { sim, atualizar, limiteCapital, capitalSugerido } = useVida();

  const [buscaProfissao, setBuscaProfissao] = useState('');
  const [rendaTexto, setRendaTexto] = useState(sim.rendaMensal !== null ? String(sim.rendaMensal) : '');
  const [alturaTexto, setAlturaTexto] = useState(sim.altura !== null ? String(sim.altura) : '');
  const [pesoTexto, setPesoTexto] = useState(sim.peso !== null ? String(sim.peso) : '');

  const profissaoEscolhida = sim.profissao ? sim.profissao.descricao : sim.profissaoLivre;

  const encontradas = useMemo(() => {
    const termo = buscaProfissao.trim().toLowerCase();
    if (!termo) return [];
    return PROFISSOES.filter((prof) => prof.descricao.toLowerCase().includes(termo)).slice(0, 6);
  }, [buscaProfissao]);

  const sugestoes = useMemo(() => {
    const termo = buscaProfissao.trim().toLowerCase();
    if (!termo || encontradas.length > 0) return [];
    const chave = Object.keys(SUGESTOES_PROFISSAO).find((k) => termo.includes(k) || k.includes(termo));
    return chave ? SUGESTOES_PROFISSAO[chave] : [];
  }, [buscaProfissao, encontradas]);

  const escolherProfissao = (prof: Profissao) => atualizar({ profissao: prof, profissaoLivre: '' });

  const escolherPorDescricao = (descricao: string) => {
    const prof = PROFISSOES.find((item) => item.descricao === descricao);
    if (prof) escolherProfissao(prof);
  };

  const nascimentoOk = /^\d{2}\/\d{2}\/\d{4}$/.test(sim.dataNascimento);
  const profissaoOk = profissaoEscolhida !== '';
  const rendaOk = sim.rendaMensal !== null && sim.rendaMensal > 0;
  const alturaOk = sim.altura !== null && sim.altura > 0;
  const pesoOk = sim.peso !== null && sim.peso > 0;
  const semResultado = buscaProfissao.trim().length > 2 && encontradas.length === 0 && !profissaoOk;

  const perguntasDaLoja =
    sim.sexo !== null && nascimentoOk && profissaoOk && rendaOk && alturaOk && pesoOk && sim.relacaoCigarro !== null;
  // O bloco de perfil aparece junto com as perguntas da loja, mas o Continuar
  // espera por ele: revelado no mesmo instante em que o botão libera, ninguém
  // responderia, e a recomendação de assistências voltaria a ser palpite.
  const podeContinuar = perguntasDaLoja && sim.temPet !== null && sim.temVeiculo !== null;

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Cotação</h1>
          <p className={s.subtitle}>Encontre o melhor seguro para a sua vida.</p>

          <p className={s.pergunta} id="pergunta-sexo">
            Qual é o seu sexo?
          </p>
          <div className={s.toggleGrupo} role="group" aria-labelledby="pergunta-sexo">
            {(['Masculino', 'Feminino'] as const).map((opcao) => (
              <button
                key={opcao}
                type="button"
                aria-pressed={sim.sexo === opcao}
                className={`${s.toggle} ${sim.sexo === opcao ? s.toggleAtivo : ''}`}
                onClick={() => atualizar({ sexo: opcao })}
              >
                {opcao}
              </button>
            ))}
          </div>

          {sim.sexo && (
            <>
              <p className={s.pergunta} id="pergunta-nascimento">
                Qual a sua data de nascimento?
              </p>
              <div className={p.campoSolto}>
                <input
                  className={s.input}
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday"
                  placeholder="dd/mm/aaaa"
                  aria-labelledby="pergunta-nascimento"
                  value={sim.dataNascimento}
                  onChange={(e) => atualizar({ dataNascimento: mascararData(e.target.value) })}
                />
              </div>
            </>
          )}

          {nascimentoOk && (
            <>
              <p className={s.pergunta} id="pergunta-profissao">
                Qual a sua profissão?
              </p>
              <div className={p.buscaProfissao}>
                <input
                  className={s.input}
                  type="text"
                  placeholder="Digite para buscar"
                  aria-labelledby="pergunta-profissao"
                  value={profissaoEscolhida || buscaProfissao}
                  onChange={(e) => {
                    setBuscaProfissao(e.target.value);
                    atualizar({ profissao: null, profissaoLivre: '' });
                  }}
                />

                {encontradas.length > 0 && !profissaoOk && (
                  <ul className={p.opcoes}>
                    {encontradas.map((prof) => (
                      <li key={prof.codigo}>
                        <button type="button" className={p.opcao} onClick={() => escolherProfissao(prof)}>
                          {prof.descricao}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Ajuste da pesquisa: em vez do silêncio, oferecer saída. */}
                {semResultado && (
                  <div className={p.semResultado}>
                    <p className={p.semResultadoTitulo}>Não encontramos {buscaProfissao.trim()} na nossa lista.</p>

                    {sugestoes.length > 0 && (
                      <>
                        <p className={p.semResultadoTexto}>Alguma destas se aproxima do que você faz?</p>
                        <div className={p.sugestoes}>
                          {sugestoes.map((sug) => (
                            <button
                              type="button"
                              key={sug}
                              className={p.sugestao}
                              onClick={() => escolherPorDescricao(sug)}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    <p className={p.semResultadoTexto}>
                      Se nenhuma servir, você pode{' '}
                      <button
                        type="button"
                        className={p.linkInline}
                        onClick={() => atualizar({ profissao: null, profissaoLivre: buscaProfissao.trim() })}
                      >
                        seguir como Outros
                      </button>{' '}
                      — um corretor confirma a classificação antes da emissão, sem travar sua cotação.
                    </p>
                  </div>
                )}

                {/* O teto da profissão é o que limita o slider da etapa seguinte. */}
                {profissaoOk && (
                  <p className={p.limiteProfissao}>
                    Para esta profissão o capital segurado vai até {formatarCapital(limiteCapital)}.
                  </p>
                )}
              </div>
            </>
          )}

          {profissaoOk && (
            <>
              <p className={s.pergunta} id="pergunta-renda">
                Qual é a sua renda mensal?
              </p>
              <div className={p.campoSolto}>
                <input
                  className={s.input}
                  type="text"
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  aria-labelledby="pergunta-renda"
                  value={rendaTexto}
                  onChange={(e) => {
                    setRendaTexto(e.target.value);
                    atualizar({ rendaMensal: paraNumero(e.target.value) });
                  }}
                />
              </div>
            </>
          )}

          {rendaOk && (
            <>
              <p className={s.pergunta} id="pergunta-altura">
                Qual é a sua altura?
              </p>
              <div className={p.comSufixo}>
                <input
                  className={`${s.input} ${p.entradaNumero}`}
                  type="text"
                  inputMode="numeric"
                  placeholder="000"
                  aria-labelledby="pergunta-altura"
                  value={alturaTexto}
                  onChange={(e) => {
                    setAlturaTexto(e.target.value);
                    atualizar({ altura: paraNumero(e.target.value) });
                  }}
                />
                <span className={p.sufixo}>cms.</span>
              </div>
            </>
          )}

          {alturaOk && (
            <>
              <p className={s.pergunta} id="pergunta-peso">
                Qual é o seu peso?
              </p>
              <div className={p.comSufixo}>
                <input
                  className={`${s.input} ${p.entradaNumero}`}
                  type="text"
                  inputMode="numeric"
                  placeholder="00"
                  aria-labelledby="pergunta-peso"
                  value={pesoTexto}
                  onChange={(e) => {
                    setPesoTexto(e.target.value);
                    atualizar({ peso: paraNumero(e.target.value) });
                  }}
                />
                <span className={p.sufixo}>kgs.</span>
              </div>
            </>
          )}

          {pesoOk && (
            <>
              <p className={s.pergunta} id="pergunta-cigarro">
                Qual é a sua relação com o cigarro?
              </p>
              <div className={s.toggleGrupo} role="group" aria-labelledby="pergunta-cigarro">
                {RELACOES_CIGARRO.map((relacao) => (
                  <button
                    key={relacao}
                    type="button"
                    aria-pressed={sim.relacaoCigarro === relacao}
                    className={`${s.toggle} ${sim.relacaoCigarro === relacao ? s.toggleAtivo : ''}`}
                    onClick={() => atualizar({ relacaoCigarro: relacao })}
                  >
                    {relacao}
                  </button>
                ))}
              </div>
            </>
          )}

          {/*
            Proposta da pesquisa. A loja recomenda a assistência de pet dizendo
            "caso você tenha um animal de estimação": ela adivinha o perfil em
            vez de perguntar. Duas perguntas aqui resolvem isso na etapa 3.
          */}
          {perguntasDaLoja && (
            <div className={p.blocoExtra}>
              <p className={p.blocoExtraTitulo}>Só mais duas perguntas rápidas</p>
              <p className={p.blocoExtraTexto}>
                Servem para recomendarmos assistências que fazem sentido para você, em vez de uma lista genérica.
              </p>

              <PerguntaSimNao
                id="pergunta-pet"
                texto="Você tem animal de estimação?"
                valor={sim.temPet}
                aoResponder={(valor) => atualizar({ temPet: valor })}
              />
              <PerguntaSimNao
                id="pergunta-veiculo"
                texto="Você tem veículo?"
                valor={sim.temVeiculo}
                aoResponder={(valor) => atualizar({ temVeiculo: valor })}
              />
            </div>
          )}
        </div>

        <ResumoVida
          continuarPara={podeContinuar ? '/vida-produto' : undefined}
          onContinuar={() => atualizar({ capitalSegurado: capitalSugerido })}
        />
      </div>
    </section>
  );
}

function PerguntaSimNao({
  id,
  texto,
  valor,
  aoResponder,
}: {
  id: string;
  texto: string;
  valor: boolean | null;
  aoResponder: (valor: boolean) => void;
}) {
  return (
    <>
      <p className={p.perguntaMenor} id={id}>
        {texto}
      </p>
      <div className={s.toggleGrupo} role="group" aria-labelledby={id}>
        <button
          type="button"
          aria-pressed={valor === true}
          className={`${s.toggle} ${valor === true ? s.toggleAtivo : ''}`}
          onClick={() => aoResponder(true)}
        >
          Sim
        </button>
        <button
          type="button"
          aria-pressed={valor === false}
          className={`${s.toggle} ${valor === false ? s.toggleAtivo : ''}`}
          onClick={() => aoResponder(false)}
        >
          Não
        </button>
      </div>
    </>
  );
}

function mascararData(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 8);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 4) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  return `${digitos.slice(0, 2)}/${digitos.slice(2, 4)}/${digitos.slice(4)}`;
}

/** Aceita "8.000,00", "R$ 8000" ou "175" e devolve o número. */
function paraNumero(texto: string): number | null {
  const limpo = texto.replace(/[^\d,]/g, '').replace(',', '.');
  if (limpo === '') return null;
  const numero = Number(limpo);
  return Number.isNaN(numero) ? null : numero;
}
