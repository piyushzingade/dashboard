import PageContainer from "@/components/layout/page-container";
import { NuqsAdapter } from 'nuqs/adapters/next/app';


export default function ProductLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <PageContainer scrollable={true}>
            <NuqsAdapter>
                <div className='flex flex-col overflow-x-auto w-full'>
                    {children}
                </div>
            </NuqsAdapter>
        </PageContainer>
    );
}