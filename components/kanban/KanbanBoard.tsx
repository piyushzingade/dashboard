"use client";

import { GripVertical, Circle, Loader2, CheckCircle2, Calendar, User } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/kanban";

interface Task {
    id: string;
    title: string;
    priority: "low" | "medium" | "high";
    assignee?: string;
    dueDate?: string;
}

const COLUMNS: Record<
    string,
    { title: string; icon: React.ElementType; color: string; dot: string }
> = {
    backlog: {
        title: "Backlog",
        icon: Circle,
        color: "text-muted-foreground",
        dot: "bg-muted-foreground/50",
    },
    inProgress: {
        title: "In Progress",
        icon: Loader2,
        color: "text-warning",
        dot: "bg-warning",
    },
    done: {
        title: "Done",
        icon: CheckCircle2,
        color: "text-positive",
        dot: "bg-positive",
    },
};

const PRIORITY_STYLES: Record<string, string> = {
    high: "bg-destructive/10 text-destructive border-destructive/25",
    medium: "bg-warning/10 text-warning border-warning/25",
    low: "bg-muted text-muted-foreground border-border/50",
};

export function KanbanBoard() {
    const [columns, setColumns] = React.useState<Record<string, Task[]>>({
        backlog: [
            {
                id: "1",
                title: "Add authentication",
                priority: "high",
                assignee: "John Doe",
                dueDate: "2026-07-21",
            },
            {
                id: "2",
                title: "Create API endpoints",
                priority: "medium",
                assignee: "Jane Smith",
                dueDate: "2026-07-24",
            },
            {
                id: "3",
                title: "Write documentation",
                priority: "low",
                assignee: "Bob Johnson",
                dueDate: "2026-07-28",
            },
        ],
        inProgress: [
            {
                id: "4",
                title: "Design system updates",
                priority: "high",
                assignee: "Alice Brown",
                dueDate: "2026-07-19",
            },
            {
                id: "5",
                title: "Implement dark mode",
                priority: "medium",
                assignee: "Charlie Wilson",
                dueDate: "2026-07-22",
            },
        ],
        done: [
            {
                id: "7",
                title: "Setup project",
                priority: "high",
                assignee: "Eve Davis",
                dueDate: "2026-07-17",
            },
            {
                id: "8",
                title: "Initial commit",
                priority: "low",
                assignee: "Frank White",
                dueDate: "2026-07-16",
            },
        ],
    });

    return (
        <Kanban.Root
            value={columns}
            onValueChange={setColumns}
            getItemValue={(item) => item.id}
        >
            <Kanban.Board className="grid auto-rows-fr sm:grid-cols-3">
                {Object.entries(columns).map(([columnValue, tasks]) => {
                    const col = COLUMNS[columnValue];
                    if (!col) return null;
                    return (
                        <Kanban.Column
                            key={columnValue}
                            value={columnValue}
                            className="rounded-xl border-border bg-secondary/35"
                        >
                            {/* Column header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className={`${col.dot} h-2 w-2 rounded-full`} />
                                    <span className="text-sm font-semibold tracking-tight">
                                        {col.title}
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="pointer-events-none rounded-md px-1.5 text-[11px] font-medium"
                                    >
                                        {tasks.length}
                                    </Badge>
                                </div>
                                <Kanban.ColumnHandle asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-foreground"
                                        aria-label={`Move ${col.title} column`}
                                    >
                                        <GripVertical className="h-3.5 w-3.5" />
                                    </Button>
                                </Kanban.ColumnHandle>
                            </div>

                            {/* Task cards */}
                            <div className="flex flex-col gap-2 p-0.5">
                                {tasks.map((task) => (
                                    <Kanban.Item
                                        key={task.id}
                                        value={task.id}
                                        asHandle
                                        asChild
                                    >
                                        <div className="group/card rounded-lg border border-border bg-card p-3 transition-colors duration-150 hover:bg-accent/35">
                                            <div className="flex flex-col gap-2.5">
                                                {/* Title + priority */}
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="line-clamp-2 text-sm font-medium leading-snug">
                                                        {task.title}
                                                    </span>
                                                    <Badge
                                                        variant="outline"
                                                        className={`pointer-events-none h-5 shrink-0 rounded-md border px-1.5 text-[10px] font-medium capitalize ${PRIORITY_STYLES[task.priority]}`}
                                                    >
                                                        {task.priority}
                                                    </Badge>
                                                </div>

                                                {/* Meta row */}
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    {task.assignee && (
                                                        <div className="flex items-center gap-1.5">
                                                            <User className="h-3 w-3" />
                                                            <span className="line-clamp-1">
                                                                {task.assignee}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {task.dueDate && (
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            <time className="tabular-nums text-[11px]">
                                                                {task.dueDate}
                                                            </time>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Kanban.Item>
                                ))}
                            </div>
                        </Kanban.Column>
                    );
                })}
            </Kanban.Board>

            <Kanban.Overlay>
                <div className="size-full rounded-lg border border-primary/30 bg-primary/10" />
            </Kanban.Overlay>
        </Kanban.Root>
    );
}
