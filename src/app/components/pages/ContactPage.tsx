import { DynamicHtmlPage } from "./DynamicHtmlPage";
import { SEO } from "../SEO";

export function ContactPage() {
  return (
    <>
      <SEO
        title="Fale Conosco"
        description="Fale com a PCYES: suporte, dúvidas sobre pedidos, garantia e parcerias. Atendimento oficial e canais de contato."
        canonicalPath="/fale-conosco/"
      />
      <DynamicHtmlPage htmlPath="/pages/fale-conosco.html" />
    </>
  );
}
