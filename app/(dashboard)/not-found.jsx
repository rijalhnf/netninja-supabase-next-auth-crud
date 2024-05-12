import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <main className="text-center">
                <h2 className="text-3xl">There was a porblem.</h2>
                <p>We could not find the page you were looking for.</p>
                <p>Go Back to the <Link href="/">Dashboard</Link></p>
            </main>
        </div>
    )
}

