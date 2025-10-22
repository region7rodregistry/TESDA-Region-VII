export default function Region7OperatingUnits() {
  return (
    <div className="max-w-4xl w-full text-center">
      <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-8 text-balance">Region 7 Operating Units</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/r7po.png" alt="Region 7 Operating Units" className="max-w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <ul className="list-disc list-inside text-2xl text-slate-700 space-y-2">
            <li>Cebu</li>
            <li>Bohol</li>
            <li>Negros Oriental</li>
            <li>Siquijor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
