import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://urzvzsddchwbnvxdigho.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyenZ6c2RkY2h3Ym52eGRpZ2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzQwMTgsImV4cCI6MjA4OTg1MDAxOH0.6WeuYPZIdpJ1qcLFuyOcFWwBnU5WQ9rMQrdxOdPjI6Y";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
