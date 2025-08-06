import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Package, 
  TrendingUp, 
  Eye, 
  MessageCircle, 
  ShoppingCart,
  Settings,
  Download,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Mock data para demonstração
  const stats = {
    totalLeads: 145,
    monthlyViews: 2840,
    productsViewed: 1230,
    whatsappClicks: 89
  };

  const recentLeads = [
    { id: 1, name: "Maria Silva", phone: "(11) 99999-9999", email: "maria@email.com", instagram: "@maria_silva", date: "2024-01-15", time: "14:30" },
    { id: 2, name: "João Santos", phone: "(11) 88888-8888", email: "joao@email.com", instagram: "", date: "2024-01-15", time: "13:15" },
    { id: 3, name: "Ana Costa", phone: "(11) 77777-7777", email: "ana@email.com", instagram: "@ana_costa", date: "2024-01-14", time: "16:45" }
  ];

  const popularProducts = [
    { id: 1, name: "Body Manga Longa Unicórnio", brand: "Baby Dreams", views: 234, whatsappClicks: 12, sales: 8 },
    { id: 2, name: "Macacão Dino Adventure", brand: "Little Explorer", views: 189, whatsappClicks: 9, sales: 5 },
    { id: 3, name: "Vestido Estampado Flores", brand: "Sweet Baby", views: 156, whatsappClicks: 7, sales: 3 }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login - em produção seria validado pelo backend
    if (loginData.username === "admin" && loginData.password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Credenciais inválidas");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              Área Administrativa - Baby On Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Demo: usuário "admin", senha "admin123"
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Dashboard Admin</h1>
            <p className="text-muted-foreground">Baby On Board - Área Administrativa</p>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Leads</p>
                  <p className="text-2xl font-bold">{stats.totalLeads}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Visualizações</p>
                  <p className="text-2xl font-bold">{stats.monthlyViews}</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Produtos Vistos</p>
                  <p className="text-2xl font-bold">{stats.productsViewed}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliques WhatsApp</p>
                  <p className="text-2xl font-bold">{stats.whatsappClicks}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Leads Captados</CardTitle>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Instagram</TableHead>
                      <TableHead>Data/Hora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>
                          {lead.instagram ? (
                            <Badge variant="secondary">{lead.instagram}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{lead.date}</div>
                            <div className="text-muted-foreground">{lead.time}</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="space-y-6">
              {/* Produtos Populares */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Produtos Mais Visualizados</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Produto
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Marca</TableHead>
                        <TableHead>Visualizações</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Vendas</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {popularProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>{product.views}</TableCell>
                          <TableCell>{product.whatsappClicks}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sistema de Pedidos</h3>
                  <p className="text-muted-foreground">
                    Esta funcionalidade será implementada com integração ao banco de dados
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Promoções</h3>
                    <Button>Criar Nova Promoção</Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Webhooks</h3>
                    <Button>Configurar Integrações</Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notificações</h3>
                    <Button>Configurar Alertas</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;