"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { mapSubmitError, validateNewsletterDraft } from "@/lib/validation/formsClient";

type NewsletterSubscribeFormProps = {
    /** Sent to `/api/newsletter` as `source` for analytics */
    source: string;
    /** Wider layout on dedicated newsletter page */
    layout?: "inline" | "stacked";
};

export default function NewsletterSubscribeForm({
    source,
    layout = "inline",
}: NewsletterSubscribeFormProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const startedAt = useMemo(() => Date.now().toString(), []);
    const [honeypotArmed, setHoneypotArmed] = useState(false);
    const [company, setCompany] = useState("");

    useEffect(() => {
        setHoneypotArmed(true);
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validation = validateNewsletterDraft({ email });
        if (validation.email) {
            setStatus("error");
            setErrorMessage(validation.email);
            return;
        }
        setStatus("submitting");
        setErrorMessage("");

        try {
            const formData = new FormData();
            formData.set("email", email.trim());
            formData.set("consentTextVersion", "v1");
            formData.set("source", source);
            formData.set("company", company);
            formData.set("startedAt", startedAt);

            const response = await fetch("/api/newsletter", {
                method: "POST",
                body: formData,
            });
            const body = await response.json().catch(() => ({}));
            if (!response.ok) {
                setStatus("error");
                setErrorMessage(mapSubmitError(body));
                return;
            }
            setStatus("success");
            setEmail("");
        } catch {
            setStatus("error");
            setErrorMessage("Unable to submit right now.");
        }
    };

    const formClass =
        layout === "stacked"
            ? "flex flex-col gap-3"
            : "flex flex-col sm:flex-row gap-3";

    const successClass =
        layout === "stacked"
            ? "mt-3 text-sm text-akhirah-teal font-medium"
            : "mt-3 text-sm text-mercy-mint";

    const errorClass = layout === "stacked" ? "mt-3 text-sm text-red-700" : "mt-3 text-sm text-red-300";

    return (
        <div className="max-w-lg">
            <form className={formClass} onSubmit={handleSubmit} aria-label="Newsletter subscription form">
                <div className="flex-1">
                    <label htmlFor={`newsletter-email-${source}`} className="sr-only">
                        Email address
                    </label>
                    <input
                        id={`newsletter-email-${source}`}
                        type="email"
                        className="min-h-11 w-full px-4 py-3 text-base rounded-sm text-account-black focus:outline-none focus:ring-2 focus:ring-eternal-gold border-2 border-akhirah-teal/15 bg-purity-white"
                        required
                        autoComplete="email"
                        maxLength={255}
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") {
                                setStatus("idle");
                                setErrorMessage("");
                            }
                        }}
                        disabled={status === "submitting"}
                        aria-describedby={status === "error" ? `newsletter-error-${source}` : undefined}
                        aria-invalid={status === "error"}
                    />
                    {honeypotArmed ? (
                        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                            <label htmlFor={`newsletter-company-${source}`}>Company</label>
                            <input
                                id={`newsletter-company-${source}`}
                                name="company"
                                type="text"
                                autoComplete="off"
                                tabIndex={-1}
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                    ) : null}
                    <input type="hidden" name="startedAt" value={startedAt} />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary whitespace-nowrap font-bold"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                >
                    {status === "submitting" ? "Subscribing…" : "Subscribe"}
                </button>
            </form>
            {status === "success" && (
                <p className={successClass} role="status">
                    Thank you for subscribing.
                </p>
            )}
            {status === "error" && (
                <p id={`newsletter-error-${source}`} className={errorClass} role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
