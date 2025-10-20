"use client"

import type React from "react"

import { useState } from "react"
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "data-upload", label: "Data Upload" },
    { id: "scholarships", label: "Scholarships" },
    { id: "ptcacs", label: "PTCACs" },
    { id: "utpras", label: "UTPRAS" },
    { id: "hero-page", label: "Hero Page" },
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
          <div className="py-4">
            <h4 className="text-2xl font-semibold mb-2">Welcome to Admin Dashboard</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Select a section from the sidebar to get started.
            </p>
          </div>
        )
    }
  }

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <aside className={`w-[${DRAWER_WIDTH}px] flex-shrink-0 border-r ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} p-4 pt-6`}>
        <div className="mb-6 px-2">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav>
          <ul>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full p-2 my-1 rounded-lg text-left transition-colors duration-200 ${activeSection === item.id ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                >
                  {/* Icon Placeholder */}
                  <span className="mr-2">
                    {item.id === "dashboard" && "📊"}
                    {item.id === "data-upload" && "⬆️"}
                    {item.id === "scholarships" && "🎓"}
                    {item.id === "ptcacs" && "📄"}
                    {item.id === "utpras" && "📝"}
                    {item.id === "hero-page" && "🖼️"}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* AppBar */}
        <header className={`flex items-center justify-between h-16 px-4 border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2">
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="relative">
              <button onClick={handleMenuOpen} className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                A
              </button>
              {Boolean(anchorEl) && (
                <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none ${darkMode ? "text-white" : "text-gray-900"}`}>
                  <button onClick={handleMenuClose} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Profile</button>
                  <button onClick={handleMenuClose} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Settings</button>
                  <button onClick={handleMenuClose} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  )
}
