import Link from 'next/link'

export default function TeamCard({ id }: { id: number }) {
    const order = "order-[" + id + "]"

    return (
        <Link href={"/edit/team/" + id}>
            <div key={id}>
                <h1>Test {id}</h1>
            </div>
        </Link>
    )
}
