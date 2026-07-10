"use client"

import Link from "next/link"

export default function Error() {
    return (
        <div className="flex justify-center align-center">
            <h1>Error on home page</h1>
            <Link href="/">Back to Home</Link>
        </div>
    )
}