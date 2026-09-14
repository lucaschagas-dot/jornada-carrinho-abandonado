/**
 * Glifos de Marte e Vênus dos botões "Masculino / Feminino".
 *
 * A loja usa Font Awesome Pro, que é licenciada e não entra no projeto (ver
 * README). São redesenhos simples com o mesmo traço, usados pela Identificação
 * do Odonto e pela do Residencial — ficam aqui para as duas telas não
 * carregarem cópias do mesmo desenho.
 */

type Props = { size?: number };

export function MarsIcon({ size = 14 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="9.5" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 5.5l4-4M9.5 1.5h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VenusIcon({ size = 14 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11v4M5.5 13.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
