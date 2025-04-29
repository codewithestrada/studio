
"use client";

import Link from "next/link";
import { ShoppingCart, Store, User } from "lucide-react"; // Import User icon
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CartDisplay } from "@/components/cart/CartDisplay";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="SimpliShop Home">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">SimpliShop</span>
        </Link>
        <nav className="flex items-center gap-2"> {/* Reduced gap slightly */}
          {/* Login/User Icon */}
          <Link href="/login" passHref>
            <Button variant="ghost" size="icon" aria-label="Login or view profile">
              <User className="h-5 w-5" />
            </Button>
          </Link>

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
