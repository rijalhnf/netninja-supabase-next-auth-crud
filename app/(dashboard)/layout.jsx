import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


// components
import Navbar from '@/app/components/Navbar'

export default async function DashboardLayout({ children }) {
    const supabase = createServerComponentClient({ cookies })
    //there's a notice: Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.
    //so should it? just try after complete
    const { data } = await supabase.auth.getSession()

    if (!data.session) {
        redirect('/login')
    }

    return (
        <>
            <Navbar user={data.session.user} />
            {children}
        </>
    )
}