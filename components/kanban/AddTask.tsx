"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export function AddTask() {
    return (
        <Button
            size="sm"
            className="gap-2"
        >
            <Plus className="size-4" />
            Add task
        </Button>
    );
}
