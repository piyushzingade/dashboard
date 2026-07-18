"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Turnstile from "react-turnstile";
import axios from "axios";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const error = searchParams.get("error");

  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/dashboard");
      router.refresh();
    }
  }, [session, status, router]);

  const verifyToken = async (token: string) => {
    try {
      const { data } = await axios.post("/api/verify-captcha", { token });
      return data.success;
    } catch (error: unknown) {
      if (axios.isAxiosError<{ error?: string }>(error)) {
        console.error("Captcha verification error:", error.response?.data?.error ?? error.message);
      } else if (error instanceof Error) {
        console.error("Captcha verification error:", error.message);
      } else {
        console.error("Captcha verification error: Unknown error");
      }
      return false;
    }
  };

  const handleVerify = useCallback((token: string) => {
    setToken(token);
    setVerificationError(null);
  }, []);

  const handleSignIn = async () => {
    if (!token) {
      setVerificationError("Please complete the captcha first");
      return;
    }

    try {
      setIsLoading(true);
      setVerificationError(null);

      const isValid = await verifyToken(token);
      if (!isValid) {
        setVerificationError("Captcha verification failed. Please try again.");
        return;
      }

      await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setVerificationError("An error occurred during sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-5">
        <div className="text-center" role="status" aria-live="polite">
          <div className="mx-auto size-8 animate-spin rounded-full border-2 border-muted border-t-foreground" aria-hidden="true" />
          <p className="mt-4 text-sm text-muted-foreground">Loading account…</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-5 py-12">
      <section className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8" aria-labelledby="signin-title">
        <div className="text-center space-y-2">
          <div className="mx-auto mb-5 flex size-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground" aria-hidden="true">N</div>
          <h1 id="signin-title" className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue to your NexUI workspace.</p>
          {(error || verificationError) && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-left text-sm text-destructive" role="alert">
              {error === "AccessDenied"
                ? "Access denied. Please try again."
                : verificationError || "An error occurred during sign in."}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Turnstile
            sitekey="0x4AAAAAAB_WvWGALYvDugry"
            onVerify={handleVerify}
            theme="auto"
          />
        </div>

        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-2 bg-background"
          onClick={handleSignIn}
          disabled={isLoading || !token}
          title={!token ? "Please complete the captcha first" : ""}
        >
          {isLoading ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-muted border-t-primary" aria-hidden="true" />
              <span className="text-foreground">Signing in…</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              <span className="text-foreground">Sign in with Google</span>
            </>
          )}
        </Button>
      </section>
    </main>
  );
}
