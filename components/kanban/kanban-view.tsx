import PageContainer from '@/components/layout/page-container';
import { Columns3 } from 'lucide-react';
import { AddTask } from './AddTask';
import { KanbanBoard } from './KanbanBoard';

export default function KanbanViewPage() {
    return (
        <PageContainer>
            <div className='flex w-full flex-col gap-5'>
                {/* Header */}
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80'>
                            <Columns3 className='h-5 w-5 text-muted-foreground' />
                        </div>
                        <div>
                            <h1 className='font-heading text-2xl font-bold tracking-tight'>
                                Kanban
                            </h1>
                            <p className='text-sm text-muted-foreground'>
                                Drag and drop tasks between columns to organize your workflow.
                            </p>
                        </div>
                    </div>
                    <div className='mt-3 sm:mt-0'>
                        <AddTask />
                    </div>
                </div>

                {/* Board */}
                <KanbanBoard />
            </div>
        </PageContainer>
    );
}
