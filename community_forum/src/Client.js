import { createClient } from '@supabase/supabase-js'

const url = 'https://ncdazvrizhhtxekzvjjd.supabase.co'

const supabase = createClient(url, key)

export default supabase;