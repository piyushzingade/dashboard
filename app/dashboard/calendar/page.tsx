import CalendarComponent from "@/components/CalendarComponent";

export const metadata = {
    title: "Dashboard : Calendar"
}

export default function CalendarPage() {
    return (
        <div className="h-full w-full overflow-auto p-4">
            <CalendarComponent />
        </div>
    )
}
