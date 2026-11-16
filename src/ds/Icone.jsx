// Ícones de traço usados nos menus e nas páginas. Um traço só, 24×24, cor herdada.
const P = {
  app: <><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 17.5h2" /></>,
  interop: <><path d="M9 7V3m6 4V3M7 7h10v4a5 5 0 0 1-10 0V7Zm5 9v5" /></>,
  chat: <><path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.3-3.6A7.9 7.9 0 0 1 4 12Z" /><path d="M9 11h6M9 14h4" /></>,
  libras: <><rect x="3" y="5" width="14" height="11" rx="2" /><path d="m17 9 4-2v8l-4-2M10 16v3m-3 0h6" /></>,
  ia: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1m0-11.4-2.1 2.1m-7.2 7.2-2.1 2.1" /><circle cx="12" cy="12" r="2.5" /></>,
  os: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M9 12l2 2 4-4M9 17h6" /></>,
  saude: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" />,
  infra: <path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z" />,
  ambiente: <path d="M12 21v-6m0 0c-4 0-7-2.7-7-6.5C5 5 8.1 3 12 3s7 2 7 5.5c0 3.8-3 6.5-7 6.5Zm0-6 3-3m-3 1-2.5-2.5" />,
  grade: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
  blog: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h5" /></>,
  materiais: <><path d="M12 4v11m0 0-4-4m4 4 4-4" /><path d="M5 16v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" /></>,
  ajuda: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4V14M12 17.3v.2" /></>,
  pessoas: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.6a3.2 3.2 0 0 1 0 6.3M21 20c0-2.8-1.9-5.2-4.5-5.8" /></>,
  onibus: <><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M5 11h14M8 18v3m8-3v3M8.5 14.5h.01m7 0h.01" /></>,
  pata: <><circle cx="7" cy="9" r="1.8" /><circle cx="11" cy="6" r="1.8" /><circle cx="15" cy="6.5" r="1.8" /><circle cx="18" cy="10" r="1.8" /><path d="M12 12c-3 0-5.5 3.2-5.5 5.6 0 1.6 1.3 2.4 2.8 2.4 1.1 0 1.8-.5 2.7-.5s1.6.5 2.7.5c1.5 0 2.8-.8 2.8-2.4C17.5 15.2 15 12 12 12Z" /></>,
  escola: <><path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" /><path d="M7 11.5V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5M21 9.5V14" /></>,
  moeda: <><circle cx="12" cy="12" r="8.5" /><path d="M14.5 9.5c-.4-.9-1.4-1.5-2.5-1.5-1.5 0-2.5.9-2.5 2s1 1.7 2.5 2 2.5.9 2.5 2-1 2-2.5 2c-1.1 0-2.1-.6-2.5-1.5M12 6.5V8m0 8v1.5" /></>,
  predio: <><path d="M4 21V6l7-3v18M11 21h9V10l-9-3" /><path d="M7 9h.01M7 12h.01M7 15h.01M14.5 13h2m-2 3h2" /></>,
  busca: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  seta: <path d="M5 12h14m-6-6 6 6-6 6" />,
  video: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5z" /></>,
  arquivo: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5" /></>,
  tv: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4M10 9v4l3.5-2z" /></>,
  mapa: <><path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>,
  camara: <><path d="M3 9.5 12 4l9 5.5H3ZM5 20h14M4 22h16M6.5 10v8m4-8v8m3-8v8m4-8v8" /></>,
  cadeado: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2" /></>,
  assinatura: <><path d="M4 20h16M6 16.5l9.5-9.5 2.5 2.5L8.5 19H6v-2.5Z" /><path d="m14 8.5 2.5 2.5" /></>,
  nuvem: <path d="M7.5 18.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 11.1 3.7 3.7 0 0 0 7.5 18.5Z" />,
  painel: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 16v-4m4 4V9m4 7v-6m4 6v-2" /></>,
  balanca: <><path d="M12 4v16M7 20h10M5 7h14M12 4l-1 3m1-3 1 3" /><path d="m5 7-2.5 6a3 3 0 0 0 5 0L5 7Zm14 0-2.5 6a3 3 0 0 0 5 0L19 7Z" /></>,
  megafone: <><path d="M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M18.5 9a4 4 0 0 1 0 6M8 15l1.5 5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  relogio: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  troca: <><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5" /></>,
};

export default function Icone({ nome, size = 20, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[nome]}
    </svg>
  );
}
