import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Gamepad2,
  Headphones,
  House,
  Laptop,
  Monitor,
  Plug,
  Smartphone,
  Sparkles,
  Store,
  Watch,
} from "lucide-react";
import hero from "@/assets/technology-hero.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard, products } from "@/components/marketplace/products";
import { TrustBand } from "@/components/marketplace/shell";
import { categories } from "@/lib/marketplace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AMIZEX · Tu próxima tecnología está aquí" },
      {
        name: "description",
        content:
          "Descubre celulares, notebooks, audio y gaming en AMIZEX. Tecnología y ofertas para Chile.",
      },
      { property: "og:title", content: "AMIZEX · Tu próxima tecnología está aquí" },
      { property: "og:description", content: "Explora tecnología y ofertas en un solo lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
const icons = [Smartphone, Laptop, Headphones, Monitor, Gamepad2, Plug, House, Camera, Watch];
function Index() {
  return (
    <>
      <section className="hero">
        <img
          src={hero}
          width={1536}
          height={768}
          className="hero-image"
          alt="Notebook, audífonos, celular y control de videojuegos sobre pedestales morados"
          fetchPriority="high"
        />
        <div className="container-main hero-inner">
          <div className="hero-content">
            <span className="hero-eyebrow">
              <Sparkles className="size-3" />
              TECNOLOGÍA QUE VA CONTIGO
            </span>
            <h1>
              Tu próxima tecnología
              <br />
              está en <span>AMIZEX.</span>
            </h1>
            <p>
              Encuentra eso que quieres, a un precio que te va a encantar. Todo en un solo lugar.
            </p>
            <Button variant="purchase" asChild size="lg">
              <Link to="/catalogo" search={{ mode: "ofertas" }}>
                Ver ofertas en tecnología
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="hero-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>
      <TrustBand />
      <section className="container-main section-spacing">
        <div className="section-title">
          <div>
            <h2>Encuentra tu categoría</h2>
            <p>Todo un mundo de tecnología por descubrir.</p>
          </div>
          <Link
            to="/catalogo"
            className="text-xs font-semibold text-primary flex gap-2 items-center"
          >
            Ver todo
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category, i) => {
            const Icon = icons[i] || Smartphone;
            return (
              <Link
                to="/catalogo"
                search={{ category: category.slug }}
                key={category.slug}
                className="category-tile"
              >
                <div className="category-icon">
                  <Icon />
                </div>
                <span>{category.short}</span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container-main pb-2">
        <div className="section-title">
          <div>
            <h2 className="flex items-center gap-2">
              <span className="text-highlight">⚡</span>Ofertas que no se dejan pasar
            </h2>
            <p>Grandes favoritos, mejores precios.</p>
          </div>
          <Link
            to="/catalogo"
            search={{ mode: "ofertas" }}
            className="text-xs font-semibold text-primary flex gap-2 items-center"
          >
            Ver todas las ofertas
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="container-main">
        <div className="store-band">
          <div className="flex items-center gap-5">
            <Store className="size-10 text-primary shrink-0" />
            <div>
              <h2>Tu tienda, tu próximo gran paso.</h2>
              <p>Conecta tus productos con personas de todo Chile.</p>
            </div>
          </div>
          <Button variant="default" asChild size="lg">
            <Link to="/vender">
              Empieza a vender
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
