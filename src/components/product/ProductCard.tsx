
"use client";

import type { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Check } from "lucide-react"; // Import Check icon
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // Track if item was added recently
  const buttonRef = useRef<HTMLButtonElement>(null);
  const flyingItemRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<SVGSVGElement>(null); // Ref for the header cart icon (optional but good for accuracy)


  const handleAddToCart = () => {
    if (isAnimating || isAdded) return; // Prevent re-triggering during animation/added state

    setIsAnimating(true);
    setIsAdded(true); // Mark as added

    // Get button position
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    // Try to get header cart icon position - fallback if needed
    const cartIconElement = document.querySelector('[aria-label*="View Cart"] svg'); // More robust selector
    const cartIconRect = cartIconElement?.getBoundingClientRect();

    if (buttonRect && flyingItemRef.current) {
        // Set initial position of the flying item
        flyingItemRef.current.style.left = `${buttonRect.left + buttonRect.width / 2 - 10}px`; // Center horizontally (adjust size)
        flyingItemRef.current.style.top = `${buttonRect.top + buttonRect.height / 2 - 10}px`; // Center vertically (adjust size)
        flyingItemRef.current.style.opacity = '1';
        flyingItemRef.current.style.transform = 'scale(1)';


        // Animate to cart icon position (or a fallback position)
        const targetX = cartIconRect ? cartIconRect.left + cartIconRect.width / 2 - 10 : window.innerWidth - 50; // Fallback: near top right
        const targetY = cartIconRect ? cartIconRect.top + cartIconRect.height / 2 - 10 : 20; // Fallback: near top

        // Use requestAnimationFrame for smoother animation start
        requestAnimationFrame(() => {
            if (flyingItemRef.current) {
                 flyingItemRef.current.style.transform = `translate(${targetX - (buttonRect.left + buttonRect.width / 2 - 10)}px, ${targetY - (buttonRect.top + buttonRect.height / 2 - 10)}px) scale(0.1)`;
                 flyingItemRef.current.style.opacity = '0';
            }
        });
    }


    // Call the actual addToCart function after a short delay (allows animation to start)
    setTimeout(() => {
      addToCart(product);
    }, 100); // Adjust delay as needed

    // Reset animation and added state after animation completes
    setTimeout(() => {
        setIsAnimating(false);
         if (flyingItemRef.current) {
            // Reset styles fully for next animation
             flyingItemRef.current.style.transform = 'scale(0)';
             flyingItemRef.current.style.opacity = '0';
             flyingItemRef.current.style.transition = 'none'; // Temporarily disable transition for reset
             // Force reflow to apply reset before re-enabling transition
             flyingItemRef.current.offsetHeight;
             flyingItemRef.current.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
         }
         // Keep the "Added" state for a bit longer for visual feedback
         setTimeout(() => setIsAdded(false), 1500); // Keep checkmark visible for 1.5s
    }, 600); // Match animation duration (0.5s) + small buffer
  };

   // Find the cart icon element on mount for potential position calculation
   useEffect(() => {
     // This ref is mainly illustrative; direct DOM query in handler is often simpler
     const cartIconElement = document.querySelector('[aria-label*="View Cart"] svg');
     // You could store the element if needed, but getting Rect on click is safer
     // if (cartIconElement) cartIconRef.current = cartIconElement as SVGSVGElement;
   }, []);


  return (
     <>
       {/* The flying item element (initially hidden and small) */}
        <div
          ref={flyingItemRef}
          className="fixed z-[100] h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
          style={{
            opacity: 0,
            transform: 'scale(0)',
            transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
            pointerEvents: 'none', // Ignore pointer events
          }}
          aria-hidden="true" // Hide from accessibility tree
        >
           <ShoppingCart className="h-3 w-3" />
        </div>

        <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-square overflow-hidden">
              <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill // Use fill to make image cover the container
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-1 truncate">{product.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</CardDescription>
          <p className="text-lg font-bold text-primary">{formatCurrency(product.price)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            ref={buttonRef} // Attach ref to the button
            onClick={handleAddToCart}
            className={cn(
              "w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out relative overflow-hidden",
              isAnimating && "scale-95 opacity-75", // Subtle button feedback during animation
              isAdded && !isAnimating && "bg-green-600 hover:bg-green-700" // Green background after adding
            )}
            aria-label={`Add ${product.name} to cart`}
            disabled={isAnimating || isAdded} // Disable button temporarily
          >
            <span className={cn("transition-opacity duration-200", (isAnimating || isAdded) && "opacity-0")}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </span>
             <span className={cn(
               "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
               (isAdded && !isAnimating) ? "opacity-100" : "opacity-0"
             )}>
                <Check className="mr-2 h-4 w-4" /> Added
             </span>
          </Button>
        </CardFooter>
        </Card>
      </>
  );
}
