'use client'

import TrackScheduleTable from '@/components/schedule/track.schedule.table'
import TrackSocialsContainer from '@/components/socials/track.socials.container'

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

                <TrackScheduleTable />
                <TrackSocialsContainer />
            </div>
        </main>
    )
}
