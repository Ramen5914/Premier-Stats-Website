import '@/app/(css)/global.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en-US">
            <body className="text-slate-400 bg-white dark:text-slate-500 dark:bg-slate-800 dark">
                <div className="flex flex-col h-screen">
                    <Navbar/>
                    <main className="grow max-w-7xl flex flex-col space-y-4 mx-auto px-4 sm:px-6 md:px-8">
                        {children}
                    </main>
                    <Footer/>
                </div>
            </body>
        </html>
    )
}