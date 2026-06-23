import { LegalPageLayout } from "./LegalPageLayout";

const sections = [
  {
    id: "prazos",
    heading: "Prazos de garantia",
    body: [
      "Todos os produtos contam com a garantia legal de 90 dias corridos, contados a partir do recebimento do produto, conforme o Código de Defesa do Consumidor.",
      "Garantias contratuais adicionais podem se aplicar a produtos específicos, sempre detalhadas na página de cada produto. As placas de vídeo PCYES, por exemplo, contam com 1 ou 2 anos de garantia a partir da data da compra, dependendo do modelo.",
    ],
  },
  {
    id: "acionar",
    heading: "Como acionar a garantia",
    body: [
      "Para acionar a garantia, entre em contato com o nosso SAC pelo e-mail sac@pcyes.com.br informando o número da nota fiscal, fotos ou vídeos do produto e o motivo do acionamento.",
      "Nossa equipe responde em até 2 dias úteis com as orientações para os próximos passos. Quanto mais detalhada for a sua descrição, mais ágil será o atendimento.",
    ],
  },
  {
    id: "analise",
    heading: "Análise técnica",
    body: [
      "Produtos com alegação de defeito passam por uma análise técnica realizada em até 30 dias corridos, conforme previsto no Código de Defesa do Consumidor. Esse prazo garante uma avaliação justa e criteriosa de cada caso.",
      "Importante: a perda de dados não é coberta pela garantia. A realização de backup das suas informações é de responsabilidade exclusiva do cliente, e recomendamos fazê-lo antes de enviar qualquer equipamento para análise.",
    ],
  },
  {
    id: "trocas",
    heading: "Trocas e devoluções",
    body: [
      "A troca de um produto com defeito ocorre somente após o recebimento e a verificação do item pela nossa equipe. A PCYES não envia a unidade de reposição de forma antecipada.",
      "Para agilizar o processo, a cópia da nota fiscal acompanhada da descrição do motivo deve ser enviada junto com o produto.",
    ],
  },
  {
    id: "exclusoes",
    heading: "O que não é coberto",
    body: [
      "A garantia não cobre as seguintes situações:",
      "- Produtos que não são da marca PCYES",
      "- Mau uso ou instalação inadequada do produto",
      "- Desgaste natural decorrente do uso",
      "- Exposição excessiva à umidade e oxidação visível",
      "- Violação dos termos e condições do fabricante",
    ],
  },
  {
    id: "reembolso",
    heading: "Reembolso e arrependimento",
    body: [
      "Você tem o prazo de 7 dias corridos para devolver um produto por arrependimento, desde que o item esteja sem uso e na sua condição original, com embalagem e acessórios.",
      "Nas compras com cartão de crédito, o estorno é solicitado imediatamente após a conferência do produto. Em pagamentos por transferência bancária, o reembolso é realizado em até 5 dias úteis.",
      "O frete de devolução utiliza o serviço PAC padrão. Upgrades de envio, quando solicitados pelo cliente, ficam por conta do próprio cliente.",
    ],
  },
  {
    id: "contato",
    heading: "Atendimento",
    body: [
      "Precisa de ajuda com garantia, troca ou devolução? Fale com o nosso time pelos canais abaixo:",
      "- E-mail: sac@pcyes.com.br",
      "- Telefone: (44) 2101-1414",
    ],
  },
];

export function WarrantyPage() {
  return (
    <LegalPageLayout
      badge="GARANTIA"
      title="Política de Garantia, Trocas e Devoluções"
      updatedAt="2025"
      intro="A PCYES oferece uma cobertura de garantia completa, construída com transparência e total respeito aos direitos do consumidor. Aqui você encontra tudo sobre prazos, análises técnicas, trocas e reembolsos."
      sections={sections}
    />
  );
}
