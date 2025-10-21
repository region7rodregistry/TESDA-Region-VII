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
      link: "#scholarships",
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
      link: "#assessment-certification",
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
      link: "/display",
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
      link: "#nttc-monitoring",
    },
  ]

  return (
    <section id="programs" className="min-h-screen bg-white py-6 sm:py-8 md:py-10 flex flex-col justify-center">
      {/* Header */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Programs & Services</h2>
        <div className="w-12 sm:w-16 md:w-20 h-1 bg-blue-600 mx-auto mb-3 sm:mb-4" />
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-2 sm:px-0">
          Discover our comprehensive range of programs designed to equip you with industry-relevant skills and certifications.
        </p>
      </div>
      {/* Grid */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {programs.map((program, index) => (
          <a key={index} href={program.link} className="block">
            <Card
              className="flex flex-col justify-start items-center p-4 sm:p-5 md:p-6 border-2 border-blue-200 hover:border-blue-600 transition-all duration-300 hover:shadow-lg bg-white h-full"
            >
              <div className="text-blue-600 mb-3 sm:mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {program.icon.props.children}
                </svg>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">{program.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base text-center leading-relaxed">
                {program.description}
              </p>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}
