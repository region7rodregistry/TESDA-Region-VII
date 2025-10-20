"use client"

import type React from "react"

import { useState } from "react"
import * as XLSX from "xlsx"
import { supabase } from "@/lib/supabase"


type SheetData = Record<string, unknown>[]
type ParsedData = {
  "2025 Bohol"?: SheetData
  "2025 Cebu"?: SheetData
  "2025 Negros Oriental"?: SheetData
  "2025 Siquijor"?: SheetData
}

export default function UploadPage() {
  const [status, setStatus] = useState<string>("")
  const [jsonPreview, setJsonPreview] = useState<string>("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setStatus("📖 Reading Excel file...")
    setJsonPreview("")

    try {
      // Read the file
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: "array" })

      // Target sheets
      const targetSheets = ["2025 Bohol", "2025 Cebu", "2025 Negros Oriental", "2025 Siquijor"]

      // Target columns (B, G, T, W, J, I, M, N)
      const targetColumns = ["B", "G", "T", "W", "J", "I", "M", "N"]

      const parsedData: ParsedData = {}

      setStatus("🔍 Parsing sheets...")

      // Parse each target sheet
      for (const sheetName of targetSheets) {
        if (!workbook.SheetNames.includes(sheetName)) {
          console.warn(`Sheet "${sheetName}" not found in workbook`)
          continue
        }

        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        // Extract only target columns and filter rows where Column B is not empty
        const filteredData: SheetData = []

        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i] as unknown[]

          // Column B is index 1 (A=0, B=1, ...)
          const columnB = row[1]

          // Skip rows where Column B is empty
          if (!columnB || columnB === "") continue

          // Extract target columns: B=1, G=6, T=19, W=22, J=9, I=8, M=12, N=13
          const rowData: Record<string, unknown> = {
            B: row[1] ?? "",
            G: row[6] ?? "",
            T: row[19] ?? "",
            W: row[22] ?? "",
            J: row[9] ?? "",
            I: row[8] ?? "",
            M: row[12] ?? "",
            N: row[13] ?? "",
          }

          filteredData.push(rowData)
        }

        parsedData[sheetName as keyof ParsedData] = filteredData
      }

      setStatus("📦 Preparing JSON...")

      // Convert to JSON
      const jsonString = JSON.stringify(parsedData, null, 2)
      setJsonPreview(jsonString)

      setStatus("☁️ Saving to Firestore...")

      for (const sheetName of Object.keys(parsedData)) {
        const sheetData = parsedData[sheetName as keyof ParsedData];
        if (sheetData) {
          // Create a new document for each sheet with a unique ID
          console.log(`Saving sheet ${sheetName} to Firestore:`, sheetData);
          const { data, error } = await supabase
            .from("compendium_uploads")
            .upsert({ sheetName: sheetName, data: sheetData, timestamp: new Date().toISOString() }, { onConflict: 'sheetName' });

          if (error) {
            console.error("Error saving to Supabase:", error);
            setStatus(`❌ Error saving to Supabase: ${error.message}`);
            return;
          }
          console.log("Data saved to Supabase:", data);
        }
      }

      setStatus("✅ Data saved to Supabase successfully!")
    } catch (error) {
      console.error("Error processing file:", error)
      setStatus(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Compendium Excel File</h1>
          <p className="text-gray-600">
            Upload your Excel file to parse and store data from Bohol, Cebu, Negros Oriental, and Siquijor sheets
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-700 font-medium">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Excel files (.xlsx, .xls)</p>
            </div>
            <input id="file-upload" type="file" className="hidden" accept=".xlsx,.xls" onChange={handleFileUpload} />
          </label>
        </div>

        {status && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">{status}</p>
          </div>
        )}

        {jsonPreview && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">JSON Preview</h3>
            <textarea
              readOnly
              value={jsonPreview}
              className="w-full h-64 p-4 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  )
}
