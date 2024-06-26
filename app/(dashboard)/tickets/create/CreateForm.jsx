// "use client"

import SubmitButton from "@/app/components/SubmitButton"
// import { useRouter } from "next/navigation"
// import { useState } from "react"
import { addTicket } from "../actions"

export default function CreateForm() {
    // const router = useRouter()

    // const [title, setTitle] = useState('')
    // const [body, setBody] = useState('')
    // const [priority, setPriority] = useState('low')
    // const [isLoading, setIsLoading] = useState(false)

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)

    //     const newTicket = { title, body, priority, user_email: 'mario@netninja.dev' }

    //     const res = await fetch('http://localhost:3000/api/tickets', {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newTicket)
    //     })

    //     const json = await res.json()
    //     console.log("isinya", json)

    //     if (json.error) {
    //         console.log(error.message)
    //     }
    //     if (json.data) {
    //         router.refresh()
    //         router.push('/tickets')
    //     }
    // }
    // ^dont use it anymore coz already using server actions: addTicket

    return (
        <form action={addTicket} className="w-1/2">
            <label>
                <span>Title:</span>
                <input
                    name="title"
                    required
                    type="text"
                // onChange={(e) => setTitle(e.target.value)}
                // value={title}
                />
            </label>
            <label>
                <span>Body:</span>
                <textarea
                    name="body"
                    required
                // onChange={(e) => setBody(e.target.value)}
                // value={body}
                />
            </label>
            <label>
                <span>Priority:</span>
                <select
                    name="priority"
                // onChange={(e) => setPriority(e.target.value)}
                // value={priority}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </label>

            <SubmitButton />

            {/* <button
                className="btn-primary"
                disabled={isLoading}
            >
                {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Add Ticket</span>}
            </button> */}
        </form>
    )
}

