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
  return (
    <Box sx={{ 
      width: '100%', 
      height: { xs: '60vh', sm: '70vh', md: '80vh' },
      padding: { xs: 1, sm: 2 }
    }}>
      <iframe
        src="https://script.google.com/macros/s/AKfycbzkf1NElWnt50HmX6as-P-kTehdoA1TZWO2XcmsD1CFKFINgEjAZJYPila4_9vO2YxX/exec"
        width="100%"
        height="100%"
        style={{ border: "none", borderRadius: "8px" }}
        title="Scholarships"
      ></iframe>
    </Box>
  )
}
