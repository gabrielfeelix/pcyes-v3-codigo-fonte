import { DynamicHtmlPage } from "./DynamicHtmlPage";
import { SEO } from "../SEO";

export function InfluencersPage() {
  return (
    <>
      <SEO
        title="Influenciadores"
        description="Programa de influenciadores PCYES: parcerias, cupons e conteúdo para creators de tecnologia e games. Saiba como fazer parte."
        canonicalPath="/influenciadores/"
      />
      <DynamicHtmlPage htmlPath="/pages/influenciadores.html" />
    </>
  );
}
