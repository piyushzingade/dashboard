import { UpdateSoon } from "@/components/UpdateSoon"


export const metadata = {
    title: "Dashboard : feedback"
}

export default function feedbackPage() {
    return (
        <div className="h-full">
            <UpdateSoon />
        </div>
    )
}