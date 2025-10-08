import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET all members
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

// POST: add new member with photo upload
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const category = formData.get("category") as string;
    const term = formData.get("term") as string;
    const description = formData.get("description") as string;
    const file = formData.get("photo") as File | null;

    if (!["Elected Members", "Administrative Staff"].includes(category))
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );

    let photo_url = "";

    if (file) {
      const fileData = await file.arrayBuffer();
      const fileName = `${Date.now()}-${file.name}`;

      // Upload to Supabase Storage
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

    const { data, error: insertError } = await supabase
      .from("team")
      .insert([{ name, role, category, term, description, photo_url }])
      .select();

    if (insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 });

    return NextResponse.json(data[0]);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: delete member by ID
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // last part of URL

    if (!id)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error } = await supabase.from("team").delete().eq("id", Number(id));

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
