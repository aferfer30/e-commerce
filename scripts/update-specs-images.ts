import { prisma } from "../lib/prisma";

const laptopSpecs = [
  { name: "Processor", value: "Intel Core i9 / Apple M3 Max" },
  { name: "RAM", value: "32GB Unified Memory" },
  { name: "Storage", value: "1TB NVMe SSD" },
  { name: "Display", value: "16-inch Liquid Retina XDR" },
  { name: "Battery", value: "100Wh, up to 22 hours" },
  { name: "Weight", value: "2.1 kg" },
];

const audioSpecs = [
  { name: "Driver Size", value: "40mm Custom High-Excursion" },
  { name: "Active Noise Cancellation", value: "Hybrid ANC with Transparency" },
  { name: "Battery Life", value: "Up to 30 hours" },
  { name: "Connectivity", value: "Bluetooth 5.3, USB-C" },
  { name: "Weight", value: "250g" },
];

const accessorySpecs = [
  { name: "Interface", value: "USB-C / Wireless" },
  { name: "Material", value: "Machined Aluminum & Recycled Plastics" },
  { name: "Compatibility", value: "macOS, Windows, Linux" },
  { name: "Dimensions", value: "296 x 130 x 20 mm" },
  { name: "Weight", value: "810g" },
];

const laptopImages = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800"
];

const audioImages = [
  "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"
];

const accessoryImages = [
  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1587826227038-0387b9ce052c?auto=format&fit=crop&q=80&w=800"
];

async function main() {
  console.log("Updating product specs and images...");
  
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  for (const product of products) {
    // Delete old generic specs
    await prisma.productSpecification.deleteMany({
      where: { productId: product.id }
    });

    let specs = [];
    let images = [];
    
    if (product.category.slug === "laptops") {
      specs = laptopSpecs;
      images = laptopImages;
    } else if (product.category.slug === "audio") {
      specs = audioSpecs;
      images = audioImages;
    } else {
      specs = accessorySpecs;
      images = accessoryImages;
    }

    // Add new specs
    for (const spec of specs) {
      await prisma.productSpecification.create({
        data: {
          productId: product.id,
          name: spec.name,
          value: spec.value
        }
      });
    }

    // Since we created the demo products with a single image, we can just append a couple more
    // to give them a "gallery" feel.
    // First, let's delete existing images so we don't duplicate
    await prisma.productImage.deleteMany({
      where: { productId: product.id }
    });

    // We'll give each product 3 images from its category pool
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: images[i],
          isPrimary: i === 0,
          order: i
        }
      });
    }

    console.log(`Updated specs & images for: ${product.name}`);
  }

  console.log("Update complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
