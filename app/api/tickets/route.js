// endpoint: /api/tickets
// if you need to fetch data from a server component, you should do directly in server component instead
// in default, the data is fetch once and nextjs cache it (it static)
// most route handlers is dynamic, except simple get
// cek in old version of this code below!

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic' // make it dynamic not static

export async function POST(request) {
    const ticket = await request.json()

    // get supabase instance
    const supabase = createRouteHandlerClient({ cookies })

    // get the current user session
    const { data: { session } } = await supabase.auth.getSession()

    // insert the data
    const { data, error } = await supabase.from('tickets')
        .insert({
            ...ticket,
            user_email: session.user.email
        })
        .select()
        .single()

    return NextResponse.json({ data, error })
}


//old version:

// import { NextResponse } from "next/server"

// export const dynamic = 'force-dynamic' // make it dynamic not static

// export async function GET() {
//     const res = await fetch('http://localhost:4000/tickets')
//     const tickets = await res.json()

//     return NextResponse.json(tickets, {
//         status: 200
//     })
// }

// export async function POST(request) {
//     const ticket = await request.json()

//     const res = await fetch('http://localhost:4000/tickets', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(ticket)
//     })

//     const newTicket = await res.json()

//     return NextResponse.json(newTicket, {
//         status: 201
//     }
//     )
// }