import { prisma } from "../lib/prisma";

const demoProducts = [
  // Laptops
  { name: "MacBook Pro 16 M3 Max", brand: "Apple", price: 650000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800" },
  { name: "ThinkPad X1 Carbon Gen 11", brand: "Lenovo", price: 350000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800" },
  { name: "XPS 15 OLED", brand: "Dell", price: 420000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800" },
  { name: "ROG Zephyrus G14", brand: "ASUS", price: 380000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800" },
  { name: "Razer Blade 16", brand: "Razer", price: 580000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800" },
  { name: "Spectre x360 14", brand: "HP", price: 310000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&q=80&w=800" },
  { name: "Surface Laptop Studio 2", brand: "Microsoft", price: 450000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80&w=800" },
  { name: "LG Gram 17", brand: "LG", price: 290000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800" },
  { name: "Alienware m18", brand: "Dell", price: 620000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800" },
  { name: "MacBook Air 15 M3", brand: "Apple", price: 280000, categorySlug: "laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800" },

  // Audio
  { name: "AirPods Pro 2nd Gen", brand: "Apple", price: 45000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800" },
  { name: "WH-1000XM5", brand: "Sony", price: 65000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800" },
  { name: "QuietComfort Ultra", brand: "Bose", price: 72000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800" },
  { name: "Momentum 4 Wireless", brand: "Sennheiser", price: 58000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800" },
  { name: "WF-1000XM5", brand: "Sony", price: 52000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800" },
  { name: "Beats Studio Pro", brand: "Beats", price: 55000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&q=80&w=800" },
  { name: "Jabra Elite 10", brand: "Jabra", price: 42000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800" },
  { name: "Pi7 S2", brand: "Bowers & Wilkins", price: 85000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800" },
  { name: "Devialet Gemini II", brand: "Devialet", price: 95000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800" },
  { name: "Galaxy Buds2 Pro", brand: "Samsung", price: 35000, categorySlug: "audio", img: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800" },

  // Accessories
  { name: "MX Master 3S", brand: "Logitech", price: 22000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800" },
  { name: "Keychron Q1 Pro", brand: "Keychron", price: 45000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800" },
  { name: "Magic Keyboard", brand: "Apple", price: 28000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1587826227038-0387b9ce052c?auto=format&fit=crop&q=80&w=800" },
  { name: "Caldigit TS4 Dock", brand: "Caldigit", price: 85000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?auto=format&fit=crop&q=80&w=800" },
  { name: "Pro Display XDR", brand: "Apple", price: 950000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800" },
  { name: "LG UltraFine 5K", brand: "LG", price: 280000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800" },
  { name: "Logitech Brio 4K", brand: "Logitech", price: 38000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1587826227038-0387b9ce052c?auto=format&fit=crop&q=80&w=800" },
  { name: "Elgato Stream Deck", brand: "Elgato", price: 32000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800" },
  { name: "Secretlab Titan Evo", brand: "Secretlab", price: 120000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800" },
  { name: "Herman Miller Aeron", brand: "Herman Miller", price: 350000, categorySlug: "accessories", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800" },
];

async function main() {
  console.log("Seeding demo products...");

  // Ensure categories exist
  const categories = [
    { name: "Laptops", slug: "laptops" },
    { name: "Audio", slug: "audio" },
    { name: "Accessories", slug: "accessories" },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const existing = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug, description: `Premium ${cat.name}` },
    });
    categoryMap[cat.slug] = existing.id;
  }

  // Insert products
  for (let i = 0; i < demoProducts.length; i++) {
    const p = demoProducts[i];
    const slug = `${p.name.toLowerCase().replace(/ /g, '-')}-${Date.now().toString().slice(-4)}-${i}`;
    
    await prisma.product.create({
      data: {
        name: p.name,
        slug,
        brand: p.brand,
        price: p.price,
        discount: i % 4 === 0 ? 10 : null, // 10% discount on some items
        shortDescription: `Premium ${p.brand} ${p.name}.`,
        fullDescription: `The ${p.name} from ${p.brand} is engineered for peak performance and unparalleled quality. It features state-of-the-art technology, beautiful design, and unmatched durability. Experience the next generation of premium tech today.`,
        categoryId: categoryMap[p.categorySlug],
        images: {
          create: [
            { url: p.img, isPrimary: true, order: 0 }
          ]
        },
        inventory: {
          create: {
            quantity: Math.floor(Math.random() * 20) + 1,
            status: "IN_STOCK"
          }
        },
        specifications: {
          create: [
            { name: "Brand", value: p.brand },
            { name: "Condition", value: "New" }
          ]
        }
      }
    });
    console.log(`Created ${p.name}`);
  }

  console.log("Seeding complete! Added 30 products.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
