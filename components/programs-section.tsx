import { Card } from "@/components/ui/card"

export default function ProgramsSection() {
  const programs = [
    {
      title: "Scholarships",
      description:
        "Free training programs and financial assistance for qualified beneficiaries through TWSP and other scholarship grants.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Assessment & Certification",
      description:
        "Competency assessment and national certification for various technical and vocational skills aligned with industry standards.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      title: "Training Centers",
      description:
        "Network of accredited training institutions offering quality technical-vocational education and training programs.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "NTTC Monitoring",
      description:
        "Monitoring and evaluation of National Technical Training Centers to ensure compliance with quality standards.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section id="programs" className="h-screen bg-white py-4 sm:py-6 md:py-8 flex flex-col justify-center">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Programs & Services</h2>
        <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto mb-2 sm:mb-3" />
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Discover our comprehensive range of programs designed to equip you with industry-relevant skills and certifications.
        </p>
      </div>
      {/* Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {programs.map((program, index) => (
          <Card
            key={index}
            className="flex flex-col justify-start items-center p-3 sm:p-4 md:p-6 border-2 border-blue-200 hover:border-blue-600 transition-all duration-300 hover:shadow-lg bg-white h-full"
          >
            <div className="text-blue-600 mb-2 sm:mb-3">
              <svg className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {program.icon.props.children}
              </svg>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center">{program.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base text-center leading-snug">
              {program.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
