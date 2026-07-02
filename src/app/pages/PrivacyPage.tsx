import { LegalPageLayout } from "./LegalPageLayout";

const sections = [
  {
    id: "coleta",
    heading: "Dados que coletamos",
    body: [
      "Coletamos os dados que você nos fornece diretamente ao criar uma conta, finalizar uma compra ou entrar em contato com a gente — como nome, CPF, e-mail e endereço de entrega. Essas informações são essenciais para identificar você e concluir os serviços solicitados.",
      "Também coletamos dados de navegação de forma automática enquanto você usa o site, como endereço IP, tipo de dispositivo, navegador utilizado e as páginas visitadas. Esses dados nos ajudam a entender como a loja é usada e a manter tudo funcionando com segurança.",
    ],
  },
  {
    id: "uso",
    heading: "Como usamos seus dados",
    body: [
      "Usamos seus dados para criar e gerenciar o seu cadastro, processar pedidos e pagamentos e manter você informado sobre o andamento das suas compras. Sem essas informações, não conseguiríamos entregar os produtos até você.",
      "Os dados de navegação também são utilizados para melhorar a experiência do site, personalizar o que você vê e reforçar a segurança da plataforma, identificando comportamentos suspeitos e prevenindo fraudes.",
    ],
  },
  {
    id: "bases-legais",
    heading: "Bases legais do tratamento",
    body: [
      "Todo tratamento de dados pessoais realizado pela PCYES se apoia em uma base legal prevista na Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD, art. 7º). As principais bases que utilizamos são:",
      "- Execução de contrato: para processar o seu pedido, o pagamento e a entrega dos produtos.",
      "- Cumprimento de obrigação legal ou regulatória: como a emissão de nota fiscal e a guarda de registros fiscais e contábeis.",
      "- Consentimento: para o envio de comunicações de marketing, newsletter e ofertas — que você pode revogar a qualquer momento.",
      "- Legítimo interesse: para a segurança da plataforma, a prevenção a fraudes e a melhoria da experiência, sempre respeitando os seus direitos e expectativas como titular.",
    ],
  },
  {
    id: "compartilhamento",
    heading: "Compartilhamento de dados",
    body: [
      "Seus dados são compartilhados apenas com parceiros essenciais para concluir o seu pedido: processadores de pagamento, transportadoras responsáveis pela entrega e serviços de hospedagem em nuvem que mantêm a loja no ar.",
      "Todos esses parceiros tratam os dados com responsabilidade e dentro do necessário para prestar o serviço. A PCYES não vende nem comercializa seus dados pessoais em nenhuma hipótese.",
    ],
  },
  {
    id: "retencao",
    heading: "Retenção de dados",
    body: [
      "Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política.",
      "Dados de cadastro e de pedidos são conservados enquanto a sua conta estiver ativa e pelo prazo exigido pela legislação fiscal e de defesa do consumidor — em regra, até 5 anos após a última transação. Encerrado esse período, os dados são eliminados ou anonimizados, salvo quando a guarda for exigida por obrigação legal.",
    ],
  },
  {
    id: "seguranca",
    heading: "Segurança",
    body: [
      "A PCYES adota medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia em trânsito e controles de acesso restritos às informações.",
      "Nenhum sistema é totalmente imune a riscos, mas trabalhamos continuamente para revisar e fortalecer nossas práticas de segurança e proteger as informações que você confia à gente.",
    ],
  },
  {
    id: "direitos",
    heading: "Seus direitos como titular",
    body: [
      "A LGPD garante a você, como titular dos dados, uma série de direitos que podem ser exercidos a qualquer momento e gratuitamente:",
      "- Confirmar a existência de tratamento dos seus dados.",
      "- Acessar os dados que mantemos sobre você.",
      "- Corrigir dados incompletos, inexatos ou desatualizados.",
      "- Solicitar a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei.",
      "- Solicitar a portabilidade dos seus dados a outro fornecedor de serviço.",
      "- Eliminar os dados tratados com base no seu consentimento.",
      "- Obter informação sobre as entidades públicas e privadas com as quais compartilhamos os seus dados.",
      "- Ser informado sobre a possibilidade de não fornecer consentimento e sobre as consequências da recusa.",
      "- Revogar o consentimento a qualquer momento.",
      "Para exercer qualquer um desses direitos, entre em contato com o nosso Encarregado pelos canais indicados abaixo. Podemos solicitar informações adicionais para confirmar a sua identidade antes de atender ao pedido.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      "O site utiliza cookies para garantir o funcionamento correto das páginas e personalizar a sua experiência de navegação, lembrando preferências e mantendo o seu carrinho ativo.",
      "Os cookies essenciais não podem ser desativados, pois são necessários para o site operar. Os demais cookies podem ser gerenciados a qualquer momento nas configurações do seu navegador.",
    ],
  },
  {
    id: "encarregado",
    heading: "Encarregado (DPO) e ANPD",
    body: [
      "A PCYES conta com um Encarregado pelo Tratamento de Dados Pessoais (DPO), responsável por receber comunicações dos titulares e da Autoridade Nacional de Proteção de Dados (ANPD) e por esclarecer dúvidas sobre o tratamento dos seus dados.",
      "- Encarregado (DPO): privacidade@pcyes.com.br",
      "Caso você entenda que seus dados não foram tratados de acordo com a LGPD e a sua solicitação não tenha sido atendida, também pode apresentar uma reclamação à Autoridade Nacional de Proteção de Dados (ANPD) pelos canais oficiais disponíveis em gov.br/anpd.",
    ],
  },
  {
    id: "contato",
    heading: "Fale com a gente",
    body: [
      "Ficou com alguma dúvida sobre privacidade ou sobre o tratamento dos seus dados? Nossa equipe está pronta para ajudar pelos canais abaixo:",
      "- E-mail: sac@pcyes.com.br",
      "- Encarregado (DPO): privacidade@pcyes.com.br",
      "- WhatsApp: (44) 2101-1414",
    ],
  },
];

export function PrivacyPage() {
  return (
    <LegalPageLayout
      badge="PRIVACIDADE"
      title="Política de Privacidade"
      updatedAt="02 de julho de 2026"
      intro="Na PCYES, a transparência é um valor inegociável. Esta Política de Privacidade explica de forma clara como coletamos, usamos, compartilhamos e protegemos os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD). Aqui você entende como as suas informações são tratadas e quais são os seus direitos como titular."
      sections={sections}
    />
  );
}
