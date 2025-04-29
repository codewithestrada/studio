"use client";

import type { CartItem } from "@/types/product";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function CartDisplay() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    updateQuantity(item.id, newQuantity);
  };


  if (cartItems.length === 0) {
    return <p className="text-center text-muted-foreground p-4">Your cart is empty.</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={64}
                height={64}
                className="rounded-md object-cover aspect-square"
              />
              <div className="flex-grow">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center space-x-2">
                 <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(item, -1)}
                  disabled={item.quantity <= 1}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                 <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="h-8 w-12 text-center hide-arrows"
                  aria-label={`Quantity of ${item.name}`}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(item, 1)}
                   aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => removeFromCart(item.id)}
                 aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4 space-y-4">
         <div className="flex justify-between items-center font-semibold">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total Price:</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between space-x-2">
          <Button variant="outline" onClick={clearCart} className="flex-1">Clear Cart</Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Checkout</Button>
        </div>
      </div>

      {/* Add CSS to hide number input arrows */}
       <style jsx global>{`
        /* Hide spin buttons on Chrome, Safari, Edge, Opera */
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Hide spin buttons on Firefox */
        .hide-arrows[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
