export interface Product {
  id: number;
  sku?: string;
  name: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  oldPriceNum?: number;
  rating: number;
  reviews: number;
  category: string;
  subcategory?: string;
  tags: string[];
  image: string;
  badge?: string;
  brand?: string;
  inStock?: boolean;
  description?: string;
  htmlDescription?: string;
  seoSlug?: string;
  productUrl?: string;
  specs?: { label: string; value: string }[];
  features?: string[];
  images?: string[];
}

const rawProducts: Product[] = [
  {
    "id": 1,
    "sku": "29307",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 2 Metros Cobre Puro 18Gbps PHM20-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 87,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Escritório",
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 2 Metros foi desenvolvido para oferecer alta qualidade de imagem e som em conexões digitais. Com suporte a resolução 4K a 60Hz, garante transmissão fluida, cores mais vivas e excelente definição para uma experiência completa em entretenimento e uso profissional.\n\nFabricado em…",
    "features": [
      "Suporte a resolução 4K 60Hz",
      "Alta velocidade de até 18Gbps",
      "Construção em cobre puro para melhor sinal",
      "Compatível com TVs, monitores e consoles",
      "Suporte a HDR e conteúdo 3D",
      "Transmissão de áudio e vídeo de alta qualidade",
      "Conexão estável e sem interferências",
      "Design resistente e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29307"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-0-4k-2m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-0-4k-2m-pcyes-cobre-puro",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 2,
    "sku": "29309",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 5 Metros Cobre Puro 18Gbps PHM20-5",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 124,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 5 Metros foi desenvolvido para garantir máxima qualidade de imagem e som em conexões digitais, mesmo em maiores distâncias. Com suporte a resolução 4K a 60Hz, oferece excelente nitidez, cores vibrantes e transmissão fluida para uma experiência completa.\n\nProduzido em cobre pu…",
    "features": [
      "Suporte a resolução 4K 60Hz",
      "Alta velocidade de até 18Gbps",
      "Construção em cobre puro para melhor sinal",
      "Ideal para instalações com maior distância",
      "Compatível com TVs, monitores e consoles",
      "Suporte a HDR e conteúdo 3D",
      "Transmissão de áudio e vídeo de alta qualidade",
      "Design resistente e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29309"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-0-4k-5m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-0-4k-5m-pcyes-cobre-puro",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 3,
    "sku": "29310",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 10 Metros Cobre Puro 18Gbps PHM20-10",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 161,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 10 Metros foi desenvolvido para oferecer alta qualidade de imagem e som em conexões digitais de longa distância. Com suporte a resolução 4K a 60Hz, garante transmissão fluida, cores vibrantes e excelente definição, ideal para setups profissionais e ambientes amplos.\n\nProduzid…",
    "features": [
      "Suporte a resolução 4K 60Hz",
      "Alta velocidade de até 18Gbps",
      "Ideal para longas distâncias (10 metros)",
      "Construção em cobre puro para melhor sinal",
      "Compatível com TVs, monitores e consoles",
      "Suporte a HDR e conteúdo 3D",
      "Transmissão de áudio e vídeo de alta qualidade",
      "Design robusto e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29310"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-0-4k-10m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-0-4k-10m-pcyes-cobre-puro",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 4,
    "sku": "29312",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 15 Metros Cobre Puro 18Gbps PHM20-15",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 198,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 15 Metros é a solução ideal para quem precisa de alta qualidade de imagem e som em instalações de longa distância. Com suporte a resolução 4K a 60Hz, entrega excelente definição, cores mais vivas e transmissão fluida para diferentes aplicações.\n\nProduzido com cobre puro, gara…",
    "features": [
      "Resolução 4K 60Hz com alta definição",
      "Velocidade de até 18Gbps",
      "Ideal para longas distâncias (15 metros)",
      "Construção em cobre puro",
      "Compatível com TVs, monitores e consoles",
      "Suporte a HDR, 3D e Ethernet",
      "Áudio multicanal de alta qualidade",
      "Alta durabilidade e resistência"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29312"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-0-4k-15m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-0-4k-15m-pcyes-cobre-puro",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 5,
    "sku": "29313",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 20 Metros Cobre Puro 18Gbps PHM20-20",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 235,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 20 Metros foi desenvolvido para entregar alta qualidade de imagem e som em instalações de longa distância, mantendo estabilidade e desempenho mesmo em aplicações mais exigentes. Com suporte a resolução 4K a 60Hz, proporciona imagens nítidas, cores vivas e transmissão fluida.\n…",
    "features": [
      "Resolução 4K 60Hz com alta definição",
      "Velocidade de até 18Gbps",
      "Ideal para longas distâncias (20 metros)",
      "Construção em cobre puro",
      "Compatível com TVs, monitores e consoles",
      "Suporte a HDR, 3D e Ethernet",
      "Áudio multicanal de alta qualidade",
      "Alta durabilidade e resistência"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29313"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-0-4k-20m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-0-4k-20m-pcyes-cobre-puro",
    "inStock": true,
    "badge": "4K",
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 6,
    "sku": "29327",
    "name": "Cabo PCYES DisplayPort 1.2 4K 60Hz 2 Metros Cobre Puro 18Gbps PDPM-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 272,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo DisplayPort 1.2 PCYES 2 Metros foi desenvolvido para oferecer alta qualidade de imagem e desempenho em conexões digitais. Com suporte a resolução 4K a 60Hz, garante imagens nítidas, cores vibrantes e excelente fluidez, sendo ideal para setups profissionais e gamers.\n\nProduzido com cobre pur…",
    "features": [
      "Resolução 4K 60Hz com alta definição",
      "Largura de banda de até 18Gbps",
      "Construção em cobre puro para melhor sinal",
      "Compatível com monitores e placas de vídeo",
      "Suporte a HDR e conteúdo 3D",
      "Conexão estável e sem interferências",
      "Ideal para setups profissionais e gamers",
      "Design resistente e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29327"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-displayport-1-2-4k-2m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-displayport-1-2-4k-2m-pcyes",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 7,
    "sku": "29276",
    "name": "Cabo PCYES USB 2.0 A para A 2 Metros Cobre Puro 480Mbps PUAM2-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 309,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB 2.0 PCYES A para A 2 Metros é ideal para conexões de dados entre dispositivos compatíveis com portas USB tipo A. Desenvolvido com cobre puro, oferece melhor condução de sinal, garantindo estabilidade e eficiência na transmissão.\n\nCom velocidade de até 480Mbps, é indicado para transferên…",
    "features": [
      "Conexão USB 2.0 A para A",
      "Velocidade de até 480Mbps",
      "Construção em cobre puro",
      "Comprimento de 2 metros",
      "Conexão estável e eficiente",
      "Ideal para transferência de dados",
      "Alta durabilidade e resistência",
      "Design funcional e robusto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29276"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-2-0-a-para-a-2m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-2-0-a-para-a-2m-pcyes",
    "inStock": true
  },
  {
    "id": 8,
    "sku": "29303",
    "name": "Cabo PCYES Extensor USB 3.0 A Macho para A Fêmea 1 Metro 5Gbps PUAMF3-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 346,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo Extensor USB 3.0 PCYES 1 Metro é a solução ideal para ampliar o alcance de conexões USB com alta velocidade e estabilidade. Compatível com diversos periféricos como mouse, teclado, impressoras e headsets, permite maior flexibilidade na organização do setup.\n\nCom taxa de transferência de até…",
    "features": [
      "Extensão USB 3.0 de alta velocidade",
      "Transferência de até 5Gbps",
      "Conexão A macho para A fêmea",
      "Ideal para periféricos USB",
      "Construção em cobre puro",
      "Maior alcance e praticidade",
      "Conexão estável e confiável",
      "Design resistente e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29303"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-extensor-usb-3-0-1m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-extensor-usb-3-0-1m-pcyes",
    "inStock": true
  },
  {
    "id": 9,
    "sku": "29304",
    "name": "Cabo PCYES Extensor USB 3.0 A Macho para A Fêmea 2 Metros PUAMF3-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 383,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo Extensor USB 3.0 PCYES 2 Metros é a solução ideal para ampliar o alcance de conexões USB com praticidade e eficiência. Compatível com diversos periféricos como mouse, teclado, impressoras e headsets, permite maior flexibilidade na organização do seu setup.\n\nCom construção robusta e materiai…",
    "features": [
      "Extensor USB para maior alcance",
      "Conexão A macho para A fêmea",
      "Comprimento de 2 metros",
      "Compatível com diversos periféricos",
      "Transmissão estável de dados",
      "Ideal para organização do setup",
      "Construção resistente",
      "Uso prático no dia a dia"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29304"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-extensor-usb-3-0-2m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-extensor-usb-3-0-2m-pcyes",
    "inStock": true
  },
  {
    "id": 10,
    "sku": "29289",
    "name": "Cabo PCYES USB 2.0 A para B 2 Metros para Impressora PUABM2-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 420,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB 2.0 PCYES A para B 2 Metros é ideal para conexão entre computadores e dispositivos como impressoras, scanners e equipamentos com entrada USB tipo B. Desenvolvido com materiais de qualidade, garante transmissão estável e eficiente de dados.\n\nCom 2 metros de comprimento, oferece praticida…",
    "features": [
      "Conexão USB A para USB B",
      "Ideal para impressoras e scanners",
      "Comprimento de 2 metros",
      "Transmissão estável de dados",
      "Construção com cobre de qualidade",
      "Compatível com diversos dispositivos",
      "Uso doméstico e profissional",
      "Design resistente e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29289"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-b-2m-impressora-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-b-2m-impressora-pcyes",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 11,
    "sku": "29290",
    "name": "Cabo PCYES USB 2.0 A para B 3 Metros para Impressora PUABM2-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 457,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB 2.0 PCYES A para B 3 Metros é ideal para conectar computadores a impressoras, copiadoras e outros dispositivos compatíveis com porta USB tipo B. Desenvolvido para oferecer praticidade e desempenho, garante transmissão estável de dados no uso diário.\n\nCom 3 metros de comprimento, proporc…",
    "features": [
      "Conexão USB A para USB B",
      "Ideal para impressoras e copiadoras",
      "Comprimento de 3 metros",
      "Transmissão estável de dados",
      "Construção em cobre de qualidade",
      "Maior alcance e flexibilidade",
      "Compatível com diversos dispositivos",
      "Design resistente e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29290"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-b-3m-impressora-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-b-3m-impressora-pcyes",
    "inStock": true,
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 12,
    "sku": "32619",
    "name": "Cabo PCYES Micro USB para USB A 2.0 2 Metros 480Mbps PMUAP-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 64,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo Micro USB PCYES para USB A 2.0 2 Metros é ideal para conectar e carregar dispositivos compatíveis com entrada Micro USB, como smartphones, tablets, acessórios e outros eletrônicos. Desenvolvido com materiais de qualidade, oferece conexão estável e eficiente no uso diário.\n\nCom velocidade de…",
    "features": [
      "Conexão Micro USB para USB A",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 2 metros",
      "Construção com cobre puro",
      "Revestimento em PVC resistente",
      "Ideal para smartphones e acessórios",
      "Conexão estável e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32619"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-micro-usb-para-usb-a-2m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-micro-usb-para-usb-a-2m-pcyes",
    "inStock": true
  },
  {
    "id": 13,
    "sku": "32620",
    "name": "Cabo PCYES Micro USB para USB A 2.0 3 Metros 480Mbps PMUAP-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 101,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo Micro USB PCYES para USB A 2.0 3 Metros é ideal para quem precisa de mais alcance sem abrir mão de desempenho e confiabilidade. Compatível com diversos dispositivos com entrada Micro USB, como smartphones, tablets e acessórios, oferece praticidade no uso diário.\n\nCom velocidade de transferê…",
    "features": [
      "Conexão Micro USB para USB A",
      "Velocidade de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 3 metros",
      "Construção com cobre puro",
      "Revestimento em PVC resistente",
      "Ideal para smartphones e acessórios",
      "Mais alcance e praticidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32620"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-micro-usb-para-usb-a-3m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-micro-usb-para-usb-a-3m-pcyes",
    "inStock": true
  },
  {
    "id": 14,
    "sku": "284680",
    "name": "Cabo PCYES Micro USB para USB A 2.0 2 Metros Laranja Nylon 3A PMUAM-2L",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 138,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo Micro USB PCYES 2 Metros Laranja foi desenvolvido para oferecer mais resistência, desempenho e estilo no uso diário. Compatível com dispositivos com entrada Micro USB, como smartphones, tablets e acessórios, é ideal para quem busca praticidade com maior durabilidade.\n\nCom revestimento em ny…",
    "features": [
      "Conexão Micro USB para USB A",
      "Revestimento em nylon trançado",
      "Alta resistência e durabilidade",
      "Velocidade de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 2 metros",
      "Design moderno na cor laranja",
      "Ideal para uso intenso"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284680"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-micro-usb-2m-laranja-nylon-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-micro-usb-2m-laranja-nylon-pcyes",
    "inStock": true
  },
  {
    "id": 15,
    "sku": "32598",
    "name": "Cabo PCYES USB A para USB Tipo-C 1 Metro 3A 480Mbps PUACP-01",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 175,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB A para USB Tipo-C PCYES 1 Metro é ideal para conectar e carregar dispositivos compatíveis com entrada USB-C, como smartphones, tablets e acessórios modernos. Desenvolvido para oferecer praticidade e desempenho, garante conexão eficiente no uso diário.\n\nCom taxa de transferência de até 4…",
    "features": [
      "Conexão USB A para USB-C",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 1 metro",
      "Construção com cobre puro",
      "Conexão estável e eficiente",
      "Compatível com diversos dispositivos",
      "Design resistente e durável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32598"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-1m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-1m-pcyes",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 16,
    "sku": "286509",
    "name": "Cabo PCYES USB A para USB Tipo-C 1 Metro PVC 3A 480Mbps PUACP-10",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 212,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB A para USB Tipo-C PCYES 1 Metro é uma solução prática e eficiente para conectar e carregar dispositivos modernos com entrada USB-C. Ideal para smartphones, tablets e acessórios, oferece desempenho confiável no uso diário.\n\nCom taxa de transferência de até 480Mbps, garante sincronização …",
    "features": [
      "Conexão USB A para USB Tipo-C",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Revestimento em PVC resistente",
      "Comprimento de 1 metro",
      "Construção com cobre puro",
      "Uso versátil para diversos dispositivos",
      "Conexão estável e eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286509"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-1m-pvc-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-1m-pvc-pcyes",
    "inStock": true
  },
  {
    "id": 17,
    "sku": "284632",
    "name": "Cabo PCYES USB A para USB Tipo-C 1 Metro Nylon 3A 480Mbps PUACN-01",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 249,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB A para USB Tipo-C PCYES 1 Metro Nylon foi desenvolvido para oferecer mais resistência e desempenho no uso diário. Ideal para smartphones, tablets e dispositivos com entrada USB-C, garante conexão prática e eficiente.\n\nCom taxa de transferência de até 480Mbps, proporciona sincronização e…",
    "features": [
      "Conexão USB A para USB-C",
      "Revestimento em nylon trançado",
      "Alta resistência e durabilidade",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 1 metro",
      "Construção com cobre puro",
      "Uso versátil para diversos dispositivos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284632"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-1m-nylon-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-1m-nylon-pcyes",
    "inStock": true
  },
  {
    "id": 18,
    "sku": "32599",
    "name": "Cabo PCYES USB A para USB Tipo-C 2 Metros PVC 3A 480Mbps PUACP-02",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 286,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB A para USB Tipo-C PCYES 2 Metros é ideal para quem busca mais alcance e praticidade no dia a dia. Compatível com dispositivos USB-C, como smartphones, tablets e acessórios, oferece conexão eficiente para carregamento e transferência de dados.\n\nCom velocidade de até 480Mbps, garante sinc…",
    "features": [
      "Conexão USB A para USB-C",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 2 metros",
      "Revestimento em PVC resistente",
      "Construção com cobre puro",
      "Conexão estável e eficiente",
      "Ideal para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32599"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-2m-pvc-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-2m-pvc-pcyes",
    "inStock": true
  },
  {
    "id": 19,
    "sku": "282216",
    "name": "Cabo PCYES USB A para USB Tipo-C 2 Metros Laranja Nylon 3A 480Mbps CBPY02L",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 323,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB A para USB Tipo-C PCYES 2 Metros Laranja foi desenvolvido para oferecer maior resistência, desempenho e praticidade no dia a dia. Ideal para dispositivos com entrada USB-C, como smartphones, tablets e acessórios, garante conexão eficiente e estável.\n\nCom taxa de transferência de até 480…",
    "features": [
      "Conexão USB A para USB Tipo-C",
      "Revestimento em nylon trançado",
      "Alta resistência e durabilidade",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 2 metros",
      "Design moderno na cor laranja",
      "Construção com cobre puro"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282216"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-2m-laranja-nylon-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-2m-laranja-nylon-pcyes",
    "inStock": true
  },
  {
    "id": 20,
    "sku": "32601",
    "name": "Cabo PCYES USB A para USB Tipo-C 1 Metro Branco PVC 3A 480Mbps PUACB-01",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 360,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB A para USB Tipo-C PCYES 1 Metro Branco é a solução ideal para quem busca praticidade, desempenho e um visual clean no setup. Compatível com dispositivos USB-C, como smartphones, tablets e acessórios, garante conexão eficiente no uso diário.\n\nCom taxa de transferência de até 480Mbps, per…",
    "features": [
      "Conexão USB A para USB Tipo-C",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Revestimento em PVC resistente",
      "Comprimento de 1 metro",
      "Construção com cobre puro",
      "Design clean na cor branca",
      "Conexão estável e eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32601"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-1m-branco-pvc-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-1m-branco-pvc-pcyes",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 21,
    "sku": "32602",
    "name": "Cabo PCYES USB A para USB Tipo-C 2 Metros Branco 3A 480Mbps PUACB-02",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 397,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB A para USB Tipo-C PCYES 2 Metros Branco é a escolha ideal para quem precisa de mais alcance e praticidade no dia a dia. Compatível com dispositivos com entrada USB-C, como smartphones, tablets e acessórios, garante conexão eficiente e estável.\n\nCom velocidade de até 480Mbps, permite sin…",
    "features": [
      "Conexão USB A para USB Tipo-C",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 2 metros",
      "Construção com cobre puro",
      "Design clean na cor branca",
      "Conexão estável e eficiente",
      "Ideal para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32602"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-2m-branco-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-2m-branco-pcyes",
    "inStock": true
  },
  {
    "id": 22,
    "sku": "32611",
    "name": "Cabo PCYES USB Tipo-C para Micro USB B 2.0 1 Metro 3A 480Mbps PUCMP-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 434,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB Tipo-C para Micro USB B 2.0 PCYES 1 Metro é a solução ideal para conectar dispositivos com diferentes padrões de conexão, oferecendo praticidade e compatibilidade no dia a dia. Perfeito para conectar aparelhos com entrada Micro USB a portas USB-C, como carregadores modernos e notebooks.\n…",
    "features": [
      "Conexão USB Tipo-C para Micro USB",
      "Transferência de até 480Mbps",
      "Suporte para carregamento até 3A",
      "Comprimento de 1 metro",
      "Revestimento em PVC resistente",
      "Construção com cobre puro",
      "Compatível com diversos dispositivos",
      "Conexão estável e eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32611"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-micro-usb-1m-pcyes",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-micro-usb-1m-pcyes",
    "inStock": true,
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 23,
    "sku": "32616",
    "name": "Cabo PCYES USB Tipo-C para Mini USB B 2.0 1 Metro 480Mbps 3A PVC Preto PUCMBP-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 471,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo USB Tipo-C para Mini USB B 2.0 PCYES foi desenvolvido para entregar conexão estável, rápida e segura em dispositivos compatíveis. Com 1 metro de comprimento, oferece praticidade no uso diário, sendo ideal para periféricos, câmeras e equipamentos eletrônicos com entrada Mini USB B.\n\nCom taxa…",
    "features": [
      "Conexão estável e segura para diversos dispositivos",
      "Transferência de dados de até 480Mbps",
      "Suporte de corrente até 3A para melhor eficiência",
      "Construção em cobre puro para maior desempenho",
      "Revestimento em PVC resistente e durável",
      "Ideal para uso profissional e doméstico"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32616"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-mini-usb-b-2-0-1m-480mbps-3a-pucmbp-1",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-mini-usb-b-2-0-1m-480mbps-3a-pucmbp-1",
    "inStock": true
  },
  {
    "id": 24,
    "sku": "32624",
    "name": "Cabo Adaptador OTG USB Tipo-C para USB A 3.0 15cm 5Gbps PCYES Preto P3AMUP-15",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 78,
    "category": "Periféricos",
    "subcategory": "Adaptador",
    "tags": [
      "Periféricos",
      "Adaptador"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo Adaptador OTG USB Tipo-C para USB A 3.0 PCYES foi desenvolvido para oferecer praticidade e alta performance na conexão de dispositivos. Com 15cm de comprimento, é ideal para uso portátil, permitindo conectar periféricos como pen drives, teclados, mouses e outros dispositivos USB diretamente e…",
    "features": [
      "Permite conexão OTG com diversos dispositivos USB",
      "Alta velocidade de transferência de até 5Gbps",
      "Compatível com smartphones, tablets e notebooks USB-C",
      "Suporte de corrente até 3A para maior eficiência",
      "Construção em cobre puro para melhor desempenho",
      "Design compacto e ideal para uso portátil"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32624"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador"
      }
    ],
    "seoSlug": "cabo-adaptador-otg-usb-c-para-usb-a-3-0-15cm-5gbps-p3amup-15",
    "productUrl": "https://www.pcyes.com.br/cabo-adaptador-otg-usb-c-para-usb-a-3-0-15cm-5gbps-p3amup-15",
    "inStock": true
  },
  {
    "id": 25,
    "sku": "29329",
    "name": "Cabo PCYES DisplayPort 1.2 para DVI-D 2 Metros 4K 10bits Preto PDVI-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 115,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo DisplayPort para DVI-D PCYES foi desenvolvido para oferecer conexão estável e de alta qualidade entre dispositivos compatíveis. Com 2 metros de comprimento, é ideal para conectar monitores, placas de vídeo, notebooks e computadores que utilizam essas interfaces.\n\nCom suporte à resolução 4K …",
    "features": [
      "Alta qualidade de imagem com suporte a 4K",
      "Maior fidelidade de cores com 10 bits",
      "Conexão estável e confiável",
      "Construção em cobre puro para melhor desempenho",
      "Ideal para monitores, PCs e placas de vídeo",
      "Comprimento de 2 metros para maior praticidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29329"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-displayport-para-dvi-d-2m-4k-10bits-pdvi-2",
    "productUrl": "https://www.pcyes.com.br/cabo-displayport-para-dvi-d-2m-4k-10bits-pdvi-2",
    "inStock": true,
    "badge": "4K",
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 26,
    "sku": "29323",
    "name": "Cabo PCYES VGA 3+6 15 Pinos 30 Metros 1280x1024 Macho PVM36-30",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 152,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Escritório",
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "/home/category-peripherals.png",
    "images": [
      "/home/category-peripherals.png"
    ],
    "description": "O Cabo VGA 3+6 15 Pinos PCYES foi desenvolvido para garantir conexão estável e eficiente entre dispositivos com interface VGA. Com 30 metros de comprimento, é ideal para instalações que exigem maior alcance, como ambientes corporativos, educacionais e setups profissionais.\n\nCompatível com monitore…",
    "features": [
      "Ideal para longas distâncias com 30 metros de comprimento",
      "Compatível com diversos dispositivos com conexão VGA",
      "Construção em cobre puro para melhor condução de sinal",
      "Imagem estável com resolução até 1280x1024p",
      "Alta durabilidade para uso contínuo",
      "Solução prática para ambientes profissionais"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29323"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-vga-3-6-15-pinos-30m-1280x1024-pvm36-30",
    "productUrl": "https://www.pcyes.com.br/cabo-vga-3-6-15-pinos-30m-1280x1024-pvm36-30",
    "inStock": true
  },
  {
    "id": 27,
    "sku": "155237",
    "name": "Pasta Térmica PCYES Nitrogen Basic 1,5g 5,5W/mK Cinza PCYNB1555",
    "price": "R$ 49,90",
    "priceNum": 49.9,
    "rating": 4.7,
    "reviews": 189,
    "category": "Refrigeração",
    "subcategory": "Pasta Térmica",
    "tags": [
      "Refrigeração",
      "Pasta Térmica"
    ],
    "brand": "PCYES",
    "image": "/home/category-cooling.png",
    "images": [
      "/home/category-cooling.png"
    ],
    "description": "A Pasta Térmica Nitrogen Basic PCYES foi desenvolvida para garantir eficiente dissipação de calor em componentes eletrônicos, proporcionando melhor desempenho e maior durabilidade. Com condutividade térmica de 5,5W/mK, é ideal para uso em processadores, placas de vídeo e outros dispositivos que exig…",
    "features": [
      "Alta condutividade térmica de 5,5W/mK",
      "Melhora a dissipação de calor dos componentes",
      "Ideal para CPUs, GPUs e eletrônicos em geral",
      "Aplicação prática com seringa inclusa",
      "Acompanha espátula e lenço de limpeza",
      "Ampla faixa de operação para maior segurança"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "155237"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Pasta Térmica"
      }
    ],
    "seoSlug": "pasta-termica-nitrogen-basic-1-5g-5-5wmk-pcynb1555",
    "productUrl": "https://www.pcyes.com.br/pasta-termica-nitrogen-basic-1-5g-5-5wmk-pcynb1555",
    "inStock": true
  },
  {
    "id": 28,
    "sku": "155239",
    "name": "Pasta Térmica PCYES Nitrogen Pro 1,5g 8,5W/mK Alta Performance PCYNP1585",
    "price": "R$ 49,90",
    "priceNum": 49.9,
    "rating": 4.8,
    "reviews": 226,
    "category": "Refrigeração",
    "subcategory": "Pasta Térmica",
    "tags": [
      "Refrigeração",
      "Pasta Térmica"
    ],
    "brand": "PCYES",
    "image": "/home/category-cooling.png",
    "images": [
      "/home/category-cooling.png"
    ],
    "description": "A Pasta Térmica Nitrogen Pro 1,5g PCYES foi desenvolvida para oferecer máxima eficiência na dissipação de calor em componentes eletrônicos, garantindo melhor desempenho e maior vida útil para processadores, placas de vídeo e outros dispositivos.\nCom alta condutividade térmica de 8,5W/mK, proporcion…",
    "features": [
      "Alta condutividade térmica de 8,5W/mK",
      "Melhor dissipação de calor para alto desempenho",
      "Ideal para CPUs, GPUs e eletrônicos",
      "Aplicação fácil e precisa",
      "Acompanha kit completo para instalação",
      "Ampla faixa de temperatura (-50°C a 200°C)",
      "Maior estabilidade térmica",
      "Aumenta a vida útil dos componentes"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "155239"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Pasta Térmica"
      }
    ],
    "seoSlug": "pasta-termica-nitrogen-pro-15g-85wmk-pcynp1585",
    "productUrl": "https://www.pcyes.com.br/pasta-termica-nitrogen-pro-15g-85wmk-pcynp1585",
    "inStock": true
  },
  {
    "id": 29,
    "sku": "155238",
    "name": "Pasta Térmica PCYES Nitrogen Basic 4g 5,5W/mK Alta Eficiência PCYNB0455",
    "price": "R$ 49,90",
    "priceNum": 49.9,
    "rating": 4.9,
    "reviews": 263,
    "category": "Refrigeração",
    "subcategory": "Pasta Térmica",
    "tags": [
      "Refrigeração",
      "Pasta Térmica"
    ],
    "brand": "PCYES",
    "image": "/home/category-cooling.png",
    "images": [
      "/home/category-cooling.png"
    ],
    "description": "A Pasta Térmica Nitrogen Basic 4g PCYES foi desenvolvida para garantir dissipação térmica eficiente em componentes eletrônicos, proporcionando maior estabilidade e vida útil para processadores, placas de vídeo e outros dispositivos. \nCom condutividade térmica de 5,5W/mK, oferece transferência de ca…",
    "features": [
      "Condutividade térmica de 5,5W/mK",
      "Boa dissipação de calor",
      "Ideal para CPUs, GPUs e eletrônicos",
      "Fácil aplicação e boa aderência",
      "Acompanha kit completo para uso",
      "Ampla faixa de temperatura (-40°C a 150°C)",
      "Maior estabilidade térmica",
      "Excelente custo-benefício"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "155238"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Pasta Térmica"
      }
    ],
    "seoSlug": "pasta-termica-nitrogen-basic-4g-55wmk-pcynb0455",
    "productUrl": "https://www.pcyes.com.br/pasta-termica-nitrogen-basic-4g-55wmk-pcynb0455",
    "inStock": true
  },
  {
    "id": 30,
    "sku": "336115",
    "name": "Mini Computador PCYES B300 White Intel i5 1235U 3.30GHz 16GB DDR4 SSD 512GB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.4,
    "reviews": 300,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336115/3B90ECBA7AE1F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336115/3B90ECBA7AE1F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336115/3B90ECBA7AE2F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336115/3B90ECBA7AE4F7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador PCYES B300 White é a escolha ideal para quem busca alto desempenho aliado a um sistema leve e eficiente. Equipado com o processador Intel Core i5-1235U, entrega excelente performance para multitarefas, produtividade e uso profissional no dia a dia.\n\nCom 16GB de memória DDR4, gara…",
    "features": [
      "Processador Intel i5-1235U de alto desempenho",
      "16GB DDR4 para multitarefas avançadas",
      "SSD NVMe 512GB rápido e eficiente",
      "Sistema Linux Ubuntu leve e seguro",
      "Design compacto e elegante na cor branca",
      "Wi-Fi e Bluetooth integrados",
      "Baixo consumo com fonte externa 90W",
      "Ideal para trabalho, estudo e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336115"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i5-1235u-16gb-512gb-nvme-linux-white",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i5-1235u-16gb-512gb-nvme-linux-white",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 31,
    "sku": "294800",
    "name": "Mini Computador PCYES B300 Intel i3 1215U 3.30GHz 16GB DDR4 SSD 512GB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.5,
    "reviews": 337,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/294800/499C2B9AA2F25BF4E0630300A8C0FCD6",
    "images": [
      "https://cdn.oderco.com.br/produtos/294800/499C2B9AA2F25BF4E0630300A8C0FCD6",
      "https://cdn.oderco.com.br/produtos/294800/499C2B9AA2F35BF4E0630300A8C0FCD6",
      "https://cdn.oderco.com.br/produtos/294800/499C2B9AA2F55BF4E0630300A8C0FCD6"
    ],
    "description": "O Mini Computador PCYES B300 é uma solução eficiente para quem busca desempenho elevado no uso diário com excelente custo-benefício. Equipado com o processador Intel Core i3-1215U Hexa Core, oferece boa performance para multitarefas, garantindo fluidez em aplicações de trabalho, estudo e uso geral.…",
    "features": [
      "Processador Intel i3-1215U Hexa Core eficiente",
      "16GB DDR4 para multitarefas mais exigentes",
      "SSD NVMe 512GB com alta velocidade",
      "Sistema Linux Ubuntu leve e seguro",
      "Ideal para trabalho, estudo e uso diário",
      "Wi-Fi e Bluetooth integrados",
      "Baixo consumo com fonte externa 90W",
      "Formato compacto e versátil"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "294800"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i3-1215u-16gb-512gb-nvme-linux",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i3-1215u-16gb-512gb-nvme-linux",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 32,
    "sku": "336118",
    "name": "Mini Computador PCYES B300 White Intel i3 1215U 3.30GHz 16GB DDR4 SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.6,
    "reviews": 374,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336118/3B90ECBA7ACDF7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336118/3B90ECBA7ACDF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336118/3B90ECBA7ACEF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336118/3B90ECBA7AD0F7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador PCYES B300 White é uma solução completa para quem busca desempenho eficiente e praticidade em um formato compacto. Equipado com o processador Intel Core i3-1215U, oferece excelente desempenho para tarefas do dia a dia, multitarefas e ambientes de trabalho.\n\nCom 16GB de memória DD…",
    "features": [
      "Processador Intel i3-1215U com bom desempenho",
      "16GB DDR4 para multitarefas fluídas",
      "SSD NVMe 512GB rápido e eficiente",
      "Windows 11 Pro pronto para uso",
      "Design compacto e elegante na cor branca",
      "Wi-Fi e Bluetooth integrados",
      "Baixo consumo com fonte externa 90W",
      "Ideal para trabalho, estudo e uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336118"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i3-1215u-16gb-512gb-nvme-white",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i3-1215u-16gb-512gb-nvme-white",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 33,
    "sku": "297339",
    "name": "Mini Computador PCYES B300 Hexa-Core Intel i3 1215U 3.30GHz 16GB DDR4 SSD 1TB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.7,
    "reviews": 411,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/297339/2BBF328B5098EC36E0630300A8C01CC7",
    "images": [
      "https://cdn.oderco.com.br/produtos/297339/2BBF328B5098EC36E0630300A8C01CC7",
      "https://cdn.oderco.com.br/produtos/297339/2BBF328B5099EC36E0630300A8C01CC7",
      "https://cdn.oderco.com.br/produtos/297339/2BBF328B509BEC36E0630300A8C01CC7"
    ],
    "description": "O Mini Computador PCYES B300 é uma solução completa para quem busca desempenho, velocidade e grande capacidade de armazenamento em um formato compacto. Equipado com o processador Intel Core i3-1215U Hexa Core, oferece ótima performance para tarefas do dia a dia, multitarefas e ambientes de trabalho.…",
    "features": [
      "Processador Intel i3-1215U Hexa Core eficiente",
      "16GB DDR4 para multitarefas avançadas",
      "SSD NVMe 1TB com alta velocidade e amplo espaço",
      "Sistema Linux Ubuntu leve e seguro",
      "Ideal para trabalho, estudo e uso diário",
      "Wi-Fi e Bluetooth integrados",
      "Baixo consumo com fonte externa 90W",
      "Formato compacto e versátil"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "297339"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i3-1215u-16gb-1tb-nvme-linux",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i3-1215u-16gb-1tb-nvme-linux",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2127,89",
    "oldPriceNum": 2127.89
  },
  {
    "id": 34,
    "sku": "336114",
    "name": "Mini Computador PCYES B300 White Hexa-Core Intel i3 1215U 3.30GHz 16GB DDR4 SSD 512GB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.8,
    "reviews": 448,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336114/3B90ECBA7AC9F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336114/3B90ECBA7AC9F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336114/3B90ECBA7ACAF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336114/3B90ECBA7ACCF7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador PCYES B300 White é uma solução eficiente para quem busca desempenho consistente em um formato compacto e elegante. Equipado com o processador Intel Core i3-1215U Hexa-Core, oferece excelente performance para tarefas do dia a dia, multitarefas e ambientes de trabalho.\n\nCom 16GB de…",
    "features": [
      "Processador Intel i3-1215U Hexa-Core eficiente",
      "16GB DDR4 para multitarefas avançadas",
      "SSD NVMe 512GB com alta velocidade",
      "Sistema Linux Ubuntu leve e seguro",
      "Design White moderno e compacto",
      "Wi-Fi e Bluetooth integrados",
      "Baixo consumo com fonte externa 90W",
      "Ideal para trabalho, estudo e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336114"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i3-1215u-16gb-512gb-nvme-linux-white",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i3-1215u-16gb-512gb-nvme-linux-white",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 35,
    "sku": "293895",
    "name": "Computador PCYES One B500 Quad-Core Intel i5 3470 3.20GHz 8GB DDR3 SSD 256GB Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.9,
    "reviews": 55,
    "category": "Computadores",
    "subcategory": "Computador",
    "tags": [
      "Computadores",
      "Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293895/498D4BB0B9D1EA6DE0630300A8C0727B",
    "images": [
      "https://cdn.oderco.com.br/produtos/293895/498D4BB0B9D1EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293895/498D4BB0B9D0EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293895/498D4BB0B9D2EA6DE0630300A8C0727B"
    ],
    "description": "O Computador PCYES One B500 é uma solução prática e eficiente para quem busca desempenho estável no dia a dia. Equipado com o processador Intel Core i5-3470 Quad-Core, oferece boa performance para tarefas de escritório, estudos e uso geral, garantindo fluidez em atividades essenciais.\n\nCom 8GB de …",
    "features": [
      "Processador Intel i5-3470 Quad-Core estável",
      "8GB DDR3 ideal para uso diário",
      "SSD 256GB com inicialização rápida",
      "Sistema Linux Ubuntu leve e seguro",
      "Formato compacto Mini ITX",
      "Baixo consumo com fonte externa 90W",
      "Ideal para escritório, estudo e uso geral",
      "Boa relação custo-benefícioConteúdo da Embalagem"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293895"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Computador"
      }
    ],
    "seoSlug": "computador-pcyes-one-b500-i5-3470-8gb-256gb-ssd-linux",
    "productUrl": "https://www.pcyes.com.br/computador-pcyes-one-b500-i5-3470-8gb-256gb-ssd-linux",
    "inStock": true,
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 36,
    "sku": "293951",
    "name": "Computador PCYES One B300 Dual-Core Intel i3 3220 3.30GHz 8GB DDR3 SSD 512GB Windows 10 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.4,
    "reviews": 92,
    "category": "Computadores",
    "subcategory": "Computador",
    "tags": [
      "Computadores",
      "Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293951/499C2B9AA2EE5BF4E0630300A8C0FCD6",
    "images": [
      "https://cdn.oderco.com.br/produtos/293951/499C2B9AA2EE5BF4E0630300A8C0FCD6",
      "https://cdn.oderco.com.br/produtos/293951/499C2B9AA2ED5BF4E0630300A8C0FCD6",
      "https://cdn.oderco.com.br/produtos/293951/499C2B9AA2EF5BF4E0630300A8C0FCD6"
    ],
    "description": "O Computador PCYES One B300 é uma solução prática para quem busca desempenho estável em tarefas do dia a dia. Equipado com o processador Intel Core i3-3220 Dual-Core, oferece performance adequada para atividades como navegação, estudos, uso corporativo e aplicações de escritório.\n\nCom 8GB de memór…",
    "features": [
      "Processador Intel i3-3220 Dual-Core estável",
      "8GB DDR3 para tarefas do dia a dia",
      "SSD 512GB com maior espaço e rapidez",
      "Windows 10 Pro pronto para uso",
      "Formato compacto Mini ITX",
      "Baixo consumo com fonte externa 90W",
      "Ideal para escritório, estudo e uso geral",
      "Boa relação custo-benefício"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293951"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Computador"
      }
    ],
    "seoSlug": "computador-pcyes-one-b300-i3-3220-8gb-512gb-ssd-windows",
    "productUrl": "https://www.pcyes.com.br/computador-pcyes-one-b300-i3-3220-8gb-512gb-ssd-windows",
    "inStock": true
  },
  {
    "id": 37,
    "sku": "293955",
    "name": "Computador PCYES One B500 Quad-Core Intel i5 3470 3.20GHz 8GB DDR3 SSD 512GB Windows 10 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.5,
    "reviews": 129,
    "category": "Computadores",
    "subcategory": "Computador",
    "tags": [
      "Computadores",
      "Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293955/498D4BB0B9C7EA6DE0630300A8C0727B",
    "images": [
      "https://cdn.oderco.com.br/produtos/293955/498D4BB0B9C7EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293955/498D4BB0B9C6EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293955/498D4BB0B9C8EA6DE0630300A8C0727B"
    ],
    "description": "O Computador PCYES One B500 é uma solução eficiente para quem busca desempenho estável aliado a maior capacidade de armazenamento. Equipado com o processador Intel Core i5-3470 Quad-Core, oferece excelente performance para tarefas do dia a dia, como navegação, aplicações de escritório e uso corporat…",
    "features": [
      "Processador Intel i5-3470 Quad-Core eficiente",
      "8GB DDR3 para tarefas do dia a dia",
      "SSD 512GB com maior espaço e rapidez",
      "Windows 10 Pro pronto para uso",
      "Formato compacto Mini ITX",
      "Baixo consumo com fonte externa 90W",
      "Ideal para escritório, estudo e uso geral",
      "Boa relação custo-benefício"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293955"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Computador"
      }
    ],
    "seoSlug": "computador-pcyes-one-b500-i5-3470-8gb-512gb-ssd-windows",
    "productUrl": "https://www.pcyes.com.br/computador-pcyes-one-b500-i5-3470-8gb-512gb-ssd-windows",
    "inStock": true
  },
  {
    "id": 38,
    "sku": "293938",
    "name": "Computador PCYES One B300 Dual-Core Intel i3 3220 3.30GHz 8GB DDR3 SSD 512GB Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.6,
    "reviews": 166,
    "category": "Computadores",
    "subcategory": "Computador",
    "tags": [
      "Computadores",
      "Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293938/498D4BB0B9CCEA6DE0630300A8C0727B",
    "images": [
      "https://cdn.oderco.com.br/produtos/293938/498D4BB0B9CCEA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293938/498D4BB0B9CBEA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293938/498D4BB0B9CDEA6DE0630300A8C0727B"
    ],
    "description": "O Computador PCYES One B300 é uma solução prática e eficiente para quem busca desempenho estável em tarefas do dia a dia. Equipado com o processador Intel Core i3-3220 Dual-Core, oferece boa performance para navegação, uso de aplicativos de escritório e atividades rotineiras.\n\nCom 8GB de memória D…",
    "features": [
      "Processador Intel i3-3220 Dual-Core eficiente",
      "8GB DDR3 para tarefas do dia a dia",
      "SSD 512GB com mais espaço e rapidez",
      "Sistema Linux Ubuntu leve e seguro",
      "Formato compacto Mini ITX",
      "Baixo consumo com fonte externa 90W",
      "Ideal para escritório, estudo e uso geral",
      "Excelente custo-benefício"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293938"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Computador"
      }
    ],
    "seoSlug": "computador-pcyes-one-b300-i3-3220-8gb-512gb-ssd-linux",
    "productUrl": "https://www.pcyes.com.br/computador-pcyes-one-b300-i3-3220-8gb-512gb-ssd-linux",
    "inStock": true
  },
  {
    "id": 39,
    "sku": "293944",
    "name": "Computador PCYES One B500 Quad-Core Intel i5 3470 3.20GHz 8GB DDR3 SSD 512GB Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.7,
    "reviews": 203,
    "category": "Computadores",
    "subcategory": "Computador",
    "tags": [
      "Computadores",
      "Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293944/498D4BB0B9D6EA6DE0630300A8C0727B",
    "images": [
      "https://cdn.oderco.com.br/produtos/293944/498D4BB0B9D6EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293944/498D4BB0B9D5EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293944/498D4BB0B9D7EA6DE0630300A8C0727B"
    ],
    "description": "O Computador PCYES One B500 é uma solução eficiente para quem busca desempenho estável aliado a maior capacidade de armazenamento. Equipado com o processador Intel Core i5-3470 Quad-Core, oferece excelente performance para tarefas do dia a dia, como navegação, aplicações de escritório e uso geral.\n…",
    "features": [
      "Processador Intel i5-3470 Quad-Core eficiente",
      "8GB DDR3 para tarefas do dia a dia",
      "SSD 512GB com mais espaço e rapidez",
      "Sistema Linux Ubuntu leve e seguro",
      "Formato compacto Mini ITX",
      "Baixo consumo com fonte externa 90W",
      "Ideal para escritório, estudo e uso geral",
      "Excelente custo-benefício"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293944"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Computador"
      }
    ],
    "seoSlug": "computador-pcyes-one-b500-i5-3470-8gb-512gb-ssd-linux",
    "productUrl": "https://www.pcyes.com.br/computador-pcyes-one-b500-i5-3470-8gb-512gb-ssd-linux",
    "inStock": true
  },
  {
    "id": 40,
    "sku": "29292",
    "name": "Cabo PCYES USB 3.0 A para B 3 Metros Cobre Puro 5Gbps PUABM3-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 240,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29292/44801E8A390DCC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29292/44801E8A390DCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29292/44801E8A390ECC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29292/44801E8A390CCC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB 3.0 PCYES A para B 3 Metros é a escolha ideal para quem busca alta performance e confiabilidade na conexão de dispositivos. Desenvolvido com cobre puro, garante melhor condução de sinal, maior estabilidade e desempenho superior em comparação a cabos convencionais.\n\nCom taxa de transferê…",
    "features": [
      "Alta velocidade USB 3.0 até 5Gbps",
      "Construção em cobre puro para melhor sinal",
      "Comprimento de 3 metros para maior alcance",
      "Conexão estável e segura",
      "Ideal para impressoras e HDs externos",
      "Alta durabilidade e resistência",
      "Compatível com diversos dispositivos USB B",
      "Design robusto e eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29292"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-3-0-a-para-b-3m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-3-0-a-para-b-3m-pcyes-cobre-puro",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 41,
    "sku": "29324",
    "name": "Cabo PCYES VGA 3+6 15 Pinos Macho 40 Metros Cobre Puro PVM36-40",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 277,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29324/44801E8A3887CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29324/44801E8A3887CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29324/44801E8A3888CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29324/44801E8A3886CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo VGA PCYES 40 Metros é ideal para quem precisa de conexão de vídeo estável em longas distâncias. Desenvolvido com cobre puro, oferece melhor condução de sinal e maior confiabilidade, sendo indicado para ambientes profissionais, corporativos e instalações amplas.\n\nCompatível com monitores, co…",
    "features": [
      "Cabo VGA 15 pinos (3+6) de alta compatibilidade",
      "Comprimento de 40 metros para longas distâncias",
      "Construção em cobre puro para melhor sinal",
      "Transmissão estável de imagem analógica",
      "Ideal para monitores, PCs, notebooks e TVs",
      "Alta durabilidade e resistência",
      "Uso profissional e corporativo",
      "Design robusto e eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29324"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-vga-3-6-15-pinos-40m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-vga-3-6-15-pinos-40m-pcyes-cobre-puro",
    "inStock": true
  },
  {
    "id": 42,
    "sku": "29338",
    "name": "Cabo de Áudio PCYES 2 RCA Macho para 2 RCA Macho 2 Metros Cobre Puro P2R-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 314,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29338/4CD7DF2DB8F33526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/29338/4CD7DF2DB8F33526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29338/4CD7DF2DB8F43526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29338/4CD7DF2DB8F23526E0630300A8C075C0"
    ],
    "description": "O Cabo de Áudio PCYES 2 RCA para 2 RCA 2 Metros é ideal para quem busca qualidade sonora e conexão estável entre dispositivos. Desenvolvido com cobre puro, garante melhor condução de sinal, reduzindo interferências e proporcionando áudio mais limpo e fiel.\n\nCompatível com aparelhos como TVs, caixa…",
    "features": [
      "Conexão 2 RCA macho para 2 RCA macho",
      "Áudio estéreo com 2 canais",
      "Construção em cobre puro para melhor sinal",
      "Comprimento de 2 metros ideal para uso versátil",
      "Redução de interferências no áudio",
      "Alta durabilidade e resistência",
      "Compatível com diversos dispositivos de áudio",
      "Design robusto e eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29338"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-audio-2-rca-2m-pcyes-cobre-puro",
    "productUrl": "https://www.pcyes.com.br/cabo-audio-2-rca-2m-pcyes-cobre-puro",
    "inStock": true
  },
  {
    "id": 43,
    "sku": "294050",
    "name": "Mini Computador PCYES B300 Intel i3 1215U 3.30GHz 8GB DDR4 SSD 256GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.5,
    "reviews": 351,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/294050/29B31D8CECDCD6C8E0630300A8C0D42C",
    "images": [
      "https://cdn.oderco.com.br/produtos/294050/29B31D8CECDCD6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/294050/29B31D8CECDDD6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/294050/29B31D8CECDFD6C8E0630300A8C0D42C"
    ],
    "description": "O Mini Computador PCYES B300 é a escolha ideal para quem busca desempenho eficiente em um formato compacto, perfeito para ambientes de trabalho, estudo e home office. Equipado com o processador Intel Core i3-1215U Hexa Core, oferece excelente equilíbrio entre performance e baixo consumo de energia.…",
    "features": [
      "Processador Intel i3-1215U Hexa Core eficiente",
      "8GB DDR4 para multitarefa estável",
      "SSD NVMe 256GB com alta velocidade",
      "Windows 11 Pro já instalado",
      "Formato compacto ideal para qualquer ambiente",
      "Baixo consumo de energia",
      "Wi-Fi e Bluetooth integrados",
      "Ideal para trabalho, estudo e uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "294050"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i3-1215u-8gb-256gb-nvme",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i3-1215u-8gb-256gb-nvme",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 44,
    "sku": "336120",
    "name": "Mini Computador PCYES B300 White Intel i5 1235U 3.30GHz 16GB DDR4 SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.6,
    "reviews": 388,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336120/3B90ECBA7AE5F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336120/3B90ECBA7AE5F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336120/3B90ECBA7AE6F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336120/3B90ECBA7AE8F7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador PCYES B300 White é uma solução completa para quem busca alto desempenho em um formato compacto. Equipado com o processador Intel Core i5-1235U, entrega excelente performance em multitarefas, sendo ideal para trabalho, estudo, home office e até criação de conteúdo leve.\n\nCom 16GB …",
    "features": [
      "Processador Intel i5-1235U de alto desempenho",
      "16GB DDR4 para multitarefas avançadas",
      "SSD NVMe 512GB com alta velocidade",
      "Windows 11 Pro pronto para uso",
      "Design compacto e moderno na cor branca",
      "Wi-Fi e Bluetooth integrados",
      "Baixo consumo com fonte externa 90W",
      "Ideal para trabalho, produtividade e uso intenso"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336120"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i5-1235u-16gb-512gb-nvme-white",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i5-1235u-16gb-512gb-nvme-white",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2127,89",
    "oldPriceNum": 2127.89
  },
  {
    "id": 45,
    "sku": "297347",
    "name": "Mini Computador PCYES B500 Intel i5 1235U 3.30GHz 16GB DDR4 SSD 1TB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.7,
    "reviews": 425,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/297347/2BBF328B50A4EC36E0630300A8C01CC7",
    "images": [
      "https://cdn.oderco.com.br/produtos/297347/2BBF328B50A4EC36E0630300A8C01CC7",
      "https://cdn.oderco.com.br/produtos/297347/2BBF328B50A5EC36E0630300A8C01CC7",
      "https://cdn.oderco.com.br/produtos/297347/2BBF328B50A7EC36E0630300A8C01CC7"
    ],
    "description": "O Mini Computador PCYES B500 é uma solução robusta e eficiente para quem busca alto desempenho aliado a grande capacidade de armazenamento. Equipado com o processador Intel Core i5-1235U Deca Core, oferece excelente performance em multitarefas, sendo ideal para trabalho, estudo, home office e aplica…",
    "features": [
      "Processador Intel i5-1235U Deca Core de alto desempenho",
      "16GB DDR4 para multitarefas avançadas",
      "SSD NVMe 1TB com alta velocidade e amplo armazenamento",
      "Sistema Linux Ubuntu leve, seguro e eficiente",
      "Ideal para trabalho, desenvolvimento e uso profissional",
      "Wi-Fi e Bluetooth integrados",
      "Baixo consumo com fonte externa 90W",
      "Formato compacto e versátil"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "297347"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b500-i5-1235u-16gb-1tb-nvme-linux",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b500-i5-1235u-16gb-1tb-nvme-linux",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 46,
    "sku": "192050",
    "name": "Memória PCYES SODIMM 16GB DDR4 3200MHz Notebook CL19 1.2V PM163200D4SO",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 462,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34681/4520E92D669BC021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/34681/4520E92D669BC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/34681/4520E92D669AC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/34681/4520E92D669CC021E0630300A8C02B6F"
    ],
    "description": "A Memória SODIMM 16GB DDR4 3200MHz PCYES foi desenvolvida para entregar alto desempenho, estabilidade e eficiência energética em notebooks e sistemas compactos. Ideal para upgrades, proporciona maior velocidade na execução de tarefas, melhor resposta do sistema e fluidez em multitarefa.\n\nCom frequ…",
    "features": [
      "Alta performance com 3200MHz",
      "16GB ideais para multitarefa",
      "Formato SODIMM para notebooks",
      "Baixo consumo com 1.2V",
      "Estabilidade e confiabilidade no uso",
      "Upgrade rápido e eficiente",
      "Compatível com diversos notebooks"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192050"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-sodimm-16gb-ddr4-3200mhz-pcyes-pm163200d4so",
    "productUrl": "https://www.pcyes.com.br/memoria-sodimm-16gb-ddr4-3200mhz-pcyes-pm163200d4so",
    "inStock": true
  },
  {
    "id": 47,
    "sku": "34681",
    "name": "Memória PCYES UDIMM 16GB DDR4 3200MHz Desktop CL16 1.35V PM163200D4",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 69,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34681/4520E92D669BC021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/34681/4520E92D669BC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/34681/4520E92D669AC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/34681/4520E92D669CC021E0630300A8C02B6F"
    ],
    "description": "A Memória UDIMM 16GB DDR4 3200MHz PCYES foi desenvolvida para oferecer alto desempenho, estabilidade e velocidade em computadores desktop. Ideal para upgrades, proporciona maior fluidez na execução de tarefas, melhor resposta do sistema e excelente performance em multitarefa.\n\nCom frequência de 32…",
    "features": [
      "Alta performance com 3200MHz",
      "16GB ideais para multitarefa e jogos",
      "Latência CL16 para maior desempenho",
      "Formato UDIMM para desktops",
      "Alta estabilidade e confiabilidade",
      "Ideal para upgrades de performance",
      "Componentes de alta qualidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34681"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-udimm-16gb-ddr4-3200mhz-pcyes-pm163200d4",
    "productUrl": "https://www.pcyes.com.br/memoria-udimm-16gb-ddr4-3200mhz-pcyes-pm163200d4",
    "inStock": true
  },
  {
    "id": 48,
    "sku": "341929",
    "name": "Fonte PCYES Gamer 500W 80 Plus White Shocker White Ghost PFC Ativo PF500SHWG",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.4,
    "reviews": 106,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/341929/4CB1509469A0F61FE0630300A8C0B87F",
    "images": [
      "https://cdn.oderco.com.br/produtos/341929/4CB1509469A0F61FE0630300A8C0B87F",
      "https://cdn.oderco.com.br/produtos/341929/4CB1509469A2F61FE0630300A8C0B87F",
      "https://cdn.oderco.com.br/produtos/341929/4CB1509469A4F61FE0630300A8C0B87F"
    ],
    "description": "A Fonte Gamer PCYES Shocker 500W White Ghost foi desenvolvida para entregar eficiência, estabilidade e segurança em setups gamers e profissionais. Com certificação 80 Plus Standard, oferece eficiência superior a 80%, garantindo melhor aproveitamento de energia e menor desperdício.\n\nEquipada com PF…",
    "features": [
      "Potência de 500W para setups equilibrados",
      "Certificação 80 Plus com eficiência >80%",
      "PFC ativo para maior estabilidade elétrica",
      "Cabos full black com revestimento em nylon",
      "Sistema completo de proteções elétricas",
      "Ventoinha de 120mm silenciosa e eficiente",
      "Design White Ghost moderno"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "341929"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-500w-80plus-pcyes-shocker-white-ghost-pf500shwg",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-500w-80plus-pcyes-shocker-white-ghost-pf500shwg",
    "inStock": true
  },
  {
    "id": 49,
    "sku": "341933",
    "name": "Fonte PCYES Gamer 500W 80 Plus White Shocker PFC Ativo PF500SHW",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.5,
    "reviews": 143,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/341933/4CB15094699AF61FE0630300A8C0B87F",
    "images": [
      "https://cdn.oderco.com.br/produtos/341933/4CB15094699AF61FE0630300A8C0B87F",
      "https://cdn.oderco.com.br/produtos/341933/4CB15094699CF61FE0630300A8C0B87F",
      "https://cdn.oderco.com.br/produtos/341933/4CB15094699EF61FE0630300A8C0B87F"
    ],
    "description": "A Fonte Gamer PCYES Shocker 500W foi desenvolvida para oferecer eficiência energética, estabilidade e segurança para setups gamers e profissionais. Com certificação 80 Plus Standard, garante eficiência superior a 80%, proporcionando melhor aproveitamento de energia e redução de desperdícios.\n\nEqui…",
    "features": [
      "Potência de 500W para setups equilibrados",
      "Certificação 80 Plus com eficiência >80%",
      "PFC ativo para maior estabilidade elétrica",
      "Cabos full black com revestimento em nylon",
      "Sistema completo de proteções elétricas",
      "Ventoinha de 120mm silenciosa e eficiente",
      "Alta confiabilidade para uso contínuo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "341933"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-500w-80plus-pcyes-shocker-pf500shw",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-500w-80plus-pcyes-shocker-pf500shw",
    "inStock": true
  },
  {
    "id": 50,
    "sku": "341934",
    "name": "Fonte PCYES Gamer 550W 80 Plus Bronze Electro V2 White Ghost PFC Ativo ELECV2WG550W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.6,
    "reviews": 180,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/341934/4B7EC28153E51D2DE0630300A8C0552F",
    "images": [
      "https://cdn.oderco.com.br/produtos/341934/4B7EC28153E51D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/341934/4B7EC28153E61D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/341934/4B7EC28153E81D2DE0630300A8C0552F"
    ],
    "description": "A Fonte Gamer PCYES Electro V2 550W White Ghost foi desenvolvida para oferecer alta eficiência, segurança e desempenho para setups gamers e profissionais. Com certificação 80 Plus Bronze, entrega eficiência superior a 82%, garantindo melhor aproveitamento de energia e menor desperdício.\n\nEquipada …",
    "features": [
      "Potência de 550W com pico de até 600W",
      "Certificação 80 Plus Bronze (>82% de eficiência)",
      "PFC ativo para maior estabilidade elétrica",
      "Design White Ghost moderno e exclusivo",
      "Cabos com revestimento para maior durabilidade",
      "Sistema completo de proteções elétricas",
      "Alta confiabilidade para uso contínuo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "341934"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-550w-80plus-bronze-pcyes-electro-v2-white-ghost-elecv2wg550w",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-550w-80plus-bronze-pcyes-electro-v2-white-ghost-elecv2wg550w",
    "inStock": true,
    "oldPrice": "R$ 530,88",
    "oldPriceNum": 530.88
  },
  {
    "id": 51,
    "sku": "341935",
    "name": "Fonte PCYES Gamer 650W 80 Plus Bronze Electro V2 White Ghost PFC Ativo ELECV2WG650W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.7,
    "reviews": 217,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/341935/4B7EC28153EA1D2DE0630300A8C0552F",
    "images": [
      "https://cdn.oderco.com.br/produtos/341935/4B7EC28153EA1D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/341935/4B7EC28153EB1D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/341935/4B7EC28153ED1D2DE0630300A8C0552F"
    ],
    "description": "A Fonte Gamer PCYES Electro V2 650W White Ghost foi desenvolvida para entregar alta eficiência energética, estabilidade e segurança para setups gamers e profissionais. Com certificação 80 Plus Bronze, oferece eficiência superior a 82%, reduzindo desperdícios e melhorando o desempenho do sistema.\n\n…",
    "features": [
      "Potência de 650W com pico de até 700W",
      "Certificação 80 Plus Bronze (>82% de eficiência)",
      "PFC ativo para maior estabilidade elétrica",
      "Design White Ghost moderno e exclusivo",
      "Cabos com revestimento para maior durabilidade",
      "Sistema completo de proteções elétricas",
      "Alta confiabilidade para uso contínuo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "341935"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-650w-80plus-bronze-pcyes-electro-v2-white-ghost-elecv2wg650w",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-650w-80plus-bronze-pcyes-electro-v2-white-ghost-elecv2wg650w",
    "inStock": true
  },
  {
    "id": 52,
    "sku": "341936",
    "name": "Fonte PCYES Gamer Electro V2 750W 80 Plus Bronze PFC Ativo 115-230V ELECV2PTO750W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.8,
    "reviews": 254,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/341936/4B7EC28153EF1D2DE0630300A8C0552F",
    "images": [
      "https://cdn.oderco.com.br/produtos/341936/4B7EC28153EF1D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/341936/4B7EC28153F01D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/341936/4B7EC28153F21D2DE0630300A8C0552F"
    ],
    "description": "A Fonte Gamer PCYES Electro V2 750W foi desenvolvida para quem busca desempenho estável e segurança em setups de alto desempenho. Com certificação 80 Plus Bronze e PFC ativo, entrega eficiência energética superior, reduzindo desperdícios e garantindo melhor aproveitamento da energia.\n\nSua construç…",
    "features": [
      "Alta potência de 750W para setups gamer avançados",
      "Certificação 80 Plus Bronze com eficiência superior a 82%",
      "PFC ativo para melhor estabilidade energética",
      "Sistema completo de proteções elétricas",
      "Design exclusivo com melhor fluxo de ar",
      "Cabos com revestimento para maior durabilidade",
      "Compatível com placas de vídeo modernas (PCIe duplo)",
      "Operação mais segura e confiável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "341936"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-pcyes-electro-v2-750w-80-plus-bronze",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-pcyes-electro-v2-750w-80-plus-bronze",
    "inStock": true
  },
  {
    "id": 53,
    "sku": "293958",
    "name": "Mini Computador PCYES B300 Intel i3 1215U 3.30GHz 8GB DDR4 SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.9,
    "reviews": 291,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293958/4999E7FE734FF2BEE0630300A8C0A777",
    "images": [
      "https://cdn.oderco.com.br/produtos/293958/4999E7FE734FF2BEE0630300A8C0A777",
      "https://cdn.oderco.com.br/produtos/293958/4999E7FE7350F2BEE0630300A8C0A777",
      "https://cdn.oderco.com.br/produtos/293958/4999E7FE7351F2BEE0630300A8C0A777"
    ],
    "description": "O Mini Computador PCYES B300 foi desenvolvido para quem busca desempenho eficiente em um formato compacto, ideal para ambientes de trabalho, estudo e home office. Equipado com o processador Intel Core i3-1215U Hexa Core, oferece excelente equilíbrio entre performance e consumo energético, garantindo…",
    "features": [
      "Processador Intel i3-1215U Hexa Core com bom desempenho multitarefa",
      "8GB DDR4 para uso fluido em aplicações do dia a dia",
      "SSD NVMe 512GB com alta velocidade de leitura e gravação",
      "Sistema Windows 11 Pro já instalado e pronto para uso",
      "Formato compacto ideal para espaços reduzidos",
      "Baixo consumo de energia com fonte externa de 90W",
      "Conectividade com Wi-Fi e Bluetooth integrados",
      "Ideal para trabalho, estudo e home office"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293958"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i3-1215u-8gb-512gb-nvme",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i3-1215u-8gb-512gb-nvme",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 54,
    "sku": "297351",
    "name": "Mini Computador B500 Deca-core i5-1235U 3.30GHz 16GB DDR4 SSD 1TB NVMe Wi-Fi Bluetooth Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.4,
    "reviews": 328,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC",
      "Wireless"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/297351/2BBF328B50AAEC36E0630300A8C01CC7",
    "images": [
      "https://cdn.oderco.com.br/produtos/297351/2BBF328B50AAEC36E0630300A8C01CC7",
      "https://cdn.oderco.com.br/produtos/297351/2BBF328B50ABEC36E0630300A8C01CC7",
      "https://cdn.oderco.com.br/produtos/297351/2BBF328B50ACEC36E0630300A8C01CC7"
    ],
    "description": "O Mini Computador B500 com processador Intel Core i5-1235U Deca-core foi desenvolvido para entregar alto desempenho, fluidez e eficiência no uso diário. Ideal para trabalho, estudo, home office e aplicações mais exigentes, oferece respostas rápidas e excelente performance em multitarefa.\n\nCom 16GB…",
    "features": [
      "Alto desempenho com processador Intel Core i5-1235U Deca-core",
      "Multitarefa avançada com 16GB de memória DDR4",
      "SSD NVMe de 1TB com alta velocidade e amplo armazenamento",
      "Sistema Windows 11 Pro moderno e seguro",
      "Conectividade Wi-Fi e Bluetooth integrados",
      "Design compacto ideal para ambientes profissionais e domésticos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "297351"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-b500-i5-1235u-16gb-1tb-windows",
    "productUrl": "https://www.pcyes.com.br/mini-computador-b500-i5-1235u-16gb-1tb-windows",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 55,
    "sku": "336089",
    "name": "Mini Computador PCYES B300 White Hexa-core i3-1215U 3.30GHz 8GB DDR4 SSD 512GB NVMe Wi-Fi Bluetooth Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.5,
    "reviews": 365,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador",
      "Wireless"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336089/3B90ECBA7ABDF7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336089/3B90ECBA7ABDF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336089/3B90ECBA7ABEF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336089/3B90ECBA7ABFF7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador B300 White com processador Intel Core i3-1215U Hexa-core foi desenvolvido para oferecer desempenho eficiente, baixo consumo de energia e excelente fluidez no uso diário. Ideal para tarefas de trabalho, estudo e home office, ele entrega respostas rápidas em aplicações e ótima perfor…",
    "features": [
      "Desempenho eficiente com processador Intel Core i3-1215U Hexa-core",
      "Inicialização rápida e maior velocidade com SSD NVMe",
      "Multitarefa estável com 8GB de memória DDR4",
      "Sistema Linux Ubuntu leve, seguro e pronto para uso",
      "Conectividade Wi-Fi e Bluetooth integrados",
      "Design compacto e moderno ideal para qualquer ambiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336089"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-b300-i3-1215u-8gb-512gb-linux",
    "productUrl": "https://www.pcyes.com.br/mini-computador-b300-i3-1215u-8gb-512gb-linux",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 56,
    "sku": "294802",
    "name": "Mini Computador PCYES B300 White Hexa-Core i3-1215U 16GB DDR4 SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.6,
    "reviews": 402,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/294802/2B96EA6446B19102E0630300A8C0CDE3",
    "images": [
      "https://cdn.oderco.com.br/produtos/294802/2B96EA6446B19102E0630300A8C0CDE3",
      "https://cdn.oderco.com.br/produtos/294802/2B96EA6446B49102E0630300A8C0CDE3",
      "https://cdn.oderco.com.br/produtos/294802/2B96EA6446B59102E0630300A8C0CDE3"
    ],
    "description": "O Mini Computador B300 White Hexa-Core i3-1215U 3.30 GHz com 16GB DDR4 e SSD 512GB NVMe com Windows 11 Pro é a escolha ideal para quem busca alto desempenho em um formato compacto. Equipado com o processador Intel Core i3-1215U Hexa-Core, oferece excelente performance em multitarefas, respostas rápi…",
    "features": [
      "Processador Intel Core i3 Hexa-Core de 12ª geração",
      "16GB DDR4 para multitarefa avançada e alta performance",
      "SSD NVMe de 512GB rápido e com amplo armazenamento",
      "Windows 11 Pro pronto para uso profissional",
      "Wi-Fi e Bluetooth integrados",
      "Design compacto e elegante para qualquer ambiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "294802"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-b300-white-hexa-core-i3-1215u-16gb-512gb-nvme-windows-11-pro",
    "productUrl": "https://www.pcyes.com.br/mini-computador-b300-white-hexa-core-i3-1215u-16gb-512gb-nvme-windows-11-pro",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 57,
    "sku": "336106",
    "name": "Mini Computador PCYES B300 White Hexa-Core i3-1215U 8GB DDR4 SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.7,
    "reviews": 439,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336106/3B90ECBA7AC5F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336106/3B90ECBA7AC5F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336106/3B90ECBA7AC6F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336106/3B90ECBA7AC7F7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador B300 White Hexa-Core i3-1215U 3.30 GHz com 8GB DDR4 e SSD 512GB NVMe com Windows 11 Pro é uma solução compacta e eficiente para quem busca desempenho ágil e produtividade no dia a dia. Equipado com processador Intel Core i3-1215U Hexa-Core, oferece respostas rápidas em aplicações, …",
    "features": [
      "Processador Intel Core i3 Hexa-Core de 12ª geração",
      "Melhor desempenho em multitarefa e aplicações simultâneas",
      "8GB DDR4 para uso estável e eficiente",
      "SSD NVMe de 512GB rápido e com amplo espaço",
      "Windows 11 Pro pronto para produtividade",
      "Wi-Fi e Bluetooth integrados",
      "Design compacto e moderno"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336106"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-b300-white-hexa-core-i3-1215u-8gb-512gb-nvme-windows-11-pro",
    "productUrl": "https://www.pcyes.com.br/mini-computador-b300-white-hexa-core-i3-1215u-8gb-512gb-nvme-windows-11-pro",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 58,
    "sku": "336090",
    "name": "Mini Computador B500 White i5-1235U 8GB DDR4 SSD 512GB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.8,
    "reviews": 476,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336090/3B90ECBA7AD5F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336090/3B90ECBA7AD5F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336090/3B90ECBA7AD6F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336090/3B90ECBA7AD7F7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador B500 White i5-1235U 3.30 GHz com 8GB DDR4 e SSD 512GB NVMe com Linux Ubuntu é a solução ideal para quem busca desempenho eficiente em um formato compacto. Equipado com o processador Intel Core i5-1235U, oferece excelente performance em multitarefas, garantindo fluidez no uso diário…",
    "features": [
      "Alto desempenho com processador Intel Core i5 de 12ª geração",
      "Multitarefa fluida com 8GB de memória DDR4",
      "SSD NVMe de 512GB com alta velocidade e maior espaço",
      "Sistema Linux Ubuntu leve, seguro e pronto para uso",
      "Conectividade Wi-Fi e Bluetooth integrada",
      "Design compacto e elegante para qualquer ambiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336090"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-b500-white-i5-1235u-8gb-512gb-nvme-linux-ubuntu",
    "productUrl": "https://www.pcyes.com.br/mini-computador-b500-white-i5-1235u-8gb-512gb-nvme-linux-ubuntu",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 59,
    "sku": "336098",
    "name": "Mini Computador B300 White i5-1235U 8GB DDR4 SSD 256GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.9,
    "reviews": 83,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336098/3B90ECBA7AD9F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336098/3B90ECBA7AD9F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336098/3B90ECBA7ADAF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336098/3B90ECBA7ADBF7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador B300 White i5-1235U 3.30 GHz com 8GB DDR4 e SSD 256GB NVMe com Windows 11 Pro é a escolha ideal para quem busca desempenho eficiente em um formato compacto. Equipado com processador Intel Core i5-1235U, oferece excelente performance para multitarefas, garantindo fluidez no uso diár…",
    "features": [
      "Desempenho rápido com processador Intel Core i5 de 12ª geração",
      "Multitarefa fluida com 8GB de memória DDR4",
      "SSD NVMe de 256GB para inicialização e carregamento rápidos",
      "Sistema Windows 11 Pro pronto para produtividade",
      "Conectividade Wi-Fi e Bluetooth integrada",
      "Design compacto que economiza espaço no setup"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336098"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-b300-white-i5-1235u-8gb-256gb-nvme-windows-11-pro",
    "productUrl": "https://www.pcyes.com.br/mini-computador-b300-white-i5-1235u-8gb-256gb-nvme-windows-11-pro",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 60,
    "sku": "336088",
    "name": "Mini Computador PCYES B300 White Intel i5 1235U 8GB SSD 256GB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.4,
    "reviews": 120,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336088/3B90ECBA7AD1F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336088/3B90ECBA7AD1F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336088/3B90ECBA7AD2F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336088/3B90ECBA7AD3F7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador PCYES B300 White Intel i5 1235U 8GB SSD 256GB NVMe Linux Ubuntu é uma solução compacta e eficiente para quem busca desempenho equilibrado, agilidade e praticidade no dia a dia.\n\nEquipado com o processador Intel Core i5-1235U, entrega ótima performance para multitarefas, aplicaçõe…",
    "features": [
      "Processador Intel Core i5-1235U",
      "Memória 8GB DDR4",
      "SSD NVMe 256GB de alta velocidade",
      "Sistema operacional Linux Ubuntu",
      "Design compacto na cor branca",
      "Alto desempenho para uso diário",
      "Ideal para trabalho, estudos e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336088"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i5-1235u-8gb-ssd-256gb-linux",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i5-1235u-8gb-ssd-256gb-linux",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 61,
    "sku": "336109",
    "name": "Mini Computador PCYES B300 White Intel i5 1235U 8GB SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.5,
    "reviews": 157,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336109/3B90ECBA7ADDF7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336109/3B90ECBA7ADDF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336109/3B90ECBA7ADEF7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336109/3B90ECBA7ADFF7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador PCYES B300 White Intel i5 1235U 8GB SSD 512GB NVMe Windows 11 Pro é uma solução moderna para quem busca alto desempenho, rapidez e excelente capacidade de armazenamento em um formato compacto.\n\nEquipado com o processador Intel Core i5-1235U, entrega ótima performance para multita…",
    "features": [
      "Processador Intel Core i5-1235U",
      "Memória 8GB DDR4",
      "SSD NVMe 512GB de alta velocidade",
      "Sistema operacional Windows 11 Pro",
      "Wi-Fi e Bluetooth integrados",
      "Design compacto na cor branca",
      "Ideal para trabalho, estudos e uso profissional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336109"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i5-1235u-8gb-ssd-512gb-windows",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i5-1235u-8gb-ssd-512gb-windows",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 62,
    "sku": "294716",
    "name": "Mini Computador PCYES B500 Intel i5 1235U 16GB SSD 512GB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.6,
    "reviews": 194,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/294716/498D4BB0B9E0EA6DE0630300A8C0727B",
    "images": [
      "https://cdn.oderco.com.br/produtos/294716/498D4BB0B9E0EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/294716/498D4BB0B9E1EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/294716/498D4BB0B9E2EA6DE0630300A8C0727B"
    ],
    "description": "O Mini Computador PCYES B500 Intel i5 1235U 16GB SSD 512GB NVMe Linux Ubuntu é a escolha ideal para quem busca alto desempenho, maior capacidade de memória e eficiência no dia a dia.\n\nEquipado com o processador Intel Core i5-1235U Deca Core, oferece excelente performance para multitarefas, aplicaç…",
    "features": [
      "Processador Intel Core i5-1235U Deca Core",
      "Memória 16GB DDR4",
      "SSD NVMe 512GB de alta velocidade",
      "Sistema operacional Linux Ubuntu",
      "Alto desempenho para multitarefas",
      "Design compacto e eficiente",
      "Ideal para trabalho, estudos e uso profissional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "294716"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b500-i5-1235u-16gb-ssd-512gb-linux",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b500-i5-1235u-16gb-ssd-512gb-linux",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 63,
    "sku": "294723",
    "name": "Mini Computador PCYES B500 Intel i5 1235U 16GB SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.7,
    "reviews": 231,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/294723/498D4BB0B9DAEA6DE0630300A8C0727B",
    "images": [
      "https://cdn.oderco.com.br/produtos/294723/498D4BB0B9DAEA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/294723/498D4BB0B9DBEA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/294723/498D4BB0B9DCEA6DE0630300A8C0727B"
    ],
    "description": "O Mini Computador PCYES B500 Intel i5 1235U 16GB SSD 512GB NVMe Windows 11 Pro é uma solução completa para quem busca alto desempenho, maior capacidade de memória e rapidez no dia a dia.\n\nEquipado com o processador Intel Core i5-1235U Deca Core, oferece excelente performance em multitarefas, aplic…",
    "features": [
      "Processador Intel Core i5-1235U Deca Core",
      "Memória 16GB DDR4",
      "SSD NVMe 512GB de alta velocidade",
      "Sistema operacional Windows 11 Pro",
      "Wi-Fi e Bluetooth integrados",
      "Alto desempenho para multitarefas",
      "Design compacto e eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "294723"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b500-i5-1235u-16gb-ssd-512gb-windows",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b500-i5-1235u-16gb-ssd-512gb-windows",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 64,
    "sku": "336093",
    "name": "Mini Computador PCYES B300 White Intel i3 1215U 8GB SSD 256GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.8,
    "reviews": 268,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/336093/3B90ECBA7AC1F7BAE0630300A8C00392",
    "images": [
      "https://cdn.oderco.com.br/produtos/336093/3B90ECBA7AC1F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336093/3B90ECBA7AC2F7BAE0630300A8C00392",
      "https://cdn.oderco.com.br/produtos/336093/3B90ECBA7AC3F7BAE0630300A8C00392"
    ],
    "description": "O Mini Computador PCYES B300 White Intel i3 1215U 8GB SSD 256GB NVMe Windows 11 Pro é a solução ideal para quem busca desempenho eficiente, rapidez e praticidade em um formato compacto.\n\nEquipado com o processador Intel Core i3-1215U Hexa Core, oferece ótima performance para tarefas do dia a dia, …",
    "features": [
      "Processador Intel Core i3-1215U Hexa Core",
      "Memória 8GB DDR4",
      "SSD NVMe 256GB de alta velocidade",
      "Sistema operacional Windows 11 Pro",
      "Wi-Fi e Bluetooth integrados",
      "Design compacto na cor branca",
      "Ideal para trabalho, estudos e uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "336093"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b300-i3-1215u-8gb-ssd-256gb-windows",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b300-i3-1215u-8gb-ssd-256gb-windows",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 65,
    "sku": "293971",
    "name": "Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 512GB NVMe Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.9,
    "reviews": 305,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293971/4999E7FE7349F2BEE0630300A8C0A777",
    "images": [
      "https://cdn.oderco.com.br/produtos/293971/4999E7FE7349F2BEE0630300A8C0A777",
      "https://cdn.oderco.com.br/produtos/293971/4999E7FE734AF2BEE0630300A8C0A777",
      "https://cdn.oderco.com.br/produtos/293971/4999E7FE734BF2BEE0630300A8C0A777"
    ],
    "description": "O Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 512GB NVMe Linux Ubuntu foi projetado para oferecer desempenho moderno, rapidez e amplo armazenamento em um formato compacto e eficiente.\n\nEquipado com o processador Intel Core i5-1235U Deca Core, entrega excelente performance para multitarefas, …",
    "features": [
      "Processador Intel Core i5-1235U Deca Core",
      "Memória 8GB DDR4",
      "SSD NVMe 512GB de alta velocidade",
      "Sistema operacional Linux Ubuntu",
      "Design compacto e moderno",
      "Alto desempenho para multitarefas",
      "Ideal para trabalho, estudos e uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293971"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b500-i5-1235u-8gb-ssd-512gb-linux",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b500-i5-1235u-8gb-ssd-512gb-linux",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 66,
    "sku": "293966",
    "name": "Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 512GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.4,
    "reviews": 342,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293966/29B31D8CED00D6C8E0630300A8C0D42C",
    "images": [
      "https://cdn.oderco.com.br/produtos/293966/29B31D8CED00D6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/293966/29B31D8CED01D6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/293966/29B31D8CED02D6C8E0630300A8C0D42C"
    ],
    "description": "O Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 512GB NVMe Windows 11 Pro foi desenvolvido para oferecer alto desempenho, rapidez e maior capacidade de armazenamento em um formato compacto e eficiente.\n\nEquipado com o processador Intel Core i5-1235U Deca Core, entrega excelente performance par…",
    "features": [
      "Processador Intel Core i5-1235U Deca Core",
      "Memória 8GB DDR4",
      "SSD NVMe 512GB de alta velocidade",
      "Sistema operacional Windows 11 Pro",
      "Wi-Fi e Bluetooth integrados",
      "Design compacto e moderno",
      "Ideal para trabalho, estudos e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293966"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b500-i5-1235u-8gb-ssd-512gb-windows",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b500-i5-1235u-8gb-ssd-512gb-windows",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 2127,89",
    "oldPriceNum": 2127.89
  },
  {
    "id": 67,
    "sku": "294051",
    "name": "Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 256GB NVMe Windows 11 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.5,
    "reviews": 379,
    "category": "Computadores",
    "subcategory": "Mini Computador",
    "tags": [
      "Computadores",
      "Mini Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/294051/29B31D8CECF4D6C8E0630300A8C0D42C",
    "images": [
      "https://cdn.oderco.com.br/produtos/294051/29B31D8CECF4D6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/294051/29B31D8CECF5D6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/294051/29B31D8CECF6D6C8E0630300A8C0D42C"
    ],
    "description": "O Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 256GB NVMe Windows 11 Pro é a escolha ideal para quem busca desempenho moderno, rapidez e praticidade em um formato compacto.\n\nEquipado com o processador Intel Core i5-1235U Deca Core, entrega excelente performance para multitarefas, aplicações p…",
    "features": [
      "Processador Intel Core i5-1235U Deca Core",
      "Memória 8GB DDR4",
      "Armazenamento SSD NVMe 256GB",
      "Sistema operacional Windows 11 Pro",
      "Wi-Fi e Bluetooth integrados",
      "Design compacto e moderno",
      "Ideal para trabalho, estudos e home office"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "294051"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini Computador"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b500-i5-1235u-8gb-ssd-256gb-windows",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b500-i5-1235u-8gb-ssd-256gb-windows",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 68,
    "sku": "293948",
    "name": "Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 256GB NVMe Wi-Fi Bluetooth Linux",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.6,
    "reviews": 416,
    "category": "Computadores",
    "subcategory": "Mini PC",
    "tags": [
      "Computadores",
      "Mini PC",
      "Wireless"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293948/29B31D8CECEED6C8E0630300A8C0D42C",
    "images": [
      "https://cdn.oderco.com.br/produtos/293948/29B31D8CECEED6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/293948/29B31D8CECEFD6C8E0630300A8C0D42C",
      "https://cdn.oderco.com.br/produtos/293948/29B31D8CECF0D6C8E0630300A8C0D42C"
    ],
    "description": "O Mini Computador PCYES B500 Intel i5 1235U 8GB SSD 256GB NVMe Linux é uma solução moderna e compacta para quem busca alto desempenho com economia de espaço.\n\nEquipado com o processador Intel Core i5-1235U deca-core, oferece excelente performance para multitarefas, aplicações profissionais, navega…",
    "features": [
      "Processador Intel Core i5-1235U (Deca-core)",
      "Memória 8GB DDR4",
      "SSD 256GB NVMe de alta velocidade",
      "Wi-Fi e Bluetooth integrados",
      "Sistema Linux Ubuntu",
      "Design compacto e moderno",
      "Ideal para trabalho, empresas e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293948"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mini PC"
      }
    ],
    "seoSlug": "mini-computador-pcyes-b500-i5-1235u-8gb-ssd-256gb",
    "productUrl": "https://www.pcyes.com.br/mini-computador-pcyes-b500-i5-1235u-8gb-ssd-256gb",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 69,
    "sku": "293785",
    "name": "Computador PCYES One B300 Intel i3 3220 8GB SSD 256GB Linux Ubuntu",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.7,
    "reviews": 453,
    "category": "Computadores",
    "subcategory": "Computador",
    "tags": [
      "Computadores",
      "Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293785/2BEBD87A195F2A70E0630300A8C01684",
    "images": [
      "https://cdn.oderco.com.br/produtos/293785/2BEBD87A195F2A70E0630300A8C01684",
      "https://cdn.oderco.com.br/produtos/293785/2BEBD87A195E2A70E0630300A8C01684",
      "https://cdn.oderco.com.br/produtos/293785/2BEBD87A19602A70E0630300A8C01684"
    ],
    "description": "O Computador PCYES One B300 Intel i3 3220 8GB SSD 256GB Linux Ubuntu é uma solução prática e eficiente para quem busca desempenho confiável no dia a dia, seja para estudos, trabalho ou uso doméstico.\n\nEquipado com o processador Intel Core i3-3220 de 3.30GHz, oferece boa performance para tarefas es…",
    "features": [
      "Processador Intel Core i3 3.30GHz",
      "Memória 8GB DDR3",
      "Armazenamento SSD 256GB",
      "Sistema operacional Linux Ubuntu",
      "Design compacto Mini ITX",
      "Inicialização rápida e desempenho ágil",
      "Ideal para trabalho, estudos e uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293785"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Computador"
      }
    ],
    "seoSlug": "computador-pcyes-one-b300-i3-8gb-ssd-256gb-linux",
    "productUrl": "https://www.pcyes.com.br/computador-pcyes-one-b300-i3-8gb-ssd-256gb-linux",
    "inStock": true
  },
  {
    "id": 70,
    "sku": "293950",
    "name": "Computador PCYES One B300 Intel i3 3220 8GB SSD 256GB Windows 10 Pro",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.8,
    "reviews": 60,
    "category": "Computadores",
    "subcategory": "Computador",
    "tags": [
      "Computadores",
      "Computador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/293950/498D4BB0B9C2EA6DE0630300A8C0727B",
    "images": [
      "https://cdn.oderco.com.br/produtos/293950/498D4BB0B9C2EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293950/498D4BB0B9C1EA6DE0630300A8C0727B",
      "https://cdn.oderco.com.br/produtos/293950/498D4BB0B9C3EA6DE0630300A8C0727B"
    ],
    "description": "O Computador PCYES One B300 Intel i3 3220 8GB SSD 256GB Windows 10 Pro foi desenvolvido para oferecer desempenho confiável e eficiência no dia a dia, sendo ideal para tarefas profissionais, estudos e uso doméstico.\n\nEquipado com processador Intel Core i3 de 3ª geração, aliado a 8GB de memória DDR3…",
    "features": [
      "Processador Intel Core i3 3.30GHz",
      "Memória 8GB DDR3",
      "Armazenamento SSD 256GB",
      "Sistema operacional Windows 10 Pro",
      "Design compacto Mini ITX",
      "Ideal para trabalho, estudos e uso diário",
      "Inicialização rápida e bom desempenho geral"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "293950"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Computador"
      }
    ],
    "seoSlug": "computador-pcyes-one-b300-i3-8gb-ssd-256gb",
    "productUrl": "https://www.pcyes.com.br/computador-pcyes-one-b300-i3-8gb-ssd-256gb",
    "inStock": true,
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 71,
    "sku": "34394",
    "name": "Cabo Áudio 2 RCA para P2 3.5mm PCYES 2M Estéreo P2R35-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 97,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34394/BEF41FFD33B1FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/34394/BEF41FFD33B1FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/34394/BEF41FFD33B2FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/34394/BEF41FFD33B0FC48E055DEF401E782F4"
    ],
    "description": "O Cabo de Áudio 2 RCA para P2 3.5mm PCYES 2M Estéreo P2R35-2 foi desenvolvido para oferecer conexão prática e transmissão de áudio com qualidade, sendo ideal para integrar diferentes dispositivos de som no dia a dia.\n\nCompatível com caixas de som, TVs, rádios, DVDs e outros equipamentos, permite c…",
    "features": [
      "Conexão 2 RCA macho para P2 3.5mm macho",
      "Áudio estéreo com boa qualidade",
      "Comprimento de 2 metros",
      "Construção com cobre puro 28 AWG",
      "Transmissão estável de sinal",
      "Compatível com diversos dispositivos",
      "Instalação simples e prática"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34394"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-2-rca-para-p2-3-5mm-2m",
    "productUrl": "https://www.pcyes.com.br/cabo-2-rca-para-p2-3-5mm-2m",
    "inStock": true
  },
  {
    "id": 72,
    "sku": "286138",
    "name": "Teclado Mecânico PCYES Arkeum Black Vulcan Blue Switch AKBV75BBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 134,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286138/47CD45D356988A3EE0630300A8C0C7F2",
    "images": [
      "https://cdn.oderco.com.br/produtos/286138/47CD45D356988A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286138/47CD45D356998A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286138/47CD45D3569A8A3EE0630300A8C0C7F2"
    ],
    "description": "O Teclado Mecânico Arkeum PCYES Black Vulcan Blue Switch AKBV75BBR é o aliado ideal para quem busca desempenho, durabilidade e visual marcante no setup.\n\nSeu formato 75% com 82 teclas + knob oferece excelente aproveitamento de espaço, mantendo o layout ABNT2 para máxima praticidade no dia a dia e …",
    "features": [
      "Formato compacto 75% com 82 teclas + knob.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Blue com clique audível e resposta tátil.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Taxa de resposta de 1ms.",
      "Keycaps tri-color Doubleshot Injection mais duráveis.",
      "Iluminação Rainbow em blocos para setup gamer.",
      "Cabo removível USB 1,8m USB x Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286138"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-pcyes-black-vulcan-blue-switch-akbv75bbr",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-pcyes-black-vulcan-blue-switch-akbv75bbr",
    "inStock": true,
    "badge": "BLUE SWITCH"
  },
  {
    "id": 73,
    "sku": "286141",
    "name": "Teclado Mecânico PCYES Arkeum White Ghost Red Switch AKWG75RBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 171,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286141/47CD45D356AA8A3EE0630300A8C0C7F2",
    "images": [
      "https://cdn.oderco.com.br/produtos/286141/47CD45D356AA8A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286141/47CD45D356AB8A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286141/47CD45D356AC8A3EE0630300A8C0C7F2"
    ],
    "description": "O Teclado Mecânico Arkeum PCYES White Ghost Red Switch AKWG75RBR é a escolha ideal para quem busca desempenho rápido, conforto e um visual moderno no setup.\n\nSeu formato compacto 75% com 82 teclas + knob garante melhor aproveitamento de espaço, mantendo o layout ABNT2 para máxima praticidade no us…",
    "features": [
      "Formato compacto 75% com 82 teclas + knob.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Red com acionamento linear e silencioso.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps tri-color Doubleshot Injection mais duráveis.",
      "Iluminação Rainbow em blocos para setup gamer.",
      "Cabo removível USB 1,8m USB x Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286141"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-pcyes-white-ghost-red-switch-akwg75rbr",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-pcyes-white-ghost-red-switch-akwg75rbr",
    "inStock": true,
    "badge": "RED SWITCH"
  },
  {
    "id": 74,
    "sku": "286139",
    "name": "Teclado Mecânico PCYES Arkeum Black Vulcan Red Switch AKBV75RBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 208,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286139/47CD45D3569E8A3EE0630300A8C0C7F2",
    "images": [
      "https://cdn.oderco.com.br/produtos/286139/47CD45D3569E8A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286139/47CD45D3569F8A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286139/47CD45D356A08A3EE0630300A8C0C7F2"
    ],
    "description": "O Teclado Mecânico Arkeum PCYES Black Vulcan Red Switch AKBV75RBR é ideal para quem busca desempenho, conforto e visual marcante no setup.\n\nSeu formato 75% com 82 teclas + knob garante excelente aproveitamento de espaço, mantendo o layout ABNT2 para máxima praticidade em jogos e uso diário.\n\nEqu…",
    "features": [
      "Formato compacto 75% com 82 teclas + knob.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Red com acionamento linear e silencioso.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Taxa de resposta de 1ms.",
      "Keycaps tri-color Doubleshot Injection mais duráveis.",
      "Iluminação Rainbow em blocos para setup gamer.",
      "Cabo removível USB 1,8m USB x Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286139"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-pcyes-black-vulcan-red-switch-akbv75rbr",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-pcyes-black-vulcan-red-switch-akbv75rbr",
    "inStock": true,
    "badge": "RED SWITCH"
  },
  {
    "id": 75,
    "sku": "286140",
    "name": "Teclado Mecânico PCYES Arkeum White Ghost Blue Switch AKWG75BBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.7,
    "reviews": 245,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286140/47CD45D356A48A3EE0630300A8C0C7F2",
    "images": [
      "https://cdn.oderco.com.br/produtos/286140/47CD45D356A48A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286140/47CD45D356A58A3EE0630300A8C0C7F2",
      "https://cdn.oderco.com.br/produtos/286140/47CD45D356A68A3EE0630300A8C0C7F2"
    ],
    "description": "O Teclado Mecânico Arkeum PCYES White Ghost Blue Switch AKWG75BBR é ideal para quem busca desempenho, resposta tátil precisa e um visual moderno no setup.\n\nSeu formato 75% com 82 teclas + knob oferece excelente aproveitamento de espaço, mantendo o layout ABNT2 para máxima praticidade no uso diário…",
    "features": [
      "Formato compacto 75% com 82 teclas + knob.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Blue com clique audível e resposta tátil.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Taxa de resposta de 1ms.",
      "Keycaps tri-color Doubleshot Injection mais duráveis.",
      "Iluminação Rainbow em blocos para setup gamer.",
      "Cabo removível USB 1,8m USB x Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286140"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-pcyes-white-ghost-blue-switch-akwg75bbr",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-pcyes-white-ghost-blue-switch-akwg75bbr",
    "inStock": true,
    "badge": "BLUE SWITCH",
    "oldPrice": "R$ 471,88",
    "oldPriceNum": 471.88
  },
  {
    "id": 76,
    "sku": "317925",
    "name": "Teclado Mecânico PCYES Zecky Black Vulcan 100% ABNT2 Outemu Red RGB PTZKBVRD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.8,
    "reviews": 282,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317925/4BA9EFA0F98AC2B4E0630300A8C04DFD",
    "images": [
      "https://cdn.oderco.com.br/produtos/317925/4BA9EFA0F98AC2B4E0630300A8C04DFD",
      "https://cdn.oderco.com.br/produtos/317925/4BA9EFA0F98CC2B4E0630300A8C04DFD",
      "https://cdn.oderco.com.br/produtos/317925/4BA9EFA0F989C2B4E0630300A8C04DFD"
    ],
    "description": "O Teclado Mecânico Zecky Black Vulcan foi desenvolvido para quem busca desempenho, conforto e um layout completo para diferentes cenários. Ideal para trabalho e jogos, seu formato 100% com padrão ABNT2 oferece praticidade e versatilidade no dia a dia.\n\nEquipado com switches Outemu Red, proporciona…",
    "features": [
      "Layout completo 100% com padrão ABNT2",
      "Switch Outemu Red com acionamento suave e silencioso",
      "Anti-ghosting de até 26 teclas para maior precisão",
      "Iluminação Rainbow com visual moderno",
      "Keycaps doubleshot resistentes e duráveis",
      "Knob multifuncional para controle prático",
      "Cabo removível USB-C para maior versatilidade",
      "Ideal para trabalho, produtividade e jogos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317925"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-zecky-black-vulcan-100-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-zecky-black-vulcan-100-red",
    "inStock": true
  },
  {
    "id": 77,
    "sku": "317922",
    "name": "Teclado Mecânico PCYES Zecky Black Vulcan 100% ABNT2 Outemu Blue RGB PTZKBVBL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.9,
    "reviews": 319,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317922/4BA9EFA0F985C2B4E0630300A8C04DFD",
    "images": [
      "https://cdn.oderco.com.br/produtos/317922/4BA9EFA0F985C2B4E0630300A8C04DFD",
      "https://cdn.oderco.com.br/produtos/317922/4BA9EFA0F987C2B4E0630300A8C04DFD",
      "https://cdn.oderco.com.br/produtos/317922/4BA9EFA0F984C2B4E0630300A8C04DFD"
    ],
    "description": "O Teclado Mecânico Zecky Black Vulcan foi desenvolvido para quem busca desempenho, durabilidade e um layout completo para diferentes cenários. Ideal para trabalho e jogos, seu formato 100% com padrão ABNT2 garante praticidade e funcionalidade no dia a dia.\n\nEquipado com switches Outemu Blue, ofere…",
    "features": [
      "Layout completo 100% com padrão ABNT2",
      "Switch Outemu Blue com resposta tátil e clique audível",
      "Anti-ghosting de até 26 teclas para precisão em comandos",
      "Iluminação Rainbow com visual moderno",
      "Keycaps doubleshot resistentes e duráveis",
      "Knob multifuncional para controle prático",
      "Cabo removível USB-C para maior versatilidade",
      "Ideal para trabalho, digitação e jogos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317922"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-zecky-black-vulcan-100-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-zecky-black-vulcan-100-blue",
    "inStock": true,
    "oldPrice": "R$ 447,89",
    "oldPriceNum": 447.89
  },
  {
    "id": 78,
    "sku": "286146",
    "name": "Teclado Mecânico PCYES Arkeum Summit Edition 75% ABNT2 Switch Red AKSM75RBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 356,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286146/4B9572B75F67C341E0630300A8C022D7",
    "images": [
      "https://cdn.oderco.com.br/produtos/286146/4B9572B75F67C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286146/4B9572B75F68C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286146/25C7064E389CE6C2E0630300A8C0EDA5"
    ],
    "description": "A Teclado Mecânico PCYES Arkeum Summit Edition Switch Red AKSM75RBR foi desenvolvido para oferecer precisão e durabilidade excepcionais, sendo perfeito para gamers e profissionais que desejam desempenho confiável e um visual diferenciado no setup.\n\nCom layout 75% e formato compacto ABNT2, proporci…",
    "features": [
      "Switch Outemu Red com alta durabilidade",
      "Formato compacto 75% com 82 teclas + Knob",
      "Layout ABNT2 adaptável e prático",
      "Keycaps Tri-color com design exclusivo",
      "Anti-ghosting de até 25 teclas",
      "Iluminação fixa single color",
      "Cabo removível USB x Type C 1,8 m"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286146"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-summit-75-abnt2-switch-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-summit-75-abnt2-switch-red",
    "inStock": true
  },
  {
    "id": 79,
    "sku": "286147",
    "name": "Teclado Mecânico PCYES Arkeum Cammo Edition 75% ABNT2 Switch Blue AKCM75BBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 393,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286147/4B9572B75F5DC341E0630300A8C022D7",
    "images": [
      "https://cdn.oderco.com.br/produtos/286147/4B9572B75F5DC341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286147/4B9572B75F5EC341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286147/25C7064E38A6E6C2E0630300A8C0EDA5"
    ],
    "description": "A Teclado Mecânico PCYES Arkeum Cammo Edition Switch Blue AKCM75BBR foi desenvolvido para oferecer precisão e durabilidade excepcionais, sendo ideal para gamers e profissionais que buscam desempenho confiável e um visual diferenciado no setup.\n\nCom layout 75% e formato compacto ABNT2, proporciona …",
    "features": [
      "Switch Outemu Blue com alta durabilidade",
      "Formato compacto 75% com 82 teclas + Knob",
      "Layout ABNT2 adaptável e prático",
      "Keycaps Tri-color com design exclusivo",
      "Anti-ghosting de até 25 teclas",
      "Iluminação fixa single color",
      "Cabo removível USB x Type C 1,8 m"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286147"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-cammo-75-abnt2-switch-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-cammo-75-abnt2-switch-blue",
    "inStock": true
  },
  {
    "id": 80,
    "sku": "286144",
    "name": "Teclado Mecânico PCYES Arkeum Summit Edition 75% ABNT2 Switch Blue AKSM75BBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 430,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286144/4B9572B75F62C341E0630300A8C022D7",
    "images": [
      "https://cdn.oderco.com.br/produtos/286144/4B9572B75F62C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286144/4B9572B75F64C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286144/25C7064E38A5E6C2E0630300A8C0EDA5"
    ],
    "description": "A Teclado Mecânico PCYES Arkeum Summit Edition Switch Blue AKSM75BBR foi desenvolvido para proporcionar precisão e durabilidade excepcionais, sendo ideal para gamers e profissionais que buscam desempenho confiável e estilo no setup.\n\nSeu layout 75% e formato compacto ABNT2 permite mais espaço na m…",
    "features": [
      "Layout compacto 75% ABNT2 que economiza espaço",
      "Switch Outemu Blue com resposta rápida e durabilidade elevada",
      "Anti-ghosting de até 25 teclas para precisão máxima",
      "Keycaps tri-color double shot com design exclusivo",
      "Cabo removível USB x Type C de 1,8 m",
      "Iluminação fixa single color para estilo no setup",
      "Formato de 82 teclas + Knob ideal para gaming e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286144"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-summit-75-abnt2-switch-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-summit-75-abnt2-switch-blue",
    "inStock": true,
    "oldPrice": "R$ 471,88",
    "oldPriceNum": 471.88
  },
  {
    "id": 81,
    "sku": "286149",
    "name": "Teclado Mecânico PCYES Arkeum Cammo Edition 75% ABNT2 Switch Red AKCM75RBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.7,
    "reviews": 467,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286149/4B9572B75F58C341E0630300A8C022D7",
    "images": [
      "https://cdn.oderco.com.br/produtos/286149/4B9572B75F58C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286149/4B9572B75F59C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286149/25C7064E38A7E6C2E0630300A8C0EDA5"
    ],
    "description": "A Teclado Mecânico PCYES Arkeum Cammo Edition Switch Red AKCM75RBR foi desenvolvido para oferecer precisão e durabilidade excepcionais, sendo perfeito para gamers e profissionais que desejam desempenho confiável e um visual diferenciado no setup.\n\nCom layout 75% e formato compacto ABNT2, proporcio…",
    "features": [
      "Switch Outemu Red com alta durabilidade",
      "Formato compacto 75% com 82 teclas + Knob",
      "Layout ABNT2 adaptável e prático",
      "Keycaps Tri-color com design exclusivo",
      "Anti-ghosting de até 25 teclas",
      "Iluminação fixa single color",
      "Cabo removível USB x Type C 1,8 m"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286149"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-cammo-75-abnt2-switch-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-cammo-75-abnt2-switch-red",
    "inStock": true
  },
  {
    "id": 82,
    "sku": "29319",
    "name": "Cabo VGA 15 Pinos PCYES 5M 1280x1024 Analógico PVM15-5",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 74,
    "category": "Periféricos",
    "subcategory": "Cabo de Video",
    "tags": [
      "Periféricos",
      "Cabo de Video"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29319/49D848F3959F8A12E0630300A8C0EA50",
    "images": [
      "https://cdn.oderco.com.br/produtos/29319/49D848F3959F8A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/29319/49D848F395A08A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/29319/49D848F3959E8A12E0630300A8C0EA50"
    ],
    "description": "O Cabo VGA 15 Pinos PCYES 5M 1280x1024 Analógico PVM15-5 foi desenvolvido para oferecer transmissão de vídeo estável e compatibilidade com diversos dispositivos, sendo ideal para monitores, computadores, notebooks e TVs com entrada VGA.\n\nCom suporte a resolução de até 1280x1024, garante boa qualid…",
    "features": [
      "Conexão VGA 15 pinos macho para macho",
      "Transmissão de vídeo analógico",
      "Resolução de até 1280x1024",
      "Comprimento de 5 metros",
      "Construção com cobre puro 28 AWG",
      "Conexão estável e confiável",
      "Compatível com diversos dispositivos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29319"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Video"
      }
    ],
    "seoSlug": "cabo-vga-15-pinos-5m-1280x1024",
    "productUrl": "https://www.pcyes.com.br/cabo-vga-15-pinos-5m-1280x1024",
    "inStock": true
  },
  {
    "id": 83,
    "sku": "32610",
    "name": "Cabo Adaptador OTG Micro USB para USB A PCYES 15CM PAMUP-15",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 111,
    "category": "Periféricos",
    "subcategory": "Adaptador OTG",
    "tags": [
      "Periféricos",
      "Adaptador OTG"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32610/447FEF48C83A4865E0630300A8C0010D",
    "images": [
      "https://cdn.oderco.com.br/produtos/32610/447FEF48C83A4865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/32610/447FEF48C83B4865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/32610/447FEF48C8394865E0630300A8C0010D"
    ],
    "description": "O Cabo Adaptador OTG Micro USB para USB A PCYES 15CM PAMUP-15 foi desenvolvido para oferecer mais praticidade na conexão de dispositivos USB ao seu smartphone ou tablet, ampliando as possibilidades de uso no dia a dia.\n\nCom suporte à tecnologia OTG (On-The-Go), permite conectar diretamente pendriv…",
    "features": [
      "Adaptador Micro USB para USB A fêmea",
      "Suporte à função OTG",
      "Transferência de dados até 480 Mbps",
      "Comprimento de 15 cm",
      "Compacto e fácil de transportar",
      "Construção com cobre 28 AWG",
      "Compatível com diversos dispositivos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32610"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador OTG"
      }
    ],
    "seoSlug": "cabo-adaptador-otg-micro-usb-para-usb-a-15cm",
    "productUrl": "https://www.pcyes.com.br/cabo-adaptador-otg-micro-usb-para-usb-a-15cm",
    "inStock": true
  },
  {
    "id": 84,
    "sku": "34396",
    "name": "Cabo PCYES Mini DisplayPort para HDMI 2.0 2M Full HD PMDPH-2",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.4,
    "reviews": 148,
    "category": "SSD e HD",
    "subcategory": "Cabo",
    "tags": [
      "SSD e HD",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34396/44801E8A38D2CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/34396/44801E8A38D2CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/34396/44801E8A38D3CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/34396/44801E8A38D1CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo Mini DisplayPort para HDMI 2.0 PCYES 2M Full HD PMDPH-2 é a solução ideal para quem precisa conectar dispositivos com saída Mini DisplayPort a entradas HDMI, como TVs, monitores e projetores.\n\nPerfeito para notebooks, ultrabooks e placas de vídeo compatíveis, permite transmitir imagem em al…",
    "features": [
      "Conexão Mini DisplayPort para HDMI 2.0",
      "Transmissão de áudio e vídeo no mesmo cabo",
      "Resolução Full HD para boa qualidade de imagem",
      "Comprimento de 2 metros",
      "Construção com cobre puro",
      "Conexão estável e confiável",
      "Ideal para notebooks e monitores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34396"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-mini-displayport-para-hdmi-2m-pmdph-2",
    "productUrl": "https://www.pcyes.com.br/cabo-mini-displayport-para-hdmi-2m-pmdph-2",
    "inStock": true
  },
  {
    "id": 85,
    "sku": "32604",
    "name": "Cabo PCYES USB-C para USB-C 2.0 2M 3A PUCP-02",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 185,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32604/44801E8A38F9CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/32604/44801E8A38F9CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32604/44801E8A38FACC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32604/44801E8A38F8CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB-C para USB-C 2.0 PCYES 2M 3A PUCP-02 foi desenvolvido para oferecer carregamento eficiente e transferência de dados estável, sendo ideal para smartphones, tablets e outros dispositivos com conexão USB-C.\n\nCom suporte a corrente de até 5V 3A (15W), garante carregamento seguro para uso no…",
    "features": [
      "Conexão USB-C para USB-C 2.0",
      "Corrente de até 3A (15W)",
      "Transferência de dados até 480 Mbps",
      "Cabo bi-direcional",
      "Comprimento de 2 metros",
      "Construção com cobre puro 28 AWG",
      "Ideal para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32604"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-usb-c-2m-3a",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-usb-c-2m-3a",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 86,
    "sku": "32603",
    "name": "Cabo USB-C para USB-C 2.0 PCYES 1M 65W 5A PUCP-01",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 222,
    "category": "Periféricos",
    "subcategory": "Cabo -C",
    "tags": [
      "Periféricos",
      "Cabo -C"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32603/44801E8A38EFCC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/32603/44801E8A38EFCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32603/44801E8A38F0CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32603/44801E8A38EECC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB-C para USB-C 2.0 PCYES 1M 65W 5A PUCP-01 foi desenvolvido para oferecer carregamento rápido e transferência de dados eficiente, sendo ideal para smartphones, notebooks, tablets e outros dispositivos com conexão USB-C.\n\nCom suporte a corrente de até 20V 5A (65W), permite carregamento ráp…",
    "features": [
      "Conexão USB-C para USB-C 2.0",
      "Suporte a carregamento rápido até 65W",
      "Corrente de até 5A",
      "Transferência de dados até 480 Mbps",
      "Cabo bi-direcional",
      "Construção com cobre puro 22 AWG",
      "Ideal para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32603"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo -C"
      }
    ],
    "seoSlug": "cabo-usb-c-para-usb-c-1m-65w",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-usb-c-1m-65w",
    "inStock": true
  },
  {
    "id": 87,
    "sku": "29318",
    "name": "Cabo VGA PCYES 3M 1280x1024 Analógico Vídeo PVM15-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 259,
    "category": "Periféricos",
    "subcategory": "Cabo de Vídeo",
    "tags": [
      "Escritório",
      "Periféricos",
      "Cabo de Vídeo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29318/447FEF48C85A4865E0630300A8C0010D",
    "images": [
      "https://cdn.oderco.com.br/produtos/29318/447FEF48C85A4865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29318/447FEF48C85B4865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29318/447FEF48C8594865E0630300A8C0010D"
    ],
    "description": "O Cabo VGA PCYES 3M 1280x1024 Analógico Vídeo foi desenvolvido para oferecer transmissão de vídeo estável e compatibilidade com diversos dispositivos, sendo ideal para monitores, computadores, notebooks e TVs com conexão VGA.\n\nProjetado para sinal analógico, garante boa qualidade de imagem em reso…",
    "features": [
      "Conexão VGA macho para macho",
      "Transmissão de vídeo analógico",
      "Resolução de até 1280x1024",
      "Comprimento de 3 metros",
      "Construção com cobre puro 28 AWG",
      "Conexão estável e confiável",
      "Compatível com diversos dispositivos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29318"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Vídeo"
      }
    ],
    "seoSlug": "cabo-vga-3m-1280x1024",
    "productUrl": "https://www.pcyes.com.br/cabo-vga-3m-1280x1024",
    "inStock": true
  },
  {
    "id": 88,
    "sku": "29308",
    "name": "Cabo HDMI PCYES 2.0 3M 4K 60Hz 18Gbps PHM20-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 296,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29308/49D848F395A48A12E0630300A8C0EA50",
    "images": [
      "https://cdn.oderco.com.br/produtos/29308/49D848F395A48A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/29308/49D848F395A58A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/29308/49D848F395A38A12E0630300A8C0EA50"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 3M 4K 60Hz 18Gbps PHM20-3 foi desenvolvido para oferecer alta qualidade de imagem e som, sendo ideal para TVs, monitores, videogames, notebooks e outros dispositivos com conexão HDMI.\n\nCom suporte a resolução 4K a 60Hz e largura de banda de até 18 Gbit/s, proporciona imagens …",
    "features": [
      "Conexão HDMI 2.0 macho para macho",
      "Suporte a resolução 4K (60Hz)",
      "Largura de banda de até 18 Gbit/s",
      "HDR estático para melhor qualidade de imagem",
      "Áudio LPCM até 32 canais",
      "Suporte a 3D e Ethernet",
      "Construção com cobre puro 30 AWG"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29308"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-0-3m-4k-60hz",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-0-3m-4k-60hz",
    "inStock": true,
    "badge": "4K",
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 89,
    "sku": "34380",
    "name": "Cabo Áudio 2 RCA para P2 3.5mm PCYES 1M Estéreo P2R35-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 333,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34380/447FEF48C8464865E0630300A8C0010D",
    "images": [
      "https://cdn.oderco.com.br/produtos/34380/447FEF48C8464865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/34380/447FEF48C8474865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/34380/447FEF48C8454865E0630300A8C0010D"
    ],
    "description": "O Cabo de Áudio 2 RCA para P2 3.5mm PCYES 1M Estéreo P2R35-1 foi desenvolvido para oferecer conexão prática e transmissão de áudio com qualidade, sendo ideal para integrar diferentes dispositivos de som no dia a dia.\n\nCompatível com caixas de som, TVs, rádios, DVDs e outros equipamentos, permite c…",
    "features": [
      "Conexão 2 RCA macho para P2 3.5mm macho",
      "Áudio estéreo com boa qualidade",
      "Comprimento de 1 metro",
      "Construção com cobre puro 28 AWG",
      "Transmissão estável de sinal",
      "Compatível com diversos dispositivos de áudio",
      "Instalação simples e prática"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34380"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-2-rca-para-p2-3-5mm-1m",
    "productUrl": "https://www.pcyes.com.br/cabo-2-rca-para-p2-3-5mm-1m",
    "inStock": true
  },
  {
    "id": 90,
    "sku": "29296",
    "name": "Cabo PCYES USB A 3.0 para Micro USB 3.0 5M 5Gbps PUAMCM3-5",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 370,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29296/44801E8A3903CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29296/44801E8A3903CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29296/44801E8A3904CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29296/44801E8A3902CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB A 3.0 para Micro USB 3.0 PCYES 5M 5Gbps PUAMCM3-5 foi desenvolvido para oferecer transferência de dados rápida e conexão confiável, sendo ideal para HDs e SSDs externos com entrada Micro USB B 3.0.\n\nCom tecnologia USB 3.0, permite taxas de transferência de até 5 Gbps, garantindo agilida…",
    "features": [
      "Conexão USB A 3.0 para Micro USB 3.0",
      "Transferência de até 5 Gbps",
      "Comprimento de 5 metros",
      "Ideal para HDs e SSDs externos",
      "Construção com cobre puro 24+28 AWG",
      "Conexão estável e confiável",
      "Uso prático em ambientes amplos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29296"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-micro-usb-3-0-5m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-micro-usb-3-0-5m",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 91,
    "sku": "29293",
    "name": "Cabo PCYES USB A 3.0 para Micro USB 3.0 1M 5Gbps PUAMCM3-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 407,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29293/4D264D266F9EFF2FE0630300A8C0B56D",
    "images": [
      "https://cdn.oderco.com.br/produtos/29293/4D264D266F9EFF2FE0630300A8C0B56D",
      "https://cdn.oderco.com.br/produtos/29293/4D264D266F9FFF2FE0630300A8C0B56D",
      "https://cdn.oderco.com.br/produtos/29293/4D264D266F9DFF2FE0630300A8C0B56D"
    ],
    "description": "O Cabo USB A 3.0 para Micro USB 3.0 PCYES 1M 5Gbps PUAMCM3-1 foi desenvolvido para oferecer transferência de dados rápida e conexão confiável, sendo ideal para HDs e SSDs externos com entrada Micro USB B 3.0.\n\nCom tecnologia USB 3.0, permite taxas de transferência de até 5 Gbps, garantindo agilida…",
    "features": [
      "Conexão USB A 3.0 para Micro USB 3.0",
      "Transferência de até 5 Gbps",
      "Comprimento de 1 metro",
      "Ideal para HDs e SSDs externos",
      "Construção com cobre puro 24+28 AWG",
      "Conexão estável e confiável",
      "Uso prático no dia a dia"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29293"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-micro-usb-3-0-1m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-micro-usb-3-0-1m",
    "inStock": true
  },
  {
    "id": 92,
    "sku": "29295",
    "name": "Cabo PCYES USB A 3.0 para Micro USB 3.0 3M 5Gbps PUAMCM3-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 444,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29295/44801E8A38FECC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29295/44801E8A38FECC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29295/44801E8A38FFCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29295/44801E8A38FDCC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB A 3.0 para Micro USB 3.0 PCYES 3M 5Gbps PUAMCM3-3 foi desenvolvido para oferecer transferência de dados rápida e conexão confiável, sendo ideal para HDs e SSDs externos compatíveis com entrada Micro USB B 3.0.\n\nCom tecnologia USB 3.0, permite taxas de transferência de até 5 Gbps, garant…",
    "features": [
      "Conexão USB A 3.0 para Micro USB 3.0",
      "Transferência de até 5 Gbps",
      "Comprimento de 3 metros",
      "Ideal para HDs e SSDs externos",
      "Construção com cobre puro 24+28 AWG",
      "Conexão estável e confiável",
      "Uso prático em ambientes profissionais e domésticos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29295"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-micro-usb-3-0-3m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-micro-usb-3-0-3m",
    "inStock": true
  },
  {
    "id": 93,
    "sku": "32625",
    "name": "Cabo PCYES USB-C para Micro USB 3.0 1M 5Gbps 3A P3UCMBP-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 51,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32625/44801E8A3908CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/32625/44801E8A3908CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32625/44801E8A3909CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32625/44801E8A3907CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB-C para Micro USB 3.0 PCYES 1M 5Gbps 3A P3UCMBP-1 foi desenvolvido para oferecer transferência de dados em alta velocidade e carregamento eficiente, sendo ideal para HDs externos e dispositivos compatíveis com Micro USB 3.0.\n\nCom conexão USB 3.0, permite taxas de transferência de até 5 G…",
    "features": [
      "Conexão USB-C para Micro USB 3.0",
      "Transferência de até 5 Gbps",
      "Corrente de até 3A (15W)",
      "Ideal para HD externo e dispositivos compatíveis",
      "Comprimento de 1 metro",
      "Construção com cobre de alta qualidade",
      "Conexão estável e confiável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32625"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-micro-usb-3-0-1m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-micro-usb-3-0-1m",
    "inStock": true
  },
  {
    "id": 94,
    "sku": "32600",
    "name": "Cabo PCYES USB A 2.0 para USB Tipo-C 50cm 3A Branco PUACB-05",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 88,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32600/44801E8A38EACC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/32600/44801E8A38EACC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32600/44801E8A38EBCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32600/44801E8A38E9CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB A 2.0 para USB Tipo-C PCYES 50cm 3A Branco PUACB-05 foi desenvolvido para oferecer carregamento eficiente e transferência de dados estável, sendo ideal para smartphones, tablets e dispositivos com entrada USB-C.\n\nCom design compacto e funcional, seu comprimento de 50 cm é perfeito para …",
    "features": [
      "Conexão USB A 2.0 para USB Tipo-C",
      "Comprimento de 50 cm",
      "Corrente de até 3A (15W)",
      "Transferência de até 480 Mbps",
      "Construção com cobre puro 28 AWG",
      "Design compacto e prático",
      "Conexão bi-direcional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32600"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-50cm-branco",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-50cm-branco",
    "inStock": true
  },
  {
    "id": 95,
    "sku": "29331",
    "name": "Cabo PCYES DVI-I 24+5 para VGA 15 Pinos 2M PDVM15-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 125,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Escritório",
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29331/44801E8A3896CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29331/44801E8A3896CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29331/44801E8A3897CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29331/44801E8A3895CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo DVI-I 24+5 para VGA 15 Pinos PCYES 2M PDVM15-2 foi desenvolvido para oferecer conexão prática e compatibilidade entre dispositivos, sendo ideal para ligar computadores ou placas de vídeo com saída DVI-I a monitores e projetores com entrada VGA.\n\nProjetado para transmissão de sinal analógico…",
    "features": [
      "Conexão DVI-I 24+5 para VGA 15 pinos",
      "Transmissão de sinal analógico",
      "Comprimento de 2 metros",
      "Conectores com encaixe firme e seguro",
      "Instalação simples e prática",
      "Ideal para monitores e projetores VGA",
      "Uso profissional e doméstico"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29331"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-dvi-i-24-5-para-vga-2m",
    "productUrl": "https://www.pcyes.com.br/cabo-dvi-i-24-5-para-vga-2m",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 96,
    "sku": "35643",
    "name": "Cabo HDMI PCYES 2.1 1M 8K 48Gbps Ultra HD PHM21-1",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.4,
    "reviews": 162,
    "category": "SSD e HD",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Gaming",
      "SSD e HD",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/35643/44801E8A38C3CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/35643/44801E8A38C3CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/35643/44801E8A38C4CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/35643/44801E8A38C2CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo HDMI 2.1 PCYES 1M 8K 48Gbps Ultra HD PHM21-1 foi desenvolvido para oferecer máxima qualidade de imagem e som, sendo ideal para gamers, entusiastas e setups de alto desempenho.\n\nCompatível com consoles como PS4 Pro e Xbox One X, além de PCs, TVs, monitores e players Blu-ray, garante uma expe…",
    "features": [
      "Conexão HDMI 2.1 macho para macho",
      "Suporte a resolução até 8K e 4K",
      "Largura de banda de até 48 Gbit/s",
      "HDR dinâmico para melhor qualidade de imagem",
      "Áudio LPCM até 32 canais",
      "Suporte a 3D e conexão Ethernet",
      "Construção com cobre puro 28 AWG"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "35643"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-1-1m-8k-48gbps",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-1-1m-8k-48gbps",
    "inStock": true
  },
  {
    "id": 97,
    "sku": "29325",
    "name": "Cabo PCYES DVI-D 24+1 2M 1080p 144Hz Vídeo Digital PDDL-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 199,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29325/44801E8A3891CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29325/44801E8A3891CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29325/44801E8A3892CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29325/44801E8A3890CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo DVI-D 24+1 PCYES 2M 1080p 144Hz foi desenvolvido para oferecer transmissão de vídeo digital com alta qualidade e estabilidade, sendo ideal para monitores, placas de vídeo e computadores compatíveis com conexão DVI-D.\n\nCom suporte a resolução Full HD (1080p) e taxa de atualização de até 144H…",
    "features": [
      "Conexão DVI-D 24+1 macho para macho",
      "Suporte a resolução 1080p",
      "Frequência de até 144Hz",
      "Transmissão digital estável",
      "Construção com cobre puro 28 AWG",
      "Comprimento de 2 metros",
      "Ideal para monitores e placas de vídeo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29325"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-dvi-d-24-1-2m-1080p",
    "productUrl": "https://www.pcyes.com.br/cabo-dvi-d-24-1-2m-1080p",
    "inStock": true
  },
  {
    "id": 98,
    "sku": "29341",
    "name": "Cabo 5 RCA PCYES 2M Áudio e Vídeo Componente P5R-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 236,
    "category": "Periféricos",
    "subcategory": "Cabo AV",
    "tags": [
      "Periféricos",
      "Cabo AV"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29341/447FEF48C8424865E0630300A8C0010D",
    "images": [
      "https://cdn.oderco.com.br/produtos/29341/447FEF48C8424865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29341/447FEF48C8434865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29341/447FEF48C8414865E0630300A8C0010D"
    ],
    "description": "O Cabo 5 RCA PCYES 2M Áudio e Vídeo Componente P5R-2 foi desenvolvido para oferecer transmissão estável de áudio e vídeo, sendo ideal para TVs, DVDs, home theaters, videogames e outros dispositivos compatíveis com conexão RCA.\n\nCom suporte a conexões de vídeo componente e áudio estéreo, proporcion…",
    "features": [
      "Conexão 5 RCA macho para macho",
      "Suporte a áudio e vídeo componente",
      "Comprimento de 2 metros",
      "Construção com cobre puro 28 AWG",
      "Transmissão estável de sinal",
      "Compatível com TVs, DVDs, games e home theaters",
      "Instalação simples e prática"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29341"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo AV"
      }
    ],
    "seoSlug": "cabo-5-rca-2m-audio-video",
    "productUrl": "https://www.pcyes.com.br/cabo-5-rca-2m-audio-video",
    "inStock": true
  },
  {
    "id": 99,
    "sku": "32622",
    "name": "Cabo PCYES USB A 3.0 para USB Tipo-C 1M 5Gbps 3A P3UACP-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 273,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32622/BEF41FFD21DFFC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/32622/BEF41FFD21DFFC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/32622/BEF41FFD21E0FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/32622/BEF41FFD21DEFC48E055DEF401E782F4"
    ],
    "description": "O Cabo USB A 3.0 para USB Tipo-C PCYES 1M 5Gbps 3A P3UACP-1 foi desenvolvido para oferecer alta velocidade de transferência e carregamento eficiente, sendo ideal para smartphones, tablets, notebooks e periféricos com entrada USB-C.\n\nCom design funcional e construção resistente, proporciona conexão…",
    "features": [
      "Conexão USB A 3.0 para USB Tipo-C",
      "Transferência de até 5 Gbps",
      "Corrente de até 3A (15W)",
      "Comprimento de 1 metro",
      "Construção com cobre puro 24+28 AWG",
      "Revestimento em PVC resistente",
      "Compatível com diversos dispositivos USB-C"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32622"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-usb-c-1m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-usb-c-1m",
    "inStock": true,
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 100,
    "sku": "29277",
    "name": "Cabo PCYES USB A 2.0 para USB A 3.0 2M 5Gbps PUAM3-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 310,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29277/447FEF48C8504865E0630300A8C0010D",
    "images": [
      "https://cdn.oderco.com.br/produtos/29277/447FEF48C8504865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29277/447FEF48C8514865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29277/447FEF48C84F4865E0630300A8C0010D"
    ],
    "description": "O Cabo USB A 2.0 para USB A 3.0 PCYES 2M 5Gbps PUAM3-2 foi desenvolvido para oferecer transferência de dados em alta velocidade e conexão confiável, sendo ideal para conectar periféricos, extensões e dispositivos USB.\n\nCom construção robusta e design funcional, proporciona durabilidade e desempenh…",
    "features": [
      "Conexão USB A 2.0 para USB A 3.0",
      "Transferência de até 5 Gbps",
      "Comprimento de 2 metros",
      "Construção com cobre puro 24+28 AWG",
      "Conexão estável e confiável",
      "Ideal para periféricos e extensões USB",
      "Uso prático no dia a dia"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29277"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-2-0-para-usb-a-3-0-2m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-2-0-para-usb-a-3-0-2m",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 101,
    "sku": "29342",
    "name": "Cabo Óptico Digital PCYES 1M Áudio 7.1 Dolby DTS POD-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 347,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29342/44801E8A38DDCC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29342/44801E8A38DDCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29342/44801E8A38DCCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29342/44801E8A38DBCC1FE0630300A8C0585E"
    ],
    "description": "O Cabo Óptico Digital PCYES 1M Áudio 7.1 Dolby DTS foi desenvolvido para oferecer qualidade sonora superior e transmissão digital sem interferências, sendo ideal para home theaters, Blu-ray, DVDs, computadores e sistemas de áudio profissionais.\n\nUtilizando tecnologia óptica, garante sinal limpo e …",
    "features": [
      "Conexão de áudio óptico digital",
      "Suporte a áudio 7.1 Dolby DTS",
      "Transmissão sem interferências eletromagnéticas",
      "Alta fidelidade sonora",
      "Comprimento de 1 metro",
      "Ideal para home theaters e sistemas profissionais",
      "Conexão estável e confiável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29342"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-optico-digital-1m-audio-7-1",
    "productUrl": "https://www.pcyes.com.br/cabo-optico-digital-1m-audio-7-1",
    "inStock": true
  },
  {
    "id": 102,
    "sku": "29298",
    "name": "Cabo PCYES USB A 2.0 para Mini USB B 2.0 2M 3A PUANM2-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 384,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29298/4CD7DF2DB8DF3526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/29298/4CD7DF2DB8DF3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29298/4CD7DF2DB8E03526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29298/4CD7DF2DB8DE3526E0630300A8C075C0"
    ],
    "description": "O Cabo USB A 2.0 para Mini USB B 2.0 PCYES 2M 3A PUANM2-2 foi desenvolvido para oferecer conexão estável e transferência de dados eficiente, sendo ideal para câmeras, controles, GPS e outros dispositivos compatíveis com Mini USB.\n\nCom construção robusta e design funcional, garante durabilidade e p…",
    "features": [
      "Conexão USB A 2.0 para Mini USB B 2.0",
      "Comprimento de 2 metros",
      "Taxa de transferência de até 480 Mbps",
      "Corrente de até 3A (15W)",
      "Construção com cobre puro 24+28 AWG",
      "Conexão estável e confiável",
      "Ideal para câmeras, controles e dispositivos compatíveis"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29298"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-mini-usb-b-2m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-mini-usb-b-2m",
    "inStock": true
  },
  {
    "id": 103,
    "sku": "284853",
    "name": "Cabo USB-C para P3 Fêmea PCYES 15cm DAC Hi-Fi P3UCP-15P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 421,
    "category": "Periféricos",
    "subcategory": "Adaptador",
    "tags": [
      "Periféricos",
      "Adaptador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284853/3E9AE663DC3646A5E0630300A8C0F81D",
    "images": [
      "https://cdn.oderco.com.br/produtos/284853/3E9AE663DC3646A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284853/3E9AE663DC3746A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284853/3E9AE663DC3546A5E0630300A8C0F81D"
    ],
    "description": "O Cabo USB-C para P3 Fêmea PCYES 15cm DAC Hi-Fi P3UCP-15P foi desenvolvido para oferecer qualidade sonora superior e compatibilidade ampliada, sendo ideal para dispositivos que não possuem entrada P2 3.5mm.\n\nCom design compacto e funcional, permite conectar fones de ouvido e acessórios de áudio co…",
    "features": [
      "Conexão USB Tipo-C para P3 3.5mm fêmea",
      "DAC integrado para melhor qualidade sonora",
      "Suporte a áudio Hi-Fi 24bit/96kHz",
      "Comprimento compacto de 15 cm",
      "Construção em PVC + metal",
      "Cobre puro 30 AWG",
      "Ideal para smartphones e dispositivos sem entrada P2"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284853"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador"
      }
    ],
    "seoSlug": "cabo-usb-c-para-p3-femea-15cm",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-p3-femea-15cm",
    "inStock": true
  },
  {
    "id": 104,
    "sku": "284876",
    "name": "Cabo P2 3.5mm PCYES 90° 2M Áudio Estéreo P2PR-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 458,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284876/3E8893D8681452CAE0630300A8C06E56",
    "images": [
      "https://cdn.oderco.com.br/produtos/284876/3E8893D8681452CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284876/3E8893D8681552CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284876/3E8893D8681352CAE0630300A8C06E56"
    ],
    "description": "O Cabo P2 3.5mm PCYES 90° 2M Áudio Estéreo P2PR-2 foi desenvolvido para oferecer transmissão de áudio estável e com qualidade, sendo ideal para conectar smartphones, notebooks, caixas de som, fones e diversos dispositivos compatíveis.\n\nSeu conector em ângulo de 90° proporciona mais praticidade no …",
    "features": [
      "Conexão P2 3.5mm macho para macho",
      "Conector em ângulo 90° para maior praticidade",
      "Comprimento de 2 metros",
      "Áudio estéreo com boa qualidade",
      "Construção com cobre puro 28 AWG",
      "Revestimento em PVC resistente",
      "Compatível com diversos dispositivos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284876"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-p2-3-5mm-90-graus-2m",
    "productUrl": "https://www.pcyes.com.br/cabo-p2-3-5mm-90-graus-2m",
    "inStock": true
  },
  {
    "id": 105,
    "sku": "284873",
    "name": "Cabo P2 3.5mm PCYES 90° 1M Áudio Estéreo P2PR-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 65,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284873/3E8893D8681952CAE0630300A8C06E56",
    "images": [
      "https://cdn.oderco.com.br/produtos/284873/3E8893D8681952CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284873/3E8893D8681A52CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284873/3E8893D8681852CAE0630300A8C06E56"
    ],
    "description": "O Cabo P2 3.5mm PCYES 90° 1M Áudio Estéreo P2PR-1 foi desenvolvido para oferecer transmissão de áudio estável e com qualidade, sendo ideal para conectar smartphones, notebooks, caixas de som, fones e diversos dispositivos compatíveis.\n\nSeu conector em ângulo de 90° proporciona mais praticidade no …",
    "features": [
      "Conexão P2 3.5mm macho para macho",
      "Conector em ângulo 90° para maior praticidade",
      "Comprimento de 1 metro",
      "Áudio estéreo com boa qualidade",
      "Construção com cobre puro 28 AWG",
      "Revestimento em PVC resistente",
      "Compatível com diversos dispositivos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284873"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-p2-3-5mm-90-graus-1m",
    "productUrl": "https://www.pcyes.com.br/cabo-p2-3-5mm-90-graus-1m",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 106,
    "sku": "284690",
    "name": "Cabo PCYES USB Tipo-C para Tipo-C 2.0 3M Nylon 3A PUCC2-3P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 102,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284690/3DF91DE403FD35D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/284690/3DF91DE403FD35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/284690/3DF91DE403FE35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/284690/3DF91DE403FC35D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB Tipo-C para Tipo-C 2.0 PCYES 3M Nylon 3A PUCC2-3P foi desenvolvido para oferecer carregamento eficiente e transferência de dados estável, sendo ideal para smartphones, tablets, notebooks e dispositivos com entrada USB-C.\n\nCom design moderno e construção reforçada, conta com revestimento…",
    "features": [
      "Conexão USB Tipo-C para Tipo-C 2.0",
      "Comprimento de 3 metros",
      "Revestimento em nylon resistente",
      "Corrente de até 3A (15W)",
      "Transferência de até 480 Mbps",
      "Construção com cobre puro 24+28 AWG",
      "Compatível com smartphones, tablets e notebooks"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284690"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-usb-c-3m-nylon-3a",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-usb-c-3m-nylon-3a",
    "inStock": true
  },
  {
    "id": 107,
    "sku": "284838",
    "name": "Cabo HDMI PCYES 2.1 Conector 90º Vertical 2M PVC PH21-2V-D",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 139,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284838/3DD4D3B8B36D678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284838/3DD4D3B8B36D678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284838/3DD4D3B8B36E678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284838/3DD4D3B8B36C678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.1 PCYES Conector 90º Vertical 2M PVC PH21-2V-D foi desenvolvido para oferecer alta qualidade de imagem e som, sendo ideal para gamers, profissionais e entusiastas que buscam desempenho superior.\n\nCom design exclusivo e funcional, o conector 90º vertical facilita a instalação em espaç…",
    "features": [
      "Conector HDMI 2.1 com ângulo de 90º vertical",
      "Comprimento de 2 metros",
      "Suporte a resolução 8K 60Hz",
      "Largura de banda de até 48 Gbit/s",
      "Áudio LPCM até 7 canais",
      "Revestimento em PVC resistente",
      "Suporte a 3D e conexão Ethernet"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284838"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-1-90-graus-vertical-2m-pvc",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-1-90-graus-vertical-2m-pvc",
    "inStock": true
  },
  {
    "id": 108,
    "sku": "282213",
    "name": "Cabo PCYES USB A 2.0 para USB Tipo-C 3M Nylon 3A CBPY03C",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 176,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282213/3DF91DE403DA35D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282213/3DF91DE403DA35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282213/3DF91DE403DB35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282213/3DF91DE403DC35D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB A 2.0 para USB Tipo-C PCYES 3M Nylon 3A CBPY03C foi desenvolvido para oferecer carregamento eficiente e transferência de dados estável, sendo ideal para smartphones, tablets e dispositivos com entrada USB-C.\n\nCom design robusto e acabamento premium, conta com revestimento em nylon, prop…",
    "features": [
      "Conexão USB A 2.0 para USB Tipo-C",
      "Comprimento de 3 metros",
      "Revestimento em nylon resistente",
      "Corrente de até 3A (15W)",
      "Transferência de até 480 Mbps",
      "Construção com cobre puro 24+28 AWG",
      "Ideal para smartphones e dispositivos USB-C"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282213"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-3m-nylon-3a",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-3m-nylon-3a",
    "inStock": true
  },
  {
    "id": 109,
    "sku": "32623",
    "name": "Cabo PCYES USB Tipo-C para USB B 3.0 1M P3UCBP-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 213,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32623/BEF41FFD24A3FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/32623/BEF41FFD24A3FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/32623/BEF41FFD21E9FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/32623/BEF41FFD21EAFC48E055DEF401E782F4"
    ],
    "description": "O Cabo USB Tipo-C para USB B 3.0 PCYES 1M P3UCBP-1 foi desenvolvido para oferecer alta velocidade de transferência e conexão estável, sendo ideal para impressoras, scanners e outros dispositivos compatíveis com USB B 3.0.\n\nCom design robusto e acabamento funcional, proporciona durabilidade e prati…",
    "features": [
      "Conector USB Tipo-C para USB B 3.0",
      "Taxa de transferência de até 5 Gbps",
      "Corrente de até 3A (15W)",
      "Construção com cobre puro 24+28 AWG",
      "Revestimento em PVC resistente",
      "Comprimento de 1 metro",
      "Ideal para impressoras e periféricos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32623"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-usb-b-3-0-1m",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-usb-b-3-0-1m",
    "inStock": true
  },
  {
    "id": 110,
    "sku": "284718",
    "name": "Cabo 2 RCA PCYES 2M Áudio Estéreo P2R-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 250,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284718/3E9AE663DC4B46A5E0630300A8C0F81D",
    "images": [
      "https://cdn.oderco.com.br/produtos/284718/3E9AE663DC4B46A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284718/3E9AE663DC4C46A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284718/3E9AE663DC4A46A5E0630300A8C0F81D"
    ],
    "description": "O Cabo 2 RCA PCYES 2M Áudio Estéreo P2R-2 foi desenvolvido para garantir transmissão de áudio estável e com boa qualidade, sendo ideal para conectar amplificadores, TVs, receivers e sistemas de som.\n\nCom construção robusta e design funcional, oferece compatibilidade ampla com dispositivos que util…",
    "features": [
      "Conexão 2 RCA macho para 2 RCA macho",
      "Comprimento de 2 metros",
      "Áudio estéreo com boa qualidade",
      "Construção com cobre puro 28 AWG",
      "Transmissão estável de sinal",
      "Compatível com amplificadores, TVs e sistemas de som",
      "Instalação simples e prática"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284718"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-2-rca-2m-audio-estereo",
    "productUrl": "https://www.pcyes.com.br/cabo-2-rca-2m-audio-estereo",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 111,
    "sku": "284686",
    "name": "Cabo PCYES Micro USB USB A 2.0 3M Nylon 3A PMUAN-3A",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 287,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284686/3E0D5A3D1B50B8F7E0630300A8C0DD9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284686/3E0D5A3D1B50B8F7E0630300A8C0DD9A",
      "https://cdn.oderco.com.br/produtos/284686/3E0D5A3D1B51B8F7E0630300A8C0DD9A",
      "https://cdn.oderco.com.br/produtos/284686/3E0D5A3D1B52B8F7E0630300A8C0DD9A"
    ],
    "description": "O Cabo Micro USB PCYES USB A 2.0 3M Nylon 3A PMUAN-3A foi desenvolvido para oferecer carregamento eficiente e transferência de dados estável, sendo ideal para smartphones, controles, acessórios e diversos dispositivos compatíveis com Micro USB.\n\nCom design robusto e acabamento premium, conta com r…",
    "features": [
      "Conector Micro USB para USB A 2.0",
      "Comprimento de 3 metros",
      "Revestimento em nylon resistente",
      "Suporte até 3A (15W) para carregamento eficiente",
      "Taxa de transferência de até 480 Mbps",
      "Construção com cobre puro 24+28 AWG",
      "Ideal para smartphones, controles e acessórios"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284686"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-micro-usb-3m-nylon-3a",
    "productUrl": "https://www.pcyes.com.br/cabo-micro-usb-3m-nylon-3a",
    "inStock": true
  },
  {
    "id": 112,
    "sku": "29340",
    "name": "Cabo de Vídeo PCYES 3 RCA 2M P3R-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 324,
    "category": "Periféricos",
    "subcategory": "Cabo de Vídeo",
    "tags": [
      "Periféricos",
      "Cabo de Vídeo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29340/4CD7DF2DB8F73526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/29340/4CD7DF2DB8F73526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29340/4CD7DF2DB8F83526E0630300A8C075C0"
    ],
    "description": "O Cabo de Vídeo 3 RCA PCYES 2M P3R-2 foi desenvolvido para oferecer transmissão estável de áudio e vídeo, sendo ideal para conectar dispositivos como TVs, DVDs, videocassetes e conversores digitais.\n\nCom design funcional e construção de qualidade, garante compatibilidade ampla com equipamentos que…",
    "features": [
      "Conexão 3 RCA macho para 3 RCA macho",
      "Comprimento de 2 metros",
      "Áudio estéreo com boa qualidade",
      "Compatível com TVs, DVDs e conversores",
      "Construção em cobre puro 28 AWG",
      "Transmissão estável de sinal",
      "Fácil instalação e uso"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29340"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Vídeo"
      }
    ],
    "seoSlug": "cabo-video-3-rca-2m",
    "productUrl": "https://www.pcyes.com.br/cabo-video-3-rca-2m",
    "inStock": true
  },
  {
    "id": 113,
    "sku": "284851",
    "name": "Cabo HDMI PCYES 2.1 Conector 90º Vertical 3M Nylon PH21-3VNP-F",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 361,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284851/3DE5E526B2BA08A5E0630300A8C08449",
    "images": [
      "https://cdn.oderco.com.br/produtos/284851/3DE5E526B2BA08A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284851/3DE5E526B2BB08A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284851/3DE5E526B2B908A5E0630300A8C08449"
    ],
    "description": "O Cabo HDMI 2.1 PCYES Conector 90º Vertical 3M Nylon PH21-3VNP-F foi desenvolvido para levar desempenho e durabilidade excepcionais aos seus equipamentos, sendo perfeito para gamers, profissionais de audiovisual e entusiastas de tecnologia.\n\nCom design exclusivo e 100% brasileiro, combina robustez…",
    "features": [
      "Conector HDMI 2.1 M para HDMI 2.1 90º",
      "Comprimento de 3 metros",
      "Revestimento em nylon resistente",
      "Cobre puro 30 AWG para alta performance",
      "Suporte 8K 60Hz e HDR estático",
      "Áudio LPCM até 7 canais e taxa de 48kHz",
      "Suporte 3D e conexão Ethernet"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284851"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-1-90-graus-vertical-3m-nylon",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-1-90-graus-vertical-3m-nylon",
    "inStock": true
  },
  {
    "id": 114,
    "sku": "286143",
    "name": "Teclado Mecânico PCYES Arkeum Sunset Edition 75% ABNT2 Outemu Red AKSS75RBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 398,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286143/4D52048A79062A30E0630300A8C00192",
    "images": [
      "https://cdn.oderco.com.br/produtos/286143/4D52048A79062A30E0630300A8C00192",
      "https://cdn.oderco.com.br/produtos/286143/4D52048A79072A30E0630300A8C00192",
      "https://cdn.oderco.com.br/produtos/286143/4D52048A79052A30E0630300A8C00192"
    ],
    "description": "O Teclado Mecânico Arkeum Sunset Edition Red foi desenvolvido para quem busca desempenho, estilo e praticidade em um layout compacto 75%. Ideal para gamers e profissionais, seu formato ABNT2 garante eficiência sem ocupar muito espaço na mesa.\n\nEquipado com switches Outemu Red, oferece acionamento …",
    "features": [
      "Layout compacto 75% com 82 teclas + knob",
      "Switch Outemu Red com acionamento suave e silencioso",
      "Anti-ghosting de até 25 teclas para maior precisão",
      "Keycaps tri-color doubleshot exclusivas da Sunset Edition",
      "Iluminação fixa single color para visual moderno",
      "Cabo removível USB-C de 1,8 m para versatilidade",
      "Layout ABNT2 padrão brasileiro",
      "Ideal para jogos, digitação e setups compactos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286143"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-sunset-75-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-sunset-75-red",
    "inStock": true
  },
  {
    "id": 115,
    "sku": "286142",
    "name": "Teclado Mecânico PCYES Arkeum Sunset Edition 75% ABNT2 Outemu Blue AKSS75BBR",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 435,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286142/4B9572B75F6CC341E0630300A8C022D7",
    "images": [
      "https://cdn.oderco.com.br/produtos/286142/4B9572B75F6CC341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286142/4B9572B75F6DC341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/286142/25C7064E38A3E6C2E0630300A8C0EDA5"
    ],
    "description": "O Teclado Mecânico Arkeum Sunset Edition foi desenvolvido para quem busca desempenho, estilo e praticidade em um layout compacto 75%. Ideal para gamers e profissionais, seu formato ABNT2 garante eficiência sem ocupar muito espaço na mesa.\n\nEquipado com switches Outemu Blue, oferece resposta tátil …",
    "features": [
      "Layout compacto 75% com 82 teclas + knob",
      "Switch Outemu Blue com resposta tátil precisa",
      "Anti-ghosting de até 25 teclas para maior controle",
      "Keycaps tri-color doubleshot exclusivas da Sunset Edition",
      "Iluminação fixa single color para visual moderno",
      "Cabo removível USB-C de 1,8 m para versatilidade",
      "Layout ABNT2 padrão brasileiro",
      "Ideal para jogos, digitação e setups compactos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286142"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-arkeum-sunset-75-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-arkeum-sunset-75-blue",
    "inStock": true,
    "oldPrice": "R$ 471,88",
    "oldPriceNum": 471.88
  },
  {
    "id": 116,
    "sku": "317994",
    "name": "Teclado Mecânico PCYES Shiyan White Ghost 60% ABNT2 Outemu Red RGB TPSHWGRD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 472,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317994/4BAA10CF7A26546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317994/4BAA10CF7A26546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317994/4BAA10CF7A28546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317994/4BAA10CF7A25546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Shiyan White Ghost foi desenvolvido para quem busca desempenho, conforto e um visual diferenciado no setup. Seu formato compacto 60% otimiza o espaço na mesa, mantendo o layout ABNT2 para uso prático no dia a dia.\n\nEquipado com switches Outemu Red, proporciona acionamento suave …",
    "features": [
      "Formato compacto 60% com layout ABNT2",
      "Switch Outemu Red com acionamento suave e silencioso",
      "Anti-ghosting 100% para máxima precisão",
      "Iluminação Rainbow com barra de LED RGB",
      "Design White Ghost moderno e diferenciado",
      "Keycaps doubleshot para maior durabilidade",
      "Cabo removível USB-C para mais praticidade",
      "Ideal para jogos e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317994"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-shiyan-white-ghost-60-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-shiyan-white-ghost-60-red",
    "inStock": true
  },
  {
    "id": 117,
    "sku": "317992",
    "name": "Teclado Mecânico PCYES Shiyan White Ghost 60% ABNT2 Outemu Blue RGB TPSHWGBL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.7,
    "reviews": 79,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317992/4BAA10CF7A21546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317992/4BAA10CF7A21546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317992/4BAA10CF7A23546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317992/4BAA10CF7A20546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Shiyan White Ghost foi desenvolvido para oferecer desempenho, precisão e um visual diferenciado no setup. Seu formato compacto 60% otimiza o espaço na mesa, mantendo o layout ABNT2 para uso prático no dia a dia.\n\nEquipado com switches Outemu Blue, proporciona resposta tátil e so…",
    "features": [
      "Formato compacto 60% com layout ABNT2",
      "Switch Outemu Blue com resposta tátil e clique audível",
      "Anti-ghosting 100% para máxima precisão",
      "Iluminação Rainbow com barra de LED RGB",
      "Design White Ghost moderno e diferenciado",
      "Keycaps doubleshot para maior durabilidade",
      "Cabo removível USB-C para mais praticidade",
      "Ideal para jogos e digitação precisa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317992"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-shiyan-white-ghost-60-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-shiyan-white-ghost-60-blue",
    "inStock": true
  },
  {
    "id": 118,
    "sku": "317990",
    "name": "Teclado Mecânico PCYES Shiyan Black Vulcan 60% ABNT2 Outemu Red RGB TPSHBVRD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.8,
    "reviews": 116,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317990/4BAA10CF7A30546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317990/4BAA10CF7A30546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317990/4BAA10CF7A32546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317990/4BAA10CF7A2F546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Shiyan Black Vulcan foi desenvolvido para oferecer desempenho, conforto e um visual moderno em setups gamers e profissionais. Seu formato compacto 60% otimiza o espaço na mesa, mantendo o layout ABNT2 para uso prático.\n\nEquipado com switches Outemu Red, proporciona acionamento s…",
    "features": [
      "Formato compacto 60% com layout ABNT2",
      "Switch Outemu Red com acionamento suave e silencioso",
      "Anti-ghosting 100% para comandos simultâneos",
      "Iluminação Rainbow com barra de LED RGB",
      "Keycaps doubleshot para maior durabilidade",
      "Design Black Vulcan moderno e robusto",
      "Cabo removível USB-C para mais praticidade",
      "Ideal para jogos e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317990"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-shiyan-black-vulcan-60-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-shiyan-black-vulcan-60-red",
    "inStock": true
  },
  {
    "id": 119,
    "sku": "317989",
    "name": "Teclado Mecânico PCYES Shiyan Black Vulcan 60% ABNT2 Outemu Blue RGB TPSHBVBL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.9,
    "reviews": 153,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317989/4BAA10CF7A2B546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317989/4BAA10CF7A2B546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317989/4BAA10CF7A2D546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317989/4BAA10CF7A2A546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Shiyan Black Vulcan foi desenvolvido para oferecer desempenho, precisão e um visual marcante em setups gamers e profissionais. Seu formato compacto 60% otimiza o espaço na mesa, mantendo o layout ABNT2 para uso prático no dia a dia.\n\nEquipado com switches Outemu Blue, proporcion…",
    "features": [
      "Formato compacto 60% com layout ABNT2",
      "Switch Outemu Blue com resposta tátil e clique audível",
      "Anti-ghosting 100% para máxima precisão nos comandos",
      "Iluminação Rainbow com barra de LED RGB",
      "Keycaps doubleshot para maior durabilidade",
      "Design Black Vulcan moderno e robusto",
      "Cabo removível USB-C para mais praticidade",
      "Ideal para jogos e digitação precisa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317989"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-shiyan-black-vulcan-60-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-shiyan-black-vulcan-60-blue",
    "inStock": true
  },
  {
    "id": 120,
    "sku": "317921",
    "name": "Teclado Mecânico PCYES Mecka White Ghost 65% ABNT2 Outemu Red RGB Rainbow TPMKWGRD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 190,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317921/4BAA10CF7A44546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317921/4BAA10CF7A44546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317921/4BAA10CF7A46546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317921/4BAA10CF7A43546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Mecka White Ghost foi desenvolvido para quem busca desempenho, conforto e um visual diferenciado no setup. Seu formato compacto 65% otimiza o espaço da mesa, mantendo o layout ABNT2 para uso prático no dia a dia.\n\nEquipado com switches Outemu Red, oferece acionamento suave e sil…",
    "features": [
      "Formato compacto 65% com layout ABNT2",
      "Switch Outemu Red com acionamento suave e silencioso",
      "Anti-ghosting 100% para comandos simultâneos",
      "Iluminação RGB Rainbow para visual moderno",
      "Design White Ghost com acabamento diferenciado",
      "Keycaps doubleshot resistentes e duráveis",
      "Knob multifuncional para controle prático",
      "Cabo removível USB-C para mais versatilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317921"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-mecka-white-ghost-65-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-mecka-white-ghost-65-red",
    "inStock": true,
    "oldPrice": "R$ 471,88",
    "oldPriceNum": 471.88
  },
  {
    "id": 121,
    "sku": "317920",
    "name": "Teclado Mecânico PCYES Mecka 65% ABNT2 Outemu Blue com Knob e RGB Rainbow TPMKWGBL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 227,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A35546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A35546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A37546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A34546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Mecka foi desenvolvido para entregar desempenho, durabilidade e estilo em um formato compacto. Ideal para setups gamers e uso profissional, seu layout 65% otimiza o espaço sem abrir mão do padrão ABNT2.\n\nEquipado com switches Outemu Blue, oferece resposta tátil e sonora precisa,…",
    "features": [
      "Formato compacto 65% com layout ABNT2",
      "Switch Outemu Blue com resposta tátil e clique audível",
      "Anti-ghosting 100% para comandos simultâneos",
      "Iluminação Rainbow com visual moderno",
      "Keycaps doubleshot resistentes e duráveis",
      "Knob multifuncional para controle prático",
      "Cabo removível USB-C para maior versatilidade",
      "Ideal para jogos e digitação precisa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317920"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-mecka-65-abnt2-outemu-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-mecka-65-abnt2-outemu-blue",
    "inStock": true,
    "oldPrice": "R$ 447,89",
    "oldPriceNum": 447.89
  },
  {
    "id": 122,
    "sku": "317919",
    "name": "Teclado Mecânico PCYES Mecka 65% ABNT2 Outemu Red com Knob e RGB Rainbow TPMKBVRD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 264,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317919/4BAA10CF7A3A546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317919/4BAA10CF7A3A546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317919/4BAA10CF7A3C546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317919/4BAA10CF7A39546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Mecka foi desenvolvido para quem busca desempenho, conforto e um visual moderno no setup. Seu formato compacto 65% oferece mais espaço na mesa, mantendo o layout ABNT2 para uso prático no dia a dia.\n\nEquipado com switches Outemu Red, proporciona digitação suave e silenciosa, ide…",
    "features": [
      "Formato compacto 65% com layout ABNT2",
      "Switch Outemu Red com acionamento suave e silencioso",
      "Anti-ghosting 100% para comandos simultâneos",
      "Iluminação Rainbow para visual moderno",
      "Keycaps doubleshot de alta durabilidade",
      "Knob multifuncional para controle prático",
      "Cabo removível USB-C para mais versatilidade",
      "Ideal para jogos e uso profissional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317919"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-mecka-65-abnt2-outemu-red",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-mecka-65-abnt2-outemu-red",
    "inStock": true
  },
  {
    "id": 123,
    "sku": "317916",
    "name": "Teclado Mecânico PCYES Mecka 65% ABNT2 Outemu Blue com Knob e RGB Rainbow TPMKBVBL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.7,
    "reviews": 301,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A35546AE0630300A8C0BF9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A35546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A37546AE0630300A8C0BF9A",
      "https://cdn.oderco.com.br/produtos/317916/4BAA10CF7A34546AE0630300A8C0BF9A"
    ],
    "description": "O Teclado Mecânico Mecka foi desenvolvido para quem busca desempenho, durabilidade e um visual moderno no setup. Seu formato compacto 65% oferece mais espaço na mesa sem abrir mão da funcionalidade do layout ABNT2.\n\nEquipado com switches Outemu Blue, proporciona resposta tátil e sonora precisa, id…",
    "features": [
      "Formato compacto 65% com layout ABNT2",
      "Switch Outemu Blue com resposta tátil e clique preciso",
      "Anti-ghosting 100% para comandos simultâneos",
      "Iluminação Rainbow para visual moderno",
      "Keycaps doubleshot de alta durabilidade",
      "Knob multifuncional para controle prático",
      "Cabo removível USB-C para mais versatilidade",
      "Ideal para jogos e produtividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317916"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-mecka-65-abnt2-outemu-blue",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-mecka-65-abnt2-outemu-blue",
    "inStock": true
  },
  {
    "id": 124,
    "sku": "284816",
    "name": "Cabo HDMI PCYES 2.1 Conector 90º Horizontal 1M PVC PHM21-1H-PVC01",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 338,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284816/3DD4D3B8B34A678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284816/3DD4D3B8B34A678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284816/3DD4D3B8B34B678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284816/3DD4D3B8B349678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.1 PCYES Conector 90º Horizontal 1M PVC PHM21-1H-PVC01 foi desenvolvido para oferecer desempenho confiável e durabilidade superior, sendo ideal para gamers, profissionais de audiovisual e entusiastas de tecnologia.\n\nCom design exclusivo 100% brasileiro, combina robustez e minimalismo,…",
    "features": [
      "Conector HDMI 2.1 Reto → 90º Horizontal",
      "Comprimento de 1 metro",
      "Revestimento em PVC resistente",
      "Cobre puro 30 AWG para alta performance",
      "Suporte 8K 60Hz e HDR estático",
      "Áudio LPCM até 7 canais e taxa de 48kHz",
      "Suporte 3D e conexão Ethernet"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284816"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-1-90-graus-horizontal-1m-pvc",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-1-90-graus-horizontal-1m-pvc",
    "inStock": true
  },
  {
    "id": 125,
    "sku": "340615",
    "name": "Water Cooler PCYES DULEY 240MM BLACK VULCAN ARGB 240MM – WCDLY240",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.9,
    "reviews": 375,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/340615/4D2905A560FC5D97E0630300A8C096F3",
    "images": [
      "https://cdn.oderco.com.br/produtos/340615/4D2905A560FC5D97E0630300A8C096F3",
      "https://cdn.oderco.com.br/produtos/340615/4D2905A560FD5D97E0630300A8C096F3",
      "https://cdn.oderco.com.br/produtos/340615/4D2905A560FF5D97E0630300A8C096F3"
    ],
    "description": "O Water Cooler Duley 240mm ARGB foi desenvolvido para oferecer máxima eficiência térmica em sistemas de alto desempenho. Equipado com display de temperatura, permite monitoramento em tempo real, trazendo mais controle e segurança para o usuário.\n\nCom capacidade de dissipação de até 285W, é ideal p…",
    "features": [
      "Display de temperatura integrado para monitoramento em tempo real",
      "Alta capacidade térmica de até 285W para CPUs de alto desempenho",
      "Radiador de 240mm para dissipação superior de calor",
      "Base em cobre que melhora a transferência térmica",
      "Bomba com rolamento cerâmico para maior vida útil",
      "Sistema com dois fans para melhor fluxo de ar",
      "Iluminação ARGB personalizável para setups gamers",
      "Operação silenciosa mesmo sob alta carga"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "340615"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-duley-240mm-argb-display-285w",
    "productUrl": "https://www.pcyes.com.br/water-cooler-duley-240mm-argb-display-285w",
    "inStock": true,
    "oldPrice": "R$ 412,88",
    "oldPriceNum": 412.88
  },
  {
    "id": 126,
    "sku": "340611",
    "name": "Water Cooler PCYES DULEY 120MM BLACK VULCAN ARGB 120MM – WCDLY120",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.4,
    "reviews": 412,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/340611/4D2905A560F75D97E0630300A8C096F3",
    "images": [
      "https://cdn.oderco.com.br/produtos/340611/4D2905A560F75D97E0630300A8C096F3",
      "https://cdn.oderco.com.br/produtos/340611/4D2905A560F65D97E0630300A8C096F3",
      "https://cdn.oderco.com.br/produtos/340611/4D2905A560F85D97E0630300A8C096F3"
    ],
    "description": "O Water Cooler Duley 120mm ARGB foi projetado para oferecer alta eficiência térmica e estabilidade em sistemas de alto desempenho. Com display de temperatura integrado, permite acompanhar em tempo real o comportamento do processador.\n\nCom suporte para TDP de até 200W, é ideal para setups gamers e …",
    "features": [
      "Display de temperatura integrado para monitoramento em tempo real",
      "Capacidade térmica de até 200W para alto desempenho",
      "Radiador em alumínio com alta eficiência na dissipação de calor",
      "Chapa fria em cobre para melhor transferência térmica",
      "Bomba com rolamento cerâmico para maior durabilidade",
      "Operação silenciosa com baixo nível de ruído",
      "Iluminação ARGB personalizável para setups gamers",
      "Ventoinha com alto fluxo de ar e pressão otimizada"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "340611"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-duley-120mm-argb-display-200w",
    "productUrl": "https://www.pcyes.com.br/water-cooler-duley-120mm-argb-display-200w",
    "inStock": true
  },
  {
    "id": 127,
    "sku": "340620",
    "name": "Cooler para Processador PCYES DULEY BLACK VULCAN TDP 180W – ACDLYBV",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.5,
    "reviews": 449,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/340620/4D2905A560F15D97E0630300A8C096F3",
    "images": [
      "https://cdn.oderco.com.br/produtos/340620/4D2905A560F15D97E0630300A8C096F3",
      "https://cdn.oderco.com.br/produtos/340620/4D2905A560F25D97E0630300A8C096F3",
      "https://cdn.oderco.com.br/produtos/340620/4D2905A560F55D97E0630300A8C096F3"
    ],
    "description": "O Cooler para Processador Duley Black Vulcan ARGB foi desenvolvido para entregar alta eficiência térmica com um visual moderno e imersivo. Equipado com display de temperatura em tempo real, permite monitorar o desempenho do sistema de forma prática e precisa.\n\nCom suporte para TDP de até 180W, é i…",
    "features": [
      "Monitoramento em tempo real com display de temperatura integrado",
      "Alta capacidade térmica de até 180W para CPUs de alto desempenho",
      "Iluminação ARGB personalizável para setups gamers",
      "Sistema de ventilação eficiente com fluxo de ar otimizado",
      "Heatpipes de cobre com contato direto para melhor dissipação",
      "Operação equilibrada com bom desempenho e baixo ruído",
      "Compatibilidade ampla com plataformas Intel e AMD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "340620"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-processador-duley-black-vulcan-argb-display-180w",
    "productUrl": "https://www.pcyes.com.br/cooler-processador-duley-black-vulcan-argb-display-180w",
    "inStock": true
  },
  {
    "id": 128,
    "sku": "332486",
    "name": "Mouse PCYES Vertical Ergonômico Rest MRSC01 com DPI Ajustável e Cliques Silenciosos",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.6,
    "reviews": 56,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Escritório",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/332486/4D4C20FBD0D9AEB4E0630300A8C0FF35",
    "images": [
      "https://cdn.oderco.com.br/produtos/332486/4D4C20FBD0D9AEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332486/4D4C20FBD0DAAEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332486/4D4C20FBD0DDAEB4E0630300A8C0FF35"
    ],
    "description": "O Mouse Vertical Ergonômico Rest MRSC01 foi desenvolvido para proporcionar conforto durante longos períodos de uso, reduzindo tensões no punho e no antebraço. Seu formato anatômico promove uma posição mais natural da mão, ajudando a prevenir fadiga e desconfortos.\n\nIdeal para ambientes de trabalho…",
    "features": [
      "Design vertical ergonômico que reduz esforço no punho",
      "Ajuda a prevenir dores e lesões por esforço repetitivo (LER)",
      "Cliques silenciosos ideais para ambientes compartilhados",
      "Ajuste de DPI em 4 níveis para maior precisão",
      "Seis botões funcionais para mais praticidade no uso",
      "Pegada confortável para uso prolongado",
      "Conexão USB simples e compatível com diversos dispositivos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "332486"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-vertical-ergonomico-rest-mrsc01",
    "productUrl": "https://www.pcyes.com.br/mouse-vertical-ergonomico-rest-mrsc01",
    "inStock": true
  },
  {
    "id": 129,
    "sku": "332488",
    "name": "Microfone PCYES Gamer Hylia USB RGB com Mute e Cápsula Condensadora",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.7,
    "reviews": 93,
    "category": "Streaming",
    "subcategory": "Microfone",
    "tags": [
      "Gaming",
      "RGB",
      "Streaming",
      "Streaming",
      "Microfone"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/332488/4D4C20FBD0EEAEB4E0630300A8C0FF35",
    "images": [
      "https://cdn.oderco.com.br/produtos/332488/4D4C20FBD0EEAEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332488/4D4C20FBD0EFAEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332488/4D4C20FBD0F1AEB4E0630300A8C0FF35"
    ],
    "description": "O Microfone Gamer Hylia foi desenvolvido para quem busca qualidade de áudio, praticidade e um visual moderno no setup. Ideal para jogos, lives, reuniões e produção de conteúdo, oferece captação clara e natural da voz.\n\nEquipado com cápsula condensadora omnidirecional, garante captação eficiente em…",
    "features": [
      "Cápsula condensadora omnidirecional para captação clara",
      "Ideal para jogos, lives, reuniões e criação de conteúdo",
      "Iluminação RGB com 12 efeitos personalizáveis",
      "Botão de mute dedicado para controle rápido",
      "Conexão USB plug-and-play fácil de usar",
      "Estrutura leve e resistente",
      "Cabo trançado de 2 metros para maior durabilidade",
      "Captação eficiente mesmo em volumes mais baixos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "332488"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Microfone"
      }
    ],
    "seoSlug": "microfone-gamer-hylia-usb-rgb",
    "productUrl": "https://www.pcyes.com.br/microfone-gamer-hylia-usb-rgb",
    "inStock": true
  },
  {
    "id": 130,
    "sku": "332489",
    "name": "Microfone PCYES Gamer Volini USB RGB com Mute e Captação Cardioide",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.8,
    "reviews": 130,
    "category": "Streaming",
    "subcategory": "Microfone",
    "tags": [
      "Gaming",
      "RGB",
      "Streaming",
      "Streaming",
      "Microfone"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/332489/4D4C20FBD0E0AEB4E0630300A8C0FF35",
    "images": [
      "https://cdn.oderco.com.br/produtos/332489/4D4C20FBD0E0AEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332489/4D4C20FBD0E1AEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332489/4D4C20FBD0E2AEB4E0630300A8C0FF35"
    ],
    "description": "O Microfone Gamer Volini foi desenvolvido para quem busca qualidade de áudio superior em jogos, lives, reuniões e criação de conteúdo. Com captação cardioide, foca na sua voz e reduz ruídos indesejados do ambiente.\n\nEquipado com cápsula condensadora de alta precisão, oferece gravação com taxa de a…",
    "features": [
      "Captação cardioide que reduz ruídos do ambiente",
      "Áudio de alta qualidade com 48 kHz / 16 bits",
      "Alta relação sinal-ruído para gravações mais limpas",
      "Função touch para mute rápido e prático",
      "Iluminação RGB com controle por toque",
      "Monitoramento em tempo real da gravação",
      "Conexão USB plug-and-play fácil de usar",
      "Ideal para streaming, jogos, podcasts e reuniões"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "332489"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Microfone"
      }
    ],
    "seoSlug": "microfone-gamer-volini-usb-rgb",
    "productUrl": "https://www.pcyes.com.br/microfone-gamer-volini-usb-rgb",
    "inStock": true,
    "oldPrice": "R$ 330,28",
    "oldPriceNum": 330.28
  },
  {
    "id": 131,
    "sku": "332491",
    "name": "Microfone PCYES Gamer Volini USB RGB com Mute Touch e Captação Cardioide",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.9,
    "reviews": 167,
    "category": "Streaming",
    "subcategory": "Microfone",
    "tags": [
      "Gaming",
      "RGB",
      "Streaming",
      "Streaming",
      "Microfone"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/332491/4D4C20FBD0E7AEB4E0630300A8C0FF35",
    "images": [
      "https://cdn.oderco.com.br/produtos/332491/4D4C20FBD0E7AEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332491/4D4C20FBD0E8AEB4E0630300A8C0FF35",
      "https://cdn.oderco.com.br/produtos/332491/4D4C20FBD0E9AEB4E0630300A8C0FF35"
    ],
    "description": "O Microfone Gamer Volini foi desenvolvido para quem busca qualidade de áudio profissional em jogos, lives, reuniões e produção de conteúdo. Seu padrão cardioide capta a voz com precisão, reduzindo ruídos externos indesejados.\n\nCom taxa de amostragem de 48 kHz / 16 bits, entrega áudio limpo e detal…",
    "features": [
      "Captação cardioide que reduz ruídos do ambiente",
      "Qualidade de áudio 48 kHz / 16 bits",
      "Alta relação sinal-ruído para gravações limpas",
      "Função mute touch para silenciamento rápido",
      "Iluminação RGB com controle por toque",
      "Monitoramento de voz em tempo real",
      "Conexão USB plug-and-play prática",
      "Ideal para jogos, streaming e criação de conteúdo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "332491"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Microfone"
      }
    ],
    "seoSlug": "microfone-gamer-volini-usb-cardioide-rgb",
    "productUrl": "https://www.pcyes.com.br/microfone-gamer-volini-usb-cardioide-rgb",
    "inStock": true
  },
  {
    "id": 132,
    "sku": "334144",
    "name": "Luminária Modular PCYES Y-Link Neon Core RGB com Controle e 7 Cores",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 204,
    "category": "Periféricos",
    "subcategory": "Iluminação",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Iluminação"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/334144/4B9572B75F54C341E0630300A8C022D7",
    "images": [
      "https://cdn.oderco.com.br/produtos/334144/4B9572B75F54C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/334144/4B9572B75F53C341E0630300A8C022D7",
      "https://cdn.oderco.com.br/produtos/334144/4B9572B75F56C341E0630300A8C022D7"
    ],
    "description": "A Luminária Modular Y-Link Neon Core RGB foi desenvolvida para transformar qualquer ambiente com estilo e personalização. Ideal para setups gamers, estúdios ou decoração moderna, permite criar composições únicas na parede.\n\nSeu design modular com conectores magnéticos facilita a montagem em difere…",
    "features": [
      "Design modular com montagem criativa e personalizada",
      "Iluminação RGB com 7 cores e múltiplos efeitos",
      "Controle remoto para ajuste prático",
      "Brilho ajustável em até 5 níveis",
      "Ideal para setups gamers e decoração moderna",
      "Instalação simples e rápida",
      "Visual imersivo para diferentes ambientes"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "334144"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Iluminação"
      }
    ],
    "seoSlug": "luminaria-modular-y-link-neon-core-rgb",
    "productUrl": "https://www.pcyes.com.br/luminaria-modular-y-link-neon-core-rgb",
    "inStock": true,
    "oldPrice": "R$ 223,89",
    "oldPriceNum": 223.89
  },
  {
    "id": 133,
    "sku": "284820",
    "name": "Cabo HDMI PCYES 2.1 90° Horizontal 8K 60Hz Nylon Preto 3 Metros PHM21-3HNP",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 241,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284820/3DD4D3B8B340678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284820/3DD4D3B8B340678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284820/3DD4D3B8B341678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284820/3DD4D3B8B33F678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.1 PCYES com conector 90° horizontal é ideal para instalações em espaços reduzidos, facilitando a organização e evitando dobras nos cabos.\n\nCom suporte a resolução 8K 60Hz, entrega máxima qualidade de imagem e áudio, sendo perfeito para TVs, monitores, consoles e placas de vídeo de al…",
    "features": [
      "Conector 90° horizontal ideal para espaços compactos",
      "Suporte a resolução 8K 60Hz",
      "Alta performance para áudio e vídeo",
      "Revestimento em nylon mais resistente",
      "Comprimento de 3 metros para maior alcance",
      "Transmissão estável e sem perdas",
      "Cabo com cobre puro para melhor desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284820"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-1-pcyes-90-horizontal-8k-60hz-nylon-preto-3-metros-phm21-3hnp",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-1-pcyes-90-horizontal-8k-60hz-nylon-preto-3-metros-phm21-3hnp",
    "inStock": true
  },
  {
    "id": 134,
    "sku": "284868",
    "name": "Cabo USB-C para P3 Fêmea PCYES Hi-Fi DAC 24/96 Nylon Preto 15cm P3UCP-15P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 278,
    "category": "Periféricos",
    "subcategory": "Adaptador",
    "tags": [
      "Periféricos",
      "Adaptador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284868/3E9AE663DC3A46A5E0630300A8C0F81D",
    "images": [
      "https://cdn.oderco.com.br/produtos/284868/3E9AE663DC3A46A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284868/3E9AE663DC3B46A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284868/3E9AE663DC3946A5E0630300A8C0F81D"
    ],
    "description": "O Cabo USB-C para P3 Fêmea PCYES é ideal para conectar fones de ouvido e dispositivos de áudio em equipamentos com entrada USB-C, garantindo som de alta qualidade.\n\nEquipado com DAC integrado, proporciona áudio Hi-Fi com suporte a 24bits/96kHz, oferecendo maior fidelidade sonora, clareza e desempe…",
    "features": [
      "Ideal para conectar fones P2 em dispositivos USB-C",
      "Áudio Hi-Fi com DAC integrado",
      "Suporte a 24bits/96kHz para alta fidelidade",
      "Compacto e fácil de transportar",
      "Construção resistente em PVC + metal",
      "Cabo com cobre puro para melhor desempenho",
      "Perfeito para smartphones e notebooks sem P2"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284868"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador"
      }
    ],
    "seoSlug": "cabo-usb-c-para-p3-femea-pcyes-hifi-dac-24-96-nylon-preto-15cm-p3ucp-15p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-p3-femea-pcyes-hifi-dac-24-96-nylon-preto-15cm-p3ucp-15p",
    "inStock": true
  },
  {
    "id": 135,
    "sku": "284691",
    "name": "Cabo PCYES USB-C 2.0 15W 480Mbps Nylon Branco 3 Metros PUCC2-3B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 315,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284691/3E0D5A3D1B4BB8F7E0630300A8C0DD9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284691/3E0D5A3D1B4BB8F7E0630300A8C0DD9A",
      "https://cdn.oderco.com.br/produtos/284691/3E0D5A3D1B4CB8F7E0630300A8C0DD9A",
      "https://cdn.oderco.com.br/produtos/284691/3E0D5A3D1B4AB8F7E0630300A8C0DD9A"
    ],
    "description": "O Cabo USB-C 2.0 PCYES é ideal para carregamento e transferência de dados em dispositivos com entrada USB-C, oferecendo praticidade e desempenho no dia a dia.\n\nCom taxa de transferência de até 480Mbps, garante envio estável de arquivos, sendo perfeito para smartphones, tablets e outros dispositivo…",
    "features": [
      "Transferência de dados de até 480Mbps",
      "Carregamento eficiente de até 15W",
      "Revestimento em nylon mais resistente",
      "Comprimento de 3 metros para maior alcance",
      "Compatível com dispositivos USB-C",
      "Cabo com cobre puro para melhor desempenho",
      "Ideal para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284691"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-2-0-pcyes-15w-480mbps-nylon-branco-3-metros-pucc2-3b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-2-0-pcyes-15w-480mbps-nylon-branco-3-metros-pucc2-3b",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 136,
    "sku": "284815",
    "name": "Cabo HDMI PCYES 2.0 90° Horizontal 4K 60Hz Preto 3 Metros PHM20-3H-001",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 352,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Escritório",
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284815/3DD4D3B8B345678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284815/3DD4D3B8B345678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284815/3DD4D3B8B346678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284815/3DD4D3B8B344678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.0 PCYES com conector 90° horizontal é ideal para conexões em espaços reduzidos, facilitando a instalação em TVs, monitores e setups onde o acesso traseiro é limitado.\n\nCom suporte a resolução 4K 60Hz e largura de banda de até 18Gbps, garante transmissão de imagem e áudio com alta qua…",
    "features": [
      "Conector 90° horizontal ideal para espaços reduzidos",
      "Suporte a resolução 4K 60Hz",
      "Alta largura de banda de 18Gbps",
      "Transmissão estável de áudio e vídeo",
      "Comprimento de 3 metros para maior alcance",
      "Construção resistente em PVC",
      "Cabo com cobre puro para melhor desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284815"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-0-pcyes-90-horizontal-4k-60hz-preto-3-metros-phm20-3h-001",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-0-pcyes-90-horizontal-4k-60hz-preto-3-metros-phm20-3h-001",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 137,
    "sku": "282187",
    "name": "Cabo PCYES USB-C 3.1 100W 4K 60Hz Preto 2 Metros PUCP2P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 389,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282187/3DF91DE403F335D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282187/3DF91DE403F335D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282187/3DF91DE403F435D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282187/3DF91DE403F235D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-C 3.1 PCYES é ideal para quem busca alta performance em carregamento e transmissão de dados. Compatível com diversos dispositivos com entrada USB-C, suporta potência de até 100W (20V 5A), garantindo carregamento rápido e eficiente.\n\nAlém disso, oferece suporte a resolução 4K 60Hz, permi…",
    "features": [
      "Carregamento rápido com até 100W de potência",
      "Suporte a vídeo em 4K 60Hz",
      "Alta compatibilidade com dispositivos USB-C",
      "Transmissão estável de dados e energia",
      "Comprimento de 2 metros para mais liberdade",
      "Construção resistente em PVC",
      "Cabo com cobre puro para melhor desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282187"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-3-1-pcyes-100w-4k-60hz-preto-2-metros-pucp2p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-3-1-pcyes-100w-4k-60hz-preto-2-metros-pucp2p",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 138,
    "sku": "284651",
    "name": "Cabo PCYES USB-A 3.0 para USB-C 5Gbps 15W Branco 2 Metros PUCAP3-2B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 426,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284651/3E7286803C25D138E0630300A8C0D86F",
    "images": [
      "https://cdn.oderco.com.br/produtos/284651/3E7286803C25D138E0630300A8C0D86F",
      "https://cdn.oderco.com.br/produtos/284651/3E7286803C26D138E0630300A8C0D86F",
      "https://cdn.oderco.com.br/produtos/284651/3E7286803C24D138E0630300A8C0D86F"
    ],
    "description": "O Cabo USB-A 3.0 para USB-C PCYES é ideal para conectar e carregar dispositivos com entrada USB-C, garantindo alta velocidade de transferência e eficiência no uso diário.\n\nCom taxa de até 5Gbps, permite envio rápido de arquivos com estabilidade, sendo perfeito para notebooks, smartphones, HDs exte…",
    "features": [
      "Transferência de dados em alta velocidade até 5Gbps",
      "Compatível com dispositivos USB-C",
      "Carregamento eficiente de até 15W",
      "Comprimento de 2 metros para maior flexibilidade",
      "Construção resistente em PVC",
      "Cabo com cobre puro para melhor desempenho",
      "Ideal para uso diário e profissional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284651"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-branco-2-metros-pucap3-2b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-branco-2-metros-pucap3-2b",
    "inStock": true
  },
  {
    "id": 139,
    "sku": "284640",
    "name": "Cabo PCYES USB-A 3.0 para USB-C 5Gbps 15W Preto 2 Metros PUCAP3-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 463,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284640/3E76A77CF2EC4314E0630300A8C00D51",
    "images": [
      "https://cdn.oderco.com.br/produtos/284640/3E76A77CF2EC4314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/284640/3E76A77CF2ED4314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/284640/3E76A77CF2EB4314E0630300A8C00D51"
    ],
    "description": "O Cabo USB-A 3.0 para USB-C PCYES é ideal para conectar e carregar dispositivos com entrada USB-C, oferecendo alta velocidade de transferência e eficiência no uso diário.\n\nCom taxa de até 5Gbps, permite transferir arquivos com rapidez e estabilidade, sendo perfeito para notebooks, smartphones, HDs…",
    "features": [
      "Transferência de dados em alta velocidade até 5Gbps",
      "Compatível com dispositivos USB-C",
      "Carregamento eficiente de até 15W",
      "Comprimento de 2 metros para mais liberdade",
      "Construção resistente em PVC",
      "Cabo com cobre puro para melhor desempenho",
      "Ideal para uso diário e profissional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284640"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-preto-2-metros-pucap3-2",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-preto-2-metros-pucap3-2",
    "inStock": true
  },
  {
    "id": 140,
    "sku": "284648",
    "name": "Cabo PCYES USB-A 3.0 para USB-C 5Gbps 15W Branco 1 Metro PUCAP3-1B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 70,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284648/3E76A77CF2D84314E0630300A8C00D51",
    "images": [
      "https://cdn.oderco.com.br/produtos/284648/3E76A77CF2D84314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/284648/3E76A77CF2D94314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/284648/3E76A77CF2D74314E0630300A8C00D51"
    ],
    "description": "O Cabo USB-A 3.0 para USB-C PCYES é ideal para conectar e carregar dispositivos compatíveis com entrada USB-C, oferecendo alta velocidade de transferência e eficiência no uso diário.\n\nCom taxa de até 5Gbps, permite transferir arquivos com rapidez e estabilidade, sendo perfeito para notebooks, smar…",
    "features": [
      "Transferência de dados em alta velocidade até 5Gbps",
      "Compatível com dispositivos USB-C",
      "Carregamento eficiente de até 15W",
      "Comprimento ideal de 1 metro",
      "Construção resistente em PVC",
      "Cabo com cobre puro para melhor desempenho",
      "Uso prático no dia a dia"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284648"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-branco-1-metro-pucap3-1b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-branco-1-metro-pucap3-1b",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 141,
    "sku": "284645",
    "name": "Cabo PCYES USB-A 3.0 para USB-C 5Gbps 15W Preto 3 Metros PUCAP3-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 107,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284645/3E76A77CF2E74314E0630300A8C00D51",
    "images": [
      "https://cdn.oderco.com.br/produtos/284645/3E76A77CF2E74314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/284645/3E76A77CF2E84314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/284645/3E76A77CF2E64314E0630300A8C00D51"
    ],
    "description": "O Cabo USB-A 3.0 para USB-C PCYES é ideal para conectar e carregar dispositivos compatíveis com entrada USB-C, garantindo alta velocidade na transferência de dados e eficiência no carregamento.\n\nCom taxa de transferência de até 5Gbps, permite envio rápido de arquivos, sendo perfeito para uso com n…",
    "features": [
      "Alta velocidade de transferência de até 5Gbps",
      "Compatível com dispositivos USB-C",
      "Carregamento eficiente de até 15W",
      "Comprimento de 3 metros para maior alcance",
      "Construção resistente em PVC",
      "Cabo com cobre puro para melhor desempenho",
      "Ideal para uso diário e profissional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284645"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-preto-3-metros-pucap3-3",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-usb-c-pcyes-5gbps-15w-preto-3-metros-pucap3-3",
    "inStock": true
  },
  {
    "id": 142,
    "sku": "282083",
    "name": "Cabo PCYES USB-C 3.1 100W 4K 60Hz Preto 1 Metro PUCP1P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 144,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282083/3DF91DE403F835D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282083/3DF91DE403F835D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282083/3DF91DE403F935D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282083/3DF91DE403F735D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-C 3.1 PCYES é a escolha ideal para quem busca alta performance em carregamento e transmissão de dados. Compatível com diversos dispositivos com entrada USB-C, ele suporta potência de até 100W (20V 5A), garantindo carregamento rápido e eficiente.\n\nAlém disso, oferece suporte a resolução …",
    "features": [
      "Carregamento rápido com até 100W de potência",
      "Suporte a vídeo em 4K 60Hz",
      "Alta compatibilidade com dispositivos USB-C",
      "Transmissão estável de dados e energia",
      "Construção resistente em PVC",
      "Cabo com cobre puro para melhor desempenho",
      "Ideal para uso diário e profissional"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282083"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-3-1-pcyes-100w-4k-60hz-preto-1-metro-pucp1p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-3-1-pcyes-100w-4k-60hz-preto-1-metro-pucp1p",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 143,
    "sku": "284852",
    "name": "Cabo USB-C para P3 PCYES Áudio Hi-Fi DAC 24/96kHz Branco 15cm P3UCP-15B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 181,
    "category": "Periféricos",
    "subcategory": "Cabo Adaptador",
    "tags": [
      "Periféricos",
      "Cabo Adaptador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284852/3E9AE663DC3E46A5E0630300A8C0F81D",
    "images": [
      "https://cdn.oderco.com.br/produtos/284852/3E9AE663DC3E46A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284852/3E9AE663DC3F46A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284852/3E9AE663DC3D46A5E0630300A8C0F81D"
    ],
    "description": "O Cabo USB-C para P3 PCYES é ideal para conectar fones de ouvido, caixas de som e outros dispositivos de áudio com entrada P3 em aparelhos com saída USB-C. Equipado com DAC integrado, garante conversão digital-analógica de alta qualidade, proporcionando som limpo, equilibrado e com excelente definiç…",
    "features": [
      "Áudio de alta qualidade com DAC integrado",
      "Suporte a som Hi-Fi 24/96kHz",
      "Ideal para fones e dispositivos com entrada P3",
      "Formato compacto de 15cm",
      "Construção resistente em PVC + metal",
      "Transmissão de áudio estável",
      "Compatível com dispositivos USB-C"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284852"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo Adaptador"
      }
    ],
    "seoSlug": "cabo-usb-c-para-p3-pcyes-hifi-dac-24-96khz-branco-15cm-p3ucp-15b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-p3-pcyes-hifi-dac-24-96khz-branco-15cm-p3ucp-15b",
    "inStock": true,
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 144,
    "sku": "284723",
    "name": "Cabo PCYES USB-C para HDMI 2.0 4K 60Hz Nylon Preto 15cm PUCF-15P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 218,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Escritório",
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284723/3E8893D8681E52CAE0630300A8C06E56",
    "images": [
      "https://cdn.oderco.com.br/produtos/284723/3E8893D8681E52CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284723/3E8893D8681F52CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284723/3E8893D8681D52CAE0630300A8C06E56"
    ],
    "description": "O Cabo USB-C para HDMI PCYES 2.0 é ideal para conectar dispositivos com saída USB-C a monitores, TVs e projetores com entrada HDMI. Com suporte a resolução 4K a 60Hz, oferece imagens nítidas, cores vibrantes e excelente fluidez, sendo perfeito para apresentações, trabalho e entretenimento.\n\nSeu fo…",
    "features": [
      "Suporte a resolução 4K 60Hz",
      "Ideal para conectar notebook em monitor ou TV",
      "Formato compacto de 15cm",
      "Revestimento em nylon resistente",
      "Transmissão estável com cobre puro",
      "Compatível com dispositivos USB-C",
      "Perfeito para uso portátil e organizado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284723"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-hdmi-pcyes-20-4k-60hz-nylon-15cm-pucf-15p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-hdmi-pcyes-20-4k-60hz-nylon-15cm-pucf-15p",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 145,
    "sku": "282208",
    "name": "Cabo PCYES USB-A para USB-C 3.0 5Gbps Nylon Preto 3 Metros CBPY003P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 255,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282208/3E76A77CF2E24314E0630300A8C00D51",
    "images": [
      "https://cdn.oderco.com.br/produtos/282208/3E76A77CF2E24314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/282208/3E76A77CF2E34314E0630300A8C00D51",
      "https://cdn.oderco.com.br/produtos/282208/3E76A77CF2E14314E0630300A8C00D51"
    ],
    "description": "O Cabo USB-A para USB-C PCYES 3.0 foi desenvolvido para oferecer alta velocidade de transferência e carregamento eficiente no dia a dia. Com suporte a até 5 Gbps, é ideal para transferência rápida de arquivos, além de garantir carregamento estável para dispositivos compatíveis com USB-C.\n\nSeu reve…",
    "features": [
      "Alta velocidade com até 5 Gbps",
      "Carregamento eficiente com até 3A",
      "Comprimento de 3 metros para maior alcance",
      "Revestimento em nylon resistente e durável",
      "Transmissão estável com cobre puro",
      "Ideal para dispositivos USB-C",
      "Alta resistência ao uso contínuo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282208"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-pcyes-30-5gbps-nylon-preto-3m-cbpy003p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-pcyes-30-5gbps-nylon-preto-3m-cbpy003p",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 146,
    "sku": "282212",
    "name": "Cabo PCYES USB-A para USB-C 2.0 480Mbps Nylon Vermelho 3 Metros CBPY03V",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 292,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282212/3DF91DE403D535D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282212/3DF91DE403D535D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282212/3DF91DE403D635D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282212/3DF91DE403D435D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-A para USB-C PCYES 2.0 é ideal para carregar e transferir dados entre dispositivos com praticidade e segurança. Com suporte a corrente de até 3A, proporciona carregamento eficiente para smartphones, tablets e outros dispositivos compatíveis com USB-C.\n\nSeu revestimento em nylon reforçad…",
    "features": [
      "Carregamento rápido com até 3A",
      "Comprimento de 3 metros para maior liberdade",
      "Revestimento em nylon resistente e durável",
      "Transmissão estável de dados",
      "Ideal para smartphones e dispositivos USB-C",
      "Alta resistência ao uso contínuo",
      "Design moderno com conector vermelho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282212"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-para-usb-c-pcyes-20-480mbps-nylon-vermelho-3m-cbpy03v",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-para-usb-c-pcyes-20-480mbps-nylon-vermelho-3m-cbpy03v",
    "inStock": true
  },
  {
    "id": 147,
    "sku": "286344",
    "name": "Cabo PCYES USB-C para HDMI 2.0 4K 60Hz Nylon Preto 2 Metros PUCH2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 329,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286344/3DE5E526B2D308A5E0630300A8C08449",
    "images": [
      "https://cdn.oderco.com.br/produtos/286344/3DE5E526B2D308A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/286344/3DE5E526B2D408A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/286344/3DE5E526B2D208A5E0630300A8C08449"
    ],
    "description": "O Cabo USB-C para HDMI PCYES 2.0 é ideal para quem precisa conectar dispositivos com saída USB-C a monitores, TVs e projetores com entrada HDMI. Com suporte a resolução 4K a 60Hz, proporciona imagens nítidas, cores vibrantes e excelente fluidez, sendo perfeito para trabalho, entretenimento e setups …",
    "features": [
      "Suporte a resolução 4K 60Hz",
      "Imagem nítida e com alta definição",
      "Ideal para conectar notebook em monitor ou TV",
      "Revestimento em nylon resistente e durável",
      "Transmissão estável com cobre puro",
      "Compatível com diversos dispositivos USB-C",
      "Suporte a HDR e conteúdos em alta qualidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286344"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-hdmi-pcyes-20-4k-60hz-nylon-2m-puch2",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-hdmi-pcyes-20-4k-60hz-nylon-2m-puch2",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 148,
    "sku": "284843",
    "name": "Cabo HDMI PCYES 2.1 8K 60Hz Conector 90° Vertical Preto PVC 3 Metros PH21-3V-E",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 366,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284843/3DD4D3B8B368678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284843/3DD4D3B8B368678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284843/3DD4D3B8B369678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284843/3DD4D3B8B367678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI PCYES 2.1 foi desenvolvido para entregar máxima performance em imagem e áudio, sendo ideal para setups gamers, profissionais e domésticos que exigem alto desempenho. Com suporte a resolução 8K a 60Hz, proporciona imagens extremamente nítidas, cores mais vivas e maior fluidez para conteúd…",
    "features": [
      "Suporte a resolução 8K 60Hz",
      "Maior qualidade de imagem e fluidez",
      "Conector 90° vertical ideal para espaços reduzidos",
      "Construção resistente em PVC",
      "Transmissão estável com cobre puro",
      "Compatível com diversos dispositivos HDMI",
      "Suporte a HDR e conteúdos em alta definição"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284843"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-pcyes-21-8k-60hz-vertical-preto-3m-ph21-3v-e",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-pcyes-21-8k-60hz-vertical-preto-3m-ph21-3v-e",
    "inStock": true
  },
  {
    "id": 149,
    "sku": "284836",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz Conector 90° Vertical Preto PVC 3 Metros PH20-3V-C",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 403,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284836/3DD4D3B8B363678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284836/3DD4D3B8B363678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284836/3DD4D3B8B364678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284836/3DD4D3B8B362678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI PCYES 2.0 foi desenvolvido para entregar alta qualidade de imagem e som, sendo ideal para quem busca desempenho confiável em setups gamers, profissionais ou domésticos. Com suporte a resolução 4K a 60Hz, proporciona imagens nítidas, cores vivas e excelente fluidez para filmes, jogos e co…",
    "features": [
      "Suporte a resolução 4K 60Hz",
      "Imagem nítida e com alta definição",
      "Conector 90° vertical ideal para espaços compactos",
      "Maior durabilidade com revestimento em PVC",
      "Transmissão estável com cobre puro",
      "Compatível com diversos dispositivos HDMI",
      "Suporte a HDR e conteúdos em alta qualidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284836"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-pcyes-20-4k-60hz-vertical-preto-3m-ph20-3v-c",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-pcyes-20-4k-60hz-vertical-preto-3m-ph20-3v-c",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 150,
    "sku": "284817",
    "name": "Cabo HDMI PCYES 2.1 8K 60Hz Preto PVC 2 Metros PHM21-2H-PVC01",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 440,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Gaming",
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284817/3DD4D3B8B34F678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284817/3DD4D3B8B34F678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284817/3DD4D3B8B350678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284817/3DD4D3B8B34E678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI PCYES 2.1 foi desenvolvido para oferecer máxima qualidade de imagem e som, sendo ideal para setups gamers e profissionais que exigem alto desempenho. Com suporte a resolução 8K a 60Hz, ele garante imagens mais nítidas, cores vibrantes e maior fluidez, elevando sua experiência visual a ou…",
    "features": [
      "Alta resolução com suporte a 8K 60Hz",
      "Maior fluidez e qualidade de imagem para games e filmes",
      "Conector 90° horizontal ideal para espaços reduzidos",
      "Construção em PVC resistente e durável",
      "Transmissão estável com cobre puro",
      "Compatível com diversos dispositivos HDMI",
      "Suporte a HDR e conteúdos em alta definição"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284817"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-pcyes-21-8k-60hz-preto-2m-phm21-2h-pvc01",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-pcyes-21-8k-60hz-preto-2m-phm21-2h-pvc01",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 151,
    "sku": "284864",
    "name": "Cabo USB-C para P3 Fêmea PCYES Hi-Fi Nylon Branco 15cm P3UCP-15HFB",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 477,
    "category": "Periféricos",
    "subcategory": "Adaptador",
    "tags": [
      "Periféricos",
      "Adaptador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284864/43F6DF8AED7D7F53E0630300A8C07EEF",
    "images": [
      "https://cdn.oderco.com.br/produtos/284864/43F6DF8AED7D7F53E0630300A8C07EEF",
      "https://cdn.oderco.com.br/produtos/284864/43F6DF8AED7E7F53E0630300A8C07EEF",
      "https://cdn.oderco.com.br/produtos/284864/43F6DF8AED7C7F53E0630300A8C07EEF"
    ],
    "description": "O Cabo USB-C para P3 Fêmea P3UCP-15HFB da PCYES é ideal para conectar fones de ouvido, headsets e caixas de som com entrada P2 (3,5mm) em dispositivos com porta USB-C, como smartphones, tablets e notebooks.\n\nEquipado com DAC integrado (IC), garante qualidade de áudio Hi-Fi, proporcionando som mais…",
    "features": [
      "Permite usar fones P2 em dispositivos USB-C",
      "DAC integrado para melhor qualidade de áudio",
      "Som Hi-Fi com suporte a 24bit/96KHz",
      "Ideal para smartphones, tablets e notebooks sem entrada P2",
      "Construção resistente com nylon e acabamento em metal",
      "Tamanho compacto de 15cm para fácil transporte"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284864"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador"
      }
    ],
    "seoSlug": "cabo-usb-c-para-p3-femea-15cm-p3ucp-15hfb",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-p3-femea-15cm-p3ucp-15hfb",
    "inStock": true
  },
  {
    "id": 152,
    "sku": "282192",
    "name": "Cabo PCYES USB-C 3.1 para USB-C 3.1 Branco 2 Metros PUCP2B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 84,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282192/3DF91DE403E435D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282192/3DF91DE403E435D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282192/3DF91DE403E535D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282192/3DF91DE403E335D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-C 3.1 para USB-C 3.1 PUCP2B da PCYES é ideal para carregar, transferir dados e transmitir vídeo entre dispositivos com conexão USB-C, como notebooks, tablets, smartphones e monitores compatíveis.\n\nCompatível com carregamento de até 100W (20V 5A), permite alimentar notebooks e outros dis…",
    "features": [
      "Permite carregar e sincronizar dispositivos USB-C",
      "Suporte a carregamento rápido de até 100W (20V 5A)",
      "Compatível com transmissão de vídeo em 4K 60Hz",
      "Ideal para notebooks, tablets e smartphones USB-C",
      "Construção com cobre puro para melhor condução elétrica",
      "Comprimento de 2 metros para maior flexibilidade de uso"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282192"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-3-1-para-usb-c-3-1-2m-pucp2b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-3-1-para-usb-c-3-1-2m-pucp2b",
    "inStock": true
  },
  {
    "id": 153,
    "sku": "284652",
    "name": "Cabo PCYES USB-A 3.0 para USB-C Branco 3 Metros PUCAP3-3B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 121,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284652/3E7286803C20D138E0630300A8C0D86F",
    "images": [
      "https://cdn.oderco.com.br/produtos/284652/3E7286803C20D138E0630300A8C0D86F",
      "https://cdn.oderco.com.br/produtos/284652/3E7286803C21D138E0630300A8C0D86F",
      "https://cdn.oderco.com.br/produtos/284652/3E7286803C1FD138E0630300A8C0D86F"
    ],
    "description": "O Cabo USB-A 3.0 para USB-C PUCAP3-3B da PCYES é ideal para conectar dispositivos USB-C a portas USB-A, permitindo transferência rápida de dados e carregamento eficiente em notebooks, desktops, carregadores e power banks.\n\nCom taxa de transferência de até 5 Gbps, oferece alta velocidade para envio…",
    "features": [
      "Permite conectar dispositivos USB-C a portas USB-A",
      "Transferência de dados de alta velocidade até 5 Gbps",
      "Compatível com smartphones, tablets e outros dispositivos USB-C",
      "Suporte a carregamento de até 3A (15W)",
      "Construção com cobre puro para melhor condução elétrica",
      "Comprimento de 3 metros para maior flexibilidade de uso"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284652"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-usb-c-3m-pucap3-3b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-usb-c-3m-pucap3-3b",
    "inStock": true
  },
  {
    "id": 154,
    "sku": "282194",
    "name": "Cabo USB-C 3.1 para USB-C 3.1 PCYES Nylon Branco 3 Metros PUCP3B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 158,
    "category": "Periféricos",
    "subcategory": "Cabo -C",
    "tags": [
      "Periféricos",
      "Cabo -C"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282194/3DF91DE403DF35D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282194/3DF91DE403DF35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282194/3DF91DE403E035D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282194/3DF91DE403DE35D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-C 3.1 para USB-C 3.1 PUCP3B da PCYES é ideal para carregar, transferir dados e transmitir vídeo entre dispositivos com conexão USB-C, como notebooks, tablets, smartphones e monitores compatíveis.\n\nCompatível com carregamento de até 100W (20V 5A), permite alimentar notebooks e dispositiv…",
    "features": [
      "Permite carregar e sincronizar dispositivos USB-C",
      "Suporte a carregamento rápido de até 100W (20V 5A)",
      "Compatível com transmissão de vídeo em 4K 60Hz",
      "Transferência de dados de até 480 Mbps",
      "Revestimento em nylon reforçado para maior durabilidade",
      "Comprimento de 3 metros para maior flexibilidade de uso"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282194"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo -C"
      }
    ],
    "seoSlug": "cabo-usb-c-3-1-para-usb-c-3-1-3m-pucp3b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-3-1-para-usb-c-3-1-3m-pucp3b",
    "inStock": true,
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 155,
    "sku": "282191",
    "name": "Cabo USB-C 3.1 para USB-C 3.1 PCYES Branco 1 Metro PUCP1B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 195,
    "category": "Periféricos",
    "subcategory": "Cabo -C",
    "tags": [
      "Periféricos",
      "Cabo -C"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282191/3DF91DE403E935D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282191/3DF91DE403E935D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282191/3DF91DE403EA35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282191/3DF91DE403E835D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-C 3.1 para USB-C 3.1 PUCP1B da PCYES é ideal para carregar, transferir dados e transmitir vídeo entre dispositivos com conexão USB-C, como notebooks, tablets, smartphones e monitores compatíveis.\n\nCompatível com carregamento de até 100W (20V 5A), permite alimentar notebooks e outros dis…",
    "features": [
      "Permite carregar e sincronizar dispositivos USB-C",
      "Suporte a carregamento rápido de até 100W (20V 5A)",
      "Compatível com transmissão de vídeo em 4K 60Hz",
      "Ideal para notebooks, tablets e smartphones USB-C",
      "Construção com cobre puro para melhor condução elétrica",
      "Comprimento de 1 metro para uso prático no dia a dia"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282191"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo -C"
      }
    ],
    "seoSlug": "cabo-usb-c-3-1-para-usb-c-3-1-1m-pucp1b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-3-1-para-usb-c-3-1-1m-pucp1b",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 156,
    "sku": "282211",
    "name": "Cabo PCYES USB-A 2.0 para USB-C Nylon Branco 2 Metros CBPY03B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 232,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282211/3DF91DE403D035D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282211/3DF91DE403D035D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282211/3DF91DE403D135D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282211/3DF91DE403CF35D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-A 2.0 para USB-C CBPY03B da PCYES é ideal para carregar e sincronizar smartphones, tablets e outros dispositivos com entrada USB-C utilizando portas USB-A, presentes em computadores, carregadores e power banks.\n\nCom taxa de transferência de até 480 Mbps, permite sincronização rápida de …",
    "features": [
      "Permite carregar dispositivos USB-C em portas USB-A",
      "Compatível com smartphones, tablets e outros dispositivos USB-C",
      "Taxa de transferência de dados de até 480 Mbps",
      "Suporte a carregamento de até 3A (15W)",
      "Revestimento em nylon para maior resistência e durabilidade",
      "Comprimento de 2 metros para maior flexibilidade de uso"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282211"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-2-0-para-usb-c-2m-cbpy03b",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-2-0-para-usb-c-2m-cbpy03b",
    "inStock": true
  },
  {
    "id": 157,
    "sku": "286343",
    "name": "Cabo PCYES USB-C para HDMI 2.1 8K 60Hz 4K 144Hz 15cm PUCF-15-2.1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 269,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286343/43F6DF8AED857F53E0630300A8C07EEF",
    "images": [
      "https://cdn.oderco.com.br/produtos/286343/43F6DF8AED857F53E0630300A8C07EEF",
      "https://cdn.oderco.com.br/produtos/286343/43F6DF8AED867F53E0630300A8C07EEF",
      "https://cdn.oderco.com.br/produtos/286343/43F6DF8AED847F53E0630300A8C07EEF"
    ],
    "description": "O Cabo USB-C para HDMI Fêmea 2.1 PUCF-15-2.1 da PCYES é ideal para conectar dispositivos com saída USB-C a cabos ou dispositivos HDMI, permitindo transmissão de vídeo e áudio em alta resolução para TVs, monitores ou projetores compatíveis.\n\nCompatível com resoluções de até 8K a 60Hz ou 4K a 144Hz,…",
    "features": [
      "Permite conectar dispositivos USB-C a cabos ou equipamentos HDMI",
      "Suporte a resolução até 8K 60Hz ou 4K 144Hz",
      "Alta largura de banda de até 32 Gbit/s",
      "Compatível com HDR estático e conteúdo 3D",
      "Transmissão de áudio LPCM com até 7 canais",
      "Design compacto com 15 cm para maior praticidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286343"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-hdmi-2-1-8k-15cm-pucf-15-2-1",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-hdmi-2-1-8k-15cm-pucf-15-2-1",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 158,
    "sku": "284720",
    "name": "Cabo PCYES USB-C para HDMI 2.1 8K 60Hz 4K 144Hz Nylon 2 Metros PUCH2P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 306,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284720/3DE5E526B2D808A5E0630300A8C08449",
    "images": [
      "https://cdn.oderco.com.br/produtos/284720/3DE5E526B2D808A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284720/3DE5E526B2D908A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284720/3DE5E526B2D708A5E0630300A8C08449"
    ],
    "description": "O Cabo USB-C para HDMI 2.1 PUCH2P da PCYES é ideal para conectar notebooks, tablets ou smartphones com USB-C a TVs, monitores ou projetores com entrada HDMI, permitindo transmissão de vídeo e áudio com alta qualidade.\n\nCompatível com resoluções de até 8K a 60Hz ou 4K a 144Hz, o cabo oferece imagen…",
    "features": [
      "Permite conectar dispositivos USB-C a TVs, monitores e projetores HDMI",
      "Suporte a resolução até 8K 60Hz ou 4K 144Hz",
      "Alta largura de banda de até 32 Gbit/s",
      "Suporte a HDR estático para melhor qualidade de imagem",
      "Transmissão de áudio LPCM com até 7 canais",
      "Revestimento em nylon reforçado para maior durabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284720"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-hdmi-2-1-8k-2m-puch2p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-hdmi-2-1-8k-2m-puch2p",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 159,
    "sku": "282189",
    "name": "Cabo USB-C 3.1 para USB-C 3.1 PCYES 100W 4K 60Hz Nylon 3 Metros PUCP3P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 343,
    "category": "Periféricos",
    "subcategory": "Cabo -C",
    "tags": [
      "Periféricos",
      "Cabo -C"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282189/3DF91DE403EE35D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/282189/3DF91DE403EE35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282189/3DF91DE403EF35D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/282189/3DF91DE403ED35D5E0630300A8C0B965"
    ],
    "description": "O Cabo USB-C 3.1 para USB-C 3.1 PUCP3P da PCYES foi desenvolvido para oferecer alto desempenho na transmissão de energia, dados e vídeo entre dispositivos compatíveis com USB-C. Ideal para notebooks, tablets, smartphones, monitores e docks, permite conexão rápida e eficiente para diferentes aplicaçõ…",
    "features": [
      "Suporte a carregamento rápido de até 100W (20V 5A)",
      "Compatível com notebooks, tablets e smartphones USB-C",
      "Suporte a transmissão de vídeo em 4K 60Hz",
      "Comprimento de 3 metros para maior flexibilidade no uso",
      "Revestimento em nylon reforçado para maior durabilidade",
      "Construção com cobre puro para transmissão eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282189"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo -C"
      }
    ],
    "seoSlug": "cabo-usb-c-3-1-para-usb-c-3-1-100w-3m-pucp3p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-3-1-para-usb-c-3-1-100w-3m-pucp3p",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 160,
    "sku": "284819",
    "name": "Cabo HDMI PCYES 2.1 8K 60Hz Conector 90° Horizontal 3 Metros PH21-3H-A",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 380,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284819/3DD4D3B8B354678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284819/3DD4D3B8B354678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284819/3DD4D3B8B355678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284819/3DD4D3B8B353678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.1 8K 60Hz com Conector 90° Horizontal PH21-3H-A da PCYES foi desenvolvido para oferecer alta qualidade de imagem e maior praticidade em instalações com pouco espaço. Seu conector HDMI em ângulo de 90° facilita a conexão em TVs instaladas na parede, monitores próximos à parede ou setups…",
    "features": [
      "Conector HDMI 90° horizontal ideal para TVs próximas à parede",
      "Suporte a resolução 8K 60Hz para imagens ultra definidas",
      "Compatível com monitores, TVs, consoles e placas de vídeo",
      "Comprimento de 3 metros para maior flexibilidade no setup",
      "Construção com cobre puro para transmissão estável",
      "Suporte a HDR, áudio multicanal e tecnologias HDMI modernas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284819"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-1-8k-60hz-conector-90-horizontal-3m-ph21-3h-a",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-1-8k-60hz-conector-90-horizontal-3m-ph21-3h-a",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 161,
    "sku": "284721",
    "name": "Cabo USB-C para HDMI 2.0 Fêmea 4K 60Hz PCYES 15cm PUCF-15",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 417,
    "category": "Periféricos",
    "subcategory": "Adaptador",
    "tags": [
      "Periféricos",
      "Adaptador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284721/3E8893D8682252CAE0630300A8C06E56",
    "images": [
      "https://cdn.oderco.com.br/produtos/284721/3E8893D8682252CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284721/3E8893D8682352CAE0630300A8C06E56",
      "https://cdn.oderco.com.br/produtos/284721/3E8893D8682152CAE0630300A8C06E56"
    ],
    "description": "O Cabo USB-C para HDMI 2.0 Fêmea PUCF-15 da PCYES foi desenvolvido para conectar dispositivos com porta USB-C a monitores, TVs e projetores com entrada HDMI. Ideal para notebooks, tablets e smartphones compatíveis, permite expandir ou espelhar a tela para displays externos com alta qualidade de imag…",
    "features": [
      "Ideal para conectar dispositivos USB-C a monitores e TVs HDMI",
      "Suporte a resolução de até 4K 60Hz para imagens nítidas",
      "Largura de banda de até 10.8Gbps para transmissão estável",
      "Design compacto de 15 cm ideal para uso como adaptador",
      "Compatível com notebooks, tablets e smartphones USB-C",
      "Suporte a áudio multicanal e tecnologias modernas de vídeo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284721"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador"
      }
    ],
    "seoSlug": "cabo-usb-c-para-hdmi-2-0-femea-4k-60hz-15cm-pucf-15",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-hdmi-2-0-femea-4k-60hz-15cm-pucf-15",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 162,
    "sku": "286341",
    "name": "Cabo USB-C para HDMI 2.1 Fêmea 8K 60Hz PCYES 15cm Nylon PUCM-15P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 454,
    "category": "Periféricos",
    "subcategory": "Adaptador",
    "tags": [
      "Periféricos",
      "Adaptador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286341/43F6DF8AED817F53E0630300A8C07EEF",
    "images": [
      "https://cdn.oderco.com.br/produtos/286341/43F6DF8AED817F53E0630300A8C07EEF",
      "https://cdn.oderco.com.br/produtos/286341/43F6DF8AED827F53E0630300A8C07EEF",
      "https://cdn.oderco.com.br/produtos/286341/43F6DF8AED807F53E0630300A8C07EEF"
    ],
    "description": "O Cabo USB-C para HDMI 2.1 Fêmea PUCM-15P da PCYES foi desenvolvido para permitir a conexão de dispositivos com porta USB-C a monitores, TVs e projetores através de interface HDMI. Ideal para notebooks, tablets e smartphones compatíveis, possibilita transmissão de vídeo em alta definição para telas …",
    "features": [
      "Ideal para conectar dispositivos USB-C a monitores, TVs e projetores HDMI",
      "Suporte a resolução de até 8K 60Hz e 4K 144Hz",
      "Alta largura de banda de até 32Gbps para transmissão estável",
      "Design compacto de 15 cm ideal para uso como adaptador",
      "Revestimento em nylon que aumenta a durabilidade",
      "Compatível com notebooks, tablets e smartphones com USB-C"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286341"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador"
      }
    ],
    "seoSlug": "cabo-usb-c-para-hdmi-2-1-femea-8k-60hz-15cm-pucm-15p",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-hdmi-2-1-femea-8k-60hz-15cm-pucm-15p",
    "inStock": true
  },
  {
    "id": 163,
    "sku": "32621",
    "name": "Cabo PCYES USB-C para USB B 2.0 1 Metro PUCBP-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 61,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32621/44801E8A3917CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/32621/44801E8A3917CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32621/44801E8A3918CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32621/44801E8A3916CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB-C para USB B 2.0 PUCBP-1 da PCYES foi desenvolvido para oferecer conexão eficiente entre dispositivos com porta USB-C e equipamentos que utilizam interface USB B. É ideal para impressoras, scanners, interfaces de áudio e outros periféricos compatíveis, permitindo comunicação estável entre…",
    "features": [
      "Ideal para conexão de impressoras e periféricos USB B",
      "Compatível com notebooks e dispositivos modernos com USB-C",
      "Transferência de dados de até 480 Mbps",
      "Suporte a carregamento de até 12W (5V 2.5A)",
      "Construção em cobre para melhor condução elétrica",
      "Comprimento de 1 metro para uso prático no setup"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32621"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-c-para-usb-b-2-0-1m-pucbp-1",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-c-para-usb-b-2-0-1m-pucbp-1",
    "inStock": true
  },
  {
    "id": 164,
    "sku": "29317",
    "name": "Cabo PCYES VGA para Monitor 2 Metros PVGA-2",
    "price": "R$ 899,90",
    "priceNum": 899.9,
    "rating": 4.6,
    "reviews": 98,
    "category": "Monitores",
    "subcategory": "Cabo",
    "tags": [
      "Escritório",
      "Monitores",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29317/447FEF48C8554865E0630300A8C0010D",
    "images": [
      "https://cdn.oderco.com.br/produtos/29317/447FEF48C8554865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29317/447FEF48C8564865E0630300A8C0010D",
      "https://cdn.oderco.com.br/produtos/29317/447FEF48C8544865E0630300A8C0010D"
    ],
    "description": "O Cabo VGA para Monitor PVGA-2 da PCYES foi desenvolvido para garantir conexão estável entre dispositivos que utilizam interface VGA analógica. Ideal para monitores, placas de vídeo, notebooks, computadores e TVs compatíveis, permite transmissão de vídeo com qualidade e confiabilidade para diferente…",
    "features": [
      "Ideal para conexão de monitores e dispositivos com porta VGA",
      "Compatível com computadores, notebooks, placas de vídeo e TVs",
      "Comprimento de 2 metros para maior flexibilidade no setup",
      "Construção em cobre puro para transmissão estável de vídeo",
      "Suporte a resolução de até 1280x1024p",
      "Conexão analógica confiável para uso profissional ou doméstico"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29317"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-vga-para-monitor-2m-pvga-2",
    "productUrl": "https://www.pcyes.com.br/cabo-vga-para-monitor-2m-pvga-2",
    "inStock": true
  },
  {
    "id": 165,
    "sku": "29291",
    "name": "Cabo PCYES para Impressora USB A 3.0 para USB B 3.0 2 Metros PUABM3-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 135,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29291/4CD7DF2DB8D53526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/29291/4CD7DF2DB8D53526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29291/4CD7DF2DB8D63526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29291/4CD7DF2DB8D43526E0630300A8C075C0"
    ],
    "description": "O Cabo para Impressora USB A 3.0 para USB B 3.0 PUABM3-2 da PCYES foi desenvolvido para oferecer conexão rápida, estável e eficiente entre computadores e dispositivos com porta USB B 3.0. Ideal para impressoras, copiadoras e periféricos profissionais, garante comunicação confiável para ambientes dom…",
    "features": [
      "Ideal para conexão de impressoras com porta USB B 3.0",
      "Transferência de dados de até 5 Gbps com padrão USB 3.0",
      "Compatível com HDs externos, dock stations e hubs USB",
      "Comprimento de 2 metros para maior flexibilidade no setup",
      "Construção com cobre puro para transmissão estável",
      "Revestimento em PVC resistente para maior durabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29291"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-para-impressora-usb-a-3-0-para-usb-b-3-0-2m-puabm3-2",
    "productUrl": "https://www.pcyes.com.br/cabo-para-impressora-usb-a-3-0-para-usb-b-3-0-2m-puabm3-2",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 166,
    "sku": "32597",
    "name": "Cabo PCYES USB A 2.0 para USB Tipo-C 50cm PUACP-05",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 172,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32597/4CD7DF2DB8FB3526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/32597/4CD7DF2DB8FB3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/32597/4CD7DF2DB8FC3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/32597/4CD7DF2DB8FA3526E0630300A8C075C0"
    ],
    "description": "O Cabo USB A 2.0 para USB Tipo-C PUACP-05 da PCYES foi desenvolvido para oferecer conexão eficiente e transmissão estável entre dispositivos compatíveis. Com 50 cm de comprimento, é ideal para uso com carregadores, power banks, notebooks e computadores, proporcionando praticidade em ambientes onde c…",
    "features": [
      "Comprimento compacto de 50 cm ideal para uso próximo ao carregador",
      "Transferência de dados de até 480 Mbps com padrão USB 2.0",
      "Compatível com smartphones, tablets e dispositivos USB-C",
      "Construção em cobre puro para maior estabilidade elétrica",
      "Suporte a corrente de até 5V 3A para carregamento eficiente",
      "Conexão confiável para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32597"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-2-0-para-usb-c-50cm-puacp-05",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-2-0-para-usb-c-50cm-puacp-05",
    "inStock": true
  },
  {
    "id": 167,
    "sku": "32617",
    "name": "Cabo PCYES Micro USB para USB A 2.0 50cm PMUAP-05",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 209,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32617/44801E8A38E5CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/32617/44801E8A38E5CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32617/44801E8A38E6CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/32617/44801E8A38E4CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo Micro USB para USB A 2.0 PMUAP-05 da PCYES foi desenvolvido para garantir conexão eficiente e transmissão estável entre dispositivos compatíveis. Com 50 cm de comprimento, é ideal para uso em carregadores, power banks, notebooks e computadores, oferecendo praticidade em ambientes onde cabos c…",
    "features": [
      "Comprimento compacto de 50 cm ideal para uso próximo ao carregador",
      "Transferência de dados de até 480 Mbps com padrão USB 2.0",
      "Compatível com smartphones, acessórios e dispositivos Micro USB",
      "Construção em cobre puro para maior estabilidade elétrica",
      "Suporte a corrente de até 5V 3A para carregamento eficiente",
      "Conexão confiável para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32617"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-micro-usb-para-usb-a-2-0-50cm-pmuap-05",
    "productUrl": "https://www.pcyes.com.br/cabo-micro-usb-para-usb-a-2-0-50cm-pmuap-05",
    "inStock": true
  },
  {
    "id": 168,
    "sku": "29299",
    "name": "Cabo PCYES USB A 2.0 para Mini USB B 2.0 3 Metros PUANM2-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 246,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29299/44801E8A3921CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29299/44801E8A3921CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29299/44801E8A3922CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29299/44801E8A3920CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB A 2.0 para Mini USB B 2.0 PUANM2-3 da PCYES foi desenvolvido para oferecer conexão estável e eficiente entre computadores e dispositivos compatíveis com porta Mini USB. Com taxa de transferência de até 480 Mbps, permite transmissão de dados rápida e confiável para diferentes tipos de equi…",
    "features": [
      "Transferência de dados de até 480 Mbps com padrão USB 2.0",
      "Compatível com diversos dispositivos com porta Mini USB",
      "Comprimento de 3 metros para maior alcance e flexibilidade",
      "Construção em cobre puro para transmissão estável",
      "Ideal para câmeras, players de mídia e periféricos portáteis",
      "Conexão confiável para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29299"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-2-0-para-mini-usb-b-2-0-3m-puanm2-3",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-2-0-para-mini-usb-b-2-0-3m-puanm2-3",
    "inStock": true
  },
  {
    "id": 169,
    "sku": "29297",
    "name": "Cabo PCYES USB A 2.0 para Mini USB B 2.0 1 Metro PUANM2-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 283,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29297/44801E8A391CCC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29297/44801E8A391CCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29297/44801E8A391DCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29297/44801E8A391BCC1FE0630300A8C0585E"
    ],
    "description": "O Cabo USB A 2.0 para Mini USB B 2.0 PUANM2-1 da PCYES foi desenvolvido para oferecer conexão estável e transmissão eficiente de dados entre dispositivos compatíveis. Com taxa de transferência de até 480 Mbps, é ideal para conectar equipamentos como câmeras digitais, controles, dispositivos portátei…",
    "features": [
      "Transferência de dados de até 480 Mbps com padrão USB 2.0",
      "Compatível com dispositivos que utilizam conexão Mini USB",
      "Construção com cobre puro para maior estabilidade elétrica",
      "Revestimento em PVC resistente que aumenta a durabilidade",
      "Comprimento de 1 metro ideal para uso em mesas e setups",
      "Conexão confiável para câmeras, controles e dispositivos portáteis"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29297"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-2-0-para-mini-usb-b-2-0-1m-puanm2-1",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-2-0-para-mini-usb-b-2-0-1m-puanm2-1",
    "inStock": true
  },
  {
    "id": 170,
    "sku": "106922",
    "name": "Cabo HDMI PCYES Ultra 2.1 8K 144Hz Nylon 1 Metro PHU21P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 320,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Gaming",
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/106922/44801E8A38C8CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/106922/44801E8A38C8CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/106922/44801E8A38C9CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/106922/44801E8A38C7CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo HDMI Ultra PCYES 2.1 PHU21P foi desenvolvido para entregar máxima qualidade de imagem e desempenho em setups gamers e profissionais. Compatível com resoluções 8K a 60Hz e 4K a 144Hz, garante transmissão de vídeo extremamente fluida, com alto nível de detalhe e fidelidade visual para monitores…",
    "features": [
      "Suporte a resolução 8K 60Hz e 4K 144Hz para imagens ultra detalhadas",
      "Alta largura de banda de 48Gbps para transmissão estável e rápida",
      "Revestimento em nylon reforçado que aumenta a durabilidade do cabo",
      "Compatível com TVs, monitores, consoles e placas de vídeo modernas",
      "Suporte a HDR para cores mais vivas e realistas",
      "Transmissão de áudio multicanal de alta qualidade",
      "Conectores HDMI 2.1 resistentes com acabamento premium"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "106922"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-ultra-2-1-8k-144hz-1m-nylon-phu21p",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-ultra-2-1-8k-144hz-1m-nylon-phu21p",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 171,
    "sku": "284751",
    "name": "Cabo HDMI PCYES 2.1 Ultra Nylon 8K 60Hz 4K 144Hz 1m PHU21P",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 357,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Gaming",
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284751/3DE5E526B2CE08A5E0630300A8C08449",
    "images": [
      "https://cdn.oderco.com.br/produtos/284751/3DE5E526B2CE08A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284751/3DE5E526B2CF08A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284751/3DE5E526B2CD08A5E0630300A8C08449"
    ],
    "description": "O Cabo HDMI 2.1 PCYES Ultra Nylon 8K 60Hz 4K 144Hz 1m PHU21P foi desenvolvido para oferecer alto desempenho na transmissão de áudio e vídeo em equipamentos de última geração. Compatível com resolução até 8K a 60Hz e 4K a 144Hz, proporciona imagens extremamente nítidas, maior fluidez e cores mais pre…",
    "features": [
      "Suporte a resolução até 8K 60Hz para imagens ultra nítidas",
      "Compatível com 4K 144Hz ideal para monitores gamers",
      "Largura de banda de até 48 Gbit/s para transmissão ultrarrápida",
      "Condutor em cobre puro 30 AWG para melhor qualidade de sinal",
      "Revestimento em nylon reforçado para maior durabilidade",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284751"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-2-1-pcyes-ultra-nylon-8k-60hz-4k-144hz-1m-phu21p",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-2-1-pcyes-ultra-nylon-8k-60hz-4k-144hz-1m-phu21p",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 172,
    "sku": "261089",
    "name": "Placa de Vídeo GT730 PCYES 2GB DDR5 64Bits Edge Low Profile Single Fan PVGT730GB2PE",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.8,
    "reviews": 394,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/261089/25C94E9521803DCCE0630300A8C00F3E",
    "images": [
      "https://cdn.oderco.com.br/produtos/261089/25C94E9521803DCCE0630300A8C00F3E",
      "https://cdn.oderco.com.br/produtos/261089/25C94E9521823DCCE0630300A8C00F3E"
    ],
    "description": "A Placa de Vídeo GT730 PCYES 2GB DDR5 64Bits Edge Low Profile Single Fan PVGT730GB2PE é ideal para quem busca upgrade gráfico acessível, mais desempenho e melhor qualidade de imagem no dia a dia.\n\nCom 2GB DDR5 e interface de 64bits, oferece desempenho superior às soluções integradas, garantindo im…",
    "features": [
      "2GB DDR5 para melhor desempenho gráfico.",
      "Interface 64bits com maior estabilidade visual.",
      "Projeto Low Profile ideal para gabinetes compactos.",
      "Sistema Single Fan com operação eficiente.",
      "Saídas HDMI e DVI para maior compatibilidade.",
      "Upgrade acessível para substituir vídeo integrado.",
      "Ideal para multimídia, escritório e jogos leves."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "261089"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-de-video-gt730-pcyes-2gb-ddr5-64bits-edge-low-profile",
    "productUrl": "https://www.pcyes.com.br/placa-de-video-gt730-pcyes-2gb-ddr5-64bits-edge-low-profile",
    "inStock": true
  },
  {
    "id": 173,
    "sku": "330106",
    "name": "Headset PCYES Comfort CM300 P2 3,5mm Driver 40mm com Microfone Omnidirecional CM300P2",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.9,
    "reviews": 431,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/330106/4BB9BEBBD7C1244CE0630300A8C01476",
    "images": [
      "https://cdn.oderco.com.br/produtos/330106/4BB9BEBBD7C1244CE0630300A8C01476",
      "https://cdn.oderco.com.br/produtos/330106/4BB9BEBBD7C2244CE0630300A8C01476",
      "https://cdn.oderco.com.br/produtos/330106/4BB9BEBBD7C4244CE0630300A8C01476"
    ],
    "description": "O Headset Comfort CM300 PCYES P2 3,5mm Driver 40mm com Microfone Omnidirecional CM300P2 é a escolha ideal para home office, reuniões online e chamadas prolongadas, unindo conforto, praticidade e áudio de qualidade.\n\nEquipado com drivers de 40mm, entrega som nítido e equilibrado, com resposta de fr…",
    "features": [
      "Drivers 40mm com som claro e equilibrado.",
      "Microfone omnidirecional para comunicação eficiente.",
      "Conexão P2 3,5mm compatível com diversos dispositivos.",
      "Cabo 1,8m para maior liberdade de movimento.",
      "Leve e confortável para uso prolongado.",
      "Ideal para home office, aulas online e reuniões.",
      "Ótimo custo-benefício para produtividade diária."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "330106"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-comfort-cm300-pcyes-p2-35mm-40mm-cm300p2",
    "productUrl": "https://www.pcyes.com.br/headset-comfort-cm300-pcyes-p2-35mm-40mm-cm300p2",
    "inStock": true
  },
  {
    "id": 174,
    "sku": "108069",
    "name": "Teclado PCYES Sem Fio Soft ABNT2 2.4GHz 9 Teclas Multimídia PTOSFWAB",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 468,
    "category": "Periféricos",
    "subcategory": "Teclado",
    "tags": [
      "Wireless",
      "Periféricos",
      "Teclado"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108069/4CD86E7687E27463E0630300A8C06FD7",
    "images": [
      "https://cdn.oderco.com.br/produtos/108069/4CD86E7687E27463E0630300A8C06FD7",
      "https://cdn.oderco.com.br/produtos/108069/4CD86E7687E47463E0630300A8C06FD7",
      "https://cdn.oderco.com.br/produtos/108069/4CD86E7687E57463E0630300A8C06FD7"
    ],
    "description": "O Teclado Sem Fio Soft PCYES ABNT2 2.4GHz 9 Teclas Multimídia PTOSFWAB oferece praticidade e conforto para o uso diário em escritório ou home office.\n\nCom conexão wireless 2.4GHz, garante mais liberdade e organização no setup. Possui 107 teclas no padrão ABNT2, incluindo 9 teclas multimídia que fa…",
    "features": [
      "Conexão Wireless 2.4GHz estável.",
      "Layout ABNT2 padrão brasileiro.",
      "9 teclas multimídia dedicadas.",
      "Resistente a respingos d’água.",
      "Digitação confortável e silenciosa.",
      "Modo de suspensão para economia de energia.",
      "Base com ajuste de inclinação.",
      "Vida útil de até 10 milhões de pressionamentos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108069"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado"
      }
    ],
    "seoSlug": "teclado-sem-fio-soft-pcyes-24ghz-abnt2-ptosfwab",
    "productUrl": "https://www.pcyes.com.br/teclado-sem-fio-soft-pcyes-24ghz-abnt2-ptosfwab",
    "inStock": true
  },
  {
    "id": 175,
    "sku": "108071",
    "name": "Kit com Teclado e Mouse Sem Fio Soft PCYES ABNT2 2.4GHz 1200DPI Multimídia PCOSFWAB",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 75,
    "category": "Periféricos",
    "subcategory": "Kit Teclado e Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Kit Teclado e Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108071/4BCFE3586AD99C49E0630300A8C04FAF",
    "images": [
      "https://cdn.oderco.com.br/produtos/108071/4BCFE3586AD99C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/108071/4BCFE3586AD79C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/108071/4BCFE3586AD89C49E0630300A8C04FAF"
    ],
    "description": "O Kit Teclado e Mouse Sem Fio Soft PCYES ABNT2 2.4GHz 1200DPI Multimídia PCOSFWAB combina praticidade, conforto e recursos extras para o uso diário.\n\nCom conexão wireless 2.4GHz e alcance de até 8 metros, proporciona mais liberdade e organização no setup. O teclado possui 107 teclas no padrão ABNT…",
    "features": [
      "Conexão sem fio 2.4GHz com alcance de até 8m.",
      "Layout ABNT2 padrão brasileiro.",
      "9 teclas multimídia para mais praticidade.",
      "Mouse óptico 1200 DPI com alta precisão.",
      "Teclado resistente a respingos d’água.",
      "Modo de suspensão automática para economia de energia.",
      "Base com ajuste de inclinação e pés antiderrapantes.",
      "Vida útil de até 10 milhões de pressionamentos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108071"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Teclado e Mouse"
      }
    ],
    "seoSlug": "kit-teclado-mouse-sem-fio-soft-pcyes-24ghz-1200dpi-pcosfwab",
    "productUrl": "https://www.pcyes.com.br/kit-teclado-mouse-sem-fio-soft-pcyes-24ghz-1200dpi-pcosfwab",
    "inStock": true,
    "oldPrice": "R$ 471,88",
    "oldPriceNum": 471.88
  },
  {
    "id": 176,
    "sku": "108070",
    "name": "Kit com Teclado e Mouse Sem Fio Comfort PCYES ABNT2 2.4GHz 1200DPI Ergonômico PCOCWAB",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 112,
    "category": "Periféricos",
    "subcategory": "Kit Teclado e Mouse",
    "tags": [
      "Wireless",
      "Escritório",
      "Periféricos",
      "Kit Teclado e Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108070/4BCFE3586AD39C49E0630300A8C04FAF",
    "images": [
      "https://cdn.oderco.com.br/produtos/108070/4BCFE3586AD39C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/108070/4BCFE3586AD29C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/108070/4BCFE3586AD49C49E0630300A8C04FAF"
    ],
    "description": "O Kit Teclado e Mouse Sem Fio Comfort PCYES ABNT2 2.4GHz 1200DPI Ergonômico PCOCWAB oferece liberdade, conforto e eficiência para o dia a dia.\n\nCom conexão wireless 2.4GHz e alcance de até 8 metros, proporciona maior mobilidade e organização no setup. O teclado conta com 106 teclas no padrão ABNT2…",
    "features": [
      "Conexão sem fio 2.4GHz com alcance de até 8m.",
      "Layout ABNT2 padrão brasileiro.",
      "Mouse óptico 1200 DPI com alta precisão.",
      "Design ergonômico para maior conforto.",
      "Teclado resistente a respingos d’água.",
      "Modo de suspensão automática para economia de energia.",
      "Base com ajuste de inclinação e pés antiderrapantes.",
      "Ideal para escritório e home office."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108070"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Teclado e Mouse"
      }
    ],
    "seoSlug": "kit-teclado-mouse-sem-fio-comfort-pcyes-24ghz-1200dpi-pcocwab",
    "productUrl": "https://www.pcyes.com.br/kit-teclado-mouse-sem-fio-comfort-pcyes-24ghz-1200dpi-pcocwab",
    "inStock": true,
    "oldPrice": "R$ 447,89",
    "oldPriceNum": 447.89
  },
  {
    "id": 177,
    "sku": "212998",
    "name": "Kit com Teclado e Mouse USB Classic PCYES ABNT2 1000DPI Cabo 2m KCBK",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.7,
    "reviews": 149,
    "category": "Periféricos",
    "subcategory": "Kit Teclado e Mouse",
    "tags": [
      "Periféricos",
      "Kit Teclado e Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212998/4BCFE3586ACD9C49E0630300A8C04FAF",
    "images": [
      "https://cdn.oderco.com.br/produtos/212998/4BCFE3586ACD9C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/212998/4BCFE3586ACC9C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/212998/4BCFE3586ACE9C49E0630300A8C04FAF"
    ],
    "description": "O Kit Teclado e Mouse USB Classic PCYES ABNT2 1000DPI Cabo 2m KCBK é a solução ideal para quem busca praticidade, durabilidade e eficiência no dia a dia.\n\nO teclado conta com 107 teclas no padrão ABNT2, digitação confortável com pressão de 55±7g e curso de 4±0,2mm. Possui resistência a respingos d…",
    "features": [
      "Layout ABNT2 padrão brasileiro.",
      "Mouse óptico 1000 DPI com alta precisão.",
      "Cabos USB de 2 metros para maior alcance.",
      "Teclado resistente a respingos d’água.",
      "Digitação confortável e silenciosa.",
      "Ajuste de inclinação com base antiderrapante.",
      "Vida útil de até 10 milhões de pressionamentos.",
      "Ideal para escritório e uso profissional."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212998"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Teclado e Mouse"
      }
    ],
    "seoSlug": "kit-teclado-mouse-usb-classic-pcyes-abnt2-1000dpi-kcbk",
    "productUrl": "https://www.pcyes.com.br/kit-teclado-mouse-usb-classic-pcyes-abnt2-1000dpi-kcbk",
    "inStock": true
  },
  {
    "id": 178,
    "sku": "208582",
    "name": "Teclado Mecânico PCYES 75% Rasec Gasket Mount Gateron Brown RGB ABNT2 TWGBRRGB",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.8,
    "reviews": 186,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/208582/4D264D266FA1FF2FE0630300A8C0B56D",
    "images": [
      "https://cdn.oderco.com.br/produtos/208582/4D264D266FA1FF2FE0630300A8C0B56D",
      "https://cdn.oderco.com.br/produtos/208582/4D264D266FA2FF2FE0630300A8C0B56D",
      "https://cdn.oderco.com.br/produtos/208582/4D264D266FA4FF2FE0630300A8C0B56D"
    ],
    "description": "O Teclado Mecânico 75% Rasec PCYES Gasket Mount Gateron Brown RGB ABNT2 TWGBRRGB é ideal para quem busca equilíbrio entre conforto tátil, precisão e construção premium.\n\nSeu formato 75% com 82 teclas e knob multifuncional garante praticidade e melhor aproveitamento de espaço, mantendo o layout ABN…",
    "features": [
      "Formato 75% com 82 teclas + knob.",
      "Switch Gateron Brown hotswappable.",
      "Estrutura Gasket Mount com amortecimento acústico.",
      "Anti-ghosting 100% para máxima precisão.",
      "Tempo de resposta de 1ms.",
      "Iluminação RGB personalizável.",
      "Keycaps Full Black Doubleshot Injection.",
      "Cabo removível USB-C 1,6m."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "208582"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-75-rasec-pcyes-gasket-gateron-brown-rgb-twgbrrgb",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-75-rasec-pcyes-gasket-gateron-brown-rgb-twgbrrgb",
    "inStock": true
  },
  {
    "id": 179,
    "sku": "252542",
    "name": "Teclado Mecânico PCYES 75% Kirin Black Vulcan Red Switch LED Rainbow PTKR75RD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.9,
    "reviews": 223,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252542/4BCFE3586AC29C49E0630300A8C04FAF",
    "images": [
      "https://cdn.oderco.com.br/produtos/252542/4BCFE3586AC29C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/252542/4BCFE3586AC09C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/252542/4BCFE3586AC49C49E0630300A8C04FAF"
    ],
    "description": "O Teclado Mecânico 75% Kirin PCYES Black Vulcan Red Switch LED Rainbow PTKR75RD é ideal para quem busca agilidade, conforto e um visual gamer marcante.\n\nSeu formato compacto 75% com 83 teclas oferece melhor aproveitamento de espaço, mantendo o layout ABNT2 para uso prático no dia a dia e máxima ef…",
    "features": [
      "Formato compacto 75% com 83 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Red com acionamento linear e silencioso.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps Tri-color Doubleshot Injection mais resistentes.",
      "Iluminação LED Rainbow em blocos.",
      "Cabo USB 1,8m para maior praticidade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252542"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-75-kirin-pcyes-black-vulcan-red-switch-ptkr75rd",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-75-kirin-pcyes-black-vulcan-red-switch-ptkr75rd",
    "inStock": true,
    "badge": "RED SWITCH"
  },
  {
    "id": 180,
    "sku": "252541",
    "name": "Teclado Mecânico PCYES Kirin Black Vulcan Blue Switch LED Rainbow PTKR75BL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 260,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252541/4BCFE3586ABC9C49E0630300A8C04FAF",
    "images": [
      "https://cdn.oderco.com.br/produtos/252541/4BCFE3586ABC9C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/252541/4BCFE3586ABA9C49E0630300A8C04FAF",
      "https://cdn.oderco.com.br/produtos/252541/4BCFE3586ABE9C49E0630300A8C04FAF"
    ],
    "description": "O Teclado Mecânico Kirin PCYES Black Vulcan Blue Switch PTKR75BL é o aliado ideal para quem busca desempenho, durabilidade e visual marcante no setup gamer.\n\nSeu formato compacto 75% com 83 teclas oferece mais espaço na mesa sem abrir mão do layout ABNT2, garantindo conforto tanto para jogos quant…",
    "features": [
      "Formato compacto 75% com 83 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Blue com resposta tátil e clique audível.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps Tri-color Doubleshot Injection mais resistentes.",
      "Iluminação Rainbow em blocos para setup gamer.",
      "Cabo USB de 1,8m para maior praticidade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252541"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-kirin-pcyes-black-vulcan-blue-switch-ptkr75bl",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-kirin-pcyes-black-vulcan-blue-switch-ptkr75bl",
    "inStock": true,
    "badge": "BLUE SWITCH",
    "oldPrice": "R$ 471,88",
    "oldPriceNum": 471.88
  },
  {
    "id": 181,
    "sku": "330107",
    "name": "Headset PCYES Comfort CM500 USB Driver 40mm com Microfone Omnidirecional CM500",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.5,
    "reviews": 297,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/330107/4BB9BEBBD7BC244CE0630300A8C01476",
    "images": [
      "https://cdn.oderco.com.br/produtos/330107/4BB9BEBBD7BC244CE0630300A8C01476",
      "https://cdn.oderco.com.br/produtos/330107/4BB9BEBBD7BD244CE0630300A8C01476",
      "https://cdn.oderco.com.br/produtos/330107/4BB9BEBBD7BF244CE0630300A8C01476"
    ],
    "description": "O Headset Comfort CM500 PCYES USB Driver 40mm com Microfone Omnidirecional CM500 é ideal para home office, reuniões online e chamadas prolongadas, oferecendo conforto, praticidade e áudio de qualidade.\n\nCom drivers de 40mm, entrega som nítido e equilibrado, com resposta de frequência de 20Hz a 20k…",
    "features": [
      "Drivers 40mm com som claro e equilibrado.",
      "Microfone omnidirecional para comunicação eficiente.",
      "Conexão USB prática e estável.",
      "Cabo 1,8m para maior mobilidade.",
      "Leve e confortável para uso prolongado.",
      "Ideal para home office, reuniões e aulas online.",
      "Ótimo custo-benefício para produtividade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "330107"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-comfort-cm500-pcyes-usb-40mm-cm500",
    "productUrl": "https://www.pcyes.com.br/headset-comfort-cm500-pcyes-usb-40mm-cm500",
    "inStock": true
  },
  {
    "id": 182,
    "sku": "29294",
    "name": "Cabo PCYES USB A 3.0 para Micro USB B 3.0 2m PUAMCM3-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 334,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29294/4CD7DF2DB8DA3526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/29294/4CD7DF2DB8DA3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29294/4CD7DF2DB8DB3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29294/4CD7DF2DB8D93526E0630300A8C075C0"
    ],
    "description": "O Cabo USB A 3.0 para Micro USB B 3.0 PCYES 2m PUAMCM3-2 foi desenvolvido para garantir alta velocidade e confiabilidade na conexão de HDs externos e dispositivos compatíveis com Micro USB B 3.0. Ideal para uso com computadores, notebooks e outros equipamentos com porta USB A.\n\nCom suporte a taxa …",
    "features": [
      "Ideal para conexão de HDs externos e dispositivos Micro USB B 3.0",
      "Compatível com computadores e notebooks com porta USB A",
      "Transferência de dados de até 5 Gbps padrão USB 3.0",
      "Condutores em cobre puro 24+28 AWG para maior estabilidade",
      "Suporte a corrente de até 5V 3A (15W)",
      "Comprimento de 2 metros para maior flexibilidade no uso",
      "Construção resistente com revestimento em PVC",
      "Instalação simples com conexão plug and play"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29294"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-usb-a-3-0-para-micro-usb-b-3-0-pcyes-2m-puamcm3-2",
    "productUrl": "https://www.pcyes.com.br/cabo-usb-a-3-0-para-micro-usb-b-3-0-pcyes-2m-puamcm3-2",
    "inStock": true
  },
  {
    "id": 183,
    "sku": "32618",
    "name": "Cabo PCYES Micro USB para USB A 2.0 1m PMUAP-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 371,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32618/4CD7DF2DB9143526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/32618/4CD7DF2DB9143526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/32618/4CD7DF2DB9153526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/32618/4CD7DF2DB9133526E0630300A8C075C0"
    ],
    "description": "O Cabo Micro USB para USB A 2.0 PCYES 1m PMUAP-1 foi desenvolvido para garantir conexão eficiente entre dispositivos com porta Micro USB e equipamentos com entrada USB A. Ideal para uso com smartphones, tablets, power banks, caixas de som, controles e diversos acessórios compatíveis.\n\nCom suporte …",
    "features": [
      "Compatível com dispositivos com entrada Micro USB",
      "Conector USB A para ampla compatibilidade com computadores e carregadores",
      "Transferência de dados de até 480 Mbps",
      "Capacidade de carregamento de até 5V 3A (15W)",
      "Condutor em cobre para melhor eficiência na transmissão",
      "Bitola 28 AWG para estabilidade de energia e dados",
      "Comprimento de 1 metro ideal para uso cotidiano",
      "Construção resistente para maior durabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32618"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-micro-usb-para-usb-a-2-0-pcyes-1m-pmuap-1",
    "productUrl": "https://www.pcyes.com.br/cabo-micro-usb-para-usb-a-2-0-pcyes-1m-pmuap-1",
    "inStock": true
  },
  {
    "id": 184,
    "sku": "29301",
    "name": "Cabo PCYES Extensor USB A 2.0 Macho para Fêmea 2m PUAMF2-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 408,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29301/49D848F395AE8A12E0630300A8C0EA50",
    "images": [
      "https://cdn.oderco.com.br/produtos/29301/49D848F395AE8A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/29301/49D848F395AC8A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/29301/49D848F395AD8A12E0630300A8C0EA50"
    ],
    "description": "O Cabo Extensor USB A 2.0 Macho para Fêmea PCYES 2m PUAMF2-2 foi desenvolvido para ampliar o alcance das conexões USB com praticidade e organização. Ideal para estender portas USB em computadores e notebooks, facilita o uso de periféricos sem a necessidade de reposicionar equipamentos.\n\nCompatível…",
    "features": [
      "Extensão de porta USB para maior alcance e praticidade",
      "Compatível com periféricos USB como mouse, teclado e impressora",
      "Transferência de dados de até 480 Mbps padrão USB 2.0",
      "Condutores em cobre puro 24+28 AWG para transmissão estável",
      "Comprimento de 2 metros ideal para setups maiores",
      "Conector USB A macho para USB A fêmea",
      "Instalação simples com conexão plug and play",
      "Construção resistente para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29301"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-extensor-usb-a-2-0-macho-para-femea-pcyes-2m-puamf2-2",
    "productUrl": "https://www.pcyes.com.br/cabo-extensor-usb-a-2-0-macho-para-femea-pcyes-2m-puamf2-2",
    "inStock": true
  },
  {
    "id": 185,
    "sku": "29300",
    "name": "Cabo PCYES Extensor USB A 2.0 Macho para Fêmea 1m PUAMF2-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 445,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29300/44801E8A389BCC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29300/44801E8A389BCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29300/44801E8A389CCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29300/44801E8A389ACC1FE0630300A8C0585E"
    ],
    "description": "O Cabo Extensor USB A 2.0 Macho para Fêmea PCYES 1m PUAMF2-1 foi desenvolvido para ampliar o alcance das conexões USB com praticidade e segurança. Ele permite estender portas USB em computadores, notebooks e outros dispositivos, facilitando o acesso e a organização do seu setup.\n\nCompatível com di…",
    "features": [
      "Extensão de porta USB para maior alcance e organização",
      "Compatível com periféricos USB como mouse, teclado e impressora",
      "Transferência de dados de até 480 Mbps padrão USB 2.0",
      "Condutor em cobre puro 28 AWG para transmissão estável",
      "Comprimento de 1 metro ideal para mesas e setups",
      "Conector USB A macho para USB A fêmea",
      "Instalação simples com conexão plug and play",
      "Construção resistente para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29300"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-extensor-usb-a-2-0-macho-para-femea-pcyes-1m-puamf2-1",
    "productUrl": "https://www.pcyes.com.br/cabo-extensor-usb-a-2-0-macho-para-femea-pcyes-1m-puamf2-1",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 186,
    "sku": "284725",
    "name": "Cabo PCYES DisplayPort 2.1 Nylon 8K 60Hz 2m PDPN2-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 52,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Gaming",
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284725/3E9AE663DC4646A5E0630300A8C0F81D",
    "images": [
      "https://cdn.oderco.com.br/produtos/284725/3E9AE663DC4646A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284725/3E9AE663DC4746A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284725/3E9AE663DC4546A5E0630300A8C0F81D"
    ],
    "description": "O Cabo DisplayPort 2.1 PCYES Nylon 8K 60Hz 2m PDPN2-2 foi desenvolvido para oferecer transmissão de vídeo e áudio de altíssima qualidade em setups profissionais e gamers. Compatível com dispositivos que utilizam conexão DisplayPort, é ideal para conectar placas de vídeo, monitores e estações de trab…",
    "features": [
      "Compatível com padrão DisplayPort 2.1 para máxima performance",
      "Suporte a resolução até 8K 60Hz para imagens ultra nítidas",
      "Alta largura de banda de até 48 Gbit/s",
      "Suporte a HDR estático e conteúdo 3D",
      "Áudio LPCM com até 32 canais",
      "Condutor em cobre puro 30 AWG para transmissão mais estável",
      "Revestimento em nylon reforçado para maior durabilidade",
      "Comprimento de 2 metros ideal para setups gamers e profissionais"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284725"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-displayport-2-1-pcyes-nylon-8k-60hz-2m-pdpn2-2",
    "productUrl": "https://www.pcyes.com.br/cabo-displayport-2-1-pcyes-nylon-8k-60hz-2m-pdpn2-2",
    "inStock": true
  },
  {
    "id": 187,
    "sku": "29332",
    "name": "Cabo PCYES DisplayPort 1.4 para HDMI 2.0 2m PDPHM-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 89,
    "category": "Periféricos",
    "subcategory": "Cabo",
    "tags": [
      "Periféricos",
      "Cabo"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29332/4CD7DF2DB8E93526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/29332/4CD7DF2DB8E93526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29332/4CD7DF2DB8EA3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29332/4CD7DF2DB8E83526E0630300A8C075C0"
    ],
    "description": "O Cabo DisplayPort 1.4 para HDMI 2.0 PCYES 2m PDPHM-2 é ideal para conectar computadores, placas de vídeo ou notebooks com saída DisplayPort a monitores, TVs ou projetores com entrada HDMI. Ele permite transmitir vídeo e áudio com qualidade e estabilidade, sendo perfeito para ambientes profissionais…",
    "features": [
      "Conecta dispositivos DisplayPort a monitores ou TVs com HDMI",
      "Suporte a resolução até 4K/2K para imagens mais nítidas",
      "Transmissão de áudio LPCM com até 7 canais",
      "Condutor em cobre puro 32 AWG para melhor qualidade de sinal",
      "Comprimento de 2 metros ideal para setups de mesa e entretenimento",
      "Construção resistente em PVC para maior durabilidade",
      "Instalação simples sem necessidade de adaptadores adicionais",
      "Ideal para PCs, notebooks, monitores e projetores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29332"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo"
      }
    ],
    "seoSlug": "cabo-displayport-1-4-para-hdmi-2-0-pcyes-2m-pdphm-2",
    "productUrl": "https://www.pcyes.com.br/cabo-displayport-1-4-para-hdmi-2-0-pcyes-2m-pdphm-2",
    "inStock": true,
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 188,
    "sku": "29335",
    "name": "Cabo P2 3.5mm Macho para P2 3.5mm Macho PCYES 60cm P35M-06",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 126,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29335/4CD7DF2DB8EE3526E0630300A8C075C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/29335/4CD7DF2DB8EE3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29335/4CD7DF2DB8EF3526E0630300A8C075C0",
      "https://cdn.oderco.com.br/produtos/29335/4CD7DF2DB8ED3526E0630300A8C075C0"
    ],
    "description": "O Cabo P2 3.5mm Macho para P2 3.5mm Macho PCYES 60cm P35M-06 é ideal para conectar dispositivos de áudio com entrada AUX de forma prática e eficiente. Compatível com smartphones, notebooks, caixas de som, sistemas automotivos, fones de ouvido e diversos equipamentos multimídia.\n\nCom condutor em co…",
    "features": [
      "Conexão P2 3.5mm macho para macho compatível com diversos dispositivos",
      "Ideal para uso em smartphones, notebooks, caixas de som e sistemas automotivos",
      "Transmissão de áudio estéreo com qualidade e estabilidade",
      "Condutor em cobre puro 28 AWG para melhor desempenho de sinal",
      "Comprimento de 60 cm ideal para conexões curtas e organizadas",
      "Compatível com entradas AUX padrão 3.5mm",
      "Construção resistente para maior durabilidade",
      "Design compacto e fácil de transportar"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29335"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-p2-3-5mm-macho-para-p2-3-5mm-macho-pcyes-60cm-p35m-06",
    "productUrl": "https://www.pcyes.com.br/cabo-p2-3-5mm-macho-para-p2-3-5mm-macho-pcyes-60cm-p35m-06",
    "inStock": true
  },
  {
    "id": 189,
    "sku": "284877",
    "name": "Cabo Adaptador Y P3 Fêmea para P2 Macho PCYES 15cm P3Y-15",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 163,
    "category": "Periféricos",
    "subcategory": "Adaptador de Áudio",
    "tags": [
      "Periféricos",
      "Adaptador de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284877/3E9AE663DC4246A5E0630300A8C0F81D",
    "images": [
      "https://cdn.oderco.com.br/produtos/284877/3E9AE663DC4246A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284877/3E9AE663DC4346A5E0630300A8C0F81D",
      "https://cdn.oderco.com.br/produtos/284877/3E9AE663DC4146A5E0630300A8C0F81D"
    ],
    "description": "O Cabo Adaptador Y P3 Fêmea para P2 Macho PCYES 15cm P3Y-15 foi desenvolvido para oferecer praticidade e qualidade na conexão de dispositivos de áudio. Com formato em Y, permite conectar fones ou headsets com conector P3 a dispositivos com entrada P2, garantindo compatibilidade e excelente desempenh…",
    "features": [
      "Adaptador em Y para conexão de dispositivos de áudio",
      "Compatível com conectores P3 fêmea e P2 macho",
      "Qualidade de áudio Hi-Fi para som mais limpo",
      "DAC IC integrado para melhor conversão de áudio",
      "Condutor em cobre puro para melhor transmissão de sinal",
      "Estrutura resistente com PVC e metal",
      "Comprimento compacto de 15 cm para maior praticidade",
      "Ideal para headsets, fones de ouvido e dispositivos multimídia"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284877"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Adaptador de Áudio"
      }
    ],
    "seoSlug": "cabo-adaptador-y-p3-femea-para-p2-macho-pcyes-15cm-p3y-15",
    "productUrl": "https://www.pcyes.com.br/cabo-adaptador-y-p3-femea-para-p2-macho-pcyes-15cm-p3y-15",
    "inStock": true
  },
  {
    "id": 190,
    "sku": "284753",
    "name": "Cabo HDMI PCYES 2.1 Ultra 8K 60Hz 4K 144Hz 3m PHU21-3",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 200,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Gaming",
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284753/3DD4D3B8B33B678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284753/3DD4D3B8B33B678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284753/3DD4D3B8B33C678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284753/3DD4D3B8B33D678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.1 PCYES Ultra 8K 60Hz 4K 144Hz 3m PHU21-3 foi desenvolvido para oferecer o máximo desempenho em transmissão de áudio e vídeo para equipamentos de última geração. Compatível com resolução 8K a 60Hz e 4K a 144Hz, garante imagens extremamente nítidas, cores mais vivas e maior fluidez para…",
    "features": [
      "Suporte a resolução 8K com taxa de atualização de 60Hz",
      "Compatível com 4K 144Hz ideal para monitores e setups gamers",
      "Largura de banda de até 48 Gbit/s para transmissão ultrarrápida",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Compatível com HDR para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Comprimento de 3 metros para maior flexibilidade de instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284753"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-21-pcyes-ultra-8k-60hz-4k-144hz-3m-phu21-3",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-21-pcyes-ultra-8k-60hz-4k-144hz-3m-phu21-3",
    "inStock": true,
    "badge": "4K",
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 191,
    "sku": "284822",
    "name": "Cabo HDMI PCYES 2.0 Conector 90° Vertical 4K 60Hz 2m PH20-2V-B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 237,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284822/3DD4D3B8B35E678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284822/3DD4D3B8B35E678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284822/3DD4D3B8B35F678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284822/3DD4D3B8B360678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.0 PCYES Conector 90° Vertical 4K 60Hz 2m PH20-2V-B foi desenvolvido para proporcionar transmissão de áudio e vídeo com alta qualidade e praticidade em instalações onde o espaço é limitado. Seu conector em ângulo de 90° vertical facilita a conexão em TVs, monitores e equipamentos posici…",
    "features": [
      "Conector HDMI em ângulo de 90° vertical ideal para instalações compactas",
      "Suporte a resolução 4K com taxa de atualização de 60Hz",
      "Alta largura de banda de 18 Gbit/s para transmissão estável",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Comprimento de 2 metros para maior flexibilidade de instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284822"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-20-pcyes-conector-90-vertical-4k-60hz-2m-ph20-2v-b",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-20-pcyes-conector-90-vertical-4k-60hz-2m-ph20-2v-b",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 192,
    "sku": "284772",
    "name": "Cabo HDMI PCYES 2.0 Conector 90° Horizontal 4K 60Hz 2m PH90H-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 274,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284772/3DD4D3B8B359678FE0630300A8C03B2A",
    "images": [
      "https://cdn.oderco.com.br/produtos/284772/3DD4D3B8B359678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284772/3DD4D3B8B35A678FE0630300A8C03B2A",
      "https://cdn.oderco.com.br/produtos/284772/3DD4D3B8B35B678FE0630300A8C03B2A"
    ],
    "description": "O Cabo HDMI 2.0 PCYES Conector 90° Horizontal 4K 60Hz 2m PH90H-2 foi desenvolvido para oferecer transmissão de áudio e vídeo com alta qualidade e praticidade em instalações onde o espaço é limitado. Seu conector em ângulo de 90° horizontal facilita a conexão em TVs, monitores e equipamentos posicion…",
    "features": [
      "Conector HDMI em ângulo de 90° horizontal ideal para espaços reduzidos",
      "Suporte a resolução 4K com taxa de atualização de 60Hz",
      "Alta largura de banda de 18 Gbit/s para transmissão estável",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Comprimento de 2 metros para maior flexibilidade de instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284772"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-20-pcyes-conector-90-horizontal-4k-60hz-2m-ph90h-2",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-20-pcyes-conector-90-horizontal-4k-60hz-2m-ph90h-2",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 193,
    "sku": "284756",
    "name": "Cabo HDMI PCYES 2.0 Nylon 4K 60Hz 3m PHM20-3NZ",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 311,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284756/3DE5E526B2C408A5E0630300A8C08449",
    "images": [
      "https://cdn.oderco.com.br/produtos/284756/3DE5E526B2C408A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284756/3DE5E526B2C508A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284756/3DE5E526B2C608A5E0630300A8C08449"
    ],
    "description": "O Cabo HDMI 2.0 PCYES Nylon 4K 60Hz 3m PHM20-3NZ PCYes foi desenvolvido para oferecer transmissão de áudio e vídeo com alta qualidade, estabilidade e durabilidade. Compatível com resolução 4K a 60Hz, proporciona imagens mais nítidas, cores vibrantes e excelente fluidez para TVs, monitores, consoles,…",
    "features": [
      "Suporte a resolução 4K com taxa de atualização de 60Hz",
      "Alta largura de banda de 18 Gbit/s para transmissão estável",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Revestimento em nylon trançado para maior resistência",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Comprimento de 3 metros para maior flexibilidade de instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284756"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-20-pcyes-nylon-4k-60hz-3m-phm20-3nz",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-20-pcyes-nylon-4k-60hz-3m-phm20-3nz",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 194,
    "sku": "29336",
    "name": "Cabo de Áudio PCYES P2 3,5mm Estéreo 2m P35M-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 348,
    "category": "Periféricos",
    "subcategory": "Cabo de Áudio",
    "tags": [
      "Periféricos",
      "Cabo de Áudio"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29336/44801E8A38E0CC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29336/44801E8A38E0CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29336/44801E8A38E1CC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29336/44801E8A38E2CC1FE0630300A8C0585E"
    ],
    "description": "O Cabo de Áudio P2 3,5mm PCYES Estéreo 2m P35M-2 PCYes foi desenvolvido para proporcionar transmissão de áudio com qualidade, estabilidade e excelente durabilidade. Com conexão P2 3,5 mm macho para P2 3,5 mm macho, é ideal para conectar smartphones, notebooks, PCs, tablets, caixas de som, sistemas d…",
    "features": [
      "Conexão P2 3,5 mm macho para P2 3,5 mm macho",
      "Transmissão de áudio estéreo com alta qualidade",
      "Condutor em cobre puro 28 AWG para melhor sinal",
      "Comprimento de 2 metros para maior flexibilidade",
      "Compatível com dispositivos com entrada AUX",
      "Design robusto com acabamento durável",
      "Ideal para smartphones, notebooks, PCs e caixas de som",
      "Maior estabilidade e menor interferência no áudio"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29336"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo de Áudio"
      }
    ],
    "seoSlug": "cabo-audio-p2-35mm-pcyes-estereo-2m-p35m-2",
    "productUrl": "https://www.pcyes.com.br/cabo-audio-p2-35mm-pcyes-estereo-2m-p35m-2",
    "inStock": true
  },
  {
    "id": 195,
    "sku": "284754",
    "name": "Cabo HDMI PCYES 2.0 Nylon 4K 60Hz 3m PHM3P-2",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.7,
    "reviews": 385,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284754/3DE5E526B2C908A5E0630300A8C08449",
    "images": [
      "https://cdn.oderco.com.br/produtos/284754/3DE5E526B2C908A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284754/3DE5E526B2CA08A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/284754/3DE5E526B2CB08A5E0630300A8C08449"
    ],
    "description": "O Cabo HDMI 2.0 PCYES Nylon 4K 60Hz 3m PHM3P-2 PCYes foi desenvolvido para oferecer transmissão de áudio e vídeo com alta qualidade, estabilidade e durabilidade para setups modernos. Compatível com resolução 4K a 60Hz, garante imagens nítidas, cores vibrantes e excelente fluidez para TVs, monitores,…",
    "features": [
      "Suporte a resolução 4K com taxa de atualização de 60Hz",
      "Alta largura de banda de 18 Gbit/s para transmissão estável",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Revestimento em nylon trançado para maior resistência",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Comprimento de 3 metros para maior flexibilidade de instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284754"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-20-pcyes-nylon-4k-60hz-3m-phm3p-2",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-20-pcyes-nylon-4k-60hz-3m-phm3p-2",
    "inStock": true,
    "badge": "4K",
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 196,
    "sku": "34364",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 50cm PHM20-05",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 422,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34364/49D848F3959A8A12E0630300A8C0EA50",
    "images": [
      "https://cdn.oderco.com.br/produtos/34364/49D848F3959A8A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/34364/49D848F3959B8A12E0630300A8C0EA50",
      "https://cdn.oderco.com.br/produtos/34364/49D848F3959C8A12E0630300A8C0EA50"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 4K 60Hz 50cm PHM20-05 PCYes foi desenvolvido para oferecer transmissão de áudio e vídeo com alta qualidade e estabilidade para diversos dispositivos. Compatível com resolução 4K a 60Hz, proporciona imagens nítidas, cores mais realistas e excelente fluidez para TVs, monitores, c…",
    "features": [
      "Suporte a resolução 4K com taxa de atualização de 60Hz",
      "Alta largura de banda de 18 Gbit/s para transmissão estável",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Design robusto com materiais duráveis",
      "Comprimento compacto ideal para conexões curtas e organizadas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34364"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-20-pcyes-4k-60hz-50cm-phm20-05",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-20-pcyes-4k-60hz-50cm-phm20-05",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 197,
    "sku": "29306",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 1m PHM20-1",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.9,
    "reviews": 459,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/29306/44801E8A38AACC1FE0630300A8C0585E",
    "images": [
      "https://cdn.oderco.com.br/produtos/29306/44801E8A38AACC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29306/44801E8A38ABCC1FE0630300A8C0585E",
      "https://cdn.oderco.com.br/produtos/29306/44801E8A38ACCC1FE0630300A8C0585E"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 4K 60Hz 1m PHM20-1 foi desenvolvido para oferecer transmissão de áudio e vídeo com alta qualidade, estabilidade e desempenho para equipamentos modernos. Compatível com resolução 4K a 60Hz, garante imagens mais nítidas, cores mais vivas e maior fluidez para TVs, monitores, conso…",
    "features": [
      "Suporte a resolução 4K com taxa de atualização de 60Hz",
      "Alta largura de banda de 18 Gbit/s para transmissão estável",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Design robusto e acabamento durável",
      "Ideal para TVs, monitores, consoles e notebooks"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "29306"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-20-pcyes-4k-60hz-1m-phm20-1",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-20-pcyes-4k-60hz-1m-phm20-1",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 198,
    "sku": "285547",
    "name": "Cabo HDMI PCYES 2.0 4K 60Hz 2m PHM20-2NZ",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 66,
    "category": "Periféricos",
    "subcategory": "Cabo HDMI",
    "tags": [
      "Periféricos",
      "Cabo HDMI"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/285547/3DE5E526B2BF08A5E0630300A8C08449",
    "images": [
      "https://cdn.oderco.com.br/produtos/285547/3DE5E526B2BF08A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/285547/3DE5E526B2C008A5E0630300A8C08449",
      "https://cdn.oderco.com.br/produtos/285547/3DE5E526B2C108A5E0630300A8C08449"
    ],
    "description": "O Cabo HDMI 2.0 PCYES 4K 60Hz 2m PHM20-2NZ foi desenvolvido para oferecer alta qualidade de imagem, transmissão estável e excelente desempenho em equipamentos de entretenimento e produtividade. Compatível com resolução 4K a 60Hz, garante imagens nítidas, fluidez e fidelidade de cores para TVs, monit…",
    "features": [
      "Suporte a resolução 4K com taxa de atualização de 60Hz",
      "Alta largura de banda de 18 Gbit/s para transmissão estável",
      "Condutor em cobre puro para melhor qualidade de sinal",
      "Compatível com HDR estático para imagens mais realistas",
      "Suporte a tecnologia 3D",
      "Conexão Ethernet via HDMI integrada",
      "Design robusto e acabamento minimalista",
      "Ideal para TVs, monitores, consoles e home theaters"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "285547"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo HDMI"
      }
    ],
    "seoSlug": "cabo-hdmi-20-pcyes-4k-60hz-2m-phm20-2nz",
    "productUrl": "https://www.pcyes.com.br/cabo-hdmi-20-pcyes-4k-60hz-2m-phm20-2nz",
    "inStock": true,
    "badge": "4K",
    "oldPrice": "R$ 67,09",
    "oldPriceNum": 67.09
  },
  {
    "id": 199,
    "sku": "244628",
    "name": "Fonte PCYES Gamer Aether 1000W Full Modular Gold PCIe 5.0 ATX 3.1 1000WFMG",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.5,
    "reviews": 103,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/244628/3D5C192CB9E545B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/244628/3D5C192CB9E545B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/244628/3D5C192CB9E745B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/244628/3D5C192CB9E845B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Aether PCYES 1000W Full Modular Gold PCIe 5.0 ATX 3.1 1000WFMG foi desenvolvida para entregar potência extrema, eficiência energética e máxima confiabilidade para computadores gamers e workstations de alto desempenho. Com arquitetura moderna e componentes premium, garante energia estáv…",
    "features": [
      "Certificação Cybenetics Gold para alta eficiência energética",
      "Certificação acústica Cybenetics Standard+ para operação silenciosa",
      "Design full modular para organização e personalização do setup",
      "Compatível com padrão Intel ATX 3.1",
      "Conector PCIe 5.0 12VHPWR para GPUs de nova geração",
      "Topologia LLC + DC-DC para maior estabilidade energética",
      "Capacitores japoneses para maior durabilidade",
      "Ventoinha de 140mm com rolamento de fluído dinâmico"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "244628"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-aether-pcyes-1000w-full-modular-gold-pcie5-atx31-1000wfmg",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-aether-pcyes-1000w-full-modular-gold-pcie5-atx31-1000wfmg",
    "inStock": true
  },
  {
    "id": 200,
    "sku": "244627",
    "name": "Fonte PCYES Gamer Aether 850W Full Modular Gold PCIe 5.0 ATX 3.1 850WFMG",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.6,
    "reviews": 140,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/244627/3D5C192CB9DF45B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/244627/3D5C192CB9DF45B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/244627/3D5C192CB9E145B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/244627/3D5C192CB9E245B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Aether PCYES 850W Full Modular Gold PCIe 5.0 ATX 3.1 850WFMG foi desenvolvida para entregar potência, eficiência e confiabilidade para setups gamers e workstations de alto desempenho. Projetada com componentes premium e tecnologias modernas, garante energia estável e compatibilidade co…",
    "features": [
      "Certificação Cybenetics Gold para alta eficiência energética",
      "Certificação acústica Cybenetics Standard+ para funcionamento silencioso",
      "Design full modular para organização e personalização do setup",
      "Compatível com padrão Intel ATX 3.1",
      "Conector PCIe 5.0 12VHPWR para GPUs de nova geração",
      "Topologia LLC + DC-DC para maior estabilidade energética",
      "Capacitores japoneses para maior durabilidade",
      "Ventoinha de 140mm com rolamento de fluído dinâmico"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "244627"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-aether-pcyes-850w-full-modular-gold-pcie5-atx31-850wfmg",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-aether-pcyes-850w-full-modular-gold-pcie5-atx31-850wfmg",
    "inStock": true,
    "oldPrice": "R$ 530,88",
    "oldPriceNum": 530.88
  },
  {
    "id": 201,
    "sku": "244626",
    "name": "Fonte PCYES Gamer Aether 750W Full Modular Gold PCIe 5.0 ATX 3.1 750WFMG",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.7,
    "reviews": 177,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/244626/3D5C192CB9D945B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/244626/3D5C192CB9D945B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/244626/3D5C192CB9DB45B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/244626/3D5C192CB9DC45B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Aether PCYES 750W Full Modular Gold PCIe 5.0 ATX 3.1 750WFMG foi desenvolvida para entregar máxima eficiência, estabilidade energética e compatibilidade com as tecnologias mais recentes do mercado de hardware. Projetada para setups de alto desempenho, combina componentes premium, desig…",
    "features": [
      "Certificação Cybenetics Gold para alta eficiência energética",
      "Certificação acústica Cybenetics Standard+ para operação silenciosa",
      "Design full modular para organização e personalização do setup",
      "Compatível com padrão Intel ATX 3.1",
      "Conector PCIe 5.0 12VHPWR para GPUs de nova geração",
      "Topologia LLC + DC-DC para maior estabilidade energética",
      "Capacitores japoneses para maior durabilidade",
      "Ventoinha de 140mm com rolamento de fluído dinâmico"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "244626"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-aether-pcyes-750w-full-modular-gold-pcie5-atx31-750wfmg",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-aether-pcyes-750w-full-modular-gold-pcie5-atx31-750wfmg",
    "inStock": true
  },
  {
    "id": 202,
    "sku": "35369",
    "name": "Fonte PCYES Gamer Electro V2 650W 80Plus Bronze PFC Ativo ELECV2PTO650W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.8,
    "reviews": 214,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD15852CE0630300A8C093F6",
    "images": [
      "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD15852CE0630300A8C093F6",
      "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD16852CE0630300A8C093F6",
      "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD17852CE0630300A8C093F6"
    ],
    "description": "A Fonte Gamer Electro V2 PCYES 650W 80Plus Bronze PFC Ativo ELECV2PTO650W foi desenvolvida para entregar alto desempenho, eficiência energética e segurança para computadores gamers e sistemas de alto desempenho. Com certificação 80Plus Bronze e eficiência superior a 82%, oferece melhor aproveitament…",
    "features": [
      "Certificação 80Plus Bronze com eficiência superior a 82%",
      "PFC ativo para maior estabilidade energética",
      "Projeto revisado com componentes aprimorados",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Design exclusivo PCYES com melhor circulação de ar",
      "Cabos com revestimento para maior durabilidade",
      "Conector PCIe duplo compatível com placas de vídeo",
      "Sistema completo de proteções elétricas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "35369"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-electro-v2-pcyes-650w-80plus-bronze-elecv2pto650w",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-electro-v2-pcyes-650w-80plus-bronze-elecv2pto650w",
    "inStock": true
  },
  {
    "id": 203,
    "sku": "28743",
    "name": "Fonte PCYES Gamer Electro V2 650W 80Plus Bronze PFC Ativo ELECV2PTO650W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.9,
    "reviews": 251,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD15852CE0630300A8C093F6",
    "images": [
      "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD15852CE0630300A8C093F6",
      "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD16852CE0630300A8C093F6",
      "https://cdn.oderco.com.br/produtos/28743/3D5A58E8FD17852CE0630300A8C093F6"
    ],
    "description": "A Fonte Gamer Electro V2 PCYES 650W 80Plus Bronze PFC Ativo ELECV2PTO650W foi desenvolvida para oferecer energia estável, eficiência e segurança para computadores gamers e sistemas de alto desempenho. Com certificação 80Plus Bronze e eficiência superior a 82%, garante melhor aproveitamento da energi…",
    "features": [
      "Certificação 80Plus Bronze com eficiência superior a 82%",
      "PFC ativo para maior estabilidade energética",
      "Projeto revisado com componentes aprimorados",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Design exclusivo PCYES com melhor circulação de ar",
      "Cabos com revestimento para maior durabilidade",
      "Conector PCIe duplo para placas de vídeo",
      "Sistema completo de proteções elétricas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "28743"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-electro-v2-pcyes-650w-80plus-bronze-elecv2pto650w",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-electro-v2-pcyes-650w-80plus-bronze-elecv2pto650w",
    "inStock": true
  },
  {
    "id": 204,
    "sku": "28742",
    "name": "Fonte PCYES Gamer Electro V2 550W 80Plus Bronze PFC Ativo ELECV2PTO550W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.4,
    "reviews": 288,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/28742/BEF41FFCCD04FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/28742/BEF41FFCCD04FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/28742/BEF41FFCCD05FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/28742/BEF41FFCCD06FC48E055DEF401E782F4"
    ],
    "description": "A Fonte Gamer Electro V2 PCYES 550W 80Plus Bronze PFC Ativo ELECV2PTO550W foi desenvolvida para entregar eficiência energética, estabilidade e confiabilidade para computadores gamers e sistemas de alto desempenho. Com certificação 80Plus Bronze e eficiência superior a 82%, proporciona melhor aprovei…",
    "features": [
      "Certificação 80Plus Bronze com eficiência superior a 82%",
      "PFC ativo para maior estabilidade energética",
      "Projeto atualizado com componentes aprimorados",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Design exclusivo PCYES com melhor circulação de ar",
      "Cabos com revestimento para maior durabilidade",
      "Conector PCIe duplo para placas de vídeo",
      "Sistema completo de proteções elétricas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "28742"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-electro-v2-pcyes-550w-80plus-bronze-elecv2pto550w",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-electro-v2-pcyes-550w-80plus-bronze-elecv2pto550w",
    "inStock": true
  },
  {
    "id": 205,
    "sku": "231112",
    "name": "Fonte PCYES Gamer Shocker 600W Full Modular 80Plus White Ghost FM600WWG",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.5,
    "reviews": 325,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/231112/3D6CFF2A545D834CE0630300A8C051A6",
    "images": [
      "https://cdn.oderco.com.br/produtos/231112/3D6CFF2A545D834CE0630300A8C051A6",
      "https://cdn.oderco.com.br/produtos/231112/3D6CFF2A545E834CE0630300A8C051A6",
      "https://cdn.oderco.com.br/produtos/231112/3D6CFF2A545F834CE0630300A8C051A6"
    ],
    "description": "A Fonte Gamer Shocker PCYES 600W Full Modular 80Plus White Ghost FM600WWG foi desenvolvida para oferecer energia estável, eficiência e um visual premium para setups gamers. Com potência de 600W e certificação 80Plus Standard, proporciona eficiência superior a 80%, garantindo melhor aproveitamento da…",
    "features": [
      "Certificação 80Plus com eficiência superior a 80%",
      "Sistema full modular para melhor organização do gabinete",
      "Cabos flat full white ideais para setups brancos",
      "PFC ativo para maior estabilidade energética",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Compatível com placas de vídeo via conectores PCIe",
      "Sistema completo de proteções elétricas",
      "Ideal para PCs gamers e builds personalizadas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "231112"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-shocker-pcyes-600w-full-modular-80plus-white-ghost-fm600wwg",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-shocker-pcyes-600w-full-modular-80plus-white-ghost-fm600wwg",
    "inStock": true,
    "oldPrice": "R$ 530,88",
    "oldPriceNum": 530.88
  },
  {
    "id": 206,
    "sku": "202350",
    "name": "Fonte PCYES Gamer Shocker 600W 80Plus PFC Ativo PF600SHW",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.6,
    "reviews": 362,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/202350/3D5C192CB9BB45B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/202350/3D5C192CB9BB45B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/202350/3D5C192CB9BC45B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/202350/3D5C192CB9BD45B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Shocker PCYES 600W 80Plus PFC Ativo PF600SHW foi desenvolvida para oferecer energia estável, eficiente e segura para computadores gamers e sistemas de alto desempenho. Com potência de 600W e certificação 80Plus Standard, garante eficiência superior a 80%, proporcionando melhor aproveit…",
    "features": [
      "Certificação 80Plus com eficiência superior a 80%",
      "PFC ativo para maior estabilidade energética",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Cabos com revestimento em nylon para maior durabilidade",
      "Visual full black que valoriza o setup gamer",
      "Compatível com placas de vídeo através de conectores PCIe",
      "Sistema completo de proteções elétricas",
      "Ideal para PCs gamers e configurações de alto desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "202350"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-shocker-pcyes-600w-80plus-pfc-ativo-pf600shw",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-shocker-pcyes-600w-80plus-pfc-ativo-pf600shw",
    "inStock": true
  },
  {
    "id": 207,
    "sku": "202349",
    "name": "Fonte PCYES Gamer Shocker 500W 80Plus PFC Ativo PF500SHW",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.7,
    "reviews": 399,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/202349/4B7EC28153CA1D2DE0630300A8C0552F",
    "images": [
      "https://cdn.oderco.com.br/produtos/202349/4B7EC28153CA1D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/202349/4B7EC28153CB1D2DE0630300A8C0552F",
      "https://cdn.oderco.com.br/produtos/202349/4B7EC28153CC1D2DE0630300A8C0552F"
    ],
    "description": "A Fonte Gamer Shocker PCYES 500W 80Plus PFC Ativo PF500SHW foi projetada para fornecer energia estável e eficiente para computadores gamers e sistemas que exigem maior desempenho. Com potência de 500W e certificação 80Plus Standard, oferece eficiência superior a 80%, garantindo melhor aproveitamento…",
    "features": [
      "Certificação 80Plus com eficiência superior a 80%",
      "PFC ativo para maior estabilidade energética",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Cabos com revestimento em nylon para maior durabilidade",
      "Visual full black para melhor estética do setup",
      "Compatível com placas de vídeo através de conectores PCIe",
      "Sistema completo de proteções elétricas",
      "Ideal para PCs gamers e configurações intermediárias"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "202349"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-shocker-pcyes-500w-80plus-pfc-ativo-pf500shw",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-shocker-pcyes-500w-80plus-pfc-ativo-pf500shw",
    "inStock": true
  },
  {
    "id": 208,
    "sku": "202348",
    "name": "Fonte PCYES Gamer Shocker 400W 80Plus PFC Ativo PF400SHW",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.8,
    "reviews": 436,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/202348/3D5C192CB9AF45B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/202348/3D5C192CB9AF45B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/202348/3D5C192CB9B045B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/202348/3D5C192CB9B145B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Shocker PCYES 400W 80Plus PFC Ativo PF400SHW foi desenvolvida para oferecer energia confiável e eficiente para computadores gamers e sistemas de alto desempenho. Com potência de 400W e certificação 80Plus Standard, proporciona eficiência superior a 80%, garantindo melhor aproveitamento…",
    "features": [
      "Certificação 80Plus com eficiência superior a 80%",
      "PFC ativo para maior estabilidade energética",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Cabos com revestimento em nylon para maior durabilidade",
      "Visual full black para melhor estética do setup",
      "Compatível com placas de vídeo através de conectores PCIe",
      "Sistema completo de proteções elétricas",
      "Ideal para PCs gamers e configurações intermediárias"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "202348"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-shocker-pcyes-400w-80plus-pfc-ativo-pf400shw",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-shocker-pcyes-400w-80plus-pfc-ativo-pf400shw",
    "inStock": true
  },
  {
    "id": 209,
    "sku": "286895",
    "name": "Fonte PCYES ATX Electra 600W PFC Ativo ELEC600W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.9,
    "reviews": 473,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286895/3D6C9CB13858ACC6E0630300A8C02D0B",
    "images": [
      "https://cdn.oderco.com.br/produtos/286895/3D6C9CB13858ACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286895/3D6C9CB13859ACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286895/3D6C9CB1385AACC6E0630300A8C02D0B"
    ],
    "description": "A Fonte ATX Electra PCYES 600W PFC Ativo ELEC600W foi projetada para oferecer alimentação estável e eficiente para computadores domésticos, corporativos e sistemas que exigem maior capacidade energética. Com potência de 600W, proporciona desempenho confiável para diversas configurações de PC.\n\nEqu…",
    "features": [
      "PFC ativo para maior eficiência energética",
      "Entrada Full Range 100-240V compatível com diferentes redes elétricas",
      "Ventoinha de 120mm com controle térmico automático",
      "Funcionamento silencioso e eficiente",
      "Filtro EMI que reduz interferências eletromagnéticas",
      "Dissipador de calor que melhora a estabilidade térmica",
      "Conectores compatíveis com placas-mãe e placas de vídeo",
      "Sistema de proteções elétricas para maior segurança do PC"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286895"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-atx-electra-pcyes-600w-pfc-ativo-elec600w",
    "productUrl": "https://www.pcyes.com.br/fonte-atx-electra-pcyes-600w-pfc-ativo-elec600w",
    "inStock": true,
    "oldPrice": "R$ 503,89",
    "oldPriceNum": 503.89
  },
  {
    "id": 210,
    "sku": "286889",
    "name": "Fonte PCYES ATX Electra 500W PFC Ativo ELEC500W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.4,
    "reviews": 80,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286889/3D6C9CB13852ACC6E0630300A8C02D0B",
    "images": [
      "https://cdn.oderco.com.br/produtos/286889/3D6C9CB13852ACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286889/3D6C9CB13853ACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286889/3D6C9CB13854ACC6E0630300A8C02D0B"
    ],
    "description": "A Fonte ATX Electra PCYES 500W PFC Ativo ELEC500W foi desenvolvida para oferecer energia estável e confiável para computadores domésticos e corporativos. Com potência de 500W, é ideal para sistemas que exigem eficiência energética e funcionamento consistente no dia a dia.\n\nEquipada com PFC ativo e…",
    "features": [
      "PFC ativo para maior eficiência energética",
      "Entrada Full Range 100-240V compatível com diferentes redes elétricas",
      "Ventoinha de 120mm com controle térmico automático",
      "Funcionamento silencioso e eficiente",
      "Filtro EMI que reduz interferências eletromagnéticas",
      "Dissipador de calor que melhora a estabilidade térmica",
      "Conectores compatíveis com placas-mãe e placas de vídeo",
      "Sistema de proteções elétricas para maior segurança do PC"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286889"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-atx-electra-pcyes-500w-pfc-ativo-elec500w",
    "productUrl": "https://www.pcyes.com.br/fonte-atx-electra-pcyes-500w-pfc-ativo-elec500w",
    "inStock": true,
    "oldPrice": "R$ 530,88",
    "oldPriceNum": 530.88
  },
  {
    "id": 211,
    "sku": "231111",
    "name": "Fonte PCYES Gamer Shocker 500W Full Modular 80Plus White Ghost FM500WWG",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.5,
    "reviews": 117,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/231111/3D5C192CB9CD45B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/231111/3D5C192CB9CD45B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/231111/3D5C192CB9CE45B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/231111/3D5C192CB9CF45B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Shocker PCYES 500W Full Modular 80Plus White Ghost FM500WWG foi desenvolvida para oferecer energia estável, eficiência e um visual diferenciado para setups gamers. Com potência de 500W e certificação 80Plus Standard, garante eficiência superior a 80%, proporcionando melhor aproveitamen…",
    "features": [
      "Certificação 80Plus com eficiência superior a 80%",
      "Sistema full modular para melhor organização do gabinete",
      "Cabos flat full white para setups com estética clean",
      "PFC ativo para maior estabilidade energética",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Compatível com placas de vídeo através de conectores PCIe",
      "Sistema completo de proteções elétricas",
      "Ideal para PCs gamers e setups personalizados"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "231111"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-shocker-pcyes-500w-full-modular-80plus-white-ghost-fm500wwg",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-shocker-pcyes-500w-full-modular-80plus-white-ghost-fm500wwg",
    "inStock": true
  },
  {
    "id": 212,
    "sku": "231110",
    "name": "Fonte PCYES Gamer Shocker 600W Full Modular 80Plus Black Vulcan FM600WBV",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.6,
    "reviews": 154,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/231110/3D5C192CB9C845B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/231110/3D5C192CB9C845B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/231110/3D5C192CB9C745B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/231110/3D5C192CB9C945B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Shocker PCYES 600W Full Modular 80Plus Black Vulcan FM600WBV foi projetada para fornecer energia estável e eficiente para computadores gamers e sistemas de alto desempenho. Com potência de 600W e certificação 80Plus Standard, oferece eficiência superior a 80%, contribuindo para melhor …",
    "features": [
      "Certificação 80Plus com eficiência superior a 80%",
      "Sistema full modular para melhor organização do gabinete",
      "Cabos flat full black para visual limpo no setup",
      "PFC ativo para maior estabilidade energética",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Compatível com placas de vídeo via conectores PCIe",
      "Proteções elétricas completas para maior segurança",
      "Ideal para PCs gamers e sistemas de alto desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "231110"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-shocker-pcyes-600w-full-modular-80plus-black-vulcan-fm600wbv",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-shocker-pcyes-600w-full-modular-80plus-black-vulcan-fm600wbv",
    "inStock": true
  },
  {
    "id": 213,
    "sku": "286879",
    "name": "Fonte PCYES ATX Electra 400W PFC Ativo ELEC400W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.7,
    "reviews": 191,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286879/3D6C9CB1384CACC6E0630300A8C02D0B",
    "images": [
      "https://cdn.oderco.com.br/produtos/286879/3D6C9CB1384CACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286879/3D6C9CB1384DACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286879/3D6C9CB1384EACC6E0630300A8C02D0B"
    ],
    "description": "A Fonte ATX Electra PCYES 400W PFC Ativo ELEC400W foi projetada para fornecer energia estável e segura para computadores domésticos e corporativos. Com potência de 400W, oferece desempenho confiável para sistemas que exigem eficiência energética e funcionamento contínuo.\n\nEquipada com PFC ativo e …",
    "features": [
      "PFC ativo para maior eficiência energética",
      "Entrada Full Range 100-240V compatível com diferentes redes elétricas",
      "Ventoinha de 120mm com controle térmico automático",
      "Funcionamento silencioso e eficiente",
      "Filtro EMI que reduz interferências eletromagnéticas",
      "Dissipador de calor que melhora a estabilidade térmica",
      "Conectores compatíveis com placas-mãe e placas de vídeo",
      "Sistema de proteções elétricas para maior segurança do PC"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286879"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-atx-electra-pcyes-400w-pfc-ativo-elec400w",
    "productUrl": "https://www.pcyes.com.br/fonte-atx-electra-pcyes-400w-pfc-ativo-elec400w",
    "inStock": true
  },
  {
    "id": 214,
    "sku": "231105",
    "name": "Fonte PCYES Gamer Shocker 500W Full Modular 80Plus Black Vulcan FM500WBV",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.8,
    "reviews": 228,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Gaming",
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/231105/3D5C192CB9C145B0E0630300A8C0C0C1",
    "images": [
      "https://cdn.oderco.com.br/produtos/231105/3D5C192CB9C145B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/231105/3D5C192CB9C345B0E0630300A8C0C0C1",
      "https://cdn.oderco.com.br/produtos/231105/3D5C192CB9C445B0E0630300A8C0C0C1"
    ],
    "description": "A Fonte Gamer Shocker PCYES 500W Full Modular 80Plus Black Vulcan FM500WBV foi desenvolvida para oferecer energia estável, eficiência e organização para setups gamers e PCs de alto desempenho. Com potência de 500W e certificação 80Plus Standard, garante eficiência superior a 80%, reduzindo desperdíc…",
    "features": [
      "Certificação 80Plus com eficiência superior a 80%",
      "Sistema full modular para melhor organização dos cabos",
      "Cabos flat full black para visual mais limpo no setup",
      "PFC ativo para maior estabilidade energética",
      "Ventoinha de 120mm para resfriamento eficiente",
      "Compatível com placas de vídeo através de conectores PCIe",
      "Conjunto completo de proteções elétricas",
      "Ideal para PCs gamers e setups de alto desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "231105"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-gamer-shocker-pcyes-500w-full-modular-80plus-black-vulcan-fm500wbv",
    "productUrl": "https://www.pcyes.com.br/fonte-gamer-shocker-pcyes-500w-full-modular-80plus-black-vulcan-fm500wbv",
    "inStock": true
  },
  {
    "id": 215,
    "sku": "286878",
    "name": "Fonte PCYES ATX Electra 300W PFC Ativo ELEC300W",
    "price": "R$ 449,90",
    "priceNum": 449.9,
    "rating": 4.9,
    "reviews": 265,
    "category": "Fontes",
    "subcategory": "Fonte",
    "tags": [
      "Fontes",
      "Fonte"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286878/3D6C9CB13846ACC6E0630300A8C02D0B",
    "images": [
      "https://cdn.oderco.com.br/produtos/286878/3D6C9CB13846ACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286878/3D6C9CB13848ACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/286878/3D6C9CB1384AACC6E0630300A8C02D0B"
    ],
    "description": "A Fonte ATX Electra PCYES 300W PFC Ativo ELEC300W foi desenvolvida para oferecer alimentação estável e segura para computadores de uso doméstico e corporativo. Com potência de 300W, é uma solução confiável para sistemas básicos e intermediários que necessitam de eficiência e proteção elétrica.\n\nEq…",
    "features": [
      "PFC ativo para maior eficiência energética",
      "Entrada Full Range 100-240V compatível com diversas redes elétricas",
      "Ventoinha de 120mm com controle térmico para melhor refrigeração",
      "Sistema de proteções elétricas contra falhas e surtos",
      "Filtro EMI que reduz interferências eletromagnéticas",
      "Dissipador de calor que melhora a estabilidade térmica",
      "Cabos compatíveis com placas-mãe modernas e periféricos",
      "Funcionamento estável para computadores domésticos e corporativos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286878"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fonte"
      }
    ],
    "seoSlug": "fonte-atx-electra-pcyes-300w-pfc-ativo-elec300w",
    "productUrl": "https://www.pcyes.com.br/fonte-atx-electra-pcyes-300w-pfc-ativo-elec300w",
    "inStock": true,
    "oldPrice": "R$ 530,88",
    "oldPriceNum": 530.88
  },
  {
    "id": 216,
    "sku": "31599",
    "name": "Suporte para Tablet PCYES 7.9-10.5 Ajustável Rotação 360 PLMSA01A",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 302,
    "category": "Periféricos",
    "subcategory": "Suporte para Tablet",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte para Tablet"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/31599/BEF41FFD0877FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/31599/BEF41FFD0877FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/31599/BEF41FFD0878FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/31599/BEF41FFD087AFC48E055DEF401E782F4"
    ],
    "description": "O Suporte para Tablet PCYES PLMSA01A foi desenvolvido para oferecer segurança, praticidade e versatilidade na utilização de tablets em ambientes domésticos ou públicos. Compatível com dispositivos de 7,9\" a 10,5\", o suporte possui estrutura resistente e sistema de fixação seguro.\n\nSeu suporte aj…",
    "features": [
      "Compatível com tablets de 7,9\" a 10,5\"",
      "Rotação de 360° para melhor visualização",
      "Inclinação ajustável de ±70°",
      "Grampos retráteis para diferentes tamanhos",
      "Opção de montagem em mesa ou parede",
      "Passagem interna de cabos integrada",
      "Estrutura resistente e estável"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "31599"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte para Tablet"
      }
    ],
    "seoSlug": "suporte-tablet-pcyes-7-9-10-5-plmsa01a",
    "productUrl": "https://www.pcyes.com.br/suporte-tablet-pcyes-7-9-10-5-plmsa01a",
    "inStock": true
  },
  {
    "id": 217,
    "sku": "31579",
    "name": "Suporte para Gabinete PCYES CPU Suspenso Ajustável 360° PLMSC03",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 339,
    "category": "Gabinetes",
    "subcategory": "Suporte para Gabinete",
    "tags": [
      "Escritório",
      "Gabinetes",
      "Suporte para Gabinete"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/31579/4004C0883B7A21AAE0630300A8C0B09E",
    "images": [
      "https://cdn.oderco.com.br/produtos/31579/4004C0883B7A21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/31579/4004C0883B7B21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/31579/4004C0883B7C21AAE0630300A8C0B09E"
    ],
    "description": "O Suporte para Gabinete CPU PCYES PLMSC03 é a solução ideal para manter seu computador mais protegido e o espaço de trabalho mais organizado. Projetado para instalação sob a mesa, ele mantém o gabinete suspenso, liberando espaço no chão e reduzindo a exposição à poeira.\n\nCom estrutura ajustável, o…",
    "features": [
      "Mantém o gabinete suspenso e protegido",
      "Libera espaço no chão e melhora a organização",
      "Rotação 360° para acesso fácil às portas",
      "Sistema deslizante para manutenção prática",
      "Estrutura ajustável para diferentes gabinetes",
      "Reduz acúmulo de poeira no equipamento",
      "Instalação sob a mesa para melhor ergonomia"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "31579"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte para Gabinete"
      }
    ],
    "seoSlug": "suporte-gabinete-cpu-pcyes-suspenso-plmsc03",
    "productUrl": "https://www.pcyes.com.br/suporte-gabinete-cpu-pcyes-suspenso-plmsc03",
    "inStock": true
  },
  {
    "id": 218,
    "sku": "283409",
    "name": "Suporte Para Monitor PCYES Com Organizadores Ergonômico SM15P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 376,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Gaming",
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283409/4004C0883B6A21AAE0630300A8C0B09E",
    "images": [
      "https://cdn.oderco.com.br/produtos/283409/4004C0883B6A21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/283409/4004C0883B6C21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/283409/4004C0883B6B21AAE0630300A8C0B09E"
    ],
    "description": "O Suporte para Monitor PCYES SM15P é uma solução prática para melhorar a ergonomia e organização do seu espaço de trabalho. Com design funcional, ele eleva o monitor ou notebook a uma altura mais confortável, ajudando a reduzir a tensão no pescoço, costas e ombros durante o uso prolongado.\n\nA estr…",
    "features": [
      "Eleva o monitor para melhor ergonomia",
      "Reduz tensão no pescoço e nas costas",
      "Espaço extra para organização do setup",
      "Estrutura resistente com MDF e aço",
      "Design moderno para ambientes de trabalho",
      "Organizadores inclusos para acessórios",
      "Compatível com monitores e notebooks"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283409"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-monitor-organizador-pcyes-sm15p",
    "productUrl": "https://www.pcyes.com.br/suporte-monitor-organizador-pcyes-sm15p",
    "inStock": true
  },
  {
    "id": 219,
    "sku": "283405",
    "name": "Suporte Organizador De Mesa PCYES Prateleira Multifuncional SO-DA07M",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 413,
    "category": "Periféricos",
    "subcategory": "Organizador de Mesa",
    "tags": [
      "Gaming",
      "Escritório",
      "Periféricos",
      "Organizador de Mesa"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283405/400ADF7E9019455CE0630300A8C028DA",
    "images": [
      "https://cdn.oderco.com.br/produtos/283405/400ADF7E9019455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/283405/400ADF7E9018455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/283405/400ADF7E9017455CE0630300A8C028DA"
    ],
    "description": "O Suporte Organizador de Mesa PCYES SO-DA07M é uma solução prática para manter seu espaço mais organizado e funcional. Com design moderno e estrutura resistente, ele permite armazenar acessórios, equipamentos e itens decorativos de forma eficiente.\n\nFabricado em ferro e ABS com acabamento preto fo…",
    "features": [
      "Organiza acessórios e objetos do setup",
      "Estrutura resistente em ferro e ABS",
      "Design moderno com acabamento preto fosco",
      "Prateleira multifuncional para diversos itens",
      "Instalação rápida com morsa ajustável",
      "Inclui suportes para controle e ganchos",
      "Ideal para setups gamer ou escritório"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283405"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Organizador de Mesa"
      }
    ],
    "seoSlug": "suporte-organizador-mesa-pcyes-so-da07m",
    "productUrl": "https://www.pcyes.com.br/suporte-organizador-mesa-pcyes-so-da07m",
    "inStock": true
  },
  {
    "id": 220,
    "sku": "50099",
    "name": "Suporte De Parede Para TV PCYES Samsung QLED 75 Slim PSPTV75",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 450,
    "category": "Periféricos",
    "subcategory": "Suporte de TV",
    "tags": [
      "Periféricos",
      "Suporte de TV"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/50099/400ADF7E9028455CE0630300A8C028DA",
    "images": [
      "https://cdn.oderco.com.br/produtos/50099/400ADF7E9028455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/50099/400ADF7E9029455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/50099/400ADF7E902B455CE0630300A8C028DA"
    ],
    "description": "O Suporte de Parede para TV PCYES PSPTV75 foi desenvolvido especialmente para televisores Samsung QLED de 75 polegadas, oferecendo uma instalação segura, discreta e alinhada ao design ultrafino dessas TVs.\n\nCom estrutura resistente em aço e plástico de alta qualidade, o suporte suporta televisores…",
    "features": [
      "Compatível com TVs Samsung QLED de 75\"",
      "Design slim que mantém a TV próxima da parede",
      "Estrutura resistente com suporte até 50kg",
      "Instalação segura e estável",
      "Ajuste fino de nivelamento da tela",
      "Compatibilidade com modelos Samsung QLED específicos",
      "Gerenciamento de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "50099"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de TV"
      }
    ],
    "seoSlug": "suporte-parede-tv-samsung-qled-75-pcyes-psptv75",
    "productUrl": "https://www.pcyes.com.br/suporte-parede-tv-samsung-qled-75-pcyes-psptv75",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 221,
    "sku": "309647",
    "name": "Suporte Motorizado De Teto Para TV PCYES 43-86 Smart Tuya 45kg PLMSTM02B",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 57,
    "category": "Periféricos",
    "subcategory": "Suporte de TV",
    "tags": [
      "Periféricos",
      "Suporte de TV"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/309647/3AC267B2A7061A51E0630300A8C0BF1A",
    "images": [
      "https://cdn.oderco.com.br/produtos/309647/3AC267B2A7061A51E0630300A8C0BF1A",
      "https://cdn.oderco.com.br/produtos/309647/3AC267B2A7051A51E0630300A8C0BF1A",
      "https://cdn.oderco.com.br/produtos/309647/3DF91DE403CB35D5E0630300A8C0B965"
    ],
    "description": "O Suporte Motorizado de Teto para TV PCYES PLMSTM02B oferece tecnologia, praticidade e máxima flexibilidade para instalação de televisores em ambientes residenciais ou comerciais. Compatível com TVs de 43\" a 86\", o suporte suporta até 45kg, garantindo estabilidade e segurança.\n\nSeu sistema motor…",
    "features": [
      "Compatível com TVs de 43\" a 86\"",
      "Suporte motorizado com controle remoto RF",
      "Integração com aplicativo Tuya",
      "Compatível com comandos de voz via Alexa",
      "Sistema de prevenção de colisões",
      "Estrutura resistente com suporte até 45kg",
      "Design dobrável para otimizar espaço",
      "Gerenciamento de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "309647"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de TV"
      }
    ],
    "seoSlug": "suporte-motorizado-teto-tv-pcyes-43-86-plmstm02b",
    "productUrl": "https://www.pcyes.com.br/suporte-motorizado-teto-tv-pcyes-43-86-plmstm02b",
    "inStock": true
  },
  {
    "id": 222,
    "sku": "195245",
    "name": "Suporte De Parede Para TV PCYES 23-43 Mola Articulado ST-LDA33GT",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 94,
    "category": "Periféricos",
    "subcategory": "Suporte de TV",
    "tags": [
      "Periféricos",
      "Suporte de TV"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/195245/401821A4ED9FBD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/195245/401821A4ED9FBD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/195245/401821A4EDA0BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/195245/401821A4EDA1BD3AE0630300A8C04C48"
    ],
    "description": "O Suporte de Parede para TV PCYES ST-LDA33GT foi desenvolvido para oferecer mais flexibilidade e conforto na instalação de televisores. Compatível com TVs de 23\" a 43\", ele possui estrutura articulada com mola de tensão, permitindo ajustar facilmente a posição da tela para obter o melhor ângulo de…",
    "features": [
      "Compatível com TVs de 23\" a 43\"",
      "Movimento articulado com inclinação e rotação",
      "Sistema com mola para ajuste suave",
      "Permite nivelamento da tela",
      "Estrutura resistente e durável",
      "Reduz reflexos com ajuste de inclinação",
      "Gerenciamento de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "195245"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de TV"
      }
    ],
    "seoSlug": "suporte-parede-tv-pcyes-23-43-st-lda33gt",
    "productUrl": "https://www.pcyes.com.br/suporte-parede-tv-pcyes-23-43-st-lda33gt",
    "inStock": true
  },
  {
    "id": 223,
    "sku": "210603",
    "name": "Suporte De Parede Para Monitor PCYES 17-32 Mola Mecânica Articulado SM-350C",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 131,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210603/0BFF76CA672836FAE0630300A8C030F3",
    "images": [
      "https://cdn.oderco.com.br/produtos/210603/0BFF76CA672836FAE0630300A8C030F3",
      "https://cdn.oderco.com.br/produtos/210603/0BFF76CA672936FAE0630300A8C030F3"
    ],
    "description": "O Suporte de Parede para Monitor PCYES SM-350C é a solução ideal para quem busca otimizar espaço e manter o ambiente mais organizado. Projetado para instalação direta na parede, ele elimina a necessidade de mesa para suporte do monitor, sendo perfeito para ambientes compactos ou setups minimalistas.…",
    "features": [
      "Compatível com monitores de 17\" a 32\"",
      "Instalação na parede que libera espaço na mesa",
      "Mecanismo de mola para ajuste suave",
      "Tensão ajustável para equilíbrio do monitor",
      "Placa VESA com instalação prática",
      "Estrutura resistente e durável",
      "Gerenciamento de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210603"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-parede-monitor-pcyes-17-32-sm-350c",
    "productUrl": "https://www.pcyes.com.br/suporte-parede-monitor-pcyes-17-32-sm-350c",
    "inStock": true
  },
  {
    "id": 224,
    "sku": "211817",
    "name": "Suporte De Parede Para 2 Monitores PCYES 17-32 Mola Mecânica PLMSM05A",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 168,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211817/0EAA4ED0B6B3E195E0630300A8C0492A",
    "images": [
      "https://cdn.oderco.com.br/produtos/211817/0EAA4ED0B6B3E195E0630300A8C0492A",
      "https://cdn.oderco.com.br/produtos/211817/0EAA4ED0B6B4E195E0630300A8C0492A"
    ],
    "description": "O Suporte de Parede para 2 Monitores PCYES PLMSM05A é ideal para quem busca mais espaço e organização no ambiente de trabalho. Com instalação direta na parede, ele libera a área da mesa e proporciona um setup mais limpo e ergonômico.\n\nCompatível com monitores de 17\" a 32\", o suporte possui mecan…",
    "features": [
      "Suporte para dois monitores de 17\" a 32\"",
      "Instalação na parede que libera espaço na mesa",
      "Mecanismo de mola para ajustes suaves",
      "Tensão ajustável para equilíbrio do monitor",
      "Placa VESA de instalação prática",
      "Estrutura robusta e durável",
      "Gerenciamento de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211817"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-parede-2-monitores-pcyes-17-32-plmsm05a",
    "productUrl": "https://www.pcyes.com.br/suporte-parede-2-monitores-pcyes-17-32-plmsm05a",
    "inStock": true
  },
  {
    "id": 225,
    "sku": "194261",
    "name": "Suporte Articulado Para Monitor PCYES 17-32 Pistão a Gás USB Áudio SM-046USB",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 205,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/194261/401821A4EDADBD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/194261/401821A4EDADBD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/194261/401821A4EDAFBD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/194261/401821A4EDB0BD3AE0630300A8C04C48"
    ],
    "description": "O Suporte Articulado para Monitor PCYES SM-046USB foi desenvolvido para oferecer mais ergonomia, organização e conectividade ao seu setup. Compatível com monitores de 17\" a 32\", o suporte utiliza um sistema de pistão a gás com mecanismo de mola ajustável, permitindo movimentos suaves e ajustes pre…",
    "features": [
      "Compatível com monitores de 17\" a 32\"",
      "Sistema de pistão a gás com ajuste suave",
      "Porta USB 2.0 integrada na base",
      "Entradas de áudio e microfone integradas",
      "Placa VESA de instalação rápida",
      "Estrutura resistente e estável",
      "Gerenciamento de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "194261"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-monitor-pcyes-17-32-usb-audio-sm-046usb",
    "productUrl": "https://www.pcyes.com.br/suporte-monitor-pcyes-17-32-usb-audio-sm-046usb",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 226,
    "sku": "283407",
    "name": "Suporte De Parede Para Monitor PCYES 13-27 Pivotante VESA SMP-001",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 242,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283407/401CCEBE91BC9EE0E0630300A8C05F60",
    "images": [
      "https://cdn.oderco.com.br/produtos/283407/401CCEBE91BC9EE0E0630300A8C05F60",
      "https://cdn.oderco.com.br/produtos/283407/401CCEBE91BD9EE0E0630300A8C05F60"
    ],
    "description": "O Suporte de Parede para Monitor PCYES SMP-001 é uma solução prática e resistente para instalar monitores diretamente na parede, economizando espaço e proporcionando melhor ergonomia. Compatível com telas de 13\" a 27\", o suporte oferece grande flexibilidade de posicionamento.\n\nSeu sistema pivota…",
    "features": [
      "Compatível com monitores de 13\" a 27\"",
      "Instalação prática diretamente na parede",
      "Sistema pivotante para melhor ajuste de visualização",
      "Inclinação e rotação para maior ergonomia",
      "Estrutura robusta em aço resistente",
      "Suporte para monitores de até 30kg",
      "Gerenciamento interno de cabos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283407"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-parede-monitor-pcyes-13-27-pivotante-smp-001",
    "productUrl": "https://www.pcyes.com.br/suporte-parede-monitor-pcyes-13-27-pivotante-smp-001",
    "inStock": true
  },
  {
    "id": 227,
    "sku": "31595",
    "name": "Suporte Fixo Para Monitor PCYES Regulagem De Altura 17-32 PLMSM01F",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 279,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/31595/BEF41FFCE756FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/31595/BEF41FFCE756FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/31595/BEF41FFD0862FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/31595/BEF41FFD0863FC48E055DEF401E782F4"
    ],
    "description": "O Suporte Fixo para Monitor PCYES PLMSM01F foi desenvolvido para melhorar a ergonomia da estação de trabalho, permitindo ajustar a altura do monitor para encontrar a posição ideal de visualização. Compatível com telas de 17\" a 32\", é uma solução prática para setups profissionais ou domésticos.\n\n…",
    "features": [
      "Compatível com monitores de 17\" a 32\"",
      "Regulagem de altura para melhor ergonomia",
      "Estrutura resistente e estável",
      "Placa VESA destacável para instalação simples",
      "Gerenciamento de cabos integrado",
      "Duas opções de instalação na mesa",
      "Design moderno e discreto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "31595"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-fixo-monitor-pcyes-regulagem-altura-plmsm01f",
    "productUrl": "https://www.pcyes.com.br/suporte-fixo-monitor-pcyes-regulagem-altura-plmsm01f",
    "inStock": true
  },
  {
    "id": 228,
    "sku": "34581",
    "name": "Suporte Para Monitor E Notebook PCYES Articulação Dupla 17-32 PLMSMN1A",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 316,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34581/BEF41FFD228BFC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/34581/BEF41FFD228BFC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/34581/BEF41FFD228CFC48E055DEF401E782F4"
    ],
    "description": "O Suporte para Monitor e Notebook PCYES PLMSMN1A foi projetado para oferecer mais ergonomia e organização no ambiente de trabalho, permitindo utilizar monitor e notebook simultaneamente em um único suporte articulado.\n\nSeu sistema de articulação dupla ajustável possibilita controlar a firmeza dos …",
    "features": [
      "Permite usar monitor e notebook no mesmo suporte",
      "Compatível com monitores de 17\" a 32\"",
      "Articulação dupla para ajustes precisos",
      "Placa VESA destacável para instalação prática",
      "Estrutura resistente em aço de alta qualidade",
      "Rotação e ajuste de posição para melhor ergonomia",
      "Gerenciamento de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34581"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-monitor-notebook-pcyes-articulacao-dupla-plmsmn1a",
    "productUrl": "https://www.pcyes.com.br/suporte-monitor-notebook-pcyes-articulacao-dupla-plmsmn1a",
    "inStock": true
  },
  {
    "id": 229,
    "sku": "313634",
    "name": "Suporte Para 2 Monitores PCYES 17-32 Pistão Mola USB 3.0 SM-015GD",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 353,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/313634/3DF91DE403C535D5E0630300A8C0B965",
    "images": [
      "https://cdn.oderco.com.br/produtos/313634/3DF91DE403C535D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/313634/3DF91DE403C635D5E0630300A8C0B965",
      "https://cdn.oderco.com.br/produtos/313634/3DF91DE403C935D5E0630300A8C0B965"
    ],
    "description": "O Suporte para 2 Monitores PCYES SM-015GD foi desenvolvido para proporcionar mais ergonomia, organização e produtividade no ambiente de trabalho ou setup gamer. Compatível com monitores de 17\" a 32\", ele permite montar duas telas com total flexibilidade de posicionamento.\n\nSeu sistema de mola me…",
    "features": [
      "Suporte para dois monitores de 17\" a 32\"",
      "Mecanismo de mola para ajustes suaves e seguros",
      "Placa VESA removível para instalação prática",
      "Indicador de tensão para equilíbrio perfeito dos monitores",
      "Estrutura resistente em alumínio e aço",
      "Gerenciamento de cabos integrado",
      "2 portas USB 3.0 para maior conectividade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "313634"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-2-monitores-pcyes-17-32-usb-sm-015gd",
    "productUrl": "https://www.pcyes.com.br/suporte-2-monitores-pcyes-17-32-usb-sm-015gd",
    "inStock": true
  },
  {
    "id": 230,
    "sku": "50100",
    "name": "Suporte Para Monitor PCYES 17-32 Pistão a Gás USB PSGAM1732",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 390,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/50100/4004C0883B6721AAE0630300A8C0B09E",
    "images": [
      "https://cdn.oderco.com.br/produtos/50100/4004C0883B6721AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/50100/4004C0883B6421AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/50100/4004C0883B6621AAE0630300A8C0B09E"
    ],
    "description": "O Suporte para Monitor PCYES PSGAM1732 foi desenvolvido para melhorar a ergonomia e organização do seu setup gamer ou profissional. Compatível com monitores de 17\" a 32\", ele utiliza um sistema de pistão a gás que permite ajustar a altura, inclinação e posição do monitor de forma suave e precisa.…",
    "features": [
      "Compatível com monitores de 17\" a 32\"",
      "Sistema de pistão a gás para ajustes suaves",
      "Estrutura resistente em alumínio e aço",
      "Ampla liberdade de movimento para melhor ergonomia",
      "Rotação e inclinação para ajuste ideal de visualização",
      "Gerenciamento de cabos integrado",
      "Ideal para setups gamer ou profissionais"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "50100"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-monitor-pcyes-17-32-pistao-gas-usb-psgam1732",
    "productUrl": "https://www.pcyes.com.br/suporte-monitor-pcyes-17-32-pistao-gas-usb-psgam1732",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 231,
    "sku": "111551",
    "name": "Suporte Para Microfone PCYES Streaming Podcast Braço Articulado PLMSMIC01",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.7,
    "reviews": 427,
    "category": "Streaming",
    "subcategory": "Suporte de Microfone",
    "tags": [
      "Streaming",
      "Streaming",
      "Suporte de Microfone"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/111551/4004C0883B7421AAE0630300A8C0B09E",
    "images": [
      "https://cdn.oderco.com.br/produtos/111551/4004C0883B7421AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/111551/4004C0883B7621AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/111551/4004C0883B7521AAE0630300A8C0B09E"
    ],
    "description": "O Suporte para Microfone PCYES PLMSMIC01 foi desenvolvido para quem busca qualidade e praticidade em gravações de áudio, sendo ideal para streaming, podcasts, transmissões ao vivo, estúdios caseiros e setups profissionais.\n\nSeu braço articulado com mecanismo de mola interna permite ajustes suaves …",
    "features": [
      "Ideal para streaming, podcast e gravações de áudio",
      "Braço articulado com amplo alcance de movimento",
      "Mecanismo de mola interna para ajustes suaves",
      "Rotação e inclinação para posicionamento preciso",
      "Compatível com microfones 3/8 e 5/8",
      "Estrutura resistente e durável",
      "Organizador de cabos integrado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "111551"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Microfone"
      }
    ],
    "seoSlug": "suporte-microfone-pcyes-streaming-podcast-plmsmic01",
    "productUrl": "https://www.pcyes.com.br/suporte-microfone-pcyes-streaming-podcast-plmsmic01",
    "inStock": true,
    "oldPrice": "R$ 313,49",
    "oldPriceNum": 313.49
  },
  {
    "id": 232,
    "sku": "195241",
    "name": "Suporte Para Setup Studio PCYES 4 em 1 Monitor 17-32 SE-MDS1041",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 464,
    "category": "Periféricos",
    "subcategory": "Suporte de Mesa",
    "tags": [
      "Gaming",
      "Escritório",
      "Periféricos",
      "Suporte de Mesa"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/195241/401821A4EDA9BD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/195241/401821A4EDA9BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/195241/401821A4EDA8BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/195241/401821A4EDAABD3AE0630300A8C04C48"
    ],
    "description": "O Suporte para Setup Studio PCYES 4 em 1 SE-MDS1041 é a solução completa para criadores de conteúdo, streamers, youtubers e profissionais que precisam organizar diversos equipamentos em um único suporte.\n\nSeu design multifuncional permite montar um verdadeiro estúdio em um único poste central, pos…",
    "features": [
      "Organiza setup completo de streaming ou gravação",
      "Suporte multifuncional para monitor, câmera, microfone e luz",
      "Compatível com monitores de 17\" a 32\"",
      "Estrutura em aço resistente e durável",
      "Braços ajustáveis com ampla liberdade de movimento",
      "Gerenciamento de cabos para setup organizado",
      "Instalação por braçadeira ou furação na mesa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "195241"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Mesa"
      }
    ],
    "seoSlug": "suporte-setup-studio-pcyes-4-em-1-se-mds1041",
    "productUrl": "https://www.pcyes.com.br/suporte-setup-studio-pcyes-4-em-1-se-mds1041",
    "inStock": true
  },
  {
    "id": 233,
    "sku": "31581",
    "name": "Suporte Para Mini Computador PCYES Adaptador VESA 75x75 100x100 PLMSN01",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.9,
    "reviews": 71,
    "category": "Computadores",
    "subcategory": "Suporte VESA",
    "tags": [
      "Computadores",
      "Suporte VESA",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/31581/4999E7FE7355F2BEE0630300A8C0A777",
    "images": [
      "https://cdn.oderco.com.br/produtos/31581/4999E7FE7355F2BEE0630300A8C0A777",
      "https://cdn.oderco.com.br/produtos/31581/4999E7FE7354F2BEE0630300A8C0A777"
    ],
    "description": "O Suporte para Mini Computador PCYES Adaptador VESA PLMSN01 foi desenvolvido para ampliar as possibilidades de montagem do monitor, permitindo instalar um mini computador diretamente atrás da tela de forma segura e discreta.\n\nFuncionando como um painel de extensão VESA, ele possibilita utilizar si…",
    "features": [
      "Permite instalar mini computador atrás do monitor",
      "Expande o suporte VESA do monitor",
      "Compatível com braços articulados e suportes de monitor",
      "Otimiza espaço na mesa de trabalho",
      "Instalação simples e rápida",
      "Estrutura resistente e segura"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "31581"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte VESA"
      }
    ],
    "seoSlug": "suporte-mini-computador-pcyes-adaptador-vesa-plmsn01",
    "productUrl": "https://www.pcyes.com.br/suporte-mini-computador-pcyes-adaptador-vesa-plmsn01",
    "inStock": true
  },
  {
    "id": 234,
    "sku": "283406",
    "name": "Suporte Articulado para Monitor PCYES 17\"-32\" Mola Mecânica Cinza e Branco SM-051CB",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 108,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283406/401821A4EDA3BD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/283406/401821A4EDA3BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/283406/401821A4EDA4BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/283406/401821A4EDA6BD3AE0630300A8C04C48"
    ],
    "description": "O Suporte Articulado para Monitor PCYES 17\"-32\" Mola Mecânica Cinza e Branco SM-051CB combina design moderno com desempenho robusto para melhorar a ergonomia e a organização do espaço de trabalho. Compatível com monitores de 17 a 32 polegadas, ele suporta até 9kg, oferecendo estabilidade e seguran…",
    "features": [
      "Compatível com monitores de 17\" a 32\"",
      "Mecanismo de mola mecânica para ajustes suaves",
      "Suporta até 9kg com estrutura resistente",
      "Duas opções de instalação: braçadeira ou ilhó",
      "Gestão de cabos integrada para organização do setup",
      "Ajustes de rotação e posicionamento para melhor ergonomia",
      "Design moderno nas cores cinza e branco"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283406"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-articulado-monitor-17-32-mola-cinza-branco-pcyes-sm051cb",
    "productUrl": "https://www.pcyes.com.br/suporte-articulado-monitor-17-32-mola-cinza-branco-pcyes-sm051cb",
    "inStock": true
  },
  {
    "id": 235,
    "sku": "283413",
    "name": "Suporte Rack para TV PCYES 37\"-75\" com Bandeja e Rodas SR160P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 145,
    "category": "Periféricos",
    "subcategory": "Suporte de TV",
    "tags": [
      "Periféricos",
      "Suporte de TV"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283413/3FF4024FFBC80A40E0630300A8C0584D",
    "images": [
      "https://cdn.oderco.com.br/produtos/283413/3FF4024FFBC80A40E0630300A8C0584D",
      "https://cdn.oderco.com.br/produtos/283413/3FF4024FFBC90A40E0630300A8C0584D",
      "https://cdn.oderco.com.br/produtos/283413/3FF4024FFBCA0A40E0630300A8C0584D"
    ],
    "description": "O Suporte Rack para TV PCYES 37\"-75\" com Bandeja e Rodas SR160P foi desenvolvido para oferecer mobilidade, estabilidade e organização para ambientes corporativos, salas de reunião, eventos ou setups residenciais. Compatível com televisores de 37 a 75 polegadas, o suporte suporta até 40kg, garantin…",
    "features": [
      "Compatível com TVs de 37\" a 75\"",
      "Suporta até 40kg com estrutura resistente",
      "Rodas com travamento que permitem mobilidade segura",
      "Bandeja removível para equipamentos e acessórios",
      "Gestão de cabos integrada que mantém o ambiente organizado",
      "Ajuste de altura para melhor posição de visualização",
      "Rotação da TV para diferentes ângulos de visão"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283413"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de TV"
      }
    ],
    "seoSlug": "suporte-rack-tv-37-75-bandeja-rodas-pcyes-sr160p",
    "productUrl": "https://www.pcyes.com.br/suporte-rack-tv-37-75-bandeja-rodas-pcyes-sr160p",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 236,
    "sku": "211811",
    "name": "Suporte para Notebook PCYES 10\"-15,6\" VESA STNK01",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 182,
    "category": "Periféricos",
    "subcategory": "Suporte para Notebook",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte para Notebook"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211811/4004C0883B6121AAE0630300A8C0B09E",
    "images": [
      "https://cdn.oderco.com.br/produtos/211811/4004C0883B6121AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/211811/4004C0883B5F21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/211811/4004C0883B6221AAE0630300A8C0B09E"
    ],
    "description": "O Suporte para Notebook PCYES 10\"-15,6\" VESA STNK01 é uma bandeja de apoio projetada para ser acoplada a suportes articulados de monitor compatíveis com padrão VESA 75x75 e 100x100. \n\nFabricado em aço carbono resistente, o suporte oferece durabilidade e estabilidade para o uso diário. As travas …",
    "features": [
      "Permite utilizar notebook em suportes articulados de monitor",
      "Compatível com padrão VESA 75x75 e 100x100",
      "Travas laterais ajustáveis para fixação segura do notebook",
      "Estrutura em aço carbono resistente e durável",
      "Design aberto que melhora a ventilação do equipamento",
      "Pads emborrachados que protegem o notebook contra riscos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211811"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte para Notebook"
      }
    ],
    "seoSlug": "suporte-notebook-vesa-10-15-pcyes-stnk01",
    "productUrl": "https://www.pcyes.com.br/suporte-notebook-vesa-10-15-pcyes-stnk01",
    "inStock": true
  },
  {
    "id": 237,
    "sku": "283408",
    "name": "Suporte de Parede para Monitor PCYES 13\"-27\" Articulado SMP-002B",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 219,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283408/401CCEBE91BF9EE0E0630300A8C05F60",
    "images": [
      "https://cdn.oderco.com.br/produtos/283408/401CCEBE91BF9EE0E0630300A8C05F60"
    ],
    "description": "O Suporte de Parede para Monitor PCYES 13\"-27\" Articulado SMP-002B é uma solução prática para otimizar o espaço e melhorar a ergonomia do ambiente de trabalho. Projetado para monitores entre 13 e 27 polegadas, ele oferece estrutura resistente e flexibilidade de ajuste para diferentes posições de v…",
    "features": [
      "Suporte de parede que economiza espaço na mesa",
      "Compatível com monitores de 13\" a 27\"",
      "Alta capacidade de carga de até 30kg",
      "Braço articulado com múltiplos ajustes de posição",
      "Inclinação e rotação para melhor ergonomia",
      "Gestão de cabos integrada para ambiente organizado",
      "Estrutura resistente em aço com acabamento em preto fosco"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283408"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-parede-monitor-13-27-articulado-pcyes-smp002b",
    "productUrl": "https://www.pcyes.com.br/suporte-parede-monitor-13-27-articulado-pcyes-smp002b",
    "inStock": true
  },
  {
    "id": 238,
    "sku": "31578",
    "name": "Suporte para CPU PCYES Ajustável com Rodas PLMSC02",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 256,
    "category": "Periféricos",
    "subcategory": "Suporte para CPU",
    "tags": [
      "Periféricos",
      "Suporte para CPU"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/31578/4004C0883B7F21AAE0630300A8C0B09E",
    "images": [
      "https://cdn.oderco.com.br/produtos/31578/4004C0883B7F21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/31578/4004C0883B7E21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/31578/4004C0883B8021AAE0630300A8C0B09E"
    ],
    "description": "O Suporte para CPU Ajustável com Rodas PCYES PLMSC02 foi desenvolvido para oferecer mais praticidade, organização e mobilidade no ambiente de trabalho. Ideal para computadores desktop, ele permite posicionar o gabinete sob ou ao lado da mesa, liberando espaço e melhorando a circulação de ar ao redor…",
    "features": [
      "Mantém o gabinete elevado para melhorar a circulação de ar",
      "Ajuste de largura compatível com diferentes gabinetes ATX",
      "Rodízios que facilitam a movimentação do computador",
      "Duas rodas com trava para maior estabilidade",
      "Estrutura em aço resistente e durável",
      "Ajuda a liberar espaço e organizar melhor o ambiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "31578"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte para CPU"
      }
    ],
    "seoSlug": "suporte-cpu-ajustavel-rodas-pcyes-plmsc02",
    "productUrl": "https://www.pcyes.com.br/suporte-cpu-ajustavel-rodas-pcyes-plmsc02",
    "inStock": true
  },
  {
    "id": 239,
    "sku": "194263",
    "name": "Suporte Articulado para Monitor PCYES Cinza 17\"-32\" com USB 3.0 SM-049C",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 293,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/194263/0169F91643AC32FDE0630300A8C0CF67",
    "images": [
      "https://cdn.oderco.com.br/produtos/194263/0169F91643AC32FDE0630300A8C0CF67",
      "https://cdn.oderco.com.br/produtos/194263/0169F91643AD32FDE0630300A8C0CF67",
      "https://cdn.oderco.com.br/produtos/194263/0169F91643AF32FDE0630300A8C0CF67"
    ],
    "description": "O Suporte Articulado para Monitor PCYES Cinza 17\"-32\" com USB 3.0 SM-049C combina design premium, ergonomia e flexibilidade para melhorar a experiência de uso em escritórios, setups gamers e ambientes profissionais. Fabricado com estrutura resistente em aço, alumínio e plástico, possui braços fino…",
    "features": [
      "Suporte articulado com ajuste completo para monitores de 17\" a 32\"",
      "Mecanismo de mola mecânica que garante movimentos suaves e precisos",
      "Placa VESA de liberação rápida para instalação fácil do monitor",
      "Indicador de tensão que facilita o ajuste do equilíbrio da mola",
      "Portas USB 3.0 integradas para maior praticidade no setup",
      "Gestão de cabos integrada que mantém o espaço organizado",
      "Batente de rotação que evita contato com paredes ou divisórias"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "194263"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-articulado-monitor-17-32-usb3-cinza-pcyes-sm049c",
    "productUrl": "https://www.pcyes.com.br/suporte-articulado-monitor-17-32-usb3-cinza-pcyes-sm049c",
    "inStock": true
  },
  {
    "id": 240,
    "sku": "283411",
    "name": "Fita Organizadora de Cabos PCYES Preta 100cm Velcro SC-47C",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 330,
    "category": "Periféricos",
    "subcategory": "Organizador de Cabos",
    "tags": [
      "Periféricos",
      "Organizador de Cabos"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283411/401821A4EDBDBD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/283411/401821A4EDBDBD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/283411/401821A4EDBCBD3AE0630300A8C04C48"
    ],
    "description": "A Fita Organizadora de Cabos PCYES Preta 100cm Velcro SC-47C é uma solução prática e eficiente para manter fios organizados em setups, televisores, consoles e computadores. Desenvolvida com material resistente, ela ajuda a reunir e proteger cabos, reduzindo a bagunça e proporcionando um ambiente mai…",
    "features": [
      "Organiza e agrupa cabos de TV, consoles e computadores",
      "Sistema de fechamento em velcro para ajuste rápido",
      "Material resistente que garante maior durabilidade",
      "Pode ser cortada para se adaptar a diferentes necessidades",
      "Comprimento ideal para cobrir vários cabos",
      "Cor preta discreta que ajuda a esconder os fios"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283411"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Organizador de Cabos"
      }
    ],
    "seoSlug": "fita-organizadora-cabos-preta-velcro-pcyes-sc47c",
    "productUrl": "https://www.pcyes.com.br/fita-organizadora-cabos-preta-velcro-pcyes-sc47c",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 241,
    "sku": "283412",
    "name": "Suporte Organizador de Cabos PCYES com Trava SC-75B",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.5,
    "reviews": 367,
    "category": "Periféricos",
    "subcategory": "Organizador de Cabos",
    "tags": [
      "Periféricos",
      "Organizador de Cabos"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283412/400ADF7E901D455CE0630300A8C028DA",
    "images": [
      "https://cdn.oderco.com.br/produtos/283412/400ADF7E901D455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/283412/400ADF7E901C455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/283412/400ADF7E901F455CE0630300A8C028DA"
    ],
    "description": "O Suporte Organizador de Cabos PCYES com Trava SC-75B foi desenvolvido para manter cabos, extensões e dispositivos organizados de forma prática e segura. Ideal para escritórios, setups gamers e ambientes corporativos, ele ajuda a reduzir a bagunça de fios e melhorar a organização do espaço de trabal…",
    "features": [
      "Organiza cabos e extensões mantendo o espaço mais limpo",
      "Sistema com trava que mantém os fios firmes e organizados",
      "Duas alturas ajustáveis para acomodar diferentes cabos e dispositivos",
      "Estrutura resistente em ABS e PVC",
      "Instalação segura com fixação por parafusos",
      "Ideal para setups, escritórios e home office"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283412"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Organizador de Cabos"
      }
    ],
    "seoSlug": "suporte-organizador-cabos-trava-pcyes-sc75b",
    "productUrl": "https://www.pcyes.com.br/suporte-organizador-cabos-trava-pcyes-sc75b",
    "inStock": true
  },
  {
    "id": 242,
    "sku": "192831",
    "name": "Suporte de Parede para Monitor PCYES 17\"-32\" Pistão a Gás VESA 100x100 PW01A",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 404,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192831/401821A4EDB8BD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/192831/401821A4EDB8BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/192831/401821A4EDB7BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/192831/401821A4EDB9BD3AE0630300A8C04C48"
    ],
    "description": "O Suporte de Parede para Monitor PCYES 17\"-32\" Pistão a Gás VESA 100x100 PW01A foi desenvolvido para oferecer ergonomia, flexibilidade e melhor aproveitamento do espaço de trabalho. Com estrutura resistente em aço e plástico, ele proporciona estabilidade e durabilidade para o uso diário.\n\nEquipa…",
    "features": [
      "Suporte de parede que economiza espaço na mesa",
      "Sistema com pistão a gás para ajustes suaves de posição",
      "Compatível com monitores de 17\" a 32\"",
      "Suporta até 8kg com estabilidade",
      "Placa VESA rotativa 360° para diferentes posições de visualização",
      "Inclinação e giro para melhor ergonomia",
      "Gestão de cabos integrada para manter o ambiente organizado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192831"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-parede-monitor-17-32-pistao-gas-pcyes-pw01a",
    "productUrl": "https://www.pcyes.com.br/suporte-parede-monitor-17-32-pistao-gas-pcyes-pw01a",
    "inStock": true,
    "oldPrice": "R$ 223,89",
    "oldPriceNum": 223.89
  },
  {
    "id": 243,
    "sku": "194262",
    "name": "Suporte Articulado para Monitor PCYES Branco 17\"-32\" com USB 3.0 SM-049B",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 441,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/194262/401821A4EDB2BD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/194262/401821A4EDB2BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/194262/401821A4EDB3BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/194262/401821A4EDB5BD3AE0630300A8C04C48"
    ],
    "description": "O Suporte Articulado para Monitor PCYES Branco 17\"-32\" com USB 3.0 SM-049B oferece ergonomia, flexibilidade e design premium para setups modernos. Fabricado com estrutura em aço, alumínio e plástico, possui braços finos e resistentes que garantem movimentação suave e estabilidade durante o uso.\n…",
    "features": [
      "Suporte articulado com ajuste completo para monitores de 17\" a 32\"",
      "Mecanismo de mola mecânica para movimentos suaves e seguros",
      "Placa VESA de liberação rápida que facilita instalação do monitor",
      "Indicador de tensão para ajuste preciso do peso do monitor",
      "Portas USB 3.0 integradas para maior praticidade no setup",
      "Gestão de cabos integrada para manter o ambiente organizado",
      "Batente de rotação que evita contato com paredes ou divisórias"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "194262"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-articulado-monitor-17-32-usb3-branco-pcyes-sm049b",
    "productUrl": "https://www.pcyes.com.br/suporte-articulado-monitor-17-32-usb3-branco-pcyes-sm049b",
    "inStock": true
  },
  {
    "id": 244,
    "sku": "283410",
    "name": "Suporte Organizador de Cabos PCYES Preto SC44F",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.8,
    "reviews": 478,
    "category": "Periféricos",
    "subcategory": "Organizador de Cabos",
    "tags": [
      "Periféricos",
      "Organizador de Cabos"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283410/400ADF7E9022455CE0630300A8C028DA",
    "images": [
      "https://cdn.oderco.com.br/produtos/283410/400ADF7E9022455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/283410/400ADF7E9021455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/283410/400ADF7E9023455CE0630300A8C028DA"
    ],
    "description": "O Suporte Organizador de Cabos PCYES Preto SC44F é a solução ideal para manter extensões elétricas e cabos organizados e fora da área de trabalho. Desenvolvido para oferecer mais praticidade e organização, ele ajuda a reduzir a bagunça de fios, criando um ambiente mais limpo e funcional.\n\nCom desi…",
    "features": [
      "Mantém cabos e extensões organizados e fora da mesa",
      "Design modular que permite combinar várias unidades",
      "Estrutura resistente com suporte de até 1kg",
      "Design aberto que facilita a passagem dos cabos",
      "Instalação segura com fixação por parafusos",
      "Ideal para setups, escritórios e home office"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283410"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Organizador de Cabos"
      }
    ],
    "seoSlug": "suporte-organizador-cabos-pcyes-preto-sc44f",
    "productUrl": "https://www.pcyes.com.br/suporte-organizador-cabos-pcyes-preto-sc44f",
    "inStock": true
  },
  {
    "id": 245,
    "sku": "195230",
    "name": "Suporte para Headset e Organizador de Mesa PCYES Personalizável Preto SO-DA06P",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.9,
    "reviews": 85,
    "category": "Periféricos",
    "subcategory": "Organizador de Mesa",
    "tags": [
      "Gaming",
      "Periféricos",
      "Organizador de Mesa",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/195230/400ADF7E9026455CE0630300A8C028DA",
    "images": [
      "https://cdn.oderco.com.br/produtos/195230/400ADF7E9026455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/195230/400ADF7E9024455CE0630300A8C028DA",
      "https://cdn.oderco.com.br/produtos/195230/400ADF7E9025455CE0630300A8C028DA"
    ],
    "description": "O Suporte para Headset e Organizador de Mesa PCYES SO-DA06P é uma solução prática e moderna para manter o espaço de trabalho organizado. Com design personalizável tipo pegboard, permite criar diferentes combinações de armazenamento para acomodar headset, acessórios, eletrônicos e itens de escritório…",
    "features": [
      "Suporte para headset e organizador de mesa multifuncional",
      "Design personalizável tipo pegboard",
      "Estrutura resistente em aço com revestimento em pó",
      "Ideal para organizar acessórios, eletrônicos e itens de escritório",
      "Pode ser usado como suporte de mesa ou fixado na parede",
      "Design moderno que combina com diferentes ambientes",
      "Solução prática para manter o setup organizado",
      "Perfeito para home office, escritório ou setups gamer"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "195230"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Organizador de Mesa"
      }
    ],
    "seoSlug": "suporte-headset-organizador-mesa-pcyes-preto-so-da06p",
    "productUrl": "https://www.pcyes.com.br/suporte-headset-organizador-mesa-pcyes-preto-so-da06p",
    "inStock": true,
    "oldPrice": "R$ 330,28",
    "oldPriceNum": 330.28
  },
  {
    "id": 246,
    "sku": "211812",
    "name": "Suporte Articulado para 2 Monitores PCYES 17-32\" Mola Mecânica PS-024N",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 122,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211812/401821A4ED95BD3AE0630300A8C04C48",
    "images": [
      "https://cdn.oderco.com.br/produtos/211812/401821A4ED95BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/211812/401821A4ED96BD3AE0630300A8C04C48",
      "https://cdn.oderco.com.br/produtos/211812/401821A4ED97BD3AE0630300A8C04C48"
    ],
    "description": "O Suporte Articulado para 2 Monitores PCYES PS-024N é uma solução eficiente para quem busca ergonomia e organização em setups com múltiplas telas. Compatível com monitores de 17 a 32 polegadas, oferece estrutura resistente e sistema de mola mecânica com contrapeso, permitindo ajustes suaves de altur…",
    "features": [
      "Suporte para dois monitores de 17 a 32 polegadas",
      "Sistema de mola mecânica com contrapeso autoajustável",
      "Suporta até 8 kg por monitor (16 kg no total)",
      "Rotação e inclinação para diferentes ângulos de visualização",
      "Compatível com padrão VESA 75x75 e 100x100",
      "Gerenciamento de cabos integrado para mesa organizada",
      "Instalação por morsa ou ilhó para diferentes tipos de mesa",
      "Estrutura resistente para maior durabilidade e estabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211812"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-articulado-2-monitores-pcyes-17-32-mola-mecanica-ps-024n",
    "productUrl": "https://www.pcyes.com.br/suporte-articulado-2-monitores-pcyes-17-32-mola-mecanica-ps-024n",
    "inStock": true
  },
  {
    "id": 247,
    "sku": "31589",
    "name": "Suporte de Mesa para 2 Monitores PCYES 13-32\" Ajuste de Altura PLMSM02A",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 159,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/31589/BEF41FFCE348FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/31589/BEF41FFCE348FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/31589/BEF41FFCEDEFFC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/31589/BEF41FFCEDF0FC48E055DEF401E782F4"
    ],
    "description": "O Suporte de Mesa para 2 Monitores PCYES PLMSM02A é uma solução prática para melhorar a ergonomia e a organização do espaço de trabalho. Compatível com monitores de 13 a 32 polegadas, permite posicionar duas telas de forma confortável, proporcionando melhor produtividade e visualização.\n\nSua estru…",
    "features": [
      "Suporte para dois monitores de 13 a 32 polegadas",
      "Estrutura resistente em aço de alta durabilidade",
      "Suporta até 8 kg por monitor",
      "Ajuste de altura para posição ergonômica ideal",
      "Rotação, inclinação e giro para melhor ângulo de visualização",
      "Compatível com padrão VESA 75x75 e 100x100",
      "Placa VESA destacável para instalação rápida",
      "Gerenciamento de cabos integrado para mesa organizada"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "31589"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-mesa-2-monitores-pcyes-13-32-ajuste-altura-plmsm02a",
    "productUrl": "https://www.pcyes.com.br/suporte-mesa-2-monitores-pcyes-13-32-ajuste-altura-plmsm02a",
    "inStock": true
  },
  {
    "id": 248,
    "sku": "34597",
    "name": "Suporte Motorizado de Teto para TV PCYES 32-70\" Alexa Tuya PLMSTM01A",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 196,
    "category": "Periféricos",
    "subcategory": "Suporte de TV",
    "tags": [
      "Periféricos",
      "Suporte de TV"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34597/BEF41FFD377AFC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/34597/BEF41FFD377AFC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/34597/BEF41FFD3778FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/34597/BEF41FFD3779FC48E055DEF401E782F4"
    ],
    "description": "O Suporte Motorizado de Teto para TV PCYES PLMSTM01A traz tecnologia e praticidade para ambientes residenciais ou comerciais. Compatível com TVs de 32 a 70 polegadas, possui motor de alta qualidade que permite abaixar e recolher a TV de forma suave e silenciosa, ideal para otimizar espaço em ambient…",
    "features": [
      "Suporte motorizado para TVs de 32 a 70 polegadas",
      "Controle por aplicativo Tuya e compatibilidade com Alexa",
      "Controle remoto por radiofrequência incluído",
      "Movimento suave e silencioso do mecanismo motorizado",
      "Design rebatível que economiza espaço no ambiente",
      "Compatível com diversos padrões VESA até 600x400",
      "Suporte para TVs de até 35 kg",
      "Gerenciamento de cabos integrado para instalação organizada"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34597"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de TV"
      }
    ],
    "seoSlug": "suporte-motorizado-teto-tv-pcyes-32-70-alexa-tuya-plmstm01a",
    "productUrl": "https://www.pcyes.com.br/suporte-motorizado-teto-tv-pcyes-32-70-alexa-tuya-plmstm01a",
    "inStock": true
  },
  {
    "id": 249,
    "sku": "291349",
    "name": "Suporte Articulado para 2 Monitores PCYES 17-32\" Pistão a Gás SM-012GD",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 233,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/291349/287571B040B45B2EE0630300A8C08EC9",
    "images": [
      "https://cdn.oderco.com.br/produtos/291349/287571B040B45B2EE0630300A8C08EC9",
      "https://cdn.oderco.com.br/produtos/291349/383C63903EC20625E0630300A8C070F1",
      "https://cdn.oderco.com.br/produtos/291349/3B1623D060349D04E0630300A8C01573"
    ],
    "description": "O Suporte Articulado para 2 Monitores PCYES SM-012GD foi desenvolvido para oferecer mais ergonomia, organização e flexibilidade em setups com múltiplas telas. Compatível com monitores de 17 a 32 polegadas, conta com pistão a gás que permite ajustes suaves de altura, inclinação e posição para cada mo…",
    "features": [
      "Suporte para dois monitores de 17 a 32 polegadas",
      "Pistão a gás para ajuste suave de altura e posição",
      "Suporta até 9 kg por monitor (18 kg no total)",
      "Rotação da tela para diferentes ângulos de visualização",
      "Compatível com padrão VESA 75x75 e 100x100",
      "Organizador de cabos integrado para mesa mais organizada",
      "Instalação por morsa ou ilhó para diferentes tipos de mesa",
      "Estrutura resistente para maior estabilidade e durabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "291349"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-articulado-2-monitores-pcyes-17-32-pistao-gas-sm-012gd",
    "productUrl": "https://www.pcyes.com.br/suporte-articulado-2-monitores-pcyes-17-32-pistao-gas-sm-012gd",
    "inStock": true
  },
  {
    "id": 250,
    "sku": "210604",
    "name": "Suporte para Monitor PCYES 17-32\" com Suporte para Mini PC Regulagem de Altura SMD-100",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.8,
    "reviews": 270,
    "category": "Computadores",
    "subcategory": "Suporte para Monitor",
    "tags": [
      "Computadores",
      "Suporte para Monitor",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210604/0BFF76CA671B36FAE0630300A8C030F3",
    "images": [
      "https://cdn.oderco.com.br/produtos/210604/0BFF76CA671B36FAE0630300A8C030F3",
      "https://cdn.oderco.com.br/produtos/210604/0BFF76CA671C36FAE0630300A8C030F3",
      "https://cdn.oderco.com.br/produtos/210604/0BFF76CA671D36FAE0630300A8C030F3"
    ],
    "description": "O Suporte para Monitor e Mini PC PCYES SMD-100 é uma solução prática e eficiente para organizar e otimizar o espaço no ambiente de trabalho. Compatível com monitores de 17 a 32 polegadas, ele eleva o monitor para uma posição ergonômica confortável ao nível dos olhos, proporcionando mais conforto dur…",
    "features": [
      "Compatível com monitores de 17 a 32 polegadas",
      "Suporte integrado para Mini PC ou CPU compacta",
      "10 níveis de ajuste de altura para melhor ergonomia",
      "Placa VESA rotativa de 360° para diferentes posições de visualização",
      "Sistema de liberação rápida para instalação do monitor",
      "Inclinação e rotação para maior flexibilidade de uso",
      "Organizador de cabos integrado para mesa mais organizada",
      "Estrutura resistente para maior estabilidade e durabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210604"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte para Monitor"
      }
    ],
    "seoSlug": "suporte-monitor-pcyes-17-32-mini-pc-regulagem-altura-smd-100",
    "productUrl": "https://www.pcyes.com.br/suporte-monitor-pcyes-17-32-mini-pc-regulagem-altura-smd-100",
    "inStock": true,
    "oldPrice": "R$ 2241,88",
    "oldPriceNum": 2241.88
  },
  {
    "id": 251,
    "sku": "35022",
    "name": "Suporte de Mesa PCYES Retrátil para Teclado com Apoio em Gel PLMST01A",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.9,
    "reviews": 307,
    "category": "Periféricos",
    "subcategory": "Suporte de Mesa",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Mesa"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/35022/BEF41FFD33D4FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/35022/BEF41FFD33D4FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/35022/BEF41FFD33D3FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/35022/BEF41FFD33D5FC48E055DEF401E782F4"
    ],
    "description": "O Suporte de Mesa Retrátil para Teclado PCYES PLMST01A foi desenvolvido para proporcionar mais ergonomia, conforto e organização no ambiente de trabalho. Com sistema retrátil montado em trilho, permite ocultar a bandeja do teclado sob a mesa quando não estiver em uso, liberando mais espaço na área d…",
    "features": [
      "Bandeja retrátil que economiza espaço na mesa",
      "Apoio em gel para maior conforto durante a digitação",
      "Ajuste de altura para ergonomia ideal",
      "Inclinação ajustável para melhor posição do teclado",
      "Rotação lateral para maior flexibilidade de uso",
      "Sistema de trilho que oculta o teclado sob a mesa",
      "Estrutura resistente em aço e plástico",
      "Ideal para escritórios e ambientes de trabalho ergonômicos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "35022"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Mesa"
      }
    ],
    "seoSlug": "suporte-mesa-retratil-teclado-pcyes-apoio-gel-plmst01a",
    "productUrl": "https://www.pcyes.com.br/suporte-mesa-retratil-teclado-pcyes-apoio-gel-plmst01a",
    "inStock": true
  },
  {
    "id": 252,
    "sku": "31577",
    "name": "Suporte PCYES para Mini PC NUC Thin Client VESA Universal PLMSC01",
    "price": "R$ 1899,90",
    "priceNum": 1899.9,
    "rating": 4.4,
    "reviews": 344,
    "category": "Computadores",
    "subcategory": "Suporte",
    "tags": [
      "Computadores",
      "Suporte",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/31577/4004C0883B6E21AAE0630300A8C0B09E",
    "images": [
      "https://cdn.oderco.com.br/produtos/31577/4004C0883B6E21AAE0630300A8C0B09E",
      "https://cdn.oderco.com.br/produtos/31577/4004C0883B7221AAE0630300A8C0B09E"
    ],
    "description": "O Suporte para Mini PC PCYES PLMSC01 é uma solução prática e eficiente para organizar e otimizar o espaço de trabalho. Desenvolvido para Mini PCs, NUCs e Thin Clients, permite fixar o equipamento em diferentes superfícies, mantendo o computador protegido, acessível e fora da mesa ou do chão.\n\nSeu …",
    "features": [
      "Compatível com Mini PC, NUC e Thin Client",
      "Ajuste universal de largura entre 17 mm e 70 mm",
      "Compatível com padrão VESA 50x50, 75x75 e 100x100",
      "Instalação versátil em mesa, monitor ou suporte",
      "Estrutura em aço reforçado para maior durabilidade",
      "Economiza espaço e mantém o equipamento organizado",
      "Suporte para dispositivos de até 5 kg",
      "Ideal para ambientes corporativos e setups compactos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "31577"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte"
      }
    ],
    "seoSlug": "suporte-mini-pc-pcyes-nuc-thin-client-vesa-universal-plmsc01",
    "productUrl": "https://www.pcyes.com.br/suporte-mini-pc-pcyes-nuc-thin-client-vesa-universal-plmsc01",
    "inStock": true
  },
  {
    "id": 253,
    "sku": "291344",
    "name": "Suporte Articulado para Monitor PCYES 17-32\" Pistão a Gás SM-010G",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 381,
    "category": "Periféricos",
    "subcategory": "Suporte de Monitor",
    "tags": [
      "Escritório",
      "Periféricos",
      "Suporte de Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/291344/287571B040B35B2EE0630300A8C08EC9",
    "images": [
      "https://cdn.oderco.com.br/produtos/291344/287571B040B35B2EE0630300A8C08EC9",
      "https://cdn.oderco.com.br/produtos/291344/383C63903EC10625E0630300A8C070F1",
      "https://cdn.oderco.com.br/produtos/291344/3B1623D060339D04E0630300A8C01573"
    ],
    "description": "O Suporte Articulado para Monitor PCYES SM-010G foi desenvolvido para oferecer mais ergonomia, organização e flexibilidade no seu espaço de trabalho. Compatível com monitores de 17 a 32 polegadas, possui pistão a gás que permite ajustes suaves de altura, inclinação e posição, proporcionando melhor c…",
    "features": [
      "Suporte articulado para monitores de 17 a 32 polegadas",
      "Pistão a gás para ajuste de altura suave e preciso",
      "Rotação da tela em até 360° para melhor visualização",
      "Compatível com padrão VESA 75x75 e 100x100",
      "Extensão do braço para maior flexibilidade de posicionamento",
      "Organizador de cabos integrado para mesa mais organizada",
      "Suporte para monitores de até 9 kg",
      "Instalação por morsa ou ilhó para diferentes tipos de mesa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "291344"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Suporte de Monitor"
      }
    ],
    "seoSlug": "suporte-articulado-monitor-pcyes-17-32-pistao-gas-sm-010g",
    "productUrl": "https://www.pcyes.com.br/suporte-articulado-monitor-pcyes-17-32-pistao-gas-sm-010g",
    "inStock": true,
    "oldPrice": "R$ 223,89",
    "oldPriceNum": 223.89
  },
  {
    "id": 254,
    "sku": "270434",
    "name": "Placa-mãe PCYES H610 DDR4 M.2 NVMe LGA1700 M-ATX PCYH610-14G64",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 418,
    "category": "Hardware",
    "subcategory": "Placa-mãe",
    "tags": [
      "Hardware",
      "Placa-mãe"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/270434/401F35F0C98F26C2E0630300A8C0FD75",
    "images": [
      "https://cdn.oderco.com.br/produtos/270434/401F35F0C98F26C2E0630300A8C0FD75",
      "https://cdn.oderco.com.br/produtos/270434/401F35F0C99426C2E0630300A8C0FD75"
    ],
    "description": "A Placa-mãe H610 PCYES PCYH610-14G64 é uma solução confiável e eficiente para computadores com processadores Intel de 12ª, 13ª e 14ª geração. Com chipset Intel H610 e suporte para memória DDR4 de até 64GB, oferece desempenho estável para uso profissional, doméstico ou corporativo.\n\nSeu formato Mic…",
    "features": [
      "Compatível com processadores Intel de 12ª, 13ª e 14ª geração",
      "Memória DDR4 até 64GB para multitarefas eficientes",
      "Slot M.2 NVMe para armazenamento de alta velocidade",
      "Chipset Intel H610 confiável e estável",
      "Saídas de vídeo HDMI, DisplayPort e VGA",
      "Rede Gigabit Realtek com suporte a Wake on LAN",
      "Portas USB 3.2 para maior velocidade de conexão",
      "Formato Micro ATX compatível com diversos gabinetes"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "270434"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa-mãe"
      }
    ],
    "seoSlug": "placa-mae-h610-pcyes-ddr4-m2-nvme-lga1700-m-atx-pcyh610-14g64",
    "productUrl": "https://www.pcyes.com.br/placa-mae-h610-pcyes-ddr4-m2-nvme-lga1700-m-atx-pcyh610-14g64",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 255,
    "sku": "270435",
    "name": "Placa-mãe PCYES B760 DDR5 M.2 NVMe LGA1700 M-ATX PCYB760-14G64",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 455,
    "category": "Hardware",
    "subcategory": "Placa-mãe",
    "tags": [
      "Hardware",
      "Placa-mãe"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/270435/401F35F0C98326C2E0630300A8C0FD75",
    "images": [
      "https://cdn.oderco.com.br/produtos/270435/401F35F0C98326C2E0630300A8C0FD75",
      "https://cdn.oderco.com.br/produtos/270435/401F35F0C98826C2E0630300A8C0FD75"
    ],
    "description": "A Placa-mãe B760 PCYES PCYB760-14G64 é uma solução moderna e eficiente para computadores de alto desempenho baseados em processadores Intel de 12ª, 13ª e 14ª geração. Com chipset Intel B760 e suporte para memória DDR5 de até 64GB, oferece maior velocidade, eficiência energética e desempenho para mul…",
    "features": [
      "Suporte a processadores Intel de 12ª, 13ª e 14ª geração",
      "Memória DDR5 de até 64GB para maior desempenho",
      "2 slots M.2 NVMe para armazenamento ultrarrápido",
      "Chipset Intel B760 para estabilidade e performance",
      "Conectividade completa com HDMI, DisplayPort e VGA",
      "Portas USB 3.2 e USB Type-C para periféricos modernos",
      "Rede Gigabit Realtek para conexão rápida e estável",
      "Formato Micro ATX compatível com diversos gabinetes"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "270435"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa-mãe"
      }
    ],
    "seoSlug": "placa-mae-b760-pcyes-ddr5-m2-nvme-lga1700-m-atx-pcyb760-14g64",
    "productUrl": "https://www.pcyes.com.br/placa-mae-b760-pcyes-ddr5-m2-nvme-lga1700-m-atx-pcyb760-14g64",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 256,
    "sku": "270432",
    "name": "Placa-mãe PCYES B250 LGA1151 DDR4 M.2 NVMe M-ATX PCYB250-9G64",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 62,
    "category": "Hardware",
    "subcategory": "Placa-mãe",
    "tags": [
      "Hardware",
      "Placa-mãe"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/270432/401F35F0C97126C2E0630300A8C0FD75",
    "images": [
      "https://cdn.oderco.com.br/produtos/270432/401F35F0C97126C2E0630300A8C0FD75",
      "https://cdn.oderco.com.br/produtos/270432/401F35F0C97626C2E0630300A8C0FD75"
    ],
    "description": "A Placa-mãe B250 PCYES LGA1151 M-ATX PCYB250-9G64 é uma solução eficiente para montagem ou upgrade de computadores com processadores Intel compatíveis com socket LGA1151. Projetada para oferecer estabilidade e desempenho, suporta CPUs Intel Celeron, Pentium e Core i3, i5 e i7.\n\nCom dois slots de m…",
    "features": [
      "Compatível com processadores Intel LGA1151",
      "Suporte para até 64GB de memória DDR4",
      "Slot M.2 NVMe para SSDs de alta velocidade",
      "Portas USB 3.2 para transferências rápidas",
      "Rede Gigabit para conexão estável",
      "Saídas HDMI, DisplayPort e VGA para maior compatibilidade",
      "Formato Micro ATX para diversos gabinetes",
      "Excelente opção para montagem ou upgrade de PCs"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "270432"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa-mãe"
      }
    ],
    "seoSlug": "placa-mae-b250-pcyes-lga1151-ddr4-m2-nvme-pcyb250-9g64",
    "productUrl": "https://www.pcyes.com.br/placa-mae-b250-pcyes-lga1151-ddr4-m2-nvme-pcyb250-9g64",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 257,
    "sku": "270433",
    "name": "Placa-mãe PCYES H470 LGA1200 DDR4 M.2 NVMe M-ATX PCYH470-10G64",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 99,
    "category": "Hardware",
    "subcategory": "Placa-mãe",
    "tags": [
      "Hardware",
      "Placa-mãe"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/270433/401F35F0C98926C2E0630300A8C0FD75",
    "images": [
      "https://cdn.oderco.com.br/produtos/270433/401F35F0C98926C2E0630300A8C0FD75",
      "https://cdn.oderco.com.br/produtos/270433/401F35F0C98E26C2E0630300A8C0FD75"
    ],
    "description": "A Placa-mãe H470 PCYES LGA1200 M-ATX PCYH470-10G64 foi desenvolvida para oferecer desempenho, estabilidade e conectividade em computadores com processadores Intel de 10ª e 11ª geração. Compatível com CPUs Intel Celeron, Pentium e Core i3, i5, i7 e i9 com socket LGA1200, é ideal para montagem ou upgr…",
    "features": [
      "Compatível com processadores Intel LGA1200 de 10ª e 11ª geração",
      "Suporte para até 64GB de memória DDR4 3200MHz",
      "Slot M.2 NVMe para SSDs de alta velocidade",
      "Portas USB 3.0 para transferências rápidas",
      "Rede Gigabit para conexão estável",
      "Saídas HDMI, DisplayPort e VGA para maior compatibilidade de vídeo",
      "Formato Micro ATX ideal para diversos gabinetes",
      "Excelente opção para PCs modernos e upgrades de desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "270433"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa-mãe"
      }
    ],
    "seoSlug": "placa-mae-h470-pcyes-lga1200-ddr4-m2-nvme-pcyh470-10g64",
    "productUrl": "https://www.pcyes.com.br/placa-mae-h470-pcyes-lga1200-ddr4-m2-nvme-pcyh470-10g64",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 258,
    "sku": "270430",
    "name": "Placa-mãe PCYES H81 LGA1150 DDR3 M.2 NVMe M-ATX PCYH81-4G16",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 136,
    "category": "Hardware",
    "subcategory": "Placa-mãe",
    "tags": [
      "Hardware",
      "Placa-mãe"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/270430/401F35F0C99526C2E0630300A8C0FD75",
    "images": [
      "https://cdn.oderco.com.br/produtos/270430/401F35F0C99526C2E0630300A8C0FD75",
      "https://cdn.oderco.com.br/produtos/270430/401F35F0C99A26C2E0630300A8C0FD75"
    ],
    "description": "A Placa-mãe H81 PCYES LGA1150 M-ATX PCYH81-4G16 foi desenvolvida para oferecer estabilidade, desempenho e compatibilidade em computadores com processadores Intel de 4ª geração. Compatível com CPUs Intel Celeron, Pentium e Core i3, i5 e i7 com socket LGA1150, é uma excelente opção para montagem ou up…",
    "features": [
      "Compatível com processadores Intel LGA1150 de 4ª geração",
      "Suporte para até 16GB de memória DDR3",
      "Slot M.2 NVMe para SSDs de alta velocidade",
      "Portas USB 3.0 para transferências rápidas",
      "Rede Gigabit para conexão estável",
      "Saídas HDMI e VGA para maior compatibilidade de vídeo",
      "Formato Micro ATX ideal para gabinetes compactos",
      "Ótima opção para montagem ou upgrade de PCs"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "270430"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa-mãe"
      }
    ],
    "seoSlug": "placa-mae-h81-pcyes-lga1150-ddr3-m2-nvme-pcyh81-4g16",
    "productUrl": "https://www.pcyes.com.br/placa-mae-h81-pcyes-lga1150-ddr3-m2-nvme-pcyh81-4g16",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 259,
    "sku": "270409",
    "name": "Placa-mãe PCYES B75 LGA1155 DDR3 M.2 NVMe M-ATX PCYB75-3G16",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 173,
    "category": "Hardware",
    "subcategory": "Placa-mãe",
    "tags": [
      "Hardware",
      "Placa-mãe"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/270409/401F35F0C97D26C2E0630300A8C0FD75",
    "images": [
      "https://cdn.oderco.com.br/produtos/270409/401F35F0C97D26C2E0630300A8C0FD75",
      "https://cdn.oderco.com.br/produtos/270409/401F35F0C98226C2E0630300A8C0FD75"
    ],
    "description": "A Placa-mãe B75 PCYES LGA1155 M-ATX PCYB75-3G16 é uma solução eficiente para montar ou atualizar computadores com processadores Intel de 2ª e 3ª geração. Compatível com CPUs Intel Celeron, Pentium e Core i3, i5 e i7 com socket LGA1155, oferece estabilidade e desempenho para diferentes aplicações.\n…",
    "features": [
      "Compatível com processadores Intel LGA1155 de 2ª e 3ª geração",
      "Suporte para até 16GB de memória DDR3",
      "Slot M.2 NVMe para SSDs de alta velocidade",
      "Portas USB 3.0 para transferências rápidas",
      "Rede Gigabit para conexão estável e rápida",
      "Saídas HDMI e VGA para maior compatibilidade de vídeo",
      "Formato Micro ATX ideal para gabinetes compactos",
      "Excelente opção para upgrades ou montagem de PCs"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "270409"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa-mãe"
      }
    ],
    "seoSlug": "placa-mae-b75-pcyes-lga1155-ddr3-m2-nvme-pcyb75-3g16",
    "productUrl": "https://www.pcyes.com.br/placa-mae-b75-pcyes-lga1155-ddr3-m2-nvme-pcyb75-3g16",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 260,
    "sku": "209949",
    "name": "Monitor Gamer PCYES Z-Max Z10 31,5\" FHD 240Hz 1ms FreeSync PMG320FD240",
    "price": "R$ 899,90",
    "priceNum": 899.9,
    "rating": 4.6,
    "reviews": 210,
    "category": "Monitores",
    "subcategory": "Monitor Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Monitores",
      "Monitor Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/209949/1029001B37608397E0630300A8C069C3",
    "images": [
      "https://cdn.oderco.com.br/produtos/209949/1029001B37608397E0630300A8C069C3",
      "https://cdn.oderco.com.br/produtos/209949/1029001B37618397E0630300A8C069C3",
      "https://cdn.oderco.com.br/produtos/209949/1029001B37628397E0630300A8C069C3"
    ],
    "description": "O Monitor Gamer Z-Max Z10 PCYES 31,5\" FHD 240Hz PMG320FD240 foi projetado para gamers que buscam máxima fluidez e imersão durante as partidas. Com tela ampla de 31,5 polegadas e resolução Full HD (1920x1080), proporciona excelente área de visualização para jogos, conteúdos multimídia e produtividad…",
    "features": [
      "Tela ampla de 31,5\" para maior imersão nos jogos",
      "Taxa de atualização de 240Hz para gameplay extremamente fluido",
      "Tempo de resposta de 1ms para maior precisão em jogos competitivos",
      "Painel VA com alto contraste de 4000:1 e cores mais profundas",
      "Tecnologia AMD FreeSync para reduzir cortes e travamentos",
      "Ângulo de visão de 178° para melhor visualização",
      "Tecnologias Flicker Free e Low Blue Light para conforto visual",
      "Conexões HDMI, DisplayPort e USB para maior compatibilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "209949"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Monitor Gamer"
      }
    ],
    "seoSlug": "monitor-gamer-zmax-z10-pcyes-31-5-fhd-240hz-pmg320fd240",
    "productUrl": "https://www.pcyes.com.br/monitor-gamer-zmax-z10-pcyes-31-5-fhd-240hz-pmg320fd240",
    "inStock": true,
    "oldPrice": "R$ 1061,88",
    "oldPriceNum": 1061.88
  },
  {
    "id": 261,
    "sku": "202396",
    "name": "SSD PCYES 1TB SATA III 2,5\" 550MB/s 500MB/s SSD25PY1024",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.7,
    "reviews": 247,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/202396/401A241D79B54FABE0630300A8C0903C",
    "images": [
      "https://cdn.oderco.com.br/produtos/202396/401A241D79B54FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/202396/401A241D79B64FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/202396/401A241D79B74FABE0630300A8C0903C"
    ],
    "description": "O SSD 1TB PCYES SATA III 2,5\" SSD25PY1024 é a escolha ideal para quem deseja mais velocidade, confiabilidade e desempenho no computador. Com capacidade de 1TB, ele oferece amplo espaço para armazenar arquivos, jogos, programas e documentos com segurança e eficiência.\n\nEquipado com interface SATA …",
    "features": [
      "Mais velocidade para inicialização do sistema e carregamento de programas",
      "Leitura de até 550MB/s para acesso rápido aos arquivos",
      "Gravação de até 500MB/s para transferências mais eficientes",
      "Capacidade de 1TB para armazenar grande volume de dados",
      "Formato 2,5\" compatível com desktops e notebooks",
      "Maior resistência a choques e vibrações que HDs tradicionais",
      "Operação silenciosa e baixo consumo de energia",
      "Upgrade ideal para substituir HDs e melhorar o desempenho do PC"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "202396"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-1tb-pcyes-sata-iii-2-5-ssd25py1024",
    "productUrl": "https://www.pcyes.com.br/ssd-1tb-pcyes-sata-iii-2-5-ssd25py1024",
    "inStock": true
  },
  {
    "id": 262,
    "sku": "207005",
    "name": "Monitor PCYES Gamer Quartzo Q10 23,8\" FHD 75Hz 5ms FreeSync PMG238FD75",
    "price": "R$ 899,90",
    "priceNum": 899.9,
    "rating": 4.8,
    "reviews": 284,
    "category": "Monitores",
    "subcategory": "Monitor",
    "tags": [
      "Gaming",
      "Escritório",
      "Monitores",
      "Monitor"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/207005/369D7273916A8EB3E0630300A8C0EDA6",
    "images": [
      "https://cdn.oderco.com.br/produtos/207005/369D7273916A8EB3E0630300A8C0EDA6",
      "https://cdn.oderco.com.br/produtos/207005/369D7273916B8EB3E0630300A8C0EDA6",
      "https://cdn.oderco.com.br/produtos/207005/369D7273916C8EB3E0630300A8C0EDA6"
    ],
    "description": "O Monitor Gamer Quartzo Q10 PCYES 23,8\" FHD 75Hz PMG238FD75 foi desenvolvido para oferecer qualidade de imagem, fluidez e conforto visual durante jogos, trabalho ou entretenimento.\n\nCom tela de 23,8 polegadas e resolução Full HD (1920x1080), ele entrega imagens nítidas e detalhadas, ideais para j…",
    "features": [
      "Tela Full HD de 23,8\" para imagens nítidas e detalhadas",
      "Taxa de atualização de 75Hz para maior fluidez em jogos",
      "Tempo de resposta de 5ms para reduzir rastros na imagem",
      "Painel VA com alto contraste de 3000:1 e cores mais vivas",
      "Tecnologia AMD FreeSync para reduzir cortes de imagem",
      "Ângulo de visão amplo de 178° para melhor visualização",
      "Tecnologias Flicker Free e Low Blue Light para conforto visual",
      "Conexões HDMI e VGA para maior compatibilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "207005"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Monitor"
      }
    ],
    "seoSlug": "monitor-gamer-quartzo-q10-pcyes-23-8-fhd-75hz-pmg238fd75",
    "productUrl": "https://www.pcyes.com.br/monitor-gamer-quartzo-q10-pcyes-23-8-fhd-75hz-pmg238fd75",
    "inStock": true
  },
  {
    "id": 263,
    "sku": "202393",
    "name": "SSD PCYES 128GB M.2 NVMe PCIe 3.0x4 SSDNVMEG3PY128",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.9,
    "reviews": 321,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/202393/401A241D79C54FABE0630300A8C0903C",
    "images": [
      "https://cdn.oderco.com.br/produtos/202393/401A241D79C54FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/202393/401A241D79C44FABE0630300A8C0903C"
    ],
    "description": "O SSD 128GB PCYES M.2 NVMe PCIe 3.0x4 SSDNVMEG3PY128 é uma solução de armazenamento de alta performance desenvolvida para desktops e notebooks compatíveis com slot M.2 2280. Utilizando a tecnologia NVMe com interface PCIe 3.0x4, ele oferece velocidades muito superiores aos SSDs SATA tradicionais.\n…",
    "features": [
      "128GB de armazenamento para sistema e aplicativos",
      "Velocidade de leitura de até 1175MB/s",
      "Velocidade de gravação de até 700MB/s",
      "Interface PCIe 3.0x4 com tecnologia NVMe",
      "Formato compacto M.2 2280",
      "Upgrade rápido para desktops e notebooks"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "202393"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-128gb-pcyes-m2-nvme-pcie3x4-ssdnvmeg3py128",
    "productUrl": "https://www.pcyes.com.br/ssd-128gb-pcyes-m2-nvme-pcie3x4-ssdnvmeg3py128",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 264,
    "sku": "284375",
    "name": "Memória PCYES UDIMM 8GB DDR5 5600MHz Desktop PM085600D5",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 358,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284375/402EA1867FE26E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/284375/402EA1867FE26E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/284375/402EA1867FE16E2DE0630300A8C0D98B"
    ],
    "description": "A Memória UDIMM 8GB PCYES DDR5 5600MHz Desktop PM085600D5 foi desenvolvida para oferecer alto desempenho e eficiência em computadores compatíveis com a nova geração DDR5. Ideal para upgrades, proporciona maior velocidade no processamento de dados e melhor desempenho geral do sistema.\n\nCom frequênc…",
    "features": [
      "8GB de capacidade para multitarefas",
      "Frequência de 5600MHz para alto desempenho",
      "Tecnologia DDR5 de última geração",
      "Formato UDIMM 288-PIN para desktops",
      "Maior largura de banda e eficiência energética",
      "Ideal para upgrades em sistemas modernos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284375"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-udimm-8gb-pcyes-ddr5-5600mhz-desktop-pm085600d5",
    "productUrl": "https://www.pcyes.com.br/memoria-udimm-8gb-pcyes-ddr5-5600mhz-desktop-pm085600d5",
    "inStock": true,
    "oldPrice": "R$ 223,89",
    "oldPriceNum": 223.89
  },
  {
    "id": 265,
    "sku": "33514",
    "name": "Memória PCYES UDIMM 8GB DDR4 2666MHz Desktop PM082666D4",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 395,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/33514/402EA1867FD86E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/33514/402EA1867FD86E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/33514/402EA1867FD76E2DE0630300A8C0D98B"
    ],
    "description": "A Memória UDIMM 8GB PCYES DDR4 2666MHz Desktop PM082666D4 é ideal para quem deseja aumentar o desempenho do computador com um upgrade simples e eficiente. Desenvolvida para sistemas compatíveis com DDR4, oferece maior velocidade de processamento e melhor resposta do sistema.\n\nCom frequência de 266…",
    "features": [
      "8GB de capacidade para multitarefas",
      "Frequência de 2666MHz para maior desempenho",
      "Tecnologia DDR4 moderna e eficiente",
      "Formato UDIMM 288-PIN para desktops",
      "Baixo consumo de energia (1.2V)",
      "Ideal para upgrades em computadores DDR4"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "33514"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-udimm-8gb-pcyes-ddr4-2666mhz-desktop-pm082666d4",
    "productUrl": "https://www.pcyes.com.br/memoria-udimm-8gb-pcyes-ddr4-2666mhz-desktop-pm082666d4",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 266,
    "sku": "32290",
    "name": "Memória PCYES UDIMM 4GB DDR3 1600MHz Desktop PM041600D3",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 432,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32290/402EA1867FC46E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/32290/402EA1867FC46E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/32290/402EA1867FC36E2DE0630300A8C0D98B"
    ],
    "description": "A Memória UDIMM 4GB PCYES DDR3 1600MHz Desktop PM041600D3 é uma solução confiável para upgrades em computadores que utilizam memória DDR3. Desenvolvida para proporcionar estabilidade e bom desempenho nas tarefas do dia a dia, ela melhora a resposta do sistema e permite executar aplicações com mais e…",
    "features": [
      "4GB de capacidade para tarefas do dia a dia",
      "Frequência de 1600MHz para melhor desempenho",
      "Tecnologia DDR3 estável e confiável",
      "Formato UDIMM 240-PIN para desktops",
      "Baixo consumo de energia",
      "Ideal para upgrades em computadores DDR3"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32290"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-udimm-4gb-pcyes-ddr3-1600mhz-desktop-pm041600d3",
    "productUrl": "https://www.pcyes.com.br/memoria-udimm-4gb-pcyes-ddr3-1600mhz-desktop-pm041600d3",
    "inStock": true
  },
  {
    "id": 267,
    "sku": "34689",
    "name": "Memória PCYES UDIMM 32GB DDR4 3200MHz Desktop PM323200D4",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 469,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/34689/4520E92D66A0C021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/34689/4520E92D66A0C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/34689/4520E92D669FC021E0630300A8C02B6F"
    ],
    "description": "A Memória UDIMM 32GB PCYES DDR4 3200MHz Desktop PM323200D4 foi desenvolvida para oferecer alto desempenho, estabilidade e grande capacidade de processamento para desktops compatíveis com memória DDR4.\n\nCom frequência de 3200MHz e capacidade de 32GB, é ideal para sistemas que exigem maior desempenh…",
    "features": [
      "32GB de capacidade para multitarefas avançadas",
      "Frequência de 3200MHz para alto desempenho",
      "Tecnologia DDR4 com maior estabilidade",
      "Formato UDIMM 288-PIN para desktops",
      "Baixo consumo de energia e alta eficiência",
      "Ideal para upgrades de alto desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "34689"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-udimm-32gb-pcyes-ddr4-3200mhz-desktop-pm323200d4",
    "productUrl": "https://www.pcyes.com.br/memoria-udimm-32gb-pcyes-ddr4-3200mhz-desktop-pm323200d4",
    "inStock": true
  },
  {
    "id": 268,
    "sku": "284379",
    "name": "Memória PCYES UDIMM 16GB DDR5 5600MHz Desktop PM165600D5",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 76,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284379/402EA1867FBA6E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/284379/402EA1867FBA6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/284379/402EA1867FB96E2DE0630300A8C0D98B"
    ],
    "description": "A Memória UDIMM 16GB PCYES DDR5 5600MHz Desktop PM165600D5 foi desenvolvida para entregar alto desempenho e eficiência em sistemas compatíveis com a nova geração DDR5. Com frequência de 5600MHz, proporciona maior velocidade de processamento, melhor resposta do sistema e excelente desempenho em multi…",
    "features": [
      "16GB de capacidade para maior desempenho do sistema",
      "Frequência de 5600MHz para processamento ultrarrápido",
      "Tecnologia DDR5 com maior largura de banda",
      "Formato UDIMM 288-PIN para desktops",
      "Maior eficiência energética e estabilidade",
      "Ideal para upgrades de alta performance"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284379"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-udimm-16gb-pcyes-ddr5-5600mhz-desktop-pm165600d5",
    "productUrl": "https://www.pcyes.com.br/memoria-udimm-16gb-pcyes-ddr5-5600mhz-desktop-pm165600d5",
    "inStock": true
  },
  {
    "id": 269,
    "sku": "32609",
    "name": "Memória PCYES UDIMM 16GB DDR4 2666MHz Desktop PM162666D4",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 113,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32609/4520E92D6696C021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/32609/4520E92D6696C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/32609/4520E92D6695C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/32609/4520E92D6697C021E0630300A8C02B6F"
    ],
    "description": "A Memória UDIMM 16GB PCYES DDR4 2666MHz Desktop PM162666D4 é uma excelente escolha para quem deseja aumentar o desempenho do computador com mais capacidade e velocidade. Com frequência de 2666MHz, proporciona maior eficiência na execução de tarefas, melhor resposta do sistema e mais fluidez em aplic…",
    "features": [
      "16GB de capacidade para maior desempenho do sistema",
      "Frequência de 2666MHz para processamento mais rápido",
      "Tecnologia DDR4 eficiente e estável",
      "Formato UDIMM 288-PIN para desktops",
      "Ideal para multitarefas e aplicações exigentes",
      "Upgrade simples para melhorar o desempenho do PC"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32609"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-udimm-16gb-pcyes-ddr4-2666mhz-desktop-pm162666d4",
    "productUrl": "https://www.pcyes.com.br/memoria-udimm-16gb-pcyes-ddr4-2666mhz-desktop-pm162666d4",
    "inStock": true
  },
  {
    "id": 270,
    "sku": "32292",
    "name": "Memória PCYES SODIMM 4GB DDR3 1600MHz Notebook PM041600D3SO",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 150,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32292/BEF41FFD17F5FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/32292/BEF41FFD17F5FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/32292/BEF41FFD17F4FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/32292/BEF41FFD17F6FC48E055DEF401E782F4"
    ],
    "description": "A Memória SODIMM 4GB PCYES DDR3 1600MHz Notebook PM041600D3SO é uma solução eficiente para quem deseja melhorar o desempenho de notebooks compatíveis com memória DDR3. Com frequência de 1600MHz, proporciona maior velocidade no processamento de dados e melhor resposta do sistema em tarefas diárias.\n…",
    "features": [
      "4GB de capacidade para upgrades em notebooks",
      "Frequência de 1600MHz para melhor desempenho",
      "Tecnologia DDR3 estável e confiável",
      "Formato SO-DIMM 204-PIN para notebooks",
      "Ideal para multitarefas e aplicações do dia a dia",
      "Upgrade simples para melhorar o desempenho do sistema"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32292"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-sodimm-4gb-pcyes-ddr3-1600mhz-notebook-pm041600d3so",
    "productUrl": "https://www.pcyes.com.br/memoria-sodimm-4gb-pcyes-ddr3-1600mhz-notebook-pm041600d3so",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 271,
    "sku": "254552",
    "name": "Memória PCYES Gamer UDIMM 8GB DDR4 3200MHz Branca ARGB PM083200D4WR",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 187,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "RGB",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254552/402EA1867F976E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254552/402EA1867F976E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254552/402EA1867F986E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254552/402EA1867F996E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer UDIMM 8GB PCYES DDR4 3200MHz Branca ARGB PM083200D4WR combina desempenho, estabilidade e estilo para upgrades em desktops gamers e profissionais. Com frequência de 3200MHz, proporciona maior velocidade no sistema, melhor desempenho em jogos e maior fluidez na execução de múltiplas ta…",
    "features": [
      "8GB de capacidade para melhor desempenho do sistema",
      "Frequência de 3200MHz para maior velocidade",
      "Iluminação ARGB personalizável",
      "Tecnologia DDR4 de alta performance",
      "Formato UDIMM 288-PIN para desktops",
      "Ideal para jogos, multitarefas e setups gamers"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254552"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-8gb-pcyes-ddr4-3200mhz-branca-argb-pm083200d4wr",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-8gb-pcyes-ddr4-3200mhz-branca-argb-pm083200d4wr",
    "inStock": true
  },
  {
    "id": 272,
    "sku": "254542",
    "name": "Memória PCYES Gamer UDIMM 8GB DDR4 3200MHz Branca PM083200D4W",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 224,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254542/402EA1867F926E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254542/402EA1867F926E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254542/402EA1867F936E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254542/402EA1867F946E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer UDIMM 8GB PCYES DDR4 3200MHz Branca PM083200D4W foi desenvolvida para entregar desempenho, estabilidade e eficiência em desktops compatíveis com tecnologia DDR4. Ideal para quem deseja realizar um upgrade no computador, proporcionando maior velocidade nas tarefas diárias, melhor dese…",
    "features": [
      "8GB de capacidade para melhor desempenho do sistema",
      "Frequência de 3200MHz para maior velocidade",
      "Tecnologia DDR4 eficiente e confiável",
      "Formato UDIMM 288-PIN para desktops",
      "Ideal para jogos, multitarefas e produtividade",
      "Design moderno para setups gamers"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254542"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-8gb-pcyes-ddr4-3200mhz-branca-pm083200d4w",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-8gb-pcyes-ddr4-3200mhz-branca-pm083200d4w",
    "inStock": true
  },
  {
    "id": 273,
    "sku": "254547",
    "name": "Memória PCYES Gamer UDIMM 8GB DDR4 3200MHz ARGB Preta PM083200D4BR",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 261,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "RGB",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254547/402EA1867F8D6E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254547/402EA1867F8D6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254547/402EA1867F8E6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254547/402EA1867F8F6E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer PCYES UDIMM 8GB DDR4 3200MHz ARGB foi desenvolvida para entregar alto desempenho, estabilidade e estilo ao seu setup. Com frequência de 3200MHz, ela garante maior velocidade de processamento, melhor resposta do sistema e desempenho ideal para jogos, multitarefas e aplicações que exig…",
    "features": [
      "Desempenho rápido com frequência de 3200MHz para jogos e aplicações exigentes",
      "Iluminação ARGB integrada para personalização do setup gamer",
      "Compatibilidade com softwares de sincronização das principais placas-mãe",
      "Maior estabilidade e eficiência com tecnologia DDR4",
      "Ideal para upgrades e montagem de computadores gamers",
      "Design moderno com dissipador preto que valoriza o visual do setup"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254547"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-8gb-ddr4-3200mhz-argb-preta-pm083200d4br",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-8gb-ddr4-3200mhz-argb-preta-pm083200d4br",
    "inStock": true
  },
  {
    "id": 274,
    "sku": "254538",
    "name": "Memória PCYES Gamer 8GB DDR4 3200MHz Preta UDIMM PM083200D4B",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 298,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254538/21B0810D019E12ABE0630300A8C08119",
    "images": [
      "https://cdn.oderco.com.br/produtos/254538/21B0810D019E12ABE0630300A8C08119",
      "https://cdn.oderco.com.br/produtos/254538/21B0810D019F12ABE0630300A8C08119",
      "https://cdn.oderco.com.br/produtos/254538/21B0810D01A012ABE0630300A8C08119"
    ],
    "description": "A Memória Gamer 8GB PCYES DDR4 3200MHz UDIMM foi desenvolvida para oferecer desempenho e estabilidade para PCs gamers e sistemas que exigem maior capacidade de processamento. Ideal para upgrades, proporciona maior velocidade e eficiência no uso diário, jogos e aplicações multitarefa.\n\nCom frequênc…",
    "features": [
      "Desempenho aprimorado com frequência de 3200MHz",
      "Ideal para jogos e multitarefas",
      "Maior estabilidade no sistema",
      "Compatível com desktops DDR4",
      "Upgrade eficiente para PCs gamers",
      "Componentes de alta qualidade para maior durabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254538"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-8gb-ddr4-3200mhz-preta-udimm-pcyes-pm083200d4b",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-8gb-ddr4-3200mhz-preta-udimm-pcyes-pm083200d4b",
    "inStock": true
  },
  {
    "id": 275,
    "sku": "254554",
    "name": "Memória PCYES Gamer 32GB DDR4 3200MHz Branca ARGB UDIMM PM323200D4WR",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 335,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "RGB",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254554/402EA1867F896E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254554/402EA1867F896E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254554/402EA1867F8A6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254554/402EA1867F8B6E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer 32GB PCYES DDR4 3200MHz Branca ARGB UDIMM combina alto desempenho com um design moderno ideal para setups gamers. Desenvolvida para desktops compatíveis com DDR4, oferece grande capacidade e velocidade para jogos atuais, multitarefas intensas e aplicações que exigem alto poder de pro…",
    "features": [
      "Alta capacidade de 32GB para multitarefas intensas",
      "Frequência de 3200MHz para maior desempenho",
      "Iluminação ARGB personalizável",
      "Ideal para jogos e aplicações exigentes",
      "Maior estabilidade e confiabilidade no sistema",
      "Design gamer moderno na cor branca"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254554"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-32gb-ddr4-3200mhz-branca-rgb-udimm-pcyes-pm323200d4wr",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-32gb-ddr4-3200mhz-branca-rgb-udimm-pcyes-pm323200d4wr",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 276,
    "sku": "254549",
    "name": "Memória PCYES Gamer 32GB DDR4 3200MHz Preta ARGB UDIMM PM323200D4BR",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 372,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "RGB",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254549/402EA1867F7F6E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254549/402EA1867F7F6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254549/402EA1867F806E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254549/402EA1867F816E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer 32GB PCYES DDR4 3200MHz Preta ARGB UDIMM foi desenvolvida para oferecer alto desempenho e visual moderno para setups gamers. Com grande capacidade e velocidade elevada, é ideal para jogos atuais, multitarefas intensas e aplicações que exigem alta performance.\n\nEquipada com frequênc…",
    "features": [
      "Alta capacidade de 32GB para multitarefas intensas",
      "Frequência de 3200MHz para alto desempenho",
      "Iluminação ARGB personalizável",
      "Ideal para jogos e aplicações exigentes",
      "Maior estabilidade e confiabilidade no sistema",
      "Design gamer moderno na cor preta"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254549"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-32gb-ddr4-3200mhz-preta-rgb-udimm-pcyes-pm323200d4br",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-32gb-ddr4-3200mhz-preta-rgb-udimm-pcyes-pm323200d4br",
    "inStock": true
  },
  {
    "id": 277,
    "sku": "254540",
    "name": "Memoria PCYES Gamer 32GB DDR4 3200MHz Preta UDIMM PM323200D4B",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 409,
    "category": "Hardware",
    "subcategory": "Memoria",
    "tags": [
      "Gaming",
      "Hardware",
      "Memoria"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254540/402EA1867F7A6E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254540/402EA1867F7A6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254540/402EA1867F7B6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254540/402EA1867F7D6E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer 32GB PCYES DDR4 3200MHz Preta UDIMM foi desenvolvida para oferecer alto desempenho e maior capacidade para computadores desktop que exigem potência e estabilidade. Ideal para gamers, criadores de conteúdo e usuários profissionais, ela proporciona mais velocidade e eficiência para jog…",
    "features": [
      "Alta capacidade de 32GB para multitarefas intensas",
      "Frequência de 3200MHz para melhor desempenho",
      "Ideal para jogos e aplicações profissionais",
      "Maior estabilidade e confiabilidade no sistema",
      "Compatível com desktops DDR4 UDIMM",
      "Design moderno na cor preta"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254540"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memoria"
      }
    ],
    "seoSlug": "memoria-gamer-32gb-ddr4-3200mhz-preta-udimm-pcyes-pm323200d4b",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-32gb-ddr4-3200mhz-preta-udimm-pcyes-pm323200d4b",
    "inStock": true
  },
  {
    "id": 278,
    "sku": "307622",
    "name": "Memória PCYES Gamer 16GB DDR5 5600MHz Preta UDIMM PM165600D5B",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 446,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307622/402EA1867F676E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/307622/402EA1867F676E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/307622/402EA1867F686E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/307622/402EA1867F6A6E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer 16GB PCYES DDR5 5600MHz Preta UDIMM foi desenvolvida para entregar alto desempenho e maior eficiência em computadores desktop compatíveis com a nova geração de memórias DDR5. Ideal para gamers, profissionais e usuários exigentes, ela oferece velocidade superior e maior estabilidade p…",
    "features": [
      "Alta performance com frequência de 5600MHz",
      "Tecnologia DDR5 de nova geração",
      "Ideal para jogos e aplicações exigentes",
      "Maior velocidade e eficiência do sistema",
      "Design moderno na cor preta",
      "Compatível com desktops DDR5 UDIMM"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307622"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-16gb-ddr5-5600mhz-preta-udimm-pcyes-pm165600d5b",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-16gb-ddr5-5600mhz-preta-udimm-pcyes-pm165600d5b",
    "inStock": true
  },
  {
    "id": 279,
    "sku": "254553",
    "name": "Memória PCYES Gamer 16GB DDR4 3200MHz Branca RGB UDIMM PM163200D4WR",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 53,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "RGB",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254553/402EA1867F636E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254553/402EA1867F636E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254553/402EA1867F646E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254553/402EA1867F656E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer 16GB PCYES DDR4 3200MHz Branca RGB UDIMM combina desempenho elevado com um visual moderno para setups gamers e estações de trabalho de alta performance. Projetada para desktops compatíveis com memória DDR4, ela entrega maior velocidade e estabilidade para jogos, multitarefas e aplica…",
    "features": [
      "Alto desempenho com frequência de 3200MHz",
      "Iluminação ARGB personalizável",
      "Design gamer na cor branca",
      "Ideal para jogos e multitarefas",
      "Compatível com desktops DDR4 UDIMM",
      "Estabilidade e confiabilidade no sistema"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254553"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-16gb-ddr4-3200mhz-branca-rgb-udimm-pcyes-pm163200d4wr",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-16gb-ddr4-3200mhz-branca-rgb-udimm-pcyes-pm163200d4wr",
    "inStock": true
  },
  {
    "id": 280,
    "sku": "254548",
    "name": "Memória PCYES Gamer 16GB DDR4 3200MHz RGB UDIMM PM163200D4BR",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 90,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Gaming",
      "RGB",
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254548/402EA1867F596E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/254548/402EA1867F596E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254548/402EA1867F5A6E2DE0630300A8C0D98B",
      "https://cdn.oderco.com.br/produtos/254548/402EA1867F5C6E2DE0630300A8C0D98B"
    ],
    "description": "A Memória Gamer 16GB PCYES DDR4 3200MHz RGB UDIMM foi desenvolvida para entregar alto desempenho, estabilidade e estilo para computadores desktop. Ideal para gamers e usuários que exigem maior performance em multitarefas e aplicações pesadas, ela proporciona velocidade e eficiência no processamento …",
    "features": [
      "Alto desempenho com frequência de 3200MHz",
      "Iluminação ARGB personalizável",
      "Ideal para jogos e multitarefas",
      "Compatível com desktops DDR4 UDIMM",
      "Design gamer moderno",
      "Maior estabilidade e confiabilidade"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254548"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-gamer-16gb-ddr4-3200mhz-rgb-udimm-pcyes-pm163200d4br",
    "productUrl": "https://www.pcyes.com.br/memoria-gamer-16gb-ddr4-3200mhz-rgb-udimm-pcyes-pm163200d4br",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 281,
    "sku": "192060",
    "name": "SSD PCYES 512GB SATA III 2,5\" 550MB/s SSD25PY512",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.9,
    "reviews": 127,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192060/401A241D79A64FABE0630300A8C0903C",
    "images": [
      "https://cdn.oderco.com.br/produtos/192060/401A241D79A64FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/192060/401A241D79A84FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/192060/401A241D79A74FABE0630300A8C0903C"
    ],
    "description": "O SSD 512GB PCYES SATA III 2,5\" SSD25PY512 é a escolha ideal para quem deseja atualizar o armazenamento de desktops ou notebooks com mais velocidade e eficiência. Desenvolvido para substituir HDs tradicionais, ele proporciona inicialização mais rápida do sistema, carregamento ágil de aplicativos e …",
    "features": [
      "512GB de armazenamento para sistema, arquivos e aplicativos",
      "Velocidade de leitura de até 550MB/s para maior desempenho",
      "Gravação de até 400MB/s para transferências rápidas",
      "Interface SATA III 6Gb/s compatível com SATA II",
      "Formato 2,5\" com 7mm ideal para notebooks e desktops",
      "Operação silenciosa e baixo consumo de energia",
      "Tecnologia NAND 3D TLC para maior durabilidade",
      "Upgrade simples para substituir HDs tradicionais"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192060"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-512gb-pcyes-sata-iii-2-5-ssd25py512",
    "productUrl": "https://www.pcyes.com.br/ssd-512gb-pcyes-sata-iii-2-5-ssd25py512",
    "inStock": true
  },
  {
    "id": 282,
    "sku": "202395",
    "name": "SSD PCYES 512GB M.2 NVMe PCIe 3.0x4 2200MB/s SSDNVMEG3PY512",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.4,
    "reviews": 164,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/202395/4520E92D66AAC021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/202395/4520E92D66AAC021E0630300A8C02B6F"
    ],
    "description": "O SSD 512GB PCYES M.2 NVMe SSDNVMEG3PY512 é uma solução de armazenamento de alta performance para desktops e notebooks compatíveis com slot M.2 2280. Equipado com interface PCIe 3.0x4 e tecnologia NVMe, oferece leitura sequencial de até 2200MB/s e gravação de até 1700MB/s, proporcionando inicializaç…",
    "features": [
      "Leitura de até 2200MB/s para acesso rápido aos dados",
      "Gravação de até 1700MB/s para transferências eficientes",
      "Interface PCIe 3.0x4 com tecnologia NVMe",
      "Formato M.2 2280 compacto",
      "512GB de capacidade para sistema, arquivos e jogos",
      "Upgrade de alta performance para desktops e notebooks",
      "Baixo consumo de energia e operação silenciosa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "202395"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-512gb-pcyes-m2-nvme-2200mb-s-ssdnvmeg3py512",
    "productUrl": "https://www.pcyes.com.br/ssd-512gb-pcyes-m2-nvme-2200mb-s-ssdnvmeg3py512",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 283,
    "sku": "284384",
    "name": "Memória PCYES SODIMM 8GB DDR5 5600MHz CL40 Notebook PM085600D5SO",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 201,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/284384/4520E92D66B4C021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/284384/4520E92D66B4C021E0630300A8C02B6F"
    ],
    "description": "A Memória PCYES 8GB DDR5 SO-DIMM 5600MHz foi desenvolvida para oferecer mais desempenho, eficiência e estabilidade para notebooks modernos. Com tecnologia DDR5 de nova geração, ela proporciona maior largura de banda e melhor gerenciamento de energia, permitindo que o sistema execute tarefas com mais…",
    "features": [
      "Mais desempenho para notebooks com tecnologia DDR5",
      "Frequência de 5600MHz para maior velocidade de processamento",
      "Melhora a multitarefa e a resposta do sistema",
      "Baixo consumo de energia com maior eficiência",
      "Alta confiabilidade com componentes de qualidade",
      "Ideal para upgrades de notebooks modernos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "284384"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-sodimm-8gb-ddr5-5600mhz-notebook-pcyes-pm085600d5so",
    "productUrl": "https://www.pcyes.com.br/memoria-sodimm-8gb-ddr5-5600mhz-notebook-pcyes-pm085600d5so",
    "inStock": true
  },
  {
    "id": 284,
    "sku": "211994",
    "name": "SSD PCYES 1TB M.2 NVMe PCIe 3.0x4 2289MB/s SSDNVMEGEN3PY1T",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.6,
    "reviews": 238,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211994/4520E92D66AFC021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/211994/4520E92D66AFC021E0630300A8C02B6F"
    ],
    "description": "O SSD 1TB PCYES M.2 NVMe SSDNVMEGEN3PY1T oferece alto desempenho para desktops e notebooks compatíveis com slot M.2 2280. Utilizando interface PCIe 3.0x4 e tecnologia NVMe, proporciona leitura sequencial de até 2289MB/s e gravação de até 1650MB/s, garantindo inicialização rápida do sistema, carregam…",
    "features": [
      "Leitura de até 2289MB/s para acesso rápido aos dados",
      "Gravação de até 1650MB/s para transferências eficientes",
      "Interface PCIe 3.0x4 com tecnologia NVMe",
      "Formato M.2 2280 compacto e moderno",
      "1TB de capacidade para arquivos, jogos e aplicativos",
      "Upgrade de alta performance para desktops e notebooks",
      "Baixo consumo de energia e operação silenciosa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211994"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-1tb-pcyes-m2-nvme-2289mb-s-ssdnvmegen3py1t",
    "productUrl": "https://www.pcyes.com.br/ssd-1tb-pcyes-m2-nvme-2289mb-s-ssdnvmegen3py1t",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 285,
    "sku": "157400",
    "name": "SSD PCYES 128GB 2,5\" SATA III 550MB/s SSD25PY128",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.7,
    "reviews": 275,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/157400/401A241D79B04FABE0630300A8C0903C",
    "images": [
      "https://cdn.oderco.com.br/produtos/157400/401A241D79B04FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/157400/401A241D79B24FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/157400/401A241D79B14FABE0630300A8C0903C"
    ],
    "description": "O SSD 128GB PCYES 2,5\" SATA III SSD25PY128 é a solução ideal para upgrade de desktops e notebooks com interface SATA. Desenvolvido para substituir HDs tradicionais de forma prática e econômica, oferece leitura sequencial de até 550MB/s e gravação de até 400MB/s, proporcionando inicialização mais rá…",
    "features": [
      "Leitura de até 550MB/s para inicialização mais rápida",
      "Gravação de até 400MB/s para melhor desempenho diário",
      "Upgrade econômico para substituir HDD",
      "Menor consumo de energia",
      "Operação silenciosa e fria",
      "Maior resistência a impactos",
      "Compatível com desktops e notebooks SATA"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "157400"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-128gb-pcyes-sata-iii-550mb-s-ssd25py128",
    "productUrl": "https://www.pcyes.com.br/ssd-128gb-pcyes-sata-iii-550mb-s-ssd25py128",
    "inStock": true,
    "oldPrice": "R$ 353,88",
    "oldPriceNum": 353.88
  },
  {
    "id": 286,
    "sku": "346204",
    "name": "SSD PCYES 256AGB M.2 NVMe PCIe 3.0x4 1700MB/s SSDNVMEG3PY256GB",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.8,
    "reviews": 312,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/346204/4520E92D66D2C021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/346204/4520E92D66D2C021E0630300A8C02B6F"
    ],
    "description": "O SSD 256GB PCYES M.2 NVMe SSDNVMEG3PY256GB é uma solução de alta performance para desktops e notebooks compatíveis com slot M.2 2280. Equipado com interface PCIe 3.0x4 e tecnologia NVMe, oferece leitura sequencial de até 1700MB/s e gravação de até 1200MB/s, garantindo inicialização rápida do sistem…",
    "features": [
      "Leitura de até 1700MB/s para máxima velocidade",
      "Gravação de até 1200MB/s para transferências rápidas",
      "Interface PCIe 3.0x4 com tecnologia NVMe",
      "Formato M.2 2280 compacto",
      "Ideal para upgrade de desktops e notebooks compatíveis",
      "Mais desempenho que SSD SATA",
      "Baixo consumo e operação silenciosa"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "346204"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-256gb-pcyes-m2-nvme-1700mb-s-ssdnvmeg3py256gb",
    "productUrl": "https://www.pcyes.com.br/ssd-256gb-pcyes-m2-nvme-1700mb-s-ssdnvmeg3py256gb",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 335,89",
    "oldPriceNum": 335.89
  },
  {
    "id": 287,
    "sku": "192059",
    "name": "SSD PCYES 256GB 2,5\" SATA III 550MB/s SSD25PY256",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.9,
    "reviews": 349,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192059/401A241D79AB4FABE0630300A8C0903C",
    "images": [
      "https://cdn.oderco.com.br/produtos/192059/401A241D79AB4FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/192059/401A241D79AD4FABE0630300A8C0903C",
      "https://cdn.oderco.com.br/produtos/192059/401A241D79AC4FABE0630300A8C0903C"
    ],
    "description": "O SSD 256GB PCYES 2,5\" SATA III SSD25PY256 é ideal para upgrade de desktops e notebooks que utilizam interface SATA. Projetado para substituir HDs tradicionais de forma simples e econômica, oferece leitura sequencial de até 550MB/s e gravação de até 400MB/s, proporcionando inicialização mais rápida…",
    "features": [
      "Leitura de até 550MB/s para inicialização mais rápida",
      "Gravação de até 400MB/s para melhor desempenho diário",
      "Upgrade econômico para substituir HDD",
      "Menor consumo de energia",
      "Operação silenciosa e fria",
      "Maior resistência a impactos",
      "Compatível com desktops e notebooks SATA"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192059"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-256gb-pcyes-sata-iii-550mb-s-ssd25py256",
    "productUrl": "https://www.pcyes.com.br/ssd-256gb-pcyes-sata-iii-550mb-s-ssd25py256",
    "inStock": true
  },
  {
    "id": 288,
    "sku": "202394",
    "name": "SSD PCYES 256GB M.2 NVMe PCIe 3.0x4 2019MB/s SSDNVMEG3PY256",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.4,
    "reviews": 386,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/202394/401A241D79C04FABE0630300A8C0903C",
    "images": [
      "https://cdn.oderco.com.br/produtos/202394/401A241D79C04FABE0630300A8C0903C"
    ],
    "description": "O SSD 256GB PCYES M.2 NVMe SSDNVMEG3PY256 é a escolha ideal para quem busca alta performance e velocidade superior em desktops e notebooks compatíveis com slot M.2. Com interface PCIe 3.0x4 e protocolo NVMe, oferece leitura sequencial de até 2019MB/s e gravação de até 1052MB/s, superando amplamente …",
    "features": [
      "Leitura de até 2019MB/s para máxima velocidade",
      "Gravação de até 1052MB/s para transferências rápidas",
      "Interface PCIe 3.0x4 com tecnologia NVMe",
      "Formato M.2 2280 compacto e moderno",
      "Upgrade ideal para desktops e notebooks compatíveis",
      "Baixo consumo de energia e operação silenciosa",
      "Mais desempenho que SSDs SATA tradicionais"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "202394"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-256gb-pcyes-m2-nvme-pcie-3-0x4-ssdnvmeg3py256",
    "productUrl": "https://www.pcyes.com.br/ssd-256gb-pcyes-m2-nvme-pcie-3-0x4-ssdnvmeg3py256",
    "inStock": true,
    "badge": "NVME"
  },
  {
    "id": 289,
    "sku": "32291",
    "name": "Memória PCYES 8GB DDR3 1600MHz UDIMM CL11 PM081600D3",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 423,
    "category": "Hardware",
    "subcategory": "Memória",
    "tags": [
      "Hardware",
      "Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32291/402EA1867FD36E2DE0630300A8C0D98B",
    "images": [
      "https://cdn.oderco.com.br/produtos/32291/402EA1867FD36E2DE0630300A8C0D98B"
    ],
    "description": "A Memória 8GB PCYES DDR3 1600MHz UDIMM PM081600D3 é a escolha ideal para quem deseja mais desempenho e estabilidade no computador. Indicada para desktops compatíveis com DDR3, oferece frequência de 1600MHz e latência CL11, garantindo melhor resposta em tarefas do dia a dia, aplicações profissionais …",
    "features": [
      "8GB de capacidade para melhor multitarefa",
      "Frequência de 1600MHz para mais desempenho",
      "Latência CL11 para resposta estável",
      "Padrão UDIMM 240 pinos",
      "Baixo consumo com 1.5V",
      "Ideal para upgrade de desktops DDR3",
      "Garantia de 1 ano"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32291"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Memória"
      }
    ],
    "seoSlug": "memoria-8gb-pcyes-ddr3-1600mhz-pm081600d3",
    "productUrl": "https://www.pcyes.com.br/memoria-8gb-pcyes-ddr3-1600mhz-pm081600d3",
    "inStock": true
  },
  {
    "id": 290,
    "sku": "346015",
    "name": "SSD PCYES 128GB 2,5\" SATA III 550MB/s Leitura SSD25PY128GB",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.6,
    "reviews": 460,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/346015/4520E92D66C7C021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/346015/4520E92D66C7C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/346015/4520E92D66C9C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/346015/4520E92D66C8C021E0630300A8C02B6F"
    ],
    "description": "O SSD 128GB PCYES 2,5\" SATA III SSD25PY128GB é a escolha ideal para atualizar seu desktop ou notebook com mais velocidade e eficiência.\n\nProjetado para substituir HDs tradicionais de forma simples e econômica, oferece leitura sequencial de até 550MB/s e gravação de até 400MB/s, garantindo inicial…",
    "features": [
      "Leitura de até 550MB/s para inicialização mais rápida.",
      "Gravação de até 400MB/s para melhor desempenho diário.",
      "Upgrade econômico e eficiente para substituir HDD.",
      "Menor consumo de energia e operação silenciosa.",
      "Maior durabilidade por não possuir partes móveis.",
      "Compatível com desktops e notebooks SATA."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "346015"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-128gb-pcyes-sata-iii-ssd25py128gb",
    "productUrl": "https://www.pcyes.com.br/ssd-128gb-pcyes-sata-iii-ssd25py128gb",
    "inStock": true,
    "oldPrice": "R$ 353,88",
    "oldPriceNum": 353.88
  },
  {
    "id": 291,
    "sku": "346017",
    "name": "SSD PCYES 256GB Py256 2,5\" SATA III 550MB/s Leitura SSD25PY256GB",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.7,
    "reviews": 67,
    "category": "SSD e HD",
    "subcategory": "SSD",
    "tags": [
      "SSD e HD",
      "SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/346017/4520E92D66CCC021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/346017/4520E92D66CCC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/346017/4520E92D66CEC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/346017/4520E92D66CDC021E0630300A8C02B6F"
    ],
    "description": "O SSD 256GB Py256 PCYES 2,5\" SATA III SSD25PY256GB é a solução ideal para atualizar seu desktop ou notebook com mais velocidade e desempenho.\n\nProjetado para substituição fácil de HDD, oferece leitura sequencial de até 550MB/s e gravação de até 400MB/s, proporcionando inicialização mais rápida, a…",
    "features": [
      "Leitura de até 550MB/s para inicialização ultrarrápida.",
      "Gravação de até 400MB/s para melhor desempenho geral.",
      "Upgrade econômico e eficiente para substituir HDD.",
      "Menor consumo de energia e operação silenciosa.",
      "Maior durabilidade por não possuir partes móveis.",
      "Compatível com desktops e notebooks SATA."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "346017"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "SSD"
      }
    ],
    "seoSlug": "ssd-256gb-py256-pcyes-sata-iii-ssd25py256gb",
    "productUrl": "https://www.pcyes.com.br/ssd-256gb-py256-pcyes-sata-iii-ssd25py256gb",
    "inStock": true
  },
  {
    "id": 292,
    "sku": "285011",
    "name": "Cartão Micro SD 32GB PCYES C10 U3 V30 80MB/s SDA 6.0 PY32GBSDHC",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.8,
    "reviews": 104,
    "category": "SSD e HD",
    "subcategory": "Cartão de Memória",
    "tags": [
      "SSD e HD",
      "Cartão de Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/285011/4520E92D66B9C021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/285011/4520E92D66B9C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/285011/4520E92D66B8C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/285011/4520E92D66BBC021E0630300A8C02B6F"
    ],
    "description": "O Cartão Micro SD 32GB PCYES C10 U3 V30 PY32GBSDHC foi desenvolvido para oferecer velocidade e confiabilidade no armazenamento de dados.\n\nNo formato MicroSDHC e com interface SDA 6.0, entrega leitura sequencial de até 80MB/s e gravação de até 30MB/s, proporcionando transferências rápidas e gravaçõ…",
    "features": [
      "Capacidade de 32GB para fotos, vídeos e arquivos essenciais.",
      "Classe C10, U3 e V30 para gravações em alta resolução.",
      "Leitura de até 80MB/s para transferências rápidas.",
      "Gravação de até 30MB/s com desempenho estável.",
      "Interface SDA 6.0 para ampla compatibilidade.",
      "Função Health Monitor para monitoramento da integridade.",
      "Alta durabilidade com mínimo de 500 ciclos de gravação."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "285011"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cartão de Memória"
      }
    ],
    "seoSlug": "cartao-micro-sd-32gb-pcyes-c10-u3-v30-py32gbsdhc",
    "productUrl": "https://www.pcyes.com.br/cartao-micro-sd-32gb-pcyes-c10-u3-v30-py32gbsdhc",
    "inStock": true
  },
  {
    "id": 293,
    "sku": "285014",
    "name": "Cartão Micro SD PCYES 64GB C10 U3 V30 80MB/s SDA 6.0 PY64GBSDXC",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.9,
    "reviews": 141,
    "category": "SSD e HD",
    "subcategory": "Cartão Micro SD",
    "tags": [
      "SSD e HD",
      "Cartão Micro SD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/285014/4520E92D66BEC021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/285014/4520E92D66BEC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/285014/4520E92D66BDC021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/285014/4520E92D66C0C021E0630300A8C02B6F"
    ],
    "description": "O Cartão Micro SD 64GB PCYES C10 U3 V30 PY64GBSDXC foi desenvolvido para oferecer velocidade, estabilidade e confiabilidade no armazenamento de dados.\n\nCom padrão MicroSDXC e interface SDA 6.0, entrega leitura sequencial de até 80MB/s e gravação de até 30MB/s, garantindo transferências rápidas e g…",
    "features": [
      "Capacidade de 64GB para fotos, vídeos e documentos.",
      "Classe C10, U3 e V30 para gravaações em alta resolução.",
      "Leitura de até 80MB/s para transferências rápidas.",
      "Gravação de até 30MB/s com desempenho estável.",
      "Interface SDA 6.0 para ampla compatibilidade.",
      "Função Health Monitor para monitoramento da integridade.",
      "Alta durabilidade com mínimo de 500 ciclos de gravaação."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "285014"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cartão Micro SD"
      }
    ],
    "seoSlug": "cartao-micro-sd-64gb-pcyes-c10-u3-v30-py64gbsdxc",
    "productUrl": "https://www.pcyes.com.br/cartao-micro-sd-64gb-pcyes-c10-u3-v30-py64gbsdxc",
    "inStock": true
  },
  {
    "id": 294,
    "sku": "287180",
    "name": "Cartão Micro SD 128GB PCYES C10 U3 V30 80MB/s SDA 6.0 PY128GBSDXC",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.4,
    "reviews": 178,
    "category": "SSD e HD",
    "subcategory": "Cartão de Memória",
    "tags": [
      "SSD e HD",
      "Cartão de Memória"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287180/4520E92D66C3C021E0630300A8C02B6F",
    "images": [
      "https://cdn.oderco.com.br/produtos/287180/4520E92D66C3C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/287180/4520E92D66C2C021E0630300A8C02B6F",
      "https://cdn.oderco.com.br/produtos/287180/4520E92D66C5C021E0630300A8C02B6F"
    ],
    "description": "O Cartão Micro SD 128GB PCYES C10 U3 V30 PY128GBSDXC é ideal para quem busca alta velocidade, confiabilidade e desempenho consistente em gravações e transferências de dados.\n\nCompatível com o padrão MicroSDXC e interface SDA 6.0, oferece leitura sequencial de até 80MB/s e gravação de até 30MB/s, g…",
    "features": [
      "Capacidade de 128GB para armazenar fotos, vídeos e arquivos.",
      "Classe C10, U3 e V30 para gravações em alta resolução.",
      "Leitura de até 80MB/s para transferências rápidas.",
      "Gravação de até 30MB/s com desempenho estável.",
      "Interface SDA 6.0 para maior compatibilidade.",
      "Função Health Monitor para monitoramento da integridade.",
      "Alta durabilidade com mínimo de 500 ciclos de gravação."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287180"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cartão de Memória"
      }
    ],
    "seoSlug": "cartao-micro-sd-128gb-pcyes-c10-u3-v30-py128gbsdxc",
    "productUrl": "https://www.pcyes.com.br/cartao-micro-sd-128gb-pcyes-c10-u3-v30-py128gbsdxc",
    "inStock": true
  },
  {
    "id": 295,
    "sku": "207002",
    "name": "Mouse Pad PCYES Gamer Obsidian G3D 500x400 Vidro PEMPG3D",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.5,
    "reviews": 215,
    "category": "Periféricos",
    "subcategory": "Mouse Pad",
    "tags": [
      "Gaming",
      "Periféricos",
      "Mouse Pad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/207002/0829AC2B7EE107F2E0630300A8C0ACC5",
    "images": [
      "https://cdn.oderco.com.br/produtos/207002/0829AC2B7EE107F2E0630300A8C0ACC5",
      "https://cdn.oderco.com.br/produtos/207002/1A89C644F4D4D041E0630300A8C0BD5D",
      "https://cdn.oderco.com.br/produtos/207002/0829AC2B7EE207F2E0630300A8C0ACC5"
    ],
    "description": "O Mouse Pad Gamer Obsidian G3D PCYES 500×400 mm foi criado para gamers que buscam desempenho, precisão e espaço ideal em qualquer setup.\n\nSua superfície em tecido com infusão de vidro proporciona deslize extremamente suave e rápido, garantindo movimentos precisos e controle total em partidas compe…",
    "features": [
      "Superfície com infusão de vidro para máxima velocidade e precisão.",
      "Área de 500 × 400 mm: espaço suficiente sem ocupar toda a mesa.",
      "Base emborrachada antiderrapante para firmeza total.",
      "Bordas costuradas que aumentam a durabilidade do produto.",
      "Espessura de 3 mm para conforto prolongado.",
      "Modelo Obsidian G3D PCYES Galaxy, resistente e tecnológico."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "207002"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse Pad"
      }
    ],
    "seoSlug": "mouse-pad-gamer-obsidian-g3d-pcyes-500x400-vidro-pempg3d",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-gamer-obsidian-g3d-pcyes-500x400-vidro-pempg3d",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 296,
    "sku": "37598",
    "name": "Mouse Pad Gamer PCYES Dragon Medium 500x400 PMD50X40",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.6,
    "reviews": 252,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Gaming",
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/37598/CD4A221D0AE2B60EE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/37598/CD4A221D0AE2B60EE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37598/3D4B58D8F1787365E0630300A8C0D0DC",
      "https://cdn.oderco.com.br/produtos/37598/CD4A221D0AE4B60EE055DEF401E782F4"
    ],
    "description": "Mouse Pad Dragon Medium 500x400 com superfície speed e base antiderrapante. Descubra os produtos PCYES e potencialize seu setup gamer.",
    "features": [
      "Superfície speed em tecido poliéster para movimentos ágeis e precisos._x000d_",
      "_x000d_",
      "Base emborrachada antiderrapante para estabilidade durante o uso._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_",
      "Tamanho 500 × 400 mm, ideal para setups médios._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37598"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-gamer-dragon-medium-pcyes-500x400-pmd50x40",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-gamer-dragon-medium-pcyes-500x400-pmd50x40",
    "inStock": true
  },
  {
    "id": 297,
    "sku": "268132",
    "name": "Mouse Pad Gamer PCYES Maze Extended Black Vulcan PMM90X42BV",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.7,
    "reviews": 289,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Gaming",
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268132/3FA5BA5A489CB008E0630300A8C0D3E2",
    "images": [
      "https://cdn.oderco.com.br/produtos/268132/3FA5BA5A489CB008E0630300A8C0D3E2",
      "https://cdn.oderco.com.br/produtos/268132/3FA5BA5A489DB008E0630300A8C0D3E2",
      "https://cdn.oderco.com.br/produtos/268132/3FA5BA5A489EB008E0630300A8C0D3E2"
    ],
    "description": "O Mouse Pad Gamer Maze Extended PCYES Black Vulcan PMM90X42BV foi desenvolvido para jogadores que buscam máximo desempenho, precisão e estilo no setup._x000d_\n_x000d_\nCom superfície speed em tecido poliéster e bordas costuradas, proporciona movimentos rápidos e precisos do mouse, garantindo contro…",
    "features": [
      "Superfície speed em tecido poliéster para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base emborrachada antiderrapante para máxima estabilidade._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_",
      "Tamanho Extended 900 × 420 mm, ideal para teclado e mouse._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268132"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-gamer-maze-extended-pcyes-black-vulcan-pmm90x42bv",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-gamer-maze-extended-pcyes-black-vulcan-pmm90x42bv",
    "inStock": true,
    "oldPrice": "R$ 167,89",
    "oldPriceNum": 167.89
  },
  {
    "id": 298,
    "sku": "268167",
    "name": "Apoio de Pulso PCYES Ergonômico para Teclado Signature Red Magma WRSRM",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.8,
    "reviews": 326,
    "category": "Periféricos",
    "subcategory": "Apoio de Pulso",
    "tags": [
      "Escritório",
      "Periféricos",
      "Apoio de Pulso"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268167/3F7CEAA7AB16EA0CE0630300A8C02CC1",
    "images": [
      "https://cdn.oderco.com.br/produtos/268167/3F7CEAA7AB16EA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/268167/3F7CEAA7AB15EA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/268167/3F7CEAA7AB18EA0CE0630300A8C02CC1"
    ],
    "description": "O Apoio de Pulso Ergonômico para Teclado Signature PCYES Red Magma WRSRM foi criado para quem busca conforto premium, ergonomia e estilo diferenciado no setup._x000d_\n_x000d_\nCom 40cm de comprimento e 9cm de largura, é compatível com teclados full size e compactos. Sua altura de 30mm mantém os pul…",
    "features": [
      "Design ergonômico que reduz a fadiga dos pulsos._x000d_",
      "_x000d_",
      "Interior em silicone para apoio firme e confortável._x000d_",
      "_x000d_",
      "Acabamento em tecido resistente e toque macio._x000d_",
      "_x000d_",
      "Base de borracha antiderrapante para maior estabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268167"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Apoio de Pulso"
      }
    ],
    "seoSlug": "apoio-de-pulso-signature-pcyes-red-magma-wrsrm",
    "productUrl": "https://www.pcyes.com.br/apoio-de-pulso-signature-pcyes-red-magma-wrsrm",
    "inStock": true
  },
  {
    "id": 299,
    "sku": "268166",
    "name": "Apoio de Pulso PCYES Ergonômico para Teclado Signature White Ghost WRSWG",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.9,
    "reviews": 363,
    "category": "Periféricos",
    "subcategory": "Apoio de Pulso",
    "tags": [
      "Escritório",
      "Periféricos",
      "Apoio de Pulso"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268166/3F7CEAA7AB11EA0CE0630300A8C02CC1",
    "images": [
      "https://cdn.oderco.com.br/produtos/268166/3F7CEAA7AB11EA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/268166/3F7CEAA7AB10EA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/268166/3F7CEAA7AB13EA0CE0630300A8C02CC1"
    ],
    "description": "O Apoio de Pulso Ergonômico para Teclado Signature PCYES White Ghost WRSWG foi desenvolvido para quem busca conforto premium, ergonomia e um visual sofisticado no setup._x000d_\n_x000d_\nCom aproximadamente 40cm de comprimento e 9cm de largura, é compatível com teclados full size e modelos compactos…",
    "features": [
      "Design ergonômico que reduz a fadiga dos pulsos._x000d_",
      "_x000d_",
      "Interior em silicone para apoio firme e confortável._x000d_",
      "_x000d_",
      "Acabamento em tecido com toque suave._x000d_",
      "_x000d_",
      "Base de borracha antiderrapante para maior estabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268166"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Apoio de Pulso"
      }
    ],
    "seoSlug": "apoio-de-pulso-signature-pcyes-white-ghost-wrswg",
    "productUrl": "https://www.pcyes.com.br/apoio-de-pulso-signature-pcyes-white-ghost-wrswg",
    "inStock": true
  },
  {
    "id": 300,
    "sku": "268158",
    "name": "Mouse Pad Obsidian G4D Extended PCYES Purple 900x420mm Tecido com Infusão de Vidro PEMPG4DEX",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.4,
    "reviews": 400,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268158/409114D030FB5FEBE0630300A8C06E27",
    "images": [
      "https://cdn.oderco.com.br/produtos/268158/409114D030FB5FEBE0630300A8C06E27",
      "https://cdn.oderco.com.br/produtos/268158/409114D030FC5FEBE0630300A8C06E27",
      "https://cdn.oderco.com.br/produtos/268158/409114D030FD5FEBE0630300A8C06E27"
    ],
    "description": "O Mouse Pad Obsidian G4D Extended PCYES Purple 900x420mm Tecido com Infusão de Vidro PEMPG4DEX foi desenvolvido para oferecer máximo desempenho, velocidade e controle em qualquer estilo de jogo._x000d_\n_x000d_\nSua superfície em tecido com infusão de vidro proporciona deslizamento extremamente suav…",
    "features": [
      "Superfície com infusão de vidro para máxima velocidade e precisão._x000d_",
      "_x000d_",
      "Formato extended 900x420mm para teclado e mouse._x000d_",
      "_x000d_",
      "Base emborrachada antiderrapante para maior estabilidade._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268158"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-obsidian-g4d-extended-pcyes-purple-900x420",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-obsidian-g4d-extended-pcyes-purple-900x420",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 301,
    "sku": "230652",
    "name": "Mouse Pad Obsidian G2D Extended PCYES Black 900x420mm Tecido com Infusão de Vidro PEMPG2DEX",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.5,
    "reviews": 437,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/230652/3FA519DFE3D0F8BBE0630300A8C0CD12",
    "images": [
      "https://cdn.oderco.com.br/produtos/230652/3FA519DFE3D0F8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/230652/3FA519DFE3D1F8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/230652/3FA519DFE3D2F8BBE0630300A8C0CD12"
    ],
    "description": "O Mouse Pad Obsidian G2D Extended PCYES Black 900x420mm Tecido com Infusão de Vidro PEMPG2DEX foi desenvolvido para entregar máximo desempenho, velocidade e controle em jogos competitivos._x000d_\n_x000d_\nSua superfície em tecido com infusão de vidro proporciona deslizamento extremamente suave e pr…",
    "features": [
      "Superfície com infusão de vidro para máxima velocidade._x000d_",
      "_x000d_",
      "Formato extended 900x420mm para teclado e mouse._x000d_",
      "_x000d_",
      "Base emborrachada antiderrapante para maior estabilidade._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "230652"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-obsidian-g2d-extended-pcyes-900x420-infusao-vidro",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-obsidian-g2d-extended-pcyes-900x420-infusao-vidro",
    "inStock": true
  },
  {
    "id": 302,
    "sku": "37599",
    "name": "Mouse Pad Ancient Dragon Medium PCYES 500x400mm Speed Base Antiderrapante PMA50X40",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.6,
    "reviews": 474,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/37599/CD4A221D0AB5B60EE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/37599/CD4A221D0AB5B60EE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37599/CD4A221D0AB6B60EE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37599/CD4A221D0AB7B60EE055DEF401E782F4"
    ],
    "description": "O Mouse Pad Ancient Dragon Medium PCYES 500x400mm Speed Base Antiderrapante PMA50X40 foi desenvolvido para oferecer precisão, controle e estabilidade no seu setup gamer ou profissional._x000d_\n_x000d_\nCom superfície speed, proporciona deslizamento rápido e movimentos precisos, ideal para jogos com…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Formato 500x400mm com ampla área de uso._x000d_",
      "_x000d_",
      "Base 100% emborrachada e antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37599"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-ancient-dragon-medium-pcyes-500x400mm-pma50x40",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-ancient-dragon-medium-pcyes-500x400mm-pma50x40",
    "inStock": true
  },
  {
    "id": 303,
    "sku": "268133",
    "name": "Mouse Pad Gamer Maze PCYES White Ghost Extended 900x420mm Speed PMM90X42WG",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.7,
    "reviews": 81,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Gaming",
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268133/3FA5BA5A4896B008E0630300A8C0D3E2",
    "images": [
      "https://cdn.oderco.com.br/produtos/268133/3FA5BA5A4896B008E0630300A8C0D3E2",
      "https://cdn.oderco.com.br/produtos/268133/3FA5BA5A4897B008E0630300A8C0D3E2",
      "https://cdn.oderco.com.br/produtos/268133/3FA5BA5A4898B008E0630300A8C0D3E2"
    ],
    "description": "O Mouse Pad Gamer Maze PCYES White Ghost Extended 900x420mm Speed PMM90X42WG foi desenvolvido para oferecer amplo espaço, precisão e um visual exclusivo no seu setup._x000d_\n_x000d_\nCom tamanho extended de 900x420mm, acomoda mouse e teclado com total liberdade de movimentos, proporcionando organiz…",
    "features": [
      "Formato extended 900x420mm para mouse e teclado._x000d_",
      "_x000d_",
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base 100% emborrachada antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268133"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-maze-pcyes-white-ghost-900x420-pmm90x42wg",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-maze-pcyes-white-ghost-900x420-pmm90x42wg",
    "inStock": true
  },
  {
    "id": 304,
    "sku": "268138",
    "name": "Mouse Pad Gamer Signature PCYES White Ghost Extended 900x420mm Speed PMS90X42WG",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.8,
    "reviews": 118,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Gaming",
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268138/3FA47CC1B7165064E0630300A8C09A13",
    "images": [
      "https://cdn.oderco.com.br/produtos/268138/3FA47CC1B7165064E0630300A8C09A13",
      "https://cdn.oderco.com.br/produtos/268138/3FA47CC1B7175064E0630300A8C09A13",
      "https://cdn.oderco.com.br/produtos/268138/3FA47CC1B7185064E0630300A8C09A13"
    ],
    "description": "O Mouse Pad Gamer Signature PCYES White Ghost Extended 900x420mm Speed PMS90X42WG foi desenvolvido para quem busca máximo espaço, precisão e um visual impactante no setup gamer._x000d_\n_x000d_\nCom formato extended de 900x420mm, acomoda mouse e teclado com total liberdade de movimentos, garantindo …",
    "features": [
      "Formato extended 900x420mm para mouse e teclado._x000d_",
      "_x000d_",
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base 100% emborrachada antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268138"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-signature-pcyes-white-ghost-900x420-pms90x42wg",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-signature-pcyes-white-ghost-900x420-pms90x42wg",
    "inStock": true
  },
  {
    "id": 305,
    "sku": "283626",
    "name": "Mouse Pad Dr Kepler Extended PCYES 900x420mm Speed Base Antiderrapante DRK90X42",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.9,
    "reviews": 155,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283626/30B248FA8CF0035CE0630300A8C06389",
    "images": [
      "https://cdn.oderco.com.br/produtos/283626/30B248FA8CF0035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283626/30B248FA8CF1035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283626/30B248FA8CF2035CE0630300A8C06389"
    ],
    "description": "O Mouse Pad Dr Kepler Extended PCYES 900x420mm Speed Base Antiderrapante DRK90X42 foi desenvolvido para oferecer amplo espaço, precisão e estabilidade no seu setup gamer ou profissional._x000d_\n_x000d_\nCom formato extended de 900x420mm, acomoda mouse e teclado com total liberdade de movimentos, ga…",
    "features": [
      "Formato extended 900x420mm para mouse e teclado._x000d_",
      "_x000d_",
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base 100% emborrachada antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283626"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-dr-kepler-extended-pcyes-900x420mm-drk90x42",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-dr-kepler-extended-pcyes-900x420mm-drk90x42",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 306,
    "sku": "207001",
    "name": "Mouse Pad Obsidian G2D PCYES Black 500x400mm Tecido com Infusão de Vidro PEMPG2D",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.4,
    "reviews": 192,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/207001/0829AC2B7EDA07F2E0630300A8C0ACC5",
    "images": [
      "https://cdn.oderco.com.br/produtos/207001/0829AC2B7EDA07F2E0630300A8C0ACC5",
      "https://cdn.oderco.com.br/produtos/207001/1A89C644F4D3D041E0630300A8C0BD5D",
      "https://cdn.oderco.com.br/produtos/207001/0829AC2B7EDB07F2E0630300A8C0ACC5"
    ],
    "description": "O Mouse Pad Obsidian G2D PCYES Black 500x400mm Tecido com Infusão de Vidro PEMPG2D foi desenvolvido para gamers que buscam velocidade, precisão e controle em cada movimento._x000d_\n_x000d_\nSua superfície em tecido com infusão de vidro proporciona deslizamento extremamente suave e rápido, entregand…",
    "features": [
      "Superfície com infusão de vidro para máxima velocidade._x000d_",
      "_x000d_",
      "Área 500x400mm ideal para precisão e controle._x000d_",
      "_x000d_",
      "Base emborrachada antiderrapante para maior estabilidade._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "207001"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-obsidian-g2d-pcyes-500x400-infusao-vidro",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-obsidian-g2d-pcyes-500x400-infusao-vidro",
    "inStock": true
  },
  {
    "id": 307,
    "sku": "268164",
    "name": "Apoio de Pulso PCYES Ergonômico para Teclado Signature Black Vulcan WRSBV",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 229,
    "category": "Periféricos",
    "subcategory": "Apoio de Pulso",
    "tags": [
      "Escritório",
      "Periféricos",
      "Apoio de Pulso"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268164/3F7CEAA7AB0CEA0CE0630300A8C02CC1",
    "images": [
      "https://cdn.oderco.com.br/produtos/268164/3F7CEAA7AB0CEA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/268164/3F7CEAA7AB0DEA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/268164/3F7CEAA7AB0EEA0CE0630300A8C02CC1"
    ],
    "description": "O Apoio de Pulso Ergonômico para Teclado Signature PCYES Black Vulcan WRSBV foi desenvolvido para quem busca conforto premium, ergonomia e visual marcante no setup._x000d_\n_x000d_\nCom aproximadamente 40cm de comprimento e 9cm de largura, é compatível com teclados full size e modelos compactos. Sua…",
    "features": [
      "Design ergonômico que reduz a fadiga dos pulsos._x000d_",
      "_x000d_",
      "Interior em silicone para apoio firme e confortável._x000d_",
      "_x000d_",
      "Acabamento em tecido com toque suave._x000d_",
      "_x000d_",
      "Base de borracha antiderrapante para máxima estabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268164"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Apoio de Pulso"
      }
    ],
    "seoSlug": "apoio-de-pulso-signature-pcyes-black-vulcan-wrsbv",
    "productUrl": "https://www.pcyes.com.br/apoio-de-pulso-signature-pcyes-black-vulcan-wrsbv",
    "inStock": true
  },
  {
    "id": 308,
    "sku": "112398",
    "name": "Apoio de Pulso PCYES Ergonômico para Teclado 450x93mm Silicone Base Antiderrapante PAS01",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 266,
    "category": "Periféricos",
    "subcategory": "Apoio de Pulso",
    "tags": [
      "Escritório",
      "Periféricos",
      "Apoio de Pulso"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/112398/3F7CEAA7AB07EA0CE0630300A8C02CC1",
    "images": [
      "https://cdn.oderco.com.br/produtos/112398/3F7CEAA7AB07EA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/112398/3F7CEAA7AB06EA0CE0630300A8C02CC1",
      "https://cdn.oderco.com.br/produtos/112398/3F7CEAA7AB09EA0CE0630300A8C02CC1"
    ],
    "description": "O Apoio de Pulso Ergonômico para Teclado PCYES 450x93mm PAS01 foi desenvolvido para usuários que buscam conforto, estabilidade e um visual clean no ambiente corporativo ou home office._x000d_\n_x000d_\nCom 45cm de comprimento e 9,3cm de largura, é compatível com teclados full size e compactos. Sua a…",
    "features": [
      "Design ergonômico que reduz a fadiga dos pulsos._x000d_",
      "_x000d_",
      "Compatível com teclados full size e compactos._x000d_",
      "_x000d_",
      "Interior em silicone para apoio firme e confortável._x000d_",
      "_x000d_",
      "Acabamento em tecido com toque macio._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "112398"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Apoio de Pulso"
      }
    ],
    "seoSlug": "apoio-de-pulso-ergonomico-pcyes-450x93mm-pas01",
    "productUrl": "https://www.pcyes.com.br/apoio-de-pulso-ergonomico-pcyes-450x93mm-pas01",
    "inStock": true,
    "oldPrice": "R$ 447,89",
    "oldPriceNum": 447.89
  },
  {
    "id": 309,
    "sku": "37597",
    "name": "Mouse Pad Tiger Medium PCYES 500x400mm Speed Base Antiderrapante PMT50X40",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.7,
    "reviews": 303,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD4035CE0630300A8C06389",
    "images": [
      "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD4035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD5035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD6035CE0630300A8C06389"
    ],
    "description": "O Mouse Pad Tiger Medium PCYES 500x400mm Speed Base Antiderrapante PMT50X40 foi desenvolvido para oferecer precisão, controle e estabilidade no seu setup gamer ou profissional._x000d_\n_x000d_\nCom superfície speed, proporciona deslizamento rápido e movimentos precisos, ideal para jogos competitivos…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Formato 500x400mm com excelente área de uso._x000d_",
      "_x000d_",
      "Base 100% emborrachada e antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37597"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-tiger-medium-pcyes-500x400mm-speed-pmt50x40",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-tiger-medium-pcyes-500x400mm-speed-pmt50x40",
    "inStock": true
  },
  {
    "id": 310,
    "sku": "283621",
    "name": "Mouse Pad Agata Extended PCYES 900x420mm Speed Base Antiderrapante AGT90X42",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.8,
    "reviews": 340,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD4035CE0630300A8C06389",
    "images": [
      "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD4035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD5035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283621/30B248FA8CD6035CE0630300A8C06389"
    ],
    "description": "O Mouse Pad Agata Extended PCYES 900x420mm Speed Base Antiderrapante AGT90X42 foi desenvolvido para oferecer mais espaço, precisão e estabilidade no seu setup gamer ou profissional._x000d_\n_x000d_\nCom formato extended de 900x420mm, acomoda mouse e teclado com total liberdade de movimentos, garanti…",
    "features": [
      "Formato extended 900x420mm para mouse e teclado._x000d_",
      "_x000d_",
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base 100% emborrachada antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283621"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-agata-extended-pcyes-900x420mm-speed-agt90x42",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-agata-extended-pcyes-900x420mm-speed-agt90x42",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 311,
    "sku": "317156",
    "name": "Apoio de Pulso PCYES Ergonômico com Organizador 355x80mm Base Antiderrapante APORG01",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 377,
    "category": "Periféricos",
    "subcategory": "Apoio de Pulso",
    "tags": [
      "Escritório",
      "Periféricos",
      "Apoio de Pulso"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/317156/410B690C0F3B1F17E0630300A8C0FB01",
    "images": [
      "https://cdn.oderco.com.br/produtos/317156/410B690C0F3B1F17E0630300A8C0FB01",
      "https://cdn.oderco.com.br/produtos/317156/410B690C0F3A1F17E0630300A8C0FB01",
      "https://cdn.oderco.com.br/produtos/317156/410B690C0F3C1F17E0630300A8C0FB01"
    ],
    "description": "O Apoio de Pulso Ergonômico PCYES com Organizador 355x80mm APORG01 foi desenvolvido para oferecer mais conforto, ergonomia e organização no seu espaço de trabalho ou setup gamer._x000d_\n_x000d_\nSua superfície em tecido macio proporciona toque agradável e apoio firme para os punhos, ajudando a redu…",
    "features": [
      "Design ergonômico que reduz a fadiga nos pulsos._x000d_",
      "_x000d_",
      "Superfície em tecido macio e confortável._x000d_",
      "_x000d_",
      "Cinco compartimentos organizadores integrados._x000d_",
      "_x000d_",
      "Base em borracha antiderrapante para maior estabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "317156"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Apoio de Pulso"
      }
    ],
    "seoSlug": "apoio-de-pulso-ergonomico-pcyes-com-organizador-aporg01",
    "productUrl": "https://www.pcyes.com.br/apoio-de-pulso-ergonomico-pcyes-com-organizador-aporg01",
    "inStock": true
  },
  {
    "id": 312,
    "sku": "283629",
    "name": "Mouse Pad Apollo Extended PCYES 900x420mm Speed Base Antiderrapante APL90X42",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.4,
    "reviews": 414,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283629/30B248FA8CE2035CE0630300A8C06389",
    "images": [
      "https://cdn.oderco.com.br/produtos/283629/30B248FA8CE2035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283629/30B248FA8CE3035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283629/30B248FA8CE4035CE0630300A8C06389"
    ],
    "description": "O Mouse Pad Apollo Extended PCYES 900x420mm Speed Base Antiderrapante APL90X42 foi desenvolvido para quem busca amplo espaço, precisão e estabilidade no setup gamer._x000d_\n_x000d_\nCom formato extended de 900x420mm, acomoda mouse e teclado com conforto, garantindo organização e liberdade total de …",
    "features": [
      "Formato extended 900x420mm para mouse e teclado._x000d_",
      "_x000d_",
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base 100% emborrachada antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283629"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-apollo-extended-pcyes-900x420mm-speed-apl90x42",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-apollo-extended-pcyes-900x420mm-speed-apl90x42",
    "inStock": true
  },
  {
    "id": 313,
    "sku": "230651",
    "name": "Mouse Pad Obsidian G4D PCYES Purple 500x400mm Tecido com Infusão de Vidro PEMPG4D",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.5,
    "reviews": 451,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/230651/1A89C644F4C4D041E0630300A8C0BD5D",
    "images": [
      "https://cdn.oderco.com.br/produtos/230651/1A89C644F4C4D041E0630300A8C0BD5D",
      "https://cdn.oderco.com.br/produtos/230651/1A89C644F4C5D041E0630300A8C0BD5D",
      "https://cdn.oderco.com.br/produtos/230651/1A89C644F4C6D041E0630300A8C0BD5D"
    ],
    "description": "O Mouse Pad Obsidian G4D PCYES Purple 500x400mm Tecido com Infusão de Vidro PEMPG4D é ideal para gamers que buscam velocidade, precisão e estabilidade em cada movimento._x000d_\n_x000d_\nSua superfície em tecido com infusão de vidro proporciona deslizamento extremamente suave e rápido, garantindo má…",
    "features": [
      "Superfície com infusão de vidro para máxima velocidade._x000d_",
      "_x000d_",
      "Área 500x400mm com excelente equilíbrio de espaço._x000d_",
      "_x000d_",
      "Base emborrachada antiderrapante para maior estabilidade._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "230651"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-obsidian-g4d-pcyes-purple-500x400-infusao-vidro",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-obsidian-g4d-pcyes-purple-500x400-infusao-vidro",
    "inStock": true
  },
  {
    "id": 314,
    "sku": "268161",
    "name": "Mouse Pad Gamer Signature PCYES Red Magma Limited Extended 900x420mm Speed PMS90X42RM",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.6,
    "reviews": 58,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Gaming",
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268161/3FA47CC1B7105064E0630300A8C09A13",
    "images": [
      "https://cdn.oderco.com.br/produtos/268161/3FA47CC1B7105064E0630300A8C09A13",
      "https://cdn.oderco.com.br/produtos/268161/3FA47CC1B7115064E0630300A8C09A13",
      "https://cdn.oderco.com.br/produtos/268161/3FA47CC1B7125064E0630300A8C09A13"
    ],
    "description": "O Mouse Pad Gamer Signature PCYES Red Magma Limited Extended 900x420mm Speed PMS90X42RM foi criado para gamers que buscam precisão, espaço e um visual marcante no setup._x000d_\n_x000d_\nCom tamanho extended de 900x420mm, acomoda mouse e teclado com total liberdade de movimentos, proporcionando orga…",
    "features": [
      "Formato extended 900x420mm para mouse e teclado._x000d_",
      "_x000d_",
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base 100% emborrachada antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268161"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-signature-pcyes-red-magma-900x420-pms90x42rm",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-signature-pcyes-red-magma-900x420-pms90x42rm",
    "inStock": true
  },
  {
    "id": 315,
    "sku": "268137",
    "name": "Mouse Pad Gamer Signature PCYES Black Vulcan Extended 900x420mm Speed PMS90X42BV",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.7,
    "reviews": 95,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Gaming",
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/268137/2B0B416A4A5D530AE0630300A8C0216F",
    "images": [
      "https://cdn.oderco.com.br/produtos/268137/2B0B416A4A5D530AE0630300A8C0216F",
      "https://cdn.oderco.com.br/produtos/268137/2B0B416A4A5E530AE0630300A8C0216F",
      "https://cdn.oderco.com.br/produtos/268137/2B0B416A4A5F530AE0630300A8C0216F"
    ],
    "description": "O Mouse Pad Gamer Signature PCYES Black Vulcan Extended 900x420mm Speed PMS90X42BV foi desenvolvido para gamers que exigem espaço, precisão e estabilidade._x000d_\n_x000d_\nCom formato extended de 900x420mm, oferece ampla área para mouse e teclado, garantindo organização e liberdade total de movimen…",
    "features": [
      "Formato extended 900x420mm para mouse e teclado._x000d_",
      "_x000d_",
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Base 100% emborrachada antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "268137"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-signature-pcyes-black-vulcan-900x420-pms90x42bv",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-signature-pcyes-black-vulcan-900x420-pms90x42bv",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 316,
    "sku": "283616",
    "name": "Mouse Pad Agata PCYES 500x400mm Speed Base Antiderrapante AGT50X40",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.8,
    "reviews": 132,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283616/30B248FA8CDB035CE0630300A8C06389",
    "images": [
      "https://cdn.oderco.com.br/produtos/283616/30B248FA8CDB035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283616/30B248FA8CDC035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283616/30B248FA8CDD035CE0630300A8C06389"
    ],
    "description": "O Mouse Pad Agata PCYES 500x400mm Speed Base Antiderrapante AGT50X40 foi desenvolvido para oferecer precisão, estabilidade e conforto em jogos e tarefas do dia a dia._x000d_\n_x000d_\nCom superfície speed, proporciona movimentos rápidos e precisos, ideal para quem busca desempenho em partidas compet…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Área 500x400mm com ótima liberdade de movimento._x000d_",
      "_x000d_",
      "Base 100% emborrachada e antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283616"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-agata-pcyes-500x400mm-speed-agt50x40",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-agata-pcyes-500x400mm-speed-agt50x40",
    "inStock": true
  },
  {
    "id": 317,
    "sku": "283619",
    "name": "Mouse Pad Dr Kepler PCYES 500x400mm Speed Base Antiderrapante DRK50X40",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.9,
    "reviews": 169,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283619/30B248FA8CF7035CE0630300A8C06389",
    "images": [
      "https://cdn.oderco.com.br/produtos/283619/30B248FA8CF7035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283619/30B248FA8CF8035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283619/30B248FA8CF9035CE0630300A8C06389"
    ],
    "description": "O Mouse Pad Dr Kepler PCYES 500x400mm Speed Base Antiderrapante DRK50X40 foi desenvolvido para garantir precisão, estabilidade e controle em jogos e atividades do dia a dia._x000d_\n_x000d_\nCom superfície speed, oferece deslizamento rápido e movimentos precisos, ideal para quem busca agilidade em p…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Área 500x400mm com excelente espaço para o mouse._x000d_",
      "_x000d_",
      "Base emborrachada antiderrapante para máxima estabilidade._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283619"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-dr-kepler-pcyes-500x400mm-speed-drk50x40",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-dr-kepler-pcyes-500x400mm-speed-drk50x40",
    "inStock": true
  },
  {
    "id": 318,
    "sku": "283620",
    "name": "Mouse Pad Apollo PCYES 500x400mm Speed Base Antiderrapante APL50X40",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.4,
    "reviews": 206,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/283620/30B248FA8CE9035CE0630300A8C06389",
    "images": [
      "https://cdn.oderco.com.br/produtos/283620/30B248FA8CE9035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283620/30B248FA8CEA035CE0630300A8C06389",
      "https://cdn.oderco.com.br/produtos/283620/30B248FA8CEB035CE0630300A8C06389"
    ],
    "description": "O Mouse Pad Apollo PCYES 500x400mm Speed Base Antiderrapante APL50X40 foi desenvolvido para oferecer precisão, controle e estabilidade no seu setup gamer ou profissional._x000d_\n_x000d_\nCom superfície speed, proporciona deslizamento rápido e preciso, ideal para jogos competitivos e tarefas que exi…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos._x000d_",
      "_x000d_",
      "Tamanho 500x400mm com ótima área de movimentação._x000d_",
      "_x000d_",
      "Base 100% emborrachada e antiderrapante._x000d_",
      "_x000d_",
      "Bordas costuradas que aumentam a durabilidade._x000d_",
      "_x000d_"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "283620"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-apollo-pcyes-500x400mm-speed-apl50x40",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-apollo-pcyes-500x400mm-speed-apl50x40",
    "inStock": true
  },
  {
    "id": 319,
    "sku": "37619",
    "name": "Mouse Pad Ancient Dragon Extended PCYES 900x420mm Speed Base Antiderrapante PMA90X42",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.5,
    "reviews": 243,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/37619/CD37602A504468CBE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/37619/CD37602A504468CBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37619/CD37602A504268CBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37619/CD37602A504668CBE055DEF401E782F4"
    ],
    "description": "O Mouse Pad Ancient Dragon Extended PCYES 900x420mm Speed Base Antiderrapante PMA90X42 foi desenvolvido para oferecer precisão, estabilidade e amplo espaço para setups gamers exigentes.\n\nCom superfície speed, garante movimentos rápidos e precisos, ideal para jogos competitivos e atividades que exi…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos.",
      "Formato extended 900x420mm para mouse e teclado.",
      "Base emborrachada antiderrapante para maior estabilidade.",
      "Bordas costuradas que aumentam a durabilidade.",
      "Espessura 3mm para conforto e controle.",
      "Design Ancient Dragon exclusivo e 100% brasileiro.",
      "Ideal para setups gamers e profissionais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37619"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-ancient-dragon-extended-pcyes-900x420mm-speed-pma90x42",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-ancient-dragon-extended-pcyes-900x420mm-speed-pma90x42",
    "inStock": true,
    "oldPrice": "R$ 167,89",
    "oldPriceNum": 167.89
  },
  {
    "id": 320,
    "sku": "37612",
    "name": "Mouse Pad Dragon Extended PCYES 900x420mm Speed Base Antiderrapante PMD90X42",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.6,
    "reviews": 280,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/37612/CD37602A504B68CBE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/37612/CD37602A504B68CBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37612/CD37602A504D68CBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37612/CD37602A504F68CBE055DEF401E782F4"
    ],
    "description": "O Mouse Pad Dragon Extended PCYES 900x420mm Speed Base Antiderrapante PMD90X42 é ideal para quem busca precisão, estabilidade e amplo espaço no setup gamer.\n\nCom superfície speed, oferece deslizamento rápido e controle preciso, garantindo movimentos ágeis em jogos competitivos e produtividade diár…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos.",
      "Formato extended 900x420mm para mouse e teclado.",
      "Base emborrachada antiderrapante para máxima estabilidade.",
      "Bordas costuradas que aumentam a durabilidade.",
      "Espessura 3mm para mais conforto e controle.",
      "Design Dragon exclusivo e 100% brasileiro.",
      "Ideal para setups gamers e profissionais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37612"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-dragon-extended-pcyes-900x420mm-speed-pmd90x42",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-dragon-extended-pcyes-900x420mm-speed-pmd90x42",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 321,
    "sku": "37611",
    "name": "Mouse Pad Tiger Extended PCYES 900x420mm Speed Base Antiderrapante PMT90X42",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.7,
    "reviews": 317,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/37611/CD26825B621BC05FE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/37611/CD26825B621BC05FE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37611/CD26825B621CC05FE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/37611/CD26825B621DC05FE055DEF401E782F4"
    ],
    "description": "O Mouse Pad Tiger Extended PCYES 900x420mm Speed Base Antiderrapante PMT90X42 foi desenvolvido para oferecer precisão, estabilidade e amplo espaço para movimentos rápidos.\n\nCom superfície speed, proporciona deslizamento suave e resposta ágil, ideal para jogos competitivos e produtividade. Seu tama…",
    "features": [
      "Superfície speed para movimentos rápidos e precisos.",
      "Tamanho extended 900x420mm para mouse e teclado.",
      "Base emborrachada antiderrapante para máxima estabilidade.",
      "Bordas costuradas que aumentam a durabilidade.",
      "Espessura 3mm para mais conforto durante o uso.",
      "Design Tiger exclusivo e 100% brasileiro.",
      "Ideal para setups gamers e profissionais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37611"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-tiger-extended-pcyes-900x420mm-speed-pmt90x42",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-tiger-extended-pcyes-900x420mm-speed-pmt90x42",
    "inStock": true
  },
  {
    "id": 322,
    "sku": "250789",
    "name": "Fone de Ouvido Gamer Nebulla PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPN1DD",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.8,
    "reviews": 354,
    "category": "Periféricos",
    "subcategory": "Fone Gamer",
    "tags": [
      "Gaming",
      "Periféricos",
      "Fone Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/250789/2475E45D33FC03ABE0630300A8C0624D",
    "images": [
      "https://cdn.oderco.com.br/produtos/250789/2475E45D33FC03ABE0630300A8C0624D",
      "https://cdn.oderco.com.br/produtos/250789/2475E45D33FE03ABE0630300A8C0624D",
      "https://cdn.oderco.com.br/produtos/250789/2475E45D33FF03ABE0630300A8C0624D"
    ],
    "description": "O Fone de Ouvido Gamer Nebulla PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPN1DD oferece portabilidade, leveza e áudio imersivo para elevar sua experiência em qualquer lugar.\n\nEquipado com driver dinâmico de 10mm, entrega graves potentes, médios definidos e agudos cristalinos, garantindo …",
    "features": [
      "Driver dinâmico 10mm com som potente e detalhado.",
      "Formato intra-auricular leve e confortável.",
      "Cabo destacável 1,6m com microfone integrado.",
      "Conector P3 3,5mm compatível com diversos dispositivos.",
      "Alta sensibilidade para áudio mais claro e preciso.",
      "Ideal para jogos, chamadas e uso diário.",
      "Portabilidade e desempenho para qualquer setup gamer."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "250789"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fone Gamer"
      }
    ],
    "seoSlug": "fone-gamer-nebulla-pcyes-intra-auricular-10mm-p3-35mm-fpn1dd",
    "productUrl": "https://www.pcyes.com.br/fone-gamer-nebulla-pcyes-intra-auricular-10mm-p3-35mm-fpn1dd",
    "inStock": true
  },
  {
    "id": 323,
    "sku": "107540",
    "name": "Headset PCYES Office HB500 Driver 30mm USB com Microfone Omnidirecional PHB500",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.9,
    "reviews": 391,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/107540/DB7325870D2BB0FBE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/107540/DB7325870D2BB0FBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/107540/DB7325870D2CB0FBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/107540/DB7325870D2DB0FBE055DEF401E782F4"
    ],
    "description": "O Headset Office HB500 PCYES Driver 30mm USB com Microfone Omnidirecional PHB500 foi desenvolvido para oferecer praticidade, conforto e comunicação clara no ambiente corporativo.\n\nCom driver de 30mm, proporciona áudio equilibrado e nítido, com resposta de frequência de 20Hz a 20kHz e sensibilidade…",
    "features": [
      "Driver 30mm com áudio claro e equilibrado.",
      "Microfone omnidirecional com captação precisa de voz.",
      "Conexão USB prática e estável.",
      "Cabo de 2 metros para maior mobilidade.",
      "Leve e confortável para uso prolongado.",
      "Ideal para home office, reuniões e atendimento.",
      "Compatível com PCs e notebooks via USB."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "107540"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-office-hb500-pcyes-30mm-usb-phb500",
    "productUrl": "https://www.pcyes.com.br/headset-office-hb500-pcyes-30mm-usb-phb500",
    "inStock": true
  },
  {
    "id": 324,
    "sku": "107533",
    "name": "Headset PCYES Office HB300 Driver 30mm P2 P3 3,5mm com Microfone Omnidirecional PHB300",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.4,
    "reviews": 428,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset",
      "Escritório"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/107533/DB7325870D23B0FBE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/107533/DB7325870D23B0FBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/107533/DB7325870D26B0FBE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/107533/DB7325870D25B0FBE055DEF401E782F4"
    ],
    "description": "O Headset Office HB300 PCYES Driver 30mm P2 P3 3,5mm com Microfone Omnidirecional PHB300 é ideal para trabalho, reuniões online e estudos, oferecendo conforto, leveza e comunicação clara.\n\nEquipado com driver de 30mm, proporciona áudio equilibrado com resposta de frequência de 20Hz a 20kHz e sensi…",
    "features": [
      "Driver 30mm com áudio claro e equilibrado.",
      "Microfone omnidirecional ideal para reuniões e chamadas.",
      "Conexão P2/P3 3,5mm com adaptador incluso.",
      "Leve e confortável para uso prolongado.",
      "Cabo 1,8m para maior mobilidade.",
      "Compatível com notebooks, PCs e outros dispositivos.",
      "Ideal para escritório, home office e estudos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "107533"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-office-hb300-pcyes-30mm-p2-p3-35mm-phb300",
    "productUrl": "https://www.pcyes.com.br/headset-office-hb300-pcyes-30mm-p2-p3-35mm-phb300",
    "inStock": true
  },
  {
    "id": 325,
    "sku": "260946",
    "name": "Fone de Ouvido Gamer Opala PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPO1DD",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.5,
    "reviews": 465,
    "category": "Periféricos",
    "subcategory": "Fone Gamer",
    "tags": [
      "Gaming",
      "Periféricos",
      "Fone Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/260946/2475E45D340203ABE0630300A8C0624D",
    "images": [
      "https://cdn.oderco.com.br/produtos/260946/2475E45D340203ABE0630300A8C0624D",
      "https://cdn.oderco.com.br/produtos/260946/2475E45D340403ABE0630300A8C0624D",
      "https://cdn.oderco.com.br/produtos/260946/2475E45D340503ABE0630300A8C0624D"
    ],
    "description": "O Fone de Ouvido Gamer Opala PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPO1DD entrega portabilidade, leveza e som imersivo para elevar sua experiência gamer em qualquer lugar.\n\nCom driver dinâmico de 10mm, oferece graves potentes, médios definidos e agudos cristalinos, garantindo percepç…",
    "features": [
      "Driver dinâmico 10mm com som potente e detalhado.",
      "Formato intra-auricular leve e ergonômico.",
      "Cabo destacável 1,6m com microfone integrado.",
      "Conector P3 3,5mm compatível com diversos dispositivos.",
      "Alta sensibilidade para maior clareza sonora.",
      "Ideal para jogos, chamadas e uso diário.",
      "Portabilidade e desempenho para qualquer setup gamer."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "260946"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fone Gamer"
      }
    ],
    "seoSlug": "fone-gamer-opala-pcyes-intra-auricular-10mm-p3-35mm-fpo1dd",
    "productUrl": "https://www.pcyes.com.br/fone-gamer-opala-pcyes-intra-auricular-10mm-p3-35mm-fpo1dd",
    "inStock": true,
    "oldPrice": "R$ 330,28",
    "oldPriceNum": 330.28
  },
  {
    "id": 326,
    "sku": "307778",
    "name": "Fone de Ouvido Gamer Tyet PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPTY1DD",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.6,
    "reviews": 72,
    "category": "Periféricos",
    "subcategory": "Fone Gamer",
    "tags": [
      "Gaming",
      "Periféricos",
      "Fone Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307778/3C59D3C459A357B7E0630300A8C027B7",
    "images": [
      "https://cdn.oderco.com.br/produtos/307778/3C59D3C459A357B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/307778/3C59D3C459A457B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/307778/3F8F6A37FD80B509E0630300A8C000D7"
    ],
    "description": "O Fone de Ouvido Gamer Tyet PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPTY1DD combina leveza, portabilidade e som imersivo para quem busca desempenho em qualquer lugar.\n\nEquipado com driver dinâmico de 10mm, entrega graves potentes, médios definidos e agudos cristalinos, permitindo ouvir…",
    "features": [
      "Driver dinâmico de 10mm com som potente e detalhado.",
      "Formato intra-auricular leve e confortável.",
      "Cabo destacável 1,6m com microfone integrado.",
      "Conector P3 3,5mm compatível com múltiplos dispositivos.",
      "Alta sensibilidade para áudio mais claro e preciso.",
      "Ideal para jogos, chamadas e uso diário.",
      "Portabilidade e desempenho para qualquer setup."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307778"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fone Gamer"
      }
    ],
    "seoSlug": "fone-gamer-tyet-pcyes-intra-auricular-10mm-p3-35mm-fpty1dd",
    "productUrl": "https://www.pcyes.com.br/fone-gamer-tyet-pcyes-intra-auricular-10mm-p3-35mm-fpty1dd",
    "inStock": true
  },
  {
    "id": 327,
    "sku": "307779",
    "name": "Fone de Ouvido Gamer Kheper PCYES Intra Auricular Duplo Driver 3,5mm Cabo Destacável FPKH2DD",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.7,
    "reviews": 109,
    "category": "Periféricos",
    "subcategory": "Fone Gamer",
    "tags": [
      "Gaming",
      "Periféricos",
      "Fone Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307779/3C59D3C459A057B7E0630300A8C027B7",
    "images": [
      "https://cdn.oderco.com.br/produtos/307779/3C59D3C459A057B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/307779/3C59D3C459A157B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/307779/3F8F6A37FD7BB509E0630300A8C000D7"
    ],
    "description": "O Fone de Ouvido Gamer Kheper PCYES Intra Auricular Duplo Driver 3,5mm Cabo Destacável FPKH2DD foi desenvolvido para quem exige imersão sonora superior em um formato compacto e portátil.\n\nCom dois drivers dinâmicos por lado, entrega áudio extremamente detalhado, com graves profundos, médios encorp…",
    "features": [
      "Duplo driver dinâmico para áudio mais detalhado e imersivo.",
      "Graves profundos e agudos nítidos para jogos competitivos.",
      "Formato intra-auricular leve e confortável.",
      "Cabo destacável 1,6m com microfone integrado.",
      "Conector P3 3,5mm compatível com múltiplos dispositivos.",
      "Alta sensibilidade para maior clareza sonora.",
      "Ideal para jogos, chamadas e uso diário."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307779"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fone Gamer"
      }
    ],
    "seoSlug": "fone-gamer-kheper-pcyes-duplo-driver-intra-auricular-35mm-fpkh2dd",
    "productUrl": "https://www.pcyes.com.br/fone-gamer-kheper-pcyes-duplo-driver-intra-auricular-35mm-fpkh2dd",
    "inStock": true
  },
  {
    "id": 328,
    "sku": "307780",
    "name": "Fone de Ouvido Gamer Myria PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPMY1DD",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.8,
    "reviews": 146,
    "category": "Periféricos",
    "subcategory": "Fone Gamer",
    "tags": [
      "Gaming",
      "Periféricos",
      "Fone Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307780/3C59D3C4599E57B7E0630300A8C027B7",
    "images": [
      "https://cdn.oderco.com.br/produtos/307780/3C59D3C4599E57B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/307780/3F8F6A37FD7DB509E0630300A8C000D7",
      "https://cdn.oderco.com.br/produtos/307780/3F8F6A37FD7EB509E0630300A8C000D7"
    ],
    "description": "O Fone de Ouvido Gamer Myria PCYES Intra Auricular 10mm P3 3,5mm Cabo Destacável FPMY1DD combina portabilidade, leveza e som imersivo para quem busca desempenho em qualquer lugar.\n\nEquipado com driver dinâmico de 10mm, entrega graves potentes, médios equilibrados e agudos cristalinos, proporcionan…",
    "features": [
      "Driver dinâmico de 10mm com som potente e detalhado.",
      "Formato intra-auricular leve e confortável.",
      "Cabo destacável de 1,6m com microfone integrado.",
      "Conector P3 3,5mm compatível com múltiplos dispositivos.",
      "Alta sensibilidade para maior clareza sonora.",
      "Ideal para jogos, chamadas e uso diário.",
      "Portabilidade e desempenho em qualquer lugar."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307780"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Fone Gamer"
      }
    ],
    "seoSlug": "fone-gamer-myria-pcyes-intra-auricular-10mm-p3-35mm-fpmy1dd",
    "productUrl": "https://www.pcyes.com.br/fone-gamer-myria-pcyes-intra-auricular-10mm-p3-35mm-fpmy1dd",
    "inStock": true
  },
  {
    "id": 329,
    "sku": "307806",
    "name": "Headset PCYES Gamer Kamar Black Vulcan USB 50mm Microfone Destacável HGKM50BV",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.9,
    "reviews": 183,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307806/48313F6103512D92E0630300A8C04D73",
    "images": [
      "https://cdn.oderco.com.br/produtos/307806/48313F6103512D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307806/48313F6103522D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307806/48313F6103532D92E0630300A8C04D73"
    ],
    "description": "O Headset Gamer Kamar PCYES Black Vulcan USB 50mm Microfone Destacável HGKM50BV foi desenvolvido para entregar potência sonora, conforto e desempenho nas partidas.\n\nEquipado com drivers de 50mm e sensibilidade de 120dB, oferece áudio imersivo com graves intensos e excelente equilíbrio entre frequê…",
    "features": [
      "Drivers de 50mm com som potente e imersivo.",
      "Alta sensibilidade de 120dB para maior clareza sonora.",
      "Microfone destacável omnidirecional para comunicação precisa.",
      "Conexão USB 2.0 estável e prática.",
      "Cabo resistente de 2 metros para maior liberdade.",
      "Estrutura confortável para longas sessões de uso.",
      "Ideal para jogos online, chamadas e multimídia."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307806"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-gamer-kamar-pcyes-black-vulcan-usb-50mm-hgkm50bv",
    "productUrl": "https://www.pcyes.com.br/headset-gamer-kamar-pcyes-black-vulcan-usb-50mm-hgkm50bv",
    "inStock": true
  },
  {
    "id": 330,
    "sku": "307805",
    "name": "Headset PCYES Gamer Deffy Black Vulcan USB 50mm RGB Microfone Omnidirecional HGDF50BV",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.4,
    "reviews": 220,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset",
      "RGB"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307805/48313F6103552D92E0630300A8C04D73",
    "images": [
      "https://cdn.oderco.com.br/produtos/307805/48313F6103552D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307805/48313F6103562D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307805/48313F6103572D92E0630300A8C04D73"
    ],
    "description": "O Headset Gamer Deffy PCYES Black Vulcan USB 50mm RGB Microfone Omnidirecional HGDF50BV entrega potência sonora, conforto extremo e visual gamer marcante.\n\nEquipado com drivers de 50mm, proporciona graves intensos e áudio equilibrado, com frequência de 20Hz a 20KHz e sensibilidade de 118dB, ideal …",
    "features": [
      "Drivers de 50mm com som potente e graves intensos.",
      "Áudio equilibrado para jogos, músicas e chamadas.",
      "Microfone omnidirecional com captação clara de voz.",
      "Estrutura leve e confortável para longas sessões.",
      "Iluminação RGB fixa para setup gamer moderno.",
      "Conexão USB 2.0 prática e estável.",
      "Cabo de 2 metros para maior liberdade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307805"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-gamer-deffy-pcyes-black-vulcan-usb-50mm-rgb-hgdf50bv",
    "productUrl": "https://www.pcyes.com.br/headset-gamer-deffy-pcyes-black-vulcan-usb-50mm-rgb-hgdf50bv",
    "inStock": true,
    "oldPrice": "R$ 330,28",
    "oldPriceNum": 330.28
  },
  {
    "id": 331,
    "sku": "307794",
    "name": "Headset PCYES Gamer Nowy White Ghost USB Surround 40mm RGB Microfone Destacável HGNW40WG",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.5,
    "reviews": 257,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset",
      "RGB"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307794/48313F61035D2D92E0630300A8C04D73",
    "images": [
      "https://cdn.oderco.com.br/produtos/307794/48313F61035D2D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307794/48313F61035E2D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307794/48313F61035F2D92E0630300A8C04D73"
    ],
    "description": "O Headset Gamer Nowy PCYES White Ghost USB Surround 40mm RGB Microfone Destacável HGNW40WG foi desenvolvido para quem busca imersão sonora, conforto e estilo no setup gamer.\n\nCom conexão USB 2.0 e áudio surround, proporciona maior percepção espacial durante jogos competitivos. Seus drivers de 40mm…",
    "features": [
      "Áudio surround imersivo para jogos competitivos.",
      "Drivers de 40mm com som potente e equilibrado.",
      "Microfone destacável omnidirecional para comunicação clara.",
      "Iluminação RGB fixa para visual gamer moderno.",
      "Conexão USB 2.0 estável e prática.",
      "Cabo resistente de 1,8m para maior liberdade.",
      "Ideal para games, streaming e chamadas online."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307794"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-gamer-nowy-pcyes-white-ghost-usb-surround-40mm-rgb-hgnw40wg",
    "productUrl": "https://www.pcyes.com.br/headset-gamer-nowy-pcyes-white-ghost-usb-surround-40mm-rgb-hgnw40wg",
    "inStock": true
  },
  {
    "id": 332,
    "sku": "307793",
    "name": "Headset PCYES Gamer Nowy Black Vulcan USB Surround 40mm RGB HGNW40BV",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.6,
    "reviews": 294,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset",
      "RGB"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307793/48313F6103592D92E0630300A8C04D73",
    "images": [
      "https://cdn.oderco.com.br/produtos/307793/48313F6103592D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307793/48313F61035A2D92E0630300A8C04D73",
      "https://cdn.oderco.com.br/produtos/307793/48313F61035B2D92E0630300A8C04D73"
    ],
    "description": "O Headset Gamer Nowy PCYES Black Vulcan USB Surround 40mm RGB HGNW40BV entrega imersão sonora, conforto e estilo para elevar sua experiência nos jogos.\n\nCom conexão USB 2.0 e áudio surround, proporciona maior percepção espacial durante as partidas. Seus drivers de 40mm oferecem som potente, com fr…",
    "features": [
      "Áudio surround para maior imersão nos jogos.",
      "Drivers de 40mm com som potente e equilibrado.",
      "Microfone destacável omnidirecional.",
      "Iluminação RGB fixa para visual gamer.",
      "Conexão USB 2.0 prática e estável.",
      "Cabo de 1,8m para maior liberdade.",
      "Ideal para games, chamadas e streaming."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307793"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-gamer-nowy-pcyes-black-vulcan-usb-surround-40mm-rgb-hgnw40bv",
    "productUrl": "https://www.pcyes.com.br/headset-gamer-nowy-pcyes-black-vulcan-usb-surround-40mm-rgb-hgnw40bv",
    "inStock": true
  },
  {
    "id": 333,
    "sku": "199406",
    "name": "Mouse PCYES Gamer Basaran White Ghost 12400DPI RGB 6 Botões PMGBRWG",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.7,
    "reviews": 331,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199406/3F2E42F714FE871CE0630300A8C048F6",
    "images": [
      "https://cdn.oderco.com.br/produtos/199406/3F2E42F714FE871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199406/3F2E42F714FF871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199406/3F2E42F71500871CE0630300A8C048F6"
    ],
    "description": "O Mouse Gamer Basaran PCYES White Ghost 12400DPI RGB 6 Botões PMGBRWG combina desempenho avançado, design ambidestro e visual sofisticado para elevar sua performance nos jogos.\n\nEquipado com sensor Pixart PWM3327DB, oferece até 12400 DPI com seis níveis ajustáveis, garantindo precisão em diferente…",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Sensor Pixart PWM3327DB preciso e confiável.",
      "Switches Kailh Silent Click mais silenciosos.",
      "Design ambidestro para destros e canhotos.",
      "Polling rate até 1000Hz (1ms).",
      "Feet em PTFE para deslizamento suave.",
      "Iluminação RGB com múltiplos efeitos.",
      "6 botões para maior versatilidade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199406"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-basaran-pcyes-white-ghost-12400dpi-rgb-6-botoes-pmgbrwg",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-basaran-pcyes-white-ghost-12400dpi-rgb-6-botoes-pmgbrwg",
    "inStock": true
  },
  {
    "id": 334,
    "sku": "108075",
    "name": "Mouse PCYES USB Comfort 1000DPI Cabo 2 Metros PMOC1U",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.8,
    "reviews": 368,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108075/3F136567C588B5ABE0630300A8C08C03",
    "images": [
      "https://cdn.oderco.com.br/produtos/108075/3F136567C588B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108075/3F136567C589B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108075/3F136567C58AB5ABE0630300A8C08C03"
    ],
    "description": "O Mouse USB Comfort PCYES 1000DPI Cabo 2 Metros PMOC1U foi desenvolvido para quem busca eficiência, conforto e praticidade no uso diário.\n\nCom design clean e moderno, adapta-se perfeitamente a ambientes corporativos e home office. Seu formato ergonômico e estrutura leve proporcionam conforto mesmo…",
    "features": [
      "Sensor 1000 DPI para precisão no uso diário.",
      "Cabo USB de 2 metros para maior liberdade.",
      "Design ergonômico confortável.",
      "Estrutura leve com apenas 112g.",
      "3 botões práticos e funcionais.",
      "Ideal para escritório e home office.",
      "Instalação simples Plug & Play."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108075"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-usb-comfort-pcyes-1000dpi-cabo-2m-pmoc1u",
    "productUrl": "https://www.pcyes.com.br/mouse-usb-comfort-pcyes-1000dpi-cabo-2m-pmoc1u",
    "inStock": true
  },
  {
    "id": 335,
    "sku": "250291",
    "name": "Mouse Pad Desk PCYES Mat Exclusive Caramelo 800x400mm 2mm PMPEXBW",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.9,
    "reviews": 405,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/250291/3FA519DFE3C2F8BBE0630300A8C0CD12",
    "images": [
      "https://cdn.oderco.com.br/produtos/250291/3FA519DFE3C2F8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/250291/3FA519DFE3C5F8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/250291/3FA519DFE3C6F8BBE0630300A8C0CD12"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive PCYES Caramelo 800x400mm 2mm PMPEXBW foi desenvolvido para oferecer organização, conforto e elegância ao ambiente corporativo ou home office.\n\nCom dimensões de 800x400mm, proporciona espaço ideal para teclado e mouse, garantindo liberdade de movimentação nas tarefas …",
    "features": [
      "Tamanho 800x400mm ideal para teclado e mouse.",
      "Superfície em PVC resistente e confortável.",
      "Base em suede antiderrapante.",
      "Espessura de 2mm para uso equilibrado.",
      "Visual moderno e sofisticado.",
      "Protege a superfície da mesa.",
      "Ideal para escritório e home office."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "250291"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pcyes-caramelo-800x400mm-2mm-pmpexbw",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pcyes-caramelo-800x400mm-2mm-pmpexbw",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 336,
    "sku": "250290",
    "name": "Mouse Pad Desk PCYES Mat Exclusive Indigo Blue 800x400mm 2mm PMPEXIB",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.4,
    "reviews": 442,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/250290/3FA519DFE3BCF8BBE0630300A8C0CD12",
    "images": [
      "https://cdn.oderco.com.br/produtos/250290/3FA519DFE3BCF8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/250290/3FA519DFE3BFF8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/250290/3FA519DFE3C0F8BBE0630300A8C0CD12"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive PCYES Indigo Blue 800x400mm 2mm PMPEXIB foi desenvolvido para ambientes corporativos e home office que valorizam organização, conforto e estética moderna.\n\nCom dimensões de 800x400mm, oferece espaço ideal para teclado e mouse, proporcionando liberdade de movimento na…",
    "features": [
      "Tamanho 800x400mm ideal para teclado e mouse.",
      "Superfície em PVC resistente e confortável.",
      "Base em suede antiderrapante.",
      "Espessura de 2mm para uso equilibrado.",
      "Visual moderno e corporativo.",
      "Protege a superfície da mesa.",
      "Ideal para escritório e home office."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "250290"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pcyes-indigo-blue-800x400mm-2mm-pmpexib",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pcyes-indigo-blue-800x400mm-2mm-pmpexib",
    "inStock": true
  },
  {
    "id": 337,
    "sku": "250292",
    "name": "Mouse Pad Desk PCYES Mat Exclusive Bordo 800x400mm 2mm PMPEXDR",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.5,
    "reviews": 479,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/250292/3FA519DFE3C8F8BBE0630300A8C0CD12",
    "images": [
      "https://cdn.oderco.com.br/produtos/250292/3FA519DFE3C8F8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/250292/3FA519DFE3CBF8BBE0630300A8C0CD12",
      "https://cdn.oderco.com.br/produtos/250292/3FA519DFE3CCF8BBE0630300A8C0CD12"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive PCYES Bordo 800x400mm 2mm PMPEXDR foi desenvolvido para ambientes corporativos e home office que valorizam organização, conforto e visual sofisticado.\n\nCom 800x400mm, oferece espaço ideal para teclado e mouse, garantindo liberdade de movimento nas tarefas do dia a di…",
    "features": [
      "Tamanho 800x400mm ideal para teclado e mouse.",
      "Superfície em PVC resistente e confortável.",
      "Base em suede que evita deslizamentos.",
      "Espessura de 2mm para uso equilibrado.",
      "Visual clean e corporativo.",
      "Protege a mesa contra riscos e desgaste.",
      "Ideal para escritório e home office."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "250292"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pcyes-bordo-800x400mm-2mm-pmpexdr",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pcyes-bordo-800x400mm-2mm-pmpexdr",
    "inStock": true
  },
  {
    "id": 338,
    "sku": "112405",
    "name": "Mouse Pad Desk PCYES Mat Exclusive Pro Gray 900x420mm PMPEXPPG",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.6,
    "reviews": 86,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/112405/3FA395B2A01CFD9BE0630300A8C03E15",
    "images": [
      "https://cdn.oderco.com.br/produtos/112405/3FA395B2A01CFD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/112405/3FA395B2A01EFD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/112405/3FA395B2A01FFD9BE0630300A8C03E15"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive Pro PCYES Gray 900x420mm PMPEXPPG é ideal para ambientes corporativos e home office que exigem espaço, conforto e sofisticação.\n\nCom tamanho estendido de 900x420mm, acomoda teclado, mouse e acessórios com ampla área de movimentação. Sua superfície em feltro oferece t…",
    "features": [
      "Formato estendido 900x420mm para setup completo.",
      "Superfície em feltro confortável e resistente.",
      "Base com pingos de borracha antiderrapante.",
      "Espessura de 3mm para maior conforto.",
      "Visual moderno e minimalista.",
      "Protege a superfície da mesa.",
      "Ideal para escritório e home office."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "112405"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pro-pcyes-gray-900x420mm-pmpexppg",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pro-pcyes-gray-900x420mm-pmpexppg",
    "inStock": true
  },
  {
    "id": 339,
    "sku": "199396",
    "name": "Mouse PCYES Gamer Gaius RGB 12400DPI 6 Botões PMGGBV",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.7,
    "reviews": 123,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199396/3F2E42F714EC871CE0630300A8C048F6",
    "images": [
      "https://cdn.oderco.com.br/produtos/199396/3F2E42F714EC871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199396/3F2E42F714ED871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199396/3F2E42F714EE871CE0630300A8C048F6"
    ],
    "description": "O Mouse Gamer Gaius PCYES RGB 12400DPI 6 Botões PMGGBV combina conforto, precisão e durabilidade para elevar seu desempenho nos jogos.\n\nCom design ergonômico para destros e dois botões laterais estrategicamente posicionados, oferece mais controle e agilidade durante as partidas. Equipado com senso…",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Sensor Pixart PWM3327DB preciso e confiável.",
      "Switches Kailh de alta durabilidade.",
      "Polling rate até 1000Hz (1ms).",
      "Design ergonômico para destros.",
      "6 botões para mais versatilidade.",
      "Feet em PTFE para movimentos suaves.",
      "Iluminação RGB com múltiplos efeitos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199396"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-gaius-pcyes-rgb-12400dpi-6-botoes-pmggbv",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-gaius-pcyes-rgb-12400dpi-6-botoes-pmggbv",
    "inStock": true
  },
  {
    "id": 340,
    "sku": "211509",
    "name": "Mouse Pad Desk PCYES Mat Exclusive Pro Dark Gray 900x420mm PMPEXPDG",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.8,
    "reviews": 160,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211509/3FA395B2A017FD9BE0630300A8C03E15",
    "images": [
      "https://cdn.oderco.com.br/produtos/211509/3FA395B2A017FD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/211509/3FA395B2A019FD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/211509/3FA395B2A01AFD9BE0630300A8C03E15"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive Pro PCYES Dark Gray 900x420mm PMPEXPDG foi desenvolvido para quem busca elegância, conforto e espaço extra no ambiente corporativo ou home office.\n\nCom dimensões amplas de 900x420mm, acomoda teclado, mouse e acessórios com total liberdade de movimento. Sua superfície…",
    "features": [
      "Tamanho estendido 900x420mm para mais espaço.",
      "Superfície em feltro premium durável e confortável.",
      "Base com pingos de borracha antiderrapante.",
      "Espessura de 3mm para maior conforto.",
      "Visual moderno e corporativo.",
      "Protege a superfície da mesa.",
      "Ideal para escritório e home office."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211509"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pro-pcyes-dark-gray-900x420mm-pmpexpdg",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pro-pcyes-dark-gray-900x420mm-pmpexpdg",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 341,
    "sku": "260894",
    "name": "Mouse PCYES Gamer Fenner White Ghost Wireless 26000DPI 8K PMGFWG8K",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.9,
    "reviews": 197,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/260894/38DDADD1855B30FBE0630300A8C06D02",
    "images": [
      "https://cdn.oderco.com.br/produtos/260894/38DDADD1855B30FBE0630300A8C06D02",
      "https://cdn.oderco.com.br/produtos/260894/38DDADD1855F30FBE0630300A8C06D02",
      "https://cdn.oderco.com.br/produtos/260894/38DDADD1855D30FBE0630300A8C06D02"
    ],
    "description": "O Mouse Gamer Fenner PCYES White Ghost Wireless 26000DPI 8K PMGFWG8K foi projetado para alta performance competitiva, unindo leveza extrema e tecnologia de ponta.\n\nEquipado com sensor Pixart 3395, alcança até 26.000 DPI, 650 IPS e 50G de aceleração, garantindo rastreamento preciso e movimentos ráp…",
    "features": [
      "Até 26.000 DPI com sensor Pixart 3395.",
      "Polling Rate 8K para resposta ultrarrápida.",
      "Conectividade Tri-Mode (Cabo, Bluetooth e 2.4GHz).",
      "Ultraleve com apenas 58g.",
      "650 IPS e 50G para máxima precisão.",
      "Switches Huano Blue Shell Pink Dot duráveis.",
      "Encoder TTC Gold para rolagem precisa.",
      "Feet em PTFE para deslize suave."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "260894"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-fenner-pcyes-white-ghost-wireless-26000dpi-8k-pmgfwg8k",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-fenner-pcyes-white-ghost-wireless-26000dpi-8k-pmgfwg8k",
    "inStock": true,
    "oldPrice": "R$ 279,89",
    "oldPriceNum": 279.89
  },
  {
    "id": 342,
    "sku": "249484",
    "name": "Mouse PCYES Sem Fio Dash Lite Black 1600DPI Silent Click PMDV2BK",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.4,
    "reviews": 234,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/249484/3F69B831563AC752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/249484/3F69B831563AC752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/249484/3F69B831563BC752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/249484/3F69B831563CC752E0630300A8C059F1"
    ],
    "description": "O Mouse Sem Fio Dash Lite PCYES Black 1600DPI Silent Click PMDV2BK combina precisão, conforto e funcionamento silencioso para o dia a dia.\n\nEquipado com sensor óptico ajustável até 1600 DPI, oferece movimentos rápidos e precisos para tarefas profissionais, estudos e uso doméstico. A tecnologia Sil…",
    "features": [
      "Até 1600 DPI ajustável para maior precisão.",
      "Tecnologia Silent Click para uso silencioso.",
      "Conexão sem fio 2.4GHz estável.",
      "Alcance de até 10 metros.",
      "Design ergonômico confortável.",
      "3 botões intuitivos e funcionais.",
      "Compatível com Windows e Mac.",
      "Certificação Anatel garantindo qualidade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "249484"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-dash-lite-pcyes-black-1600dpi-silent-click-pmdv2bk",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-dash-lite-pcyes-black-1600dpi-silent-click-pmdv2bk",
    "inStock": true
  },
  {
    "id": 343,
    "sku": "112404",
    "name": "Mouse Pad Desk Mat Exclusive PCYES Rosa 800x400mm PMPEXP",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.5,
    "reviews": 271,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/112404/3FA395B2A027FD9BE0630300A8C03E15",
    "images": [
      "https://cdn.oderco.com.br/produtos/112404/3FA395B2A027FD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/112404/3FA395B2A029FD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/112404/3FA395B2A02AFD9BE0630300A8C03E15"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive PCYES Rosa 800x400mm PMPEXP foi desenvolvido para quem busca uma experiência premium no ambiente corporativo sem abrir mão de estilo e funcionalidade.\n\nSeguindo o visual clean da linha corporativa PCYES, ele proporciona um setup moderno, elegante e atemporal. Com 80c…",
    "features": [
      "Amplo espaço para teclado e mouse (800x400mm).",
      "Visual moderno e elegante para setups corporativos.",
      "Superfície em PVC resistente e fácil de limpar.",
      "Base em suede que garante estabilidade.",
      "Protege a mesa contra riscos e desgaste.",
      "Espessura de 3mm para maior conforto."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "112404"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pcyes-rosa-800x400mm-pmpexp",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pcyes-rosa-800x400mm-pmpexp",
    "inStock": true
  },
  {
    "id": 344,
    "sku": "199399",
    "name": "Mouse PCYES Gamer Basaran Black Vulcan RGB 12400DPI Silent Click PMGBRBV",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.6,
    "reviews": 308,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199399/3F2E42F714F8871CE0630300A8C048F6",
    "images": [
      "https://cdn.oderco.com.br/produtos/199399/3F2E42F714F8871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199399/3F2E42F714F9871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199399/3F2E42F714FA871CE0630300A8C048F6"
    ],
    "description": "O Mouse Gamer Basaran PCYES Black Vulcan RGB 12400DPI Silent Click PMGBRBV combina precisão, conforto e desempenho silencioso para jogos intensos e uso diário.\n\nCom design ambidestro, é ideal para destros e canhotos, oferecendo ergonomia e liberdade de movimentos. Equipado com sensor Pixart PWM332…",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Switches Kailh Silent Click mais silenciosos.",
      "Sensor Pixart PWM3327DB de alta precisão.",
      "Polling rate até 1000Hz (1ms).",
      "Iluminação RGB com efeitos alternáveis.",
      "Design ambidestro para destros e canhotos.",
      "Feet em PTFE para movimentos suaves.",
      "Cabo trançado reforçado de 1,8m."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199399"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-basaran-pcyes-black-vulcan-rgb-12400dpi-pmgbrbv",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-basaran-pcyes-black-vulcan-rgb-12400dpi-pmgbrbv",
    "inStock": true
  },
  {
    "id": 345,
    "sku": "253935",
    "name": "Mouse PCYES Gamer Malus White Ghost RGB 12400DPI PMGMWG",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.7,
    "reviews": 345,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/253935/3F69B8315652C752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/253935/3F69B8315652C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253935/3F69B8315653C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253935/3F69B8315654C752E0630300A8C059F1"
    ],
    "description": "O Mouse Gamer Malus PCYES White Ghost RGB 12400DPI PMGMWG entrega precisão, conforto e desempenho para jogadores que exigem controle total nas partidas.\n\nCom design ambidestro, proporciona ergonomia para diferentes estilos de pegada, garantindo conforto mesmo em longas sessões de uso. Equipado com…",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Sensor Pixart PWM3327DB de alta precisão.",
      "Switches Kailh duráveis e responsivos.",
      "Polling rate até 1000Hz (1ms).",
      "Iluminação RGB com múltiplos efeitos.",
      "Design ambidestro confortável.",
      "Feet em PTFE para movimentos suaves.",
      "Cabo trançado reforçado de 1,8m."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "253935"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-malus-pcyes-white-ghost-rgb-12400dpi-pmgmwg",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-malus-pcyes-white-ghost-rgb-12400dpi-pmgmwg",
    "inStock": true,
    "oldPrice": "R$ 294,88",
    "oldPriceNum": 294.88
  },
  {
    "id": 346,
    "sku": "253933",
    "name": "Mouse PCYES Gamer Argus RGB 12400DPI 8 Botões PMGABV",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.8,
    "reviews": 382,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/253933/3F69B8315646C752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/253933/3F69B8315646C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253933/3F69B8315647C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253933/3F69B8315648C752E0630300A8C059F1"
    ],
    "description": "O Mouse Gamer Argus PCYES RGB 12400DPI 8 Botões PMGABV foi desenvolvido para entregar desempenho, precisão e durabilidade em partidas intensas.\n\nSeu design ambidestro garante conforto para diferentes perfis de jogadores, enquanto os botões laterais posicionados para o polegar oferecem mais control…",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "8 botões para mais comandos e versatilidade.",
      "Sensor Pixart PWM3327DB de alta precisão.",
      "Polling rate até 1000Hz (1ms) para resposta rápida.",
      "Switches Kailh duráveis e precisos.",
      "Iluminação RGB com múltiplos efeitos.",
      "Design ambidestro confortável.",
      "Feet em PTFE para movimentos mais suaves."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "253933"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-argus-pcyes-rgb-12400dpi-8-botoes-pmgabv",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-argus-pcyes-rgb-12400dpi-8-botoes-pmgabv",
    "inStock": true
  },
  {
    "id": 347,
    "sku": "199397",
    "name": "Mouse PCYES Gamer Valus RGB 12400DPI 8 Botões PMGVLBV",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.9,
    "reviews": 419,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199397/3F2E42F714F2871CE0630300A8C048F6",
    "images": [
      "https://cdn.oderco.com.br/produtos/199397/3F2E42F714F2871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199397/3F2E42F714F3871CE0630300A8C048F6",
      "https://cdn.oderco.com.br/produtos/199397/3F2E42F714F4871CE0630300A8C048F6"
    ],
    "description": "O Mouse Gamer Valus PCYES RGB 12400DPI 8 Botões PMGVLBV foi desenvolvido para quem busca precisão, velocidade e controle total nas partidas.\n\nSeu design ergonômico para destros proporciona conforto prolongado, enquanto os botões laterais oferecem mais agilidade e versatilidade durante o gameplay. …",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Sensor Pixart PWM3327DB preciso e confiável.",
      "8 botões para maior controle no jogo.",
      "Switches Kailh de alta durabilidade.",
      "Polling rate até 1000Hz (1ms).",
      "220 IPS e 30G para máxima performance.",
      "Design ergonômico para destros.",
      "Iluminação RGB com múltiplos efeitos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199397"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-valus-pcyes-rgb-12400dpi-8-botoes-pmgvlbv",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-valus-pcyes-rgb-12400dpi-8-botoes-pmgvlbv",
    "inStock": true
  },
  {
    "id": 348,
    "sku": "253934",
    "name": "Mouse PCYES Gamer Malus Black Vulcan RGB 12400DPI PMGMBV",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.4,
    "reviews": 456,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/253934/3F69B831564CC752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/253934/3F69B831564CC752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253934/3F69B831564DC752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253934/3F69B831564EC752E0630300A8C059F1"
    ],
    "description": "O Mouse Gamer Malus PCYES Black Vulcan RGB 12400DPI PMGMBV combina precisão, conforto e desempenho para elevar seu nível competitivo.\n\nCom design ambidestro, proporciona ergonomia para diferentes estilos de pegada, oferecendo versatilidade durante longas sessões de jogo. Equipado com sensor Pixart…",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Sensor Pixart PWM3327DB de alta precisão.",
      "Switches Kailh duráveis e responsivos.",
      "Polling rate até 1000Hz (1ms).",
      "Iluminação RGB com efeitos alternáveis.",
      "Design ambidestro confortável.",
      "Feet em PTFE para movimentos suaves.",
      "Cabo trançado reforçado de 1,8m."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "253934"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-malus-pcyes-black-vulcan-rgb-12400dpi-pmgmbv",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-malus-pcyes-black-vulcan-rgb-12400dpi-pmgmbv",
    "inStock": true
  },
  {
    "id": 349,
    "sku": "253936",
    "name": "Mouse PCYES Gamer Hydrus Black Vulcan RGB 12400DPI PMGHBV",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.5,
    "reviews": 63,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/253936/3F69B8315658C752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/253936/3F69B8315658C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253936/3F69B8315659C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253936/3F69B831565AC752E0630300A8C059F1"
    ],
    "description": "O Mouse Gamer Hydrus PCYES Black Vulcan RGB 12400DPI PMGHBV combina conforto ergonômico, precisão e durabilidade para elevar seu desempenho nas partidas.\n\nCom design ergonômico para destros e dois botões laterais dedicados, oferece mais controle e agilidade durante o gameplay. Equipado com sensor …",
    "features": [
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Sensor Pixart PWM3327DB de alta precisão.",
      "Switches Kailh Silent Click duráveis e silenciosos.",
      "Polling rate até 1000Hz (1ms).",
      "Iluminação RGB com efeitos alternáveis.",
      "Design ergonômico para destros.",
      "Feet em PTFE para movimentos suaves.",
      "Cabo trançado reforçado de 1,8m."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "253936"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-hydrus-pcyes-black-vulcan-rgb-12400dpi-pmghbv",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-hydrus-pcyes-black-vulcan-rgb-12400dpi-pmghbv",
    "inStock": true
  },
  {
    "id": 350,
    "sku": "108104",
    "name": "Mouse PCYES Sem Fio Mover Purple 1600DPI Silent Click PMMWSCPP",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.6,
    "reviews": 100,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108104/3F136567C5A0B5ABE0630300A8C08C03",
    "images": [
      "https://cdn.oderco.com.br/produtos/108104/3F136567C5A0B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108104/3F136567C5A2B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108104/3F136567C5A3B5ABE0630300A8C08C03"
    ],
    "description": "O Mouse Sem Fio Mover PCYES Purple 1600DPI Silent Click PMMWSCPP é ideal para quem busca praticidade, conforto e silêncio no dia a dia.\n\nCom conexão wireless 2.4GHz RF e alcance de até 20 metros, oferece liberdade de movimento e organização na mesa. Seu sensor de 1600 DPI garante precisão para tar…",
    "features": [
      "1600 DPI para navegação precisa.",
      "Tecnologia Silent Click mais conforto acústico.",
      "Conexão wireless 2.4GHz com até 20m de alcance.",
      "Design leve e ergonômico com 56g.",
      "3 botões com durabilidade de 5 milhões de cliques.",
      "Compatível com Windows e Mac OS.",
      "Certificação Anatel garantindo conformidade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108104"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-mover-pcyes-purple-1600dpi-silent-click-pmmwscpp",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-mover-pcyes-purple-1600dpi-silent-click-pmmwscpp",
    "inStock": true,
    "oldPrice": "R$ 294,88",
    "oldPriceNum": 294.88
  },
  {
    "id": 351,
    "sku": "260893",
    "name": "Mouse PCYES Gamer Wireless Fenner Montain Gray 26000DPI 8K PMGFBV8K",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.7,
    "reviews": 137,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/260893/38DDADD1855330FBE0630300A8C06D02",
    "images": [
      "https://cdn.oderco.com.br/produtos/260893/38DDADD1855330FBE0630300A8C06D02",
      "https://cdn.oderco.com.br/produtos/260893/38DDADD1855430FBE0630300A8C06D02",
      "https://cdn.oderco.com.br/produtos/260893/38DDADD1855530FBE0630300A8C06D02"
    ],
    "description": "O Mouse Gamer Wireless Fenner PCYES Montain Gray 26000DPI 8K PMGFBV8K entrega tecnologia de ponta, leveza extrema e precisão profissional para jogos competitivos.\n\nEquipado com o sensor Pixart 3395, oferece até 26.000 DPI, 650 IPS e 50G de aceleração, garantindo movimentos rápidos, fluidos e extre…",
    "features": [
      "Sensor Pixart 3395 de alta performance.",
      "Até 26.000 DPI para máxima precisão.",
      "Polling rate 8K no modo 2.4GHz.",
      "650 IPS e 50G de aceleração.",
      "Conectividade Tri-Mode (cabo, Bluetooth e 2.4GHz).",
      "Peso ultraleve de 58g.",
      "Switches Huano Blue Shell Pink Dot.",
      "Encoder TTC Gold para rolagem precisa."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "260893"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-wireless-fenner-pcyes-montain-gray-26000dpi-8k-pmgfbv8k",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-wireless-fenner-pcyes-montain-gray-26000dpi-8k-pmgfbv8k",
    "inStock": true
  },
  {
    "id": 352,
    "sku": "253937",
    "name": "Mouse PCYES Gamer Hydrus White Ghost 12400DPI RGB 6 Botões PMGHWG",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.8,
    "reviews": 174,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/253937/3F69B831565EC752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/253937/3F69B831565EC752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253937/3F69B831565FC752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/253937/3F69B8315660C752E0630300A8C059F1"
    ],
    "description": "O Mouse Gamer Hydrus PCYES White Ghost 12400DPI RGB 6 Botões PMGHWG combina conforto, precisão e alto desempenho para elevar sua gameplay.\n\nCom design ergonômico para destros e botões laterais dedicados, oferece mais controle e versatilidade durante as partidas. Equipado com sensor Pixart PWM3327D…",
    "features": [
      "Sensor Pixart PWM3327DB de alta precisão.",
      "Até 12400 DPI com 6 níveis ajustáveis.",
      "Switches Kailh Silent Click duráveis e silenciosos.",
      "Polling rate até 1000Hz para resposta imediata.",
      "Feet em PTFE para deslizamento suave.",
      "Design ergonômico para destros com 6 botões.",
      "Iluminação RGB com múltiplos efeitos.",
      "Cabo em nylon trançado 1,8m mais resistente."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "253937"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-hydrus-pcyes-white-ghost-12400dpi-rgb-pmghwg",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-hydrus-pcyes-white-ghost-12400dpi-rgb-pmghwg",
    "inStock": true,
    "oldPrice": "R$ 279,89",
    "oldPriceNum": 279.89
  },
  {
    "id": 353,
    "sku": "108103",
    "name": "Mouse PCYES Sem Fio Mover Pink 1600DPI Silent Click PMMWSCPK",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.9,
    "reviews": 211,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108103/3F136567C59AB5ABE0630300A8C08C03",
    "images": [
      "https://cdn.oderco.com.br/produtos/108103/3F136567C59AB5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108103/3F136567C59DB5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108103/3F136567C59CB5ABE0630300A8C08C03"
    ],
    "description": "O Mouse Sem Fio Mover PCYES Pink 1600DPI Silent Click PMMWSCPK combina praticidade, leveza e um visual moderno para o dia a dia.\n\nCom resolução de 1600 DPI, oferece navegação precisa para tarefas profissionais, estudos e uso doméstico. Seus cliques silenciosos garantem discrição em ambientes corpo…",
    "features": [
      "1600 DPI para navegação precisa e fluida.",
      "Silent Click ideal para ambientes silenciosos.",
      "Alcance wireless de até 20 metros.",
      "Estrutura leve com apenas 56g.",
      "Compatível com Windows e Mac.",
      "Durabilidade de 5 milhões de cliques.",
      "Polling rate de 250Hz para resposta estável."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108103"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-mover-pcyes-pink-1600dpi-silent-click-pmmwscpk",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-mover-pcyes-pink-1600dpi-silent-click-pmmwscpk",
    "inStock": true
  },
  {
    "id": 354,
    "sku": "108102",
    "name": "Mouse PCYES Sem Fio Mover White 1600DPI Silent Click PMMWSCW",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.4,
    "reviews": 248,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108102/3F136567C595B5ABE0630300A8C08C03",
    "images": [
      "https://cdn.oderco.com.br/produtos/108102/3F136567C595B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108102/3F136567C597B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108102/3F136567C598B5ABE0630300A8C08C03"
    ],
    "description": "O Mouse Sem Fio Mover PCYES White 1600DPI Silent Click PMMWSCW foi desenvolvido para oferecer praticidade, leveza e conforto no uso diário.\n\nCom resolução de 1600 DPI, proporciona movimentos precisos para atividades profissionais e tarefas do dia a dia. Seus cliques silenciosos garantem discrição …",
    "features": [
      "1600 DPI para navegação precisa.",
      "Silent Click ideal para ambientes silenciosos.",
      "Alcance wireless de até 20 metros.",
      "Estrutura leve com apenas 56g.",
      "Compatível com Windows e Mac.",
      "Durabilidade de 5 milhões de cliques.",
      "Polling rate de 250Hz para resposta estável."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108102"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-mover-pcyes-white-1600dpi-silent-click-pmmwscw",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-mover-pcyes-white-1600dpi-silent-click-pmmwscw",
    "inStock": true
  },
  {
    "id": 355,
    "sku": "112403",
    "name": "Mouse Pad Desk Mat Exclusive PCYES Preto 800x400mm PMPEX",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.5,
    "reviews": 285,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/112403/3FA395B2A021FD9BE0630300A8C03E15",
    "images": [
      "https://cdn.oderco.com.br/produtos/112403/3FA395B2A021FD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/112403/3FA395B2A023FD9BE0630300A8C03E15",
      "https://cdn.oderco.com.br/produtos/112403/3FA395B2A024FD9BE0630300A8C03E15"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive PCYES Preto 800x400mm PMPEX foi desenvolvido para o público corporativo que busca uma experiência premium aliada a um visual clean e sofisticado.\n\nCom dimensões de 800x400mm, oferece espaço ideal para teclado e mouse, proporcionando organização e conforto durante o u…",
    "features": [
      "Tamanho 800x400mm ideal para teclado e mouse.",
      "Superfície em PVC resistente e fácil de limpar.",
      "Base em suede que protege e estabiliza.",
      "Visual clean e moderno para ambiente corporativo.",
      "Espessura de 2mm para acabamento discreto e elegante."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "112403"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pcyes-preto-800x400-pmpex",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pcyes-preto-800x400-pmpex",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 356,
    "sku": "199420",
    "name": "Mouse PCYES Gamer Basaran Stealth White Ghost 10000DPI RGB Wireless PMGBRSTWG",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.6,
    "reviews": 322,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199420/400A4BB249A32EC2E0630300A8C02A2C",
    "images": [
      "https://cdn.oderco.com.br/produtos/199420/400A4BB249A32EC2E0630300A8C02A2C",
      "https://cdn.oderco.com.br/produtos/199420/400A4BB249A42EC2E0630300A8C02A2C",
      "https://cdn.oderco.com.br/produtos/199420/400A4BB249A52EC2E0630300A8C02A2C"
    ],
    "description": "O Mouse Gamer Basaran Stealth PCYES White Ghost 10000DPI RGB Wireless PMGBRSTWG foi desenvolvido para entregar precisão extrema, silêncio e versatilidade nas partidas.\n\nEquipado com sensor Pixart PWM3325 de até 10.000 DPI ajustáveis e switches Kailh Silent Click, oferece cliques suaves, resposta r…",
    "features": [
      "Sensor Pixart PWM3325 com até 10.000 DPI ajustáveis.",
      "Switches Kailh Silent Click silenciosos e duráveis.",
      "Dual Mode: Wireless 2.4GHz ou USB Type-C.",
      "Polling Rate até 1000Hz para resposta imediata.",
      "6 botões programáveis para personalização completa.",
      "Feet em PTFE para deslizamento suave.",
      "Bateria recarregável 600mAh para longas sessões.",
      "RGB customizável para destacar o setup."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199420"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-basaran-stealth-pcyes-white-ghost-10000dpi-rgb-pmgbrstwg",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-basaran-stealth-pcyes-white-ghost-10000dpi-rgb-pmgbrstwg",
    "inStock": true
  },
  {
    "id": 357,
    "sku": "112402",
    "name": "Mouse Pad Desk Mat Exclusive PCYES Branco 800x400mm PMPEXW",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.7,
    "reviews": 359,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/112402/3FA1DF65ABE3A0FCE0630300A8C0B604",
    "images": [
      "https://cdn.oderco.com.br/produtos/112402/3FA1DF65ABE3A0FCE0630300A8C0B604",
      "https://cdn.oderco.com.br/produtos/112402/3FA1DF65ABE5A0FCE0630300A8C0B604",
      "https://cdn.oderco.com.br/produtos/112402/3FA1DF65ABE6A0FCE0630300A8C0B604"
    ],
    "description": "O Mouse Pad Desk Mat Exclusive PCYES Branco 800x400mm PMPEXW foi desenvolvido para o público corporativo que busca uma experiência premium com visual clean e moderno.\n\nCom 800x400mm, oferece amplo espaço para teclado e mouse, garantindo organização e conforto nas atividades diárias. Sua superfície…",
    "features": [
      "Tamanho 800x400mm ideal para teclado e mouse.",
      "Superfície em PVC durável e fácil de limpar.",
      "Base em suede que protege a mesa.",
      "Visual clean e moderno para ambiente corporativo.",
      "Espessura de 3mm para maior conforto."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "112402"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-desk-mat-exclusive-pcyes-branco-800x400-pmpexw",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-desk-mat-exclusive-pcyes-branco-800x400-pmpexw",
    "inStock": true
  },
  {
    "id": 358,
    "sku": "212996",
    "name": "Mouse PCYES USB Soft 1200DPI Silent Click Cabo 2m MSSC01",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.8,
    "reviews": 396,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212996/3F69B831562FC752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/212996/3F69B831562FC752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/212996/3F69B8315630C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/212996/3F69B8315631C752E0630300A8C059F1"
    ],
    "description": "O Mouse USB Soft PCYES 1200DPI Silent Click Cabo 2m MSSC01 foi desenvolvido para oferecer conforto e discrição em ambientes que exigem concentração, como escritórios, bibliotecas e home office.\n\nSeus cliques silenciosos proporcionam uma experiência mais agradável durante o uso, enquanto o design e…",
    "features": [
      "Clique silencioso ideal para ambientes compartilhados.",
      "Sensor 1200 DPI para precisão e fluidez.",
      "Design ergonômico para maior conforto.",
      "Cabo de 2 metros para mais flexibilidade.",
      "Visual clean e profissional."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212996"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-usb-soft-pcyes-1200dpi-silent-click-2m-mssc01",
    "productUrl": "https://www.pcyes.com.br/mouse-usb-soft-pcyes-1200dpi-silent-click-2m-mssc01",
    "inStock": true
  },
  {
    "id": 359,
    "sku": "37623",
    "name": "Mouse Pad Black Extended PCYES 900x420mm Antiderrapante PMC90X42B",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.9,
    "reviews": 433,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/37623/3FA1DF65ABDEA0FCE0630300A8C0B604",
    "images": [
      "https://cdn.oderco.com.br/produtos/37623/3FA1DF65ABDEA0FCE0630300A8C0B604",
      "https://cdn.oderco.com.br/produtos/37623/3FA1DF65ABDFA0FCE0630300A8C0B604",
      "https://cdn.oderco.com.br/produtos/37623/3FA1DF65ABE0A0FCE0630300A8C0B604"
    ],
    "description": "O Mouse Pad Black Extended PCYES 900x420mm Antiderrapante PMC90X42B é ideal para quem busca mais espaço, estabilidade e precisão no setup.\n\nCom dimensões estendidas de 900x420mm, acomoda teclado e mouse na mesma superfície, garantindo organização e melhor fluidez nos movimentos. Seu tecido em poli…",
    "features": [
      "Superfície estendida 900x420mm para teclado e mouse.",
      "Base emborrachada antiderrapante.",
      "Tecido em poliéster para melhor controle e precisão.",
      "Bordas costuradas para maior durabilidade.",
      "Ideal para setups gamers e profissionais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37623"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-black-extended-pcyes-900x420mm-pmc90x42b",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-black-extended-pcyes-900x420mm-pmc90x42b",
    "inStock": true
  },
  {
    "id": 360,
    "sku": "306297",
    "name": "Volante Gamer PCYES W270 Force Feedback 3.2Nm 1080° PC Xbox PS4",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 470,
    "category": "Periféricos",
    "subcategory": "Volante Gamer",
    "tags": [
      "Gaming",
      "Periféricos",
      "Volante Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/306297/4A92640F2C25F83AE0630300A8C074DC",
    "images": [
      "https://cdn.oderco.com.br/produtos/306297/4A92640F2C25F83AE0630300A8C074DC",
      "https://cdn.oderco.com.br/produtos/306297/4A92640F2C26F83AE0630300A8C074DC",
      "https://cdn.oderco.com.br/produtos/306297/4A92640F2C27F83AE0630300A8C074DC"
    ],
    "description": "O Volante Gamer W270 PCYES Force Feedback 3.2Nm 1080° PC Xbox PS4 foi desenvolvido para entregar imersão e desempenho implacável nos principais simuladores de corrida.\n\nEquipado com Force Feedback e motores duplos que alcançam até 3,2Nm de torque, proporciona sensação realista de pista, curvas e i…",
    "features": [
      "Force Feedback com até 3,2Nm de torque realista.",
      "Rotação de até 1080° para maior precisão.",
      "Pedal triplo com embreagem inclusa.",
      "Câmbio H 6 marchas + ré com freio de mão.",
      "18 botões mapeáveis e 2 paddle shifts.",
      "Compatível com PC, Xbox One, Xbox Series S/X e PS4.",
      "Fixação em mesa ou cockpit.",
      "Aplicativo para configuração personalizada."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "306297"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Volante Gamer"
      }
    ],
    "seoSlug": "volante-gamer-w270-pcyes-force-feedback-32nm-1080",
    "productUrl": "https://www.pcyes.com.br/volante-gamer-w270-pcyes-force-feedback-32nm-1080",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 361,
    "sku": "245357",
    "name": "Mouse PCYES Sem Fio Mover Gray 1600DPI Silent Click 20m 2.4GHz PMMWSCGY",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.5,
    "reviews": 77,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/245357/3F69B8315635C752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/245357/3F69B8315635C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/245357/3F69B8315636C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/245357/3F69B8315637C752E0630300A8C059F1"
    ],
    "description": "O Mouse Sem Fio Mover PCYES Gray 1600DPI Silent Click 20m 2.4GHz PMMWSCGY oferece precisão, leveza e funcionamento silencioso para o dia a dia.\n\nCom resolução de 1600 DPI e taxa de pesquisa de 250 Hz, proporciona movimentos rápidos e precisos para trabalho e estudos. A tecnologia Wireless 2.4GHz R…",
    "features": [
      "Resolução 1600 DPI para alta precisão.",
      "Botões Silent Click com baixo ruído.",
      "Wireless 2.4GHz com alcance de até 20m.",
      "Taxa de pesquisa 250 Hz para resposta rápida.",
      "Design leve e compacto (56g).",
      "Compatível com Windows e Mac OS."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "245357"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-mover-pcyes-gray-1600dpi-silent-pmmwscgy",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-mover-pcyes-gray-1600dpi-silent-pmmwscgy",
    "inStock": true
  },
  {
    "id": 362,
    "sku": "249485",
    "name": "Mouse PCYES Sem Fio Dash Lite Gray 1600DPI Silent Click 2.4GHz PMDV2GY",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.6,
    "reviews": 114,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/249485/3F69B8315640C752E0630300A8C059F1",
    "images": [
      "https://cdn.oderco.com.br/produtos/249485/3F69B8315640C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/249485/3F69B8315641C752E0630300A8C059F1",
      "https://cdn.oderco.com.br/produtos/249485/3F69B8315642C752E0630300A8C059F1"
    ],
    "description": "O Mouse Sem Fio Dash Lite PCYES Gray 1600DPI Silent Click 2.4GHz PMDV2GY oferece precisão, conforto e funcionamento silencioso para todas as tarefas.\n\nEquipado com sensor óptico de até 1600 DPI ajustáveis, garante movimentos rápidos e precisos para trabalho, estudos e jogos casuais. A tecnologia W…",
    "features": [
      "Resolução ajustável até 1600 DPI.",
      "Botões Silent Click mais silenciosos.",
      "Conexão Wireless 2.4GHz estável.",
      "Alcance de até 10 metros.",
      "Design ergonômico para uso prolongado.",
      "Leve, prático e ideal para escritório ou home office."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "249485"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-dash-lite-pcyes-gray-1600dpi-pmdv2gy",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-dash-lite-pcyes-gray-1600dpi-pmdv2gy",
    "inStock": true
  },
  {
    "id": 363,
    "sku": "199418",
    "name": "Mouse PCYES Gamer Sem Fio Basaran Stealth Black Vulcan 10000DPI RGB 6 Botões PMGBRSTBV",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.7,
    "reviews": 151,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Gaming",
      "RGB",
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199418/400A4BB249A82EC2E0630300A8C02A2C",
    "images": [
      "https://cdn.oderco.com.br/produtos/199418/400A4BB249A82EC2E0630300A8C02A2C",
      "https://cdn.oderco.com.br/produtos/199418/400A4BB249A92EC2E0630300A8C02A2C",
      "https://cdn.oderco.com.br/produtos/199418/400A4BB249AA2EC2E0630300A8C02A2C"
    ],
    "description": "O Mouse Gamer Sem Fio Basaran Stealth PCYES Black Vulcan 10000DPI RGB 6 Botões PMGBRSTBV foi desenvolvido para oferecer precisão extrema, silêncio e versatilidade nas partidas.\n\nEquipado com sensor Pixart PWM3325 de até 10.000 DPI ajustáveis, garante rastreamento preciso e desempenho consistente. …",
    "features": [
      "Sensor Pixart PWM3325 até 10.000 DPI ajustáveis.",
      "Switches Kailh Silent Click silenciosos e duráveis.",
      "Conectividade Dual Mode: Wireless 2.4GHz ou USB-C.",
      "Polling Rate até 1000Hz para resposta imediata.",
      "6 botões programáveis para personalização completa.",
      "Bateria recarregável 600mAh.",
      "Feet em PTFE para deslizamento suave.",
      "Iluminação RGB customizável."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199418"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-gamer-sem-fio-basaran-stealth-pcyes-10000dpi-rgb-pmgbrstbv",
    "productUrl": "https://www.pcyes.com.br/mouse-gamer-sem-fio-basaran-stealth-pcyes-10000dpi-rgb-pmgbrstbv",
    "inStock": true,
    "oldPrice": "R$ 279,89",
    "oldPriceNum": 279.89
  },
  {
    "id": 364,
    "sku": "108105",
    "name": "Mouse PCYES Sem Fio Mover Green 1600DPI Silent Click 20m PMMWSCG",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.8,
    "reviews": 188,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108105/3F136567C5A5B5ABE0630300A8C08C03",
    "images": [
      "https://cdn.oderco.com.br/produtos/108105/3F136567C5A5B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108105/3F136567C5A4B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108105/3F136567C5A7B5ABE0630300A8C08C03"
    ],
    "description": "O Mouse Sem Fio Mover PCYES Green 1600DPI Silent Click 20m PMMWSCG combina precisão, leveza e funcionamento silencioso para o dia a dia.\n\nCom resolução de 1600 DPI e taxa de pesquisa de 250 Hz, oferece movimentos rápidos e precisos para trabalho e estudos. A conexão Wireless 2.4GHz RF garante alca…",
    "features": [
      "Resolução 1600 DPI para alta precisão.",
      "Botões Silent Click com baixo ruído.",
      "Wireless 2.4GHz com alcance de até 20m.",
      "Taxa de pesquisa 250 Hz para resposta rápida.",
      "Design leve e compacto (56g).",
      "Compatível com Windows e Mac OS."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108105"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-mover-pcyes-green-1600dpi-silent-pmmwscg",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-mover-pcyes-green-1600dpi-silent-pmmwscg",
    "inStock": true
  },
  {
    "id": 365,
    "sku": "37593",
    "name": "Mouse Pad Black Standard PCYES 360x300mm Base Antiderrapante PMC36X30B",
    "price": "R$ 149,90",
    "priceNum": 149.9,
    "rating": 4.9,
    "reviews": 225,
    "category": "Periféricos",
    "subcategory": "Mousepad",
    "tags": [
      "Periféricos",
      "Mousepad"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/37593/3FA1DF65ABD8A0FCE0630300A8C0B604",
    "images": [
      "https://cdn.oderco.com.br/produtos/37593/3FA1DF65ABD8A0FCE0630300A8C0B604",
      "https://cdn.oderco.com.br/produtos/37593/3FA1DF65ABD9A0FCE0630300A8C0B604",
      "https://cdn.oderco.com.br/produtos/37593/3FA1DF65ABDBA0FCE0630300A8C0B604"
    ],
    "description": "O Mouse Pad Black Standard PCYES 360x300mm Base Antiderrapante PMC36X30B oferece controle, estabilidade e durabilidade para o seu setup.\n\nCom superfície em tecido poliéster de alta qualidade, proporciona deslizamento suave e preciso para mouses ópticos e laser. Suas bordas costuradas aumentam a re…",
    "features": [
      "Superfície em tecido para deslizamento suave e preciso.",
      "Base emborrachada antiderrapante para maior estabilidade.",
      "Bordas costuradas que aumentam a durabilidade.",
      "Tamanho 360x300mm ideal para trabalho e games.",
      "Visual preto minimalista que combina com qualquer setup."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "37593"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mousepad"
      }
    ],
    "seoSlug": "mouse-pad-black-standard-pcyes-360x300mm-pmc36x30b",
    "productUrl": "https://www.pcyes.com.br/mouse-pad-black-standard-pcyes-360x300mm-pmc36x30b",
    "inStock": true,
    "oldPrice": "R$ 176,88",
    "oldPriceNum": 176.88
  },
  {
    "id": 366,
    "sku": "257608",
    "name": "Mouse PCYES Sem Fio Soft 1200DPI Silent Click 2.4GHz 10m MSSC12W",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.4,
    "reviews": 262,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/257608/4999E7FE7361F2BEE0630300A8C0A777",
    "images": [
      "https://cdn.oderco.com.br/produtos/257608/4999E7FE7361F2BEE0630300A8C0A777",
      "https://cdn.oderco.com.br/produtos/257608/4999E7FE7362F2BEE0630300A8C0A777",
      "https://cdn.oderco.com.br/produtos/257608/4999E7FE7364F2BEE0630300A8C0A777"
    ],
    "description": "O Mouse Sem Fio Soft PCYES 1200DPI Silent Click 2.4GHz 10m MSSC12W combina mobilidade, precisão e funcionamento silencioso para ambientes que exigem foco e discrição.\n\nEquipado com sensor de 1200 DPI, oferece navegação fluida e controle preciso para tarefas diárias no escritório ou home office. A …",
    "features": [
      "Resolução 1200 DPI para precisão no dia a dia.",
      "Botões Silent Click para uso silencioso.",
      "Conexão Wireless 2.4GHz estável.",
      "Alcance sem fio de até 10 metros.",
      "Design leve e ergonômico.",
      "Ideal para escritório e ambientes compartilhados."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "257608"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-soft-pcyes-1200dpi-silent-click-mssc12w",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-soft-pcyes-1200dpi-silent-click-mssc12w",
    "inStock": true
  },
  {
    "id": 367,
    "sku": "108078",
    "name": "Mouse PCYES Sem Fio Comfort 1200DPI 2.4GHz 10m PMOC12W",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.5,
    "reviews": 299,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108078/3F136567C58CB5ABE0630300A8C08C03",
    "images": [
      "https://cdn.oderco.com.br/produtos/108078/3F136567C58CB5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108078/3F136567C58DB5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108078/3F136567C58FB5ABE0630300A8C08C03"
    ],
    "description": "O Mouse Sem Fio Comfort PCYES 1200DPI 2.4GHz 10m PMOC12W oferece liberdade, conforto e praticidade para o dia a dia.\n\nCom conexão Wireless 2.4GHz estável e alcance de até 10 metros, elimina cabos e proporciona mais organização ao seu setup. Seu sensor de 1200 DPI garante precisão para tarefas de e…",
    "features": [
      "Resolução 1200 DPI para navegação precisa.",
      "Conexão Wireless 2.4GHz estável.",
      "Alcance sem fio de até 10 metros.",
      "Design leve e ergonômico para maior conforto.",
      "Compacto e ideal para escritório ou home office.",
      "Alimentação com 2 pilhas AAA inclusas."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108078"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-comfort-pcyes-1200dpi-24ghz-pmoc12w",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-comfort-pcyes-1200dpi-24ghz-pmoc12w",
    "inStock": true
  },
  {
    "id": 368,
    "sku": "307801",
    "name": "Headset PCYES Gamer Nyra Black Vulcan P2 3,5mm Driver 40mm Microfone Destacável HGNYBV",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.6,
    "reviews": 336,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307801/4D4E188D3D33AC15E0630300A8C0F655",
    "images": [
      "https://cdn.oderco.com.br/produtos/307801/4D4E188D3D33AC15E0630300A8C0F655",
      "https://cdn.oderco.com.br/produtos/307801/4D4E188D3D34AC15E0630300A8C0F655",
      "https://cdn.oderco.com.br/produtos/307801/4D4E188D3D36AC15E0630300A8C0F655"
    ],
    "description": "O Headset Gamer Nyra PCYES Black Vulcan P2 3,5mm Driver 40mm Microfone Destacável HGNYBV foi desenvolvido para quem busca imersão sonora, conforto e comunicação clara em jogos competitivos.\n\nEquipado com drivers de 40mm, entrega áudio potente, com graves marcantes, médios equilibrados e agudos nít…",
    "features": [
      "Drivers 40mm com som potente e imersivo.",
      "Microfone destacável omnidirecional para comunicação clara.",
      "Conexão dupla P2 3,5mm (áudio e microfone separados).",
      "Cabo de 2 metros para maior mobilidade.",
      "Áudio equilibrado com graves intensos e agudos nítidos.",
      "Ideal para jogos competitivos e uso prolongado.",
      "Design Black Vulcan moderno e gamer."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307801"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-gamer-nyra-pcyes-black-vulcan-40mm-p2-hgnybv",
    "productUrl": "https://www.pcyes.com.br/headset-gamer-nyra-pcyes-black-vulcan-40mm-p2-hgnybv",
    "inStock": true
  },
  {
    "id": 369,
    "sku": "307804",
    "name": "Headset PCYES Gamer Nyra White Ghost P2 3,5mm Driver 40mm Microfone Destacável HGNYWG",
    "price": "R$ 279,90",
    "priceNum": 279.9,
    "rating": 4.7,
    "reviews": 373,
    "category": "Periféricos",
    "subcategory": "Headset",
    "tags": [
      "Gaming",
      "Periféricos",
      "Headset"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/307804/4D4E188D3D2EAC15E0630300A8C0F655",
    "images": [
      "https://cdn.oderco.com.br/produtos/307804/4D4E188D3D2EAC15E0630300A8C0F655",
      "https://cdn.oderco.com.br/produtos/307804/4D4E188D3D2FAC15E0630300A8C0F655",
      "https://cdn.oderco.com.br/produtos/307804/4D4E188D3D31AC15E0630300A8C0F655"
    ],
    "description": "O Headset Gamer Nyra PCYES White Ghost P2 3,5mm Driver 40mm Microfone Destacável HGNYWG combina desempenho sonoro, conforto e design marcante para elevar sua experiência gamer.\n\nEquipado com drivers de 40mm, entrega som potente e equilibrado, com graves intensos, médios definidos e agudos nítidos.…",
    "features": [
      "Drivers 40mm com áudio potente e imersivo.",
      "Microfone destacável omnidirecional para comunicação clara.",
      "Conexão dupla P2 3,5mm (áudio + microfone).",
      "Cabo 2 metros para maior liberdade de movimento.",
      "Som equilibrado com excelente definição sonora.",
      "Ideal para jogos competitivos e uso prolongado.",
      "Design White Ghost moderno e diferenciado."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "307804"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Headset"
      }
    ],
    "seoSlug": "headset-gamer-nyra-pcyes-white-ghost-40mm-p2-hgnywg",
    "productUrl": "https://www.pcyes.com.br/headset-gamer-nyra-pcyes-white-ghost-40mm-p2-hgnywg",
    "inStock": true
  },
  {
    "id": 370,
    "sku": "108100",
    "name": "Mouse PCYES Sem Fio Mover Black 1600DPI Silent Click PMMWSCB",
    "price": "R$ 249,90",
    "priceNum": 249.9,
    "rating": 4.8,
    "reviews": 410,
    "category": "Periféricos",
    "subcategory": "Mouse",
    "tags": [
      "Wireless",
      "Periféricos",
      "Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/108100/3F136567C591B5ABE0630300A8C08C03",
    "images": [
      "https://cdn.oderco.com.br/produtos/108100/3F136567C591B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108100/3F136567C592B5ABE0630300A8C08C03",
      "https://cdn.oderco.com.br/produtos/108100/3F136567C593B5ABE0630300A8C08C03"
    ],
    "description": "O Mouse Sem Fio Mover PCYES Black 1600DPI Silent Click PMMWSCB foi desenvolvido para oferecer precisão, conforto e funcionamento silencioso no dia a dia.\n\nCom resolução de 1600 DPI e taxa de pesquisa de 250 Hz, garante movimentos rápidos e precisos para trabalho, estudos e navegação. A tecnologia …",
    "features": [
      "Resolução 1600 DPI para maior precisão.",
      "Botões Silent Click com funcionamento silencioso.",
      "Alcance wireless de até 20 metros.",
      "Design leve e compacto para conforto prolongado.",
      "Taxa de pesquisa 250 Hz para resposta rápida.",
      "Compatível com Windows e Mac OS."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "108100"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Mouse"
      }
    ],
    "seoSlug": "mouse-sem-fio-mover-pcyes-1600dpi-silent-click-pmmwscb",
    "productUrl": "https://www.pcyes.com.br/mouse-sem-fio-mover-pcyes-1600dpi-silent-click-pmmwscb",
    "inStock": true,
    "oldPrice": "R$ 294,88",
    "oldPriceNum": 294.88
  },
  {
    "id": 371,
    "sku": "208581",
    "name": "Teclado Mecânico PCYES 75% Rasec Gasket Mount Gateron Blue RGB ABNT2 TWGBLRGB",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.9,
    "reviews": 447,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/208581/3F92F24D2F94251AE0630300A8C0FCFF",
    "images": [
      "https://cdn.oderco.com.br/produtos/208581/3F92F24D2F94251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/208581/3F92F24D2F95251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/208581/3F92F24D2F96251AE0630300A8C0FCFF"
    ],
    "description": "O Teclado Mecânico 75% Rasec PCYES Gasket Mount Gateron Blue RGB ABNT2 TWGBLRGB é a escolha definitiva para quem busca precisão, conforto acústico e construção premium.\n\nSeu formato 75% com 82 teclas e knob multifuncional oferece equilíbrio perfeito entre espaço e produtividade, mantendo o layout …",
    "features": [
      "Formato 75% com 82 teclas + knob.",
      "Switch Gateron Blue hotswappable.",
      "Estrutura Gasket Mount com amortecimento acústico.",
      "Anti-ghosting 100% para máxima precisão.",
      "Tempo de resposta de 1ms.",
      "Iluminação RGB personalizável.",
      "Keycaps Full Black Doubleshot Injection.",
      "Cabo removível USB-C 1,6m."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "208581"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-75-rasec-pcyes-gasket-gateron-blue-rgb-twgblrgb",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-75-rasec-pcyes-gasket-gateron-blue-rgb-twgblrgb",
    "inStock": true
  },
  {
    "id": 372,
    "sku": "252543",
    "name": "Teclado Mecânico PCYES 75% Kirin White Ghost Blue Switch LED Rainbow PTKRWG75BL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 54,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252543/499FD0078B0F4A29E0630300A8C043A7",
    "images": [
      "https://cdn.oderco.com.br/produtos/252543/499FD0078B0F4A29E0630300A8C043A7",
      "https://cdn.oderco.com.br/produtos/252543/499FD0078B104A29E0630300A8C043A7",
      "https://cdn.oderco.com.br/produtos/252543/499FD0078B124A29E0630300A8C043A7"
    ],
    "description": "O Teclado Mecânico 75% Kirin PCYES White Ghost Blue Switch LED Rainbow PTKRWG75BL é a escolha ideal para quem busca precisão, resposta tátil e um visual moderno para o setup.\n\nCom formato compacto 75% e 83 teclas, oferece melhor aproveitamento de espaço sem abrir mão do layout ABNT2, garantindo ve…",
    "features": [
      "Formato compacto 75% com 83 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Blue com resposta tátil e clique audível.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps Tri-color Doubleshot Injection mais resistentes.",
      "Iluminação LED Rainbow em blocos.",
      "Cabo USB 1,8m para maior praticidade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252543"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-75-kirin-pcyes-white-ghost-blue-switch-ptkrwg75bl",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-75-kirin-pcyes-white-ghost-blue-switch-ptkrwg75bl",
    "inStock": true,
    "badge": "BLUE SWITCH"
  },
  {
    "id": 373,
    "sku": "252546",
    "name": "Teclado Mecânico PCYES 75% Kirin White Ghost Red Switch LED Rainbow PTKRWG75RD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 91,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252546/499FD0078B144A29E0630300A8C043A7",
    "images": [
      "https://cdn.oderco.com.br/produtos/252546/499FD0078B144A29E0630300A8C043A7",
      "https://cdn.oderco.com.br/produtos/252546/499FD0078B154A29E0630300A8C043A7",
      "https://cdn.oderco.com.br/produtos/252546/499FD0078B174A29E0630300A8C043A7"
    ],
    "description": "O Teclado Mecânico 75% Kirin PCYES White Ghost Red Switch LED Rainbow PTKRWG75RD combina agilidade, conforto e um visual moderno para setups exigentes.\n\nCom formato compacto 75% e 83 teclas, oferece melhor aproveitamento de espaço sem abrir mão do layout ABNT2, ideal para produtividade e jogos.\n…",
    "features": [
      "Formato compacto 75% com 83 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Red com acionamento linear e silencioso.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps Tri-color Doubleshot Injection mais resistentes.",
      "Iluminação LED Rainbow em blocos.",
      "Cabo USB 1,8m para maior praticidade."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252546"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-75-kirin-pcyes-white-ghost-red-switch-ptkrwg75rd",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-75-kirin-pcyes-white-ghost-red-switch-ptkrwg75rd",
    "inStock": true,
    "badge": "RED SWITCH"
  },
  {
    "id": 374,
    "sku": "111379",
    "name": "Kit com Teclado e Mouse PCYES Soft Branco PCOSF2W",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 128,
    "category": "Periféricos",
    "subcategory": "Kit Teclado e Mouse",
    "tags": [
      "Periféricos",
      "Kit Teclado e Mouse"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/111379/D8B04017EE7B0CC2E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/111379/D8B04017EE7B0CC2E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/111379/D8B04017EE7C0CC2E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/111379/D8B04017EE7D0CC2E055DEF401E782F4"
    ],
    "description": "O Combo Teclado e Mouse Soft PCYES Branco PCOSF2W combina conforto, funcionalidade e design clean para o dia a dia no escritório ou em casa.\n\nO teclado possui layout ABNT2 com 109 teclas de toque suave e silencioso, garantindo digitação confortável mesmo durante longas horas de uso. Conta ainda co…",
    "features": [
      "Layout ABNT2 padrão brasileiro.",
      "Teclas macias e silenciosas para maior conforto.",
      "12 funções multimídia integradas.",
      "Mouse com resolução de 1000 DPI.",
      "Cabos USB de 2 metros para melhor organização.",
      "Teclas com impressão a laser mais duráveis.",
      "Resistente a respingos d’água.",
      "Ajuste de inclinação e pés antiderrapantes."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "111379"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Teclado e Mouse"
      }
    ],
    "seoSlug": "combo-teclado-mouse-soft-pcyes-branco-pcosf2w",
    "productUrl": "https://www.pcyes.com.br/combo-teclado-mouse-soft-pcyes-branco-pcosf2w",
    "inStock": true,
    "oldPrice": "R$ 447,89",
    "oldPriceNum": 447.89
  },
  {
    "id": 375,
    "sku": "255025",
    "name": "Water Cooler PCYES Vision 360mm White Ghost LCD 2,1\" VS360WG",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.7,
    "reviews": 165,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/255025/3D6C9CB1386DACC6E0630300A8C02D0B",
    "images": [
      "https://cdn.oderco.com.br/produtos/255025/3D6C9CB1386DACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/255025/3D6C9CB1386EACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/255025/3D6C9CB1386FACC6E0630300A8C02D0B"
    ],
    "description": "O Water Cooler Vision 360mm White Ghost PCYES LCD 2,1\" VS360WG oferece desempenho extremo com visual clean e personalização completa via display integrado.\n\nA tela LCD de 2,1\" com resolução 480x480 e 16,7 milhões de cores permite exibir temperatura em tempo real, templates exclusivos, GIFs, imag…",
    "features": [
      "Tela LCD 2,1\" 480x480 totalmente personalizável.",
      "Exibição de temperatura, GIF, imagem ou vídeo MP4.",
      "Radiador 360mm com suporte até 350W de TDP.",
      "Bomba até 2500RPM com fluxo de 116L/h.",
      "3 fans 120mm com até 78CFM e controle PWM.",
      "Compatível com Intel LGA 1851, 1700 e AMD AM5.",
      "Design White Ghost ideal para setups claros e modernos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "255025"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-vision-360mm-white-ghost-pcyes-lcd-21-vs360wg",
    "productUrl": "https://www.pcyes.com.br/water-cooler-vision-360mm-white-ghost-pcyes-lcd-21-vs360wg",
    "inStock": true,
    "oldPrice": "R$ 412,88",
    "oldPriceNum": 412.88
  },
  {
    "id": 376,
    "sku": "337599",
    "name": "Placa de Rede PCYES 10G SFP+ Dual Port PCI-E X4 SFP10G2P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 202,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/337599/4AF6A7C8CCEDA3ACE0630300A8C01190",
    "images": [
      "https://cdn.oderco.com.br/produtos/337599/4AF6A7C8CCEDA3ACE0630300A8C01190",
      "https://cdn.oderco.com.br/produtos/337599/4AF6A7C8CCEEA3ACE0630300A8C01190"
    ],
    "description": "A Placa de Rede 10G Dual Port SFP PCI-E SFP10G2P foi desenvolvida para ambientes corporativos e data centers que exigem alta largura de banda, confiabilidade e baixa latência. Equipada com o chipset Intel de terceira geração 82599ES, entrega desempenho consistente em redes LAN e SAN.\n\nCom duas por…",
    "features": [
      "Duas portas SFP+ 10 GbE para alta disponibilidade e desempenho",
      "Chipset Intel 82599ES com confiabilidade comprovada em data centers",
      "Ideal para virtualização, servidores e redes corporativas avançadas",
      "Suporte a Jumbo Frames e VLAN para melhor eficiência de rede",
      "Redução do uso da CPU com offloading e controle de interrupções",
      "Compatível com múltiplos sistemas operacionais e hipervisores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "337599"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-rede-10g-sfp-dual-port-pcie-x4",
    "productUrl": "https://www.pcyes.com.br/placa-rede-10g-sfp-dual-port-pcie-x4",
    "inStock": true
  },
  {
    "id": 377,
    "sku": "340182",
    "name": "Placa de Rede PCYES 2.5G Dual Port RJ45 Chipset Intel PCI-E X1 LC2500-2PIT",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 239,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/340182/4B18A241B186B5C1E0630300A8C08F50",
    "images": [
      "https://cdn.oderco.com.br/produtos/340182/4B18A241B186B5C1E0630300A8C08F50",
      "https://cdn.oderco.com.br/produtos/340182/4B18A241B187B5C1E0630300A8C08F50"
    ],
    "description": "A Placa de Rede 2.5G Dual Port RJ45 Intel PCI-E LC2500-2PIT é indicada para quem precisa de maior largura de banda e estabilidade em redes corporativas, servidores de entrada e estações de trabalho. Equipada com o chipset Intel I226, entrega desempenho confiável em conexões Ethernet Base-T de múltip…",
    "features": [
      "Duas portas RJ45 2.5GbE para maior largura de banda",
      "Chipset Intel I226 com alta confiabilidade e estabilidade",
      "Compatível com redes 10/100/1000/2500 Mbps",
      "Ideal para servidores, workstations e aplicações industriais",
      "Reduz o uso da CPU com offloading de protocolos",
      "Suporte a Wake-On-LAN e eficiência energética (EEE)"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "340182"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-rede-2-5g-dual-port-rj45-intel-lc2500-2pit",
    "productUrl": "https://www.pcyes.com.br/placa-rede-2-5g-dual-port-rj45-intel-lc2500-2pit",
    "inStock": true
  },
  {
    "id": 378,
    "sku": "286137",
    "name": "Teclado Mecânico PCYES Kuromori Voyager Edition Red Switch KMVY60RD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.4,
    "reviews": 276,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286137/3C59D3C4599757B7E0630300A8C027B7",
    "images": [
      "https://cdn.oderco.com.br/produtos/286137/3C59D3C4599757B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/286137/3C59D3C4599857B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/286137/3C59D3C4599957B7E0630300A8C027B7"
    ],
    "description": "O Teclado Mecânico Kuromori Voyager Edition PCYES Red Switch KMVY60RD é ideal para quem busca conforto, agilidade e design compacto para o setup.\n\nCom formato 60% e 64 teclas, oferece mais espaço na mesa sem abrir mão do layout ABNT2, sendo perfeito para jogos e uso diário.\n\nEquipado com switche…",
    "features": [
      "Formato 60% compacto com 64 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Red com acionamento linear e silencioso.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Taxa de resposta de 1ms.",
      "Iluminação Full Yellow exclusiva.",
      "Keycaps Doubleshot Injection mais duráveis.",
      "Cabo USB removível 1,8m USB-A para Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286137"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-kuromori-voyager-edition-pcyes-red-switch-kmvy60rd",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-kuromori-voyager-edition-pcyes-red-switch-kmvy60rd",
    "inStock": true,
    "badge": "RED SWITCH"
  },
  {
    "id": 379,
    "sku": "286135",
    "name": "Teclado Mecânico PCYES Kuromori Voyager Edition Blue Switch KMVY60BL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.5,
    "reviews": 313,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/286135/3C59D3C4599157B7E0630300A8C027B7",
    "images": [
      "https://cdn.oderco.com.br/produtos/286135/3C59D3C4599157B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/286135/3C59D3C4599257B7E0630300A8C027B7",
      "https://cdn.oderco.com.br/produtos/286135/3C59D3C4599357B7E0630300A8C027B7"
    ],
    "description": "O Teclado Mecânico Kuromori Voyager Edition PCYES Blue Switch KMVY60BL combina desempenho, portabilidade e identidade marcante para seu setup.\n\nCom formato compacto 60% e 64 teclas, oferece mais espaço na mesa sem abrir mão do layout ABNT2, garantindo praticidade tanto para jogos quanto para uso d…",
    "features": [
      "Formato 60% compacto com 64 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Blue com resposta tátil e clique audível.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Taxa de resposta de 1ms.",
      "Iluminação Full Yellow exclusiva.",
      "Keycaps Doubleshot Injection mais duráveis.",
      "Cabo USB removível 1,8m USB-A para Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "286135"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-kuromori-voyager-edition-pcyes-blue-switch-kmvy60bl",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-kuromori-voyager-edition-pcyes-blue-switch-kmvy60bl",
    "inStock": true,
    "badge": "BLUE SWITCH"
  },
  {
    "id": 380,
    "sku": "246230",
    "name": "Teclado Mecânico PCYES Kuromori White Ghost Red Switch LED Rainbow PTKMWG60RD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.6,
    "reviews": 350,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/246230/3FA0FF24E0404B06E0630300A8C0A92F",
    "images": [
      "https://cdn.oderco.com.br/produtos/246230/3FA0FF24E0404B06E0630300A8C0A92F",
      "https://cdn.oderco.com.br/produtos/246230/3FA0FF24E0414B06E0630300A8C0A92F",
      "https://cdn.oderco.com.br/produtos/246230/3FA0FF24E0424B06E0630300A8C0A92F"
    ],
    "description": "O Teclado Mecânico Kuromori White Ghost PCYES Red Switch LED Rainbow PTKMWG60RD entrega agilidade, conforto e um visual clean para setups modernos.\n\nSeu formato compacto 60% com 64 teclas proporciona mais espaço na mesa e maior liberdade nos movimentos, mantendo o layout ABNT2 para uso completo no…",
    "features": [
      "Formato 60% compacto com 64 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Red com acionamento linear e suave.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps tri-color double shot injection.",
      "Iluminação LED Rainbow.",
      "Cabo USB removível 1,8m USB para Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "246230"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-kuromori-white-ghost-pcyes-red-switch-ptkmwg60rd",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-kuromori-white-ghost-pcyes-red-switch-ptkmwg60rd",
    "inStock": true,
    "badge": "RED SWITCH",
    "oldPrice": "R$ 471,88",
    "oldPriceNum": 471.88
  },
  {
    "id": 381,
    "sku": "246231",
    "name": "Teclado Mecânico PCYES Kuromori White Ghost Blue Switch LED Rainbow PTKMWG60BL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.7,
    "reviews": 387,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/246231/3FA2133D8BCF330EE0630300A8C0F6B9",
    "images": [
      "https://cdn.oderco.com.br/produtos/246231/3FA2133D8BCF330EE0630300A8C0F6B9",
      "https://cdn.oderco.com.br/produtos/246231/3FA2133D8BD0330EE0630300A8C0F6B9",
      "https://cdn.oderco.com.br/produtos/246231/3FA2133D8BD1330EE0630300A8C0F6B9"
    ],
    "description": "O Teclado Mecânico Kuromori White Ghost PCYES Blue Switch LED Rainbow PTKMWG60BL combina desempenho, precisão e um visual clean para setups modernos.\n\nCom formato compacto 60% e 64 teclas, oferece mais espaço na mesa e maior liberdade nos movimentos, mantendo o layout ABNT2 para total funcionalida…",
    "features": [
      "Formato 60% compacto com 64 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Blue com resposta tátil e clique audível.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps tri-color double shot injection.",
      "Iluminação LED Rainbow em blocos.",
      "Cabo USB removível 1,8m USB para Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "246231"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-kuromori-white-ghost-pcyes-blue-switch-ptkmwg60bl",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-kuromori-white-ghost-pcyes-blue-switch-ptkmwg60bl",
    "inStock": true,
    "badge": "BLUE SWITCH"
  },
  {
    "id": 382,
    "sku": "199409",
    "name": "Teclado Mecânico PCYES Kuromori Black Vulcan Red Switch LED Rainbow PTKM60RD",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.8,
    "reviews": 424,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199409/3FA2133D8BC9330EE0630300A8C0F6B9",
    "images": [
      "https://cdn.oderco.com.br/produtos/199409/3FA2133D8BC9330EE0630300A8C0F6B9",
      "https://cdn.oderco.com.br/produtos/199409/3FA2133D8BCA330EE0630300A8C0F6B9",
      "https://cdn.oderco.com.br/produtos/199409/3FA2133D8BCB330EE0630300A8C0F6B9"
    ],
    "description": "O Teclado Mecânico Kuromori Black Vulcan PCYES Red Switch LED Rainbow PTKM60RD é ideal para quem busca agilidade, conforto e visual moderno no setup.\n\nSeu formato compacto 60% com 64 teclas garante mais espaço na mesa e liberdade de movimentação, mantendo o padrão ABNT2 para uso completo no dia a …",
    "features": [
      "Formato 60% compacto com 64 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Red com acionamento linear e suave.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps tri-color double shot injection.",
      "Iluminação LED Rainbow.",
      "Cabo USB removível 1,8m USB para Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199409"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-kuromori-black-vulcan-pcyes-red-switch-ptkm60rd",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-kuromori-black-vulcan-pcyes-red-switch-ptkm60rd",
    "inStock": true,
    "badge": "RED SWITCH"
  },
  {
    "id": 383,
    "sku": "199408",
    "name": "Teclado Mecânico PCYES Kuromori Black Vulcan Blue Switch LED Rainbow PTKM60BL",
    "price": "R$ 399,90",
    "priceNum": 399.9,
    "rating": 4.9,
    "reviews": 461,
    "category": "Periféricos",
    "subcategory": "Teclado Mecânico",
    "tags": [
      "Periféricos",
      "Teclado Mecânico"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/199408/3FA0B95161439B0EE0630300A8C04A18",
    "images": [
      "https://cdn.oderco.com.br/produtos/199408/3FA0B95161439B0EE0630300A8C04A18",
      "https://cdn.oderco.com.br/produtos/199408/3FA0B95161449B0EE0630300A8C04A18",
      "https://cdn.oderco.com.br/produtos/199408/3FA0B95161459B0EE0630300A8C04A18"
    ],
    "description": "O Teclado Mecânico Kuromori Black Vulcan PCYES Blue Switch LED Rainbow PTKM60BL é o aliado ideal para gamers que buscam precisão, durabilidade e visual marcante.\n\nSeu formato compacto 60% com 64 teclas oferece mais espaço na mesa e liberdade de movimentos, mantendo o padrão ABNT2 para uso completo…",
    "features": [
      "Formato 60% compacto com 64 teclas.",
      "Layout ABNT2 padrão brasileiro.",
      "Switch Outemu Blue com resposta tátil e clique audível.",
      "Anti-ghosting para até 25 teclas simultâneas.",
      "Tempo de resposta de 1ms.",
      "Keycaps tri-color double shot injection.",
      "Iluminação LED Rainbow em blocos.",
      "Cabo USB removível 1,8m USB para Type-C."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "199408"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Teclado Mecânico"
      }
    ],
    "seoSlug": "teclado-mecanico-kuromori-black-vulcan-pcyes-blue-switch-ptkm60bl",
    "productUrl": "https://www.pcyes.com.br/teclado-mecanico-kuromori-black-vulcan-pcyes-blue-switch-ptkm60bl",
    "inStock": true,
    "badge": "BLUE SWITCH"
  },
  {
    "id": 384,
    "sku": "316747",
    "name": "Water Cooler PCYES Tundra Black Vulcan Argb 240 Mm Wctbv 240",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.4,
    "reviews": 68,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316747/49DBECEF1345FBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316747/49DBECEF1345FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316747/49DBECEF1346FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316747/49DBECEF1347FBC2E0630300A8C00897"
    ],
    "description": "O Water Cooler Tundra Black Vulcan ARGB 240mm PCYES WCTBV240 entrega alta performance térmica para setups gamer e profissionais que exigem maior capacidade de dissipação.\n\nCom radiador de 240mm e suporte para processadores de até 250W de TDP, garante estabilidade mesmo sob cargas elevadas. A bomba…",
    "features": [
      "Radiador 240mm para maior capacidade de dissipação.",
      "Suporte para CPUs até 250W de TDP.",
      "2 fans 120mm com 67,3CFM e PWM.",
      "Bomba 2600RPM com rolamento cerâmico.",
      "Iluminação ARGB sincronizável.",
      "Compatível com Intel LGA 1700/1851 e AMD AM5."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316747"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-tundra-black-vulcan-argb-240mm-pcyes-wctbv240",
    "productUrl": "https://www.pcyes.com.br/water-cooler-tundra-black-vulcan-argb-240mm-pcyes-wctbv240",
    "inStock": true
  },
  {
    "id": 385,
    "sku": "316745",
    "name": "Water Cooler PCYES Tundra Black Vulcan ARGB 120mm WCTBK120",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.5,
    "reviews": 105,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316745/49DBECEF133FFBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316745/49DBECEF133FFBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316745/49DBECEF1340FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316745/49DBECEF1341FBC2E0630300A8C00897"
    ],
    "description": "O Water Cooler Tundra Black Vulcan ARGB 120mm PCYES WCTBK120 é a solução ideal para quem busca refrigeração eficiente em setups compactos.\n\nCom radiador de 120mm e suporte para processadores de até 150W de TDP, oferece excelente controle térmico para PCs gamer e estações de trabalho. A bomba com r…",
    "features": [
      "Radiador 120mm ideal para gabinetes compactos.",
      "Suporte para processadores até 150W de TDP.",
      "Fan 120mm com até 67,3CFM e controle PWM.",
      "Bomba 2600RPM com rolamento cerâmico.",
      "Iluminação ARGB sincronizável.",
      "Compatível com Intel LGA 1700/1851 e AMD AM5."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316745"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-tundra-black-vulcan-argb-120mm-pcyes-wctbk120",
    "productUrl": "https://www.pcyes.com.br/water-cooler-tundra-black-vulcan-argb-120mm-pcyes-wctbk120",
    "inStock": true,
    "oldPrice": "R$ 412,88",
    "oldPriceNum": 412.88
  },
  {
    "id": 386,
    "sku": "255021",
    "name": "Water Cooler PCYES Vision 360mm Black Vulcan LCD 2,1\" VS360BV",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.6,
    "reviews": 142,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/255021/3D7292BA47E1A9BFE0630300A8C09253",
    "images": [
      "https://cdn.oderco.com.br/produtos/255021/3D7292BA47E1A9BFE0630300A8C09253",
      "https://cdn.oderco.com.br/produtos/255021/3D7292BA47E2A9BFE0630300A8C09253",
      "https://cdn.oderco.com.br/produtos/255021/3D7292BA47E3A9BFE0630300A8C09253"
    ],
    "description": "O Water Cooler Vision 360mm Black Vulcan PCYES LCD 2,1\" VS360BV entrega máxima performance térmica com personalização avançada via display integrado.\n\nA tela LCD de 2,1\" com resolução 480x480 e 16,7 milhões de cores permite exibir temperatura em tempo real, templates exclusivos, GIFs, imagens ou…",
    "features": [
      "Tela LCD 2,1\" 480x480 totalmente personalizável.",
      "Exibição de temperatura, GIF, imagem ou vídeo MP4.",
      "Radiador 360mm com suporte até 350W de TDP.",
      "Bomba até 2500RPM com fluxo de 116L/h.",
      "3 fans 120mm com até 78CFM e controle PWM.",
      "Compatível com sockets Intel e AMD atuais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "255021"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-vision-360mm-black-vulcan-pcyes-lcd-21-vs360bv",
    "productUrl": "https://www.pcyes.com.br/water-cooler-vision-360mm-black-vulcan-pcyes-lcd-21-vs360bv",
    "inStock": true
  },
  {
    "id": 387,
    "sku": "211106",
    "name": "Water Cooler PCYES Vision 240mm Black Vulcan LCD 2,1\" VS240BV",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.7,
    "reviews": 179,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211106/3D7292BA47E7A9BFE0630300A8C09253",
    "images": [
      "https://cdn.oderco.com.br/produtos/211106/3D7292BA47E7A9BFE0630300A8C09253",
      "https://cdn.oderco.com.br/produtos/211106/3D7292BA47E8A9BFE0630300A8C09253",
      "https://cdn.oderco.com.br/produtos/211106/3D7292BA47E9A9BFE0630300A8C09253"
    ],
    "description": "O Water Cooler Vision 240mm Black Vulcan PCYES LCD 2,1\" VS240BV une alta performance térmica com personalização avançada para seu setup.\n\nEquipado com tela LCD de 2,1\" com resolução 480x480 e 16,7 milhões de cores, permite exibir temperatura em tempo real, templates exclusivos, GIFs, imagens ou …",
    "features": [
      "Tela LCD 2,1\" com resolução 480x480 personalizável.",
      "Exibição de temperatura em tempo real, GIF, imagem ou vídeo.",
      "Bomba com fluxo de até 116L/h e 2100RPM.",
      "Radiador 240mm com suporte até 250W de TDP.",
      "2 fans 120mm com até 78CFM e controle PWM.",
      "Compatível com sockets Intel e AMD atuais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211106"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-vision-240mm-black-vulcan-pcyes-lcd-21-vs240bv",
    "productUrl": "https://www.pcyes.com.br/water-cooler-vision-240mm-black-vulcan-pcyes-lcd-21-vs240bv",
    "inStock": true
  },
  {
    "id": 388,
    "sku": "210412",
    "name": "Water Cooler PCYES Sangue Frio 3 ARGB White Ghost 360mm TDP 350W ARGBSF3360WGBR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.8,
    "reviews": 216,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210412/3DD1DDF7544CA64DE0630300A8C0A7ED",
    "images": [
      "https://cdn.oderco.com.br/produtos/210412/3DD1DDF7544CA64DE0630300A8C0A7ED",
      "https://cdn.oderco.com.br/produtos/210412/3DD1DDF7544DA64DE0630300A8C0A7ED",
      "https://cdn.oderco.com.br/produtos/210412/3DD1DDF7544EA64DE0630300A8C0A7ED"
    ],
    "description": "O Water Cooler Sangue Frio 3 ARGB White Ghost 360mm PCYES TDP 350W ARGBSF3360WGBR combina máxima performance térmica com iluminação aRGB para setups personalizados.\n\nEquipado com radiador de 360mm e três fans de 120mm com rolamento hidráulico, entrega fluxo de ar de até 60CFM por fan, garantindo d…",
    "features": [
      "Radiador 360mm para máxima dissipação térmica.",
      "Suporte para processadores até 350W de TDP.",
      "3 fans 120mm PWM com até 60CFM cada.",
      "Iluminação aRGB sincronizável na bomba e nos fans.",
      "Compatível com controladora inclusa e software da placa-mãe.",
      "Bomba com rolamento cerâmico para maior durabilidade.",
      "Compatível com plataformas Intel e AMD atuais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210412"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-argb-white-ghost-360mm-pcyes-tdp350w-argbsf3360wgbr",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-argb-white-ghost-360mm-pcyes-tdp350w-argbsf3360wgbr",
    "inStock": true
  },
  {
    "id": 389,
    "sku": "210411",
    "name": "Water Cooler PCYES Sangue Frio 3 ARGB White Ghost 240mm TDP 250W ARGBSF3240WGBR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.9,
    "reviews": 253,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210411/3DD0C370A78A256FE0630300A8C0124D",
    "images": [
      "https://cdn.oderco.com.br/produtos/210411/3DD0C370A78A256FE0630300A8C0124D",
      "https://cdn.oderco.com.br/produtos/210411/3DD0C370A78B256FE0630300A8C0124D",
      "https://cdn.oderco.com.br/produtos/210411/3DD0C370A78C256FE0630300A8C0124D"
    ],
    "description": "O Water Cooler Sangue Frio 3 ARGB White Ghost 240mm PCYES TDP 250W ARGBSF3240WGBR entrega eficiência térmica e visual moderno para setups personalizados.\n\nCom radiador de 240mm e dois fans de 120mm com rolamento hidráulico, proporciona fluxo de ar de até 60CFM por fan, garantindo excelente dissipa…",
    "features": [
      "Radiador 240mm com excelente equilíbrio entre performance e compatibilidade.",
      "Suporte para processadores até 250W de TDP.",
      "2 fans 120mm PWM com até 60CFM cada.",
      "Iluminação aRGB na bomba e nos fans.",
      "Compatível com controladora inclusa ou software da placa-mãe.",
      "Bomba com rolamento cerâmico para maior durabilidade.",
      "Compatível com plataformas Intel e AMD atuais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210411"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-argb-white-ghost-240mm-pcyes-tdp250w-argbsf3240wgbr",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-argb-white-ghost-240mm-pcyes-tdp250w-argbsf3240wgbr",
    "inStock": true
  },
  {
    "id": 390,
    "sku": "210409",
    "name": "Water Cooler PCYES Sangue Frio 3 ARGB Black Vulcan 360mm TDP 350W (ARGBSF3360BR)",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.4,
    "reviews": 290,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210409/3D7FF909C11730B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210409/3D7FF909C11730B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210409/3D7FF909C11830B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210409/3D7FF909C11930B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler Sangue Frio 3 ARGB Black Vulcan 360mm PCYES TDP 350W ARGBSF3360BR combina alta capacidade térmica com iluminação aRGB personalizável para setups de alto desempenho.\n\nCom radiador de 360mm e três fans de 120mm com rolamento hidráulico, entrega fluxo de ar de até 60CFM por fan, garant…",
    "features": [
      "Radiador 360mm para máxima dissipação térmica.",
      "Suporte para processadores até 350W de TDP.",
      "3 fans 120mm PWM com até 60CFM cada.",
      "Iluminação aRGB na bomba e nos fans.",
      "Compatível com controladora inclusa ou software da placa-mãe.",
      "Bomba com rolamento cerâmico para maior durabilidade e baixo ruído.",
      "Compatibilidade ampla com plataformas Intel e AMD."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210409"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-argb-black-vulcan-360mm-pcyes-tdp350w-argbsf3360br",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-argb-black-vulcan-360mm-pcyes-tdp350w-argbsf3360br",
    "inStock": true,
    "oldPrice": "R$ 412,88",
    "oldPriceNum": 412.88
  },
  {
    "id": 391,
    "sku": "210399",
    "name": "Water Cooler PCYES Sangue Frio 3 White Ghost 360mm TDP 350W WCSF3360WGBR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.5,
    "reviews": 327,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210399/3D7FF909C10530B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210399/3D7FF909C10530B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210399/3D7FF909C10630B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210399/3D7FF909C10730B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler Sangue Frio 3 White Ghost 360mm PCYES TDP 350W WCSF3360WGBR oferece alto desempenho térmico aliado a um visual clean para setups modernos.\n\nCom radiador de 360mm e três fans de 120mm com rolamento hidráulico, proporciona fluxo de ar de até 60CFM por fan, garantindo excelente dissipa…",
    "features": [
      "Radiador 360mm para máxima capacidade de dissipação térmica.",
      "Suporte para processadores até 350W de TDP.",
      "3 fans 120mm PWM com até 60CFM cada.",
      "Bomba com rolamento cerâmico para maior durabilidade.",
      "Operação silenciosa com controle inteligente de rotação.",
      "Compatível com Intel e AMD, incluindo plataformas de alto desempenho."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210399"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-white-ghost-360mm-pcyes-tdp350w-wcsf3360wgbr",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-white-ghost-360mm-pcyes-tdp350w-wcsf3360wgbr",
    "inStock": true
  },
  {
    "id": 392,
    "sku": "210398",
    "name": "Water Cooler PCYES Sangue Frio 3 White Ghost 240mm TDP 250W WCSF3240WGBR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.6,
    "reviews": 364,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210398/3D7FF909C0FF30B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210398/3D7FF909C0FF30B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210398/3D7FF909C10030B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210398/3D7FF909C10130B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler Sangue Frio 3 White Ghost 240mm PCYES TDP 250W WCSF3240WGBR combina visual clean com alto desempenho térmico para setups modernos.\n\nEquipado com radiador de 240mm e dois fans de 120mm com rolamento hidráulico, oferece fluxo de ar de até 60CFM por fan, garantindo excelente dissipação…",
    "features": [
      "Radiador 240mm para alta eficiência térmica.",
      "Suporte para processadores até 250W de TDP.",
      "2 fans 120mm PWM com até 60CFM cada.",
      "Bomba com rolamento cerâmico para maior durabilidade.",
      "Baixo nível de ruído na bomba e nos fans.",
      "Compatível com Intel e AMD, incluindo plataformas de alto desempenho."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210398"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-white-ghost-240mm-pcyes-tdp250w-wcsf3240wgbr",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-white-ghost-240mm-pcyes-tdp250w-wcsf3240wgbr",
    "inStock": true
  },
  {
    "id": 393,
    "sku": "210396",
    "name": "Water Cooler PCYES Sangue Frio 3 Black Vulcan 360mm TDP 350W WCSF3360BR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.7,
    "reviews": 401,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210396/3D7FF909C0F330B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210396/3D7FF909C0F330B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210396/3D7FF909C0F430B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210396/3D7FF909C0F530B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler Sangue Frio 3 Black Vulcan 360mm PCYES TDP 350W WCSF3360BR combina design exclusivo com alto desempenho térmico para setups exigentes.\n\nCom radiador de 360mm e três fans de 120mm com rolamento hidráulico, oferece fluxo de ar de até 60CFM por fan, garantindo excelente dissipação e ba…",
    "features": [
      "Radiador 360mm para alta capacidade de dissipação térmica.",
      "Suporte para processadores até 350W de TDP.",
      "3 fans 120mm PWM com até 60CFM cada.",
      "Bomba com rolamento cerâmico para maior durabilidade.",
      "Baixo nível de ruído tanto na bomba quanto nos fans.",
      "Compatível com Intel e AMD, incluindo plataformas de alto desempenho."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210396"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-black-vulcan-360mm-pcyes-tdp350w-wcsf3360br",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-black-vulcan-360mm-pcyes-tdp350w-wcsf3360br",
    "inStock": true
  },
  {
    "id": 394,
    "sku": "216136",
    "name": "Cooler para Processador PCYES Frost Pulse ARGB White Ghost TDP 180W PEFPARGBWG",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.8,
    "reviews": 438,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/216136/3EF0D4FA2B42AA25E0630300A8C0F6C4",
    "images": [
      "https://cdn.oderco.com.br/produtos/216136/3EF0D4FA2B42AA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216136/3EF0D4FA2B43AA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216136/3EF0D4FA2B44AA25E0630300A8C0F6C4"
    ],
    "description": "O Cooler para Processador Frost Pulse ARGB White Ghost PCYES TDP 180W PEFPARGBWG entrega alta performance térmica com iluminação ARGB e acabamento branco para setups modernos.\n\nConta com 4 heatpipes de cobre de 6mm com contato direto e aletas em alumínio, garantindo excelente dissipação para proce…",
    "features": [
      "Compatível com Intel LGA 1700/1200/115X e AMD AM5/AM4.",
      "Suporte para processadores até 180W de TDP.",
      "4 heatpipes de cobre 6mm com contato direto.",
      "Iluminação ARGB para personalização do setup.",
      "Ventoinha 120mm PWM com controle inteligente de rotação.",
      "Acabamento White Ghost ideal para setups brancos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "216136"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-frost-pulse-argb-white-ghost-pcyes-tdp180w-pefpargbwg",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-frost-pulse-argb-white-ghost-pcyes-tdp180w-pefpargbwg",
    "inStock": true
  },
  {
    "id": 395,
    "sku": "216133",
    "name": "Cooler para Processador PCYES Frost Pulse ARGB Black Vulcan TDP 180W PEFPARGBBV",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.9,
    "reviews": 475,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/216133/3EF0D4FA2B36AA25E0630300A8C0F6C4",
    "images": [
      "https://cdn.oderco.com.br/produtos/216133/3EF0D4FA2B36AA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216133/3EF0D4FA2B37AA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216133/3EF0D4FA2B38AA25E0630300A8C0F6C4"
    ],
    "description": "O Cooler para Processador Frost Pulse ARGB Black Vulcan PCYES TDP 180W PEFPARGBBV combina alta performance térmica com iluminação ARGB para setups gamers exigentes.\n\nSeu dissipador conta com 4 heatpipes de cobre de 6mm com contato direto e aletas em alumínio, oferecendo excelente dissipação para p…",
    "features": [
      "Compatível com Intel LGA 1700/1200/115X e AMD AM5/AM4.",
      "Suporte para processadores até 180W de TDP.",
      "4 heatpipes de cobre 6mm com contato direto.",
      "Iluminação ARGB para personalização do setup.",
      "Ventoinha 120mm PWM com ajuste automático de rotação.",
      "Fluxo de ar de até 60CFM com baixo nível de ruído."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "216133"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-frost-pulse-argb-black-vulcan-pcyes-tdp180w-pefpargbbv",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-frost-pulse-argb-black-vulcan-pcyes-tdp180w-pefpargbbv",
    "inStock": true,
    "oldPrice": "R$ 153,28",
    "oldPriceNum": 153.28
  },
  {
    "id": 396,
    "sku": "216135",
    "name": "Cooler para Processador PCYES Frost Pulse White Ghost TDP 180W PEFPWG",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.4,
    "reviews": 82,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/216135/3EF0D4FA2B3CAA25E0630300A8C0F6C4",
    "images": [
      "https://cdn.oderco.com.br/produtos/216135/3EF0D4FA2B3CAA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216135/3EF0D4FA2B3DAA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216135/3EF0D4FA2B3EAA25E0630300A8C0F6C4"
    ],
    "description": "O Cooler para Processador Frost Pulse White Ghost PCYES TDP 180W PEFPWG combina alta eficiência térmica com acabamento branco para setups clean e modernos.\n\nEquipado com 4 heatpipes de cobre de 6mm com contato direto e aletas em alumínio, suporta processadores de até 180W de TDP com excelente diss…",
    "features": [
      "Compatível com Intel LGA 1700/1200/115X e AMD AM5/AM4.",
      "Suporte para processadores até 180W de TDP.",
      "4 heatpipes de cobre 6mm com contato direto.",
      "Ventoinha 120mm PWM com ajuste automático de rotação.",
      "Fluxo de ar de até 60CFM para alta eficiência térmica.",
      "Acabamento White Ghost ideal para setups brancos."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "216135"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-frost-pulse-white-ghost-pcyes-tdp180w-pefpwg",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-frost-pulse-white-ghost-pcyes-tdp180w-pefpwg",
    "inStock": true,
    "oldPrice": "R$ 145,49",
    "oldPriceNum": 145.49
  },
  {
    "id": 397,
    "sku": "216131",
    "name": "Cooler para Processador PCYES Frost Pulse Black Vulcan TDP 180W PEFPBV",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.5,
    "reviews": 119,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/216131/3EF0D4FA2B30AA25E0630300A8C0F6C4",
    "images": [
      "https://cdn.oderco.com.br/produtos/216131/3EF0D4FA2B30AA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216131/3EF0D4FA2B31AA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216131/3EF0D4FA2B32AA25E0630300A8C0F6C4"
    ],
    "description": "O Cooler para Processador Frost Pulse Black Vulcan PCYES TDP 180W PEFPBV entrega alta performance térmica para processadores de maior demanda.\n\nEquipado com 4 heatpipes de cobre de 6mm com contato direto e aletas em alumínio, proporciona excelente dissipação de calor para CPUs de até 180W de TDP. …",
    "features": [
      "Compatível com Intel LGA 1700/1200/115X e AMD AM5/AM4.",
      "Suporte para processadores até 180W de TDP.",
      "4 heatpipes de cobre 6mm com contato direto.",
      "Ventoinha 120mm com controle PWM inteligente.",
      "Fluxo de ar de até 60CFM para alta eficiência térmica.",
      "Baixo ruído variando entre 15,2 e 32,5dB(A)."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "216131"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-frost-pulse-black-vulcan-pcyes-tdp180w-pefpbv",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-frost-pulse-black-vulcan-pcyes-tdp180w-pefpbv",
    "inStock": true
  },
  {
    "id": 398,
    "sku": "251671",
    "name": "Cooler para Processador PCYES Lorx Rainbow V2 92mm TDP 100W ACLX92RBV2",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.6,
    "reviews": 156,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/251671/3F9F1AE4EDB3A0D1E0630300A8C05422",
    "images": [
      "https://cdn.oderco.com.br/produtos/251671/3F9F1AE4EDB3A0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/251671/3F9F1AE4EDB4A0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/251671/3F9F1AE4EDB5A0D1E0630300A8C05422"
    ],
    "description": "O Cooler para Processador Lorx Rainbow V2 92mm PCYES TDP 100W ACLX92RBV2 combina desempenho térmico eficiente com visual Rainbow para destacar seu setup.\n\nEquipado com dissipador em alumínio e 2 heatpipes de cobre de 6mm com contato direto, garante melhor transferência de calor e suporte para proc…",
    "features": [
      "Compatível com Intel LGA 1700/1200/115X e AMD AM4/AM5.",
      "Suporte para processadores até 100W de TDP.",
      "2 heatpipes de cobre 6mm com contato direto.",
      "Iluminação LED Rainbow para visual gamer.",
      "Fan 92mm com rotação de até 1900RPM.",
      "Baixo nível de ruído de apenas 26,2 dB(A)."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "251671"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-lorx-rainbow-v2-92mm-pcyes-tdp100w-aclx92rbv2",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-lorx-rainbow-v2-92mm-pcyes-tdp100w-aclx92rbv2",
    "inStock": true
  },
  {
    "id": 399,
    "sku": "32846",
    "name": "Cooler para Processador PCYES Nótus ST Intel TDP 65W PAC95PRSL",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.7,
    "reviews": 193,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/32846/3F9F1AE4EDB9A0D1E0630300A8C05422",
    "images": [
      "https://cdn.oderco.com.br/produtos/32846/3F9F1AE4EDB9A0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/32846/3F9F1AE4EDBAA0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/32846/3F9F1AE4EDBBA0D1E0630300A8C05422"
    ],
    "description": "O Cooler para Processador Nótus ST PCYES Intel TDP 65W PAC95PRSL é a escolha ideal para quem busca eficiência térmica em um formato compacto. Discreto e funcional, ele só chama atenção quando a temperatura do processador começa a cair.\n\nProjetado para gabinetes com espaço limitado, oferece excelen…",
    "features": [
      "Formato compacto ideal para gabinetes com espaço reduzido.",
      "Compatível com processadores Intel até 65W de TDP.",
      "Fan de 92mm com até 2200RPM para boa eficiência térmica.",
      "Fluxo de ar de até 42.35CFM garantindo melhor refrigeração.",
      "Funcionamento silencioso com ruído máximo de 28.5dB(A).",
      "Excelente custo-benefício para setups básicos e intermediários."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "32846"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-notus-st-pcyes-intel-tdp65w-pac95prsl",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-notus-st-pcyes-intel-tdp65w-pac95prsl",
    "inStock": true
  },
  {
    "id": 400,
    "sku": "272335",
    "name": "Dissipador Heatsink PCYES SSD M.2 NVMe 2280 Heat Shield PHS2280BK",
    "price": "R$ 299,90",
    "priceNum": 299.9,
    "rating": 4.8,
    "reviews": 230,
    "category": "SSD e HD",
    "subcategory": "Acessório para SSD",
    "tags": [
      "SSD e HD",
      "Acessório para SSD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/272335/3DD1DDF75452A64DE0630300A8C0A7ED",
    "images": [
      "https://cdn.oderco.com.br/produtos/272335/3DD1DDF75452A64DE0630300A8C0A7ED",
      "https://cdn.oderco.com.br/produtos/272335/3DD1DDF75453A64DE0630300A8C0A7ED",
      "https://cdn.oderco.com.br/produtos/272335/3DD1DDF75454A64DE0630300A8C0A7ED"
    ],
    "description": "O Dissipador Heatsink SSD M.2 NVMe 2280 PCYES Heat Shield PHS2280BK foi desenvolvido para melhorar a dissipação térmica de SSDs M.2 2280, garantindo maior estabilidade e desempenho contínuo.\n\nSeu formato compacto proporciona ampla compatibilidade com diferentes sistemas, incluindo desktops e PS5. …",
    "features": [
      "Formato compacto que garante ampla compatibilidade com sistemas e consoles.",
      "Aletas de alumínio que aumentam a dissipação de calor de forma eficiente.",
      "Thermal pads duplos 8,5W/mK para melhor transferência térmica.",
      "Instalação simples e rápida sem necessidade de ferramentas complexas.",
      "Ajuda a manter estabilidade e desempenho do SSD em uso intenso.",
      "Compatível com SSD M.2 2280 e PS5."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "272335"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Acessório para SSD"
      }
    ],
    "seoSlug": "dissipador-heatsink-ssd-m2-nvme-2280-pcyes-heat-shield-phs2280bk",
    "productUrl": "https://www.pcyes.com.br/dissipador-heatsink-ssd-m2-nvme-2280-pcyes-heat-shield-phs2280bk",
    "inStock": true,
    "badge": "NVME",
    "oldPrice": "R$ 353,88",
    "oldPriceNum": 353.88
  },
  {
    "id": 401,
    "sku": "271633",
    "name": "Controlador de LED PCYES Light Beam ARGB PLB1ARGB",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 267,
    "category": "Refrigeração",
    "subcategory": "Controlador LED",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Controlador LED"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/271633/2DE360053FE9A37FE0630300A8C0CB25",
    "images": [
      "https://cdn.oderco.com.br/produtos/271633/2DE360053FE9A37FE0630300A8C0CB25",
      "https://cdn.oderco.com.br/produtos/271633/2DE360053FEAA37FE0630300A8C0CB25",
      "https://cdn.oderco.com.br/produtos/271633/2DE360053FEBA37FE0630300A8C0CB25"
    ],
    "description": "O Controlador de LED Light Beam PCYES ARGB PLB1ARGB é uma solução prática e eficiente para gerenciar a iluminação do seu setup com total controle.\n\nCom alimentação via SATA, garante estabilidade e segurança para os componentes conectados. A conexão universal aRGB 5V 3 pinos oferece compatibilidade…",
    "features": [
      "Controle simples e direto através de botões físicos integrados.",
      "Compatibilidade com padrão aRGB 5V 3 pinos universal.",
      "Alimentação SATA garantindo estabilidade e segurança elétrica.",
      "Permite sincronizar múltiplos dispositivos utilizando cabos splitter aRGB.",
      "Diversos modos, cores e velocidades de efeito disponíveis.",
      "Funções rápidas para resetar padrões ou desligar iluminação."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "271633"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Controlador LED"
      }
    ],
    "seoSlug": "controlador-de-led-pcyes-light-beam-argb-plb1argb",
    "productUrl": "https://www.pcyes.com.br/controlador-de-led-pcyes-light-beam-argb-plb1argb",
    "inStock": true
  },
  {
    "id": 402,
    "sku": "264571",
    "name": "Kit Cooler Fan PCYES Sangue Frio 3 ARGB Black Vulcan Reverse 120mm K3ARGBSF3RVBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.4,
    "reviews": 304,
    "category": "Refrigeração",
    "subcategory": "Kit Cooler Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Kit Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/264571/3EEF2A65C2DDF72CE0630300A8C0443F",
    "images": [
      "https://cdn.oderco.com.br/produtos/264571/3EEF2A65C2DDF72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/264571/3EEF2A65C2DEF72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/264571/3EEF2A65C2E0F72CE0630300A8C0443F"
    ],
    "description": "O Kit Cooler Fan Sangue Frio 3 PCYES ARGB Black Vulcan Reverse 120mm K3ARGBSF3RVBR foi desenvolvido para entregar alta performance térmica com estética diferenciada no padrão Reverse.\n\nCom três fans de 120mm capazes de atingir até 2200RPM e 60CFM, garante fluxo de ar eficiente para gabinetes e rad…",
    "features": [
      "Kit com 3 fans 120mm Reverse garantindo fluxo de ar eficiente e visual diferenciado no gabinete.",
      "Velocidade de até 2200RPM com 60CFM e controle PWM automático para melhor desempenho térmico.",
      "Estrutura Reverse ideal para projetos com foco em estética e organização visual.",
      "Iluminação aRGB 3 pinos 5V compatível com as principais placas-mãe do mercado.",
      "Rolamento FDB que proporciona maior durabilidade e funcionamento estável.",
      "Design Black Vulcan moderno para setups gamers e profissionais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "264571"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Cooler Fan"
      }
    ],
    "seoSlug": "kit-cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-reverse-120mm-k3argbsf3rvbr",
    "productUrl": "https://www.pcyes.com.br/kit-cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-reverse-120mm-k3argbsf3rvbr",
    "inStock": true
  },
  {
    "id": 403,
    "sku": "192913",
    "name": "Kit Cooler Fan PCYES Sangue Frio 3 ARGB Black Vulcan 120mm K3ARGBSF3BR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.5,
    "reviews": 341,
    "category": "Refrigeração",
    "subcategory": "Kit Cooler Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Kit Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192913/3EEF2A65C2E3F72CE0630300A8C0443F",
    "images": [
      "https://cdn.oderco.com.br/produtos/192913/3EEF2A65C2E3F72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/192913/3EEF2A65C2E4F72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/192913/3EEF2A65C2E6F72CE0630300A8C0443F"
    ],
    "description": "O Kit Cooler Fan Sangue Frio 3 PCYES ARGB Black Vulcan 120mm K3ARGBSF3BR combina alta performance térmica com controle completo de iluminação para seu setup.\n\nCom três fans de 120mm capazes de atingir até 2200RPM e 60CFM, oferece fluxo de ar eficiente para gabinetes e radiadores compatíveis. O con…",
    "features": [
      "Kit com 3 fans 120mm ARGB garantindo fluxo de ar eficiente e visual uniforme no setup.",
      "Velocidade de até 2200RPM com 60CFM e controle PWM automático para melhor desempenho térmico.",
      "Iluminação aRGB 3 pinos 5V compatível com principais placas-mãe do mercado.",
      "Controladora Light Core com suporte para até 9 fans PWM e 9 dispositivos ARGB.",
      "Controle via controle remoto ou sincronização com software da placa-mãe.",
      "Fixação magnética facilitando instalação e organização interna do gabinete."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192913"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Cooler Fan"
      }
    ],
    "seoSlug": "kit-cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-120mm-k3argbsf3br",
    "productUrl": "https://www.pcyes.com.br/kit-cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-120mm-k3argbsf3br",
    "inStock": true
  },
  {
    "id": 404,
    "sku": "253976",
    "name": "Cooler Fan PCYES Vision White Ghost 120mm FVWG120",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.6,
    "reviews": 378,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/253976/3F9F1AE4EDAEA0D1E0630300A8C05422",
    "images": [
      "https://cdn.oderco.com.br/produtos/253976/3F9F1AE4EDAEA0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/253976/3F9F1AE4EDAFA0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/253976/3F9F1AE4EDB0A0D1E0630300A8C05422"
    ],
    "description": "O Cooler Fan Vision PCYES White Ghost 120mm FVWG120 foi projetado para entregar alto fluxo de ar com operação silenciosa e visual clean.\n\nCom velocidade de até 2000RPM e fluxo de ar máximo de 78CFM, proporciona excelente desempenho térmico para gabinetes e radiadores compatíveis. Sua pressão estát…",
    "features": [
      "Fluxo de ar de até 78CFM garantindo excelente desempenho térmico.",
      "Velocidade de até 2000RPM equilibrando performance e baixo ruído.",
      "Pressão estática de 2,68mmH2O ideal para gabinetes e radiadores.",
      "Rolamento FDB que proporciona maior durabilidade e operação estável.",
      "Design White Ghost ideal para setups clean e personalizados."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "253976"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-vision-pcyes-white-ghost-120mm-fvwg120",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-vision-pcyes-white-ghost-120mm-fvwg120",
    "inStock": true
  },
  {
    "id": 405,
    "sku": "264567",
    "name": "Cooler Fan PCYES Sangue Frio 3 ARGB Black Vulcan Reverse 120mm ARGBRVSF3BR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.7,
    "reviews": 415,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/264567/3F92F24D2FB3251AE0630300A8C0FCFF",
    "images": [
      "https://cdn.oderco.com.br/produtos/264567/3F92F24D2FB3251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/264567/3F92F24D2FB4251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/264567/3F92F24D2FB6251AE0630300A8C0FCFF"
    ],
    "description": "O Cooler Fan Sangue Frio 3 PCYES ARGB Black Vulcan Reverse 120mm ARGBRVSF3BR foi desenvolvido para oferecer alta performance térmica com estética diferenciada no padrão Reverse.\n\nCom velocidade de até 2200RPM e fluxo de ar máximo de 60CFM, proporciona excelente eficiência para fluxo de ar no gabin…",
    "features": [
      "Fluxo de ar de até 60CFM garantindo eficiência no resfriamento do gabinete ou radiador.",
      "Velocidade de até 2200RPM com controle PWM automático para melhor equilíbrio entre silêncio e desempenho.",
      "Estrutura Reverse ideal para projetos com foco em estética e organização visual.",
      "Iluminação aRGB 3 pinos 5V compatível com as principais placas-mãe do mercado.",
      "Rolamento FDB que proporciona maior durabilidade e funcionamento estável.",
      "Design Black Vulcan moderno para setups gamers e profissionais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "264567"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-reverse-120mm-argbrvsf3br",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-reverse-120mm-argbrvsf3br",
    "inStock": true,
    "oldPrice": "R$ 153,28",
    "oldPriceNum": 153.28
  },
  {
    "id": 406,
    "sku": "192911",
    "name": "Cooler Fan PCYES Sangue Frio 3 ARGB Black Vulcan 120mm ARGBSF3BR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.8,
    "reviews": 452,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192911/3F92F24D2FA7251AE0630300A8C0FCFF",
    "images": [
      "https://cdn.oderco.com.br/produtos/192911/3F92F24D2FA7251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/192911/3F92F24D2FA8251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/192911/3F92F24D2FA9251AE0630300A8C0FCFF"
    ],
    "description": "O Cooler Fan Sangue Frio 3 PCYES ARGB Black Vulcan 120mm ARGBSF3BR foi desenvolvido para entregar alta eficiência térmica e visual marcante para seu setup.\n\nCom rotação de até 2200RPM e fluxo de ar máximo de 60CFM, oferece desempenho ideal para otimizar o fluxo interno do gabinete ou uso em radiad…",
    "features": [
      "Fluxo de ar de até 60CFM garantindo eficiência no resfriamento do gabinete ou radiador.",
      "Velocidade de até 2200RPM com controle PWM automático para melhor equilíbrio entre silêncio e desempenho.",
      "Iluminação aRGB 3 pinos 5V compatível com as principais placas-mãe do mercado.",
      "Rolamento FDB que proporciona maior durabilidade e funcionamento estável.",
      "Ideal para gabinetes, air coolers e radiadores compatíveis.",
      "Design Black Vulcan moderno para setups gamers e profissionais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192911"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-120mm-argbsf3br",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-sangue-frio-3-pcyes-argb-black-vulcan-120mm-argbsf3br",
    "inStock": true
  },
  {
    "id": 407,
    "sku": "211108",
    "name": "Water Cooler PCYES Vision White Ghost 240mm LCD 2,1\" VS240WG",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.9,
    "reviews": 59,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211108/3D6C9CB1387EACC6E0630300A8C02D0B",
    "images": [
      "https://cdn.oderco.com.br/produtos/211108/3D6C9CB1387EACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/211108/3D6C9CB1387FACC6E0630300A8C02D0B",
      "https://cdn.oderco.com.br/produtos/211108/3D6C9CB13880ACC6E0630300A8C02D0B"
    ],
    "description": "O Water Cooler Vision PCYES White Ghost 240mm LCD 2,1\" VS240WG une desempenho térmico de alto nível com liberdade total de personalização. Equipado com tela LCD de 2,1” com resolução 480x480, permite exibir temperatura em tempo real, templates exclusivos, GIFs, imagens ou vídeos MP4 através de soft…",
    "features": [
      "Tela LCD 2,1” com resolução 480x480 para personalização com GIF, imagem, vídeo ou monitoramento em tempo real.",
      "Suporte térmico para processadores de até 250W garantindo estabilidade mesmo sob alta carga.",
      "Bomba com até 2100RPM e fluxo de 116L/h para refrigeração eficiente e contínua.",
      "Fans de até 78CFM com controle PWM automático para equilíbrio entre silêncio e desempenho.",
      "Design White Ghost moderno ideal para setups clean e personalizados.",
      "Compatível com os principais sockets Intel e AMD atuais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211108"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-vision-pcyes-white-ghost-240mm-lcd-21-vs240wg",
    "productUrl": "https://www.pcyes.com.br/water-cooler-vision-pcyes-white-ghost-240mm-lcd-21-vs240wg",
    "inStock": true,
    "oldPrice": "R$ 391,89",
    "oldPriceNum": 391.89
  },
  {
    "id": 408,
    "sku": "210408",
    "name": "Water Cooler PCYES Sangue Frio 3 ARGB Black Vulcan 240mm TDP 250W ARGBSF3240BR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.4,
    "reviews": 96,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210408/3D7FF909C11130B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210408/3D7FF909C11130B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210408/3D7FF909C11230B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210408/3D7FF909C11330B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler Sangue Frio 3 PCYES ARGB Black Vulcan 240mm TDP 250W ARGBSF3240BR combina design exclusivo com alto desempenho térmico para setups exigentes. Desenvolvido 100% pela PCYES, entrega visual moderno aliado à eficiência comprovada da linha Sangue Frio.\n\nCom radiador de 240mm em alumínio …",
    "features": [
      "Suporte térmico para processadores de até 250W garantindo estabilidade em alto desempenho.",
      "Radiador de 240mm com excelente dissipação de calor para setups gamers e profissionais.",
      "Bomba com rolamento cerâmico que oferece maior durabilidade e funcionamento silencioso.",
      "Fans de até 2200RPM com 60CFM e alta pressão estática para máxima eficiência no resfriamento.",
      "Iluminação aRGB na bomba e nos fans permitindo personalização completa do setup.",
      "Compatível com plataformas Intel e AMD atuais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210408"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-pcyes-argb-black-vulcan-240mm-tdp-250w-argbsf3240br",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-pcyes-argb-black-vulcan-240mm-tdp-250w-argbsf3240br",
    "inStock": true
  },
  {
    "id": 409,
    "sku": "192929",
    "name": "Controlador Fan PCYES Light Core Black 9x PWM + ARGB PELC9PVBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.5,
    "reviews": 133,
    "category": "Refrigeração",
    "subcategory": "Controlador Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Controlador Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192929/4420D12710685FE4E0630300A8C06F5A",
    "images": [
      "https://cdn.oderco.com.br/produtos/192929/4420D12710685FE4E0630300A8C06F5A",
      "https://cdn.oderco.com.br/produtos/192929/4420D127106B5FE4E0630300A8C06F5A",
      "https://cdn.oderco.com.br/produtos/192929/4420D127106A5FE4E0630300A8C06F5A"
    ],
    "description": "Tenha controle total da iluminação e ventilação com o Controlador Fan Light Core PCYES Black 9x PWM + ARGB PELC9PVBR. Desenvolvido 100% pela PCYES, ele permite conectar até 9 fans PWM e 9 dispositivos ARGB 5V, centralizando todo o gerenciamento do seu setup em um único módulo.\n\nA sincronização pod…",
    "features": [
      "Permite controlar até 9 fans PWM e 9 dispositivos ARGB simultaneamente, centralizando completamente o sistema de ventilação e iluminação do setup.",
      "Oferece sincronização com placas-mãe compatíveis das principais fabricantes do mercado, garantindo efeitos integrados.",
      "Inclui controle remoto para ajustes rápidos e acesso a diversos efeitos pré-programados.",
      "Possui fixação magnética que facilita a instalação e o posicionamento dentro do gabinete.",
      "A alimentação via SATA proporciona fornecimento de energia estável e seguro para todos os dispositivos conectados."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192929"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Controlador Fan"
      }
    ],
    "seoSlug": "controlador-fan-light-core-pcyes-black-9x-pwm-argb-pelc9pvbr",
    "productUrl": "https://www.pcyes.com.br/controlador-fan-light-core-pcyes-black-9x-pwm-argb-pelc9pvbr",
    "inStock": true
  },
  {
    "id": 410,
    "sku": "316750",
    "name": "Cooler para Processador PCYES Tundra 90 Black Vulcan TDP 115W ACTBK90",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.6,
    "reviews": 170,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316750/49DBECEF1357FBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316750/49DBECEF1357FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316750/49DBECEF1358FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316750/49DBECEF1359FBC2E0630300A8C00897"
    ],
    "description": "O Cooler Para Processador Tundra 90 PCYES Black Vulcan TDP 115W ACTBK90 foi desenvolvido para entregar eficiência térmica em um formato compacto. Ideal para setups que exigem equilíbrio entre desempenho e espaço interno, conta com dissipador em alumínio e dois heatpipes de cobre de 6mm com contato d…",
    "features": [
      "Oferece suporte térmico para processadores com TDP de até 115W, garantindo estabilidade no uso diário e em aplicações mais exigentes.",
      "Conta com dois heatpipes de cobre com contato direto que melhoram a dissipação de calor.",
      "Fan de até 2200RPM com 48CFM proporciona fluxo de ar eficiente com baixo nível de ruído.",
      "Formato compacto com 124mm de altura, ideal para gabinetes menores.",
      "Compatível com ampla variedade de soquetes Intel e AMD atuais."
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316750"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-tundra-90-pcyes-black-vulcan-tdp-115w-actbk90",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-tundra-90-pcyes-black-vulcan-tdp-115w-actbk90",
    "inStock": true,
    "oldPrice": "R$ 153,28",
    "oldPriceNum": 153.28
  },
  {
    "id": 411,
    "sku": "210394",
    "name": "Water Cooler PCYES Sangue Frio 3 Black Vulcan 240mm TDP 250W WCSF3240BR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.7,
    "reviews": 207,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210394/3D7FF909C0ED30B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210394/3D7FF909C0ED30B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210394/3D7FF909C0EE30B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210394/3D7FF909C0EF30B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler Sangue Frio 3 PCYES Black Vulcan 240mm TDP 250W WCSF3240BR PCYes foi desenvolvido para setups que exigem maior capacidade térmica e estabilidade em alto desempenho. Com suporte para processadores de até 250W TDP, oferece refrigeração eficiente mesmo sob cargas intensas.\n\nSeu radiado…",
    "features": [
      "Suporte para processadores até 250WRadiador de 240mm para maior dissipação",
      "2 fans 120mm de até 2200RPM",
      "Fluxo de ar de 60CFM por fan",
      "Pressão estática de 2,47mmH2O",
      "Bomba 2100RPM com rolamento cerâmico",
      "• Controle PWM inteligente",
      "• Compatível com Intel e AMD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210394"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-black-vulcan-240mm-tdp-250w-wcsf3240br",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-black-vulcan-240mm-tdp-250w-wcsf3240br",
    "inStock": true
  },
  {
    "id": 412,
    "sku": "210400",
    "name": "Water Cooler PCYES Sangue Frio 3 ARGB Black Vulcan 120mm TDP 200W ARGBSF3120BR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.8,
    "reviews": 244,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210400/3D7FF909C10B30B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210400/3D7FF909C10B30B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210400/3D7FF909C10C30B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210400/3D7FF909C10D30B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler Sangue Frio 3 PCYES ARGB Black Vulcan 120mm TDP 200W ARGBSF3120BR PCYes foi desenvolvido para entregar eficiência térmica superior com visual robusto Black Vulcan. Projetado para processadores com TDP de até 200W, mantém estabilidade mesmo sob cargas intensas.\n\nO radiador de 120mm e…",
    "features": [
      "Suporte para processadores até 200W",
      "Radiador compacto de 120mm",
      "Bomba 2100RPM com rolamento cerâmico",
      "Fan até 2200RPM com 60CFM",
      "Pressão estática de 2,47mmH2O",
      "Iluminação ARGB 5V sincronizável",
      "Compatível com Intel e AMD",
      "Visual Black Vulcan robusto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210400"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-argb-black-vulcan-120mm-tdp-200w-argbsf3120br",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-argb-black-vulcan-120mm-tdp-200w-argbsf3120br",
    "inStock": true
  },
  {
    "id": 413,
    "sku": "264572",
    "name": "Kit Cooler PCYES Fan Sangue Frio 3 ARGB White Ghost Reverse 120mm 2200RPM 60CFM K3ARGBSF3WGRVBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.9,
    "reviews": 281,
    "category": "Refrigeração",
    "subcategory": "Kit Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Kit Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/264572/3EEF2A65C2D7F72CE0630300A8C0443F",
    "images": [
      "https://cdn.oderco.com.br/produtos/264572/3EEF2A65C2D7F72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/264572/3EEF2A65C2D8F72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/264572/3EEF2A65C2DAF72CE0630300A8C0443F"
    ],
    "description": "O Kit Cooler Fan Sangue Frio 3 PCYES ARGB White Ghost Reverse 120mm 2200RPM 60CFM K3ARGBSF3WGRVBR PCYes foi desenvolvido para oferecer alta eficiência térmica com visual diferenciado em setups white. A versão Reverse proporciona melhor estética em montagens com fans invertidos, mantendo iluminação A…",
    "features": [
      "Versão Reverse ideal para montagem estética",
      "Fluxo de ar de até 60CFM",
      "Rotação de até 2200RPM",
      "Pressão estática de 2,47mmH2O",
      "Controle PWM inteligente",
      "Iluminação ARGB 5V sincronizável",
      "Rolamento FDB durável e silencioso",
      "Ideal para gabinetes e radiadores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "264572"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Cooler"
      }
    ],
    "seoSlug": "kit-cooler-fan-sangue-frio-3-argb-white-ghost-reverse-120mm-2200rpm-60cfm-k3argbsf3wgrvbr",
    "productUrl": "https://www.pcyes.com.br/kit-cooler-fan-sangue-frio-3-argb-white-ghost-reverse-120mm-2200rpm-60cfm-k3argbsf3wgrvbr",
    "inStock": true
  },
  {
    "id": 414,
    "sku": "253975",
    "name": "Cooler Fan PCYES Vision Black Vulcan 120mm 2000RPM 78CFM FVBV120",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.4,
    "reviews": 318,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/253975/3F9F1AE4EDA9A0D1E0630300A8C05422",
    "images": [
      "https://cdn.oderco.com.br/produtos/253975/3F9F1AE4EDA9A0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/253975/3F9F1AE4EDAAA0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/253975/3F9F1AE4EDABA0D1E0630300A8C05422"
    ],
    "description": "O Cooler Fan PCYES Vision Black Vulcan 120mm 2000RPM 78CFM FVBV120 foi desenvolvido para oferecer alto fluxo de ar e excelente pressão estática, sendo ideal para gabinetes de alto desempenho e aplicações em radiadores. Com estrutura robusta de 27mm de espessura, entrega maior eficiência na movimenta…",
    "features": [
      "Fluxo de ar elevado de até 78CFM",
      "Pressão estática de 2,68mmH2O",
      "Rotação de até 2000RPM",
      "Estrutura reforçada de 27mm",
      "Rolamento FDB durável e silencioso",
      "Ruído máximo de 29,9dB(A)",
      "Ideal para gabinetes e radiadores",
      "Design Black Vulcan robusto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "253975"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-vision-black-vulcan-120mm-2000rpm-78cfm-fvbv120",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-vision-black-vulcan-120mm-2000rpm-78cfm-fvbv120",
    "inStock": true
  },
  {
    "id": 415,
    "sku": "210410",
    "name": "Water Cooler PCYES Sangue Frio 3 ARGB White Ghost 120mm TDP 200W ARGBSF3120WGBR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.5,
    "reviews": 355,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210410/3D7292BA47F9A9BFE0630300A8C09253",
    "images": [
      "https://cdn.oderco.com.br/produtos/210410/3D7292BA47F9A9BFE0630300A8C09253",
      "https://cdn.oderco.com.br/produtos/210410/3D7292BA47FAA9BFE0630300A8C09253",
      "https://cdn.oderco.com.br/produtos/210410/3D7292BA47FBA9BFE0630300A8C09253"
    ],
    "description": "O Water Cooler PCYES Sangue Frio 3 ARGB White Ghost 120mm TDP 200W ARGBSF3120WGBR combina alta eficiência térmica com iluminação ARGB personalizável para elevar o nível do seu setup. Projetado para processadores com TDP de até 200W, garante estabilidade mesmo em cenários de alta carga e uso intenso.…",
    "features": [
      "Suporte para processadores até 200W TDP",
      "Radiador compacto de 120mm",
      "Bomba 2100RPM com rolamento cerâmico",
      "Fan até 2200RPM com 60CFM",
      "Pressão estática de 2,47mmH2O",
      "Iluminação ARGB 5V na bomba e fan",
      "Controle via placa-mãe ou controladora",
      "Compatível com Intel e AMD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210410"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-argb-white-ghost-120mm-tdp-200w-argbsf3120wgbr",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-argb-white-ghost-120mm-tdp-200w-argbsf3120wgbr",
    "inStock": true,
    "oldPrice": "R$ 412,88",
    "oldPriceNum": 412.88
  },
  {
    "id": 416,
    "sku": "264570",
    "name": "Cooler Fan PCYES Sangue Frio 3 ARGB White Ghost Reverse 120mm PWM 2200RPM 60CFM ARGBSF3WGRVBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.6,
    "reviews": 392,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/264570/3F92F24D2FB9251AE0630300A8C0FCFF",
    "images": [
      "https://cdn.oderco.com.br/produtos/264570/3F92F24D2FB9251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/264570/3F92F24D2FBA251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/264570/3F92F24D2FBB251AE0630300A8C0FCFF"
    ],
    "description": "O Cooler Fan PCYES Sangue Frio 3 ARGB White Ghost Reverse 120mm PWM 2200RPM 60CFM ARGBSF3WGRVBR foi projetado para entregar desempenho térmico elevado aliado a um visual diferenciado com fluxo de ar invertido (Reverse), ideal para montagens que priorizam estética interna sem comprometer a eficiência…",
    "features": [
      "Fluxo de ar invertido para melhor estética interna",
      "Até 60CFM de fluxo de ar",
      "Pressão estática de 2,47mmH2O",
      "Rotação de até 2200RPM",
      "Controle automático PWM 4 pinos",
      "Iluminação ARGB 5V sincronizável",
      "Rolamento FDB durável e silencioso",
      "Ideal para gabinetes e radiadores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "264570"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-sangue-frio-3-argb-white-ghost-reverse-120mm-2200rpm-60cfm-argbsf3wgrvbr",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-sangue-frio-3-argb-white-ghost-reverse-120mm-2200rpm-60cfm-argbsf3wgrvbr",
    "inStock": true
  },
  {
    "id": 417,
    "sku": "210397",
    "name": "Water Cooler PCYES Sangue Frio 3 White Ghost 120mm TDP 200W WCSF3120WGBR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.7,
    "reviews": 429,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210397/3D7FF909C0F930B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210397/3D7FF909C0F930B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210397/3D7FF909C0FA30B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210397/3D7FF909C0FB30B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler PCYES Sangue Frio 3 White Ghost 120mm TDP 200W WCSF3120WGBR foi desenvolvido para oferecer refrigeração eficiente com visual moderno e acabamento premium. Ideal para setups gamers e profissionais, suporta processadores com TDP de até 200W, garantindo estabilidade térmica mesmo sob alt…",
    "features": [
      "Suporte para processadores até 200W TDP",
      "Radiador de 120mm eficiente e compacto",
      "Bomba com rolamento cerâmico durável",
      "Fan com até 2200RPM e 60CFM",
      "Baixo ruído e alta estabilidade",
      "Compatível com Intel e AMD",
      "Visual White Ghost moderno",
      "Ideal para setups gamers e profissionais"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210397"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-white-ghost-120mm-tdp-200w-wcsf3120wgbr",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-white-ghost-120mm-tdp-200w-wcsf3120wgbr",
    "inStock": true
  },
  {
    "id": 418,
    "sku": "192914",
    "name": "Kit Cooler PCYES Fan Sangue Frio 3 ARGB White Ghost 120mm K3ARGBSF3WGBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.8,
    "reviews": 466,
    "category": "Refrigeração",
    "subcategory": "Kit Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Kit Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192914/3EEF2A65C2E9F72CE0630300A8C0443F",
    "images": [
      "https://cdn.oderco.com.br/produtos/192914/3EEF2A65C2E9F72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/192914/3EEF2A65C2EAF72CE0630300A8C0443F",
      "https://cdn.oderco.com.br/produtos/192914/3EEF2A65C2ECF72CE0630300A8C0443F"
    ],
    "description": "O Kit Cooler Fan PCYES Sangue Frio 3 ARGB White Ghost 120mm K3ARGBSF3WGBR foi desenvolvido para entregar alta performance térmica com iluminação personalizável e controle total do setup. Com fans de 120mm equipados com PWM 4 pinos e aRGB 3 pinos 5V, oferece equilíbrio ideal entre desempenho, silênci…",
    "features": [
      "Fluxo de ar de até 60CFM por fan",
      "Rotação de até 2200RPM",
      "Controle automático PWM 4 pinos",
      "Iluminação ARGB 5V personalizável",
      "Rolamento FDB durável e silencioso",
      "Controladora Light Core inclusa",
      "Compatível com placas-mãe Asus AsRock Gigabyte e MSI",
      "Fixação magnética para fácil instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192914"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Kit Cooler"
      }
    ],
    "seoSlug": "kit-cooler-fan-sangue-frio-3-argb-white-ghost-120mm-k3argbsf3wgbr",
    "productUrl": "https://www.pcyes.com.br/kit-cooler-fan-sangue-frio-3-argb-white-ghost-120mm-k3argbsf3wgbr",
    "inStock": true,
    "oldPrice": "R$ 145,49",
    "oldPriceNum": 145.49
  },
  {
    "id": 419,
    "sku": "192902",
    "name": "Cooler Fan PCYES Sangue Frio 3 Black Vulcan 120mm PWM 2200RPM 60CFM FSF3BR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.9,
    "reviews": 73,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192902/3F9F1AE4ED9DA0D1E0630300A8C05422",
    "images": [
      "https://cdn.oderco.com.br/produtos/192902/3F9F1AE4ED9DA0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/192902/3F9F1AE4ED9EA0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/192902/3F9F1AE4ED9FA0D1E0630300A8C05422"
    ],
    "description": "O Cooler Fan PCYES Sangue Frio 3 Black Vulcan 120mm PWM 2200RPM 60CFM FSF3BR foi desenvolvido para oferecer alto desempenho térmico aliado a durabilidade e visual moderno. Ideal para melhorar o fluxo de ar do gabinete ou potencializar sistemas com radiadores e coolers compatíveis, entrega excelente …",
    "features": [
      "Fluxo de ar de até 60CFM",
      "Rotação de até 2200RPM",
      "Controle automático PWM 4 pinos",
      "Pressão estática de 2,47mmH2O",
      "Rolamento FDB durável e silencioso",
      "Baixo ruído (18 ~ 35,2dB)",
      "Ideal para gabinetes e radiadores",
      "Design Black Vulcan moderno"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192902"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-sangue-frio-3-black-vulcan-120mm-pwm-2200rpm-60cfm-fsf3br",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-sangue-frio-3-black-vulcan-120mm-pwm-2200rpm-60cfm-fsf3br",
    "inStock": true
  },
  {
    "id": 420,
    "sku": "131476",
    "name": "Cabo Adaptador Splitter PCYES PWM 1x4 4 Pinos SPTPWM4PCY",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.4,
    "reviews": 110,
    "category": "Periféricos",
    "subcategory": "Cabo Splitter",
    "tags": [
      "Periféricos",
      "Cabo Splitter"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/131476/E92EF1037A5A0B7DE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/131476/E92EF1037A5A0B7DE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/131476/E92EF1037A5B0B7DE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/131476/E92EF1037A5C0B7DE055DEF401E782F4"
    ],
    "description": "O Cabo Adaptador Splitter PCYES PWM 1x4 4 Pinos SPTPWM4PCY é a solução ideal para expandir as conexões de ventilação do seu setup com praticidade e eficiência. Desenvolvido para permitir que você utilize apenas uma porta PWM da placa-mãe para conectar até quatro fans, ele garante melhor aproveitamen…",
    "features": [
      "Expande 1 conexão PWM para até 4 fans",
      "Controle automático via placa-mãe",
      "Melhora o fluxo de ar do gabinete",
      "Instalação simples e organizada",
      "Ideal para upgrades e setups gamers",
      "Sincronização total entre os fans"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "131476"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo Splitter"
      }
    ],
    "seoSlug": "cabo-adaptador-splitter-pwm-1x4-4-pinos-sptpwm4pcy",
    "productUrl": "https://www.pcyes.com.br/cabo-adaptador-splitter-pwm-1x4-4-pinos-sptpwm4pcy",
    "inStock": true,
    "oldPrice": "R$ 70,68",
    "oldPriceNum": 70.68
  },
  {
    "id": 421,
    "sku": "275610",
    "name": "Contact Frame PCYES ABF 17 Moldura Anti Empenamento LGA 1700",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 147,
    "category": "Refrigeração",
    "subcategory": "Contact Frame",
    "tags": [
      "Refrigeração",
      "Contact Frame"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/275610/2DE360053FE5A37FE0630300A8C0CB25",
    "images": [
      "https://cdn.oderco.com.br/produtos/275610/2DE360053FE5A37FE0630300A8C0CB25",
      "https://cdn.oderco.com.br/produtos/275610/2DE360053FE8A37FE0630300A8C0CB25",
      "https://cdn.oderco.com.br/produtos/275610/373ED3BD2EFAACC9E0630300A8C02A2A"
    ],
    "description": "O Contact Frame PCYES ABF 17 Moldura Anti Empenamento LGA 1700 foi desenvolvido para melhorar a fixação e o desempenho térmico de processadores Intel com socket LGA 1700. Sua estrutura substitui o sistema de retenção padrão, reduzindo a pressão irregular que pode causar empenamento do processador.\n…",
    "features": [
      "Previne empenamento do processador",
      "Melhora o contato com o cooler",
      "Otimiza a dissipação térmica",
      "Evita excesso de pasta térmica",
      "Instalação simples e segura",
      "Não gera conflito com componentes",
      "Ideal para setups de alto desempenho"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "275610"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Contact Frame"
      }
    ],
    "seoSlug": "contact-frame-abf-17-moldura-anti-empenamento-lga-1700",
    "productUrl": "https://www.pcyes.com.br/contact-frame-abf-17-moldura-anti-empenamento-lga-1700",
    "inStock": true
  },
  {
    "id": 422,
    "sku": "131477",
    "name": "Cabo Adaptador Splitter PCYES ARGB 1x4 3 Pinos 35cm SPTARGB4PCY",
    "price": "R$ 59,90",
    "priceNum": 59.9,
    "rating": 4.6,
    "reviews": 184,
    "category": "Periféricos",
    "subcategory": "Cabo Splitter",
    "tags": [
      "Gaming",
      "RGB",
      "Periféricos",
      "Cabo Splitter"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/131477/E92EF1037A5F0B7DE055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/131477/E92EF1037A5F0B7DE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/131477/E92EF1037A600B7DE055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/131477/E92EF1037A610B7DE055DEF401E782F4"
    ],
    "description": "O Cabo Adaptador Splitter PCYES ARGB 1x4 3 Pinos 35cm SPTARGB4PCY foi desenvolvido para expandir a conectividade de iluminação do seu setup de forma prática e eficiente. Ideal para quem possui apenas uma conexão aRGB disponível na placa-mãe, permite ligar até quatro dispositivos compatíveis utilizan…",
    "features": [
      "Expande 1 conexão ARGB para até 4 dispositivos",
      "Sincronização direta via software da placa-mãe",
      "Ideal para fans e acessórios ARGB",
      "Instalação simples e organizada",
      "Melhora o acabamento interno do gabinete",
      "Iluminação uniforme em todos os dispositivos",
      "Especificações Técnicas"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "131477"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cabo Splitter"
      }
    ],
    "seoSlug": "cabo-adaptador-splitter-argb-1x4-3-pinos-35cm-sptargb4pcy",
    "productUrl": "https://www.pcyes.com.br/cabo-adaptador-splitter-argb-1x4-3-pinos-35cm-sptargb4pcy",
    "inStock": true
  },
  {
    "id": 423,
    "sku": "211540",
    "name": "Controlador Fan PCYES Light Core White 9x PWM + ARGB PELC9PGBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.7,
    "reviews": 221,
    "category": "Refrigeração",
    "subcategory": "Controlador Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Controlador Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/211540/1492420BBD469034E0630300A8C0B369",
    "images": [
      "https://cdn.oderco.com.br/produtos/211540/1492420BBD469034E0630300A8C0B369",
      "https://cdn.oderco.com.br/produtos/211540/1492420BBD479034E0630300A8C0B369",
      "https://cdn.oderco.com.br/produtos/211540/1492420BBD499034E0630300A8C0B369"
    ],
    "description": "O Controlador Fan PCYES Light Core White 9x PWM + ARGB PELC9PGBR foi desenvolvido para oferecer controle total da iluminação e ventilação do seu setup. Compatível com até 9 fans PWM e 9 dispositivos aRGB 3 pinos, centraliza a organização e garante sincronização completa dos efeitos.\n\nCom controle …",
    "features": [
      "Suporte para até 9 fans PWM",
      "9 portas aRGB 3 pinos (5V)",
      "Controle remoto incluso",
      "Sincronização com placa-mãe",
      "Dezenas de efeitos pré-programados",
      "Fixação magnética prática",
      "Alimentação via SATA",
      "Visual White moderno"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "211540"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Controlador Fan"
      }
    ],
    "seoSlug": "controlador-fan-light-core-white-9x-pwm-argb-pelc9pgbr",
    "productUrl": "https://www.pcyes.com.br/controlador-fan-light-core-white-9x-pwm-argb-pelc9pgbr",
    "inStock": true
  },
  {
    "id": 424,
    "sku": "192904",
    "name": "Cooler Fan PCYES Sangue Frio 3 White Ghost 120mm PWM 2200RPM 60CFM FSF3WGBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.8,
    "reviews": 258,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192904/3F9F1AE4EDA2A0D1E0630300A8C05422",
    "images": [
      "https://cdn.oderco.com.br/produtos/192904/3F9F1AE4EDA2A0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/192904/3F9F1AE4EDA3A0D1E0630300A8C05422",
      "https://cdn.oderco.com.br/produtos/192904/3F9F1AE4EDA6A0D1E0630300A8C05422"
    ],
    "description": "O Cooler Fan PCYES Sangue Frio 3 White Ghost 120mm PWM 2200RPM 60CFM FSF3WGBR foi desenvolvido para entregar alta performance térmica com excelente durabilidade e visual moderno. Ideal para melhorar o fluxo de ar do gabinete ou potencializar sistemas com radiadores e coolers compatíveis, oferece equ…",
    "features": [
      "Fluxo de ar de até 60CFM",
      "Rotação de até 2200RPM",
      "Controle automático PWM 4 pinos",
      "Pressão estática de 2,47mmH2O",
      "Rolamento FDB durável e silencioso",
      "Baixo ruído (18 ~ 35,2dB)",
      "Ideal para gabinetes e radiadores",
      "Design White Ghost moderno"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192904"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-sangue-frio-3-white-ghost-120mm-pwm-fsf3wgbr",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-sangue-frio-3-white-ghost-120mm-pwm-fsf3wgbr",
    "inStock": true
  },
  {
    "id": 425,
    "sku": "210395",
    "name": "Water Cooler PCYES Sangue Frio 3 Black Vulcan 120mm TDP 200W WCSF3120BR",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.9,
    "reviews": 295,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210395/3D7FF909C0E730B1E0630300A8C042C0",
    "images": [
      "https://cdn.oderco.com.br/produtos/210395/3D7FF909C0E730B1E0630300A8C042C0",
      "https://cdn.oderco.com.br/produtos/210395/3D7FF909C0E930B1E0630300A8C042C0"
    ],
    "description": "O Water Cooler PCYES Sangue Frio 3 Black Vulcan 120mm TDP 200W WCSF3120BR combina design exclusivo com desempenho eficiente para setups gamers e profissionais. Desenvolvido 100% pela PCYES, mantém a qualidade da linha Sangue Frio com visual Black Vulcan moderno e robusto.\n\nCom radiador de 120mm em…",
    "features": [
      "Radiador 120mm ideal para gabinetes compactos",
      "Suporte para CPUs até 200W TDP",
      "Chapa fria em cobre para melhor transferência térmica",
      "Bomba 2100RPM com rolamento cerâmico",
      "Fan 120mm PWM incluso",
      "Fluxo de ar de até 60CFM",
      "Rolamento hidráulico durável e silencioso",
      "Visual Black Vulcan exclusivo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210395"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-sangue-frio-3-black-vulcan-120mm-tdp-200w-wcsf3120br",
    "productUrl": "https://www.pcyes.com.br/water-cooler-sangue-frio-3-black-vulcan-120mm-tdp-200w-wcsf3120br",
    "inStock": true,
    "oldPrice": "R$ 412,88",
    "oldPriceNum": 412.88
  },
  {
    "id": 426,
    "sku": "316748",
    "name": "Water Cooler PCYES Tundra White Ghost ARGB 120mm TDP 150W WCTWG120",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.4,
    "reviews": 332,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316748/49DBECEF134CFBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316748/49DBECEF134CFBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316748/49DBECEF134DFBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316748/49DBECEF134EFBC2E0630300A8C00897"
    ],
    "description": "O Water Cooler PCYES Tundra White Ghost ARGB 120mm TDP 150W WCTWG120 é a solução ideal para quem busca refrigeração líquida eficiente em setups compactos. Compatível com Intel e AMD, incluindo LGA 1700 e AM5, oferece versatilidade para upgrades e novas montagens.\n\nSeu radiador de 120mm em alumínio…",
    "features": [
      "Radiador 120mm ideal para gabinetes compactos",
      "Suporte para CPUs até 150W TDP",
      "Chapa fria em cobre para melhor dissipação",
      "Bomba 2600RPM com rolamento cerâmico",
      "Fan 120mm PWM incluso",
      "Até 67,3CFM de airflow",
      "Iluminação aRGB 3 pinos",
      "Tubos de 380mm para fácil instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316748"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-tundra-white-ghost-argb-120mm-tdp-150w-wctwg120",
    "productUrl": "https://www.pcyes.com.br/water-cooler-tundra-white-ghost-argb-120mm-tdp-150w-wctwg120",
    "inStock": true
  },
  {
    "id": 427,
    "sku": "316749",
    "name": "Water Cooler PCYES Tundra White Ghost Argb 240 Mm Wctwg 240",
    "price": "R$ 349,90",
    "priceNum": 349.9,
    "rating": 4.5,
    "reviews": 369,
    "category": "Refrigeração",
    "subcategory": "Water Cooler",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Water Cooler"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316749/49DBECEF1352FBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316749/49DBECEF1352FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316749/49DBECEF1353FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316749/49DBECEF1351FBC2E0630300A8C00897"
    ],
    "description": "O Water Cooler PCYES Tundra White Ghost ARGB 240mm TDP 250W WCTWG240 foi desenvolvido para entregar alta performance térmica com visual premium White Ghost. Ideal para setups gamers e profissionais, suporta processadores com TDP de até 250W, garantindo estabilidade mesmo sob cargas intensas.\n\nCont…",
    "features": [
      "Radiador 240mm alto desempenho",
      "Suporte para CPUs até 250W TDP",
      "Chapa fria em cobre para melhor dissipação",
      "Bomba 2600RPM com rolamento cerâmico",
      "2 fans 120mm PWM inclusos",
      "Até 67,3CFM de airflow por fan",
      "Iluminação aRGB 3 pinos",
      "Tubos de 400mm para fácil instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316749"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Water Cooler"
      }
    ],
    "seoSlug": "water-cooler-tundra-white-ghost-argb-240mm-tdp-250w-wctwg240",
    "productUrl": "https://www.pcyes.com.br/water-cooler-tundra-white-ghost-argb-240mm-tdp-250w-wctwg240",
    "inStock": true
  },
  {
    "id": 428,
    "sku": "216124",
    "name": "Cooler para Processador PCYES Nótus ST17 LGA 1700 TDP 65W ST1765W",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.6,
    "reviews": 406,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/216124/3EF0D4FA2B49AA25E0630300A8C0F6C4",
    "images": [
      "https://cdn.oderco.com.br/produtos/216124/3EF0D4FA2B49AA25E0630300A8C0F6C4",
      "https://cdn.oderco.com.br/produtos/216124/3EF0D4FA2B4BAA25E0630300A8C0F6C4"
    ],
    "description": "O Cooler para Processador PCYES Nótus ST17 LGA 1700 TDP 65W ST1765W foi desenvolvido para oferecer refrigeração eficiente e confiável para processadores Intel de 12ª, 13ª e 14ª geração compatíveis com soquete LGA 1700. Compacto e funcional, é ideal para setups domésticos, corporativos e upgrades.\n…",
    "features": [
      "Compatível exclusivamente com Intel LGA 1700",
      "Suporte para processadores até 65W TDP",
      "Estrutura em alumínio leve e eficiente",
      "Fan com controle PWM 4 pinos",
      "Rotação de 600 a 2200RPM",
      "Fluxo de ar de até 45.8CFM",
      "Baixo ruído (14.2 ~ 25.8dB)",
      "Design compacto para fácil instalação"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "216124"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-notus-st17-lga-1700-tdp-65w-st1765w",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-notus-st17-lga-1700-tdp-65w-st1765w",
    "inStock": true
  },
  {
    "id": 429,
    "sku": "316756",
    "name": "Cooler para Processador PCYES Tundra 120 Black Vulcan LED Rainbow TDP 160W ACTBKA120",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.7,
    "reviews": 443,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316756/49DBECEF1368FBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316756/49DBECEF1368FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316756/49DBECEF1369FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316756/49DBECEF136AFBC2E0630300A8C00897"
    ],
    "description": "O Cooler para Processador PCYES Tundra 120 Black Vulcan LED Rainbow TDP 160W ACTBKA120 combina alta eficiência térmica com visual gamer moderno. Compatível com plataformas Intel e AMD, incluindo LGA 1700 e AM5, é ideal para upgrades e montagens de desempenho intermediário e avançado.\n\nSeu dissipad…",
    "features": [
      "Compatível com Intel LGA 20XX / 1366 / 1700 / 1851 / 1954 / 1200 / 115X",
      "Compatível com AMD AM4 e AM5",
      "Suporte para processadores até 160W",
      "4 heatpipes de cobre 6mm com contato direto",
      "Fan 120mm de 1200RPM",
      "Airflow de 45CFM",
      "Ruído de apenas 24 dBA",
      "Iluminação LED Rainbow"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316756"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-tundra-120-black-vulcan-led-rainbow-tdp-160w-actbka120",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-tundra-120-black-vulcan-led-rainbow-tdp-160w-actbka120",
    "inStock": true,
    "oldPrice": "R$ 145,49",
    "oldPriceNum": 145.49
  },
  {
    "id": 430,
    "sku": "316753",
    "name": "Cooler para Processador PCYES Tundra 120 Black Vulcan TDP 160W ACTBK120",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.8,
    "reviews": 50,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316753/49DBECEF1362FBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316753/49DBECEF1362FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316753/49DBECEF1363FBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316753/49DBECEF1365FBC2E0630300A8C00897"
    ],
    "description": "O Cooler para Processador PCYES Tundra 120 Black Vulcan TDP 160W ACTBK120 é a escolha ideal para quem busca alto desempenho térmico com excelente custo-benefício. Compatível com plataformas Intel e AMD, incluindo LGA 1700 e AM5, garante ampla versatilidade para upgrades e novas configurações.\n\nSeu…",
    "features": [
      "Compatível com Intel LGA 20XX / 1366 / 1700 / 1851 / 1954 / 1200 / 115X",
      "Compatível com AMD AM4 e AM5",
      "Suporte para processadores até 160W",
      "4 heatpipes de cobre 6mm com contato direto",
      "Fan 120mm com controle PWM",
      "Rotação de 600 a 1600RPM",
      "Airflow de até 63CFM",
      "Baixo ruído de 14 a 26 dBA"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316753"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-tundra-120-black-vulcan-tdp-160w-actbk120",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-tundra-120-black-vulcan-tdp-160w-actbk120",
    "inStock": true,
    "oldPrice": "R$ 153,28",
    "oldPriceNum": 153.28
  },
  {
    "id": 431,
    "sku": "192912",
    "name": "Cooler Fan PCYES Sangue Frio 3 ARGB White Ghost 120mm ARGBSF3WGBR",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.9,
    "reviews": 87,
    "category": "Refrigeração",
    "subcategory": "Cooler Fan",
    "tags": [
      "Gaming",
      "RGB",
      "Refrigeração",
      "Cooler Fan"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192912/3F92F24D2FAC251AE0630300A8C0FCFF",
    "images": [
      "https://cdn.oderco.com.br/produtos/192912/3F92F24D2FAC251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/192912/3F92F24D2FAD251AE0630300A8C0FCFF",
      "https://cdn.oderco.com.br/produtos/192912/3F92F24D2FAF251AE0630300A8C0FCFF"
    ],
    "description": "O Cooler Fan PCYES Sangue Frio 3 ARGB White Ghost 120mm ARGBSF3WGBR foi 100% desenvolvido pela PCYES para entregar alto desempenho com visual diferenciado. Ideal para gabinetes, radiadores e coolers compatíveis, proporciona fluxo de ar eficiente e controle inteligente de rotação.\n\nCom velocidade v…",
    "features": [
      "Fan 120mm alto desempenho",
      "Fluxo de ar de até 60CFM",
      "Pressão estática de 2,47mmH2O",
      "Rotação de 700 a 2200RPM (PWM)",
      "Controle inteligente PWM 4 pinos",
      "Iluminação aRGB 5V 3 pinos",
      "Rolamento FDB (Fluído Dinâmico)",
      "Ideal para gabinete e radiadores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192912"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler Fan"
      }
    ],
    "seoSlug": "cooler-fan-sangue-frio-3-argb-white-ghost-120mm-argbsf3wgbr",
    "productUrl": "https://www.pcyes.com.br/cooler-fan-sangue-frio-3-argb-white-ghost-120mm-argbsf3wgbr",
    "inStock": true
  },
  {
    "id": 432,
    "sku": "316751",
    "name": "Cooler para Processador PCYES Tundra 90 Black Vulcan LED Rainbow TDP 115W ACTBKA90",
    "price": "R$ 129,90",
    "priceNum": 129.9,
    "rating": 4.4,
    "reviews": 124,
    "category": "Refrigeração",
    "subcategory": "Cooler para Processador",
    "tags": [
      "Refrigeração",
      "Cooler para Processador"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/316751/49DBECEF135DFBC2E0630300A8C00897",
    "images": [
      "https://cdn.oderco.com.br/produtos/316751/49DBECEF135DFBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316751/49DBECEF135EFBC2E0630300A8C00897",
      "https://cdn.oderco.com.br/produtos/316751/49DBECEF135FFBC2E0630300A8C00897"
    ],
    "description": "O Cooler para Processador PCYES Tundra 90 Black Vulcan LED Rainbow TDP 115W ACTBKA90 é a solução ideal para quem busca refrigeração eficiente com visual gamer. Compatível com plataformas Intel e AMD, incluindo LGA 1700 e AM5, oferece ampla versatilidade para upgrades e novas montagens.\n\nSeu dissip…",
    "features": [
      "Compatível com Intel LGA 1700 / 1200 / 115X e outros",
      "Compatível com AMD AM4 e AM5",
      "Suporte para processadores até 115W TDP",
      "2 heatpipes de cobre 6mm com contato direto",
      "Fan 90mm até 2200RPM",
      "Airflow de 48CFM",
      "Baixo ruído de 23 dBA",
      "Iluminação LED Rainbow"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "316751"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cooler para Processador"
      }
    ],
    "seoSlug": "cooler-para-processador-tundra-90-black-vulcan-led-rainbow-tdp-115w-actbka90",
    "productUrl": "https://www.pcyes.com.br/cooler-para-processador-tundra-90-black-vulcan-led-rainbow-tdp-115w-actbka90",
    "inStock": true
  },
  {
    "id": 433,
    "sku": "305495",
    "name": "Placa de Vídeo RTX 3060 12GB GDDR6 PCYES 192-bit Dual Fan Projeto Edge Black PVRTX3060BL2F",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 161,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Gaming",
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/305495/47A45C4DC541919FE0630300A8C07C9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/305495/47A45C4DC541919FE0630300A8C07C9A",
      "https://cdn.oderco.com.br/produtos/305495/47A45C4DC542919FE0630300A8C07C9A",
      "https://cdn.oderco.com.br/produtos/305495/47A45C4DC545919FE0630300A8C07C9A"
    ],
    "description": "A Placa de Vídeo RTX 3060 12GB GDDR6 foi desenvolvida para entregar alto desempenho em jogos modernos e aplicações gráficas exigentes. Equipada com arquitetura NVIDIA Ampere e 3584 núcleos CUDA, oferece excelente performance em resoluções Full HD e Quad HD, garantindo fluidez e qualidade visual.\n\n…",
    "features": [
      "Alto desempenho com arquitetura NVIDIA Ampere",
      "12GB GDDR6 ideal para jogos e criação de conteúdo",
      "Ray Tracing para gráficos mais realistas",
      "Dual Fan para melhor dissipação de calor",
      "Ótima performance em Full HD e Quad HD",
      "Compatível com DirectX 12 e OpenGL 4.6"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "305495"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-de-video-rtx-3060-12gb-gddr6-192bit",
    "productUrl": "https://www.pcyes.com.br/placa-de-video-rtx-3060-12gb-gddr6-192bit",
    "inStock": true
  },
  {
    "id": 434,
    "sku": "333089",
    "name": "Gpu Nvidia Geforce Rtx 3050 6Gb Gddr6 96Bits PCYES Pvpcr30506Gb2F",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.6,
    "reviews": 198,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Gaming",
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/333089/485AE3CF8F448A1DE0630300A8C00682",
    "images": [
      "https://cdn.oderco.com.br/produtos/333089/485AE3CF8F448A1DE0630300A8C00682",
      "https://cdn.oderco.com.br/produtos/333089/485AE3CF8F458A1DE0630300A8C00682",
      "https://cdn.oderco.com.br/produtos/333089/485AE3CF8F488A1DE0630300A8C00682"
    ],
    "description": "A Placa de Vídeo RTX 3050 6GB GDDR6 PCYES foi desenvolvida para entregar desempenho sólido em jogos e aplicações gráficas com excelente eficiência energética. Com arquitetura NVIDIA e 2304 núcleos CUDA, oferece boa performance em jogos em Full HD, garantindo fluidez e qualidade visual.\n\nEquipada c…",
    "features": [
      "Desempenho eficiente para jogos em Full HD",
      "6GB GDDR6 para boa performance gráfica",
      "Baixo consumo sem necessidade de conector de energia",
      "Arquitetura NVIDIA com suporte a DirectX 12",
      "Design compacto ideal para upgrades",
      "Compatibilidade com múltiplos monitores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "333089"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-de-video-rtx-3050-6gb-96bit-pcyes",
    "productUrl": "https://www.pcyes.com.br/placa-de-video-rtx-3050-6gb-96bit-pcyes",
    "inStock": true
  },
  {
    "id": 435,
    "sku": "305499",
    "name": "Placa de Vídeo RTX 3060 12GB GDDR6 PCYES 192-bit Dual Fan Projeto Edge White PVRTX3060WT2F",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.7,
    "reviews": 235,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Gaming",
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/305499/47A45C4DC546919FE0630300A8C07C9A",
    "images": [
      "https://cdn.oderco.com.br/produtos/305499/47A45C4DC546919FE0630300A8C07C9A",
      "https://cdn.oderco.com.br/produtos/305499/47A45C4DC547919FE0630300A8C07C9A",
      "https://cdn.oderco.com.br/produtos/305499/47A45C4DC54A919FE0630300A8C07C9A"
    ],
    "description": "A Placa de Vídeo RTX 3060 12GB GDDR6 PCYES foi desenvolvida para oferecer alto desempenho em jogos modernos e aplicações gráficas exigentes. Com arquitetura baseada no chip GA106 e 3584 núcleos de processamento, entrega excelente performance em Full HD e Quad HD, garantindo fluidez e qualidade visua…",
    "features": [
      "Alto desempenho com arquitetura RTX",
      "12GB GDDR6 para jogos e aplicações pesadas",
      "Interface 192-bit para maior largura de banda",
      "Dual Fan para melhor refrigeração",
      "Ótima performance em Full HD e Quad HD",
      "Compatível com DirectX 12 e OpenGL 4.6"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "305499"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-de-video-rtx-3060-12gb-192bit-pcyes-wt2f",
    "productUrl": "https://www.pcyes.com.br/placa-de-video-rtx-3060-12gb-192bit-pcyes-wt2f",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 436,
    "sku": "318445",
    "name": "Gabinete Gamer PCYES Forcefield Dome White Ghost GFFDWG",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.8,
    "reviews": 272,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/318445/448370870FD16674E0630300A8C0BB98",
    "images": [
      "https://cdn.oderco.com.br/produtos/318445/448370870FD16674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318445/448370870FD26674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318445/448370870FD36674E0630300A8C0BB98"
    ],
    "description": "O Gabinete Gamer Forcefield Dome White Ghost GFFDWG PCYes foi desenvolvido para setups premium que valorizam design sofisticado e alto desempenho. Com frontal, lateral e painel superior em vidro temperado, proporciona visual panorâmico e acabamento refinado, ideal para destacar componentes e ilumina…",
    "features": [
      "Vidro temperado frontal, lateral e superior",
      "Chassi reforçado de 0,7mm",
      "Suporte para GPU de até 420mm",
      "Compatível com placas-mãe ATX com conectores traseiros",
      "Fita LED ARGB integrada",
      "Compatível com placa de vídeo vertical",
      "Painel frontal com USB-C 3.2 Gen2"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "318445"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-dome-white-ghost-gffdwg",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-dome-white-ghost-gffdwg",
    "inStock": true
  },
  {
    "id": 437,
    "sku": "318391",
    "name": "Gabinete Gamer PCYES Forcefield Flow White Ghost GFFFWG",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.9,
    "reviews": 309,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/318391/448370870FDB6674E0630300A8C0BB98",
    "images": [
      "https://cdn.oderco.com.br/produtos/318391/448370870FDB6674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318391/448370870FDC6674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318391/448370870FDD6674E0630300A8C0BB98"
    ],
    "description": "O Gabinete Gamer Forcefield Flow White Ghost GFFFWG PCYes foi desenvolvido para setups premium que combinam alto desempenho térmico e visual clean. Com frontal e lateral em vidro temperado, proporciona acabamento sofisticado e ampla exibição dos componentes, ideal para builds com iluminação ARGB.\n…",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Chassi reforçado de 0,7mm",
      "Suporte para GPU de até 420mm",
      "Compatível com placas-mãe ATX com conectores traseiros",
      "Fita LED ARGB integrada",
      "Compatível com GPU vertical",
      "Painel frontal com USB-C 3.2 Gen2"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "318391"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-flow-white-ghost",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-flow-white-ghost",
    "inStock": true
  },
  {
    "id": 438,
    "sku": "318390",
    "name": "Gabinete Gamer PCYES Forcefield Flow Black Vulcan GFFFBV",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.4,
    "reviews": 346,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/318390/448370870FD66674E0630300A8C0BB98",
    "images": [
      "https://cdn.oderco.com.br/produtos/318390/448370870FD66674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318390/448370870FD76674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318390/448370870FD86674E0630300A8C0BB98"
    ],
    "description": "O Gabinete Gamer Forcefield Flow Black Vulcan GFFFBV PCYes foi desenvolvido para setups premium que exigem alto desempenho térmico e visual imponente. Com frontal e lateral em vidro temperado, oferece acabamento sofisticado e ampla exibição dos componentes internos, ideal para builds com iluminação …",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Chassi reforçado de 0,7mm",
      "Suporte para GPU de até 420mm",
      "Compatível com placas-mãe ATX com conectores traseiros",
      "Fita LED ARGB integrada",
      "Compatível com GPU vertical",
      "Painel frontal com USB-C 3.2 Gen2"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "318390"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-flow-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-flow-black-vulcan",
    "inStock": true
  },
  {
    "id": 439,
    "sku": "252558",
    "name": "Gabinete Gamer PCYES Forcefield Max White Ghost GFFMAXWG",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 383,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252558/3F00DCAA20BC6D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/252558/3F00DCAA20BC6D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252558/3F00DCAA20BD6D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252558/3F00DCAA20BE6D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Forcefield Max White Ghost GFFMAXWG PCYes foi desenvolvido para setups robustos que exigem espaço interno, refrigeração eficiente e visual moderno. No formato Mid Tower, é compatível com placas-mãe ATX, Micro ATX e Mini ITX, oferecendo ampla versatilidade para diferentes configuraçõ…",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Chassi reforçado de 0,7mm",
      "Suporte para GPU de até 410mm",
      "Compatível com placas-mãe ATX, Micro ATX e Mini ITX",
      "Suporte para water cooler lateral até 360mm",
      "Estrutura ideal para setups de alto desempenho",
      "Visual White Ghost moderno e elegante"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252558"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-max-white-ghost",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-max-white-ghost",
    "inStock": true
  },
  {
    "id": 440,
    "sku": "191996",
    "name": "Gabinete Gamer PCYES Bolter White Ghost Vidro Lateral",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.6,
    "reviews": 420,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/191996/3F00DCAA20D46D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/191996/3F00DCAA20D46D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191996/3F00DCAA20D56D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191996/3F00DCAA20D66D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Bolter White Ghost PCYes é ideal para quem busca um setup moderno, funcional e com excelente compatibilidade. No formato Mid Tower, suporta placas-mãe Mini ITX, Micro ATX e ATX, oferecendo versatilidade para diferentes configurações, desde builds intermediárias até setups mais compl…",
    "features": [
      "Lateral em vidro temperado",
      "Compatível com placas-mãe ATX, Micro ATX e Mini ITX",
      "Suporte para GPU de até 310mm",
      "Suporte para water cooler frontal até 360mm",
      "Estrutura com chassi 0,5mm",
      "Painel frontal com USB 3.0 e USB 2.0",
      "Visual White Ghost moderno e clean"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "191996"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-bolter-white-ghost-vidro-lateral",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-bolter-white-ghost-vidro-lateral",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 441,
    "sku": "318444",
    "name": "Gabinete Gamer PCYES Forcefield Dome Black Vulcan GFFDBV",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.7,
    "reviews": 457,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/318444/448370870FCC6674E0630300A8C0BB98",
    "images": [
      "https://cdn.oderco.com.br/produtos/318444/448370870FCC6674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318444/448370870FCD6674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/318444/448370870FCE6674E0630300A8C0BB98"
    ],
    "description": "O Gabinete Gamer Forcefield Dome Black Vulcan GFFDBV PCYes foi projetado para setups premium que exigem máximo impacto visual e alta compatibilidade. Com frontal, lateral e painel superior em vidro temperado, entrega acabamento sofisticado e ampla exibição dos componentes internos.\n\nSeu chassi ref…",
    "features": [
      "Vidro temperado frontal, lateral e superior",
      "Chassi reforçado de 0,7mm",
      "Suporte para GPU até 420mm",
      "Compatível com placas-mãe ATX (conectores traseiros)",
      "Fita LED ARGB integrada",
      "Suporte para placa de vídeo vertical",
      "Painel com USB-C 3.2 Gen2"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "318444"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-dome-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-dome-black-vulcan",
    "inStock": true
  },
  {
    "id": 442,
    "sku": "191994",
    "name": "Gabinete Gamer PCYES Set White Ghost Vidro Lateral GSWGPBR",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.8,
    "reviews": 64,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/191994/3F00DCAA20DF6D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/191994/3F00DCAA20DF6D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191994/3F00DCAA20E06D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191994/3F00DCAA20E16D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Set White Ghost PCYes foi desenvolvido para quem deseja montar um setup completo com visual moderno e excelente compatibilidade. No formato Mid Tower, ele suporta placas-mãe Mini ITX, Micro ATX e ATX, oferecendo maior liberdade na escolha dos componentes.\n\nSua lateral em vidro tem…",
    "features": [
      "Lateral em vidro temperado",
      "Compatível com placas-mãe ATX, Micro ATX e Mini ITX",
      "Suporte para GPU de até 310mm",
      "Suporte para water cooler frontal até 360mm",
      "Estrutura com chassi 0,5mm",
      "Painel frontal com USB 3.0 e USB 2.0",
      "Visual White Ghost moderno"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "191994"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-set-white-ghost-vidro-lateral",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-set-white-ghost-vidro-lateral",
    "inStock": true
  },
  {
    "id": 443,
    "sku": "252556",
    "name": "Gabinete Gamer PCYES Forcefield TWR White Ghost Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.9,
    "reviews": 101,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252556/3F00DCAA20C16D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/252556/3F00DCAA20C16D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252556/3F00DCAA20C26D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252556/3F00DCAA20C36D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Forcefield TWR White Ghost PCYes foi projetado para quem busca um setup moderno, compacto e eficiente em refrigeração. No formato Mid Tower, ele é compatível com placas-mãe Mini ITX e Micro ATX, oferecendo organização interna prática para builds equilibradas.\n\nCom frontal e latera…",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Visual White Ghost moderno e clean",
      "Suporte para GPU de até 380mm",
      "Compatível com placas-mãe Mini ITX e Micro ATX",
      "Altura para CPU cooler de até 165mm",
      "Compatível com water cooler lateral até 240mm",
      "Painel frontal com USB 3.0 e áudio HD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252556"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-twr-white-ghost",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-twr-white-ghost",
    "inStock": true
  },
  {
    "id": 444,
    "sku": "337115",
    "name": "Gabinete Gamer PCYES Forcefield V2 White Ghost Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.4,
    "reviews": 138,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/337115/488712FD41D4C445E0630300A8C0BCA5",
    "images": [
      "https://cdn.oderco.com.br/produtos/337115/488712FD41D4C445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337115/497257DF309E92D3E0630300A8C06DDE",
      "https://cdn.oderco.com.br/produtos/337115/488712FD41D5C445E0630300A8C0BCA5"
    ],
    "description": "O Gabinete Gamer Forcefield V2 White Ghost PCYes foi desenvolvido para quem busca desempenho térmico, espaço interno e visual clean em um setup moderno. No formato Mid Tower, é compatível com placas-mãe Mini ITX e Micro ATX, oferecendo excelente organização e aproveitamento interno.\n\nCom frontal e…",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Visual White Ghost moderno e clean",
      "Suporte para GPU de até 410mm",
      "Compatível com placas-mãe Mini ITX e Micro ATX",
      "Suporte para fans 120mm e 140mm",
      "Compatível com water cooler até 360mm",
      "Painel frontal com USB 3.0 e áudio HD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "337115"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-v2-white-ghost",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-v2-white-ghost",
    "inStock": true
  },
  {
    "id": 445,
    "sku": "337123",
    "name": "Gabinete Gamer PCYES Forcefield Mini White Ghost Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 175,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/337123/488712FD41C8C445E0630300A8C0BCA5",
    "images": [
      "https://cdn.oderco.com.br/produtos/337123/488712FD41C8C445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337123/488712FD41C9C445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337123/488712FD41CAC445E0630300A8C0BCA5"
    ],
    "description": "O Gabinete Gamer Forcefield Mini White Ghost PCYes é a escolha ideal para quem busca um setup compacto, moderno e eficiente. No formato Mini Tower, ele oferece excelente aproveitamento interno para configurações com placas-mãe Mini ITX e Micro ATX, mantendo dimensões reduzidas sem abrir mão da perfo…",
    "features": [
      "Formato Mini Tower compacto",
      "Frontal e lateral em vidro temperado",
      "Ideal para placas-mãe Mini ITX e Micro ATX",
      "Suporte para GPU de até 310mm",
      "Compatível com water cooler lateral até 240mm",
      "Múltiplas posições para fans de 120mm",
      "Painel frontal com USB 3.0 e áudio HD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "337123"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-mini-white-ghost",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-mini-white-ghost",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 446,
    "sku": "299948",
    "name": "Cadeira Gamer PCYES Ergonômica Maringá FC Limited Edition PCMGAFC",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 212,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/299948/3C1B41C611E7F40EE0630300A8C0C57C",
    "images": [
      "https://cdn.oderco.com.br/produtos/299948/3C1B41C611E7F40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299948/3C1B41C611E8F40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299948/3C1B41C611E9F40EE0630300A8C0C57C"
    ],
    "description": "A Cadeira Gamer Ergonômica Maringá FC Limited Edition PCMGAFC PCYes é uma homenagem ao orgulho de Maringá, unindo design exclusivo, conforto extremo e performance. Desenvolvida em tecido linho, entrega respirabilidade e acabamento premium em preto e verde.\n\nConta com inclinação de até 135°, ajuste…",
    "features": [
      "Edição limitada temática Maringá FC",
      "Inclinação de até 135°",
      "Apoios de braço 4D ajustáveis",
      "Pistão a gás Classe 4 resistente",
      "Almofada lombar inclusa",
      "Almofada magnética para cabeça",
      "Revestimento em tecido linho respirável",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "299948"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-maringa-fc-limited-edition-pcmgafc",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-maringa-fc-limited-edition-pcmgafc",
    "inStock": true
  },
  {
    "id": 447,
    "sku": "299946",
    "name": "Cadeira Gamer PCYES Ergonômica Ultimate Jade Fire PCGU-JF",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.7,
    "reviews": 249,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/299946/3C1B41C611EFF40EE0630300A8C0C57C",
    "images": [
      "https://cdn.oderco.com.br/produtos/299946/3C1B41C611EFF40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299946/3C1B41C611F0F40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299946/3C1B41C611F1F40EE0630300A8C0C57C"
    ],
    "description": "A Cadeira Gamer Ergonômica Ultimate Jade Fire PCGU-JF PCYes combina design exclusivo em verde e marrom com conforto avançado para longas sessões de jogo ou trabalho. Produzida em tecido linho, proporciona toque agradável e melhor respirabilidade no uso diário.\n\nConta com inclinação de até 135°, aj…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Apoios de braço 4D com ajuste completo",
      "Pistão a gás Classe 4 resistente",
      "Almofada lombar para suporte ergonômico",
      "Revestimento em tecido linho respirável",
      "Base reforçada em nylon",
      "Rodas em nylon e ferro para maior durabilidade",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "299946"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-ultimate-jade-fire-pcgu-jf",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-ultimate-jade-fire-pcgu-jf",
    "inStock": true
  },
  {
    "id": 448,
    "sku": "299935",
    "name": "Cadeira Gamer PCYES Ergonômica Ultimate Dawn Knight PCGU-DK",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.8,
    "reviews": 286,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/299935/3C1B41C611EBF40EE0630300A8C0C57C",
    "images": [
      "https://cdn.oderco.com.br/produtos/299935/3C1B41C611EBF40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299935/3C1B41C611ECF40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299935/3C1B41C611EDF40EE0630300A8C0C57C"
    ],
    "description": "A Cadeira Gamer Ergonômica Ultimate Dawn Knight PCGU-DK PCYes combina design moderno em preto e cinza com conforto avançado para longas sessões de jogo ou trabalho. Produzida em tecido linho, proporciona toque agradável e melhor respirabilidade no uso diário.\n\nConta com inclinação de até 135°, aju…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Apoios de braço 4D com ajuste completo",
      "Pistão a gás Classe 4 resistente",
      "Almofada lombar para suporte ergonômico",
      "Revestimento em tecido linho respirável",
      "Base reforçada em nylon",
      "Rodas em nylon e ferro para maior durabilidade",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "299935"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-ultimate-dawn-knight-pcgu-dk",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-ultimate-dawn-knight-pcgu-dk",
    "inStock": true
  },
  {
    "id": 449,
    "sku": "299932",
    "name": "Cadeira Gamer PCYES Ergonômica Prime Red Magma PCGP-RD",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.9,
    "reviews": 323,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/299932/3C1B41C611F7F40EE0630300A8C0C57C",
    "images": [
      "https://cdn.oderco.com.br/produtos/299932/3C1B41C611F7F40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299932/3C1B41C611F8F40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299932/3C1B41C611F9F40EE0630300A8C0C57C"
    ],
    "description": "A Cadeira Gamer Ergonômica Prime Red Magma PCGP-RD PCYes combina design marcante em preto e vermelho com conforto avançado para longas sessões de jogo ou trabalho. Produzida em tecido linho, oferece toque agradável e melhor respirabilidade no uso diário.\n\nPossui inclinação de até 135°, ajuste de a…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Apoios de braço 4D com ajuste completo",
      "Pistão a gás Classe 4 resistente",
      "Almofada lombar para suporte ergonômico",
      "Revestimento em tecido linho respirável",
      "Base reforçada em nylon",
      "Rodas em nylon e ferro para maior durabilidade",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "299932"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-prime-red-magma-pcgp-rd",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-prime-red-magma-pcgp-rd",
    "inStock": true
  },
  {
    "id": 450,
    "sku": "319276",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel Sahara PCSTL-SH",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.4,
    "reviews": 360,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319276/42667CBD4A7D0BA8E0630300A8C0A381",
    "images": [
      "https://cdn.oderco.com.br/produtos/319276/42667CBD4A7D0BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319276/42667CBD4A7E0BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319276/42667CBD4A7F0BA8E0630300A8C0A381"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel Indigo PCSTL-ID PCYes combina design exclusivo e estrutura reforçada para oferecer conforto, resistência e presença marcante no setup. Inspirada em linhas geométricas modernas, é ideal para jogadores que buscam ergonomia e desempenho.\n\nPossui inclinação de até 1…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Apoio magnético para cabeça",
      "Almofada lombar ajustável inclusa",
      "Apoios de braço 3D com múltiplas regulagens",
      "Espuma injetada D45 de alta densidade",
      "Revestimento em tecido linho respirável",
      "Base reforçada em nylon 350 mm",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319276"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-sentinel-sahara-pcstl-sh",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-sentinel-sahara-pcstl-sh",
    "inStock": true,
    "oldPrice": "R$ 1533,88",
    "oldPriceNum": 1533.88
  },
  {
    "id": 451,
    "sku": "319275",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel Indigo PCSTL-ID",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.5,
    "reviews": 397,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319275/42667CBD4A790BA8E0630300A8C0A381",
    "images": [
      "https://cdn.oderco.com.br/produtos/319275/42667CBD4A790BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319275/42667CBD4A7A0BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319275/42667CBD4A7B0BA8E0630300A8C0A381"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel Indigo PCSTL-ID PCYes combina design exclusivo e estrutura reforçada para oferecer conforto, resistência e presença marcante no setup. Inspirada em linhas geométricas modernas, é ideal para jogadores que buscam ergonomia e desempenho.\n\nPossui inclinação de até 1…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Apoio magnético para cabeça",
      "Almofada lombar ajustável inclusa",
      "Apoios de braço 3D com múltiplas regulagens",
      "Espuma injetada D45 de alta densidade",
      "Revestimento em tecido linho respirável",
      "Base reforçada em nylon 350 mm",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319275"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-sentinel-indigo-pcstl-id",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-sentinel-indigo-pcstl-id",
    "inStock": true,
    "oldPrice": "R$ 1455,89",
    "oldPriceNum": 1455.89
  },
  {
    "id": 452,
    "sku": "319266",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel First Blood PCSTL-FB",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 434,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319266/42667CBD4A750BA8E0630300A8C0A381",
    "images": [
      "https://cdn.oderco.com.br/produtos/319266/42667CBD4A750BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319266/42667CBD4A760BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319266/42667CBD4A770BA8E0630300A8C0A381"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel First Blood PCSTL-FB PCYes combina design exclusivo e estrutura reforçada para entregar desempenho, conforto e presença no setup. Inspirada em linhas geométricas marcantes, transmite força e personalidade para jogadores exigentes.\n\nCom inclinação de até 135°, ap…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Apoio magnético para cabeça",
      "Almofada lombar ajustável inclusa",
      "Apoios de braço 3D com múltiplas regulagens",
      "Espuma injetada D45 de alta densidade",
      "Revestimento em tecido linho respirável",
      "Base reforçada em nylon 350 mm",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319266"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-sentinel-first-blood-pcstl-fb",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-sentinel-first-blood-pcstl-fb",
    "inStock": true
  },
  {
    "id": 453,
    "sku": "319263",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel Carbon PCSTL-CB",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.7,
    "reviews": 471,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319263/42667CBD4A710BA8E0630300A8C0A381",
    "images": [
      "https://cdn.oderco.com.br/produtos/319263/42667CBD4A710BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319263/42667CBD4A720BA8E0630300A8C0A381",
      "https://cdn.oderco.com.br/produtos/319263/42667CBD4A730BA8E0630300A8C0A381"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel Carbon PCSTL-CB PCYes combina design exclusivo com estrutura robusta para elevar o nível do seu setup. Inspirada em linhas geométricas marcantes, transmite presença e personalidade para jogadores exigentes.\n\nOferece inclinação de até 135°, apoio magnético para c…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Apoio magnético para cabeça",
      "Almofada lombar inclusa",
      "Apoios de braço 3D com múltiplos ajustes",
      "Espuma injetada D45 de alta densidade",
      "Revestimento em tecido linho respirável",
      "Base reforçada em nylon 350 mm",
      "Suporte para até 150 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319263"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-sentinel-carbon-pcstl-cb",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-sentinel-carbon-pcstl-cb",
    "inStock": true
  },
  {
    "id": 454,
    "sku": "212147",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel Mint Green PCSTL-VD",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.8,
    "reviews": 78,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212147/373BBAEAC7BB7463E0630300A8C033BD",
    "images": [
      "https://cdn.oderco.com.br/produtos/212147/373BBAEAC7BB7463E0630300A8C033BD",
      "https://cdn.oderco.com.br/produtos/212147/373BBAEAC7BC7463E0630300A8C033BD",
      "https://cdn.oderco.com.br/produtos/212147/373BBAEAC7BD7463E0630300A8C033BD"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel Mint Green PCSTL-VD PCYes combina design exclusivo com estrutura reforçada para quem busca conforto e presença no setup. Inspirada em linhas geométricas marcantes, entrega estilo moderno aliado à ergonomia.\n\nPossui inclinação de até 135°, apoio magnético para ca…",
    "features": [
      "Inclinação de até 135° para maior ergonomia",
      "Apoio magnético para cabeça",
      "Suporte lombar ajustável com fita",
      "Apoios de braço 4D com múltiplas regulagens",
      "Espuma injetada D45 de alta densidade",
      "Revestimento em PU + mesh respirável",
      "Estrutura reforçada com suporte para até 150kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212147"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ergonomica-sentinel-mint-green-pcstl-vd",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ergonomica-sentinel-mint-green-pcstl-vd",
    "inStock": true
  },
  {
    "id": 455,
    "sku": "252557",
    "name": "Gabinete Gamer PCYES Forcefield Max Black Vulcan Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.9,
    "reviews": 115,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252557/3F00DCAA20B56D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/252557/3F00DCAA20B56D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252557/3F00DCAA20B86D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252557/3F00DCAA20B96D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Forcefield Max Black Vulcan PCYes foi desenvolvido para setups que exigem espaço interno, visual impactante e estrutura reforçada. Seu formato Mid Tower é compatível com placas-mãe ATX, Micro ATX e Mini ITX, oferecendo ampla flexibilidade para diferentes configurações.\n\nCom fronta…",
    "features": [
      "Vidro temperado frontal, lateral e superior",
      "Chassi reforçado com 0,7mm de espessura",
      "Compatível com placas-mãe ATX, Micro ATX e Mini ITX",
      "Suporte para GPU de até 410mm",
      "Suporte para water cooler de até 360mm",
      "Estrutura interna espaçosa para builds avançadas",
      "Painel superior com USB 3.0 e áudio HD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252557"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-max-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-max-black-vulcan",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 456,
    "sku": "210197",
    "name": "Cadeira Gamer PCYES Mad Racer V8 Turbo Amarela V8TBMADAM",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.4,
    "reviews": 152,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/210197/06D1CA7F367A2E05E0630300A8C051C3",
    "images": [
      "https://cdn.oderco.com.br/produtos/210197/06D1CA7F367A2E05E0630300A8C051C3",
      "https://cdn.oderco.com.br/produtos/210197/06D1CA7F367D2E05E0630300A8C051C3",
      "https://cdn.oderco.com.br/produtos/210197/06D1CA7F367C2E05E0630300A8C051C3"
    ],
    "description": "A Cadeira Gamer Mad Racer V8 Turbo Amarela V8TBMADAM PCYes foi desenvolvida para quem busca desempenho, ergonomia e estilo no setup gamer. Seu encosto reclina até 135° e conta com função Relax (3° a 16°), permitindo melhor adaptação ao corpo durante longas sessões de jogo ou trabalho.\n\nO revestime…",
    "features": [
      "Inclinação de até 135° com função Relax",
      "Apoios de braço 4D com ajustes individuais",
      "Espuma moldada D45 para maior conforto",
      "Pistão a gás Classe 4 com ajuste de 100 mm",
      "Rodízios em PU que não riscam o piso",
      "Acompanha almofadas lombar e cervical",
      "Estrutura resistente para até 120 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "210197"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-v8-turbo-amarela-v8tbmadam",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-v8-turbo-amarela-v8tbmadam",
    "inStock": true
  },
  {
    "id": 457,
    "sku": "191992",
    "name": "Gabinete Gamer PCYES Forcefield White Ghost Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 189,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/191992/3F00DCAA20EA6D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/191992/3F00DCAA20EA6D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191992/3F00DCAA20EE6D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191992/3F00DCAA20EC6D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Forcefield White Ghost PCYes foi desenvolvido para quem busca um setup com visual clean, estrutura reforçada e excelente capacidade de refrigeração. Seu formato Mid Tower é compatível com placas-mãe Mini ITX e Micro ATX, oferecendo organização eficiente para configurações modernas.…",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Acabamento White Ghost com visual clean",
      "Chassi reforçado de 0,7mm",
      "Suporte para GPU de até 360mm",
      "Compatível com placas-mãe Mini ITX e Micro ATX",
      "Suporte para water cooler até 240mm",
      "Painel frontal com USB 3.0 e áudio HD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "191992"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-white-ghost",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-white-ghost",
    "inStock": true
  },
  {
    "id": 458,
    "sku": "33438",
    "name": "Cadeira Gamer PCYES Mad Racer V8 Turbo Azul V8TBMADAZ",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 226,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/33438/BEF41FFD1FA7FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/33438/BEF41FFD1FA7FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/33438/BEF41FFD1EECFC48E055DEF401E782F4"
    ],
    "description": "A Cadeira Gamer Mad Racer STI Comfort Lótus PCSTI-LT PCYes foi desenvolvida com design exclusivo PCYes para entregar conforto, durabilidade e desempenho em longas sessões de jogos ou trabalho.\n\nSeu revestimento em tecido linho acolchoado proporciona toque macio e melhor respirabilidade, mantendo o…",
    "features": [
      "Inclinação de até 135° com função Relax para maior ergonomia",
      "Apoios de braço 4D com múltiplas regulagens",
      "Espuma moldada D45 para conforto prolongado",
      "Pistão a gás Classe 4 para ajuste preciso de altura",
      "Rodízios em PU que não riscam o piso",
      "Acompanha almofadas lombar e cervical"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "33438"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-v8-turbo-azul-v8tbmadaz",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-v8-turbo-azul-v8tbmadaz",
    "inStock": true
  },
  {
    "id": 459,
    "sku": "252341",
    "name": "Gabinete Gamer PCYES Velyr Black Vulcan Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.7,
    "reviews": 263,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252341/388D269E7ADBA311E0630300A8C0436B",
    "images": [
      "https://cdn.oderco.com.br/produtos/252341/388D269E7ADBA311E0630300A8C0436B",
      "https://cdn.oderco.com.br/produtos/252341/448370870FE26674E0630300A8C0BB98",
      "https://cdn.oderco.com.br/produtos/252341/448370870FE46674E0630300A8C0BB98"
    ],
    "description": "O Gabinete Gamer PCYes Velyr Black Vulcan foi desenvolvido para quem busca montar um setup equilibrado, com visual moderno e boa capacidade de refrigeração. Compatível com placas-mãe Mini ITX e Micro ATX, ele oferece excelente aproveitamento interno para configurações gamers e estações compactas.\n…",
    "features": [
      "Lateral em vidro temperado",
      "Compatível com placas-mãe Mini ITX e Micro ATX",
      "Suporte para GPU de até 320mm",
      "Altura para CPU cooler de até 165mm",
      "Suporte para até 8 fans de 120mm/140mm",
      "Compatível com water cooler 240mm (superior)",
      "Painel frontal com USB 3.0 e áudio"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252341"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-velyr-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-velyr-black-vulcan",
    "inStock": true
  },
  {
    "id": 460,
    "sku": "33440",
    "name": "Cadeira Gamer PCYES Mad Racer V8 Turbo Branca com Braço 4D e Pistão Classe 4",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.8,
    "reviews": 300,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/33440/BEF41FFD1CC1FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/33440/BEF41FFD1CC1FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/33440/BEF41FFD1CC2FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/33440/BEF41FFD1CC5FC48E055DEF401E782F4"
    ],
    "description": "A Cadeira Gamer Mad Racer V8 Turbo Branca representa a nova geração de cadeiras gamer desenvolvidas para quem busca máximo desempenho, conforto e ergonomia em longas sessões de jogo ou trabalho.\n\nCom inclinação de até 135° e função Relax (tilt de 3° a 16°), o encosto acompanha o movimento do corpo…",
    "features": [
      "Inclinação do encosto até 135°",
      "Função Relax (3° a 16°)",
      "Pistão a gás classe 4",
      "Ajuste de altura de 100 mm",
      "Braços com tecnologia 4D",
      "Espuma moldada D45",
      "Rodízios PU 65 mm que não riscam o piso",
      "Rotação 360°"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "33440"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-v8-turbo-branca-v8tbmadbc",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-v8-turbo-branca-v8tbmadbc",
    "inStock": true,
    "oldPrice": "R$ 1533,88",
    "oldPriceNum": 1533.88
  },
  {
    "id": 461,
    "sku": "191991",
    "name": "Gabinete Gamer PCYES Forcefield Black Vulcan Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.9,
    "reviews": 337,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/191991/3F00DCAA20E46D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/191991/3F00DCAA20E46D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191991/3F00DCAA20E86D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191991/3F00DCAA20E66D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Forcefield Black Vulcan PCYes foi projetado para quem busca desempenho, resistência estrutural e visual premium em um setup compacto. Seu formato Mid Tower é compatível com placas-mãe Mini ITX e Micro ATX, oferecendo excelente aproveitamento interno para configurações equilibradas e…",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Chassi reforçado com 0,7mm de espessura",
      "Suporte para GPU de até 360mm",
      "Compatível com placas-mãe Mini ITX e Micro ATX",
      "Amplo suporte para fans de 120mm",
      "Compatível com water cooler até 240mm",
      "Painel frontal com USB 3.0 e áudio HD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "191991"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-black-vulcan",
    "inStock": true
  },
  {
    "id": 462,
    "sku": "319258",
    "name": "Cadeira Gamer PCYES Mad Racer STI Comfort Lótus com Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.4,
    "reviews": 374,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319258/42258648DAA89D18E0630300A8C09E78",
    "images": [
      "https://cdn.oderco.com.br/produtos/319258/42258648DAA89D18E0630300A8C09E78",
      "https://cdn.oderco.com.br/produtos/319258/42258648DAAA9D18E0630300A8C09E78",
      "https://cdn.oderco.com.br/produtos/319258/42258648DAAB9D18E0630300A8C09E78"
    ],
    "description": "A Cadeira Gamer Mad Racer STI Comfort Lótus PCSTI-LT PCYes foi desenvolvida com design exclusivo PCYes para entregar conforto, durabilidade e desempenho em longas sessões de jogos ou trabalho.\n\nSeu revestimento em tecido linho acolchoado proporciona toque macio e melhor respirabilidade, mantendo o…",
    "features": [
      "Inclinação de até 135°",
      "Pistão a gás classe 3",
      "Rodas em PU que não riscam o piso",
      "Revestimento em tecido linho acolchoado",
      "Base em nylon resistente",
      "Design exclusivo PCYes",
      "Suporta até 120 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319258"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-sti-comfort-lotus-pcsti-lt",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-sti-comfort-lotus-pcsti-lt",
    "inStock": true,
    "oldPrice": "R$ 1455,89",
    "oldPriceNum": 1455.89
  },
  {
    "id": 463,
    "sku": "337114",
    "name": "Gabinete Gamer PCYES Forcefield V2 Black Vulcan Vidro Temperado",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 411,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/337114/488712FD41CDC445E0630300A8C0BCA5",
    "images": [
      "https://cdn.oderco.com.br/produtos/337114/488712FD41CDC445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337114/488712FD41CEC445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337114/488712FD41CFC445E0630300A8C0BCA5"
    ],
    "description": "O Gabinete Gamer Forcefield V2 Black Vulcan PCYes foi desenvolvido para quem busca montar um setup compacto, moderno e com alto potencial de refrigeração. Seu formato Mid Tower oferece excelente aproveitamento interno, com compatibilidade para placas-mãe Mini ITX e Micro ATX, além de suportar placas…",
    "features": [
      "Frontal e lateral em vidro temperado",
      "Suporte para GPU de até 410mm",
      "Compatível com placas-mãe Mini ITX e Micro ATX",
      "Amplo suporte para fans de 120mm e 140mm",
      "Compatível com water cooler até 360mm",
      "Estrutura resistente com chassi 0,5mm",
      "Painel frontal com USB 3.0 e áudio HD"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "337114"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-v2-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-v2-black-vulcan",
    "inStock": true
  },
  {
    "id": 464,
    "sku": "319248",
    "name": "Cadeira Gamer PCYES Mad Racer STI Comfort Kalahari com Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 448,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319248/3646CEEC26B98EE5E0630300A8C06FC4",
    "images": [
      "https://cdn.oderco.com.br/produtos/319248/3646CEEC26B98EE5E0630300A8C06FC4",
      "https://cdn.oderco.com.br/produtos/319248/414A5FFBE8091F2AE0630300A8C094C9",
      "https://cdn.oderco.com.br/produtos/319248/414A5FFBE80A1F2AE0630300A8C094C9"
    ],
    "description": "A Cadeira Gamer Mad Racer STI Comfort Kalahari PCSTI-KR PCYes foi desenvolvida com design exclusivo PCYes para oferecer conforto prolongado, resistência e estilo para setups gamers.\n\nSeu revestimento em tecido linho acolchoado garante toque agradável e melhor respirabilidade, ideal para longas hor…",
    "features": [
      "Inclinação de até 135°",
      "Pistão a gás classe 3",
      "Rodas em PU que não danificam o piso",
      "Revestimento em tecido linho acolchoado",
      "Base em nylon resistente",
      "Design exclusivo PCYes",
      "Suporta até 120 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319248"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-sti-comfort-kalahari-pcsti-kr",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-sti-comfort-kalahari-pcsti-kr",
    "inStock": true
  },
  {
    "id": 465,
    "sku": "191993",
    "name": "Gabinete Gamer PCYES Set Black Vulcan com Vidro Temperado Mid Tower",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.7,
    "reviews": 55,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/191993/3F00DCAA20D96D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/191993/3F00DCAA20D96D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191993/3F00DCAA20DC6D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191993/3F1792E8B2A233F0E0630300A8C0B19C"
    ],
    "description": "O Gabinete Gamer Set Black Vulcan PCYes foi projetado para quem deseja montar um setup moderno, organizado e com excelente potencial de expansão. Seu formato Mid Tower oferece amplo espaço interno, garantindo compatibilidade com placas-mãe Mini ITX, Micro ATX e ATX, além de placas de vídeo de até 31…",
    "features": [
      "Design gamer com lateral em vidro temperado",
      "Compatível com placas-mãe ATX, Micro ATX e Mini ITX",
      "Suporte para placas de vídeo até 310mm",
      "Espaço para até 6 fans de 120mm",
      "Compatível com water cooler frontal até 360mm",
      "Organização interna eficiente para armazenamento",
      "Painel frontal com USB 3.0 e conexões de áudio"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "191993"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-set-black-vulcan-vidro-temperado",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-set-black-vulcan-vidro-temperado",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 466,
    "sku": "319242",
    "name": "Cadeira Gamer PCYES Mad Racer STI Comfort First Blood com Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.8,
    "reviews": 92,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319242/3646CEEC26B78EE5E0630300A8C06FC4",
    "images": [
      "https://cdn.oderco.com.br/produtos/319242/3646CEEC26B78EE5E0630300A8C06FC4",
      "https://cdn.oderco.com.br/produtos/319242/414A5FFBE8151F2AE0630300A8C094C9",
      "https://cdn.oderco.com.br/produtos/319242/414A5FFBE8161F2AE0630300A8C094C9"
    ],
    "description": "A Cadeira Gamer Mad Racer STI Comfort First Blood PCSTI-FB PCYes foi desenvolvida com design exclusivo PCYes para entregar conforto, resistência e estilo ao setup gamer.\n\nSeu revestimento em tecido linho acolchoado proporciona toque agradável e excelente respirabilidade, ideal para longas horas de…",
    "features": [
      "Inclinação de até 135°",
      "Pistão a gás classe 3",
      "Rodas em PU que não danificam o piso",
      "Revestimento em tecido linho acolchoado",
      "Base em nylon resistente",
      "Design exclusivo PCYes",
      "Suporta até 120 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319242"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-sti-comfort-first-blood-pcsti-fb",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-sti-comfort-first-blood-pcsti-fb",
    "inStock": true
  },
  {
    "id": 467,
    "sku": "191995",
    "name": "Gabinete Gamer PCYES Bolter Black Vulcan Vidro Lateral",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.9,
    "reviews": 129,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/191995/3F00DCAA20D26D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/191995/3F00DCAA20D26D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191995/3F00DCAA20D06D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/191995/3F00DCAA20CE6D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Bolter Black Vulcan Vidro Lateral GBBVPBR PCYes é ideal para quem busca desempenho, compatibilidade ampla e visual moderno. Com lateral em vidro temperado e frontal em ABS, oferece resistência e destaque para os componentes internos do setup.\n\nNo formato Mid-Tower, é compatível co…",
    "features": [
      "Formato Mid-Tower versátil",
      "Compatível com placas-mãe ATX, Micro ATX e Mini ITX",
      "Lateral em vidro temperado",
      "Suporte para GPU até 310 mm",
      "CPU Cooler até 159 mm",
      "Suporte para water cooler até 360 mm (frontal)",
      "Fonte ATX com posição inferior",
      "Painel frontal com USB 3.0 e 2x USB 2.0"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "191995"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-bolter-black-vulcan-vidro-lateral",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-bolter-black-vulcan-vidro-lateral",
    "inStock": true
  },
  {
    "id": 468,
    "sku": "192821",
    "name": "Cadeira Gamer PCYES Mad Racer STI Turbo Black Vulcan com Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.4,
    "reviews": 166,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192821/0169F91643CD32FDE0630300A8C0CF67",
    "images": [
      "https://cdn.oderco.com.br/produtos/192821/0169F91643CD32FDE0630300A8C0CF67",
      "https://cdn.oderco.com.br/produtos/192821/0169F91643CF32FDE0630300A8C0CF67",
      "https://cdn.oderco.com.br/produtos/192821/0169F91643D032FDE0630300A8C0CF67"
    ],
    "description": "A Cadeira Gamer Mad Racer STI Turbo Black Vulcan MRSTIR10PT PCYes foi desenvolvida para oferecer conforto, resistência e visual marcante para setups gamers.\n\nCom design exclusivo PCYes e acabamento em tecido acolchoado, proporciona suporte adequado para longas sessões de jogo ou uso diário no comp…",
    "features": [
      "Inclinação de até 135° para maior conforto",
      "Rodas em PU que não danificam o piso",
      "Ajuste de altura com pistão a gás",
      "Estrutura resistente com base em nylon",
      "Estofado em tecido acolchoado",
      "Design gamer exclusivo PCYes",
      "Suporta até 120 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192821"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-sti-turbo-black-vulcan-mrstir10pt",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-sti-turbo-black-vulcan-mrstir10pt",
    "inStock": true
  },
  {
    "id": 469,
    "sku": "252551",
    "name": "Gabinete Gamer PCYES Forcefield TWR Black Vulcan",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 203,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/252551/3F00DCAA20C76D04E0630300A8C06874",
    "images": [
      "https://cdn.oderco.com.br/produtos/252551/3F00DCAA20C76D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252551/3F00DCAA20CA6D04E0630300A8C06874",
      "https://cdn.oderco.com.br/produtos/252551/3F00DCAA20CB6D04E0630300A8C06874"
    ],
    "description": "O Gabinete Gamer Forcefield TWR Black Vulcan GFFTWRBV PCYes foi desenvolvido para setups de alta performance que exigem amplo espaço interno e excelente ventilação. Seu design Mid-Tower com frontal e lateral em vidro temperado proporciona visual moderno e destaque para os componentes internos.\n\nCo…",
    "features": [
      "Estrutura Mid-Tower robusta (0,5 mm)",
      "Frontal e lateral em vidro temperado",
      "Suporte para GPU até 380 mm",
      "Compatível com CPU Cooler até 165 mm",
      "Fonte ATX com posição inferior",
      "Ampla capacidade de ventilação",
      "Suporte para water cooler lateral e traseiro",
      "Painel frontal com USB 3.0"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "252551"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-twr-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-twr-black-vulcan",
    "inStock": true
  },
  {
    "id": 470,
    "sku": "192674",
    "name": "Cadeira de Escritorio PCYES Ergonômica Magnus Marrom com Reclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 240,
    "category": "Cadeiras",
    "subcategory": "Cadeira Ergonômica",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Ergonômica"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192674/FFC255BB288333BEE0530300A8C0B649",
    "images": [
      "https://cdn.oderco.com.br/produtos/192674/FFC255BB288333BEE0530300A8C0B649",
      "https://cdn.oderco.com.br/produtos/192674/FFC255BB288433BEE0530300A8C0B649",
      "https://cdn.oderco.com.br/produtos/192674/FFC255BB288733BEE0530300A8C0B649"
    ],
    "description": "A Cadeira de Escritório Ergonômica Magnus Marrom PCEMAGMA PCYes foi projetada para oferecer conforto estrutural, estabilidade e elegância para ambientes profissionais.\n\nCom acabamento sofisticado na cor marrom, é ideal para escritórios executivos e home office que buscam um visual mais refinado se…",
    "features": [
      "Reclinação de até 135°",
      "Encosto alto de 78,5 cm para melhor suporte",
      "Assento amplo com 52 cm de largura",
      "Espuma espessa de 10 cm no encosto e assento",
      "Ajuste de altura personalizado",
      "Apoios de braço com regulagem de altura",
      "Estrutura robusta para uso prolongado",
      "Design executivo na cor marrom"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192674"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Ergonômica"
      }
    ],
    "seoSlug": "cadeira-escritorio-ergonomica-magnus-marrom-pcemagma",
    "productUrl": "https://www.pcyes.com.br/cadeira-escritorio-ergonomica-magnus-marrom-pcemagma",
    "inStock": true,
    "oldPrice": "R$ 1533,88",
    "oldPriceNum": 1533.88
  },
  {
    "id": 471,
    "sku": "337119",
    "name": "Gabinete Gamer PCYES Forcefield Mini Black Vulcan",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.7,
    "reviews": 277,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/337119/488712FD41C1C445E0630300A8C0BCA5",
    "images": [
      "https://cdn.oderco.com.br/produtos/337119/488712FD41C1C445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337119/488712FD41C2C445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337119/488712FD41C6C445E0630300A8C0BCA5"
    ],
    "description": "O Gabinete Gamer Forcefield Mini Black Vulcan GFFMNBV PCYes é ideal para quem busca um PC gamer compacto, com visual robusto e design em vidro temperado nas faces frontal e lateral. Sua estrutura Mini-Tower aproveita ao máximo o espaço interno, sendo compatível com placas-mãe Mini ITX e Micro ATX, e…",
    "features": [
      "Design Mini-Tower com vidro temperado frontal e lateral",
      "Compatível com placas-mãe Mini ITX e Micro ATX",
      "Suporta placa de vídeo até 310 mm",
      "Espaço para CPU Cooler até 155 mm",
      "Painel frontal com USB 3.0 + USB 2.0",
      "Múltiplas opções de refrigeração com fans de 120 mm",
      "Suporte para water cooler lateral 120/240 mm",
      "Organização interna otimizada"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "337119"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-forcefield-mini-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-forcefield-mini-black-vulcan",
    "inStock": true
  },
  {
    "id": 472,
    "sku": "192673",
    "name": "Cadeira de Escritorio PCYES Ergonômica Magnus Cinza com Reclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.8,
    "reviews": 314,
    "category": "Cadeiras",
    "subcategory": "Cadeira Ergonômica",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Ergonômica"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192673/FFC255BB289233BEE0530300A8C0B649",
    "images": [
      "https://cdn.oderco.com.br/produtos/192673/FFC255BB289233BEE0530300A8C0B649",
      "https://cdn.oderco.com.br/produtos/192673/FFC255BB289033BEE0530300A8C0B649",
      "https://cdn.oderco.com.br/produtos/192673/FFC255BB289333BEE0530300A8C0B649"
    ],
    "description": "A Cadeira de Escritório Ergonômica Magnus Cinza PCEMAGCZ PCYes foi projetada para oferecer conforto, estabilidade e ergonomia durante longas jornadas de trabalho.\n\nCom acabamento moderno na cor cinza, combina visual elegante com estrutura robusta. Seu encosto alto de 78,5 cm proporciona melhor apo…",
    "features": [
      "Reclinação de até 135°",
      "Encosto alto de 78,5 cm para melhor suporte",
      "Assento amplo com 52 cm de largura",
      "Espuma espessa de 10 cm no encosto e assento",
      "Ajuste de altura personalizado",
      "Apoios de braço com regulagem de altura",
      "Estrutura resistente para uso prolongado",
      "Design moderno na cor cinza"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192673"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Ergonômica"
      }
    ],
    "seoSlug": "cadeira-escritorio-ergonomica-magnus-cinza-pcemagcz",
    "productUrl": "https://www.pcyes.com.br/cadeira-escritorio-ergonomica-magnus-cinza-pcemagcz",
    "inStock": true
  },
  {
    "id": 473,
    "sku": "337130",
    "name": "Gabinete Gamer PCYES Mid Tower Ozara Black Vulcan",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.9,
    "reviews": 351,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/337130/488712FD41DEC445E0630300A8C0BCA5",
    "images": [
      "https://cdn.oderco.com.br/produtos/337130/488712FD41DEC445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337130/488712FD41DFC445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337130/488712FD41E0C445E0630300A8C0BCA5"
    ],
    "description": "O Gabinete Gamer Mid Tower Ozara Black Vulcan GOZRBV PCYes combina design moderno com estrutura funcional para setups compactos e eficientes. Seu painel lateral em vidro temperado permite exibir os componentes internos com elegância, enquanto a frontal em ABS garante leveza e resistência.\n\nCompatí…",
    "features": [
      "Formato Mid Tower compacto",
      "Lateral em vidro temperado",
      "Compatível com Mini ITX e Micro ATX",
      "Suporte para GPU até 285 mm",
      "Suporte para CPU Cooler até 155 mm",
      "Fonte ATX com posição inferior",
      "Suporte para até 7 fans de 120 mm",
      "Compatível com water cooler 240 mm"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "337130"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-mid-tower-ozara-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-mid-tower-ozara-black-vulcan",
    "inStock": true,
    "oldPrice": "R$ 671,89",
    "oldPriceNum": 671.89
  },
  {
    "id": 474,
    "sku": "192672",
    "name": "Cadeira de Escritorio PCYES Ergonômica Magnus Preta com Reclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.4,
    "reviews": 388,
    "category": "Cadeiras",
    "subcategory": "Cadeira Ergonômica",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Ergonômica"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192672/FFC255BB287733BEE0530300A8C0B649",
    "images": [
      "https://cdn.oderco.com.br/produtos/192672/FFC255BB287733BEE0530300A8C0B649",
      "https://cdn.oderco.com.br/produtos/192672/FFC255BB287833BEE0530300A8C0B649",
      "https://cdn.oderco.com.br/produtos/192672/FFC255BB287933BEE0530300A8C0B649"
    ],
    "description": "A Cadeira de Escritório Ergonômica Magnus Preta PCEEMAGPT PCYes foi desenvolvida para oferecer conforto estrutural e ergonomia durante longas jornadas de trabalho.\n\nCom design robusto e acabamento totalmente preto, proporciona estabilidade e suporte ideal para ambientes corporativos e home office.…",
    "features": [
      "Reclinação de até 135° para maior conforto",
      "Encosto alto de 78,5 cm para melhor suporte",
      "Assento amplo com 52 cm de largura",
      "Espuma espessa (10 cm) no assento e encosto",
      "Ajuste de altura para postura adequada",
      "Apoios de braço com regulagem de altura",
      "Estrutura robusta para uso prolongado",
      "Design profissional totalmente preto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192672"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Ergonômica"
      }
    ],
    "seoSlug": "cadeira-escritorio-ergonomica-magnus-preta-pceemagpt",
    "productUrl": "https://www.pcyes.com.br/cadeira-escritorio-ergonomica-magnus-preta-pceemagpt",
    "inStock": true
  },
  {
    "id": 475,
    "sku": "337128",
    "name": "Gabinete Gamer PCYES Mid Tower Kauri Black Vulcan",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 425,
    "category": "Gabinetes",
    "subcategory": "Gabinete Gamer",
    "tags": [
      "Gaming",
      "Gabinetes",
      "Gabinete Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/337128/488712FD41D8C445E0630300A8C0BCA5",
    "images": [
      "https://cdn.oderco.com.br/produtos/337128/488712FD41D8C445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337128/488712FD41D9C445E0630300A8C0BCA5",
      "https://cdn.oderco.com.br/produtos/337128/488712FD41DAC445E0630300A8C0BCA5"
    ],
    "description": "O Gabinete Gamer Mid Tower Kauri Black Vulcan GKRIBV PCYes é ideal para setups compactos e eficientes, oferecendo estrutura funcional e visual moderno. Conta com painel lateral em vidro temperado, permitindo exibir os componentes internos com estilo.\n\nCompatível com placas-mãe Mini ITX e Micro ATX…",
    "features": [
      "Formato Mid Tower compacto",
      "Lateral em vidro temperado",
      "Compatível com Mini ITX e Micro ATX",
      "Suporte para GPU até 285 mm",
      "Suporte para CPU Cooler até 155 mm",
      "Fonte ATX com posição inferior",
      "Suporte para até 7 fans de 120 mm",
      "Compatível com water cooler 240 mm (superior)"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "337128"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Gabinete Gamer"
      }
    ],
    "seoSlug": "gabinete-gamer-mid-tower-kauri-black-vulcan",
    "productUrl": "https://www.pcyes.com.br/gabinete-gamer-mid-tower-kauri-black-vulcan",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 476,
    "sku": "318401",
    "name": "Cadeira Office PCYES Ergonômica MS5 Cinza com Apoio 3D e Mesh Respirável",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 462,
    "category": "Cadeiras",
    "subcategory": "Cadeira Office",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Office"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/318399/3517CD1145127885E0630300A8C0F955",
    "images": [
      "https://cdn.oderco.com.br/produtos/318399/3517CD1145127885E0630300A8C0F955",
      "https://cdn.oderco.com.br/produtos/318399/3FF4E7D7C7474FAFE0630300A8C01F04",
      "https://cdn.oderco.com.br/produtos/318399/3FF4E7D7C7484FAFE0630300A8C01F04"
    ],
    "description": "A Cadeira Office Ergonômica MS5 Cinza PCOMS5G PCYes foi projetada para oferecer conforto, resistência e ergonomia durante longas jornadas de trabalho ou estudo.\n\nCom estrutura preta e acabamento em cinza moderno, seu design combina sofisticação com funcionalidade. O encosto de cabeça possui regula…",
    "features": [
      "Encosto de cabeça regulável em 5 posições",
      "Apoios de braço 3D ajustáveis",
      "Tecido mesh respirável em nylon",
      "Inclinação com bloqueio",
      "Ajuste de altura com pistão a gás",
      "Estrutura reforçada",
      "Suporta até 150 kg",
      "Design moderno em cinza com estrutura preta"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "318401"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Office"
      }
    ],
    "seoSlug": "cadeira-office-ergonomica-ms5-cinza-pcoms5g",
    "productUrl": "https://www.pcyes.com.br/cadeira-office-ergonomica-ms5-cinza-pcoms5g",
    "inStock": true
  },
  {
    "id": 477,
    "sku": "318399",
    "name": "Cadeira Office PCYES Ergonômica MS5 Preta com Apoio 3D e Mesh Respirável",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.7,
    "reviews": 69,
    "category": "Cadeiras",
    "subcategory": "Cadeira Office",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Office"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/318399/3517CD1145127885E0630300A8C0F955",
    "images": [
      "https://cdn.oderco.com.br/produtos/318399/3517CD1145127885E0630300A8C0F955",
      "https://cdn.oderco.com.br/produtos/318399/3FF4E7D7C7474FAFE0630300A8C01F04",
      "https://cdn.oderco.com.br/produtos/318399/3FF4E7D7C7484FAFE0630300A8C01F04"
    ],
    "description": "A Cadeira Office Ergonômica MS5 Preta PCOMS5B PCYes foi desenvolvida para proporcionar conforto, resistência e praticidade durante longas jornadas de trabalho ou estudo.\n\nCom estrutura moderna e acabamento totalmente preto, combina tecido respirável em malha mesh (nylon) com ajustes ergonômicos fu…",
    "features": [
      "Encosto de cabeça regulável em 5 posições",
      "Apoios de braço 3D ajustáveis",
      "Tecido mesh respirável em nylon",
      "Inclinação com sistema de bloqueio",
      "Ajuste de altura com pistão a gás",
      "Estrutura reforçada",
      "Suporta até 150 kg",
      "Design elegante totalmente preto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "318399"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Office"
      }
    ],
    "seoSlug": "cadeira-office-ergonomica-ms5-preta-pcoms5b",
    "productUrl": "https://www.pcyes.com.br/cadeira-office-ergonomica-ms5-preta-pcoms5b",
    "inStock": true
  },
  {
    "id": 478,
    "sku": "254968",
    "name": "Cadeira Ergonômica PCYES de Massagem Sublime Backrobo Branca com Aquecimento e App",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.8,
    "reviews": 106,
    "category": "Cadeiras",
    "subcategory": "Cadeira Ergonômica",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Ergonômica"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254968/3737412D9422B7DCE0630300A8C04F68",
    "images": [
      "https://cdn.oderco.com.br/produtos/254968/3737412D9422B7DCE0630300A8C04F68",
      "https://cdn.oderco.com.br/produtos/254968/3737412D9423B7DCE0630300A8C04F68",
      "https://cdn.oderco.com.br/produtos/254968/3737412D9424B7DCE0630300A8C04F68"
    ],
    "description": "A Cadeira Ergonômica de Massagem Sublime Backrobo Branca PCYBRWT PCYes combina tecnologia inteligente, ergonomia avançada e design sofisticado para transformar sua rotina de trabalho ou estudo.\n\nDesenvolvida na parceria PCYes X Backrobo, a Sublime White possui sistema ativo de monitoramento postur…",
    "features": [
      "Sistema inteligente de monitoramento postural",
      "Massagem lombar integrada",
      "Aquecimento lombar 5V-19W",
      "Controle via aplicativo exclusivo",
      "Bateria interna 5200mAh",
      "Apoio lombar com airbag duplo",
      "Função de gerenciamento de sedentarismo",
      "Espuma moldada 60 kg/m³"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254968"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Ergonômica"
      }
    ],
    "seoSlug": "cadeira-ergonomica-massagem-sublime-backrobo-branca-pcybrwt",
    "productUrl": "https://www.pcyes.com.br/cadeira-ergonomica-massagem-sublime-backrobo-branca-pcybrwt",
    "inStock": true
  },
  {
    "id": 479,
    "sku": "254860",
    "name": "Cadeira Ergonômica PCYES de Massagem Sublime Backrobo Preta com Aquecimento e App",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.9,
    "reviews": 143,
    "category": "Cadeiras",
    "subcategory": "Cadeira Ergonômica",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Ergonômica"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/254860/3737412D9428B7DCE0630300A8C04F68",
    "images": [
      "https://cdn.oderco.com.br/produtos/254860/3737412D9428B7DCE0630300A8C04F68",
      "https://cdn.oderco.com.br/produtos/254860/3737412D9429B7DCE0630300A8C04F68",
      "https://cdn.oderco.com.br/produtos/254860/3737412D942AB7DCE0630300A8C04F68"
    ],
    "description": "A Cadeira Ergonômica de Massagem Sublime Backrobo Preta PCYBRBL PCYes combina ergonomia, tecnologia de monitoramento postural e sistema de massagem com aquecimento lombar.\n\nDesenvolvida na parceria PCYes X Backrobo, conta com sistema ativo que auxilia na correção da postura e reduz a fadiga em lon…",
    "features": [
      "Sistema inteligente de monitoramento postural",
      "Massagem lombar integrada",
      "Aquecimento lombar 5V-19W",
      "Controle via aplicativo exclusivo",
      "Bateria interna 5200mAh",
      "Apoio lombar com airbag duplo",
      "Função de gerenciamento de sedentarismo",
      "Espuma moldada 60 kg/m³"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "254860"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Ergonômica"
      }
    ],
    "seoSlug": "cadeira-ergonomica-massagem-sublime-backrobo-preta-pcybrbl",
    "productUrl": "https://www.pcyes.com.br/cadeira-ergonomica-massagem-sublime-backrobo-preta-pcybrbl",
    "inStock": true
  },
  {
    "id": 480,
    "sku": "107260",
    "name": "Cadeira de Escritorio PCYES Ergonômica Office B7 Preta com Apoio de Cabeça e Descanso para Pés",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.4,
    "reviews": 180,
    "category": "Cadeiras",
    "subcategory": "Cadeira Ergonômica",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Ergonômica"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/107260/D1ECA2E5112D94B8E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/107260/D1ECA2E5112D94B8E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/107260/D1ECA2E5112E94B8E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/107260/D1ECA2E5112F94B8E055DEF401E782F4"
    ],
    "description": "A Cadeira de Escritório Ergonômica Office B7 Preta PCOB7PT PCYes oferece conforto premium e ergonomia avançada para longas jornadas de trabalho ou estudo. Seu design moderno em malha respirável garante ventilação eficiente, mantendo o usuário confortável mesmo em dias mais quentes.\n\nConta com enco…",
    "features": [
      "Encosto em malha respirável para melhor ventilação",
      "Apoio de cabeça ajustável",
      "Almofada lombar com regulagem",
      "Ajuste pneumático de altura (pistão classe 3)",
      "Ajuste de profundidade do assento",
      "Inclinação traseira com controle de tensão",
      "Apoios de braço com altura ajustável",
      "Espuma moldada de alta densidade (60D)"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "107260"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Ergonômica"
      }
    ],
    "seoSlug": "cadeira-escritorio-ergonomica-office-b7-preta-pcob7pt",
    "productUrl": "https://www.pcyes.com.br/cadeira-escritorio-ergonomica-office-b7-preta-pcob7pt",
    "inStock": true,
    "oldPrice": "R$ 1533,88",
    "oldPriceNum": 1533.88
  },
  {
    "id": 481,
    "sku": "299941",
    "name": "Cadeira Gamer PCYES Ergonômica Ultimate Sunset Hill com Apoio 4D e Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.5,
    "reviews": 217,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/299941/2E7DB787BCD132A5E0630300A8C00520",
    "images": [
      "https://cdn.oderco.com.br/produtos/299941/2E7DB787BCD132A5E0630300A8C00520",
      "https://cdn.oderco.com.br/produtos/299941/3C1B41C611F3F40EE0630300A8C0C57C",
      "https://cdn.oderco.com.br/produtos/299941/3C1B41C611F4F40EE0630300A8C0C57C"
    ],
    "description": "A Cadeira Gamer Ergonômica Ultimate Sunset Hill PCGU-SH PCYes combina design marcante com estrutura robusta para oferecer conforto e desempenho em alto nível. Ideal para longas sessões de jogos, estudos ou trabalho, ela entrega ergonomia avançada e visual moderno para compor setups exigentes.\n\nPro…",
    "features": [
      "Design exclusivo PCYes com acabamento premium",
      "Inclinação de até 135° para maior conforto",
      "Apoio de braço 4D com regulagem completa",
      "Pistão a gás Classe 4 para ajuste seguro",
      "Mecanismo Frog para maior estabilidade",
      "Revestimento em tecido linho respirável",
      "Almofada lombar para suporte ergonômico",
      "Estrutura reforçada com base em nylon"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "299941"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-ultimate-sunset-hill",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-ultimate-sunset-hill",
    "inStock": true
  },
  {
    "id": 482,
    "sku": "33437",
    "name": "Cadeira Gamer PCYES Mad Racer V8 Turbo Vermelha com Apoio 4D e Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 254,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/33437/BEF41FFD1D93FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/33437/BEF41FFD1D93FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/33437/BEF41FFD1E93FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/33437/BEF41FFD1E94FC48E055DEF401E782F4"
    ],
    "description": "A Cadeira Gamer Mad Racer V8 Turbo Vermelha V8TBMADVM PCYes foi desenvolvida para jogadores que querem elevar o nível do setup com conforto, ergonomia e visual marcante. Com design esportivo e estrutura reforçada, é ideal para longas sessões de gameplay ou uso profissional.\n\nSeu encosto reclina at…",
    "features": [
      "Inclinação de até 135° com função Relax",
      "Apoio de braço 4D com ajustes multidirecionais",
      "Pistão a gás Classe 4 para maior segurança",
      "Ajuste de altura de até 100 mm",
      "Rodízios em PU 65 mm que não riscam o piso",
      "Rotação 360° para mobilidade total",
      "Espuma moldada D45 de alta densidade",
      "Revestimento em tecido 100% poliéster"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "33437"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-v8-turbo-vermelha",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-v8-turbo-vermelha",
    "inStock": true
  },
  {
    "id": 483,
    "sku": "319235",
    "name": "Cadeira Gamer PCYES Mad Racer STI Comfort Indigo com Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.7,
    "reviews": 291,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319235/3646CEEC26B88EE5E0630300A8C06FC4",
    "images": [
      "https://cdn.oderco.com.br/produtos/319235/3646CEEC26B88EE5E0630300A8C06FC4",
      "https://cdn.oderco.com.br/produtos/319235/414A5FFBE8041F2AE0630300A8C094C9",
      "https://cdn.oderco.com.br/produtos/319235/414A5FFBE8051F2AE0630300A8C094C9"
    ],
    "description": "A Cadeira Gamer Mad Racer STI Comfort Indigo PCSTI-ID PCYes foi desenvolvida para oferecer conforto prolongado, mobilidade suave e excelente custo-benefício para o dia a dia gamer ou profissional. Com design exclusivo PCYes, combina estilo moderno com estrutura resistente.\n\nSeu revestimento em tec…",
    "features": [
      "Design exclusivo PCYes com visual moderno",
      "Inclinação de até 135° para maior conforto",
      "Pistão a gás Classe 3 para ajuste seguro",
      "Rodízios em PU que não riscam o piso",
      "Revestimento em tecido linho respirável",
      "Base em nylon com 5 rodas resistentes",
      "Estrutura ideal para uso prolongado",
      "Suporta até 120 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319235"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-sti-comfort-indigo-pcsti-id",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-sti-comfort-indigo-pcsti-id",
    "inStock": true
  },
  {
    "id": 484,
    "sku": "212146",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel Colbat Blue com Apoio 4D e Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.8,
    "reviews": 328,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212146/138B26D1B2AFAFE5E0630300A8C068DE",
    "images": [
      "https://cdn.oderco.com.br/produtos/212146/138B26D1B2AFAFE5E0630300A8C068DE",
      "https://cdn.oderco.com.br/produtos/212146/138B26D1B2B0AFE5E0630300A8C068DE",
      "https://cdn.oderco.com.br/produtos/212146/138B26D1B2B1AFE5E0630300A8C068DE"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel Colbat Blue PCSTL-AZ PCYes foi desenvolvida para gamers que buscam presença visual marcante, ergonomia avançada e estrutura reforçada para uso intenso. Com design exclusivo PCYes e linhas geométricas inspiradas na força do magma, entrega personalidade e imponência…",
    "features": [
      "Design exclusivo PCYes com visual imponente",
      "Inclinação de até 135° para maior conforto",
      "Apoio de braço 4D com ajustes multidirecionais",
      "Suporte lombar ajustável com fita",
      "Apoio magnético para cabeça removível",
      "Revestimento em PU + tecido mesh respirável",
      "Estrutura interna em ferro com espuma D45",
      "Pistão a gás Classe 4 para maior segurança"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212146"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-sentinel-colbat-blue-pcstl-az",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-sentinel-colbat-blue-pcstl-az",
    "inStock": true,
    "oldPrice": "R$ 1455,89",
    "oldPriceNum": 1455.89
  },
  {
    "id": 485,
    "sku": "33442",
    "name": "Cadeira Gamer PCYES Mad Racer V8 Turbo Preta com Apoio 4D e Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.9,
    "reviews": 365,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/33442/BEF41FFD1E53FC48E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/33442/BEF41FFD1E53FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/33442/BEF41FFD1D81FC48E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/33442/BEF41FFD1D82FC48E055DEF401E782F4"
    ],
    "description": "A Cadeira Gamer Mad Racer V8 Turbo Preta V8TBMADPT PCYes foi desenvolvida para jogadores que querem elevar o nível do setup com conforto, ergonomia e performance. Com visual esportivo e acabamento premium, ela combina resistência e estilo para longas sessões de gameplay.\n\nSeu encosto possui inclin…",
    "features": [
      "Inclinação de até 135° com função Relax",
      "Apoio de braço 4D com múltiplas regulagens",
      "Pistão a gás Classe 4 para maior segurança",
      "Ajuste de altura de até 100 mm",
      "Rodízios em PU 65 mm que não riscam o piso",
      "Rotação 360° para mobilidade total",
      "Espuma moldada D45 de alta densidade",
      "Revestimento em tecido 100% poliéster"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "33442"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-mad-racer-v8-turbo-preta",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-mad-racer-v8-turbo-preta",
    "inStock": true,
    "oldPrice": "R$ 1533,88",
    "oldPriceNum": 1533.88
  },
  {
    "id": 486,
    "sku": "192822",
    "name": "Cadeira Gamer PCYES Mad Racer STI Turbo Red Magma com Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.4,
    "reviews": 402,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/192822/01796F248C60A3D9E0630300A8C0B86B",
    "images": [
      "https://cdn.oderco.com.br/produtos/192822/01796F248C60A3D9E0630300A8C0B86B",
      "https://cdn.oderco.com.br/produtos/192822/01796F248C61A3D9E0630300A8C0B86B",
      "https://cdn.oderco.com.br/produtos/192822/01796F248C62A3D9E0630300A8C0B86B"
    ],
    "description": "A Cadeira Gamer Mad Racer STI Turbo Red Magma MRSTIR10VL PCYes foi desenvolvida para oferecer conforto, resistência e estilo marcante ao setup gamer. Com design exclusivo PCYes e acabamento em malha de poliuretano acolchoada, proporciona suporte ideal para longas sessões de jogos ou trabalho.\n\nEqu…",
    "features": [
      "Design exclusivo PCYes com visual esportivo",
      "Inclinação de até 135° para maior conforto",
      "Sistema de ajuste de altura com gas lift",
      "Rodízios em PU que não danificam o piso",
      "Revestimento acolchoado em malha de poliuretano",
      "Estrutura resistente para uso prolongado",
      "Ideal para games, estudos e home office",
      "Suporta até 120 kg"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "192822"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-sti-turbo-red-magma",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-sti-turbo-red-magma",
    "inStock": true
  },
  {
    "id": 487,
    "sku": "212143",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel Red Magma com Apoio 4D e Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.5,
    "reviews": 439,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212143/138B26D1B2AAAFE5E0630300A8C068DE",
    "images": [
      "https://cdn.oderco.com.br/produtos/212143/138B26D1B2AAAFE5E0630300A8C068DE",
      "https://cdn.oderco.com.br/produtos/212143/138B26D1B2ABAFE5E0630300A8C068DE",
      "https://cdn.oderco.com.br/produtos/212143/138B26D1B2ACAFE5E0630300A8C068DE"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel Red Magma PCYes foi projetada para jogadores que exigem desempenho, resistência e ergonomia em alto nível. Inspirada na intensidade e força do magma, seu design exclusivo entrega presença marcante e personalidade ao setup gamer.\n\nPensada para longas sessões de u…",
    "features": [
      "Design exclusivo PCYes inspirado na força do magma",
      "Inclinação de até 135° para maior conforto",
      "Apoio de braço 4D com ajustes multidirecionais",
      "Suporte lombar ajustável para melhor postura",
      "Apoio magnético para cabeça removível",
      "Revestimento em PU + tecido mesh respirável",
      "Estrutura interna em ferro com espuma D45",
      "Pistão a gás Classe 4 para maior segurança"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212143"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-sentinel-red-magma-pcstl-vm",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-sentinel-red-magma-pcstl-vm",
    "inStock": true
  },
  {
    "id": 488,
    "sku": "212141",
    "name": "Cadeira Gamer PCYES Ergonômica Sentinel Black Vulcan com Apoio 4D e Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.6,
    "reviews": 476,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Escritório",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212141/138B26D1B2A5AFE5E0630300A8C068DE",
    "images": [
      "https://cdn.oderco.com.br/produtos/212141/138B26D1B2A5AFE5E0630300A8C068DE",
      "https://cdn.oderco.com.br/produtos/212141/138B26D1B2A6AFE5E0630300A8C068DE",
      "https://cdn.oderco.com.br/produtos/212141/138B26D1B2A7AFE5E0630300A8C068DE"
    ],
    "description": "A Cadeira Gamer Ergonômica Sentinel Black Vulcan PCYES foi desenvolvida para jogadores que buscam desempenho, resistência e conforto prolongado. Com design exclusivo inspirado na força do magma, ela transmite presença marcante e estilo imponente para o setup.\n\nProjetada para longas sessões de game…",
    "features": [
      "Design exclusivo PCYES inspirado na força do magma",
      "Inclinação de até 135° para momentos de relaxamento",
      "Apoio de braço 4D com ajuste multidirecional",
      "Suporte lombar ajustável para postura correta",
      "Apoio magnético para cabeça removível",
      "Revestimento em PU + tecido mesh respirável",
      "Estrutura interna em ferro com espuma injetada D45",
      "Pistão a gás Classe 4 para maior segurança e resistência"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212141"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-sentinel-black-vulcan-pcstl-pt",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-sentinel-black-vulcan-pcstl-pt",
    "inStock": true
  },
  {
    "id": 489,
    "sku": "319231",
    "name": "Cadeira Gamer PCYES STI Comfort Shadow Preta com Inclinação 135°",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.7,
    "reviews": 83,
    "category": "Cadeiras",
    "subcategory": "Cadeira Gamer",
    "tags": [
      "Gaming",
      "Cadeiras",
      "Cadeira Gamer"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/319231/3646CEEC26BB8EE5E0630300A8C06FC4",
    "images": [
      "https://cdn.oderco.com.br/produtos/319231/3646CEEC26BB8EE5E0630300A8C06FC4",
      "https://cdn.oderco.com.br/produtos/319231/414A5FFBE8101F2AE0630300A8C094C9",
      "https://cdn.oderco.com.br/produtos/319231/414A5FFBE8111F2AE0630300A8C094C9"
    ],
    "description": "A Cadeira Gamer Pcyes STI Comfort Shadow Preta (PCSTI-SW) foi desenvolvida para quem busca conforto duradouro e estilo moderno no setup gamer ou estação de trabalho. Seu design exclusivo Pcyes alia acolchoamento em malha de poliuretano à estrutura robusta, proporcionando horas de uso confortável, se…",
    "features": [
      "Inclinação de até 135° para maior conforto em jogos, estudos e trabalho",
      "Rodas em PU que deslizam suavemente sem riscar o piso",
      "Revestimento em malha de poliuretano acolchoada, respirável e durável",
      "Pistão a gás classe 3 para ajuste seguro da altura",
      "Apoio de braço fixo firme e estável",
      "Suporta até 120 kg com estabilidade e resistência"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "319231"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Gamer"
      }
    ],
    "seoSlug": "cadeira-gamer-sti-comfort-shadow-preta",
    "productUrl": "https://www.pcyes.com.br/cadeira-gamer-sti-comfort-shadow-preta",
    "inStock": true
  },
  {
    "id": 490,
    "sku": "340185",
    "name": "Placa de Rede PCYES 2.5G Quad Port RJ45 Chipset Intel PCI-E X4 LC2500-4PIT",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 120,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/340185/3CF3C27918F59D6EE0630300A8C029E5",
    "images": [
      "https://cdn.oderco.com.br/produtos/340185/3CF3C27918F59D6EE0630300A8C029E5",
      "https://cdn.oderco.com.br/produtos/340185/4AF6A7C8CCF9A3ACE0630300A8C01190",
      "https://cdn.oderco.com.br/produtos/340185/4AF6A7C8CCFAA3ACE0630300A8C01190"
    ],
    "description": "A Placa de Rede 2.5G Quad Port RJ45 Intel PCI-E LC2500-4PIT foi desenvolvida para ambientes que exigem alta capacidade de tráfego, confiabilidade e flexibilidade de rede. Equipada com o chipset Intel I226, entrega desempenho consistente em conexões Ethernet Base-T de múltiplas velocidades.\n\nCom qu…",
    "features": [
      "Quatro portas RJ45 2.5GbE para alta capacidade de rede",
      "Chipset Intel I226 com alto nível de estabilidade",
      "Compatível com redes 10/100/1000/2500 Mbps",
      "Ideal para servidores, workstations e ambientes industriais",
      "Suporte a TSN e sincronização de tempo IEEE",
      "Redução de carga da CPU com offloading de protocolos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "340185"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-rede-2-5g-quad-port-rj45-intel-lc2500-4pit",
    "productUrl": "https://www.pcyes.com.br/placa-rede-2-5g-quad-port-rj45-intel-lc2500-4pit",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 491,
    "sku": "313528",
    "name": "Cadeira Ergonômica PCYES Office B3 Preta com Tela Mesh",
    "price": "R$ 1299,90",
    "priceNum": 1299.9,
    "rating": 4.9,
    "reviews": 157,
    "category": "Cadeiras",
    "subcategory": "Cadeira Ergonômica",
    "tags": [
      "Escritório",
      "Cadeiras",
      "Cadeira Ergonômica"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/313528/32437052634B26FEE0630300A8C08F33",
    "images": [
      "https://cdn.oderco.com.br/produtos/313528/32437052634B26FEE0630300A8C08F33",
      "https://cdn.oderco.com.br/produtos/313528/44F7A7D7C81522D5E0630300A8C0D2F9",
      "https://cdn.oderco.com.br/produtos/313528/44F7A7D7C81622D5E0630300A8C0D2F9"
    ],
    "description": "A Cadeira Ergonômica Office B3 Preta foi desenvolvida para quem busca conforto, durabilidade e ergonomia no dia a dia de trabalho ou estudo. Seu design exclusivo PCYES aliado ao encosto em tela mesh proporciona melhor ventilação e conforto mesmo após várias horas de uso.\n\nO assento conta com regul…",
    "features": [
      "Encosto em tela mesh para maior ventilação e conforto",
      "Design ergonômico ideal para longas jornadas",
      "Regulagem de altura com pistão a gás Classe 3",
      "Inclinação de até 125° para mais comodidade",
      "Rodas que não danificam o piso",
      "Estrutura resistente com base em nylon"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "313528"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Cadeira Ergonômica"
      }
    ],
    "seoSlug": "cadeira-ergonomica-office-pcyes-b3-preta-tela-mesh",
    "productUrl": "https://www.pcyes.com.br/cadeira-ergonomica-office-pcyes-b3-preta-tela-mesh",
    "inStock": true
  },
  {
    "id": 492,
    "sku": "287332",
    "name": "Placa de Rede PCYES 10G SFP+ Single Port PCI-E X4 SFP10G1P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 194,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287332/3B1623D0601E9D04E0630300A8C01573",
    "images": [
      "https://cdn.oderco.com.br/produtos/287332/3B1623D0601E9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287332/3B1623D0601F9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287332/3B1623D060209D04E0630300A8C01573"
    ],
    "description": "A Placa de Rede 10G Single Port SFP PCI-E SFP10G1P é projetada para ambientes que exigem altíssimo desempenho, baixa latência e confiabilidade em redes de alta velocidade. Equipada com chipset Intel de terceira geração 82599EN, atende às demandas de data centers, servidores corporativos e estações d…",
    "features": [
      "Porta SFP+ 10 GbE para conexões de alta velocidade e longa distância",
      "Chipset Intel 82599EN com desempenho comprovado em data centers",
      "Ideal para servidores, virtualização e aplicações corporativas críticas",
      "Suporte a VLAN, Jumbo Frames e recursos avançados de rede",
      "Redução do uso da CPU com controle de interrupções e offloading",
      "Compatível com diversos sistemas operacionais e hipervisores"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287332"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-rede-10g-sfp-single-port-pcie-x4",
    "productUrl": "https://www.pcyes.com.br/placa-rede-10g-sfp-single-port-pcie-x4",
    "inStock": true
  },
  {
    "id": 493,
    "sku": "287328",
    "name": "Placa de Rede PCYES 2.5G Quad Port RJ45 PCI-E X4 LC2500-IT4P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.5,
    "reviews": 231,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287328/3B1623D060289D04E0630300A8C01573",
    "images": [
      "https://cdn.oderco.com.br/produtos/287328/3B1623D060289D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287328/3B1623D060299D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287328/3B1623D0602A9D04E0630300A8C01573"
    ],
    "description": "A Placa de Rede 2.5G Quad Port RJ45 PCI-E X4 LC2500-IT4P é indicada para ambientes que exigem alta capacidade de tráfego, estabilidade e escalabilidade de rede. Com quatro portas Ethernet 2.5GBase-T, permite a criação de conexões simultâneas de alto desempenho, sendo ideal para servidores, estações …",
    "features": [
      "Quatro portas RJ45 2.5G para maior largura de banda e conexões simultâneas",
      "Retrocompatível com redes 10/100/1000 Mbps, facilitando upgrades graduais",
      "Interface PCI-Express x4 que garante maior throughput agregado",
      "Suporte a VLAN e VLAN duplo para segmentação de rede",
      "Compatível com Jumbo Frames de até 16 KB para melhor desempenho em tráfego pesado",
      "Ideal para servidores, virtualização, storage e aplicações corporativas",
      "Ampla compatibilidade com Windows, Linux e sistemas Server"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287328"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-rede-2-5g-quad-port-rj45-pcie-x4-lc2500-it4p",
    "productUrl": "https://www.pcyes.com.br/placa-rede-2-5g-quad-port-rj45-pcie-x4-lc2500-it4p",
    "inStock": true
  },
  {
    "id": 494,
    "sku": "287329",
    "name": "Placa de Rede PCYES 2.5G Dual Port RJ45 PCI-E X1 LC2500-2P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 268,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287329/3B1623D060239D04E0630300A8C01573",
    "images": [
      "https://cdn.oderco.com.br/produtos/287329/3B1623D060239D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287329/3B1623D060249D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287329/3B1623D060259D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287329/3B1623D060269D04E0630300A8C01573"
    ],
    "description": "A Placa de Rede 2.5G Dual Port RJ45 PCI-E x1 LC2500-2P foi desenvolvida para ambientes que exigem maior largura de banda, estabilidade e desempenho superior em redes cabeadas. Equipada com o chipset Realtek RTL8125B aliado ao ASM1806, ela oferece conectividade de até 2.5Gbps por porta, garantindo tr…",
    "features": [
      "Duas portas RJ45 com velocidade de até 2.5Gbps",
      "Chipset Realtek RTL8125B de alto desempenho",
      "Ideal para servidores, workstations e redes corporativas",
      "Compatível com redes 10/100/1000/2500 Mbps",
      "Suporte a Jumbo Frames de até 16 KB",
      "Recursos avançados de virtualização (VMQ e RSS)",
      "Wake-on-LAN e tecnologia RealWoW",
      "Compatível com cabeamento CAT5e existente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287329"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-de-rede-2-5g-dual-port-x1-lc2500-2p",
    "productUrl": "https://www.pcyes.com.br/placa-de-rede-2-5g-dual-port-x1-lc2500-2p",
    "inStock": true
  },
  {
    "id": 495,
    "sku": "287326",
    "name": "Placa de Rede PCYES Gigabit Quad Port Intel CHIPSET PCI-E X1 LC1000-IT4P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.7,
    "reviews": 305,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287326/3B1623D0600F9D04E0630300A8C01573",
    "images": [
      "https://cdn.oderco.com.br/produtos/287326/3B1623D0600F9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287326/3B1623D060109D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287326/3B1623D060119D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287326/3B1623D060129D04E0630300A8C01573"
    ],
    "description": "A Placa de Rede Gigabit Quad Port RJ45 PCI-E x1 LC1000-IT4P é uma solução profissional desenvolvida para ambientes que exigem máxima estabilidade, desempenho e recursos avançados de virtualização. Equipada com o chipset Intel JL82571GB, ela entrega confiabilidade comprovada para servidores, data cen…",
    "features": [
      "Chipset Intel JL82571GB de nível corporativo",
      "Quatro portas LAN Gigabit RJ45",
      "Ideal para servidores, virtualização e data centers",
      "Suporte avançado a máquinas virtuais (VMDq até 8 VMs)",
      "Compatível com IPv4 e IPv6",
      "Suporte a Jumbo Frames de até 9,5 KB",
      "Redução de uso de CPU com RSS e controle de interrupções",
      "Compatível com VMware ESXi e sistemas corporativos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287326"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-de-rede-gigabit-quad-port-intel-chipset-lc1000-it4p",
    "productUrl": "https://www.pcyes.com.br/placa-de-rede-gigabit-quad-port-intel-chipset-lc1000-it4p",
    "inStock": true,
    "oldPrice": "R$ 235,88",
    "oldPriceNum": 235.88
  },
  {
    "id": 496,
    "sku": "287325",
    "name": "Placa de Rede PCYES Gigabit Quad Port RJ45 PCI-E LC1000-4P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.8,
    "reviews": 342,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287325/3B1623D060149D04E0630300A8C01573",
    "images": [
      "https://cdn.oderco.com.br/produtos/287325/3B1623D060149D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287325/3B1623D060159D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287325/3B1623D060169D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287325/3B1623D060179D04E0630300A8C01573"
    ],
    "description": "A Placa de Rede Gigabit Quad Port RJ45 PCI-E x1 LC1000-4P é uma solução de alto desempenho desenvolvida para ambientes que exigem estabilidade, largura de banda e múltiplas conexões de rede. Equipada com o chipset Realtek RTL8111H aliado ao ASM1184e, ela oferece quatro portas LAN Gigabit com velocid…",
    "features": [
      "Quatro portas LAN Gigabit RJ45 em uma única placa",
      "Conectividade 10/100/1000 Mbps com negociação automática",
      "Ideal para servidores, virtualização e redes corporativas",
      "Compatível com cabeamento CAT-5 existente",
      "Suporte a quadros jumbo de até 9 KB",
      "Compatível com gabinetes padrão e Low Profile",
      "Funções Wake-on-LAN e ativação remota",
      "Retrocompatível com redes 10/100BASE-T"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287325"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-de-rede-gigabit-quad-port-lc1000-4p",
    "productUrl": "https://www.pcyes.com.br/placa-de-rede-gigabit-quad-port-lc1000-4p",
    "inStock": true
  },
  {
    "id": 497,
    "sku": "36256",
    "name": "Placa de Captura PCYES Lynx UHD-03 Dual 4K",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 379,
    "category": "Streaming",
    "subcategory": "Placa de Captura",
    "tags": [
      "Streaming",
      "Streaming",
      "Placa de Captura"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212150/0439FF6EF320D8EAE0630300A8C09D34",
    "images": [
      "https://cdn.oderco.com.br/produtos/212150/0439FF6EF320D8EAE0630300A8C09D34",
      "https://cdn.oderco.com.br/produtos/212150/12712B9C29A2288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/212150/12712B9C29A3288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/212150/12712B9C29A4288BE0630300A8C0BF3A"
    ],
    "description": "A Placa de Captura PCYES Lynx UHD-03 Dual foi desenvolvida para criadores de conteúdo, streamers e profissionais que buscam alta qualidade de captura com máxima flexibilidade. Com suporte a pass-through em até 4K/60Hz e gravação em Full HD 1080p a 60 fps, ela garante transmissões fluidas e imagens n…",
    "features": [
      "Pass-through em até 4K/60Hz sem perda de qualidade",
      "Gravação em Full HD 1080p a 60 fps",
      "Duas entradas HDMI para maior flexibilidade de captura",
      "Compatível com os principais softwares de streaming",
      "Múltiplas entradas e saídas de áudio",
      "Compatível com Windows, Linux, macOS e Android",
      "Ideal para lives, gravações e produções profissionais",
      "Acompanha cabos HDMI, USB-C e controle remoto"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "36256"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Captura"
      }
    ],
    "seoSlug": "placa-de-captura-pcyes-lynx-uhd-03-dual",
    "productUrl": "https://www.pcyes.com.br/placa-de-captura-pcyes-lynx-uhd-03-dual",
    "inStock": true,
    "badge": "4K"
  },
  {
    "id": 498,
    "sku": "212150",
    "name": "Gpu Radeon R 5 230 2 Gb Ddr 3 64 Bit Projeto Edge Low Profile Single Fan Pper 230 Dr 3 Lpbr",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.4,
    "reviews": 416,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo AMD",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo AMD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212150/0439FF6EF320D8EAE0630300A8C09D34",
    "images": [
      "https://cdn.oderco.com.br/produtos/212150/0439FF6EF320D8EAE0630300A8C09D34",
      "https://cdn.oderco.com.br/produtos/212150/12712B9C29A2288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/212150/12712B9C29A3288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/212150/12712B9C29A4288BE0630300A8C0BF3A"
    ],
    "description": "A Placa de Vídeo Radeon R5 230 2GB DDR3 é uma solução eficiente para quem busca um upgrade gráfico básico em computadores domésticos ou corporativos. Indicada para tarefas do dia a dia, ela melhora a reprodução de vídeos em alta definição e o uso de aplicações leves com mais estabilidade.\n\nSeu des…",
    "features": [
      "Ideal para upgrades básicos de PCs sem GPU dedicada",
      "2GB de memória DDR3 para melhor desempenho gráfico",
      "Design Low Profile, compatível com gabinetes compactos",
      "Funcionamento silencioso com sistema Single Fan",
      "Suporte a múltiplos monitores (VGA, HDMI e DVI)",
      "Baixo consumo de energia",
      "Excelente custo-benefício para uso diário e corporativo"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212150"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo AMD"
      }
    ],
    "seoSlug": "placa-de-video-radeon-r5-230-2gb-ddr3",
    "productUrl": "https://www.pcyes.com.br/placa-de-video-radeon-r5-230-2gb-ddr3",
    "inStock": true
  },
  {
    "id": 499,
    "sku": "212135",
    "name": "Placa de Vídeo NVIDIA PCYES GeForce GT 610 2GB DDR3 Low Profile",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 453,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212135/0439FF6EF31DD8EAE0630300A8C09D34",
    "images": [
      "https://cdn.oderco.com.br/produtos/212135/0439FF6EF31DD8EAE0630300A8C09D34",
      "https://cdn.oderco.com.br/produtos/212135/12712B9C2992288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/212135/12712B9C2993288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/212135/12712B9C2994288BE0630300A8C0BF3A"
    ],
    "description": "A Placa de Vídeo NVIDIA GeForce GT 610 2GB DDR3 é a solução ideal para quem precisa de um upgrade gráfico básico, confiável e econômico. Indicada para computadores domésticos e corporativos, ela melhora significativamente a reprodução de vídeos em alta definição e o uso de múltiplos monitores.\n\nCo…",
    "features": [
      "Ideal para upgrades básicos de PCs sem GPU dedicada",
      "2GB de memória DDR3 para melhor desempenho gráfico",
      "Design Low Profile, compatível com gabinetes compactos",
      "Funcionamento silencioso com sistema Single Fan",
      "Suporte a múltiplos monitores (VGA, DVI e HDMI)",
      "Baixo consumo de energia",
      "Excelente custo-benefício para uso diário"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212135"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-de-video-nvidia-gt-610-2gb-ddr3",
    "productUrl": "https://www.pcyes.com.br/placa-de-video-nvidia-gt-610-2gb-ddr3",
    "inStock": true
  },
  {
    "id": 500,
    "sku": "264537",
    "name": "Placa de Vídeo NVIDIA PCYES GeForce RTX 3070 8GB GDDR6 Gaming Pro",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.6,
    "reviews": 60,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Gaming",
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/264537/27C1CE4F32189F3CE0630300A8C03E0C",
    "images": [
      "https://cdn.oderco.com.br/produtos/264537/27C1CE4F32189F3CE0630300A8C03E0C",
      "https://cdn.oderco.com.br/produtos/264537/27C1CE4F32199F3CE0630300A8C03E0C",
      "https://cdn.oderco.com.br/produtos/264537/27C1CE4F321A9F3CE0630300A8C03E0C",
      "https://cdn.oderco.com.br/produtos/264537/27C1CE4F321B9F3CE0630300A8C03E0C"
    ],
    "description": "A Placa de Vídeo RTX 3070 8GB GDDR6 oferece desempenho elevado para jogos atuais, aplicações gráficas e criação de conteúdo. Baseada na arquitetura NVIDIA Ampere, conta com RT Cores e Tensor Cores de segunda geração, garantindo gráficos realistas, alto FPS e suporte a Ray Tracing e inteligência arti…",
    "features": [
      "Arquitetura NVIDIA Ampere de segunda geração",
      "Alto desempenho gráfico para jogos AAA",
      "Suporte a Ray Tracing e inteligência artificial",
      "NVIDIA DLSS para maior FPS com alta qualidade visual",
      "NVIDIA Reflex para menor latência em jogos competitivos",
      "5888 Stream Processors para processamento avançado",
      "8GB de memória GDDR6 de alta velocidade",
      "Sistema de refrigeração Dual Fan eficiente"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "264537"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-video-rtx-3070-8gb-gddr6-gaming-pro",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-video-rtx-3070-8gb-gddr6-gaming-pro",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 501,
    "sku": "120345",
    "name": "Placa de Vídeo NVIDIA PCYES GeForce RTX 2060 6GB GDDR6 Dual Fan",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.7,
    "reviews": 97,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/120345/DC00D8C9BBBD6CE0E055DEF401E782F4",
    "images": [
      "https://cdn.oderco.com.br/produtos/120345/DC00D8C9BBBD6CE0E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/120345/DC00D8C9BBBE6CE0E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/120345/DC00D8C9BBBF6CE0E055DEF401E782F4",
      "https://cdn.oderco.com.br/produtos/120345/DC00D8C9BBC06CE0E055DEF401E782F4"
    ],
    "description": "A Placa de Vídeo NVIDIA GeForce RTX 2060 6GB GDDR6 Graffiti Series de modelo PA2060RTX6GDF é indicada para gamers e profissionais que buscam alto desempenho gráfico, qualidade visual avançada e maior estabilidade em jogos modernos e aplicações exigentes. Equipada com arquitetura NVIDIA RTX e 1920 CU…",
    "features": [
      "Alto desempenho gráfico para jogos modernos e aplicações pesadas",
      "1920 CUDA Cores para processamento gráfico avançado",
      "Memória GDDR6 de alta velocidade com 6GB",
      "Sistema de refrigeração Dual Fan para melhor controle térmico",
      "Design Full Size robusto e estilizado Graffiti Series",
      "Compatível com tecnologias gráficas modernas",
      "Ideal para setups gamer e profissionais",
      "Garantia de 2 anos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "120345"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-video-rtx-2060-6gb-gddr6-dual-fan",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-de-video-gpu-rtx-2060-gddr6-6gb-192-dual-fan-full-size-graffiti-series-pa2060rtx6gdf",
    "inStock": true
  },
  {
    "id": 502,
    "sku": "261073",
    "name": "Placa de Vídeo NVIDIA PCYES GeForce GT 730 4GB GDDR5 Low Profile Single Fan",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.8,
    "reviews": 134,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/261073/1982E845579912A0E0630300A8C04222",
    "images": [
      "https://cdn.oderco.com.br/produtos/261073/1982E845579912A0E0630300A8C04222",
      "https://cdn.oderco.com.br/produtos/261073/25C94E9521893DCCE0630300A8C00F3E",
      "https://cdn.oderco.com.br/produtos/261073/25C94E95218A3DCCE0630300A8C00F3E",
      "https://cdn.oderco.com.br/produtos/261073/25C94E95218B3DCCE0630300A8C00F3E"
    ],
    "description": "A Placa de Vídeo NVIDIA GeForce GT 730 4GB GDDR5 Low Profile de modelo Pvgt730Gb4Pe é a escolha ideal para quem busca melhorar o desempenho gráfico do computador em sistemas compactos, sem abrir mão de eficiência e estabilidade. Equipada com 4GB de memória GDDR5 e barramento de 64 bits, ela oferece …",
    "features": [
      "4GB de memória GDDR5 para melhor desempenho gráfico",
      "Projeto Low Profile, ideal para gabinetes compactos",
      "Sistema de refrigeração Single Fan com operação silenciosa",
      "Desempenho superior aos gráficos integrados",
      "Múltiplas saídas de vídeo para maior flexibilidade",
      "Instalação simples, sem necessidade de energia adicional",
      "Excelente opção para upgrade de PCs domésticos e corporativos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "261073"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-video-nvidia-gt-730-4gb-gddr5-low-profile",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-video-nvidia-gt-730-4gb-gddr5-low-profile",
    "inStock": true
  },
  {
    "id": 503,
    "sku": "287324",
    "name": "Placa de Rede PCYES 2.5G RJ45 PCI-E x1 Realtek RTL8125B LC2500-1P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.9,
    "reviews": 171,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287324/3B1623D0602D9D04E0630300A8C01573",
    "images": [
      "https://cdn.oderco.com.br/produtos/287324/3B1623D0602D9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287324/3B1623D0602E9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287324/3B1623D0602F9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287324/3B1623D060309D04E0630300A8C01573"
    ],
    "description": "A Placa de Rede 2.5G RJ45 PCI-Express x1 LC2500-1P é a escolha ideal para quem busca maior velocidade e eficiência na conexão de rede cabeada. Equipada com o chipset Realtek RTL8125B, ela suporta taxas de transmissão de até 2.5 Gbps, oferecendo desempenho superior em relação às redes Gigabit tradici…",
    "features": [
      "Conectividade Ethernet 2.5G para maior velocidade de rede",
      "Compatível com redes 10/100/1000 Mbps e 2.5GBase-T",
      "Ideal para upgrades de desktops, workstations e servidores",
      "Utiliza cabeamento CAT5e UTP existente",
      "Suporte a quadros jumbo para maior eficiência de transferência",
      "Função Wake-on-LAN para ativação remota",
      "Compatível com virtualização e múltiplos núcleos de CPU",
      "Interface PCI-Express x1 de alta performance"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287324"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-rede-25g-rj45-pci-e-x1-lc2500-1p",
    "productUrl": "https://www.pcyes.com.br/escritorios/placa-rede-25g-rj45-pci-e-x1-lc2500-1p",
    "inStock": true
  },
  {
    "id": 504,
    "sku": "287321",
    "name": "Placa de Rede PCYES Gigabit Dual Port RJ45 PCI-E x1 LC1000-2P",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.4,
    "reviews": 208,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287321/3B1623D0600A9D04E0630300A8C01573",
    "images": [
      "https://cdn.oderco.com.br/produtos/287321/3B1623D0600A9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287321/3B1623D0600B9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287321/3B1623D0600C9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287321/3B1623D0600D9D04E0630300A8C01573",
      "https://cdn.oderco.com.br/produtos/287321/3B1623D0600E9D04E0630300A8C01573"
    ],
    "description": "A Placa de Rede Gigabit Dual Port RJ45 PCI-Express x1 LC1000-2P é a solução ideal para quem precisa ampliar ou modernizar a conectividade de rede em computadores desktop. Equipada com os chipsets Realtek RTL8111F e ASM1187e, ela oferece alto desempenho, estabilidade e compatibilidade para ambientes …",
    "features": [
      "Duas portas LAN Gigabit RJ45 para maior flexibilidade de rede",
      "Conectividade 10/100/1000 Mbps com negociação automática",
      "Ideal para upgrades de rede em desktops domésticos e corporativos",
      "Retrocompatível com redes 10/100BASE-T",
      "Compatível com cabeamento CAT-5 existente",
      "Suporte a quadros jumbo para maior eficiência na transferência de dados",
      "Função Wake-on-LAN para ativação remota do computador",
      "Compatível com gabinetes padrão e de perfil baixo (Low Profile)"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287321"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-rede-gigabit-dual-port-rj45-pci-e-x1-lc1000-2p",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-rede-gigabit-dual-port-rj45-pci-e-x1-lc1000-2p",
    "inStock": true
  },
  {
    "id": 505,
    "sku": "259330",
    "name": "Placa de Vídeo NVIDIA PCYES GeForce GT 740 2GB GDDR5 128 Bits",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.5,
    "reviews": 245,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/259330/189437062258193CE0630300A8C08D4D",
    "images": [
      "https://cdn.oderco.com.br/produtos/259330/189437062258193CE0630300A8C08D4D",
      "https://cdn.oderco.com.br/produtos/259330/25D9A49B42802673E0630300A8C02B94",
      "https://cdn.oderco.com.br/produtos/259330/25D9A49B42812673E0630300A8C02B94",
      "https://cdn.oderco.com.br/produtos/259330/25D9A49B42822673E0630300A8C02B94",
      "https://cdn.oderco.com.br/produtos/259330/25D9A49B42832673E0630300A8C02B94"
    ],
    "description": "A Placa de Vídeo NVIDIA GeForce GT 740 2GB GDDR5 é uma excelente opção para quem busca mais desempenho gráfico em upgrades simples e eficientes. Equipada com memória GDDR5 de alta velocidade e barramento de 128 bits, ela proporciona maior fluidez em aplicações multimídia, vídeos em alta definição e …",
    "features": [
      "2GB de memória GDDR5 de alta velocidade",
      "Barramento de 128 bits, proporcionando maior largura de banda",
      "384 processadores de fluxo para melhor desempenho gráfico",
      "Múltiplas saídas de vídeo: VGA, HDMI e DVI",
      "Não necessita conector de energia adicional",
      "Sistema de refrigeração Single Fan com boa dissipação térmica",
      "Compatível com DirectX 12 e OpenGL 4.6",
      "Interface PCI Express 3.0"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "259330"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-video-nvidia-geforce-gt-740-2gb-gddr5-128-bits",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-video-nvidia-geforce-gt-740-2gb-gddr5-128-bits",
    "inStock": true,
    "oldPrice": "R$ 707,88",
    "oldPriceNum": 707.88
  },
  {
    "id": 506,
    "sku": "287317",
    "name": "Placa de Rede PCYES Gigabit PCI Express x1 RJ45 Realtek RTL8111F",
    "price": "R$ 199,90",
    "priceNum": 199.9,
    "rating": 4.6,
    "reviews": 282,
    "category": "Hardware",
    "subcategory": "Placa de Rede",
    "tags": [
      "Hardware",
      "Placa de Rede"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/287317/3B25A7855855E026E0630300A8C03D41",
    "images": [
      "https://cdn.oderco.com.br/produtos/287317/3B25A7855855E026E0630300A8C03D41",
      "https://cdn.oderco.com.br/produtos/287317/3B25A7855856E026E0630300A8C03D41",
      "https://cdn.oderco.com.br/produtos/287317/3B25A7855857E026E0630300A8C03D41",
      "https://cdn.oderco.com.br/produtos/287317/3B25A7855858E026E0630300A8C03D41"
    ],
    "description": "Placa de Rede Gigabit PCI-Express x1 RJ45 com chipset Realtek RTL8111F, indicada para melhorar o desempenho da conexão de rede em computadores desktop.\n\nOferece suporte a velocidades de 10/100/1000 Mbps, permitindo a criação ou atualização de redes Gigabit Ethernet de forma simples, utilizando cab…",
    "features": [
      "Conectividade Gigabit Ethernet 10/100/1000 Mbps",
      "Interface PCI-Express x1, compatível com PCI-E 1.1",
      "Chipset Realtek RTL8111F de alto desempenho",
      "Retrocompatível com redes 10/100BASE-T",
      "Suporte a quadros jumbo de até 9 KB",
      "Compatível com gabinetes padrão e Low Profile",
      "Função Wake-on-LAN para ativação remota",
      "Ideal para upgrade de rede em desktops domésticos e corporativos"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "287317"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Rede"
      }
    ],
    "seoSlug": "placa-de-rede-gigabit-pci-express-x1-realtek-rtl8111f",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-de-rede-gigabit-pci-express-x1-realtek-rtl8111f",
    "inStock": true,
    "oldPrice": "R$ 223,89",
    "oldPriceNum": 223.89
  },
  {
    "id": 507,
    "sku": "282767",
    "name": "Placa de Vídeo NVIDIA PCYES GeForce GT 710 2GB DDR3 Low Profile",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.7,
    "reviews": 319,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo NVIDIA",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo NVIDIA"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/282767/2D04A9618C5EF13EE0630300A8C0554C",
    "images": [
      "https://cdn.oderco.com.br/produtos/282767/2D04A9618C5EF13EE0630300A8C0554C",
      "https://cdn.oderco.com.br/produtos/282767/2D04A9618C5FF13EE0630300A8C0554C",
      "https://cdn.oderco.com.br/produtos/282767/2D04A9618C60F13EE0630300A8C0554C",
      "https://cdn.oderco.com.br/produtos/282767/2D04A9618C62F13EE0630300A8C0554C"
    ],
    "description": "A Placa de Vídeo NVIDIA GeForce GT 710 com 2GB e DDR3 de modelo PPET7102GBLP é uma solução básica, eficiente e acessível para quem deseja melhorar o desempenho gráfico do computador em tarefas do dia a dia. Seu projeto Low Profile (LP) e formato compacto tornam essa placa ideal para gabinetes pequen…",
    "features": [
      "Design Low Profile, ideal para gabinetes compactos e PCs slim",
      "2GB de memória DDR3, adequada para tarefas gráficas leves",
      "192 núcleos CUDA, garantindo melhor processamento gráfico",
      "Múltiplas saídas de vídeo: HDMI, DVI-D e D-Sub (VGA)",
      "Baixo consumo de energia (19W), ideal para PCs com fontes simples",
      "Compatível com Windows XP até Windows 11",
      "Excelente opção para upgrade de computadores sem GPU dedicada"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "282767"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo NVIDIA"
      }
    ],
    "seoSlug": "placa-de-video-nvidia-geforce-gt-710-2gb-ddr3-low-profile",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-de-video-nvidia-geforce-gt-710-2gb-ddr3-low-profile",
    "inStock": true
  },
  {
    "id": 508,
    "sku": "212138",
    "name": "Placa de Vídeo AMD PCYES Radeon R5 220 2GB DDR3 64 Bits Low Profile",
    "price": "R$ 599,90",
    "priceNum": 599.9,
    "rating": 4.8,
    "reviews": 356,
    "category": "Placas de Vídeo",
    "subcategory": "Placa de Vídeo AMD",
    "tags": [
      "Placas de Vídeo",
      "Placa de Vídeo AMD"
    ],
    "brand": "PCYES",
    "image": "https://cdn.oderco.com.br/produtos/212138/0439FF6EF31FD8EAE0630300A8C09D34",
    "images": [
      "https://cdn.oderco.com.br/produtos/212138/0439FF6EF31FD8EAE0630300A8C09D34",
      "https://cdn.oderco.com.br/produtos/212138/12712B9C299A288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/212138/12712B9C299B288BE0630300A8C0BF3A",
      "https://cdn.oderco.com.br/produtos/282767/2D04A9618C62F13EE0630300A8C0554C"
    ],
    "description": "Descrição da Placa de Vídeo AMD Radeon R5 220\n\nA AMD Radeon R5 220 2GB DDR3, modelo PPER5DR3LPBR, é indicada para quem busca melhorar o desempenho gráfico do computador de forma prática e econômica. Com design Low Profile, é compatível com gabinetes compactos e PCs slim, sendo uma excelente opção …",
    "features": [
      "Design Low Profile, ideal para gabinetes compactos e PCs slim",
      "2GB de memória DDR3, oferecendo melhor fluidez em tarefas gráficas leves",
      "Múltiplas saídas de vídeo: HDMI, DVI e VGA",
      "Sistema de refrigeração Single Fan, com funcionamento silencioso e eficiente",
      "Suporte ao OpenGL 4.5, compatível com aplicações modernas",
      "Excelente custo-benefício para uso doméstico e corporativo",
      "Ideal para upgrade de PCs antigos sem vídeo dedicado"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "212138"
      },
      {
        "label": "Marca",
        "value": "PCYES"
      },
      {
        "label": "Categoria",
        "value": "Placa de Vídeo AMD"
      }
    ],
    "seoSlug": "placa-video-amd-radeon-r5-220-2gb-ddr3-low-profile",
    "productUrl": "https://www.pcyes.com.br/gamers/placa-video-amd-radeon-r5-220-2gb-ddr3-low-profile",
    "inStock": true
  },
  {
    "id": 509,
    "sku": "325742",
    "name": "Monitor Gamer Z-MAX Z49C49\" Curvo Ultrawide 5K 120Hz",
    "price": "R$ 5.999,90",
    "priceNum": 5999.9,
    "oldPrice": "R$ 7.499,90",
    "oldPriceNum": 7499.9,
    "rating": 4.9,
    "reviews": 18,
    "category": "Monitores",
    "subcategory": "Monitor Gamer",
    "tags": [
      "Monitores",
      "Monitor Gamer",
      "Monitor",
      "Gaming"
    ],
    "brand": "Z-MAX",
    "image": "http://cdn.oderco.com.br/produtos/325742/325742-A1.jpg",
    "images": [
      "http://cdn.oderco.com.br/produtos/325742/325742-A1.jpg",
      "http://cdn.oderco.com.br/produtos/325742/325742-A2.jpg",
      "http://cdn.oderco.com.br/produtos/325742/325742-A3.png"
    ],
    "description": "Monitor Gamer Z-MAX Z49C49 — 49\" curvo ultrawide com resolução 5K (5120x1440), painel VA, taxa de atualização de 120Hz e tempo de resposta de 1ms. Tela imersiva com curvatura 1500R, equivalente a dois monitores QHD lado a lado, ideal para games competitivos, criação de conteúdo e multitarefas pesad…",
    "htmlDescription": `<style>\n.oderco-desc *,.oderco-desc *::before,.oderco-desc *::after { box-sizing: border-box; }\n.oderco-desc h2,.oderco-desc h3,.oderco-desc h4,.oderco-desc p { overflow-wrap: break-word; word-break: break-word; hyphens: auto; }\n.oderco-desc { --brand-accent: #3b82f6; --brand-accent-soft: rgba(59,130,246,0.15); padding: 52px 18px 96px; font-family: Arial, Helvetica, sans-serif; color: #e8eaf0; background: linear-gradient(180deg, #0a0c10 0%, #14161c 100%); }\n.oderco-desc img { display: block; width: 100%; height: auto; background-image: none !important; }\n.oderco-wrap { max-width: 1120px; margin: 0 auto; }\n.oderco-prealert { display: flex; align-items: center; gap: 14px; margin: 0 auto 28px; padding: 16px 22px; border-radius: 18px; background: linear-gradient(135deg, rgba(59,130,246,0.20) 0%, rgba(59,130,246,0.04) 100%); border: 1px solid rgba(59,130,246,0.32); box-shadow: 0 12px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04); position: relative; overflow: hidden; }\n.oderco-prealert::before { content: ""; position: absolute; inset: 0; background: radial-gradient(80% 120% at 0% 50%, rgba(59,130,246,0.18) 0%, transparent 60%); pointer-events: none; }\n.oderco-prealertIcon { flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 900; color: #fff; position: relative; z-index: 1; box-shadow: 0 6px 18px rgba(59,130,246,0.45); }\n.oderco-prealertText { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }\n.oderco-prealertLabel { font-size: 11px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; color: #93c5fd; line-height: 1; }\n.oderco-prealertMsg { font-size: 15px; font-weight: 700; color: #f0f4fa; line-height: 1.3; }\n.oderco-shell { background: linear-gradient(180deg, rgba(24,26,32,.88) 0%, rgba(18,20,26,.96) 100%); border: 1px solid rgba(255,255,255,.06); border-radius: 36px; box-shadow: 0 18px 50px rgba(0,0,0,.5); overflow: hidden; backdrop-filter: blur(10px); }\n.oderco-section { padding: 44px 40px; }\n.oderco-section + .oderco-section { border-top: 1px solid rgba(255,255,255,.06); }\n.oderco-kicker { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; letter-spacing: .28em; text-transform: uppercase; color: #8a92a3; margin-bottom: 16px; font-weight: 700; }\n.oderco-kicker::before { content: ""; width: 34px; height: 2px; border-radius: 999px; background: linear-gradient(90deg, var(--brand-accent), rgba(59,130,246,0.05)); }\n.oderco-hero { position: relative; overflow: hidden; background: linear-gradient(180deg, rgba(28,30,38,.6) 0%, rgba(18,20,26,.7) 100%); }\n.oderco-heroTop { max-width: 760px; margin: 0 auto 34px; text-align: center; }\n.oderco-heroTitle { margin: 0 0 16px; font-size: clamp(40px, 6vw, 64px); line-height: .96; letter-spacing: -.04em; font-weight: 800; color: #f5f6fa; }\n.oderco-heroSub { margin: 0 auto; max-width: 800px; color: #a8aeb9; font-size: 20px; line-height: 1.5; }\n.oderco-heroCard { position: relative; min-height: 420px; background: #1a1c22; border: 1px solid #2a2d35; border-radius: 32px; box-shadow: 0 18px 45px rgba(0,0,0,.45); overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 30px; }\n.oderco-heroCard--full { padding: 0; background: #1a1c22; display: block; }\n.oderco-heroCard img { width: auto; height: auto; max-width: 70%; max-height: 280px; object-fit: contain; filter: drop-shadow(0 20px 26px rgba(0,0,0,.5)); }\n.oderco-heroCard--full img { position: absolute; inset: 0; width: 100%; height: 100%; max-width: 100%; max-height: none; object-fit: cover; filter: none; }\n.oderco-focus { text-align: center; padding-top: 32px; padding-bottom: 32px; }\n.oderco-focus h2,.oderco-heading { margin: 0 0 18px; font-size: clamp(32px, 4.8vw, 54px); line-height: 1.06; letter-spacing: -.05em; font-weight: 800; color: #f5f6fa; }\n.oderco-focus p,.oderco-centerText { margin: 0 auto; max-width: 900px; color: #a8aeb9; font-size: 19px; line-height: 1.58; }\n.oderco-featureGrid { display: grid; grid-template-columns: .84fr 1.16fr; gap: 28px; align-items: stretch; }\n.oderco-card { position: relative; overflow: hidden; border-radius: 28px; background: #1a1c22; border: 1px solid #2a2d35; box-shadow: 0 12px 28px rgba(0,0,0,.4); }\n.oderco-card--visual { min-height: 720px; display: flex; align-items: flex-end; }\n.oderco-visualImage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 32px; background: #1a1c22; transition: all .3s ease; }\n.oderco-card--full .oderco-visualImage { padding: 0; background: #1a1c22; align-items: stretch; justify-content: stretch; }\n.oderco-visualImage img { height: 100%; object-fit: contain; object-position: center; }\n.oderco-card--full .oderco-visualImage img { width: 100% !important; height: 100% !important; max-width: none; max-height: none; object-fit: cover; }\n.oderco-cardContent { position: relative; z-index: 1; width: 100%; padding: 34px 32px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.78) 78%); }\n.oderco-card--full .oderco-cardContent { background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 78%); }\n.oderco-cardContent h3 { margin: 0 0 12px; font-size: clamp(22px, 2.4vw, 28px); line-height: 1.12; letter-spacing: -.03em; font-weight: 800; color: #fff; }\n.oderco-card--full .oderco-cardContent h3 { color: #fff; }\n.oderco-cardContent p { margin: 0; color: rgba(255,255,255,.78); font-size: 14px; line-height: 1.6; max-width: 520px; }\n.oderco-card--full .oderco-cardContent p { color: rgba(255,255,255,.78); }\n.oderco-stack { display: grid; gap: 28px; }\n.oderco-infoCard { position: relative; min-height: 360px; isolation: isolate; }\n.oderco-infoBody { position: relative; z-index: 2; width: 64%; min-height: 360px; padding: 32px 30px; display: flex; flex-direction: column; justify-content: center; background: linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.45) 70%, transparent 100%); }\n.oderco-card--full .oderco-infoBody { width: 100%; background: linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.5) 60%, transparent 100%); justify-content: center; }\n.oderco-infoBody h3 { margin: 0 0 14px; font-size: clamp(22px, 2.4vw, 28px); line-height: 1.12; letter-spacing: -.03em; font-weight: 800; color: #fff; max-width: 285px; }\n.oderco-card--full .oderco-infoBody h3 { color: #fff; max-width: 320px; }\n.oderco-infoBody p { margin: 0; color: rgba(255,255,255,.78); font-size: 14px; line-height: 1.6; max-width: 270px; }\n.oderco-card--full .oderco-infoBody p { color: rgba(255,255,255,.78); max-width: 300px; }\n.oderco-infoMedia { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: flex-end; padding-right: 22px; background: #1a1c22; transition: all .3s ease; }\n.oderco-card--full .oderco-infoMedia { padding-right: 0; background: #1a1c22; }\n.oderco-infoMedia img { width: auto; height: auto; max-width: 46%; max-height: 84%; object-fit: contain; object-position: right center; filter: drop-shadow(0 20px 30px rgba(0,0,0,.45)); }\n.oderco-card--full .oderco-infoMedia img { width: 100% !important; height: 100% !important; max-width: none; max-height: none; object-fit: cover; filter: none; }\n.oderco-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 34px; }\n.oderco-galleryCard { position: relative; display: block; padding: 0; border-radius: 28px; aspect-ratio: 16 / 10; background: #1a1c22; border: 1px solid #2a2d35; box-shadow: 0 12px 28px rgba(0,0,0,.4); transition: all .3s ease; overflow: hidden; }\n.oderco-card--full.oderco-galleryCard { padding: 0; }\n.oderco-galleryCard img { position: absolute; inset: 0; display: block; border-radius: 28px; width: 100% !important; height: 100% !important; max-width: none; max-height: none; object-fit: cover; object-position: center center; background: #1a1c22; transition: all .3s ease; }\n.oderco-card--full.oderco-galleryCard img { border-radius: 28px; }\n.oderco-wideText { text-align: center; padding-top: 26px; }\n.oderco-wideText h2 { margin: 0 0 18px; font-size: clamp(34px, 5vw, 60px); line-height: 1.04; letter-spacing: -.05em; font-weight: 800; color: #f5f6fa; }\n.oderco-wideText p { margin: 0 auto; max-width: 840px; color: #a8aeb9; font-size: 20px; line-height: 1.58; }\n.oderco-bannerCard { margin-top: 34px; padding: 0; border-radius: 30px; background: #1a1c22; border: 1px solid #2a2d35; overflow: hidden; box-shadow: 0 12px 28px rgba(0,0,0,.4); transition: all .3s ease; position: relative; aspect-ratio: 16 / 6; }\n.oderco-card--full.oderco-bannerCard { padding: 0; }\n.oderco-bannerCard img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; border-radius: 30px; background: #1a1c22; max-height: none; object-fit: cover; object-position: center; transition: all .3s ease; }\n.oderco-card--full.oderco-bannerCard img { border-radius: 30px; object-fit: cover; }\n.oderco-techCard { position: relative; min-height: 540px; border-radius: 30px; overflow: hidden; border: 1px solid #2a2d35; background: #1a1c22; box-shadow: 0 12px 28px rgba(0,0,0,.4); isolation: isolate; }\n.oderco-techOverlay { position: relative; z-index: 2; width: 64%; min-height: 540px; padding: 40px 34px; display: flex; flex-direction: column; justify-content: center; background: linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.6) 70%, transparent 100%); }\n.oderco-techOverlay h3 { margin: 0 0 20px; font-size: clamp(28px, 3.5vw, 38px); line-height: 1.08; letter-spacing: -.04em; font-weight: 900; color: #fff; max-width: 520px; }\n.oderco-specList { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }\n.oderco-specList li { display: grid; grid-template-columns: 150px 1fr; gap: 12px; align-items: baseline; padding: 2px 0; }\n.oderco-specKey { font-size: 12px; font-weight: 800; letter-spacing: .14em; line-height: 1.56; text-transform: uppercase; color: #8a92a3; }\n.oderco-specValue { font-size: 17px; line-height: 1.56; color: #f0f3fa; font-weight: 700; max-width: 420px; }\n.oderco-techBg { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: flex-end; padding-right: 34px; background: #1a1c22; }\n.oderco-techBg img { width: auto; height: auto; max-width: 38%; max-height: 70%; object-fit: contain; object-position: right center; filter: drop-shadow(0 20px 30px rgba(0,0,0,.5)); }\n@media (max-width: 1080px) { .oderco-section { padding: 36px 28px; } .oderco-featureGrid { grid-template-columns: 1fr; } .oderco-gallery { grid-template-columns: 1fr; } .oderco-heroCard { min-height: 360px; padding: 24px; } .oderco-heroCard img { max-width: 76%; max-height: 240px; } .oderco-heroCard--full { padding: 0; } .oderco-heroCard--full img { width: 100%; height: 100%; max-width: 100%; max-height: none; object-fit: cover; } .oderco-card--visual { min-height: 600px; } .oderco-infoCard { min-height: 360px; display: flex; flex-direction: column; } .oderco-infoBody { width: 100%; min-height: auto; position: relative; z-index: 2; justify-content: flex-start; padding: 28px 28px 12px; background: linear-gradient(180deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.65) 70%, transparent 100%); } .oderco-infoBody h3,.oderco-infoBody p { max-width: 100%; } .oderco-infoMedia { position: absolute; inset: 0; min-height: unset; padding: 0; align-items: stretch; justify-content: stretch; } .oderco-infoMedia img { width: 100% !important; height: 100% !important; max-width: none; max-height: none; object-fit: cover; object-position: center; filter: none; } .oderco-techCard { min-height: 500px; } .oderco-techOverlay { width: 64%; min-height: 500px; padding: 32px 28px; background: linear-gradient(90deg, rgba(0,0,0,.94) 0%, rgba(0,0,0,.65) 70%, transparent 100%); } .oderco-techBg { padding-right: 28px; } .oderco-techBg img { max-width: 30%; max-height: 56%; } .oderco-galleryCard { aspect-ratio: 16 / 9.5; } }\n@media (max-width: 720px) { .oderco-desc { padding: 18px 10px 46px; } .oderco-shell { border-radius: 24px; } .oderco-section { padding: 24px 20px; } .oderco-prealert { padding: 14px 16px; border-radius: 14px; gap: 12px; } .oderco-prealertIcon { width: 34px; height: 34px; font-size: 18px; border-radius: 10px; } .oderco-prealertLabel { font-size: 10px; } .oderco-prealertMsg { font-size: 13px; line-height: 1.3; } .oderco-heroTitle { font-size: 24px !important; line-height: 1.1; } .oderco-focus h2,.oderco-heading,.oderco-wideText h2 { font-size: 24px !important; line-height: 1.1; } .oderco-heroCard,.oderco-heroCard--full img,.oderco-bannerCard,.oderco-bannerCard img,.oderco-card--full.oderco-bannerCard,.oderco-card--full.oderco-bannerCard img,.oderco-galleryCard,.oderco-galleryCard img,.oderco-card--full.oderco-galleryCard,.oderco-card--full.oderco-galleryCard img,.oderco-techCard { border-radius: 12px; } .oderco-bannerCard { aspect-ratio: 3 / 2; } .oderco-featureGrid,.oderco-stack,.oderco-card,.oderco-cardContent,.oderco-infoBody,.oderco-visualImage,.oderco-infoMedia,.oderco-techOverlay,.oderco-techBg { width: 100%; max-width: 100%; min-width: 0; } .oderco-heroSub,.oderco-focus p,.oderco-centerText,.oderco-wideText p,.oderco-cardContent p,.oderco-infoBody p,.oderco-specValue { font-size: 14px; line-height: 1.62; max-width: none; } .oderco-heroCard { min-height: 280px; padding: 20px; } .oderco-heroCard img { max-width: 84%; max-height: 180px; } .oderco-heroCard--full { padding: 0; } .oderco-heroCard--full img { width: 100%; height: 100%; max-width: 100%; max-height: none; object-fit: cover; } .oderco-card--visual { min-height: 520px; display: flex; align-items: flex-end; overflow: hidden; background: #1a1c22; border: 1px solid #2a2d35; border-radius: 12px; } .oderco-visualImage,.oderco-card--full .oderco-visualImage { position: absolute; inset: 0; padding: 0; overflow: hidden; border-radius: 12px; align-items: stretch; justify-content: stretch; } .oderco-visualImage img { width: 100%; height: 100%; max-width: none; max-height: none; object-fit: contain; } .oderco-card--full .oderco-visualImage img { width: 100% !important; height: 100% !important; object-fit: cover; filter: none; } .oderco-cardContent { padding: 26px 22px; text-align: left; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 70%); } .oderco-cardContent h3 { margin: 0 0 14px; color: #fff; max-width: 100%; line-height: 1.1; letter-spacing: -.03em; } .oderco-cardContent p { color: rgba(255,255,255,.78); max-width: 100%; } .oderco-galleryCard { aspect-ratio: auto; min-height: 280px; height: 280px; } .oderco-infoCard,.oderco-card--full.oderco-infoCard { min-height: auto; display: flex; flex-direction: column; gap: 22px; overflow: visible; background: transparent; border: 0; border-radius: 0; box-shadow: none; } .oderco-infoBody,.oderco-card--full .oderco-infoBody { order: 1; width: 100%; min-height: auto; display: block; padding: 0; text-align: center; background: transparent; } .oderco-infoBody h3,.oderco-card--full .oderco-infoBody h3 { margin: 0 auto 14px; color: #f5f6fa; max-width: 100%; font-size: 22px !important; line-height: 1.1; } .oderco-infoBody p,.oderco-card--full .oderco-infoBody p { margin: 0 auto; color: #a8aeb9; max-width: 100%; } .oderco-infoMedia,.oderco-card--full .oderco-infoMedia { position: relative; inset: auto; order: 2; min-height: 240px; aspect-ratio: 16 / 10; padding: 0; overflow: hidden; border-radius: 12px; align-items: stretch; justify-content: stretch; } .oderco-infoMedia img,.oderco-card--full .oderco-infoMedia img { width: 100% !important; height: 100% !important; object-fit: cover; filter: none; } .oderco-techCard { min-height: auto; display: flex; flex-direction: column; overflow: hidden; } .oderco-techOverlay { width: 100%; min-height: auto; justify-content: flex-start; padding: 28px 22px 12px; order: 1; background: transparent; } .oderco-techBg { position: relative; inset: auto; order: 2; align-items: center; justify-content: center; padding: 12px 0 0; min-height: 300px; overflow: hidden; } .oderco-techBg img { width: 100%; height: 100%; max-width: none; max-height: none; min-height: 300px; object-fit: cover; object-position: center center; } .oderco-specList li { grid-template-columns: 1fr; gap: 6px; } }\n</style>\n<div class="oderco-desc">\n  <div class="oderco-wrap">\n    <div class="oderco-prealert">\n      <div class="oderco-prealertIcon">!</div>\n      <div class="oderco-prealertText">\n        <span class="oderco-prealertLabel">Atenção · Pré-Venda</span>\n        <span class="oderco-prealertMsg">Envio a partir de 12/05/2026</span>\n      </div>\n    </div>\n    <div class="oderco-shell">\n      <section class="oderco-section oderco-hero">\n        <div class="oderco-heroTop">\n          <p class="oderco-kicker">Monitor Gamer</p>\n          <h2 class="oderco-heroTitle" style="font-size: clamp(32px, 5vw, 44px);">MONITOR GAMER Z-MAX Z49C49&quot; CURVO ULTRAWIDE 5K 120HZ</h2>\n          <p class="oderco-heroSub">Expanda sua visão com um monitor ultrawide 5K de 49&quot;. Ideal para multitarefa, games e criação, com tela curva 1500R, 120Hz e desempenho de alto nível.</p>\n        </div>\n        <div class="oderco-heroCard oderco-heroCard--full">\n          <img src="http://cdn.oderco.com.br/produtos/325742/325742-A1.jpg" alt="MONITOR GAMER Z-MAX Z49C49 CURVO ULTRAWIDE 5K 120HZ" />\n        </div>\n      </section>\n      <section class="oderco-section oderco-focus">\n        <h2 style="font-size: clamp(32px, 5vw, 44px);">Substitua dois monitores por uma experiência 5K</h2>\n      </section>\n      <section class="oderco-section">\n        <div class="oderco-featureGrid">\n          <article class="oderco-card oderco-card--visual oderco-card--full">\n            <div class="oderco-visualImage">\n              <img src="http://cdn.oderco.com.br/produtos/325742/325742-A2.jpg" alt="RESOLUÇÃO 5K ULTRAWIDE PARA MÁXIMA PRODUTIVIDADE" />\n            </div>\n            <div class="oderco-cardContent">\n              <h3>RESOLUÇÃO 5K ULTRAWIDE PARA MÁXIMA PRODUTIVIDADE</h3>\n              <p>Com resolução 5K, equivalente a dois monitores QHD lado a lado, você ganha espaço extremo para multitarefas, edição e jogos. A curvatura 1500R envolve seu campo de visão para uma experiência mais natural e imersiva.</p>\n            </div>\n          </article>\n          <div class="oderco-stack">\n            <article class="oderco-card oderco-infoCard oderco-card--full">\n              <div class="oderco-infoBody">\n                <h3>CONTRASTE PROFUNDO E QUALIDADE VISUAL</h3>\n                <p>O painel VA com contraste de 3000:1 proporciona pretos intensos e cores mais vivas, garantindo maior profundidade em jogos, filmes e trabalhos visuais.</p>\n              </div>\n              <div class="oderco-infoMedia">\n                <img src="http://cdn.oderco.com.br/produtos/325742/325742-A3.png" alt="CONTRASTE PROFUNDO E QUALIDADE VISUAL" />\n              </div>\n            </article>\n            <article class="oderco-card oderco-infoCard oderco-card--full">\n              <div class="oderco-infoBody">\n                <h3>PERFORMANCE E CONECTIVIDADE AVANÇADA</h3>\n                <p>Com 120Hz, 1ms de resposta e tecnologias como FreeSync e G-Sync, o monitor entrega fluidez e estabilidade. As conexões HDMI, DisplayPort, USB e USB-C oferecem versatilidade para qualquer setup.</p>\n              </div>\n              <div class="oderco-infoMedia">\n                <img src="http://cdn.oderco.com.br/produtos/325742/325742-A3.png" alt="PERFORMANCE E CONECTIVIDADE AVANÇADA" />\n              </div>\n            </article>\n          </div>\n        </div>\n      </section>\n      <section class="oderco-section">\n        <h2 class="oderco-heading" style="text-align:center; font-size: clamp(32px, 5vw, 50px);">DESIGN PREMIUM E EXPERIÊNCIA IMERSIVA</h2>\n        <p class="oderco-centerText">Com acabamento moderno e tela curva de grande formato, o monitor transforma qualquer setup em um ambiente profissional e imersivo.</p>\n        <div class="oderco-gallery">\n          <div class="oderco-galleryCard oderco-card--full">\n            <img src="http://cdn.oderco.com.br/produtos/325742/325742-A1.jpg" alt="DESIGN PREMIUM E EXPERIÊNCIA IMERSIVA" />\n          </div>\n          <div class="oderco-galleryCard oderco-card--full">\n            <img src="http://cdn.oderco.com.br/produtos/325742/325742-A2.jpg" alt="DESIGN PREMIUM E EXPERIÊNCIA IMERSIVA" />\n          </div>\n        </div>\n      </section>\n      <section class="oderco-section oderco-wideText">\n        <h2 style="font-size: clamp(32px, 5vw, 44px);">UM NOVO NÍVEL DE EXPERIÊNCIA EM 5K</h2>\n        <p>Mais espaço, mais definição e mais imersão. Um monitor projetado para quem exige o máximo em produtividade e qualidade visual.</p>\n        <div class="oderco-bannerCard oderco-card--full">\n          <img src="http://cdn.oderco.com.br/produtos/325742/325742-A3.png" alt="UM NOVO NÍVEL DE EXPERIÊNCIA EM 5K" />\n        </div>\n      </section>\n      <section class="oderco-section">\n        <article class="oderco-techCard">\n          <div class="oderco-techOverlay">\n            <p class="oderco-kicker">Raio-X do Produto</p>\n            <h3>Especificações Técnicas</h3>\n            <ul class="oderco-specList">\n              <li><span class="oderco-specKey">Tamanho da tela</span><span class="oderco-specValue">49&quot; (Curvo 1500R)</span></li>\n              <li><span class="oderco-specKey">Tipo de tela</span><span class="oderco-specValue">VA</span></li>\n              <li><span class="oderco-specKey">Resolução</span><span class="oderco-specValue">5120x1440</span></li>\n              <li><span class="oderco-specKey">Taxa de atualização</span><span class="oderco-specValue">120Hz</span></li>\n              <li><span class="oderco-specKey">Tempo de resposta</span><span class="oderco-specValue">1ms</span></li>\n              <li><span class="oderco-specKey">Ângulo de visão</span><span class="oderco-specValue">H:178º / V:178º</span></li>\n              <li><span class="oderco-specKey">Brilho</span><span class="oderco-specValue">300 cd/m²</span></li>\n              <li><span class="oderco-specKey">Contraste</span><span class="oderco-specValue">3000:1</span></li>\n              <li><span class="oderco-specKey">Cobertura de cores</span><span class="oderco-specValue">100% sRGB / 85% NTSC</span></li>\n              <li><span class="oderco-specKey">VESA</span><span class="oderco-specValue">75 x 75 mm</span></li>\n              <li><span class="oderco-specKey">Conteúdo da embalagem</span><span class="oderco-specValue">1x Cabo HDMI; 1x Fonte e Manual</span></li>\n            </ul>\n          </div>\n          <div class="oderco-techBg">\n            <img src="http://cdn.oderco.com.br/produtos/325742/325742-A3.png" alt="Especificações Técnicas" />\n          </div>\n        </article>\n      </section>\n    </div>\n  </div>\n</div>`,
    "features": [
      "Tela curva ultrawide de 49\" com curvatura 1500R para máxima imersão",
      "Resolução 5K (5120x1440) — equivalente a dois monitores QHD lado a lado",
      "Painel VA com contraste profundo 3000:1 e cores vibrantes",
      "Taxa de atualização de 120Hz e tempo de resposta de 1ms",
      "Compatível com FreeSync e G-Sync para gameplay sem rasgos",
      "Cobertura de 100% sRGB e 85% NTSC",
      "Conectividade completa: HDMI, DisplayPort, USB e USB-C",
      "Suporte VESA 75x75 mm para braços e suportes de monitor"
    ],
    "specs": [
      {
        "label": "SKU",
        "value": "325742"
      },
      {
        "label": "Marca",
        "value": "Z-MAX"
      },
      {
        "label": "Categoria",
        "value": "Monitor Gamer"
      },
      {
        "label": "Tamanho",
        "value": "49\" Curvo 1500R"
      },
      {
        "label": "Resolução",
        "value": "5120x1440 (5K)"
      },
      {
        "label": "Taxa de Atualização",
        "value": "120Hz"
      },
      {
        "label": "Tempo de Resposta",
        "value": "1ms"
      },
      {
        "label": "Painel",
        "value": "VA"
      },
      {
        "label": "Contraste",
        "value": "3000:1"
      },
      {
        "label": "Brilho",
        "value": "300 cd/m²"
      },
      {
        "label": "Cobertura de Cores",
        "value": "100% sRGB / 85% NTSC"
      },
      {
        "label": "VESA",
        "value": "75 x 75 mm"
      }
    ],
    "seoSlug": "monitor-gamer-z-max-z49c49-curvo-ultrawide-5k-120hz",
    "inStock": true,
    "badge": "PRÉ-VENDA"
  }
];

function withSyntheticDiscount(p: Product): Product {
  if (p.oldPriceNum && p.oldPriceNum > p.priceNum) return p;
  const hash = (p.id * 17 + 23) % 100;
  let pct = 0;
  if (hash >= 60 && hash < 75) pct = 10 + (p.id % 8);
  else if (hash >= 75 && hash < 87) pct = 20 + (p.id % 5);
  else if (hash >= 87 && hash < 94) pct = 30 + (p.id % 5);
  else if (hash >= 94) pct = 40 + (p.id % 5);
  if (pct === 0) return p;
  const oldPriceNum = Math.round((p.priceNum / (1 - pct / 100)) * 100) / 100;
  const oldPrice = `R$ ${oldPriceNum.toFixed(2).replace(".", ",")}`;
  return { ...p, oldPriceNum, oldPrice };
}

export const allProducts: Product[] = rawProducts.map(withSyntheticDiscount);

export const categories = ["Periféricos","Refrigeração","Computadores","Hardware","Fontes","SSD e HD","Streaming","Monitores","Placas de Vídeo","Gabinetes","Cadeiras"];
export const allTags = ["Escritório","Periféricos","Cabo HDMI","Cabo","Adaptador","Refrigeração","Pasta Térmica","Computadores","Mini Computador","Computador","Cabo de Áudio","Hardware","Memória","Gaming","Fontes","Fonte","Mini PC","Wireless","Teclado Mecânico","RGB","Cabo de Video","Adaptador OTG","SSD e HD","Cabo -C","Cabo de Vídeo","Cabo AV","Water Cooler","Cooler para Processador","Mouse","Streaming","Microfone","Iluminação","Cabo Adaptador","Monitores","Placas de Vídeo","Placa de Vídeo NVIDIA","Headset","Teclado","Kit Teclado e Mouse","Adaptador de Áudio","Suporte para Tablet","Gabinetes","Suporte para Gabinete","Suporte de Monitor","Organizador de Mesa","Suporte de TV","Suporte de Microfone","Suporte de Mesa","Suporte VESA","Suporte para Notebook","Suporte para CPU","Organizador de Cabos","Suporte para Monitor","Suporte","Placa-mãe","Monitor Gamer","SSD","Monitor","Memoria","Cartão de Memória","Cartão Micro SD","Mouse Pad","Mousepad","Apoio de Pulso","Fone Gamer","Volante Gamer","Placa de Rede","Acessório para SSD","Controlador LED","Kit Cooler Fan","Cooler Fan","Controlador Fan","Kit Cooler","Cabo Splitter","Contact Frame","Gabinete Gamer","Cadeiras","Cadeira Gamer","Cadeira Ergonômica","Cadeira Office","Placa de Captura","Placa de Vídeo AMD"];
export const brands = ["PCYES","Z-MAX"];
