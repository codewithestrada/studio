
import Link from "next/link";
import { MessageCircle, Send } from "lucide-react"; // Icons for WhatsApp & Telegram placeholders

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About SimpliShop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              SimpliShop offers a curated selection of high-quality products with a seamless shopping experience. We are committed to providing the best for our customers.
            </p>
          </div>

          {/* Quick Links (Optional) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              {/* Add more links as needed */}
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions? Reach out to us!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/yourwhatsappnumber" // Replace with your actual WhatsApp number link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://t.me/yourtelegramusername" // Replace with your actual Telegram link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label="Contact on Telegram"
              >
                <Send className="h-5 w-5" />
                 <span>Telegram</span>
              </a>
            </div>
             {/* Add email or phone if desired */}
             {/* <p className="text-sm text-muted-foreground mt-4">Email: support@simplishop.com</p> */}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} SimpliShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
