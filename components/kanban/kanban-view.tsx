import PageContainer from '@/components/layout/page-container';
import { Columns3 } from 'lucide-react';
import { AddTask } from './AddTask';
import { KanbanBoard } from './KanbanBoard';
import { PageHeader } from '@/components/dashboard/page-header';

export default function KanbanViewPage() {
    return (
        <PageContainer>
            <div className='flex w-full flex-col gap-5'>
                <PageHeader
                    title='Kanban'
                    description='Prioritize work and move tasks through a shared delivery workflow.'
                    icon={Columns3}
                    actions={<AddTask />}
                />

                {/* Board */}
                <KanbanBoard />
            </div>
        </PageContainer>
    );
}
