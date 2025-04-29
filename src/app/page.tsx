
import type { Product } from '@/types/product';
import { ProductGrid } from '@/components/product/ProductGrid';

// Mock product data - replace with actual data fetching (e.g., from MongoDB)
const mockProducts: Product[] = [
  { id: '1', name: 'Stylish T-Shirt', description: 'Comfortable cotton t-shirt available in various colors.', price: 25.99, imageUrl: 'https://picsum.photos/seed/picsum1/400/400' },
  { id: '2', name: 'Classic Jeans', description: 'Durable denim jeans with a perfect fit.', price: 59.99, imageUrl: 'https://picsum.photos/seed/picsum2/400/400' },
  { id: '3', name: 'Running Sneakers', description: 'Lightweight sneakers for your daily run.', price: 89.50, imageUrl: 'https://picsum.photos/seed/picsum3/400/400' },
  { id: '4', name: 'Leather Wallet', description: 'Genuine leather wallet with multiple card slots.', price: 45.00, imageUrl: 'https://picsum.photos/seed/picsum4/400/400' },
  { id: '5', name: 'Sunglasses', description: 'UV protection sunglasses with a modern frame.', price: 35.75, imageUrl: 'https://picsum.photos/seed/picsum5/400/400' },
  { id: '6', name: 'Backpack', description: 'Spacious backpack for work or travel.', price: 75.00, imageUrl: 'https://picsum.photos/seed/picsum6/400/400' },
  { id: '7', name: 'Smart Watch', description: 'Feature-rich smartwatch with fitness tracking.', price: 199.99, imageUrl: 'https://picsum.photos/seed/picsum7/400/400' },
  { id: '8', name: 'Coffee Mug', description: 'Ceramic coffee mug with a unique design.', price: 15.00, imageUrl: 'https://picsum.photos/seed/picsum8/400/400' },
];

// In a real app, fetch data from your MongoDB database here
async function getProducts(): Promise<Product[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockProducts;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
