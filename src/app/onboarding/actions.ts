"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/demo-data";

export async function saveProfile(formData: FormData) {
  const redirectTo = String(formData.get("redirect_to") || "/discover");

  // Demo mode (no Supabase): nothing to persist — don't bounce to /login.
  if (!isSupabaseConfigured()) {
    revalidatePath("/", "layout");
    redirect(redirectTo);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const interests = String(formData.get("interests") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const values = String(formData.get("values") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await supabase
    .from("profiles")
    .update({
      username: String(formData.get("username")),
      display_name: String(formData.get("display_name")),
      bio: String(formData.get("bio") || ""),
      location: String(formData.get("location") || ""),
      interests,
      values,
    })
    .eq("id", user.id);

  revalidatePath("/", "layout");
  redirect(redirectTo);
}
