"use client"

import Image from "next/image"

export default function CenterImageSection() {
return ( <section className="w-full bg-gradient-to-b from-blue-50 to-blue-100 py-20 px-6 flex flex-col items-center justify-center text-center rounded-2xl shadow-md">
{/* Image in the center */} <div className="relative w-96 h-72 lg:w-[600px] lg:h-96 mb-8 rounded-2xl overflow-hidden border-4 border-blue-200 shadow-lg">
<Image
src="/tesdabuilding.png" // replace with your actual image path
alt="Centered Image"
fill
className="object-cover"
/> </div>

  {/* Paragraph below image */}
  <p className="max-w-2xl text-blue-800 text-lg leading-relaxed">
    This is where you can describe the image above — whether it’s a message
    from the secretary, a highlight of a TESDA program, or a showcase of
    your initiatives. Keep the text concise, meaningful, and aligned with
    your organization’s vision and mission.
  </p>
</section>

)
}
