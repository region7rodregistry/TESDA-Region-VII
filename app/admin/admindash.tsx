"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material"
import DataUploadSection from "@/components/sections/data-upload-section"
import ScholarshipsSection from "@/components/sections/scholarships-section"
import PTCACSSection from "@/components/sections/ptcacs-section"
import UTPRASSection from "@/components/sections/utpras-section"
import HeroPageSection from "@/components/sections/hero-page-section"

const DRAWER_WIDTH = 280

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#2563eb",
        light: "#3b82f6",
        dark: "#1d4ed8",
      },
      secondary: {
        main: "#64748b",
        light: "#94a3b8",
        dark: "#475569",
      },
      background: {
        default: darkMode ? "#0f172a" : "#f8fafc",
        paper: darkMode ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#f1f5f9" : "#0f172a",
        secondary: darkMode ? "#cbd5e1" : "#64748b",
      },
    },
    typography: {
      fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
        fontSize: "1.875rem",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1.25rem",
      },
      body1: {
        fontSize: "0.95rem",
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
            borderRight: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
            color: darkMode ? "#f1f5f9" : "#0f172a",
            boxShadow: `0 1px 3px ${darkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
            borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            margin: "4px 8px",
            "&.Mui-selected": {
              backgroundColor: "#2563eb",
              color: "#ffffff",
              "& .MuiListItemIcon-root": {
                color: "#ffffff",
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: `0 1px 3px ${darkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
            border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: "8px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          },
        },
      },
    },
  })

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
    { id: "data-upload", label: "Data Upload", icon: CloudUploadIcon },
    { id: "scholarships", label: "Scholarships", icon: SchoolIcon },
    { id: "ptcacs", label: "PTCACs", icon: DescriptionIcon },
    { id: "utpras", label: "UTPRAS", icon: DescriptionIcon },
    { id: "hero-page", label: "Hero Page", icon: ImageIcon },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case "data-upload":
        return <DataUploadSection />
      case "scholarships":
        return <ScholarshipsSection />
      case "ptcacs":
        return <PTCACSSection />
      case "utpras":
        return <UTPRASSection />
      case "hero-page":
        return <HeroPageSection />
      default:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Welcome to Admin Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Select a section from the sidebar to get started.
            </Typography>
          </Box>
        )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              pt: 2,
            },
          }}
        >
          <Box sx={{ px: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
              Admin Panel
            </Typography>
          </Box>
          <List>
            {navigationItems.map((item) => (
              <ListItem
                button
                key={item.id}
                selected={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* AppBar */}
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
                Admin Dashboard
              </Typography>
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)} sx={{ mr: 2 }}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>A</Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          {/* Content Area */}
          <Box
            component="main"
            sx={{
              flex: 1,
              overflow: "auto",
              p: 3,
              backgroundColor: "background.default",
            }}
          >
            <Container maxWidth="lg">{renderSection()}</Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
