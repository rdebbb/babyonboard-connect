import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  instagram?: string;
}

const ContactModal = ({ isOpen, onClose, onSubmit }: ContactModalProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    instagram: "",
  });
  const [instagramProfile, setInstagramProfile] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInstagramChange = async (value: string) => {
    setFormData({ ...formData, instagram: value });
    
    // Simular busca de perfil do Instagram (seria uma API real)
    if (value.length > 3) {
      setTimeout(() => {
        setInstagramProfile(`https://via.placeholder.com/40x40?text=${value.charAt(0).toUpperCase()}`);
      }, 500);
    } else {
      setInstagramProfile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, telefone e e-mail.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    onClose();
    
    // Simular redirecionamento para WhatsApp
    const whatsappMessage = `Olá! Sou ${formData.name}, gostaria de conhecer os produtos da Baby On Board. Meu e-mail: ${formData.email}, telefone: ${formData.phone}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Fale conosco no WhatsApp</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram (opcional)</Label>
            <div className="relative">
              <Input
                id="instagram"
                placeholder="@seuinstagram"
                value={formData.instagram}
                onChange={(e) => handleInstagramChange(e.target.value)}
              />
              {instagramProfile && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <img 
                    src={instagramProfile} 
                    alt="Profile" 
                    className="w-6 h-6 rounded-full"
                  />
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Apenas navegar
            </Button>
            <Button type="submit" className="flex-1">
              Chamar no WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;