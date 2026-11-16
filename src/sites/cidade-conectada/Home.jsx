import Layout from "./Layout.jsx";
import Hero from "./sections/Hero.jsx";
import Prova from "./sections/Prova.jsx";
import Secretarias from "./sections/Secretarias.jsx";
import Produtos from "./sections/Produtos.jsx";
import Jornada from "./sections/Jornada.jsx";
import Porte from "./sections/Porte.jsx";
import Implantacao from "./sections/Implantacao.jsx";
import Oferta from "./sections/Oferta.jsx";
import Seguranca from "./sections/Seguranca.jsx";
import Blog from "./sections/Blog.jsx";
import Faq from "./sections/Faq.jsx";
import CtaFinal from "./sections/CtaFinal.jsx";

export default function CidadeConectadaHome() {
  return (
    <Layout headerOverlay>
      <Hero />
      <Prova />
      <Secretarias />
      <Produtos />
      <Jornada />
      <Porte />
      <Implantacao />
      <Oferta />
      <Seguranca />
      <Blog />
      <Faq />
      <CtaFinal />
    </Layout>
  );
}
