
"use client";

import Link from "next/link";
import { ShoppingCart, Store, User, LogOut, LogIn, Menu } from "lucide-react"; // Import Menu icon
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Import SheetClose
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
import { Separator } from "@/components/ui/separator"; // Import Separator

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
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle Menu"> {/* Hide on medium screens and up */}
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-4"> {/* Adjust width as needed */}
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
               <Separator />
               <nav className="flex flex-col space-y-3 mt-4">
                 <SheetClose asChild>
                   <Link href="/" className="text-lg hover:text-primary transition-colors">Home</Link>
                 </SheetClose>
                 <SheetClose asChild>
                  <Link href="/products" className="text-lg hover:text-primary transition-colors">Products</Link>
                 </SheetClose>
                 <SheetClose asChild>
                  <Link href="/contact" className="text-lg hover:text-primary transition-colors">Contact</Link>
                 </SheetClose>
                 {/* Add more future links here */}
                 <Separator />
                  {!isAuthenticated && (
                     <SheetClose asChild>
                       <Link href="/login" className="text-lg hover:text-primary transition-colors flex items-center">
                         <LogIn className="mr-2 h-5 w-5" /> Login
                       </Link>
                     </SheetClose>
                  )}
               </nav>
                {/* Placeholder for future menu items */}
               {/* <div className="mt-auto pt-4">
                <p className="text-center text-muted-foreground text-sm">More options coming soon!</p>
               </div> */}
            </SheetContent>
          </Sheet>

          {/* Brand Logo/Name */}
          <Link href="/" className="flex items-center gap-2" aria-label="SimpliShop Home">
            <Store className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">SimpliShop</span>
          </Link>
        </div>

        {/* Right Side Navigation (Auth & Cart) */}
        <nav className="flex items-center gap-4">

          {/* Auth Section */}
          {isAuthenticated && user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
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
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Link href="/login" passHref className="hidden md:inline-flex"> {/* Hide login button on small screens where hamburger is shown */}
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
        </nav>
      </div>
    </header>
  );
}
