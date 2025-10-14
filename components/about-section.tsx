import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const coverage = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Cebu",
      description: "PTC-Minglanilla, PTC-Daan Bantayan, PTC-Carmen, PTC-Toledo, PTC-Samboan",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Bohol",
      description: "PTC-Bilar, PTC-Pilar, PTC-Inabanga, PTC-Tubigon, PTC-Jagna",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Siquijor",
      description: "Lazi Technical Institute, PTC-Siquijor",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Negros Oriental",
      description: "PTC-Dumaguete",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About TESDA Region VII</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-lg text-gray-700 text-pretty">
            The Technical Education and Skills Development Authority (TESDA) Region VII serves Central Visayas by
            providing quality technical education, skills development, and certification services. Our mission is to
            empower Filipinos with the skills and competencies needed to succeed in the global workforce.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coverage.map((area, index) => (
            <Card
              key={index}
              className="p-6 border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 hover:shadow-lg bg-white"
            >
              <div className="text-blue-600 mb-4">{area.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
              <p className="text-gray-600 text-sm">{area.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
