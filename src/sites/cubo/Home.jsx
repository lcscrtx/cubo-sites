import Layout from "./Layout.jsx";
import HeroMind from "./home/HeroMind.jsx";
import Portfolio from "./home/Portfolio.jsx";
import Depoimentos from "./home/Depoimentos.jsx";
import Numeros from "./home/Numeros.jsx";
import Cta from "./home/Cta.jsx";
import "./cubo.css";

// Home da Cubo Tecnologia (quadro "Cubo Tecnologia · Home" do wireframe), na linha do mindcloud.co.
// Refeita seção por seção, com aprovação a cada passo: hero com a faixa de cidades, a seção escura dos produtos, os depoimentos, os números e o CTA final.
// As seções da versão anterior continuam em ./home/Secoes.jsx para reaproveitar o conteúdo.

export default function CuboHome() {
  return (
    <Layout headerOverlay>
      <HeroMind />
      <Portfolio />
      <Depoimentos />
      <Numeros />
      <Cta />
    </Layout>
  );
}
