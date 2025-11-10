import { Plus } from "lucide-react";
import Link from "next/link";

export function Heading() {

    return (
        <div className="h-16 w-full flex items-center justify-between ">
            {/* Text */}
            <div className="">
                <div className="text-foreground text-2xl font-bold">Product</div>
                <div className="text-muted-foreground text-md">Manage products (Server side table functionalities.)</div>
            </div>
            {/* Button */}
            <div className="">
                <Link href='/dashboard/product/add' className="bg-foreground text-background px-3 py-2 flex items-center gap-3 rounded-md"><Plus className="size-4" /> Add</Link>
            </div>
        </div>
    )
}

