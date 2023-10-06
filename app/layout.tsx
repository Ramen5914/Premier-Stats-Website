import './global.css'
import Navbar from './(components)/Navbar'
import Footer from './(components)/Footer'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en-US">
            <body>
                <div className="container mx-xl flex flex-col h-screen">
                    <Navbar />
                    <main className='grow'>
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    )
}