'use client'

import TrackScheduleTable from '@/components/schedule/track.schedule.table'
import TrackScheduleCalendar from '@/components/schedule/track.schedule.calendar'
import TrackSocialsContainer from '@/components/socials/track.socials.container'
import Card from '@/components/ui/card'
import Row from '@/components/ui/row'

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
            <div className="text-center w-full max-w-full lg:max-w-7xl">
                <h1 className="text-4xl font-bold mb-4">
                    Hello World
                </h1>
                <p className="text-xl text-gray-600">
                    Welcome to GJ Riverside Raceway Website
                </p>

                <TrackScheduleCalendar />
                <TrackScheduleTable />
                <TrackSocialsContainer />
            </div>
        </main>
    )
}
