import React from "react";

export default function TesdaFunctionsPage() {
  return (
    <main className="min-h-screen px-2 py-4 max-w-4xl mx-auto text-gray-900">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
        TESDA Mandated Functions and Responsibilities
      </h1>

      {/* TESDA is mandated to */}
      <section className="mb-6 p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
        <h2 className="text-md font-semibold mb-2">TESDA is mandated to:</h2>
        <ul className="list-disc list-inside text-xs leading-relaxed space-y-1">
          <li>Integrate, coordinate, and monitor skills development programs;</li>
          <li>Restructure efforts to promote and develop middle-level manpower;</li>
          <li>Approve skills standards and tests;</li>
          <li>
            Develop an accreditation system for institutions involved in
            middle-level manpower development;
          </li>
          <li>
            Fund programs and projects for technical education and skills
            development; and
          </li>
          <li>Assist trainers’ training programs.</li>
        </ul>
      </section>

      {/* At the same time, TESDA is expected to */}
      <section className="mb-6 p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
        <h2 className="text-md font-semibold mb-2">
          At the same time, TESDA is expected to:
        </h2>
        <ul className="list-disc list-inside text-xs leading-relaxed space-y-1">
          <li>Devolve training functions to local governments;</li>
          <li>Reform the apprenticeship program;</li>
          <li>Involve industry and employers in skills training;</li>
          <li>Formulate a skills development plan;</li>
          <li>Develop and administer training incentives;</li>
          <li>Organize skills competitions; and</li>
          <li>Manage skills development funds.</li>
        </ul>
      </section>

      {/* Overall role */}
      <section className="mb-6 p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
        <h2 className="text-md font-semibold mb-2">Overall, TESDA:</h2>
        <p className="text-xs leading-relaxed">
          Formulates manpower and skills plans, sets appropriate skills standards
          and tests, coordinates and monitors manpower policies and programs, and
          provides policy directions and guidelines for resource allocation for
          the TVET institutions in both the private and public sectors.
        </p>
      </section>

      {/* Present-day TESDA */}
      <section className="p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
        <h2 className="text-md font-semibold mb-2">Today, TESDA:</h2>
        <p className="text-xs leading-relaxed">
          TESDA has evolved into an organization that is responsive, effective, and
          efficient in delivering a wide range of services to its clients. To
          accomplish its multi-pronged mission, the TESDA Board continues to
          formulate strategies and programs geared towards yielding the highest
          impact on manpower development in various areas, industry sectors, and
          institutions.
        </p>
      </section>
    </main>
  );
}
