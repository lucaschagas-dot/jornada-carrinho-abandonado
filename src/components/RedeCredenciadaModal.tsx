import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from './icons';
import { DENTISTAS, ESPECIALIDADES, UFS, listarPlanos, type Dentista } from '../redeCredenciada';
import styles from './RedeCredenciadaModal.module.css';

function CloseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
      <path d="M9 1 1 9l8 8M1 9h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrosshairIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FiltroIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
      <path d="M1 4h11M15 4h2M1 12h2M6 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="13.5" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ToothIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.2c-1.1 0-1.8.5-3 .5s-2-.5-3-.5C4.3 3.2 3 4.8 3 7c0 2.4.9 3.7 1.4 6.2.4 2 .5 4.6 1.7 4.6 1.1 0 1.2-2.3 1.7-4.2.3-1.2.7-2 1.6-2s1.3.8 1.6 2c.5 1.9.6 4.2 1.7 4.2 1.2 0 1.3-2.6 1.7-4.6C15.1 10.7 16 9.4 16 7c0-2.2-1.3-3.8-3-3.8Z"
        transform="translate(2)"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Pin do mapa: gota branca com um dente ciano dentro, como na loja. */
function ToothPin() {
  return (
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none" aria-hidden="true">
      <path
        d="M14 1c7.2 0 13 5.6 13 12.5C27 22 18.4 30 14 35 9.6 30 1 22 1 13.5 1 6.6 6.8 1 14 1Z"
        fill="#ffffff"
        stroke="#dce0e8"
      />
      <path
        d="M14 7.5c-.8 0-1.3.4-2.2.4-.9 0-1.4-.4-2.2-.4-1.2 0-2.1 1.1-2.1 2.7 0 1.7.6 2.7 1 4.5.3 1.4.4 3.3 1.2 3.3.8 0 .9-1.6 1.2-3 .2-.9.5-1.4 1.1-1.4s.9.5 1.1 1.4c.3 1.4.4 3 1.2 3 .8 0 .9-1.9 1.2-3.3.4-1.8 1-2.8 1-4.5 0-1.6-.9-2.7-2.1-2.7Z"
        fill="var(--cyan-500)"
      />
    </svg>
  );
}

type Vista = 'busca' | 'avancada' | 'resultados' | 'refinar';
type Ordenacao = 'distancia' | 'alfabetica';

type RedeCredenciadaModalProps = {
  onClose: () => void;
};

export function RedeCredenciadaModal({ onClose }: RedeCredenciadaModalProps) {
  const [vista, setVista] = useState<Vista>('busca');
  const [localizacao, setLocalizacao] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [nome, setNome] = useState('');
  const [cro, setCro] = useState('');
  const [uf, setUf] = useState('');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('distancia');
  const [selecionado, setSelecionado] = useState<Dentista | null>(null);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [onClose]);

  // A loja só habilita "Buscar" com localização (com coordenadas) + especialidade.
  const podeBuscar = localizacao.trim().length > 0 && especialidade !== '';

  const resultados = useMemo(() => {
    const filtrados = DENTISTAS.filter((d) => {
      if (especialidade && d.especialidade !== especialidade) return false;
      if (nome.trim() && !d.nome.toLowerCase().includes(nome.trim().toLowerCase())) return false;
      if (cro.trim() && !d.cro.toLowerCase().includes(cro.trim().toLowerCase())) return false;
      if (uf && !d.enderecoLinha2.endsWith(uf)) return false;
      return true;
    });

    return [...filtrados].sort((a, b) =>
      ordenacao === 'distancia' ? a.distanciaKm - b.distanciaKm : a.nome.localeCompare(b.nome, 'pt-BR'),
    );
  }, [especialidade, nome, cro, uf, ordenacao]);

  const buscar = () => {
    setSelecionado(null);
    setVista('resultados');
  };

  const limparFiltros = () => {
    setNome('');
    setCro('');
    setUf('');
    setOrdenacao('distancia');
  };

  const campoLocalizacao = (id: string) => (
    <>
      <label htmlFor={id} className={styles.label}>
        Localização
      </label>
      <input
        id={id}
        type="text"
        className={styles.input}
        placeholder="Rua, Bairro, Cidade, CEP..."
        value={localizacao}
        onChange={(e) => setLocalizacao(e.target.value)}
      />
      <button type="button" className={styles.localizacaoAtual} onClick={() => setLocalizacao('Localização atual')}>
        <CrosshairIcon /> Utilizar localização atual
      </button>
    </>
  );

  const campoEspecialidade = (id: string, rotulo: string) => (
    <div className={styles.campo}>
      <label htmlFor={id} className={styles.label}>
        {rotulo}
      </label>
      <div className={styles.selectWrap}>
        <select id={id} className={styles.select} value={especialidade} onChange={(e) => setEspecialidade(e.target.value)}>
          <option value=""></option>
          {ESPECIALIDADES.map((esp) => (
            <option value={esp} key={esp}>
              {esp}
            </option>
          ))}
        </select>
        <ChevronDownIcon className={styles.selectIcon} />
      </div>
    </div>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rede-credenciada-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar busca de dentistas">
          <CloseIcon />
        </button>

        <div className={styles.painel}>
          {vista === 'busca' && (
            <>
              <div className={styles.painelCorpo}>
                <h2 id="rede-credenciada-titulo" className={styles.titulo}>
                  Buscar dentistas
                </h2>
                <div className={styles.campo}>{campoLocalizacao('rc-localizacao')}</div>
                {campoEspecialidade('rc-especialidade', 'Especialidade')}
              </div>

              <div className={styles.painelRodape}>
                <button type="button" className={styles.btnPrimario} disabled={!podeBuscar} onClick={buscar}>
                  Buscar
                </button>
                <button type="button" className={styles.btnSecundario} onClick={() => setVista('avancada')}>
                  Busca avançada
                </button>
              </div>
            </>
          )}

          {vista === 'avancada' && (
            <>
              <div className={styles.painelCorpo}>
                <button type="button" className={styles.voltar} onClick={() => setVista('busca')} aria-label="Voltar">
                  <ArrowLeftIcon />
                </button>
                <h2 className={styles.titulo}>Busca avançada</h2>

                <div className={styles.campo}>{campoLocalizacao('rc-localizacao-av')}</div>

                <h3 className={styles.subtitulo}>Informações do dentista</h3>
                {campoEspecialidade('rc-especialidade-av', 'Especialidade (obrigatório)')}

                <div className={styles.campo}>
                  <label htmlFor="rc-nome" className={styles.label}>
                    Nome / Razão social
                  </label>
                  <input id="rc-nome" type="text" className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="rc-cro" className={styles.label}>
                    CRO
                  </label>
                  <input id="rc-cro" type="text" className={styles.input} value={cro} onChange={(e) => setCro(e.target.value)} />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="rc-uf" className={styles.label}>
                    UF
                  </label>
                  <div className={styles.selectWrap}>
                    <select id="rc-uf" className={styles.select} value={uf} onChange={(e) => setUf(e.target.value)}>
                      <option value=""></option>
                      {UFS.map((sigla) => (
                        <option value={sigla} key={sigla}>
                          {sigla}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className={styles.selectIcon} />
                  </div>
                </div>
              </div>

              <div className={styles.painelRodape}>
                <button type="button" className={styles.btnPrimario} disabled={!podeBuscar} onClick={buscar}>
                  Buscar
                </button>
              </div>
            </>
          )}

          {vista === 'resultados' && (
            <>
              <div className={styles.painelCorpo}>
                <div className={styles.resultadosTopo}>
                  <button type="button" className={styles.voltar} onClick={() => setVista('busca')} aria-label="Voltar">
                    <ArrowLeftIcon />
                  </button>
                  <button type="button" className={styles.refinarLink} onClick={() => setVista('refinar')}>
                    <FiltroIcon /> Refinar busca
                  </button>
                </div>

                <h2 className={styles.titulo}>Resultados</h2>

                {especialidade && (
                  <p className={styles.chips}>
                    <span className={styles.chip}>Especialidade</span>
                  </p>
                )}

                {resultados.length === 0 ? (
                  <p className={styles.vazio}>Nenhum dentista encontrado para os filtros escolhidos.</p>
                ) : (
                  <ul className={styles.lista}>
                    {resultados.map((d) => (
                      <li key={d.id}>
                        <button
                          type="button"
                          className={`${styles.cardResultado} ${selecionado?.id === d.id ? styles.cardResultadoAtivo : ''}`}
                          onClick={() => setSelecionado(d)}
                        >
                          <span className={styles.cardTopo}>
                            <span className={styles.cardNome}>{d.nome}</span>
                            <ChevronRightIcon size={12} className={styles.cardChevron} />
                          </span>
                          <span className={styles.cardEspecialidade}>{d.especialidade}</span>
                          <span className={styles.cardEndereco}>{d.enderecoLinha1}</span>
                          <span className={styles.cardEndereco}>{d.enderecoLinha2}</span>
                          <span className={styles.cardDistancia}>{d.distanciaLabel}</span>
                          <span className={styles.cardAtende}>
                            Atende: <strong>{listarPlanos(d.planos)}</strong>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {vista === 'refinar' && (
            <>
              <div className={styles.painelCorpo}>
                <div className={styles.resultadosTopo}>
                  <button type="button" className={styles.voltar} onClick={() => setVista('resultados')} aria-label="Fechar refinamento">
                    <CloseIcon size={20} />
                  </button>
                  <button type="button" className={styles.limparLink} onClick={limparFiltros}>
                    Limpar
                  </button>
                </div>

                <h2 className={styles.titulo}>Refinar busca</h2>

                <div className={styles.campo}>{campoLocalizacao('rc-localizacao-refinar')}</div>

                <h3 className={styles.subtitulo}>Ordenar por</h3>
                <label className={styles.radioLinha}>
                  <input
                    type="radio"
                    name="rc-ordenacao"
                    checked={ordenacao === 'distancia'}
                    onChange={() => setOrdenacao('distancia')}
                  />
                  Distância
                </label>
                <label className={styles.radioLinha}>
                  <input
                    type="radio"
                    name="rc-ordenacao"
                    checked={ordenacao === 'alfabetica'}
                    onChange={() => setOrdenacao('alfabetica')}
                  />
                  Ordem alfabética (A-Z)
                </label>

                <h3 className={styles.subtitulo}>Filtrar por</h3>
                {especialidade && (
                  <p className={styles.chips}>
                    <span className={styles.chip}>{especialidade}</span>
                  </p>
                )}

                {campoEspecialidade('rc-especialidade-refinar', 'Especialidade (obrigatório)')}

                <div className={styles.campo}>
                  <label htmlFor="rc-nome-refinar" className={styles.label}>
                    Nome / Razão social
                  </label>
                  <input
                    id="rc-nome-refinar"
                    type="text"
                    className={styles.input}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="rc-cro-refinar" className={styles.label}>
                    CRO
                  </label>
                  <input id="rc-cro-refinar" type="text" className={styles.input} value={cro} onChange={(e) => setCro(e.target.value)} />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="rc-uf-refinar" className={styles.label}>
                    UF
                  </label>
                  <div className={styles.selectWrap}>
                    <select id="rc-uf-refinar" className={styles.select} value={uf} onChange={(e) => setUf(e.target.value)}>
                      <option value=""></option>
                      {UFS.map((sigla) => (
                        <option value={sigla} key={sigla}>
                          {sigla}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className={styles.selectIcon} />
                  </div>
                </div>
              </div>

              <div className={styles.painelRodape}>
                <button type="button" className={styles.btnPrimario} disabled={!podeBuscar} onClick={buscar}>
                  Buscar
                </button>
              </div>
            </>
          )}
        </div>

        <div className={styles.mapa}>
          <span className={styles.mapaNota}>Mapa ilustrativo</span>

          {vista === 'resultados' &&
            resultados.map((d) => (
              <button
                type="button"
                key={d.id}
                className={`${styles.pin} ${selecionado?.id === d.id ? styles.pinAtivo : ''}`}
                style={{ left: `${d.pin.x}%`, top: `${d.pin.y}%` }}
                onClick={() => setSelecionado(d)}
                aria-label={`Ver ${d.nome} no mapa`}
              >
                <ToothPin />
              </button>
            ))}

          {selecionado && (
            <aside className={styles.detalhe}>
              <div className={styles.detalheCorpo}>
                <span className={styles.detalheAvatar}>
                  <ToothIcon size={26} />
                </span>
                <h3 className={styles.detalheNome}>{selecionado.nome}</h3>
                <p className={styles.detalheEspecialidade}>{selecionado.especialidade}</p>

                <div className={styles.detalheCard}>
                  <p className={styles.detalheRotulo}>CRO</p>
                  <p className={styles.detalheValorForte}>{selecionado.cro}</p>

                  <p className={styles.detalheEndereco}>{selecionado.enderecoLinha1}</p>
                  <p className={styles.detalheEndereco}>{selecionado.enderecoLinha2}</p>

                  <p className={styles.detalheRotulo}>Telefone(s)</p>
                  {selecionado.telefones.map((tel) => (
                    <p className={styles.detalheValor} key={tel}>
                      {tel}
                    </p>
                  ))}

                  <button type="button" className={styles.verMapa}>
                    Ver Mapa
                  </button>
                </div>
              </div>

              <div className={styles.detalheRodape}>
                <p className={styles.detalhePreco}>
                  Plano Odonto a partir de
                  <strong> R$ 33,50</strong>
                  <span>/mês</span>
                </p>
                <Link to="/odonto-2" className={styles.detalheCta} onClick={onClose}>
                  Faça uma cotação
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
