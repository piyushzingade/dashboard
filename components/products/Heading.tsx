import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export function Heading() {

    return (
        <div className="h-16 w-full flex items-center justify-between border-b border-muted-foreground/30">
            {/* Text */}
            <div className="">
                <div className="text-foreground text-2xl font-bold">Product</div>
                <div className="text-muted-foreground text-md">Manage products (Server side table functionalities.)</div>
            </div>
            {/* Button */}
            <div className="">
                <Button className="bg-foreground text-background px-6 py-2"><Plus className="size-4" /> Add</Button>
            </div>
        </div>
    )
}

// 
// Product 
// Manage products (Server side table functionalities.)

