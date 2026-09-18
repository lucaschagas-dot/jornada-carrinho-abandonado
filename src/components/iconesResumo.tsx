/**
 * Glifos do resumo lateral: o lápis que reabre a etapa e o documento do
 * "Ver características gerais".
 *
 * A loja usa Font Awesome Pro, que é licenciada e não entra no projeto (ver
 * README). São redesenhos com o mesmo traço, usados pelo resumo do Residencial
 * e pelo de Vida — ficam aqui para os dois não carregarem cópias do mesmo
 * desenho. `icons.tsx` segue intocado, como o resto do projeto trata ícones
 * novos (ver os outros módulos `icones*.tsx`).
 */

type Props = { className?: string };

export function LapisIcon({ className }: Props) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M13.1 6.2 8.2 11.1l-.4 1.9 1.9-.4 4.9-4.9a1 1 0 0 0 0-1.5 1 1 0 0 0-1.5 0Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DocumentoIcon({ className }: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 2.6h6l4 4V17a.8.8 0 0 1-.8.8H5a.8.8 0 0 1-.8-.8V3.4A.8.8 0 0 1 5 2.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M11 2.6v4.2h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
