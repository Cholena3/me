import { createClient } from '@supabase/supabase-js'

// Replace these with your Supabase project credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Upload image to Supabase Storage and return public URL
export async function uploadImage(file) {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from('photos')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from('photos')
    .getPublicUrl(fileName)

  return urlData.publicUrl
}

// Delete image from Supabase Storage
export async function deleteImage(url) {
  try {
    const fileName = url.split('/').pop()
    await supabase.storage.from('photos').remove([fileName])
  } catch (e) {
    console.warn('Could not delete image from storage:', e)
  }
}
