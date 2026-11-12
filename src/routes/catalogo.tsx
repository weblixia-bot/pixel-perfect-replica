import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, products } from "@/components/marketplace/products";
import { categories, filterCatalog } from "@/lib/marketplace";
type SearchParams = {
  q?: string | undefined;
  category?: string | undefined;
  mode?: string | undefined;
  sort?: string | undefined;
};
export const Route = createFileRoute("/catalogo")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    mode: typeof search["mode"] === "string" ? search["mode"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de tecnología · AMIZEX" },
      {
        name: "description",
        content:
          "Encuentra celulares, notebooks, audio y gaming. Filtra las ofertas y los más vendidos de AMIZEX.",
      },
      { property: "og:title", content: "Catálogo de tecnología · AMIZEX" },
      { property: "og:description", content: "Descubre tu próxima tecnología en AMIZEX Chile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});
function Catalog() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const category = categories.find((c) => c.slug === search["category"]);
  const title = search["q"]
    ? `Resultados para “${search["q"]}”`
    : category?.name ||
      (search["mode"] === "ofertas"
        ? "Ofertas en tecnología"
        : search["mode"] === "mas-vendidos"
          ? "Más vendidos"
          : "Toda la tecnología");
  const selected = filterCatalog(products, search);
  return (
    <div className="container-main content-page">
      <Link to="/" className="text-xs text-muted-foreground">
        Inicio
      </Link>
      <span className="text-xs text-muted-foreground"> / Tecnología</span>
      <h1 className="page-heading">{title}</h1>
      <p className="page-subtitle">Encuentra lo que va contigo.</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <Button
            key={c.slug}
            variant={search["category"] === c.slug ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/catalogo" search={{ ...search, category: c.slug }}>
              {c.short}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p className="text-xs text-muted-foreground">{selected.length} productos de ejemplo</p>
        <div className="flex gap-3 items-center">
          {(search["q"] || search["category"] || search["mode"]) && (
            <Button size="sm" variant="ghost" asChild>
              <Link to="/catalogo">
                <X />
                Limpiar filtros
              </Link>
            </Button>
          )}
          <select
            aria-label="Ordenar productos"
            className="form-input text-xs w-auto"
            value={search["sort"] || "relevancia"}
            onChange={(e) => navigate({ search: { ...search, sort: e.target.value } })}
          >
            <option value="relevancia">Más relevantes</option>
            <option value="ventas">Más vendidos</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
          </select>
        </div>
      </div>
      {selected.length ? (
        <div className="product-grid">
          {selected.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Search className="size-10 mx-auto text-primary mb-4" />
          <h2 className="text-xl font-bold">No encontramos productos por ahora</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-5">
            Prueba con otra búsqueda o explora las categorías disponibles.
          </p>
          <Button asChild>
            <Link to="/catalogo">Ver todos los productos</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
