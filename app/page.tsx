'use client'

import API from '@/lib/api/API'
import { useState, useEffect } from 'react'

export default function Home() {
  const [scheduleTypes, setScheduleTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.getSchedule().then((data) => {
        setScheduleTypes(data)
        setLoading(false)
      }).catch((error) => {
        console.error('Error fetching schedules:', error)
        setLoading(false)
      });
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
            Hello World
        </h1>
        <p className="text-xl text-gray-600">
            Welcome to GJ Riverside Raceway Website
        </p>
        
        <div className="mt-8">
            {loading 
                ? (<span>Loading schedule...</span>) 
                : (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Track Schedule:</h2>
                    <ul className="space-y-2">
                    {scheduleTypes?.map((track) => (
                        <li key={track.id} className="text-lg">
                        <strong>{track.name}</strong>
                        {track.description && (
                            <span className="text-gray-500"> - {track.description}</span>
                        )}
                        </li>
                    ))}
                    </ul>
                </div>
                )
            }
        </div>
        </div>
    </main>
  )
}
