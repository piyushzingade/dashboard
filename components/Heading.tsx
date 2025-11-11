import { Plus } from "lucide-react";
import Link from "next/link";

export function Heading({ title, description }: { title: string, description?: string }) {

    return (
        <div className="h-16 w-full flex items-center justify-between ">
            {/* Text */}
            <div className="">
                <div className="text-foreground text-2xl font-bold">{title}</div>
                <div className="text-muted-foreground text-md">{description}</div>
            </div>

        </div>
    )
}

