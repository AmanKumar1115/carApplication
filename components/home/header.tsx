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
            className="transition-colors duration-200 text-gray-600 hover:text-blue-500"
        >
            {children}
        </Link>
    );
};

export default function Header() {
    return (
        <nav className="container flex flex-row items-center justify-between px-8 py-4 mx-auto">
            <div className="flex lg:flex-1">
                <NavLink href="/">
                    <span className="flex items-center gap-2 shrink-0">
                        <Image
                            src="/icon.ico"
                            alt="CarApp logo"
                            width={32}
                            height={32}
                            className="hover:rotate-12 transform transition duration-200 ease-in-out"
                        />
                        <span className="font-extrabold text-lg">CarApp</span>
                    </span>
                </NavLink>
            </div>

            <div className="flex lg:justify-center gap-2 lg:gap-12 lg:items-center">
                <NavLink href="/search">Search</NavLink>
            </div>

            <div className="flex lg:justify-end lg:flex-1">
                <SignedIn>
                    <div className="flex gap-2 items-center">
                        <UserButton />
                    </div>
                </SignedIn>

                <SignedOut>
                    <SignInButton>
                        <NavLink href="/sign-in">Sign In</NavLink>
                    </SignInButton>
                </SignedOut>
            </div>
        </nav>
    );
}
