"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Facilities", href: "/facilities" },
        { name: "Placements", href: "/placements" },
        { name: "Gallery", href: "/gallery" },
        { name: "Apply Now", href: "/admission", primary: true },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            AdmissionPortal <span className="text-gray-900">2026</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${link.primary
                                        ? "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                        : "text-gray-700 hover:text-blue-600 transition"
                                    } font-medium`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md font-medium ${link.primary
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:text-blue-600"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
