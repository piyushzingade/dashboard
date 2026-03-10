"use client";

import React from "react";
import { faker } from "@faker-js/faker";
import { CalendarDays } from "lucide-react";
import {
    CalendarBody,
    CalendarDate,
    CalendarDatePagination,
    CalendarDatePicker,
    CalendarHeader,
    CalendarItem,
    CalendarMonthPicker,
    CalendarProvider,
    CalendarYearPicker,
} from "@/components/calendarComp";

const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

const statuses = [
    { id: faker.string.uuid(), name: "Planned", color: "#6366f1" },
    { id: faker.string.uuid(), name: "In Progress", color: "#f59e0b" },
    { id: faker.string.uuid(), name: "Done", color: "#10b981" },
];

const exampleFeatures = Array.from({ length: 20 }).map(() => ({
    id: faker.string.uuid(),
    name: capitalize(faker.company.buzzPhrase()),
    startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
    endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
    status: faker.helpers.arrayElement(statuses),
}));

const earliestYear =
    exampleFeatures
        .map((f) => f.startAt.getFullYear())
        .sort((a, b) => a - b)[0] ?? new Date().getFullYear();

const latestYear =
    exampleFeatures
        .map((f) => f.endAt.getFullYear())
        .sort((a, b) => a - b)
        .slice(-1)[0] ?? new Date().getFullYear();

export default function CalendarComponent(): React.JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <h1 className="font-heading text-2xl font-bold tracking-tight">
                        Calendar
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Track deadlines, events, and feature schedules.
                    </p>
                </div>
            </div>

            {/* Calendar */}
            <div className="rounded-xl border border-border/50 bg-card/30 shadow-sm transition-[border-color] duration-200 hover:border-border/80">
                <CalendarProvider>
                    <CalendarDate>
                        <CalendarDatePicker>
                            <CalendarMonthPicker />
                            <CalendarYearPicker
                                end={latestYear}
                                start={earliestYear}
                            />
                        </CalendarDatePicker>
                        <CalendarDatePagination />
                    </CalendarDate>

                    <CalendarHeader />

                    <CalendarBody features={exampleFeatures}>
                        {({ feature }) => (
                            <CalendarItem
                                feature={feature}
                                key={feature.id}
                            />
                        )}
                    </CalendarBody>
                </CalendarProvider>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                {statuses.map((s) => (
                    <div key={s.id} className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: s.color }}
                        />
                        {s.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
