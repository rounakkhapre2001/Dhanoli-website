import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabaseClient";

type TeamMemberUpdate = {
  name?: string;
  role?: string;
  category?: string;
  term?: string;
  description?: string;
  photo_url?: string;
};

// ====================================================================
// UPDATE MEMBER (PATCH)
// ====================================================================
export async function PATCH(req: Request) {
  try {
    const supabaseService = getSupabaseService();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    const memberId = Number(id);
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const role = formData.get("role") as string | null;
    const category = formData.get("category") as string | null;
    const term = formData.get("term") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("photo") as File | null;

    let photo_url: string | undefined;

    // If new file provided, upload and get public URL
    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadErr } = await supabaseService.storage
        .from("team-photos")
        .upload(fileName, new Uint8Array(fileBuffer), { upsert: true });

      if (uploadErr) throw new Error(uploadErr.message);

      const { data: publicUrl } = supabaseService.storage
        .from("team-photos")
        .getPublicUrl(fileName);

      photo_url = publicUrl.publicUrl;
    }

    const updateData: TeamMemberUpdate = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (category) updateData.category = category;
    if (term) updateData.term = term;
    if (description) updateData.description = description;
    if (photo_url) updateData.photo_url = photo_url;

    const { error: updateError } = await supabaseService
      .from("team")
      .update(updateData)
      .eq("id", memberId);

    if (updateError) throw new Error(updateError.message);

    return NextResponse.json({ message: "Member updated successfully" }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("PATCH error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ====================================================================
// DELETE MEMBER (DELETE)
// ====================================================================
export async function DELETE(req: Request) {
  try {
    const supabaseService = getSupabaseService();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    const memberId = Number(id);

    // Fetch member to get photo URL
    const { data: memberData, error: fetchErr } = await supabaseService
      .from("team")
      .select("photo_url")
      .eq("id", memberId)
      .single();

    if (fetchErr) throw new Error(fetchErr.message);
    if (!memberData) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    // Delete member record
    const { error: deleteErr } = await supabaseService
      .from("team")
      .delete()
      .eq("id", memberId);

    if (deleteErr) throw new Error(deleteErr.message);

    // Delete photo from storage (if exists)
    if (memberData.photo_url) {
      const photoPath = memberData.photo_url.split("/").pop(); // extract file name
      if (photoPath) {
        const { error: storageErr } = await supabaseService.storage
          .from("team-photos")
          .remove([photoPath]);
        if (storageErr) console.warn("Storage delete warning:", storageErr.message);
      }
    }

    return NextResponse.json({ message: "Member deleted successfully" }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("DELETE error:", msg);
    return NextResponse.json({ error: "Unexpected error deleting member: " + msg }, { status: 500 });
  }
}
