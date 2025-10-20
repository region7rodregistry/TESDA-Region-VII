"use client"

import { useState } from "react"
import { Box, Card, CardContent, CardHeader, Button, TextField, Stack, Typography, Alert } from "@mui/material"
import { Save as SaveIcon } from "@mui/icons-material"

export default function UTPRASSection() {
  const [utprasData, setUtprasData] = useState({
    title: "University Training and Professional Research Advancement System",
    description: "Advanced research and training initiatives for academic excellence",
    contactEmail: "utpras@example.com",
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        UTPRAS Management
      </Typography>

      <Card>
        <CardHeader title="Edit UTPRAS Information" />
        <CardContent>
          <Stack spacing={3}>
            {saved && <Alert severity="success">UTPRAS information saved successfully!</Alert>}

            <TextField
              label="Program Title"
              fullWidth
              value={utprasData.title}
              onChange={(e) => setUtprasData({ ...utprasData, title: e.target.value })}
              multiline
              rows={2}
            />

            <TextField
              label="Description"
              fullWidth
              value={utprasData.description}
              onChange={(e) => setUtprasData({ ...utprasData, description: e.target.value })}
              multiline
              rows={4}
            />

            <TextField
              label="Contact Email"
              fullWidth
              type="email"
              value={utprasData.contactEmail}
              onChange={(e) => setUtprasData({ ...utprasData, contactEmail: e.target.value })}
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
