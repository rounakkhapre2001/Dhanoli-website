import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabaseClient"; 

// =================================================================
// READ (GET)
// =================================================================
export async function GET() {
    try {
        const supabaseService = getSupabaseService();

        const { data, error } = await supabaseService
            .from("team")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Supabase GET Error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data); 

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Unexpected error in GET /api/team:", errorMessage);
      return NextResponse.json(
        { error: "Internal Server Error during data fetch: " + errorMessage }, 
        { status: 500 }
      );
    }
}

// =================================================================
// CREATE (POST)
// =================================================================
export async function POST(req: Request) {
    try {
        const supabaseService = getSupabaseService(); 
        
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const role = formData.get("role") as string;
        const category = formData.get("category") as string;
        const term = formData.get("term") as string;
        const description = formData.get("description") as string;
        const photo = formData.get("photo") as File;

        if (!name || !role || !photo) {
             return NextResponse.json({ error: "Missing required fields: Name, Role, or Photo." }, { status: 400 });
        }
        
        const BUCKET_NAME = "team-photos";
        const fileName = `${Date.now()}-${photo.name}`;
        const filePath = `uploads/${fileName}`;

        // 1. Upload Photo (RLS bypass)
        const fileData = await photo.arrayBuffer();
        const { error: uploadError } = await supabaseService.storage 
            .from(BUCKET_NAME)
            .upload(filePath, new Uint8Array(fileData), {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) throw uploadError;

        // 2. Get URL & Insert Data (RLS bypass)
        const { data: publicUrlData } = supabaseService.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        const photo_url = publicUrlData?.publicUrl;

        const { error: dbError } = await supabaseService.from("team").insert([
            { name, role, category, term, description, photo_url },
        ]);

        if (dbError) throw dbError; 

        return NextResponse.json({ message: "Member added successfully!" }, { status: 201 });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("POST API Error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}