import React from 'react';

export default function PageContainer({
    children,
    scrollable = true
}: {
    children: React.ReactNode;
    scrollable?: boolean;
}) {
    return (
        <>
            {scrollable ? (
                <div className='h-full overflow-y-auto overflow-x-hidden scrollbar-thin'>
                    <div className='flex flex-1 p-4 md:px-6'>{children}</div>
                </div>
            ) : (
                <div className='flex flex-1 p-4 md:px-6'>{children}</div>
            )}
        </>
    );
}