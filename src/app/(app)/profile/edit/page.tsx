import Link from "next/link";
import { saveProfile } from "@/app/onboarding/actions";
import { ChipPicker } from "@/app/onboarding/ChipPicker";
import { INTERESTS, VALUES } from "@/app/onboarding/options";
import { isSupabaseConfigured } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeftIcon } from "@/components/icons";

type Profile = {
  username: string;
  display_name: string;
  bio: string | null;
  location: string | null;
  interests: string[];
  values: string[];
};

// In demo mode there's no real account, so we pre-fill with the same sample
// profile the /profile page shows — editing never starts from blank.
const DEMO_PROFILE: Profile = {
  username: "tu_usuario",
  display_name: "Tu nombre",
  bio: "Conecta Supabase y termina el onboarding para ver tu perfil real aquí.",
  location: "Ciudad de México",
  interests: ["Majané", "Música", "Liderazgo"],
  values: ["Amabilidad", "Comunidad", "Jésed"],
};

async function getProfile(): Promise<Profile> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username, display_name, bio, location, interests, values")
          .eq("id", user.id)
          .single();
        if (data) return data as Profile;
      }
    } catch {
      // fall through
    }
  }
  return DEMO_PROFILE;
}

export default async function EditProfilePage() {
  const p = await getProfile();

  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          aria-label="Atrás"
          className="press flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--primary-soft)]"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Editar perfil
        </h1>
      </div>

      <form action={saveProfile} className="mt-6 space-y-6">
        <input type="hidden" name="redirect_to" value="/profile" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Nombre de usuario</label>
            <input
              name="username"
              required
              defaultValue={p.username}
              className="lynk-input mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Nombre para mostrar</label>
            <input
              name="display_name"
              required
              defaultValue={p.display_name}
              className="lynk-input mt-1"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Una bio breve</label>
          <textarea
            name="bio"
            rows={3}
            defaultValue={p.bio ?? ""}
            className="lynk-input mt-1 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Ciudad</label>
          <input
            name="location"
            defaultValue={p.location ?? ""}
            placeholder="Ciudad o 'En línea'"
            className="lynk-input mt-1"
          />
          <p className="mt-1 text-xs text-[var(--muted)]">
            Solo la ciudad — nunca tu dirección. Tu ciudad es visible para las
            personas y comunidades a las que te unes.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">Tus intereses</label>
          <div className="mt-2">
            <ChipPicker
              name="interests"
              options={INTERESTS}
              initial={p.interests}
              hint="Esto nos ayuda a encontrar a tu gente."
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Lo que valoras</label>
          <div className="mt-2">
            <ChipPicker
              name="values"
              options={VALUES}
              initial={p.values}
              hint="Las cosas que te importan."
            />
          </div>
        </div>

        <button type="submit" className="lynk-btn w-full py-3">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
