import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const category = formData.get("category") as string;
  const term = formData.get("term") as string;
  const description = formData.get("description") as string;
  const file = formData.get("photo") as File | null;

  let photo_url: string | undefined;

  if (file) {
    const fileData = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("team-photos")
      .upload(fileName, new Uint8Array(fileData), {
        cacheControl: "3600",
        upsert: true,
      });
    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data: urlData } = supabase.storage
      .from("team-photos")
      .getPublicUrl(fileName);
    photo_url = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("team")
    .update({ name, role, category, term, description, ...(photo_url && { photo_url }) })
    .eq("id", Number(id))
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
