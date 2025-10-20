"use client"

import { useState } from "react"
import { Box, Card, CardContent, CardHeader, Button, TextField, Stack, Typography, Alert } from "@mui/material"
import { Save as SaveIcon } from "@mui/icons-material"

export default function PTCACSSection() {
  const [ptcacsData, setPtcacsData] = useState({
    title: "Professional Training and Certification Programs",
    description: "Comprehensive programs designed to enhance professional skills",
    contactEmail: "ptcacs@example.com",
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        PTCACs Management
      </Typography>

      <Card>
        <CardHeader title="Edit PTCACs Information" />
        <CardContent>
          <Stack spacing={3}>
            {saved && <Alert severity="success">PTCACs information saved successfully!</Alert>}

            <TextField
              label="Program Title"
              fullWidth
              value={ptcacsData.title}
              onChange={(e) => setPtcacsData({ ...ptcacsData, title: e.target.value })}
              multiline
              rows={2}
            />

            <TextField
              label="Description"
              fullWidth
              value={ptcacsData.description}
              onChange={(e) => setPtcacsData({ ...ptcacsData, description: e.target.value })}
              multiline
              rows={4}
            />

            <TextField
              label="Contact Email"
              fullWidth
              type="email"
              value={ptcacsData.contactEmail}
              onChange={(e) => setPtcacsData({ ...ptcacsData, contactEmail: e.target.value })}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                Save Changes
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
