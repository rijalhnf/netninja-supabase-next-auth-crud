// endpoint: /api/tickets
// if you need to fetch data from a server component, you should do directly in server component instead
// in default, the data is fetch once and nextjs cache it (it static)
// most route handlers is dynamic, except simple get

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export async function DELETE(_, { params }) {
    const id = params.id

    const supabase = createRouteHandlerClient({ cookies })

    const { error } = await supabase
        .from('tickets')
        .delete()
        .eq("id", id)

    return NextResponse.json({ error })
}

