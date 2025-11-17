import PageContainer from '@/components/layout/page-container';
import { Heading } from '../Heading';
import { AddTask } from './AddTask';
import { KanbanBoard } from './KanbanBoard';

export default function KanbanViewPage() {
    return (
        <PageContainer>
            <div className='space-y-4 w-full sm:mb-1 mb-3'>
                <div className='flex items-center justify-between w-full'>
                    <Heading title={`Kanban`} description='Manage tasks by dnd' />
                    <AddTask />
                </div>
                <KanbanBoard />
            </div>
        </PageContainer>
    );
}