import { createSupabaseClient } from './supabase'

export interface HeroContent {
  id?: string
  h1_text: string
  h3_text: string
  cta_button_text: string
  cta_button_link: string
  hero_image_url?: string
  created_at?: string
  updated_at?: string
}

export async function saveHeroContent(content: Omit<HeroContent, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; data?: HeroContent; error?: string }> {
  try {
    const supabase = createSupabaseClient()
    
    // First, check if there's existing content
    const { data: existingData, error: fetchError } = await supabase
      .from('hero_content')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Fetch error:', fetchError)
      return { success: false, error: fetchError.message }
    }

    let result
    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from('hero_content')
        .update({
          h1_text: content.h1_text,
          h3_text: content.h3_text,
          cta_button_text: content.cta_button_text,
          cta_button_link: content.cta_button_link,
          hero_image_url: content.hero_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id)
        .select()
        .single()

      result = { data, error }
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('hero_content')
        .insert([content])
        .select()
        .single()

      result = { data, error }
    }

    if (result.error) {
      console.error('Save error:', result.error)
      return { success: false, error: result.error.message }
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.error('Save error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function getHeroContent(): Promise<{ success: boolean; data?: HeroContent; error?: string }> {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Fetch error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data || null }
  } catch (error) {
    console.error('Fetch error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
