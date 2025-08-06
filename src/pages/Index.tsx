import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Baby, Star, ShoppingCart, MessageCircle, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import ContactModal from "@/components/ContactModal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { toast } = useToast();

  const featuredProducts = [
    {
      id: "1",
      name: "Body Manga Longa Unicórnio",
      brand: "Baby Dreams",
      price: 45.90,
      promoPrice: 36.90,
      image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop",
      isPromo: true
    },
    {
      id: "2",
      name: "Macacão Dino Adventure",
      brand: "Little Explorer", 
      price: 65.00,
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&h=400&fit=crop",
      isPromo: false
    },
    {
      id: "3",
      name: "Vestido Estampado Flores",
      brand: "Sweet Baby",
      price: 85.00,
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop",
      isPromo: false
    }
  ];

  const handleContactSubmit = (data: any) => {
    toast({
      title: "Dados salvos!",
      description: "Redirecionando para o WhatsApp...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Roupinhas especiais para seu bebê
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Baby On Board
              <Heart className="inline-block ml-2 text-primary" fill="currentColor" />
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Encontre as roupinhas mais fofas e confortáveis para seu pequeno tesouro. 
              Qualidade, carinho e estilo em cada peça.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-3"
                onClick={() => setShowContactModal(true)}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Falar no WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-3"
                onClick={() => window.location.href = '/catalog'}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ver Catálogo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Feito com Amor</h3>
              <p className="text-muted-foreground">
                Cada peça é selecionada com carinho pensando no conforto do seu bebê
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Premium</h3>
              <p className="text-muted-foreground">
                Materiais seguros e de alta qualidade para a pele sensível dos bebês
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Estilo Único</h3>
              <p className="text-muted-foreground">
                Designs exclusivos que deixam seu pequeno ainda mais especial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confira algumas das nossas peças mais queridas pelos papais e mamães
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isPromo && (
                    <Badge className="absolute top-2 left-2 bg-destructive">
                      PROMOÇÃO
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
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
                  <Button 
                    className="w-full"
                    onClick={() => setShowContactModal(true)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chamar no WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/catalog'}
            >
              Ver Todos os Produtos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pronto para encontrar a roupinha perfeita?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e vamos ajudar você a escolher as melhores peças 
            para seu bebê. Atendimento personalizado e carinhoso.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => setShowContactModal(true)}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Conversar no WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="text-lg font-semibold">Baby On Board</span>
          </div>
          <p className="text-muted-foreground mb-2">
            Roupas especiais para momentos únicos
          </p>
          <p className="text-sm text-muted-foreground">
            Siga-nos no Instagram: @babyonboardgv
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={handleContactSubmit}
      />
    </div>
  );
};

export default Index;
