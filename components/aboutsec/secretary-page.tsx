"use client"

import Image from "next/image"

export default function SecretaryPage() {
return ( <section className="w-full max-w-screen-xl mx-auto min-h-screen py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-center gap-10 shadow-md">
{/* Left side: Image */} <div className="relative w-72 h-72 lg:w-96 lg:h-96 overflow-hidden shadow-lg border-4 border-blue-200">
<Image
src="/seckiko.png" // replace this path with your actual image
alt="TESDA Secretary"
fill
className="object-cover"
/> </div>

  {/* Right side: Text */}
  <div className="max-w-xl text-center lg:text-left">
    <h1 className="text-3xl lg:text-4xl font-bold text-blue-800 mb-4">
      TESDA Secretary
    </h1>
    <h1 className="text-3xl lg:text-4xl font-bold text-blue-800 mb-4">
      Jose Francisco "Kiko" B. Benitez
    </h1>
    <p className="text-blue-700 leading-relaxed text-lg">
    Through the years, TESDA has reached millions of our kababayans by providing inclusive and free technical vocational education and training (TVET) nationwide through various training modalities.

The new TESDA slogan and logo demonstrate the Agency's stronger advocacy to give our kababayans even better access to quality-assured and globally competitive tech-voc, and communicate to the public TESDA's aspiration to provide public service with a heart aligned with the administration's brand of governance and leadership ‘Bagong Pilipinas’.

Kapag sama-sama, sa TESDA, Kayang Kaya!
    </p>
  </div>
</section>

)
}
