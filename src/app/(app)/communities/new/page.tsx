import { UsersIcon } from "@/components/icons";

const TIPOS = [
  { value: "tnua", label: "Tnuá" },
  { value: "escuela", label: "Escuela" },
  { value: "grupo", label: "Grupo" },
];

const CATEGORIES = [
  "Voluntariado",
  "Liderazgo",
  "Deportes",
  "Campamento",
  "Pasatiempos",
  "Cultura",
];

export default function NewCommunityPage() {
  return (
    <div className="px-4 py-5">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
          <UsersIcon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight">
            Crea una comunidad
          </h1>
          <p className="text-xs text-[var(--muted)]">
            Un lugar para pertenecer.
          </p>
        </div>
      </div>

      <form className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium">Nombre</label>
          <input
            name="name"
            placeholder="ej. Janijim Kadima"
            className="lynk-input mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">¿De qué se trata?</label>
          <textarea
            name="description"
            rows={3}
            placeholder="¿Para quién es y qué hacen juntos?"
            className="lynk-input mt-1 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tipo</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <button
                key={t.value}
                type="button"
                className="press cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm font-semibold transition-colors hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Categoría</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className="press cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm transition-colors hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Ciudad</label>
          <input
            name="location"
            placeholder="Ciudad (ej. Ciudad de México)"
            className="lynk-input mt-1"
          />
        </div>

        <button type="button" className="lynk-btn w-full py-3" disabled>
          Crear comunidad
        </button>
        <p className="text-center text-xs text-[var(--muted)]">
          Conecta Supabase para habilitar la creación de comunidades.
        </p>
      </form>
    </div>
  );
}
