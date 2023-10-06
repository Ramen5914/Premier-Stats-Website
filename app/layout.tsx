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
            <body className='flex flex-col min-h-screen'>
                <Navbar />
                <main>
                    <div className="container mx-xl grow">
                        {children}
                    </div>
                </main>
                <Footer />
            </body>
        </html>
    )
}