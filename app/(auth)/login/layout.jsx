import { auth } from "@/lib/auth";
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
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}