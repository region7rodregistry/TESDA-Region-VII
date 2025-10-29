"use client"

import type React from "react"
import { useEffect } from "react"
import Header from "@/components/header"
import SecretaryPage from "@/components/aboutsec/secretary-page"
import BriefHistory from "@/components/aboutsec/brief-history"
import MissionVision from "@/components/aboutsec/mission-vision"
import TesdaMandate from "@/components/aboutsec/tesda-mandate"
import TesdaOrgStructure from "@/components/aboutsec/tesda-orgstructure"
import CoreBusiness from "@/components/aboutsec/core-business"
import AboutRegion7 from "@/components/aboutsec/about-region7"
import Region7OperatingUnits from "@/components/aboutsec/region7-operating-units"
import { trackPageView } from "@/lib/analytics"

interface Section {
  id: string
  title: string
  bgColor: string
  component: React.ComponentType
}

const sections: Section[] = [
  { id: "secretary-page", title: "Secretary Page", bgColor: "bg-white", component: SecretaryPage },
  { id: "brief-history", title: "Brief History", bgColor: "bg-slate-50", component: BriefHistory },
  { id: "mission-vision", title: "Mission & Vision", bgColor: "bg-white", component: MissionVision },
  { id: "tesda-mandate", title: "TESDA Mandate", bgColor: "bg-slate-50", component: TesdaMandate },
  { id: "tesda-orgstructure", title: "TESDA Org Structure", bgColor: "bg-white", component: TesdaOrgStructure },
  { id: "core-business", title: "Core Business", bgColor: "bg-slate-50", component: CoreBusiness },
  { id: "about-region7", title: "About Region 7", bgColor: "bg-white", component: AboutRegion7 },
  {
    id: "region7-operating-units",
    title: "Region 7 Operating Units",
    bgColor: "bg-slate-50",
    component: Region7OperatingUnits,
  },
]

export default function PageTemplate() {
  useEffect(() => {
    trackPageView("/about", "About TESDA Region VII")
  }, [])

  return (
    <>
      <Header />
      <div className="scroll-smooth">
        <main>
          {sections.map((section) => {
            const Component = section.component
            return (
              <section
                key={section.id}
                id={section.id}
                className={`min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ${section.bgColor}`}
              >
                <Component />
              </section>
            )
          })}
        </main>
      </div>
    </>
  )
}
