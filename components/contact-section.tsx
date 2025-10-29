"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { trackContactInteraction } from "@/lib/analytics"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  // Track when contact form is viewed
  useEffect(() => {
    trackContactInteraction("form_view")
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        // Track successful form submission
        trackContactInteraction("form_submit", undefined, true)
        alert("✅ Message sent successfully!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        // Track failed form submission
        trackContactInteraction("form_submit", undefined, false)
        const data = await res.json()
        console.error("Error:", data)
        alert("❌ Failed to send message. Please try again later.")
      }
    } catch (error) {
      // Track failed form submission
      trackContactInteraction("form_submit", undefined, false)
      console.error("Error sending message:", error)
      alert("⚠️ Something went wrong while sending your message.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFieldFocus = (fieldName: string) => {
    trackContactInteraction("field_focus", fieldName)
  }

  return (
    <section id="contact" className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50 flex flex-col justify-center">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Contact Us</h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 mx-auto mb-2 sm:mb-3" />
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            Get in touch with us for inquiries about our programs and services.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="p-4 sm:p-5 md:p-6 border border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus("name")}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus("email")}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus("message")}
                  required
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={`w-full border border-blue-600 transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 ${
                  loading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-5">
            <Card className="p-4 sm:p-5 md:p-6 border border-gray-200 bg-white">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Office Address</h3>
              <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-base sm:text-lg">TESDA Region VII</p>
                    <p className="leading-relaxed">
                      Archbishop Reyes Avenue, Lahug
                      <br />
                      Cebu City, 6000
                      <br />
                      Central Visayas, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-base sm:text-lg">Phone</p>
                    <p className="leading-relaxed">(032) 238-3531 | (032) 232-4652 | (032) 345-1768</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-base sm:text-lg">Email</p>
                    <p className="leading-relaxed">region7@tesda.gov.ph</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map */}
            <Card className="p-3 sm:p-4 border border-gray-200 bg-white overflow-hidden">
              <div className="w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1109.452325318326!2d123.90595444923379!3d10.326286211848391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99922c77c39b1%3A0xb6d08b824843b69b!2sTechnical%20Education%20and%20Skills%20Development%20Authority%20-%20Regional%20Office%20VII!5e0!3m2!1sen!2sph!4v1760432625123!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg border-0"
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
