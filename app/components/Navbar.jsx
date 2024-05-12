import Image from "next/image"
import Link from "next/link"
import Logo from './dojo-logo.png'
import LogoutButton from "./LogoutButton"

function Navbar({ user }) {
    // console.log(user)
    return (
        <nav>
            {/* keren bgt, placeholder utk ia selama load */}
            <Image
                src={Logo}
                alt="Dojo Helpdesk Logo"
                width={70}
                quality={100}
                loading="eager"
            // placeholder="blur"
            />
            <h1>Dojo Helpdesk</h1>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets" className="mr-auto">Tickets</Link>

            {user && <span>Hello, {user.email} </span>}
            <LogoutButton />
        </nav>
    )
}

export default Navbar
