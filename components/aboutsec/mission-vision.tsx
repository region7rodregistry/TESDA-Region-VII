import React from "react";

export default function MissionVisionPage() {
  return (
    <main className="min-h-screen px-4 py-8 max-w-5xl mx-auto text-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        TESDA Mandate, Mission, Vision, Core Values, Value Statement & Quality Policy
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
        {/* Mandate */}
        <section className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <h2 className="text-lg font-semibold mb-2">Mandate</h2>
          <p className="text-sm leading-relaxed">
            The Technical Education and Skills Development Authority (TESDA) is the
            government agency tasked to manage and supervise technical education and
            skills development (TESD) in the Philippines. It was created by virtue of
            Republic Act 7796, otherwise known as the “Technical Education and Skills
            Development Act of 1994”. The said Act integrated the functions of the
            former National Manpower and Youth Council (NMYC), the Bureau of
            Technical-Vocational Education of the Department of Education, Culture and
            Sports (BTVE-DECS), and the Office of Apprenticeship of the Department of
            Labor and Employment (DOLE).
          </p>
        </section>

        {/* Mission */}
        <section className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <h2 className="text-lg font-semibold mb-2">Mission</h2>
          <p className="text-sm leading-relaxed">
            TESDA sets direction, promulgates relevant standards, and implements
            programs geared towards a quality-assured and inclusive technical
            education and skills development and certification system.
          </p>
          <h2 className="text-lg font-semibold mb-2">Vision</h2>
          <p className="text-sm leading-relaxed">
            The transformational leader in the technical education and skills
            development of the Filipino workforce.
          </p>
          <h2 className="text-lg font-semibold mb-2">Value Statement</h2>
          <p className="text-sm leading-relaxed">
          We believe in demonstrated competence, institutional integrity, personal commitment, culture of innovativeness and a deep sense of nationalism.
          </p>
        </section>
        {/* Quality Policy */}
        <section className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <h2 className="text-lg font-semibold mb-2">Quality Policy</h2>
          <p className="text-sm leading-relaxed">
          "We measure our worth by the satisfaction of the customers we serve"
          </p>
          <p>Through:</p>
          <ul>
            <li>Strategic Decisions</li>
            <li>Effectiveness</li>
            <li>Responsiveness</li>
            <li>Value Adding</li>
            <li>Integrity</li>
            <li>Citizen focus</li>
            <li>Efficiency</li>
          </ul>
        </section>
    </div>
  </main>
)
}
