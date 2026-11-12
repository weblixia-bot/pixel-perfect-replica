import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Package, ShoppingBag, Store, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/components/marketplace/context";
export const Route = createFileRoute("/vender")({
  head: () => ({
    meta: [
      { title: "Abre tu tienda en minutos · AMIZEX" },
      {
        name: "description",
        content: "Conoce la experiencia de vendedor de AMIZEX y prepara tu tienda de tecnología.",
      },
      { property: "og:title", content: "Tu tienda en AMIZEX" },
      { property: "og:description", content: "Conecta tus productos con Chile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Seller,
});
function Seller() {
  const { role, setRole } = useMarketplace();
  const [tab, setTab] = useState("Resumen");
  const [registered, setRegistered] = useState(false);
  if (role === "vendedor")
    return (
      <div className="container-main content-page seller-layout">
        <aside className="seller-sidebar">
          <h3 className="font-bold px-3 mb-4 flex items-center gap-2">
            <Store className="size-5" />
            Mi tienda
          </h3>
          {[
            [BarChart3, "Resumen"],
            [Package, "Productos"],
            [ShoppingBag, "Pedidos"],
          ].map(([Icon, label]) => {
            const Component = Icon as typeof Store;
            return (
              <Button
                key={String(label)}
                variant="nav"
                className="w-full justify-start my-1"
                onClick={() => setTab(String(label))}
              >
                <Component />
                {String(label)}
              </Button>
            );
          })}
        </aside>
        <section>
          <p className="text-xs text-primary font-semibold">PANEL DEL VENDEDOR · DEMOSTRACIÓN</p>
          <h1 className="page-heading">{tab === "Resumen" ? "Hola, tu tienda te espera." : tab}</h1>
          <p className="page-subtitle">Una vista de ejemplo para preparar tu negocio.</p>
          {tab === "Resumen" ? (
            <>
              <div className="metric-grid">
                {[
                  ["Ventas del mes", "$1.859.970"],
                  ["Pedidos", "24"],
                  ["Productos activos", "4"],
                ].map(([title, value]) => (
                  <div className="metric" key={title}>
                    <p>{title}</p>
                    <strong>{value}</strong>
                    <span className="text-xs text-success">Datos de ejemplo</span>
                  </div>
                ))}
              </div>
              <section className="seller-chart">
                <h2 className="font-bold mb-5">Ventas de la semana</h2>
                <div className="chart-bars">
                  {[45, 70, 55, 90, 60, 95, 78].map((height, i) => (
                    <div className="chart-column" key={i}>
                      <i
                        className={
                          [
                            "h-[45%]",
                            "h-[70%]",
                            "h-[55%]",
                            "h-[90%]",
                            "h-[60%]",
                            "h-[95%]",
                            "h-[78%]",
                          ][i]
                        }
                      />
                      <span>{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="border-t py-10">
              <Package className="size-10 text-primary mb-4" />
              <h2 className="text-lg font-semibold">
                {tab === "Productos" ? "Tu catálogo comienza aquí" : "Aún no hay pedidos reales"}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Esta vista de demostración no guarda productos ni recibe ventas.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setTab("Resumen")}>
                Volver al resumen
              </Button>
            </div>
          )}
        </section>
      </div>
    );
  return (
    <div className="container-main content-page">
      <div className="grid md:grid-cols-2 gap-12 items-start py-6">
        <section>
          <span className="text-xs font-bold text-primary flex gap-2 items-center">
            <Store className="size-4" />
            VENDE EN AMIZEX
          </span>
          <h1 className="page-heading mt-5">Abre tu tienda en minutos</h1>
          <p className="page-subtitle">
            Tu tecnología puede llegar más lejos. Conecta con compradores de todo Chile.
          </p>
          <div className="space-y-5">
            {[
              [Store, "Una vitrina para tu negocio"],
              [Users, "Conecta con nuevos compradores"],
              [BarChart3, "Tu tienda, bajo tu control"],
            ].map(([Icon, title]) => {
              const Component = Icon as typeof Store;
              return (
                <div key={String(title)} className="flex items-center gap-3 text-sm">
                  <Component className="size-5 text-primary" />
                  {String(title)}
                </div>
              );
            })}
          </div>
        </section>
        <form
          className="space-y-4 border rounded-lg p-6 bg-card"
          onSubmit={(e) => {
            e.preventDefault();
            setRegistered(true);
          }}
        >
          <h2 className="font-bold text-lg">Da el primer paso</h2>
          <p className="text-xs text-muted-foreground">
            Registro de demostración. No crea una tienda real.
          </p>
          <label className="form-field">
            Nombre de tu tienda
            <input className="form-input" placeholder="Mi tienda de tecnología" required />
          </label>
          <label className="form-field">
            Correo electrónico
            <input type="email" className="form-input" placeholder="tu@correo.cl" required />
          </label>
          <label className="flex gap-2 items-start text-xs text-muted-foreground">
            <input type="checkbox" required className="mt-0.5 accent-primary" />
            Acepto los{" "}
            <Link
              to="/ayuda"
              search={{ tema: "Términos y condiciones" }}
              className="text-primary underline"
            >
              términos y condiciones
            </Link>
          </label>
          {registered ? (
            <div role="status" className="text-sm text-success space-y-3">
              <p>¡Tu tienda de ejemplo está lista para explorar!</p>
              <Button onClick={() => setRole("vendedor")} type="button">
                Ir a mi tienda
                <ArrowRight />
              </Button>
            </div>
          ) : (
            <Button variant="purchase" className="w-full" type="submit">
              Crear tienda de ejemplo
              <ArrowRight />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
