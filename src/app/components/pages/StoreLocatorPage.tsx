import { DynamicHtmlPage } from "./DynamicHtmlPage";
import { SEO } from "../SEO";

export function StoreLocatorPage() {
  return (
    <>
      <SEO
        title="Onde Encontrar"
        description="Encontre os produtos PCYES em lojas e revendedores oficiais perto de você. Veja onde comprar hardware e periféricos PCYES."
        canonicalPath="/onde-encontrar/"
      />
      <DynamicHtmlPage htmlPath="/pages/onde-encontrar.html" />
    </>
  );
}
