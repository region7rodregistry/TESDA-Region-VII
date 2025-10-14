import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section
      id="home"
     className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"

    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('./office.jpg')", // <-- put your background image here
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/75 to-white/85" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left side text */}
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Central Visayas Through Technical Education and Skills Development
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8">
              TESDA Region VII – Building the Nation's Skilled Workforce.
            </p>
            <Link href="#about">
              <Button
                size="lg"
                className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Right side image */}
<div className="flex justify-center lg:justify-end">
  <div className="relative w-[300px] h-[450px] lg:w-[550px] lg:h-[500px]">
    <Image
      src="/RDD.jpg" // make sure this image is in your /public folder
      alt="TESDA Office or trainees"
      fill
      className="rounded-2xl shadow-lg border border-blue-100 object-cover object-center"
      priority
    />
  </div>
</div>

        </div>
      </div>

      {/* Bottom blue accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />
    </section>
  )
}
