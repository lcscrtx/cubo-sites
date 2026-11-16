// Marcas e dados dos produtos da Cubo, usados nos três sites novos (Cubo, Legislativo e Zero Papel)
// e no bloco "Por onde começar?". Cada produto leva ao próprio site.

export const CUBO_HOME = "/";
export const CC_HOME = "/cidade-conectada";
export const ZP_HOME = "/cidade-zero-papel";
export const LC_HOME = "/legislativo-conectado";

export function LogoCubo({ altura = 22 }) {
  return <img className="mk-cubo" src="/brand/cubo-logo.svg" alt="Cubo Tecnologia" height={altura} style={{ height: altura, width: "auto" }} />;
}

export function LogoCidadeConectada({ altura = 34 }) {
  return <img src="/brand/cidade-conectada-logo.svg" alt="Cidade Conectada" height={altura} style={{ height: altura, width: "auto" }} />;
}

export function LogoLegislativo({ altura = 26 }) {
  return <img src="/brand/legislativo-conectado-logo.svg" alt="Legislativo Conectado" height={altura} style={{ height: altura, width: "auto" }} />;
}

/** Cidade Zero Papel ainda não tem logo em arquivo: nome em texto, no mesmo desenho de duas linhas do Cidade Conectada. */
export function LogoZeroPapel({ grande = false }) {
  return (
    <span className={`mk-zp ${grande ? "mk-zp--lg" : ""}`} role="img" aria-label="Cidade Zero Papel">
      <span>cidade</span>
      <strong>zero papel</strong>
    </span>
  );
}

/** "by Cubo" ao lado da marca do produto. */
export function PorCubo() {
  return (
    <span className="mk-by">
      by <img src="/brand/cubo-logo.svg" alt="Cubo" height="14" />
    </span>
  );
}

export const PRODUTOS_CUBO = [
  {
    id: "cidade-conectada",
    nome: "Cidade Conectada",
    href: CC_HOME,
    icone: "app",
    objetivo: "Atender melhor o cidadão",
    objetivoTexto: "Aplicativo, WhatsApp, Libras, IA e ordens de serviço.",
    frase: "A solução completa para colocar a prefeitura na palma da mão.",
    Logo: LogoCidadeConectada,
  },
  {
    id: "zero-papel",
    nome: "Cidade Zero Papel",
    href: ZP_HOME,
    icone: "arquivo",
    objetivo: "Digitalizar processos internos",
    objetivoTexto: "Protocolo, tramitação e assinatura, com menos papel.",
    frase: "Processos eletrônicos, do protocolo ao arquivo.",
    Logo: LogoZeroPapel,
  },
  {
    id: "legislativo",
    nome: "Legislativo Conectado",
    href: LC_HOME,
    icone: "camara",
    objetivo: "Aproximar o Legislativo da população",
    objetivoTexto: "Para câmaras municipais e assembleias legislativas.",
    frase: "A porta de entrada digital de câmaras e assembleias.",
    Logo: LogoLegislativo,
  },
];
