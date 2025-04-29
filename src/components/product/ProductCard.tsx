"use client";

import type { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
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
          onClick={() => addToCart(product)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
           aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
