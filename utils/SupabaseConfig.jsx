import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://eucptralmqrzyxblgvva.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Y3B0cmFsbXFyenl4YmxndnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NDU5ODgsImV4cCI6MjA0MzUyMTk4OH0.ekOHCsDzxF3t5o28DyyONKe_85VRWRU-2RpmVCMKhEY"
);
