import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation"
import { cookies } from 'next/headers'
import DeleteButton from "./DeleteButton";

//fetch data again if there's no prebuilt component
//or choose false to return 404 if there's no prebuilt component
export const dynamicParams = true

//this is to generate the title with dynamic
//somehow it still doesnt work
export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies })

    const { data: ticket } = await supabase.from('tickets')
        .select()
        .eq('id', params.id)
        .single()

    // old code
    // const id = params.id;
    // const res = await fetch('https://mocki.io/v1/7baec01a-f7c6-4b37-8f0c-0c87095b4a3d');
    // const tickets = await res.json();
    // const ticket = tickets.find(ticket => ticket.id === id);

    // const title = ticket ? `Dojo Helpdesk | ${ticket.title}` : 'Dojo Helpdesk';
    // console.log(title)

    return {
        title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not found'}`
    };
}


//it will pre-create the page during build time
//it will fetch again same as when getTicket revalidate
// export async function generateStaticParams() {
//     const res = await fetch('https://mocki.io/v1/7baec01a-f7c6-4b37-8f0c-0c87095b4a3d')
//     const tickets = await res.json()

//     return tickets.map((ticket) => ({
//         id: ticket.id
//     }))
// }
// ^ it doesnt need again. it will render dynamically

async function getTicket(id) {
    const supabase = createServerComponentClient({ cookies })

    const { data } = await supabase.from('tickets')
        .select()
        .eq('id', id)
        .single()

    if (!data) {
        notFound()
    }

    return data
}

//the name of "params.id", the id is from the folder name
export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id)

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
                <div className="ml-auto">
                    {data.session.user.email === ticket.user_email && (
                        <DeleteButton id={ticket.id} />
                    )}
                </div>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}

