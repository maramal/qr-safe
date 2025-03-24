"use client"

import Link from "next/link"
import Image from "next/image"
import { MenuIcon } from "lucide-react"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const links = [
    {
        text: "Home",
        href: "/"
    },
    {
        text: "Terms and Conditions",
        href: "/terms-and-conditions"
    },
    {
        text: "Privacy",
        href: "/privacy"
    },
    {
        text: "Contribute",
        href: "https://github.com/maramal/qr-safe",
        blank: true
    }
]

export default function NavMenu() {
    return (
        <>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center w-full h-16 px-2">
                <Link href="/" className="font-bold flex gap-4 items-center">
                    <Image src="/Logo.png" alt="Logo QR Safe" width={32} height={32} />
                    QR Safe
                </Link>

                <div className="ml-4 flex-1 space-x-4">
                    {links.map((link, i) => (
                        <Link href={link.href} key={i} className="hover:underline underline-offset-4" target={link.blank ? "_blank" : ""}>
                            {link.text}
                        </Link>
                    ))}
                </div>

                <Button asChild className="mr-8">
                    <Link href="/report">Report an unsecure link</Link>
                </Button>
            </div>

            {/* Mobile Menu */}
            <div className="flex sm:flex md:hidden items-center w-full h-16 px-2 justify-between">
                <Link href="/" className="font-bold">QR Safe</Link>

                <Button asChild className="mr-8">
                    <Link href="/report">Report an unsecure link</Link>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <MenuIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {links.map((link, i) => (
                            <DropdownMenuItem key={i}>
                                <Link href={link.href}>{link.text}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}