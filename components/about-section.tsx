import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const coverage = [
    {
      title: "Cebu",
      description: "A hub for Information Technology, Electronics, and Tourism. Cebu’s urban centers focus heavily on ICT and hospitality skills training, supporting BPOs and tourism",
    },
    {
      title: "Bohol",
      description: "Tourism, Agriculture, and Maritime sectors are key. TESDA training focuses on hospitality, eco-tourism, farming, and seafaring skills for coastal communities",
    },
    {
      title: "Siquijor",
      description: "Primarily Tourism, Handicrafts, and Agriculture. TESDA emphasizes skills for sustainable tourism, local crafts, and small-scale farmingr",
    },
    {
      title: "Negros Oriental",
      description: "Agriculture, Fishery, and Tourism dominate. TESDA programs often center on agribusiness, aquaculture, and eco-tourism to support rural livelihoods and coastal communities",
    },
  ]

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 py-10 sm:py-12 lg:py-16 overflow-hidden"
    >
      <div className="max-w-5xl w-full text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          About TESDA Region VII
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          The Technical Education and Skills Development Authority (TESDA) Region VII serves Central Visayas by
          providing quality technical education, skills development, and certification services. Our mission is to
          empower Filipinos with the skills and competencies needed to succeed in the global workforce.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {coverage.map((area, index) => (
          <Card
            key={index}
            className="flex flex-col justify-center items-center text-center p-5 sm:p-6 border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-600"
          >
            <div className="text-blue-600 mb-3">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              {area.title}
            </h3>
            <p className="text-gray-600 text-sm leading-snug">
              {area.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
