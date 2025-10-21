"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About Us", href: "/#about" },
    { name: "Good Governance", href: "/#good-governance" },
    { name: "Programs and Services", href: "/#programs" },
    { name: "Resources", href: "/#resources" },
    { name: "GAD Corner", href: "/#gad-corner" },
    { name: "Contact Us", href: "/#contact" },
    { name: "NTTC Application", href: "https://tesda-r7-forms.vercel.app/instructions.html" },
  ]

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ "--header-height": isScrolled && !isHovered ? "0px" : "80px" } as React.CSSProperties}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled && !isHovered ? "-translate-y-full shadow-sm border-b-2 border-blue-600" : "translate-y-0 border-b border-gray-200"}`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
              <Link href="/admin">
                <Image src="/t7logo.png" alt="TESDA Region VII Logo" fill className="object-contain" />
              </Link>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs sm:text-sm md:text-base font-bold text-gray-900">TESDA Region VII</div>
              <div className="text-xs text-blue-600">Central Visayas</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs lg:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-start gap-3 sm:gap-4 py-3 sm:py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-sm font-medium text-gray-700 hover:text-blue-600 px-2 py-1 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
