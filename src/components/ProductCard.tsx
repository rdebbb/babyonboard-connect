import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
  gender: "masculino" | "feminino" | "unissex";
  inStock: boolean;
  isPromo?: boolean;
  promoPrice?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onWhatsApp: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onWhatsApp }: ProductCardProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no produto: ${product.name} - ${product.brand}. Preço: R$ ${product.isPromo ? product.promoPrice : product.price}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onWhatsApp(product);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Selecione o tamanho e a cor antes de adicionar ao carrinho");
      return;
    }
    onAddToCart(product, selectedSize, selectedColor);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isPromo && (
            <Badge variant="destructive" className="text-xs">
              PROMOÇÃO
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="text-xs">
              ESGOTADO
            </Badge>
          )}
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
          />
        </Button>
        
        {/* Color Options */}
        {product.colors.length > 1 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-primary' : 'border-white'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedImage(index % product.images.length);
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            {product.isPromo && product.promoPrice ? (
              <>
                <span className="text-lg font-bold text-primary">
                  R$ {product.promoPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  R$ {product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Size Selection */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Tamanhos:</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="h-8 min-w-8 px-2 text-xs"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleWhatsApp}
              disabled={!product.inStock}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Carrinho
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;