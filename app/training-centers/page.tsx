"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { ChevronLeft, ChevronRight, Search, Download } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header" // Import the main Header component
import { trackPageView } from "@/lib/analytics"

interface RowData {
  B: string
  G: string
  T: string
  W: string
  J: string
  I: string
  M: string
  N: string
}

interface FlattenedRow extends RowData {
  id: string
  sheetName: string
}

const ROWS_PER_PAGE = 50
const DEBOUNCE_DELAY = 400

export default function DisplayPage() {
  const [allRows, setAllRows] = useState<FlattenedRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    // Track page view
    trackPageView("/training-centers", "Training Centers")
    
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("compendium_uploads").select("sheetName, data")

        if (error) {
          throw error
        }

        const flattened: FlattenedRow[] = []

        data?.forEach((item: any) => {
          const rows = item.data || []
          const sheetName = item.sheetName

          rows.forEach((row: RowData, index: number) => {
            flattened.push({
              ...row,
              id: `${sheetName}-${index}`,
              sheetName,
            })
          })
        })

        setAllRows(flattened)
      } catch (error) {
        console.error("Error fetching Supabase data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1)
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredRows = useMemo(() => {
    if (!debouncedSearch.trim()) return allRows

    const query = debouncedSearch.toLowerCase()
    return allRows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(query)))
  }, [allRows, debouncedSearch])

  const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE)
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE
  const endIndex = startIndex + ROWS_PER_PAGE
  const paginatedRows = filteredRows.slice(startIndex, endIndex)

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-muted border-t-primary"></div>
          <p className="mt-6 text-lg font-medium text-foreground">Loading training programs...</p>
          <p className="mt-2 text-sm text-muted-foreground">Please wait while we fetch the data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <Header /> {/* Use the main Header component */}
      {/* <DisplayPageHeader /> Use the extracted display page header */}

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 sm:pt-24">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search by institution name, qualification, location, or contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground placeholder-muted-foreground transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              <span className="text-primary font-bold">{filteredRows.length}</span> result
              {filteredRows.length !== 1 ? "s" : ""} found
            </p>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-secondary rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-b-2 border-primary/20">
                  <th className="px-6 py-5 text-left text-sm font-semibold">Province</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold">Institution</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold">Qualification</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold">Duration</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold">Address</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold">Head</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedRows.length > 0 ? (
                  paginatedRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`transition-all duration-200 hover:bg-secondary/50 ${
                        idx % 2 === 0 ? "bg-card" : "bg-secondary/20"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{row.B || "—"}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{row.G || "—"}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{row.T || "—"}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{row.W || "—"}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.J || "—"}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{row.I || "—"}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-mono">{row.M || "—"}</td>
                      <td className="px-6 py-4 text-sm text-accent hover:underline cursor-pointer">{row.N || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <p className="text-muted-foreground text-lg font-medium">No results found</p>
                      <p className="text-muted-foreground text-sm mt-2">Try adjusting your search criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden divide-y divide-border">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <div key={row.id} className="p-5 bg-card hover:bg-secondary/30 transition-colors">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="border-l-4 border-primary pl-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Institution</p>
                      <p className="text-sm font-bold text-foreground mt-1">{row.G || "—"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Province</p>
                        <p className="text-sm text-foreground mt-1">{row.B || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Duration</p>
                        <p className="text-sm text-foreground mt-1">{row.W || "—"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Qualification
                      </p>
                      <p className="text-sm text-foreground mt-1">{row.T || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</p>
                      <p className="text-sm text-foreground mt-1">{row.M || "—"}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-16 text-center">
                <p className="text-muted-foreground text-lg font-medium">No results found</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-foreground">
            Showing <span className="text-primary font-bold">{startIndex + 1}</span> to{" "}
            <span className="text-primary font-bold">{Math.min(endIndex, filteredRows.length)}</span> of{" "}
            <span className="text-primary font-bold">{filteredRows.length}</span> programs
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-card border-2 border-border text-foreground hover:bg-secondary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
              <span className="text-sm font-semibold text-foreground">
                Page <span className="text-primary">{currentPage}</span> of{" "}
                <span className="text-primary">{totalPages || 1}</span>
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
