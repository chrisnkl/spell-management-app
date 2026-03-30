import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { ToastProvider } from "@heroui/react";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen text-deep-blue dark:text-alice-blue/90 bg-gray-50 dark:bg-deep-black">
            <Header />
            <main className="flex-grow">
                <ToastProvider />
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}