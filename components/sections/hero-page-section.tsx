"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Stack,
  Typography,
  Alert,
  Paper,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material"
import { Save as SaveIcon, Image as ImageIcon } from "@mui/icons-material"
import { uploadImageToSupabase, getUploadedImages, type ImageItem } from "@/lib/storage"
import { saveHeroContent, getHeroContent } from "@/lib/hero-service"

export default function HeroPageSection() {
  const [heroData, setHeroData] = useState({
    h1Text: "Welcome to Our Platform",
    h3Text: "Empowering Education and Professional Growth",
    ctaButtonText: "Get Started",
    ctaButtonLink: "#",
    heroImage: null as string | null,
  })
  const [saved, setSaved] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableImages, setAvailableImages] = useState<ImageItem[]>([])
  const [loadingImages, setLoadingImages] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [viewType, setViewType] = useState<'desktop' | 'mobile'>('desktop');

  const loadAvailableImages = async () => {
    setLoadingImages(true)
    try {
      const result = await getUploadedImages()
      if (result.success && result.images) {
        setAvailableImages(result.images)
      }
    } catch (err) {
      console.error('Failed to load images:', err)
    } finally {
      setLoadingImages(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      // Upload to Supabase Storage
      const uploadResult = await uploadImageToSupabase(file)
      
      if (!uploadResult.success) {
        setError(uploadResult.error || 'Failed to upload image')
        return
      }

      // Update preview and hero data
      setImagePreview(uploadResult.url!)
      setHeroData({ ...heroData, heroImage: uploadResult.url! })
      
      // Refresh the available images list
      await loadAvailableImages()
    } catch (err) {
      setError('Failed to upload image')
      console.error('Upload error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelect = (imageUrl: string) => {
    setImagePreview(imageUrl)
    setHeroData({ ...heroData, heroImage: imageUrl })
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await saveHeroContent({
        h1_text: heroData.h1Text,
        h3_text: heroData.h3Text,
        cta_button_text: heroData.ctaButtonText,
        cta_button_link: heroData.ctaButtonLink,
        hero_image_url: heroData.heroImage || undefined,
      })

      if (!result.success) {
        setError(result.error || 'Failed to save hero content')
        return
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError('Failed to save hero content')
      console.error('Save error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load existing hero content and available images on mount
  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const result = await getHeroContent()
        if (result.success && result.data) {
          setHeroData({
            h1Text: result.data.h1_text,
            h3Text: result.data.h3_text,
            ctaButtonText: result.data.cta_button_text,
            ctaButtonLink: result.data.cta_button_link,
            heroImage: result.data.hero_image_url ?? null,
          })
          if (result.data.hero_image_url) {
            setImagePreview(result.data.hero_image_url)
          }
        }
      } catch (err) {
        console.error('Failed to load hero content:', err)
      }
    }

    loadHeroContent()
    loadAvailableImages()
  }, [])

  // Update iframe when hero data changes
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_HERO_DATA',
        data: heroData
      }, '*')
    }
  }, [heroData])

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Hero Page Editor
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Editor Panel */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Edit Hero Content" />
            <CardContent>
              <Stack spacing={3}>
                {saved && <Alert severity="success">Hero page updated successfully!</Alert>}
                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                  label="H1 Heading"
                  fullWidth
                  value={heroData.h1Text}
                  onChange={(e) => setHeroData({ ...heroData, h1Text: e.target.value })}
                  multiline
                  rows={2}
                />

                <TextField
                  label="H3 Subheading"
                  fullWidth
                  value={heroData.h3Text}
                  onChange={(e) => setHeroData({ ...heroData, h3Text: e.target.value })}
                  multiline
                  rows={2}
                />

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Hero Image
                  </Typography>
                  
                  {/* Image Selection Dropdown */}
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Select from existing images</InputLabel>
                    <Select
                      value={heroData.heroImage || ''}
                      onChange={(e) => handleImageSelect(e.target.value)}
                      disabled={loadingImages}
                      label="Select from existing images"
                    >
                      {availableImages.map((image) => (
                        <MenuItem key={image.url} value={image.url}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img 
                              src={image.url} 
                              alt={image.name}
                              style={{ width: 40, height: 30, objectFit: 'cover', borderRadius: 4 }}
                            />
                            <Box>
                              <Typography variant="body2">{image.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(image.created_at).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Upload New Image Button */}
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth 
                    startIcon={loading ? <CircularProgress size={20} /> : <ImageIcon />}
                    disabled={loading}
                  >
                    {loading ? 'Uploading...' : 'Upload New Image'}
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                  </Button>

                  {/* Current Image Preview */}
                  {imagePreview && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                        Current Image Preview:
                      </Typography>
                      <img 
                        src={imagePreview} 
                        alt="Hero preview"
                        style={{ 
                          width: '100%', 
                          maxHeight: 200, 
                          objectFit: 'cover', 
                          borderRadius: 8,
                          border: '1px solid #e0e0e0'
                        }}
                      />
                    </Box>
                  )}
                </Box>

                <TextField
                  label="CTA Button Text"
                  fullWidth
                  value={heroData.ctaButtonText}
                  onChange={(e) => setHeroData({ ...heroData, ctaButtonText: e.target.value })}
                />

                <TextField
                  label="CTA Button Link"
                  fullWidth
                  value={heroData.ctaButtonLink}
                  onChange={(e) => setHeroData({ ...heroData, ctaButtonLink: e.target.value })}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outlined" color="primary" fullWidth disabled={loading}>
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Preview Panel */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Live Preview" />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 1, borderBottom: '1px solid #e0e0e0' }}>
                <Button 
                  variant={viewType === 'desktop' ? 'contained' : 'outlined'} 
                  onClick={() => setViewType('desktop')}
                  size="small"
                >
                  Desktop
                </Button>
                <Button 
                  variant={viewType === 'mobile' ? 'contained' : 'outlined'} 
                  onClick={() => setViewType('mobile')}
                  size="small"
                >
                  Mobile
                </Button>
              </Box>
            <CardContent sx={{ p: 0, height: 'calc(100% - 72px - 48px)' }}>
              <Box
                sx={{
                  width: viewType === 'desktop' ? '100%' : '375px', // Common mobile width
                  height: viewType === 'desktop' ? '100%' : '667px', // Common mobile height
                  border: "none",
                  borderRadius: "8px",
                  overflow: "hidden",
                  margin: '0 auto', // Center the mobile view
                  boxShadow: viewType === 'mobile' ? '0 0 10px rgba(0,0,0,0.1)' : 'none', // Add shadow for mobile view
                  transition: 'all 0.3s ease-in-out', // Smooth transition
                }}
              >
                <iframe
                  ref={iframeRef}
                  src="/hero-preview"
                  width="100%"
                  height="100%"
                  style={{
                    border: "none",
                    borderRadius: "8px",
                  }}
                  title="Hero Section Preview"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}