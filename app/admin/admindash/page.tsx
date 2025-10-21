"use client"
import { useState, useEffect } from "react"
import ScholarshipsSection from "@/components/sections/scholarships-section"
import PTCACSSection from "@/components/sections/ptcacs-section"
import UTPRASSection from "@/components/sections/utpras-section"
import HeroPageSection from "@/components/sections/hero-page-section"
import {
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardList,
  ImageIcon,
} from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase" // Import Supabase client

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const supabase = createSupabaseClient() // Initialize Supabase client

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // Redirect to home page after logout
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "scholarships", label: "Scholarships", icon: BookOpen },
    { id: "ptcacs", label: "PTCACs", icon: FileText },
    { id: "utpras", label: "UTPRAS", icon: ClipboardList },
    { id: "hero-page", label: "Hero Page", icon: ImageIcon },
  ]

  const renderSection = () => {
    switch (activeSection) {
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
          <div className="py-4">
            <h4 className="text-2xl font-semibold mb-2">Welcome to Admin Dashboard</h4>
            <p className="text-muted-foreground">Select a section from the sidebar to get started.</p>
          </div>
        )
    }
  }

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out z-40 md:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        <header className="sticky top-0 z-20 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 shadow-sm">
          {/* Left side - Menu toggle and title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">Admin Dashboard</h1>
          </div>

          {/* Right side - Dark mode toggle and user menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" strokeWidth={1.5} />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                A
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-50">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <User className="w-4 h-4" strokeWidth={1.5} />
                    Profile
                  </button>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" strokeWidth={1.5} />
                    Settings
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-slate-700" />
                  <button
                    onClick={handleLogout} // Call handleLogout on click
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={1.5} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">{renderSection()}</div>
        </main>
      </div>
    </div>
  )
}
