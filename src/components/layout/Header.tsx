
"use client";

import Link from "next/link";
import { ShoppingCart, Store, User, LogOut, LogIn, Menu, Tag, PackageX, Truck, Home, Contact, Package } from "lucide-react"; // Import new icons
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
import { cn } from "@/lib/utils"; // Import cn for conditional classes

export function Header() {
  const { totalItems, isAnimatingCart } = useCart(); // Get isAnimatingCart state
  const { isAuthenticated, user, logout } = useAuth(); // Get auth state and functions

  const getInitials = (name?: string) => {
    if (!name) return 'U'; // Default to 'U' if no name
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
   }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4"> {/* Reduced gap for smaller screens */}
          {/* Hamburger Menu Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              {/* Removed md:hidden to always show the hamburger, adjust trigger if needed */}
              <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                 <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-4"> {/* Adjust width as needed */}
              <SheetHeader className="mb-4 pb-2 border-b">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

               <nav className="flex flex-col space-y-2 mt-4 text-base">
                 <SheetClose asChild>
                   <Link href="/" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                     <Home className="h-5 w-5" /> Home
                    </Link>
                 </SheetClose>
                 <SheetClose asChild>
                  <Link href="/products" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Package className="h-5 w-5" /> All Products
                  </Link>
                 </SheetClose>
                 <SheetClose asChild>
                  <Link href="/contact" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Contact className="h-5 w-5" /> Contact
                    </Link>
                 </SheetClose>

                 <Separator className="my-3" />

                 {/* Special Product Categories */}
                 <h4 className="text-sm font-semibold text-muted-foreground px-2 mb-1">Categories</h4>
                 <SheetClose asChild>
                  <Link href="/products?filter=discounted" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Tag className="h-5 w-5 text-primary" /> Discounted
                  </Link>
                 </SheetClose>
                  <SheetClose asChild>
                  <Link href="/products?filter=out-of-stock" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <PackageX className="h-5 w-5 text-destructive" /> Out of Stock
                  </Link>
                 </SheetClose>
                 <SheetClose asChild>
                  <Link href="/products?filter=upcoming" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Truck className="h-5 w-5 text-blue-500" /> Upcoming
                  </Link>
                 </SheetClose>

                 <Separator className="my-3" />

                  {!isAuthenticated && (
                     <SheetClose asChild>
                       <Link href="/login" className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                         <LogIn className="h-5 w-5" /> Login
                       </Link>
                     </SheetClose>
                  )}
               </nav>
            </SheetContent>
          </Sheet>

          {/* Brand Logo/Name */}
          {/* Wrapped Store icon in a button for Sheet trigger */}
           <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="SimpliShop Home">
              <Store className="h-6 w-6 text-primary transition-transform hover:rotate-[-5deg]" />
              <span className="text-xl font-bold tracking-tight hidden sm:inline">SimpliShop</span> {/* Hide text on extra small screens */}
           </Link>
        </div>

        {/* Right Side Navigation (Auth & Cart) */}
        <nav className="flex items-center gap-2 md:gap-4"> {/* Reduced gap */}

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
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Link href="/login" passHref className="hidden md:inline-flex"> {/* Keep hidden on small screens */}
              <Button variant="ghost" size="sm" aria-label="Login">
                 <LogIn className="mr-1 h-4 w-4" /> Login
              </Button>
            </Link>
          )}

          {/* Shopping Cart Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label={`View Cart, ${totalItems} items`}>
                 <ShoppingCart
                  className={cn(
                    "h-5 w-5 transition-transform duration-500 ease-in-out",
                    isAnimatingCart && "animate-cart-icon" // Apply animation class conditionally
                  )}
                />
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
