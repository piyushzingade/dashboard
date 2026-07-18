import CalendarComponent from "@/components/CalendarComponent";
import PageContainer from "@/components/layout/page-container";

export const metadata = {
    title: "Dashboard : Calendar"
}

export default function CalendarPage() {
    return (
        <PageContainer>
            <CalendarComponent />
        </PageContainer>
    )
}
