import Link from 'next/link'

export default function Navbar() {
    return (
        <nav>
            <div className="flex flew-row justify-between">
                <Link href="/teams">Teams</Link>
                <Link href="/players">Players</Link>
            </div>
        </nav>
    )
}