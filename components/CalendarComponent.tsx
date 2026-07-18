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
import { PageHeader } from "@/components/dashboard/page-header";

const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

const statuses = [
    { id: faker.string.uuid(), name: "Planned", color: "var(--muted-foreground)" },
    { id: faker.string.uuid(), name: "In progress", color: "var(--warning)" },
    { id: faker.string.uuid(), name: "Done", color: "var(--positive)" },
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
            <PageHeader title="Calendar" description="Track deadlines, releases, and feature delivery windows." icon={CalendarDays} />

            {/* Calendar */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
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
