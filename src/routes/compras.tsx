import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/components/marketplace/context";
export const Route = createFileRoute("/compras")({
  head: () => ({
    meta: [
      { title: "Mis compras · AMIZEX" },
      { name: "description", content: "Consulta la vista de compras de tu cuenta AMIZEX." },
      { property: "og:title", content: "Mis compras · AMIZEX" },
      { property: "og:description", content: "Tus compras en un solo lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Purchases,
});
function Purchases() {
  const { role } = useMarketplace();
  return (
    <div className="container-main content-page">
      <h1 className="page-heading">Mis compras</h1>
      <section className="text-center py-16">
        <ShoppingBag className="size-12 mx-auto text-primary mb-5" />
        <h2 className="text-xl font-bold">
          {role === "visitante" ? "Tus compras, en un solo lugar" : "Aún no tienes compras"}
        </h2>
        <p className="text-sm text-muted-foreground mt-3 mb-6">
          {role === "visitante"
            ? "Ingresa a una cuenta de ejemplo para explorar esta vista."
            : "Cuando realices una compra, podrás encontrarla aquí. Este prototipo no procesa pedidos."}
        </p>
        <Button asChild>
          <Link to={role === "visitante" ? "/cuenta" : "/catalogo"}>
            {role === "visitante" ? "Ingresa" : "Explorar tecnología"}
          </Link>
        </Button>
      </section>
    </div>
  );
}
