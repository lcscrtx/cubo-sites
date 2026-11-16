// Posts do blog. Títulos, resumos e números vêm do wireframe da Cubo (dados públicos já pesquisados).
// Cada post tem os campos do cadastro previstos no wireframe: tipo, produto, cidade, secretaria,
// título, resumo e, quando houver, o texto completo. Sem texto completo, o artigo mostra o resumo
// e avisa que o texto está em produção.

export const TIPOS = ["História de sucesso", "Exemplo de uso", "Guia", "Notícia"];
export const PRODUTOS = ["Cidade Conectada", "Cidade Zero Papel", "Legislativo Conectado"];
export const SECRETARIAS = ["Saúde", "Infraestrutura", "Meio Ambiente", "Desenvolvimento Urbano", "Administração", "Gestão digital"];
export const CIDADES = ["João Pessoa"];

export const POSTS = [
  {
    slug: "joao-pessoa-188-mil-demandas",
    destaque: true,
    tipo: "História de sucesso",
    produto: "Cidade Conectada",
    secretaria: "Administração",
    cidade: "João Pessoa",
    icone: "app",
    titulo: "Como João Pessoa chegou a mais de 188 mil demandas em um ano",
    resumo: "Com mais de 600 serviços, o aplicativo é um dos principais canais de atendimento da capital.",
  },
  {
    slug: "cartao-sus-digital",
    tipo: "História de sucesso",
    produto: "Cidade Conectada",
    secretaria: "Saúde",
    cidade: "João Pessoa",
    icone: "saude",
    titulo: "Cartão SUS digital: 10.450 pedidos em um ano",
    tituloLongo: "Cartão SUS digital: como João Pessoa recebeu 10.450 pedidos em um ano",
    resumo: "Conclusão de 99,8% em 2024.",
    leitura: 3,
    artigo: {
      emResumo: "Em 2024, João Pessoa registrou 10.450 pedidos de Cartão SUS pelo aplicativo, com 99,8% de conclusão e envio em até cinco dias úteis.",
      numeros: [
        { valor: "10.450", rotulo: "solicitações em 2024" },
        { valor: "99,8%", rotulo: "de conclusão" },
        { valor: "Até 5 dias úteis", rotulo: "para o envio" },
      ],
      secoes: [
        {
          titulo: "Como funciona",
          passos: [
            "O cidadão escolhe “Cartão SUS” no aplicativo.",
            "Anexa RG, CPF e comprovante de residência.",
            "Preenche as informações e envia o pedido.",
            "Após a aprovação, recebe o cartão em PDF no próprio app.",
          ],
        },
        {
          titulo: "O que muda para a Secretaria de Saúde",
          texto: "O serviço evita deslocamentos do cidadão e organiza os pedidos em um só canal. Em 2025, as emissões e atualizações somaram 24.025 solicitações.",
        },
      ],
      citacao: {
        texto: "Além de ter mais praticidade para nossos usuários, também desafoga nossa rede, nosso sistema de marcações.",
        autor: "Luis Ferreira, secretário de Saúde de João Pessoa (outubro de 2024)",
      },
      fontes: [
        "Paraíba 24 Horas (26/12/2024)",
        "Prefeitura de João Pessoa (02/10/2024)",
        "Prefeitura de João Pessoa (21/07/2024)",
        "Prefeitura de João Pessoa (01/01/2026)",
      ],
    },
  },
  {
    slug: "iluminacao-publica-lidera-pedidos",
    tipo: "História de sucesso",
    produto: "Cidade Conectada",
    secretaria: "Infraestrutura",
    cidade: "João Pessoa",
    icone: "infra",
    titulo: "Iluminação pública lidera os pedidos no app",
    resumo: "Foram 37.580 solicitações em 2025.",
  },
  {
    slug: "vacinacao-em-casa",
    tipo: "História de sucesso",
    produto: "Cidade Conectada",
    secretaria: "Saúde",
    cidade: "João Pessoa",
    icone: "saude",
    titulo: "Vacinação em casa para pessoas acamadas",
    resumo: "320 de 326 solicitações atendidas em 2024.",
  },
  {
    slug: "poda-de-arvores",
    tipo: "Exemplo de uso",
    produto: "Cidade Conectada",
    secretaria: "Meio Ambiente",
    cidade: "João Pessoa",
    icone: "ambiente",
    titulo: "Poda de árvores: do pedido à execução",
    resumo: "Como vistoria, laudo e execução se conectam.",
  },
  {
    slug: "servicos-urbanos-no-celular",
    tipo: "Exemplo de uso",
    produto: "Cidade Conectada",
    secretaria: "Desenvolvimento Urbano",
    cidade: "João Pessoa",
    icone: "grade",
    titulo: "Dez categorias de serviços urbanos no celular",
    resumo: "Uso do solo, cemitérios, publicidade e mais.",
  },
  {
    slug: "como-comecar-a-digitalizar",
    tipo: "Guia",
    produto: "Cidade Conectada",
    secretaria: "Gestão digital",
    cidade: null,
    icone: "blog",
    titulo: "Como começar a digitalizar a prefeitura",
    resumo: "Conteúdo a produzir.",
    pendente: true,
  },
];

export const postPorSlug = (slug) => POSTS.find((p) => p.slug === slug);

/** Relacionados: mesma secretaria primeiro, depois o resto, sem repetir o próprio post. */
export function relacionados(post, n = 3) {
  const outros = POSTS.filter((p) => p.slug !== post.slug && !p.pendente);
  const mesma = outros.filter((p) => p.secretaria === post.secretaria);
  return [...mesma, ...outros.filter((p) => !mesma.includes(p))].slice(0, n);
}
