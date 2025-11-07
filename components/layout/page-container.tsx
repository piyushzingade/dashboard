import React from 'react';

export default function PageContainer({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-1 p-4 md:px-6'>
            {children}
        </div>
    );
}