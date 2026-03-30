import { Button, Input, InputGroup } from "@heroui/react";

export default function Header() {
    return (

        <header className="py-2 px-4 bg-baltic-blue shadow-md border-b border-gray-950/50 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Hogwarts Management</h1>
            <nav>
                <ul className="flex gap-4">
                    <li className="hover:text-alice-blue/70 transition-colors"><a href="#">Home</a></li>
                    <li className="hover:text-alice-blue/70 transition-colors"><a href="#">About</a></li>
                </ul>
            </nav>
        </header>
    );
}