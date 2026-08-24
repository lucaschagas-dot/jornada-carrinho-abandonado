import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ComparePlanosModal.module.css';

function CheckIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <path d="M1.5 7l6 5.5L18.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type PlanoId = 'essencial' | 'essencialPlus' | 'pleno' | 'plenoOrtodontia';

type Plano = {
  id: PlanoId;
  nome: string;
  preco: string;
};

/**
 * Colunas do comparativo, na mesma ordem dos cards de "Nossos Planos
 * Odontológicos" (Odonto 1).
 */
const PLANOS: Plano[] = [
  { id: 'essencial', nome: 'Essencial', preco: 'R$ 33,50' },
  { id: 'essencialPlus', nome: 'Essencial Plus', preco: 'R$ 43,80' },
  { id: 'pleno', nome: 'Pleno', preco: 'R$ 58,20' },
  { id: 'plenoOrtodontia', nome: 'Pleno Ortodontia', preco: 'R$ 141,50' },
];

/**
 * Procedimentos e a quais planos cada um pertence. Extraído da própria loja
 * (loja.segurosunimed.com.br/odonto → "Compare os planos"), preservando ordem,
 * categoria e cobertura por plano.
 */
const PROCEDIMENTOS: Array<{ tipo: string; descricao: string; planos: PlanoId[] }> = [
  { tipo: 'Urgências e emergências', descricao: 'Consulta de urgência', planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Cirurgia', descricao: 'Extrações simples, semi inclusos e inclusos', planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Dentística', descricao: 'Restaurações em resina e amálgama', planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Diagnóstico', descricao: 'Consulta Inicial', planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'] },
  {
    tipo: 'Endodontia',
    descricao: 'Tratamento endodôntico unirradicular, birradicular, multirradicular',
    planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'],
  },
  {
    tipo: 'Odontopediatria',
    descricao: 'Prevenção (orientação de higiene bucal, aplicação de flúor e selantes)',
    planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'],
  },
  { tipo: 'Periodontia', descricao: 'Limpeza (Profilaxia)', planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Radiologia', descricao: 'Raio-x periapical, oclusal e interproximal', planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'] },
  {
    tipo: 'Prótese',
    descricao:
      'Prótese rol (coroa unitária provisória e definitiva, em cerômero para dentes anteriores e metálica para dentes posteriores)',
    planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'],
  },
  { tipo: 'Cirurgia', descricao: 'Cirurgia odontológica com aplicação de aloenxerto', planos: ['essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Cirurgia', descricao: 'Tracionamento cirúrgico com finalidade ortodôntica', planos: ['essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Endodontia', descricao: 'Clareamento de dente desvitalizado-escurecido', planos: ['essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Odontopediatria', descricao: 'Mantenedor de espaço fixo e/ou removível', planos: ['essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Periodontia', descricao: 'Enxerto conjuntivo subepitelial', planos: ['essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Diagnóstico', descricao: 'Consulta técnica clareamento caseiro', planos: ['essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Radiologia', descricao: 'Radiografia Panorâmica', planos: ['essencial', 'essencialPlus', 'pleno', 'plenoOrtodontia'] },
  { tipo: 'Radiologia', descricao: 'Telerradiografia', planos: ['pleno', 'plenoOrtodontia'] },
  { tipo: 'Prótese', descricao: 'Coroa total acrílica prensada', planos: ['pleno', 'plenoOrtodontia'] },
  { tipo: 'Prótese', descricao: 'Coroa total metalo-plástica', planos: ['pleno', 'plenoOrtodontia'] },
  { tipo: 'Prótese', descricao: 'Restauração em cerômero inlay/onlay', planos: ['pleno', 'plenoOrtodontia'] },
  { tipo: 'Ortodontia', descricao: 'Documentação ortodôntica', planos: ['plenoOrtodontia'] },
  { tipo: 'Ortodontia', descricao: 'Aparelho ortodôntico fixo metálico e removível', planos: ['plenoOrtodontia'] },
  {
    tipo: 'Ortodontia',
    descricao: 'Manutenção de aparelho ortodôntico (exclusivamente para os aparelhos fixos cobertos de acordo com o plano contratado)',
    planos: ['plenoOrtodontia'],
  },
];

/** A loja corta o rótulo em 25 caracteres e joga o texto completo num tooltip. */
const LIMITE_ROTULO = 25;

type ComparePlanosModalProps = {
  onClose: () => void;
};

export function ComparePlanosModal({ onClose }: ComparePlanosModalProps) {
  const [tooltipAberto, setTooltipAberto] = useState<number | null>(null);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-planos-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar comparativo">
          <CloseIcon />
        </button>

        <h2 id="compare-planos-titulo" className={styles.title}>
          Compare nossos planos
        </h2>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.cornerCell}>
                  <span className={styles.cornerLabel}>Procedimentos</span>
                </th>
                {PLANOS.map((plano) => (
                  <th scope="col" className={styles.planCell} key={plano.id}>
                    <span className={styles.planName}>{plano.nome}</span>
                    <span className={styles.planPriceRow}>
                      <span className={styles.planPrice}>{plano.preco}</span>
                      <span className={styles.planPeriod}>/mês</span>
                    </span>
                    <Link to="/odonto-2" className={styles.contratarButton}>
                      Contratar
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {PROCEDIMENTOS.map((proc, i) => {
                const precisaCortar = proc.descricao.length > LIMITE_ROTULO;
                const rotulo = precisaCortar ? `${proc.descricao.slice(0, LIMITE_ROTULO)}...` : proc.descricao;

                return (
                  <tr className={styles.row} key={`${proc.tipo}-${proc.descricao}`}>
                    <th scope="row" className={styles.procCell}>
                      <span className={styles.procLabel}>{rotulo}</span>
                      {precisaCortar && (
                        <span className={styles.tooltipWrap}>
                          <button
                            type="button"
                            className={styles.tooltipButton}
                            aria-expanded={tooltipAberto === i}
                            aria-label={`Ver descrição completa: ${proc.descricao}`}
                            onClick={() => setTooltipAberto((atual) => (atual === i ? null : i))}
                          >
                            ?
                          </button>
                          {tooltipAberto === i && <span className={styles.tooltip}>{proc.descricao}</span>}
                        </span>
                      )}
                    </th>

                    {PLANOS.map((plano) => {
                      const incluso = proc.planos.includes(plano.id);
                      return (
                        <td className={styles.checkCell} key={plano.id}>
                          {incluso ? (
                            <>
                              <CheckIcon />
                              <span className={styles.srOnly}>Incluído no {plano.nome}</span>
                            </>
                          ) : (
                            <span className={styles.srOnly}>Não incluído no {plano.nome}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
