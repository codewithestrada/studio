
"use client";

import Link from "next/link";
import { ShoppingCart, Store, User, LogOut, LogIn } from "lucide-react"; // Import LogIn/LogOut icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CartDisplay } from "@/components/cart/CartDisplay";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // Import useAuth hook
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth(); // Get auth state and functions

  const getInitials = (name?: string) => {
    if (!name) return 'U'; // Default to 'U' if no name
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
   }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="SimpliShop Home">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">SimpliShop</span>
        </Link>
        <nav className="flex items-center gap-4"> {/* Increased gap slightly */}

          {/* Auth Section */}
          {isAuthenticated && user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {/* Add AvatarImage if user has a profile picture URL */}
                      {/* <AvatarImage src={user.profileImageUrl} alt={user.name || user.email} /> */}
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Add links to profile, settings etc. here */}
                {/* <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost" size="sm" aria-label="Login">
                 <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          )}

          {/* Shopping Cart Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label={`View Cart, ${totalItems} items`}>
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <CartDisplay />
            </SheetContent>
          </Sheet>
          {/* Add other navigation links here if needed */}
        </nav>
      </div>
    </header>
  );
}
