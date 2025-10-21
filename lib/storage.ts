import { createSupabaseClient } from './supabase'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImageToSupabase(
  file: File,
  bucketName: string = 'hero-images'
): Promise<UploadResult> {
  try {
    const supabase = createSupabaseClient()
    
    // Generate a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `hero/${fileName}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return { success: false, error: error.message }
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error('Upload error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function deleteImageFromSupabase(
  url: string,
  bucketName: string = 'hero-images'
): Promise<boolean> {
  try {
    const supabase = createSupabaseClient()
    
    // Extract file path from URL
    const urlParts = url.split('/')
    const fileName = urlParts[urlParts.length - 1]
    const filePath = `hero/${fileName}`

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

export interface ImageItem {
  name: string
  url: string
  size: number
  created_at: string
}

export async function getUploadedImages(
  bucketName: string = 'hero-images'
): Promise<{ success: boolean; images?: ImageItem[]; error?: string }> {
  try {
    const supabase = createSupabaseClient()
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('hero', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('List images error:', error)
      return { success: false, error: error.message }
    }

    // Get public URLs for each image
    const images: ImageItem[] = data.map(file => {
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(`hero/${file.name}`)

      return {
        name: file.name,
        url: urlData.publicUrl,
        size: file.metadata?.size || 0,
        created_at: file.created_at
      }
    })

    return { success: true, images }
  } catch (error) {
    console.error('List images error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
