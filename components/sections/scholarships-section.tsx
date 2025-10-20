"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material"

interface Scholarship {
  id: number
  name: string
  amount: string
  deadline: string
}

export default function ScholarshipsSection() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([
    { id: 1, name: "Merit Scholarship", amount: "$5,000", deadline: "2024-12-31" },
    { id: 2, name: "Need-Based Grant", amount: "$3,000", deadline: "2024-11-30" },
  ])
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({ name: "", amount: "", deadline: "" })

  const handleAddScholarship = () => {
    if (formData.name && formData.amount && formData.deadline) {
      setScholarships([...scholarships, { id: Date.now(), ...formData }])
      setFormData({ name: "", amount: "", deadline: "" })
      setOpenDialog(false)
    }
  }

  const handleDeleteScholarship = (id: number) => {
    setScholarships(scholarships.filter((s) => s.id !== id))
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Scholarships
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
          Add Scholarship
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(37, 99, 235, 0.1)" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Deadline</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scholarships.map((scholarship) => (
                  <TableRow key={scholarship.id} hover>
                    <TableCell>{scholarship.name}</TableCell>
                    <TableCell>{scholarship.amount}</TableCell>
                    <TableCell>{scholarship.deadline}</TableCell>
                    <TableCell align="right">
                      <Button size="small" startIcon={<EditIcon />}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteScholarship(scholarship.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Scholarship</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Scholarship Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Amount"
              fullWidth
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddScholarship} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
