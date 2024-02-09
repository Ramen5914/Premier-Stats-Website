export default function Layout({
    children,
    playerMatches,
}: Readonly<{
    children: React.ReactNode;
    playerMatches: React.ReactNode;
}>) {
    return (
        <>
            {children}
            {playerMatches}
        </>
    );
}
