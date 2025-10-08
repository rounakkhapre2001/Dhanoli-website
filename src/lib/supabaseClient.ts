import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 1. Client for public/authenticated user sessions (Client-side use ONLY)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. RLS BYPASS CLIENT (Server-side use ONLY)
let serviceClient: ReturnType<typeof createClient> | null = null;

// Only create service client on the server where the secret key is available.
if (typeof window === 'undefined' && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    serviceClient = createClient(
        supabaseUrl,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
}

// Export a robust getter function for server-side use
export const getSupabaseService = () => {
    if (!serviceClient) {
        throw new Error(
            "supabaseService can only be accessed on the server (Route Handlers/Server Components). " +
            "Ensure SUPABASE_SERVICE_ROLE_KEY is set and the code is running on the server."
        );
    }
    return serviceClient;
};