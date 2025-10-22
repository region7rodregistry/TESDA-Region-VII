"use client"

import Image from "next/image"

export default function CenterImageSection() {
return ( <section className="w-full py-0 px-6 flex flex-col items-center justify-center text-left">
{/* Image in the center */} <div className="relative w-96 h-52 lg:w-[590px] lg:h-63 mb-8 rounded-2xl overflow-hidden border-4 border-blue-200 shadow-lg">
<Image
src="/tesdabuilding.png" // replace with your actual image path
alt="TESDA Building"
fill // Use fill to make the image take up the parent's space
className="object-contain" // Use object-contain to fit the entire image within the frame
/> </div>

  {/* Paragraph below image */}
  <p className="max-w-8xl text-blue-80 text-base leading-relaxed text-left">
  The Technical Education and Skills Development Authority (TESDA) was established through the enactment of Republic Act No. 7796 otherwise known as the "Technical Education and Skills Development Act of 1994", which was signed into law by President Fidel V. Ramos on August 25, 1994. This Act aims to encourage the full participation of and mobilize the industry, labor, local government units and technical-vocational institutions in the skills development of the country's human resources.

The merging of the National Manpower and Youth Council(NMYC) of the Department of Labor and Employment (DOLE). The Bureau of Technical and Vocational Education (BTVE) of theDepartment of Education, Culture and Sports (DECS), and The Apprenticeship Program of the Bureau of Local Employment(BLE) of the DOLE gave birth to TESDA.

The fusion of the above offices was one of the key recommendations of the 1991 Report of the Congressional Commission on Education, which undertook a national review of the state of Philippine education and manpower development. It was meant to reduce overlapping in skills development activities initiated by various public and private sector agencies, and to provide national directions for the country's technical-vocational education and training (TVET) system. Hence, a major thrust of TESDA is the formulation of a comprehensive development plan for middle-level manpower based on the National Technical Education and Skills Development Plan. This plan shall provide for a reformed industry-based training program that includes apprenticeship, dual training system and other similar schemes.
  </p>
</section>

)
}
