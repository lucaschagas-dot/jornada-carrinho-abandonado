import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BarraEtapa } from './BarraEtapa';
import { ChevronDownIcon } from './icons';
import { DocumentoIcon, LapisIcon } from './iconesResumo';
import { DEMO_USER } from '../demoUser';
import { formatarBRL } from '../jornada';
import { COBERTURAS, type Combo } from '../residencial';
import styles from './ResumoResidencial.module.css';

const POR_CODIGO = Object.fromEntries(COBERTURAS.map((c) => [c.codigo, c]));

const formatarCapital = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

type SecaoProps = {
  titulo: string;
  /** Etapa que o lápis reabre. */
  editar: string;
  children: ReactNode;
};

function Secao({ titulo, editar, children }: SecaoProps) {
  const [aberta, setAberta] = useState(false);

  return (
    <div className={styles.secao}>
      <div className={styles.cabecalho}>
        <button
          type="button"
          className={styles.gatilho}
          aria-expanded={aberta}
          onClick={() => setAberta((a) => !a)}
        >
          <ChevronDownIcon size={16} className={aberta ? `${styles.seta} ${styles.setaAberta}` : styles.seta} />
          {titulo}
        </button>
        <Link to={editar} className={styles.editar} aria-label={`Editar ${titulo.toLowerCase()}`}>
          <LapisIcon />
        </Link>
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

type ResumoResidencialProps = {
  combo: Combo;
  /** Ação principal da etapa (o botão fica colado no rodapé da caixa). */
  children: ReactNode;
};

/**
 * Resumo do Residencial, no formato que a loja usa nas etapas finais: seções
 * que abrem no chevron, cada uma com um lápis que volta para a etapa de origem,
 * e total, ação e "Ver características gerais" presos embaixo.
 *
 * Quem decide a forma é a `BarraEtapa` — aqui ela entra em modo `fixo`: no
 * desktop a caixa ocupa a altura da tela e não acompanha a rolagem da página
 * (só o miolo rola por dentro); no celular continua sendo a barra do rodapé com
 * o painel de tela cheia.
 */
export function ResumoResidencial({ combo, children }: ResumoResidencialProps) {
  const detalhes = (
    <>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Resumo</h2>
        <span className={styles.protocolo}>Protocolo n° {DEMO_USER.protocolo}</span>
      </div>

      <Secao titulo="Residência segurada" editar="/residencial-cotacao">
        <Item rotulo="CEP">{DEMO_USER.cep}</Item>
        <Item rotulo="Endereço">{DEMO_USER.endereco}</Item>
        <Item rotulo="Tipo">Casa</Item>
        <Item rotulo="Tipo de moradia">Habitual</Item>
      </Secao>

      <Secao titulo="Seguro" editar="/residencial-coberturas">
        <Item rotulo="Plano">{combo.nome}</Item>
        <Item rotulo="Vigência">12 meses</Item>
        <p className={styles.subtitulo}>Coberturas</p>
        {Object.entries(combo.coberturas).map(([codigo, capital]) => (
          <p className={styles.cobertura} key={codigo}>
            <span>{POR_CODIGO[codigo]?.titulo ?? codigo}</span>
            <span className={styles.coberturaCapital}>{formatarCapital(capital)}</span>
          </p>
        ))}
      </Secao>

      <Secao titulo="Dados pessoais" editar="/residencial-identificacao">
        <Item rotulo="CPF">{DEMO_USER.cpf}</Item>
        <Item rotulo="Nome completo">{DEMO_USER.nomeCompleto}</Item>
        <Item rotulo="E-mail">{DEMO_USER.email}</Item>
        <Item rotulo="Celular">{DEMO_USER.celular}</Item>
        <Item rotulo="Data de nascimento">{DEMO_USER.dataNascimento}</Item>
        <Item rotulo="Sexo">{DEMO_USER.sexo}</Item>
      </Secao>
    </>
  );

  const valor = (
    <div className={styles.total}>
      <span className={styles.totalRotulo}>Total</span>
      <span className={styles.totalValores}>
        <span className={styles.totalAvista}>1x de {formatarBRL(combo.anual)}</span>
        <span className={styles.totalParcelado}>
          ou até {combo.parcelas}x de <strong className={styles.totalNumero}>{formatarBRL(combo.mensal)}</strong>
        </span>
      </span>
    </div>
  );

  return (
    <BarraEtapa
      fixo
      valor={valor}
      detalhes={detalhes}
      rodape={
        <button type="button" className={styles.caracteristicas}>
          <DocumentoIcon /> Ver características gerais
        </button>
      }
    >
      {children}
    </BarraEtapa>
  );
}
