import { Heart, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-primary">Baby On Board</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Início
          </a>
          <a href="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
            Catálogo
          </a>
          <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </a>
          <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-bold text-primary-foreground flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;