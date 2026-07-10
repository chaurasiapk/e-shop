import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex justify-center items-center h-[82vh]">
            <h1>Not Found on Home Page</h1>
            <Link href="/">Back to Home</Link>
        </div>
    )
}