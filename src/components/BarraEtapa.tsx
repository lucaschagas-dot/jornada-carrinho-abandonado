import { useEffect, useState, type ReactNode } from 'react';
import { ChevronUpIcon } from './icons';
import { formatarBRL } from '../jornada';
import styles from './BarraEtapa.module.css';

type BarraEtapaProps = {
  /** Valor à esquerda na barra. Ausente = a barra fica só com a ação. */
  total?: number;
  rotuloTotal?: string;
  /** Substitui o par rótulo/valor quando a etapa precisa de algo mais que um número. */
  valor?: ReactNode;
  /** Conteúdo do painel "Resumo". Ausente = sem aba para abrir. */
  detalhes?: ReactNode;
  /** Botão ou link principal da etapa. */
  children: ReactNode;
  /** Texto miúdo abaixo da ação, só no desktop (ex.: "Ver características gerais"). */
  rodape?: ReactNode;
  /**
   * No desktop, prende a caixa na altura da tela em vez de deixá-la rolar junto
   * com a página: os detalhes ganham rolagem própria e total e ação ficam
   * colados no rodapé dela. No celular não muda nada — lá a barra já é fixa.
   */
  fixo?: boolean;
};

/**
 * Resumo da etapa, no formato que a loja usa.
 *
 * No celular a loja não empilha o resumo abaixo do conteúdo: ela o transforma
 * numa barra fixa no rodapé com o total à esquerda e a ação à direita, mais uma
 * aba "Resumo" que abre um painel de tela cheia por cima. No desktop a mesma
 * caixa vira a coluna lateral que acompanha a rolagem.
 *
 * As medidas vêm do CSS da própria loja (`.simulacao-resumo-box`): barra de
 * 89px, painel colado em `bottom: 89px`, aba em `top: -24px`, e a virada em
 * 1024px — que é o breakpoint de desktop dela, não os 900px que este protótipo
 * usava antes.
 */
export function BarraEtapa({ total, rotuloTotal = 'Total/mês', valor, detalhes, children, rodape, fixo }: BarraEtapaProps) {
  const [aberto, setAberto] = useState(false);

  // Enquanto a barra existe, avisa a altura dela para quem flutua no rodapé
  // (balão do WhatsApp, menu "Telas") poder subir e não cobrir o botão.
  // No modo `fixo` avisa também que há uma coluna presa na direita: a caixa vai
  // até o pé da janela e, sem isso, o balão do WhatsApp cai em cima do rodapé
  // dela ("Ver características gerais").
  useEffect(() => {
    const raiz = document.documentElement.style;
    raiz.setProperty('--altura-barra-etapa', '89px');
    if (fixo) raiz.setProperty('--resumo-fixo', '1');
    return () => {
      raiz.removeProperty('--altura-barra-etapa');
      raiz.removeProperty('--resumo-fixo');
    };
  }, [fixo]);

  return (
    <>
      {/* Reserva no fluxo o espaço que a barra fixa ocupa, para o fim do
          conteúdo não ficar escondido atrás dela. */}
      <div className={styles.espacador} aria-hidden="true" />

      <aside className={fixo ? `${styles.barra} ${styles.fixo}` : styles.barra}>
        {detalhes && (
          <button
            type="button"
            className={styles.aba}
            aria-expanded={aberto}
            onClick={() => setAberto((a) => !a)}
          >
            Resumo
            <ChevronUpIcon size={12} className={aberto ? `${styles.seta} ${styles.setaAberta}` : styles.seta} />
          </button>
        )}

        {detalhes && (
          <div className={`${styles.painel} ${aberto ? styles.painelAberto : ''}`}>
            <div className={styles.painelConteudo}>{detalhes}</div>
          </div>
        )}

        <div className={styles.linha}>
          {/* Sem total o bloco inteiro sai: renderizá-lo vazio deixava, no
              desktop, um filete de borda solto acima do botão. */}
          {valor !== undefined ? (
            <div className={styles.valor}>{valor}</div>
          ) : (
            total !== undefined && (
              <p className={styles.valor}>
                <span className={styles.valorRotulo}>{rotuloTotal}</span>
                <strong className={styles.valorNumero}>{formatarBRL(total)}</strong>
              </p>
            )
          )}
          <div className={styles.acao}>{children}</div>
        </div>

        {rodape && <div className={styles.rodape}>{rodape}</div>}
      </aside>
    </>
  );
}
