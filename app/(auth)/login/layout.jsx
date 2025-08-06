import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children, title }) {
    const session = await auth();
    if (session?.user) {
        return redirect("/");
    }
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
                <link rel="icon" type="image/x-icon" href="https://cs-us.uicdn.net/fileadmin/user_upload/Icons/on-light/icon-upgrade-downgrade.svg"></link>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}