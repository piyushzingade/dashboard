"use client";

import React from "react";
import { faker } from "@faker-js/faker";
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

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const statuses = [
    { id: faker.string.uuid(), name: "Planned", color: "#0a0b0b" },
    { id: faker.string.uuid(), name: "In Progress", color: "#0a0b0b" },
    { id: faker.string.uuid(), name: "Done", color: "#0a0b0b" },
];

const exampleFeatures = Array.from({ length: 20 }).map(() => ({
    id: faker.string.uuid(),
    name: capitalize(faker.company.buzzPhrase()),
    startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
    endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
    status: faker.helpers.arrayElement(statuses),
}));

const earliestYear =
    exampleFeatures.map((f) => f.startAt.getFullYear()).sort((a, b) => a - b)[0] ??
    new Date().getFullYear();

const latestYear =
    exampleFeatures.map((f) => f.endAt.getFullYear()).sort((a, b) => a - b).slice(-1)[0] ??
    new Date().getFullYear();

export default function CalendarComponent(): React.JSX.Element {
    return (
        <CalendarProvider>
            <CalendarDate>
                <CalendarDatePicker>
                    <CalendarMonthPicker />
                    <CalendarYearPicker end={latestYear} start={earliestYear} />
                </CalendarDatePicker>
                <CalendarDatePagination />
            </CalendarDate>

            <CalendarHeader />

            <CalendarBody features={exampleFeatures}>
                {({ feature }) => <CalendarItem feature={feature} key={feature.id} />}
            </CalendarBody>
        </CalendarProvider>
    );
}
