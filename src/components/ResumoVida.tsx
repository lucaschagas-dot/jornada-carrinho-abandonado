import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BarraEtapa } from './BarraEtapa';
import { ChevronDownIcon } from './icons';
import { formatarCapital, useVida } from '../vidaEstado';
import { ASSISTENCIAS_VIDA, BENEFICIOS_VIDA, COBERTURAS_VIDA } from '../vida';
import styles from './ResumoVida.module.css';

type ResumoVidaProps = {
  /** Para onde o "Continuar" leva. Ausente = botão desabilitado. */
  continuarPara?: string;
  rotuloContinuar?: string;
  onContinuar?: () => void;
  /** Conteúdo extra acima do total (usado pela tela de pagamento). */
  children?: ReactNode;
};

/**
 * Resumo da jornada de Vida, presente em todas as etapas na loja.
 *
 * O conteúdo é o mesmo em qualquer tamanho de tela — protocolo, acordeões de
 * Perfil e Seguro, total e "Continuar" —, mas quem decide a forma é a
 * `BarraEtapa`: coluna lateral no desktop, barra fixa no rodapé no celular,
 * como a loja faz.
 */
export function ResumoVida({ continuarPara, rotuloContinuar = 'Continuar', onContinuar, children }: ResumoVidaProps) {
  const { sim, totalMensal, protocolo } = useVida();
  const [abertos, setAbertos] = useState({ perfil: false, seguro: false });

  const alternar = (chave: 'perfil' | 'seguro') => setAbertos((a) => ({ ...a, [chave]: !a[chave] }));

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

  const detalhes = (
    <>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Resumo</h2>
        <span className={styles.protocolo}>Protocolo n° {protocolo}</span>
      </div>

      {!temPerfil && <p className={styles.vazio}>Todos os dados relativos à sua compra serão exibidos aqui.</p>}

      {temPerfil && (
        <div className={styles.secao}>
          <button
            type="button"
            className={styles.cabecalho}
            aria-expanded={abertos.perfil}
            onClick={() => alternar('perfil')}
          >
            <ChevronDownIcon size={16} className={abertos.perfil ? `${styles.seta} ${styles.setaAberta}` : styles.seta} />
            Perfil
          </button>
          {abertos.perfil && (
            <div className={styles.corpo}>
              <p className={styles.linha}>Sexo: {sim.sexo}</p>
              {sim.dataNascimento && <p className={styles.linha}>Data de nascimento: {sim.dataNascimento}</p>}
              {nomeProfissao && <p className={styles.linha}>Profissão: {nomeProfissao}</p>}
              {sim.rendaMensal !== null && <p className={styles.linha}>Renda mensal: {formatarCapital(sim.rendaMensal)}</p>}
              {sim.altura !== null && <p className={styles.linha}>Altura: {(sim.altura / 100).toFixed(2).replace('.', ',')}m</p>}
              {sim.peso !== null && <p className={styles.linha}>Peso: {sim.peso}kg</p>}
              {sim.relacaoCigarro && <p className={styles.linha}>{sim.relacaoCigarro}</p>}
            </div>
          )}
        </div>
      )}

      {temSeguro && (
        <div className={styles.secao}>
          <button
            type="button"
            className={styles.cabecalho}
            aria-expanded={abertos.seguro}
            onClick={() => alternar('seguro')}
          >
            <ChevronDownIcon size={16} className={abertos.seguro ? `${styles.seta} ${styles.setaAberta}` : styles.seta} />
            Seguro
          </button>
          {abertos.seguro && (
            <div className={styles.corpo}>
              <p className={styles.linha}>Capital segurado: {formatarCapital(sim.capitalSegurado)}</p>

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

              <p className={styles.subtitulo}>Assistências opcionais</p>
              {assistenciasAtivas.length === 0 ? (
                <p className={styles.linha}>Nenhuma selecionada</p>
              ) : (
                assistenciasAtivas.map((a) => (
                  <p className={styles.linha} key={a.codigo}>
                    {a.titulo}
                  </p>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {children}
    </>
  );

  return (
    <BarraEtapa
      total={temSeguro ? totalMensal : undefined}
      detalhes={detalhes}
      rodape={
        <button type="button" className={styles.caracteristicas}>
          Ver características gerais
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
