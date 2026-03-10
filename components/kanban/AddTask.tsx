"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export function AddTask() {
    return (
        <Button
            size="sm"
            className="gap-2 active:scale-[0.97] transition-transform duration-150"
        >
            <Plus className="size-4" />
            Add task
        </Button>
    );
}
