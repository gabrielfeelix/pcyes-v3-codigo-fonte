import { LegalPageLayout } from "./LegalPageLayout";

const sections = [
  {
    id: "cadastro",
    heading: "Conta e cadastro",
    body: [
      "Para criar uma conta na PCYES é necessário ter 18 anos ou mais. Ao se cadastrar, você garante que todas as informações fornecidas são verdadeiras, precisas e completas, e se compromete a mantê-las atualizadas.",
      "A PCYES pode bloquear o acesso à conta caso seja detectada qualquer atividade ilegal, fraudulenta ou que viole estes termos de uso.",
    ],
  },
  {
    id: "pedidos",
    heading: "Pedidos e compras",
    body: [
      "Um pedido só é considerado válido após o recebimento de um número de confirmação. Esse número é a sua garantia de que a solicitação foi registrada com sucesso.",
      "O pagamento deve ser confirmado em até 2 dias úteis, e o envio do produto ocorre em até 2 dias úteis após essa confirmação. Caso o pagamento não seja concluído nesse prazo, o pedido é cancelado automaticamente.",
    ],
  },
  {
    id: "precos",
    heading: "Preços e ofertas",
    body: [
      "As ofertas promocionais são válidas apenas enquanto estiverem anunciadas no site oficial da PCYES e houver estoque disponível do produto.",
      "A PCYES reserva-se o direito de corrigir eventuais erros de preço e de cancelar pedidos afetados por essas correções. Recomendamos sempre conferir o preço final antes de concluir a compra.",
    ],
  },
  {
    id: "entrega",
    heading: "Entrega",
    body: [
      "O envio dos produtos é feito por Correios ou por transportadora, definido de acordo com a localidade de entrega e o tamanho do item.",
      "Em períodos de pico ou em casos de força maior, os prazos de entrega podem se estender. Eventuais atrasos devem ser informados à PCYES em até 24 horas para que possamos acompanhar a situação junto à transportadora.",
    ],
  },
  {
    id: "devolucoes",
    heading: "Devoluções",
    body: [
      "Você tem o prazo de 7 dias para devolver um produto, desde que o item esteja sem uso e acompanhado da embalagem e dos acessórios originais.",
      "A devolução é feita por meio de postagem reversa no serviço PAC. O reembolso aparece na fatura do cartão conforme o prazo da operadora, ou em até 5 dias úteis no caso de pagamento por transferência bancária.",
    ],
  },
  {
    id: "garantia",
    heading: "Garantia",
    body: [
      "Os produtos vendidos pela PCYES contam com a garantia legal de 90 dias, conforme estabelecido pelo Código de Defesa do Consumidor.",
      "Alguns itens oferecem cobertura de garantia estendida, sempre detalhada na página do respectivo produto. Consulte as condições específicas antes de finalizar a compra.",
    ],
  },
];

export function TermsPage() {
  return (
    <LegalPageLayout
      badge="TERMOS"
      title="Termos de Uso"
      updatedAt="2025"
      intro="Ao acessar e utilizar o site da PCYES, você concorda com os termos descritos abaixo. Eles definem as regras de uso da loja, dos pedidos e dos serviços que oferecemos a você."
      sections={sections}
    />
  );
}
