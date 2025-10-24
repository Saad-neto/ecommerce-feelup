# FeelUp E-commerce WordPress

Site WordPress do FeelUp (feelup.com.br) - E-commerce com WooCommerce e Elementor.

## 🛠️ Stack Tecnológica

- **CMS**: WordPress
- **Tema**: Hello Elementor
- **Page Builder**: Elementor Pro
- **E-commerce**: WooCommerce
- **Hosting**: Hostinger

## 📦 Plugins Principais

- Elementor & Elementor Pro
- WooCommerce
- CartFlows
- Melhor Envio (Cotação de frete)
- FluentForm & FluentForm Pro
- Ajax Search for WooCommerce
- Happy Elementor Addons
- Unlimited Elements
- Google Site Kit
- LiteSpeed Cache
- Imagify (Otimização de imagens)
- AutoCEP
- WooCommerce Extra Checkout Fields for Brazil

## 🚀 Deploy Automático

Este repositório está configurado com GitHub Actions para deploy automático na Hostinger via SSH.

### Como funciona:

1. Faça alterações no código localmente
2. Commit e push para a branch `main`
3. GitHub Actions automaticamente faz deploy na Hostinger

### Estrutura do Repositório

```
.
├── wp-content/
│   ├── themes/
│   │   └── hello-elementor/
│   └── plugins/
│       ├── elementor/
│       ├── elementor-pro/
│       ├── woocommerce/
│       └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## 🔧 Configuração Local

Para trabalhar localmente:

1. Clone o repositório
2. Configure um WordPress local (XAMPP, Local, etc)
3. Copie os arquivos de `wp-content/` para sua instalação local
4. Configure o banco de dados

## 📝 Notas

- O core do WordPress não é versionado (apenas temas e plugins)
- Configurações sensíveis estão no `.gitignore`
- Uploads não são versionados
