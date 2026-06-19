"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/demo-data";

const DEMO_COOKIE = "lynk_demo_session";

// Demo auth is a DEV convenience only. It must never run in production, where a
// missing Supabase config must fail rather than accept any password.
const demoAllowed = !isSupabaseConfigured() && process.env.NODE_ENV !== "production";

// In demo mode (no real Supabase credentials), accept ANY email/password so the
// app can be tested instantly. We just drop a marker cookie and move on.
async function startDemoSession(displayName?: string) {
  const store = await cookies();
  store.set(DEMO_COOKIE, displayName || "demo", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function login(formData: FormData) {
  if (demoAllowed) {
    await startDemoSession();
    revalidatePath("/", "layout");
    redirect("/feed");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function signup(formData: FormData) {
  const displayName = String(formData.get("display_name") || "New member");

  // 18+ attestation is required server-side too, not just via the checkbox.
  if (formData.get("age_ok") !== "yes") {
    redirect(
      `/signup?error=${encodeURIComponent("You must confirm you are 18 or older.")}`
    );
  }

  if (demoAllowed) {
    await startDemoSession(displayName);
    revalidatePath("/", "layout");
    redirect("/onboarding");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    options: {
      data: { display_name: displayName },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function signout() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } else {
    const store = await cookies();
    store.delete(DEMO_COOKIE);
  }
  revalidatePath("/", "layout");
  redirect("/");
}
