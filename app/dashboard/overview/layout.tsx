import PageContainer from '@/components/layout/page-container';

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