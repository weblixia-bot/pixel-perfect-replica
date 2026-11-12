import { createFileRoute, Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/components/marketplace/context";
export const Route = createFileRoute("/cuenta")({
  validateSearch: (
    s: Record<string, unknown>,
  ): { mode?: string | undefined; tab?: string | undefined } => ({
    mode: typeof s["mode"] === "string" ? s["mode"] : undefined,
    tab: typeof s["tab"] === "string" ? s["tab"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Mi cuenta · AMIZEX" },
      { name: "description", content: "Explora tu cuenta de comprador de demostración en AMIZEX." },
      { property: "og:title", content: "Mi cuenta · AMIZEX" },
      { property: "og:description", content: "Tu experiencia de comprador en AMIZEX." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});
function Account() {
  const { role, setRole, userName, setUserName, location, setLocationOpen } = useMarketplace();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const registration = search.mode === "registro";
  return (
    <div className="container-main content-page">
      <section className="max-w-md mx-auto py-8">
        <User className="size-10 text-primary mb-5" />
        {role !== "visitante" ? (
          <>
            <h1 className="page-heading">
              {search.tab === "direcciones"
                ? "Mis direcciones"
                : search.tab === "reclamos"
                  ? "Mis reclamos"
                  : `Hola, ${userName}`}
            </h1>
            <p className="page-subtitle">Cuenta de demostración.</p>
            {search.tab === "direcciones" ? (
              <>
                <p className="mb-4">Enviar a {location}</p>
                <Button onClick={() => setLocationOpen(true)}>Cambiar ubicación</Button>
              </>
            ) : search.tab === "reclamos" ? (
              <p className="text-sm text-muted-foreground">
                No tienes reclamos en esta cuenta de ejemplo.
              </p>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/compras">Mis compras</Link>
                </Button>
                <Button variant="ghost" className="ml-2" onClick={() => setRole("visitante")}>
                  Cerrar sesión
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="page-heading">
              {registration ? "Crea tu cuenta" : "Qué bueno verte de nuevo"}
            </h1>
            <p className="page-subtitle">Explora AMIZEX con una cuenta de ejemplo.</p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setRole("comprador");
                navigate({ search: {} });
              }}
            >
              <label className="form-field">
                Nombre
                <input
                  className="form-input"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <label className="form-field">
                Correo electrónico
                <input type="email" className="form-input" placeholder="tu@correo.cl" required />
              </label>
              <p className="text-xs text-muted-foreground">
                No se crea una cuenta real ni se guarda el correo.
              </p>
              <Button variant="purchase" type="submit" className="w-full">
                {registration ? "Crear cuenta de ejemplo" : "Ingresar a la demostración"}
              </Button>
            </form>
            <p className="text-sm mt-5">
              {registration ? "¿Ya tienes cuenta? " : "¿Primera vez aquí? "}
              <Link
                className="text-primary font-semibold"
                to="/cuenta"
                search={{ mode: registration ? undefined : "registro" }}
              >
                {registration ? "Ingresa" : "Crea tu cuenta"}
              </Link>
            </p>
          </>
        )}
      </section>
    </div>
  );
}
