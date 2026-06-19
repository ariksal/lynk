import { saveProfile } from "./actions";
import { ChipPicker } from "./ChipPicker";
import { INTERESTS, VALUES } from "./options";
import { VerifyCard } from "./VerifyCard";

export default function OnboardingPage() {
  return (
    <main className="mx-auto max-w-xl flex-1 px-5 py-12">
      <span className="font-display text-xl font-bold tracking-tight text-[var(--primary)]">
        LYNK
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
        Cuéntanos quién eres
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Así te conectamos con personas y comunidades donde perteneces. Sin
        apariencias, sin métricas — solo tú.
      </p>

      <div className="mt-6">
        <VerifyCard />
      </div>

      <form action={saveProfile} className="mt-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Nombre de usuario</label>
            <input
              name="username"
              required
              placeholder="tu_usuario"
              className="lynk-input mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Nombre para mostrar</label>
            <input
              name="display_name"
              required
              placeholder="Tu nombre"
              className="lynk-input mt-1"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Una bio breve</label>
          <textarea
            name="bio"
            rows={3}
            placeholder="¿Qué te hace, tú?"
            className="lynk-input mt-1 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Ciudad</label>
          <input
            name="location"
            placeholder="Ciudad (ej. Ciudad de México)"
            className="lynk-input mt-1"
          />
          <p className="mt-1 text-xs text-[var(--muted)]">
            Solo tu ciudad — nunca tu dirección. Es visible para las personas y
            comunidades a las que te unes.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">Tus intereses</label>
          <div className="mt-2">
            <ChipPicker
              name="interests"
              options={INTERESTS}
              hint="Elige algunos — nos ayudan a encontrar a tu gente."
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Lo que valoras</label>
          <div className="mt-2">
            <ChipPicker
              name="values"
              options={VALUES}
              hint="Las cosas que te importan."
            />
          </div>
        </div>

        <button type="submit" className="lynk-btn w-full py-3">
          Empezar a encontrar a mi gente
        </button>
      </form>
    </main>
  );
}
