import type { ReactNode } from 'react';

/**
 * Um ícone por cobertura do Seguro Residencial.
 *
 * A loja usa Font Awesome Pro, que é licenciada e não entra no projeto (mesma
 * decisão do resto do protótipo, ver README). Estes são SVGs simples,
 * redesenhados com o mesmo traço: 20x20, `currentColor`, sem preenchimento.
 */

type Props = { className?: string };

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function Chama({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M10 2.5c2.4 2.6 4.5 4.6 4.5 7.7a4.5 4.5 0 1 1-9 0c0-1.5.6-2.7 1.6-3.9.5 1 1.1 1.5 1.8 1.7-.2-2 .3-3.7 1.1-5.5Z" />
    </svg>
  );
}

function Casa({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8.6 10 3l7 5.6V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.6Z" />
      <path d="M8 17v-4.2h4V17" />
    </svg>
  );
}

function Familia({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="7.2" cy="6.4" r="2.4" />
      <circle cx="14" cy="7.6" r="1.8" />
      <path d="M2.8 16.2c0-2.4 2-4 4.4-4s4.4 1.6 4.4 4" />
      <path d="M13.2 12.4c2.1 0 4 1.4 4 3.8" />
    </svg>
  );
}

function Escudo({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M10 2.6 16 5v5.2c0 3.3-2.4 6-6 7.2-3.6-1.2-6-3.9-6-7.2V5l6-2.4Z" />
    </svg>
  );
}

function Tomada({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M7.2 2.6v3.6M12.8 2.6v3.6" />
      <path d="M5 6.2h10v3a5 5 0 0 1-10 0v-3Z" />
      <path d="M10 14.2v3.2" />
    </svg>
  );
}

function Gota({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M10 2.8c2.6 3.2 4.6 5.6 4.6 8.1a4.6 4.6 0 1 1-9.2 0c0-2.5 2-4.9 4.6-8.1Z" />
    </svg>
  );
}

function Carro({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12.4h14v3H3z" />
      <path d="M4.4 12.4 6 7.8h8l1.6 4.6" />
      <circle cx="6.4" cy="15.4" r="1.4" />
      <circle cx="13.6" cy="15.4" r="1.4" />
    </svg>
  );
}

function Vidro({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 3.4h13.2v13.2H3.4z" />
      <path d="M10 3.4v13.2M3.4 10h13.2" />
    </svg>
  );
}

function Escritorio({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 5h13.2v8H3.4z" />
      <path d="M2 16h16" />
    </svg>
  );
}

function Vento({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M2.6 7.4h8.2a2.2 2.2 0 1 0-2.2-2.2" />
      <path d="M2.6 11.4h11a2.2 2.2 0 1 1-2.2 2.2" />
      <path d="M2.6 15.2h5.6" />
    </svg>
  );
}

function Documento({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M5 2.6h6l4 4V17a.8.8 0 0 1-.8.8H5a.8.8 0 0 1-.8-.8V3.4A.8.8 0 0 1 5 2.6Z" />
      <path d="M11 2.6v4.2h4" />
    </svg>
  );
}

function Multidao({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 16.6v-1.4a2.6 2.6 0 0 1 2.6-2.6h1.4a2.6 2.6 0 0 1 2.6 2.6v1.4" />
      <circle cx="6.7" cy="8.2" r="2.2" />
      <path d="M12.6 16.6v-1.4a2.6 2.6 0 0 1 1.6-2.4" />
      <circle cx="14.4" cy="8.8" r="1.8" />
    </svg>
  );
}

/** codigo da cobertura -> ícone. */
const ICONES: Record<string, (p: Props) => ReactNode> = {
  coberturaIncendio: Chama,
  coberturaAluguel: Casa,
  coberturaRcf: Familia,
  coberturaRoubo: Escudo,
  coberturaDanosEletricos: Tomada,
  coberturaRompimentoTubulacao: Gota,
  coberturaImpactoVeiculos: Carro,
  coberturaQuebraVidros: Vidro,
  coberturaEscritorioResidencia: Escritorio,
  coberturaVendaval: Vento,
  coberturaRecomposicaoDocumentos: Documento,
  coberturaTumultos: Multidao,
};

export function IconeCobertura({ codigo, className }: { codigo: string; className?: string }) {
  const Icone = ICONES[codigo] ?? Escudo;
  return <>{Icone({ className })}</>;
}
