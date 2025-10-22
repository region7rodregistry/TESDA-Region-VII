import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-blue-600">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image src="/t7logo.png" alt="TESDA Region VII Logo" fill className="object-contain" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-gray-900">TESDA Region VII</div>
                <div className="text-xs text-blue-600">Central Visayas</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Building the Nation's Skilled Workforce through Quality Technical Education and Skills Development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="#home" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#programs"
                  className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Data Privacy Act
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">© {new Date().getFullYear()} TESDA Region VII. All rights reserved.</p>
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-right">
              Developed by <span className="font-medium text-blue-600">TESDA Region VII - ICT Unit</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
