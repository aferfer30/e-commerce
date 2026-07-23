import { prisma } from '../lib/prisma';

const LAPT_BRANDS = ['Apple', 'Dell', 'Lenovo', 'HP', 'Asus', 'Razer', 'MSI', 'Acer'];
const LAPT_MODELS = ['Pro', 'Max', 'Ultra', 'Gaming', 'Elite', 'Studio', 'Creator', 'Thin', 'Stealth'];
const LAPT_BASES = ['MacBook', 'XPS', 'ThinkPad', 'Spectre', 'ROG', 'Blade', 'Stealth', 'Predator'];

const AUDIO_BRANDS = ['Sony', 'Bose', 'Sennheiser', 'JBL', 'Audio-Technica', 'Beats', 'Samsung', 'Apple'];
const AUDIO_MODELS = ['Wireless', 'Noise-Cancelling', 'Pro', 'Elite', 'Studio', 'True Wireless'];
const AUDIO_BASES = ['Over-Ear Headphones', 'Earbuds', 'Speaker', 'Soundbar', 'Studio Monitor'];

const ACC_BRANDS = ['Logitech', 'Razer', 'Corsair', 'SteelSeries', 'Keychron', 'HyperX', 'Anker'];
const ACC_MODELS = ['Mechanical', 'Wireless', 'Ergonomic', 'RGB', 'Pro', 'Elite', 'Mini'];
const ACC_BASES = ['Keyboard', 'Mouse', 'Mousepad', 'Headset Stand', 'Webcam', 'USB-C Hub', 'Charger'];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(decimals));
}

function generateLaptops(categoryId: string, count: number) {
  const images = [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1537498425277-c273d32ef74c?auto=format&fit=crop&q=80&w=800'
  ];

  const products = [];
  for (let i = 0; i < count; i++) {
    const brand = randomChoice(LAPT_BRANDS);
    const base = randomChoice(LAPT_BASES);
    const model = randomChoice(LAPT_MODELS);
    const year = randomInt(2022, 2024);
    
    const name = `${brand} ${base} ${model} ${year} Edition`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + randomInt(1000, 9999);
    
    products.push({
      name,
      slug,
      brand,
      price: randomInt(100000, 450000), // DZD roughly
      discount: Math.random() > 0.7 ? randomInt(5, 20) : null,
      stock: randomInt(0, 50),
      shortDescription: `Experience uncompromised performance with the ${name}. Featuring the latest generation processors and stunning display technology.`,
      fullDescription: `The ${name} is engineered for peak performance and portability. Whether you are a creative professional rendering 4K video, a gamer seeking high frame rates, or a business executive needing reliable battery life, this machine delivers. Built with premium materials, advanced thermal cooling, and an edge-to-edge display, it stands out as a pinnacle of modern engineering.`,
      specifications: JSON.stringify({
        Processor: randomChoice(['Intel Core i7 13th Gen', 'Intel Core i9 14th Gen', 'AMD Ryzen 7 7800X', 'Apple M3 Pro', 'Apple M3 Max']),
        Memory: randomChoice(['16GB DDR5', '32GB LPDDR5x', '64GB Unified Memory']),
        Storage: randomChoice(['512GB NVMe SSD', '1TB PCIe 4.0 SSD', '2TB NVMe SSD']),
        Display: randomChoice(['14" 2.8K OLED 90Hz', '16" 4K UHD+ Mini-LED', '15.6" QHD 240Hz IPS']),
        Graphics: randomChoice(['NVIDIA RTX 4060 8GB', 'NVIDIA RTX 4080 12GB', 'Integrated AMD Radeon', 'Apple 18-core GPU']),
        Battery: randomChoice(['70Whr', '86Whr', '99.9Whr'])
      }),
      images: JSON.stringify([randomChoice(images), randomChoice(images)]),
      warranty: '2 Years Manufacturer Warranty',
      delivery: 'Free Express Delivery in 24-48h',
      seoTitle: `Buy ${name} in Algeria | NovaTech`,
      seoDescription: `Get the best price on ${name} in Algeria. Premium specs: RAM, SSD, latest processors.`,
      tags: `laptop,${brand.toLowerCase()},${base.toLowerCase()},computer,tech`,
      categoryId
    });
  }
  return products;
}

function generateAudio(categoryId: string, count: number) {
  const images = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&q=80&w=800'
  ];

  const products = [];
  for (let i = 0; i < count; i++) {
    const brand = randomChoice(AUDIO_BRANDS);
    const base = randomChoice(AUDIO_BASES);
    const model = randomChoice(AUDIO_MODELS);
    
    const name = `${brand} ${model} ${base}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + randomInt(1000, 9999);
    
    products.push({
      name,
      slug,
      brand,
      price: randomInt(15000, 85000), 
      discount: Math.random() > 0.8 ? randomInt(10, 30) : null,
      stock: randomInt(5, 100),
      shortDescription: `Immerse yourself in high-fidelity sound with the ${name}. Industry-leading active noise cancellation and crystal-clear audio.`,
      fullDescription: `The ${name} brings studio-quality sound directly to your ears. Designed with custom acoustic architecture, these devices provide a rich, detailed sound profile with deep bass and crisp highs. Long-lasting battery life ensures your music never stops, while the ergonomic design guarantees comfort during extended listening sessions.`,
      specifications: JSON.stringify({
        Type: base,
        Connectivity: randomChoice(['Bluetooth 5.3', 'Bluetooth 5.2 & Wired', 'Wireless 2.4GHz']),
        BatteryLife: randomChoice(['24 Hours', '30 Hours', '40 Hours', '12 Hours (Earbuds)']),
        NoiseCancelling: randomChoice(['Yes, ANC', 'Passive Noise Isolation', 'Adaptive ANC']),
        Microphone: 'Built-in Dual Mics with Beamforming',
        Weight: randomChoice(['250g', '5.4g (per earbud)', '310g'])
      }),
      images: JSON.stringify([randomChoice(images)]),
      warranty: '1 Year Warranty',
      delivery: 'Free Standard Delivery',
      seoTitle: `Buy ${name} | Best Audio Gear | NovaTech`,
      seoDescription: `Shop the ${name} at NovaTech. Enjoy premium sound quality and fast delivery.`,
      tags: `audio,${brand.toLowerCase()},music,headphones,wireless`,
      categoryId
    });
  }
  return products;
}

function generateAccessories(categoryId: string, count: number) {
  const images = [
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1615663245857-ac1eeb536fcb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1526657782461-9fe13401a641?auto=format&fit=crop&q=80&w=800'
  ];

  const products = [];
  for (let i = 0; i < count; i++) {
    const brand = randomChoice(ACC_BRANDS);
    const base = randomChoice(ACC_BASES);
    const model = randomChoice(ACC_MODELS);
    
    const name = `${brand} ${model} ${base}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + randomInt(1000, 9999);
    
    products.push({
      name,
      slug,
      brand,
      price: randomInt(3000, 25000), 
      discount: Math.random() > 0.85 ? randomInt(10, 50) : null,
      stock: randomInt(10, 200),
      shortDescription: `Enhance your setup with the ${name}. Precision-engineered for reliability and comfort.`,
      fullDescription: `The ${name} is an essential addition to any modern workspace or gaming station. Built to withstand heavy daily use, it offers tactile responsiveness, sleek aesthetics, and seamless integration with your existing devices. Elevate your productivity and gaming performance instantly.`,
      specifications: JSON.stringify({
        Category: base,
        Material: randomChoice(['Aluminum Alloy', 'Premium ABS Plastic', 'Matte Finish Texture']),
        Connectivity: randomChoice(['USB-C Wired', 'Wireless 2.4GHz + Bluetooth', 'Plug and Play']),
        Compatibility: 'Windows, macOS, Linux',
        Dimensions: 'Standard form factor'
      }),
      images: JSON.stringify([randomChoice(images)]),
      warranty: '6 Months Replacement Warranty',
      delivery: 'Standard Delivery in 48h',
      seoTitle: `${name} | Accessories | NovaTech`,
      seoDescription: `Upgrade your desk with ${name}. Fast shipping from NovaTech.`,
      tags: `accessory,${brand.toLowerCase()},desk,setup`,
      categoryId
    });
  }
  return products;
}

async function main() {
  console.log("Starting database seed...");

  // Upsert Categories so we don't duplicate them on multiple runs
  const catLaptops = await prisma.category.upsert({
    where: { slug: 'laptops' },
    update: {},
    create: {
      name: 'Laptops',
      slug: 'laptops',
      description: 'High-performance laptops for gaming, creation, and productivity.'
    }
  });

  const catAudio = await prisma.category.upsert({
    where: { slug: 'audio' },
    update: {},
    create: {
      name: 'Audio',
      slug: 'audio',
      description: 'Premium headphones, earbuds, and speakers for audiophiles.'
    }
  });

  const catAccessories = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Keyboards, mice, and desk accessories to complete your setup.'
    }
  });

  console.log("Categories ensured.");

  // Generate 105 total products
  const laptops = generateLaptops(catLaptops.id, 40);
  const audio = generateAudio(catAudio.id, 35);
  const accessories = generateAccessories(catAccessories.id, 30);

  const allProducts = [...laptops, ...audio, ...accessories];

  console.log(`Inserting ${allProducts.length} products...`);
  
  let insertedCount = 0;
  for (const rawProduct of allProducts) {
    const { stock, images, specifications, ...productData } = rawProduct;
    
    const imageArray = JSON.parse(images) as string[];
    const specObject = JSON.parse(specifications) as Record<string, string>;
    
    await prisma.product.create({
      data: {
        ...productData,
        inventory: {
          create: {
            quantity: stock,
            reserved: 0,
            status: stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK"
          }
        },
        images: {
          create: imageArray.map((url, index) => ({
            url,
            isPrimary: index === 0,
            order: index
          }))
        },
        specifications: {
          create: Object.entries(specObject).map(([name, value]) => ({
            name,
            value: String(value)
          }))
        }
      }
    });
    insertedCount++;
    if (insertedCount % 20 === 0) {
      console.log(`Inserted ${insertedCount} products...`);
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
