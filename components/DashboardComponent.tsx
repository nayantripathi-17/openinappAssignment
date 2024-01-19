import React from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function DashboardComponent() {
  return (
    <div className="p-8 min-h-screen bg-[#F8FAFF] flex flex-grow lg:items-center">
      <div className="flex flex-grow w-full">
        <div className="w-1/4 xl:w-1/5 hidden lg:block">
          <LeftPanel />
        </div>
        <RightPanel />
      </div>
    </div>
  )
}

export default DashboardComponent