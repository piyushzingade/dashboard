"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export function AddTask() {

    return (
        <div className="flex items-center justify-between ">
            <Button
                className="flex items-center justify-center gap-3"><Plus className="size-4 " /> Add Todo</Button>
        </div>
    )
}