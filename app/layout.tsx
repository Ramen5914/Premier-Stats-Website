import "@/css/global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en-US'>
            <body className='text-slate-400 bg-white dark:text-slate-500 dark:bg-slate-800 dark'>
                <div className='flex flex-col h-screen'>
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
