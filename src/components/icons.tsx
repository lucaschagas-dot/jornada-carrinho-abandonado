type IconProps = {
  size?: number;
  className?: string;
};

export function ChevronDownIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 10 6" fill="none" className={className} aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size * 0.6} height={size} viewBox="0 0 6 10" fill="none" className={className} aria-hidden="true">
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.75 13.55L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 8.6c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.5.6 1.6.1.1.1.3 0 .4-.1.2-.1.3-.3.5-.1.2-.3.3-.1.6.2.4.9 1.4 1.9 1.9.3.2.5.1.6 0 .2-.2.5-.6.7-.8.1-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.3.1.4.2 0 .2 0 .8-.3 1.2-.3.5-1.4.9-1.9.9-.5 0-1.1 0-3.3-1.4-1.7-1.1-2.8-2.9-2.9-3.1-.1-.1-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronUpIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 16 10" fill="none" className={className} aria-hidden="true">
      <path d="M1 9l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
