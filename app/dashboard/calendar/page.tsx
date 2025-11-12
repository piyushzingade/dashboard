import CalendarComponent from "@/components/CalendarComponent";

export const metadata = {
    title: "Dashboard : Calendar"
}

export default function CalendarPage() {
    return (
        <div className="h-full w-full overflow-auto p-3 m-auto border rounded-md shadow">
            <CalendarComponent />
        </div>
    )
}

