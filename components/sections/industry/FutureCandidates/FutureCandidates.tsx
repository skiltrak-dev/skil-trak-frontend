import React from 'react'
import { FutureCandidateCard } from './components'

export const FutureCandidates = () => {
   return (
      <div className="flex flex-col gap-y-2">
         {[...Array(7)].map((_, i) => (
            <FutureCandidateCard />
         ))}
      </div>
   )
}
