
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Supabase configuration with provided credentials
const supabaseUrl = 'https://lchiyoyszzkrbzzbnaab.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjaGl5b3lzenprcmJ6emJuYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjUwMTIsImV4cCI6MjA1ODI0MTAxMn0.qNDVvdQri3b1VmSim5ee5N-ZEFp53yM7h1nO9qyoOUs';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
