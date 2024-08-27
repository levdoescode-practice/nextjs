import type { Metadata } from "next";
import { Lilita_One, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/nav-bar";
import RecipeProvider from "@/context/recipe-context";

const inter = Montserrat({ subsets: ["latin"], weight: ['500', '600', '700'] });
const lilita = Lilita_One({ subsets: ["latin"], weight: ['400'] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${lilita.className}`}>
                <RecipeProvider>
                    <NavBar />
                    {children}
                </RecipeProvider>
            </body>
        </html>
    );
}
