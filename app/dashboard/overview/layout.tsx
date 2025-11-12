import PageContainer from '@/components/layout/page-container';


export const metadata = {
    title: "Dashboard : Overview"
}
export default function OverViewLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <PageContainer>
            {children}
        </PageContainer>
    );
}