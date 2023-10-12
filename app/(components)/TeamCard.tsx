export default function TeamCard({id}: {id: number}) {
    const order = "order-[" + id + "]"
    
    return (
        <div key={id}>
            <h1>Test {id}</h1>
        </div>
    )
}
