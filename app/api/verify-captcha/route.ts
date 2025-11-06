import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY!;
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: "Token is required" },
                { status: 400 }
            );
        }

        const formData = new FormData();
        formData.append('secret', SECRET_KEY);
        formData.append('response', token);

        const response = await fetch(VERIFY_URL, {
            body: formData,
            method: 'POST',
        });

        const data = await response.json();

        if (data.success) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { error: "Invalid token", details: data["error-codes"] },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error verifying captcha:", error);
        return NextResponse.json(
            { error: "Failed to verify captcha" },
            { status: 500 }
        );
    }
}


