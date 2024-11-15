import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const NavLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    return (
        <Link
            href={href}
            className="transition duration-300 text-gray-700 hover:text-blue-600 text-lg font-medium"
        >
            {children}
        </Link>
    );
};

export default function Header() {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <NavLink href="/">
                        <span className="flex items-center gap-2">
                            <Image
                                src="/icon.ico"
                                alt="CarApp logo"
                                width={36}
                                height={36}
                                className="hover:rotate-12 transform transition-transform duration-300"
                            />
                            <span className="font-extrabold text-xl text-gray-800">CarApp</span>
                        </span>
                    </NavLink>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex lg:space-x-8">
                    <NavLink href="/search">Search</NavLink>
                    <NavLink href="/user">Your Posts</NavLink>
                </div>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <NavLink href="/sign-in">Sign In</NavLink>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}
