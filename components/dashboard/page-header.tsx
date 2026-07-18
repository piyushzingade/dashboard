import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    actions?: ReactNode;
};

export function PageHeader({ title, description, icon: Icon, actions }: PageHeaderProps) {
    return (
        <section className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between" aria-labelledby="page-title">
            <div className="flex min-w-0 items-start gap-3">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground" aria-hidden="true">
                    <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                    <h1 id="page-title" className="font-heading text-2xl font-semibold tracking-[-0.03em] text-balance">
                        {title}
                    </h1>
                    <p className="mt-1 max-w-[65ch] text-sm leading-5 text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
        </section>
    );
}
