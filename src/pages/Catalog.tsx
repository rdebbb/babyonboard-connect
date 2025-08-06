import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";

// Mock data - produtos de exemplo
const mockProducts = [
  {
    id: "1",
    name: "Body Manga Longa Unicórnio",
    brand: "Baby Dreams",
    price: 45.90,
    images: ["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400", "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400"],
    colors: ["#FFB6C1", "#E6E6FA", "#F0F8FF"],
    sizes: ["RN", "P", "M", "G"],
    gender: "feminino" as const,
    inStock: true,
    isPromo: true,
    promoPrice: 36.90
  },
  {
    id: "2", 
    name: "Macacão Dino Adventure",
    brand: "Little Explorer",
    price: 65.00,
    images: ["https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400"],
    colors: ["#90EE90", "#87CEEB", "#DDA0DD"],
    sizes: ["P", "M", "G", "GG"],
    gender: "masculino" as const,
    inStock: true
  },
  {
    id: "3",
    name: "Vestido Estampado Flores",
    brand: "Sweet Baby",
    price: 85.00,
    images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400", "https://images.unsplash.com/photo-1576653589173-3c0916353c2f?w=400"],
    colors: ["#FFE4E1", "#FFFACD", "#F0FFFF"],
    sizes: ["6M", "9M", "12M", "18M"],
    gender: "feminino" as const,
    inStock: true
  },
  {
    id: "4",
    name: "Conjunto Moletom Ursinho",
    brand: "Cozy Kids",
    price: 95.00,
    images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400", "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400"],
    colors: ["#F5DEB3", "#FFE4B5", "#FAEBD7"],
    sizes: ["1", "2", "3", "4"],
    gender: "unissex" as const,
    inStock: false
  },
  {
    id: "5",
    name: "Pijama Espacial Astronauta",
    brand: "Dream Space",
    price: 55.00,
    images: ["https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400"],
    colors: ["#191970", "#4169E1", "#6495ED"],
    sizes: ["2", "3", "4", "5"],
    gender: "masculino" as const,
    inStock: true,
    isPromo: true,
    promoPrice: 42.90
  },
  {
    id: "6",
    name: "Salopete Jeans Princess",
    brand: "Mini Fashion",
    price: 120.00,
    images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400", "https://images.unsplash.com/photo-1576653589173-3c0916353c2f?w=400"],
    colors: ["#4682B4", "#5F9EA0", "#708090"],
    sizes: ["1", "2", "3", "4", "5"],
    gender: "feminino" as const,
    inStock: true
  }
];

const brands = ["Todas", ...Array.from(new Set(mockProducts.map(p => p.brand)))];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("todos");
  const [selectedBrand, setSelectedBrand] = useState<string>("Todas");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = selectedGender === "todos" || product.gender === selectedGender;
      const matchesBrand = selectedBrand === "Todas" || product.brand === selectedBrand;
      
      return matchesSearch && matchesGender && matchesBrand;
    });
  }, [searchTerm, selectedGender, selectedBrand]);

  const handleAddToCart = (product: any, size: string, color: string) => {
    console.log("Adicionado ao carrinho:", { product, size, color });
  };

  const handleWhatsApp = (product: any) => {
    console.log("Direcionado para WhatsApp:", product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header do Catálogo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Nosso Catálogo</h1>
          <p className="text-muted-foreground">
            Encontre as roupinhas mais fofas para seu bebê
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filtro de Gênero */}
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="unissex">Unissex</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Filtro de Marca */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Botão de Filtros Mobile */}
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} produtos encontrados
          </p>
          
          {/* Badges de filtros ativos */}
          <div className="flex gap-2">
            {selectedGender !== "todos" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedGender("todos")}>
                {selectedGender} ×
              </Badge>
            )}
            {selectedBrand !== "Todas" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedBrand("Todas")}>
                {selectedBrand} ×
              </Badge>
            )}
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onWhatsApp={handleWhatsApp}
            />
          ))}
        </div>

        {/* Estado vazio */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedGender("todos");
              setSelectedBrand("Todas");
            }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;