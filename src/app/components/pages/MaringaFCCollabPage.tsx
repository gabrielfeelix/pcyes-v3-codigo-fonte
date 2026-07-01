import { DynamicHtmlPage } from "./DynamicHtmlPage";
import { SEO } from "../SEO";

export function MaringaFCCollabPage() {
  return (
    <>
      <SEO
        title="PCYES × Maringá FC"
        description="Coleção oficial PCYES em parceria com o Maringá FC. Edições especiais de periféricos e setup para a torcida."
        canonicalPath="/maringa-fc/"
      />
      <DynamicHtmlPage htmlPath="/pages/maringa-fc.html" />
    </>
  );
}
