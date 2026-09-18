import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarraEtapa } from './BarraEtapa';
import { ChevronDownIcon } from './icons';
import { DocumentoIcon, LapisIcon } from './iconesResumo';
import { formatarCapital, useVida } from '../vidaEstado';
import { ASSISTENCIAS_VIDA, BENEFICIOS_VIDA, COBERTURAS_VIDA } from '../vida';
import styles from './ResumoVida.module.css';

type ResumoVidaProps = {
  /** Para onde o "Continuar" leva. Ausente = botão desabilitado. */
  continuarPara?: string;
  rotuloContinuar?: string;
  onContinuar?: () => void;
};

type SecaoProps = {
  titulo: string;
  /** Etapa que o lápis reabre. */
  editar: string;
  children: ReactNode;
};

/**
 * Uma seção do resumo: abre no chevron e tem o lápis que volta para a etapa
 * onde aquele dado foi preenchido — mesmo desenho do `ResumoResidencial`.
 *
 * Diferença obrigatória em relação a ele: no Residencial o resumo só existe na
 * tela de Pagamento, então todo lápis aponta para outro lugar. Aqui o resumo
 * acompanha as nove etapas, e numa delas o lápis apontaria para a própria tela
 * — link para lugar nenhum. Por isso ele some quando a etapa é a atual.
 */
function Secao({ titulo, editar, children }: SecaoProps) {
  const [aberta, setAberta] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className={styles.secao}>
      <div className={styles.cabecalho}>
        <button type="button" className={styles.gatilho} aria-expanded={aberta} onClick={() => setAberta((a) => !a)}>
          <ChevronDownIcon size={16} className={aberta ? `${styles.seta} ${styles.setaAberta}` : styles.seta} />
          {titulo}
        </button>
        {pathname !== editar && (
          <Link to={editar} className={styles.editar} aria-label={`Editar ${titulo.toLowerCase()}`}>
            <LapisIcon />
          </Link>
        )}
      </div>

      {aberta && <div className={styles.corpo}>{children}</div>}
    </div>
  );
}

function Item({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <p className={styles.item}>
      <strong className={styles.itemRotulo}>{rotulo}:</strong> {children}
    </p>
  );
}

/**
 * Resumo da jornada de Vida, presente em todas as etapas na loja.
 *
 * O conteúdo é o mesmo em qualquer tamanho de tela, mas quem decide a forma é a
 * `BarraEtapa`: no desktop ela entra em modo `fixo` — a caixa gruda no topo,
 * não acompanha a rolagem da página e só o miolo rola por dentro; no celular
 * vira a barra do rodapé com o painel de tela cheia. É o mesmo tratamento do
 * Residencial, onde a regra é: onde há resumo lateral, ele fica preso.
 *
 * O total continua sendo a mensalidade. O bloco "1x de X / ou até Nx de Y" do
 * Residencial NÃO foi copiado: lá o prêmio é anual e parcelado, e o Seguro de
 * Vida é mensalidade recorrente — `vida.ts` não tem valor anual nem número de
 * parcelas, então o bloco só existiria com número inventado.
 */
export function ResumoVida({ continuarPara, rotuloContinuar = 'Continuar', onContinuar }: ResumoVidaProps) {
  const { sim, totalMensal, protocolo } = useVida();

  const temPerfil = sim.sexo !== null;
  const temSeguro = sim.capitalSegurado > 0;
  const nomeProfissao = sim.profissao ? sim.profissao.descricao : sim.profissaoLivre;

  const coberturasAtivas = COBERTURAS_VIDA.filter(
    (c) =>
      !c.opcional ||
      (c.codigo === 'coberturaCancer' && sim.coberturaCancer) ||
      (c.codigo === 'coberturaMorteAcidental' && sim.coberturaMorteAcidental),
  );
  const assistenciasAtivas = ASSISTENCIAS_VIDA.filter((a) => sim.assistencias[a.codigo]);
  const dpsRespondida = sim.dpsRespostas.some((r) => r !== null);

  const detalhes = (
    <>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Resumo</h2>
        <span className={styles.protocolo}>Protocolo n° {protocolo}</span>
      </div>

      {!temPerfil && <p className={styles.vazio}>Todos os dados relativos à sua compra serão exibidos aqui.</p>}

      {temPerfil && (
        <Secao titulo="Perfil" editar="/vida-cotacao">
          <Item rotulo="Sexo">{sim.sexo}</Item>
          {sim.dataNascimento && <Item rotulo="Data de nascimento">{sim.dataNascimento}</Item>}
          {nomeProfissao && <Item rotulo="Profissão">{nomeProfissao}</Item>}
          {sim.rendaMensal !== null && <Item rotulo="Renda mensal">{formatarCapital(sim.rendaMensal)}</Item>}
          {sim.altura !== null && <Item rotulo="Altura">{(sim.altura / 100).toFixed(2).replace('.', ',')}m</Item>}
          {sim.peso !== null && <Item rotulo="Peso">{sim.peso}kg</Item>}
          {/* Sem rótulo isso saía como "Nunca fumei" solto no meio de linhas
              rotuladas, parecendo sobra de outro campo. */}
          {sim.relacaoCigarro && <Item rotulo="Cigarro">{sim.relacaoCigarro}</Item>}
        </Secao>
      )}

      {temSeguro && (
        <Secao titulo="Seguro" editar="/vida-produto">
          <Item rotulo="Capital segurado">{formatarCapital(sim.capitalSegurado)}</Item>

          <p className={styles.subtitulo}>Coberturas</p>
          {coberturasAtivas.map((c) => (
            <p className={styles.linha} key={c.codigo}>
              {c.titulo}
            </p>
          ))}

          <p className={styles.subtitulo}>Benefícios inclusos</p>
          {BENEFICIOS_VIDA.map((b) => (
            <p className={styles.linha} key={b.codigo}>
              {b.titulo}
            </p>
          ))}
        </Secao>
      )}

      {/* Assistências saem do Seguro e viram seção própria: são escolhidas numa
          etapa diferente, então o lápis delas tem outro destino. */}
      {temSeguro && (
        <Secao titulo="Assistências" editar="/vida-assistencias">
          {assistenciasAtivas.length === 0 ? (
            <p className={styles.linha}>Nenhuma selecionada</p>
          ) : (
            assistenciasAtivas.map((a) => (
              <p className={styles.linha} key={a.codigo}>
                {a.titulo}
              </p>
            ))
          )}
        </Secao>
      )}

      {sim.beneficiarios.length > 0 && (
        <Secao titulo="Beneficiários" editar="/vida-beneficiario">
          {sim.beneficiarios.map((b, indice) => (
            <p className={styles.cobertura} key={`${b.nome}-${indice}`}>
              <span>
                {b.nome || `Beneficiário ${indice + 1}`}
                {b.grau && ` · ${b.grau}`}
              </span>
              <span className={styles.coberturaCapital}>{b.percentual}%</span>
            </p>
          ))}
        </Secao>
      )}

      {(dpsRespondida || sim.dpsAdiada) && (
        <Secao titulo="Declaração de Saúde" editar="/vida-dps">
          {sim.dpsAdiada ? (
            <Item rotulo="Situação">Adiada — será retomada após a compra</Item>
          ) : (
            <Item rotulo="Situação">
              {sim.dpsRespostas.filter((r) => r !== null).length} de {sim.dpsRespostas.length} perguntas respondidas
            </Item>
          )}
        </Secao>
      )}
    </>
  );

  return (
    <BarraEtapa
      fixo
      total={temSeguro ? totalMensal : undefined}
      detalhes={detalhes}
      rodape={
        <button type="button" className={styles.caracteristicas}>
          <DocumentoIcon /> Ver características gerais
        </button>
      }
    >
      {continuarPara ? (
        <Link to={continuarPara} className={styles.continuar} onClick={onContinuar}>
          {rotuloContinuar}
        </Link>
      ) : (
        <button type="button" className={styles.continuar} disabled>
          {rotuloContinuar}
        </button>
      )}
    </BarraEtapa>
  );
}
