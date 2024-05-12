import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { cookies } from 'next/headers'

async function getTickets() {
    //imitiate delay
    // await new Promise(resolve => setTimeout(resolve, 1000))

    // next js server will server render by default, and the data from this API will be save to any data in this app
    // it will do caching also, and we could set how many second untill it revalidate itself and fetch again
    // in this example, it 0 seconds so it opt out of using cache

    // old code:
    // const res = await fetch('https://mocki.io/v1/7baec01a-f7c6-4b37-8f0c-0c87095b4a3d', {
    //     next: {
    //         revalidate: 0
    //     }
    // })
    // return res.json()

    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase
        .from('tickets')
        .select()
        .order("id", { ascending: true })
    // di atas 1 baris ini iseng


    if (error) {
        console.log(error.message)
    }

    return data
}

export default async function TicketList() {
    const tickets = await getTickets()
    return (
        <>
            {tickets.map((ticket) => (
                <div key={ticket.id} className="card my-5">
                    <Link href={`/tickets/${ticket.id}`}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no open tickets, yay!</p>
            )}
        </>
    )
}