// Exemplos por secretaria (quadro "Exemplos por secretaria" do wireframe).
// `uso`: "jp" = em uso em João Pessoa; ou o nome do produto que tornaria possível.
// Cada bloco, no futuro, vem das etiquetas de secretaria dos posts do blog.

export const SECRETARIAS = [
  {
    id: "saude", nome: "Saúde", icone: "saude", resumo: "Acesso a exames, cirurgias e serviços sem sair de casa.",
    itens: [
      { t: "Exames", d: "Endoscopia, colonoscopia, mamografia, ultrassonografia e ecocardiograma.", uso: "jp" },
      { t: "Cirurgias", d: "Solicitação e acompanhamento pelo programa Opera Mais.", uso: "jp" },
      { t: "Cartão SUS", d: "Pedido com documentos anexados e cartão disponível em PDF no app.", uso: "jp" },
      { t: "Vacinação domiciliar", d: "Agendamento para pessoas acamadas.", uso: "jp" },
      { t: "Remédio em Casa", d: "Cadastro no programa e envio da receita atualizada.", uso: "jp" },
      { t: "Vigilância Sanitária", d: "Denúncia registrada pelo aplicativo.", uso: "jp" },
      { t: "Alerta de consulta", d: "Lembrete da consulta marcada pelo WhatsApp.", uso: "Atendimento WhatsApp" },
      { t: "Teleatendimento", d: "Atendimento por vídeo, com opção de Libras.", uso: "TeleAtendimento com Libras" },
    ],
    resultado: "Em 2024: 10.450 pedidos de Cartão SUS, com 99,8% de conclusão, e 320 de 326 solicitações de vacinação domiciliar atendidas.",
    pendente: "Com alertas pelo WhatsApp: redução do absenteísmo (inserir número real de uma cidade cliente).",
    fonte: "Prefeitura de João Pessoa, reproduzida pelo Paraíba 24 Horas (dez/2024).",
  },
  {
    id: "infraestrutura", nome: "Infraestrutura e Zeladoria", icone: "infra", resumo: "Serviços urbanos na palma da mão, com foto, vídeo e protocolo.",
    itens: [
      { t: "Iluminação pública", d: "Problemas e pedidos de expansão.", uso: "jp" },
      { t: "Tapa-buraco", d: "Solicitação e acompanhamento da manutenção da via.", uso: "jp" },
      { t: "Galerias e bocas de lobo", d: "Pedidos de limpeza e manutenção.", uso: "jp" },
      { t: "Coleta de poda e cata-treco", d: "Agendamento de coletas especiais.", uso: "jp" },
      { t: "Limpeza de terrenos e vias", d: "Pedidos de limpeza e varrição.", uso: "jp" },
      { t: "Ordens para as equipes", d: "O pedido vira uma ordem de serviço.", uso: "Conecta OS" },
    ],
    resultado: "Em 2025: 37.580 pedidos de iluminação pública, o serviço mais solicitado no app.",
    fonte: "Prefeitura de João Pessoa (jan/2026).",
  },
  {
    id: "meio-ambiente", nome: "Meio Ambiente", icone: "ambiente", resumo: "Denúncias e serviços ambientais em um só canal.",
    itens: [
      { t: "Poda de árvores", d: "Pedido, vistoria, laudo técnico e execução.", uso: "jp" },
      { t: "Plantio de árvores", d: "Solicitação pelo aplicativo.", uso: "jp" },
      { t: "Esgoto e águas servidas", d: "Denúncias de lançamento irregular.", uso: "jp" },
      { t: "Poluição sonora e atmosférica", d: "Registro de ocorrências.", uso: "jp" },
      { t: "Poda irregular", d: "Denúncia à secretaria.", uso: "jp" },
      { t: "Área de preservação", d: "Denúncia de invasão de APP.", uso: "jp" },
    ],
    fonte: "Prefeitura de João Pessoa (jul/2024 e abr/2026).",
  },
  {
    id: "social", nome: "Desenvolvimento Social", icone: "pessoas", resumo: "Programas sociais mais acessíveis.",
    itens: [
      { t: "CadÚnico", d: "Inclusão e atualização cadastral via CRAS.", uso: "jp" },
      { t: "Auxílio-moradia", d: "Atualização cadastral do benefício.", uso: "jp" },
      { t: "Atendimento em Libras", d: "Atendimento acessível à pessoa surda.", uso: "TeleAtendimento com Libras" },
    ],
    fonte: "Prefeitura de João Pessoa (jul/2024).",
  },
  {
    id: "financas", nome: "Finanças e Tributação", icone: "moeda", resumo: "Tributos e certidões sem deslocamento.",
    itens: [
      { t: "IPTU, ITBI e TCR", d: "Serviços tributários no mesmo canal.", uso: "jp" },
      { t: "Certidão negativa", d: "Solicitação pelo aplicativo.", uso: "jp" },
      { t: "Nota avulsa e parcelamento", d: "Emissão, consulta e parcelamento de débitos.", uso: "jp" },
    ],
    fonte: "Prefeitura de João Pessoa (jul/2024).",
  },
  {
    id: "mobilidade", nome: "Mobilidade e Trânsito", icone: "onibus", resumo: "Credenciais, gratuidades e reclamações em um só lugar.",
    itens: [
      { t: "Credencial de estacionamento", d: "Pedido e renovação para idosos e pessoas com necessidades especiais.", uso: "jp" },
      { t: "Cartão de gratuidade", d: "Solicitação pelo aplicativo.", uso: "jp" },
      { t: "Trânsito e transporte público", d: "Reclamações, sugestões e elogios.", uso: "jp" },
    ],
    fonte: "Prefeitura de João Pessoa (jul/2024).",
  },
  {
    id: "urbano", nome: "Desenvolvimento Urbano", icone: "predio", resumo: "Autorizações e fiscalização com menos burocracia.",
    itens: [
      { t: "Uso do solo", d: "Autorização para eventos e comércio.", uso: "jp" },
      { t: "Cemitérios", d: "Atualização cadastral de túmulos, mausoléus e terrenos.", uso: "jp" },
      { t: "Publicidade e orla", d: "Autorização de publicidade e denúncias na orla.", uso: "jp" },
    ],
    citacao: { texto: "Reduzimos a burocracia, otimizamos os prazos de resposta e atendimento das demandas.", autor: "Marmuthe Cavalcanti, secretário de Desenvolvimento Urbano de João Pessoa (out/2026)" },
    fonte: "Prefeitura de João Pessoa, reproduzida pelo Paladino da Verdade (out/2026).",
  },
  {
    id: "animais", nome: "Proteção Animal", icone: "pata", resumo: "Serviços de saúde e proteção dos animais.",
    itens: [
      { t: "Castração", d: "Agendamento na clínica ou no Castramóvel.", uso: "jp" },
      { t: "Clínica e Hospital do Pet", d: "Agendamento de consultas.", uso: "jp" },
      { t: "Protetores independentes", d: "Cadastro sem ir ao Centro de Zoonoses.", uso: "jp" },
    ],
    fonte: "Prefeitura de João Pessoa (out/2024).",
  },
  {
    id: "educacao", nome: "Educação", icone: "escola", resumo: "Solicitações da rede de ensino em um só fluxo.",
    itens: [
      { t: "Estágio e pesquisa", d: "Autorização de estágio supervisionado e pesquisa em escola ou CREI.", uso: "jp" },
      { t: "Equipamentos", d: "Pedido de Chromebooks e chips de internet.", uso: "jp" },
      { t: "Espaço físico", d: "Solicitação de espaço em escola ou CREI.", uso: "jp" },
    ],
    fonte: "Prefeitura de João Pessoa (jul/2024).",
  },
];

export const E_AINDA = [
  { t: "Procon", d: "Denúncia, dúvida, reclamação e preços da cesta básica." },
  { t: "Defesa Civil", d: "Alagamento, desmoronamento e vistorias preventivas." },
  { t: "Mulheres", d: "Ronda Maria da Penha e Centro de Referência da Mulher." },
  { t: "Trabalho", d: "Sine-JP e agendamento do seguro-desemprego." },
  { t: "Esporte e praças", d: "Uso de espaços, materiais e manutenção." },
];
