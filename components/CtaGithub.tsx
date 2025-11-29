"use client"
import { Button } from '@/components/ui/button';
import { useGithubStars } from '@/hooks/use-github-star';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';


export default function CtaGithub() {
    const star = useGithubStars("piyushzingade", "dashboard")
    return (
        <Button variant='ghost' asChild size='sm' className='hidden sm:flex gap-2 '>
            <Link
                href='https://github.com/piyushzingade/dashboard'
                rel='noopener noreferrer'
                target='_blank'
                className='dark:text-foreground flex items-center justify-center gap-2'
            >
                <IconBrandGithub />
                <span className=' text-foreground'>{star.stargazersCount}</span>
            </Link>

        </Button>
    );
}