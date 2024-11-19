import { createClient } from '@supabase/supabase-js'

const url = 'https://ncdazvrizhhtxekzvjjd.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZGF6dnJpemhodHhla3p2ampkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MDc1MjIsImV4cCI6MjA0NjQ4MzUyMn0.i6uIpCmA7wMMAF3_Xm8da_hDf6bv9_Og_8FdBPD07ac'

const supabase = createClient(url, key)

export default supabase;