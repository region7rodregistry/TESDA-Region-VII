/**
 * Analytics Tracking Service
 * Tracks page views, CTA clicks, and contact interactions
 */

import { supabase } from './supabase'

// Get user agent and other metadata
const getMetadata = () => {
  if (typeof window === 'undefined') return {}
  
  return {
    user_agent: navigator.userAgent,
    referrer: document.referrer || 'direct',
  }
}

/**
 * Track page view
 */
export const trackPageView = async (pagePath: string, pageName?: string) => {
  try {
    const metadata = getMetadata()
    
    const { error } = await supabase
      .from('page_views')
      .insert({
        page_path: pagePath,
        page_name: pageName,
        ...metadata,
      })
    
    if (error) {
      console.error('Error tracking page view:', error)
    }
  } catch (err) {
    console.error('Failed to track page view:', err)
  }
}

/**
 * Track CTA button click
 */
export const trackCTAClick = async (
  buttonText: string,
  buttonLink: string,
  pagePath: string
) => {
  try {
    const metadata = getMetadata()
    
    const { error } = await supabase
      .from('cta_clicks')
      .insert({
        button_text: buttonText,
        button_link: buttonLink,
        page_path: pagePath,
        ...metadata,
      })
    
    if (error) {
      console.error('Error tracking CTA click:', error)
    }
  } catch (err) {
    console.error('Failed to track CTA click:', err)
  }
}

/**
 * Track contact form interaction
 */
export const trackContactInteraction = async (
  interactionType: 'form_view' | 'form_submit' | 'field_focus',
  fieldName?: string,
  success: boolean = true
) => {
  try {
    const metadata = getMetadata()
    
    const { error } = await supabase
      .from('contact_interactions')
      .insert({
        interaction_type: interactionType,
        field_name: fieldName,
        success,
        ...metadata,
      })
    
    if (error) {
      console.error('Error tracking contact interaction:', error)
    }
  } catch (err) {
    console.error('Failed to track contact interaction:', err)
  }
}

/**
 * Fetch analytics data for admin dashboard
 */
export interface AnalyticsSummary {
  totalPageViews: number
  totalCTAClicks: number
  totalContactSubmissions: number
  viewsLast24h: number
  ctaClicksLast24h: number
}

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary | null> => {
  try {
    // Get total page views
    const { count: totalPageViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
    
    // Get total CTA clicks
    const { count: totalCTAClicks } = await supabase
      .from('cta_clicks')
      .select('*', { count: 'exact', head: true })
    
    // Get total contact submissions
    const { count: totalContactSubmissions } = await supabase
      .from('contact_interactions')
      .select('*', { count: 'exact', head: true })
      .eq('interaction_type', 'form_submit')
    
    // Get views in last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count: viewsLast24h } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', yesterday)
    
    // Get CTA clicks in last 24 hours
    const { count: ctaClicksLast24h } = await supabase
      .from('cta_clicks')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', yesterday)
    
    return {
      totalPageViews: totalPageViews || 0,
      totalCTAClicks: totalCTAClicks || 0,
      totalContactSubmissions: totalContactSubmissions || 0,
      viewsLast24h: viewsLast24h || 0,
      ctaClicksLast24h: ctaClicksLast24h || 0,
    }
  } catch (err) {
    console.error('Failed to fetch analytics summary:', err)
    return null
  }
}

export interface PageViewData {
  page_path: string
  page_name: string | null
  count: number
}

export const getPageViewsByPath = async (limit: number = 10): Promise<PageViewData[]> => {
  try {
    const { data, error } = await supabase
      .from('page_views')
      .select('page_path, page_name')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Group by page_path and count
    const grouped = data?.reduce((acc: { [key: string]: PageViewData }, item) => {
      const key = item.page_path
      if (!acc[key]) {
        acc[key] = {
          page_path: item.page_path,
          page_name: item.page_name,
          count: 0,
        }
      }
      acc[key].count++
      return acc
    }, {})
    
    // Convert to array and sort by count
    const result = Object.values(grouped || {})
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
    
    return result
  } catch (err) {
    console.error('Failed to fetch page views by path:', err)
    return []
  }
}

export interface CTAClickData {
  button_text: string
  button_link: string
  count: number
}

export const getCTAClicksByButton = async (limit: number = 10): Promise<CTAClickData[]> => {
  try {
    const { data, error } = await supabase
      .from('cta_clicks')
      .select('button_text, button_link')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Group by button_text and count
    const grouped = data?.reduce((acc: { [key: string]: CTAClickData }, item) => {
      const key = item.button_text
      if (!acc[key]) {
        acc[key] = {
          button_text: item.button_text,
          button_link: item.button_link,
          count: 0,
        }
      }
      acc[key].count++
      return acc
    }, {})
    
    // Convert to array and sort by count
    const result = Object.values(grouped || {})
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
    
    return result
  } catch (err) {
    console.error('Failed to fetch CTA clicks by button:', err)
    return []
  }
}

export interface ContactInteractionData {
  interaction_type: string
  count: number
}

export const getContactInteractions = async (): Promise<ContactInteractionData[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_interactions')
      .select('interaction_type')
    
    if (error) throw error
    
    // Group by interaction_type and count
    const grouped = data?.reduce((acc: { [key: string]: ContactInteractionData }, item) => {
      const key = item.interaction_type
      if (!acc[key]) {
        acc[key] = {
          interaction_type: item.interaction_type,
          count: 0,
        }
      }
      acc[key].count++
      return acc
    }, {})
    
    return Object.values(grouped || {})
  } catch (err) {
    console.error('Failed to fetch contact interactions:', err)
    return []
  }
}

export interface TimeSeriesData {
  date: string
  page_views: number
  cta_clicks: number
  contact_submissions: number
}

export const getTimeSeriesData = async (days: number = 7): Promise<TimeSeriesData[]> => {
  try {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    
    const { data: pageViewsData } = await supabase
      .from('page_views')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
    
    const { data: ctaClicksData } = await supabase
      .from('cta_clicks')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
    
    const { data: contactData } = await supabase
      .from('contact_interactions')
      .select('created_at')
      .eq('interaction_type', 'form_submit')
      .gte('created_at', startDate.toISOString())
    
    // Group by date
    const dataByDate: { [key: string]: TimeSeriesData } = {}
    
    // Initialize all dates
    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      dataByDate[dateStr] = {
        date: dateStr,
        page_views: 0,
        cta_clicks: 0,
        contact_submissions: 0,
      }
    }
    
    // Count page views
    pageViewsData?.forEach(item => {
      const dateStr = item.created_at.split('T')[0]
      if (dataByDate[dateStr]) {
        dataByDate[dateStr].page_views++
      }
    })
    
    // Count CTA clicks
    ctaClicksData?.forEach(item => {
      const dateStr = item.created_at.split('T')[0]
      if (dataByDate[dateStr]) {
        dataByDate[dateStr].cta_clicks++
      }
    })
    
    // Count contact submissions
    contactData?.forEach(item => {
      const dateStr = item.created_at.split('T')[0]
      if (dataByDate[dateStr]) {
        dataByDate[dateStr].contact_submissions++
      }
    })
    
    // Convert to array and sort by date
    return Object.values(dataByDate).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  } catch (err) {
    console.error('Failed to fetch time series data:', err)
    return []
  }
}

