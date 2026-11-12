import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/ayuda")({
  validateSearch: (s: Record<string, unknown>): { tema?: string | undefined } => ({
    tema: typeof s["tema"] === "string" ? s["tema"] : "Centro de ayuda",
  }),
  head: () => ({
    meta: [
      { title: "Ayuda e información · AMIZEX" },
      {
        name: "description",
        content: "Conoce AMIZEX y consulta la información de la experiencia de compra.",
      },
      { property: "og:title", content: "Ayuda e información · AMIZEX" },
      { property: "og:description", content: "Información y ayuda de AMIZEX Chile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Help,
});
function Help() {
  const { tema } = Route.useSearch();
  return (
    <div className="container-main content-page">
      <section className="max-w-2xl py-8">
        <Headphones className="size-10 text-primary mb-5" />
        <h1 className="page-heading">{tema}</h1>
        <p className="page-subtitle">
          Estamos construyendo una experiencia de tecnología para Chile.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          AMIZEX es un prototipo de marketplace de tecnología. Los productos, precios, cuotas,
          envíos y tiendas que aparecen son ejemplos; no representan ofertas vigentes. No se
          realizan cobros, compras ni registros reales.
        </p>
        <p className="text-sm leading-7 text-muted-foreground mt-4">
          Las políticas de compra, envío, devoluciones y privacidad se publicarán antes de habilitar
          ventas reales.
        </p>
        <Button asChild variant="outline" className="mt-7">
          <Link to="/">
            <ArrowLeft />
            Volver a AMIZEX
          </Link>
        </Button>
      </section>
    </div>
  );
}
