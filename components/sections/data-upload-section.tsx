"use client"

import type React from "react"

import { useState } from "react"
import { Box, Card, CardContent, CardHeader, Button, Typography, LinearProgress, Alert, Stack } from "@mui/material"
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material"

export default function DataUploadSection() {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploadStatus("success")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Data Upload
      </Typography>

      <Card>
        <CardHeader title="Upload Data Files" />
        <CardContent>
          <Stack spacing={3}>
            <Box
              sx={{
                border: "2px dashed #2563eb",
                borderRadius: "12px",
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(37, 99, 235, 0.05)",
                },
              }}
              component="label"
            >
              <input type="file" hidden onChange={handleFileUpload} accept=".csv,.xlsx,.json" />
              <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Drag and drop your file here
              </Typography>
              <Typography variant="body2" color="textSecondary">
                or click to select (CSV, XLSX, JSON)
              </Typography>
            </Box>

            {uploading && (
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Uploading... {uploadProgress}%
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            {uploadStatus === "success" && <Alert severity="success">File uploaded successfully!</Alert>}

            {uploadStatus === "error" && <Alert severity="error">Upload failed. Please try again.</Alert>}

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary">
                Upload File
              </Button>
              <Button variant="outlined" color="primary">
                Cancel
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
