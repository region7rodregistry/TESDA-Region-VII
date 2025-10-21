import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center 
      min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] lg:h-screen lg:min-h-screen
      overflow-hidden"
    >
      <video
        src="/bluememo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50" /> {/* Dark overlay */}

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-12 h-full pt-16 sm:pt-20 pb-4 sm:pb-8">
        {/* Left column - Text content */}
        <div className="flex flex-col justify-center text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-1/2 order-1 lg:order-1">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight text-white">
            Empowering{" "}
            <span className="text-blue-300">Central Visayas</span> Through
            Technical Education
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-xl mx-auto lg:mx-0">
            Building the nation's skilled workforce through quality training and certification programs.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
            <Link href="#about" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 rounded-xl font-semibold w-full"
              >
                Learn More
              </Button>
            </Link>
            <Link href="#programs" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-300 text-blue-300 hover:bg-blue-50/20 transition-all duration-300 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 rounded-xl font-semibold w-full"
              >
                View Programs
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-4 md:pt-6">
            <StatItem number="50K+" label="Graduates" />
            <StatItem number="200+" label="Programs" />
            <StatItem number="7" label="Provinces" />
          </div>
        </div>

        {/* Right column (image) */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center mt-0 md:mt-6 lg:mt-0 order-2 lg:order-2">
          <div className="relative w-[90%] sm:w-[85%] md:w-[80%] xl:w-[70%] aspect-[4/3] max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] lg:max-h-[65vh]">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl opacity-10 blur-xl" />
            <Image
              src="/8pointbanner.jpg"
              alt="TESDA trainees in technical education"
              fill
              className="rounded-3xl shadow-2xl object-contain object-center ring-2 ring-blue-100"
              priority
            />

            {/* Floating badge */}
            <div className="absolute -bottom-3 sm:-bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:-left-5 bg-white p-2 sm:p-3 md:p-4 rounded-2xl shadow-xl border border-blue-100 max-w-[calc(100%-1rem)] sm:max-w-[200px] md:max-w-[220px]">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src="/TUV.png" // Replace with your logo path
                    alt="Quality Certified Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    Quality Certified
                  </p>
                  <p className="text-xs text-gray-500">ISO Accredited</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
    </section>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-sm sm:text-lg md:text-xl xl:text-2xl font-bold text-white">
        {number}
      </div>
      <div className="text-xs sm:text-sm text-white mt-1">{label}</div>
    </div>
  )
}
