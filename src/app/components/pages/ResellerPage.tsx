import { DynamicHtmlPage } from "./DynamicHtmlPage";
import { SEO } from "../SEO";

export function ResellerPage() {
  return (
    <>
      <SEO
        title="Seja um Revendedor"
        description="Torne-se revendedor oficial PCYES. Condições especiais de atacado em hardware, periféricos e setups gamer para sua loja."
        canonicalPath="/revendedor/"
      />
      <DynamicHtmlPage htmlPath="/pages/revendedor.html" />
    </>
  );
}
