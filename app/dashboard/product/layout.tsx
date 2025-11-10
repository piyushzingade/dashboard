import PageContainer from "@/components/layout/page-container";
import { NuqsAdapter } from 'nuqs/adapters/next/app';


export default function ProductLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-fit">
            <PageContainer scrollable={true}>
                <NuqsAdapter>
                    {children}
                </NuqsAdapter>
            </PageContainer>
        </div>
    );
}