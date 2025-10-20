"use client"

import type React from "react"

import { useState } from "react"
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
} from "@mui/material"
import { Save as SaveIcon, Image as ImageIcon } from "@mui/icons-material"

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setHeroData({ ...heroData, heroImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Hero Page Editor
      </Typography>

      <Grid container spacing={3}>
        {/* Editor Panel */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Edit Hero Content" />
            <CardContent>
              <Stack spacing={3}>
                {saved && <Alert severity="success">Hero page updated successfully!</Alert>}

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
                  <Button variant="outlined" component="label" fullWidth startIcon={<ImageIcon />}>
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                  </Button>
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
                  <Button variant="contained" color="primary" fullWidth startIcon={<SaveIcon />} onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="outlined" color="primary" fullWidth>
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Preview" />
            <CardContent>
              <Paper
                sx={{
                  p: 4,
                  backgroundColor: "rgba(37, 99, 235, 0.05)",
                  borderRadius: "12px",
                  minHeight: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {imagePreview && (
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Hero"
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      mb: 2,
                    }}
                  />
                )}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "primary.main",
                  }}
                >
                  {heroData.h1Text}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "textSecondary",
                    mb: 3,
                  }}
                >
                  {heroData.h3Text}
                </Typography>
                <Button variant="contained" color="primary" sx={{ alignSelf: "flex-start" }}>
                  {heroData.ctaButtonText}
                </Button>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
