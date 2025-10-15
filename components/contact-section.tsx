"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="h-screen py-3 sm:py-4 md:py-6 bg-gray-50 flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">Contact Us</h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 mx-auto mb-1.5 sm:mb-2" />
          <p className="text-xs sm:text-sm md:text-base text-gray-700">
            Get in touch with us for inquiries about our programs and services.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="p-2.5 sm:p-3 md:p-4 border border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 text-xs sm:text-sm py-1.5 sm:py-2"
              >
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-2.5 sm:space-y-3">
            <Card className="p-2.5 sm:p-3 md:p-4 border border-gray-200 bg-white">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">Office Address</h3>
              <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">TESDA Region VII</p>
                    <p className="leading-tight">Archbishop Reyes Avenue, Lahug<br />Cebu City, 6000<br />Central Visayas, Philippines</p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 sm:gap-2">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="leading-tight">(032) 238-3531 | (032) 232-4652 | (032) 345-1768</p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 sm:gap-2">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="leading-tight">region7@tesda.gov.ph</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map */}
            <Card className="p-1.5 sm:p-2 border border-gray-200 bg-white overflow-hidden">
              <div className="w-full h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1109.452325318326!2d123.90595444923379!3d10.326286211848391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99922c77c39b1%3A0xb6d08b824843b69b!2sTechnical%20Education%20and%20Skills%20Development%20Authority%20-%20Regional%20Office%20VII!5e0!3m2!1sen!2sph!4v1760432625123!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg border-0"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}