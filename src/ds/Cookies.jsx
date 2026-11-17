import { useEffect, useState } from "react";
import "./Cookies.css";

// Aviso de cookies dos 4 sites, com o texto do documento de conteúdo (Textos globais · Cookies).
// Hoje o site não carrega nenhum cookie opcional: a escolha fica guardada no navegador e qualquer
// medição futura (analytics, pixel) só deve ser carregada quando temConsentimento("medicao") for true.
// O inventário e as categorias de cookies ainda precisam ser confirmados pela Cubo.

const CHAVE = "cubo-cookies-v1";
const EVENTO = "cubo:cookies-preferencias";

function ler() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE));
  } catch {
    return null;
  }
}

function gravar(prefs) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ ...prefs, em: new Date().toISOString() }));
  } catch {
    /* navegação privada ou armazenamento bloqueado: a escolha vale só nesta visita */
  }
}

/** true quando a pessoa aceitou a categoria opcional (hoje só "medicao"). */
export function temConsentimento(categoria) {
  return !!ler()?.[categoria];
}

/** Reabre o painel de preferências (link "Gerenciar cookies" do rodapé). */
export function abrirPreferencias() {
  window.dispatchEvent(new Event(EVENTO));
}

export default function CookieAviso() {
  const [aberto, setAberto] = useState(false);
  const [painel, setPainel] = useState(false);
  const [medicao, setMedicao] = useState(false);

  useEffect(() => {
    const salvo = ler();
    if (!salvo) setAberto(true);
    else setMedicao(!!salvo.medicao);
    const abrir = () => {
      setMedicao(!!ler()?.medicao);
      setPainel(true);
      setAberto(true);
    };
    window.addEventListener(EVENTO, abrir);
    return () => window.removeEventListener(EVENTO, abrir);
  }, []);

  if (!aberto) return null;

  const decidir = (prefs) => {
    gravar(prefs);
    setAberto(false);
    setPainel(false);
  };

  return (
    <div className="ck" role="dialog" aria-modal="false" aria-labelledby="ck-titulo">
      <div className="ck__caixa">
        <span className="ck__selo">Sua privacidade</span>
        <h2 id="ck-titulo">Você escolhe os cookies opcionais.</h2>
        <p>
          Usamos cookies essenciais para o funcionamento do site. Cookies opcionais dependem da sua escolha: você pode
          aceitá-los, recusá-los ou revisar suas preferências. Saiba mais na <a href="/privacidade#cookies">Política de Cookies</a>.
        </p>

        {painel && (
          <ul className="ck__lista">
            <li>
              <span><strong>Essenciais</strong>Necessários para o site funcionar e lembrar esta escolha.</span>
              <em>Sempre ativos</em>
            </li>
            <li>
              <span><strong>Medição e desempenho</strong>Ajudam a entender como o site é usado, de forma agregada.</span>
              <label className="ck__chave">
                <input type="checkbox" checked={medicao} onChange={(e) => setMedicao(e.target.checked)} />
                <i aria-hidden="true" />
                <span className="sr-only">Permitir cookies de medição e desempenho</span>
              </label>
            </li>
          </ul>
        )}

        <div className="ck__acoes">
          {painel ? (
            <button type="button" className="ck__btn ck__btn--forte" onClick={() => decidir({ medicao })}>Salvar preferências</button>
          ) : (
            <button type="button" className="ck__btn ck__btn--forte" onClick={() => decidir({ medicao: true })}>Aceitar opcionais</button>
          )}
          <button type="button" className="ck__btn" onClick={() => decidir({ medicao: false })}>Recusar opcionais</button>
          {!painel && <button type="button" className="ck__btn ck__btn--link" onClick={() => setPainel(true)}>Gerenciar preferências</button>}
        </div>
      </div>
    </div>
  );
}
