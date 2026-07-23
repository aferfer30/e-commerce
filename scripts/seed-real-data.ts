import { prisma } from "../lib/prisma";

const realProducts = [
  // LAPTOPS
  {
    name: "MacBook Pro 16 M3 Max",
    brand: "Apple",
    categorySlug: "laptops",
    price: 650000,
    shortDescription: "The ultimate pro laptop with M3 Max.",
    fullDescription: "The 16-inch MacBook Pro with M3 Max is an absolute beast. It features a stunning Liquid Retina XDR display, up to 22 hours of battery life, and unparalleled performance for the most demanding workflows.",
    specs: {
      "Processor": "Apple M3 Max (16-core CPU, 40-core GPU)",
      "RAM": "128GB Unified Memory",
      "Storage": "8TB NVMe SSD",
      "Display": "16.2-inch Liquid Retina XDR (3456x2234), 120Hz ProMotion",
      "Battery": "100Wh, up to 22h video playback",
      "Weight": "2.16 kg"
    },
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "ROG Zephyrus G14 (2024)",
    brand: "ASUS",
    categorySlug: "laptops",
    price: 345000,
    shortDescription: "OLED gaming laptop with RTX 4070.",
    fullDescription: "The 2024 ROG Zephyrus G14 introduces a stunning CNC-machined aluminum chassis, a gorgeous 3K OLED panel with G-Sync, and an RTX 4070, making it the perfect hybrid for creators and gamers.",
    specs: {
      "Processor": "AMD Ryzen 9 8945HS",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM": "32GB LPDDR5X-6400",
      "Storage": "1TB PCIe 4.0 NVMe M.2 SSD",
      "Display": "14-inch 3K (2880x1800) OLED, 120Hz, 0.2ms",
      "Weight": "1.50 kg"
    },
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "ThinkPad X1 Carbon Gen 12",
    brand: "Lenovo",
    categorySlug: "laptops",
    price: 380000,
    shortDescription: "The gold standard for business.",
    fullDescription: "Lenovo's legendary ThinkPad X1 Carbon Gen 12 features a new haptic trackpad, an Intel Core Ultra processor with dedicated NPU, and aerospace-grade carbon fiber for extreme durability.",
    specs: {
      "Processor": "Intel Core Ultra 7 155H",
      "RAM": "64GB LPDDR5x-6400",
      "Storage": "2TB PCIe Gen4 Performance SSD",
      "Display": "14-inch 2.8K (2880x1800) OLED, Anti-Reflective, 400 nits",
      "Battery": "57Wh with Rapid Charge",
      "Weight": "1.09 kg"
    },
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "XPS 16 (2024)",
    brand: "Dell",
    categorySlug: "laptops",
    price: 460000,
    shortDescription: "Futuristic design meets Intel Core Ultra.",
    fullDescription: "The Dell XPS 16 features an invisible haptic trackpad, a zero-lattice keyboard, and a stunning 4K+ OLED touch display wrapped in CNC-machined platinum silver.",
    specs: {
      "Processor": "Intel Core Ultra 9 185H",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM": "64GB LPDDR5x-7467",
      "Storage": "4TB PCIe 4.0 SSD",
      "Display": "16.3-inch 4K+ (3840x2400) OLED Touch",
      "Weight": "2.13 kg"
    },
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "MacBook Air 15 M3",
    brand: "Apple",
    categorySlug: "laptops",
    price: 290000,
    shortDescription: "Impossibly thin and light.",
    fullDescription: "The 15-inch MacBook Air with M3 chip offers incredible performance and up to 18 hours of battery life in an impossibly thin fanless design.",
    specs: {
      "Processor": "Apple M3 (8-core CPU, 10-core GPU)",
      "RAM": "24GB Unified Memory",
      "Storage": "2TB NVMe SSD",
      "Display": "15.3-inch Liquid Retina (2880x1864)",
      "Battery": "66.5Wh, up to 18h",
      "Weight": "1.51 kg"
    },
    images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Blade 16 (2024)",
    brand: "Razer",
    categorySlug: "laptops",
    price: 620000,
    shortDescription: "The world's first dual-mode OLED.",
    fullDescription: "The Razer Blade 16 features a revolutionary dual-mode mini-LED display (UHD+ 120Hz or FHD+ 240Hz) and desktop-class RTX 4090 performance in a sleek unibody chassis.",
    specs: {
      "Processor": "Intel Core i9-14900HX",
      "Graphics": "NVIDIA GeForce RTX 4090 16GB GDDR6",
      "RAM": "64GB DDR5-5600",
      "Storage": "4TB (2x 2TB) PCIe 4.0 NVMe",
      "Display": "16-inch Dual-Mode (UHD+ 120Hz / FHD+ 240Hz) Mini-LED",
      "Weight": "2.45 kg"
    },
    images: ["https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Spectre x360 14",
    brand: "HP",
    categorySlug: "laptops",
    price: 310000,
    shortDescription: "Luxury 2-in-1 convertible.",
    fullDescription: "HP's Spectre x360 14 offers a 2.8K OLED display, IMAX Enhanced certification, and a gorgeous gem-cut design with incredible battery life.",
    specs: {
      "Processor": "Intel Core Ultra 7 155H",
      "RAM": "32GB LPDDR5x-7467",
      "Storage": "2TB PCIe Gen4 NVMe",
      "Display": "14-inch 2.8K (2880x1800) OLED Touch, 120Hz",
      "Battery": "68Wh, up to 13h",
      "Weight": "1.44 kg"
    },
    images: ["https://images.unsplash.com/photo-1602080858428-57174f9431cf?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Surface Laptop Studio 2",
    brand: "Microsoft",
    categorySlug: "laptops",
    price: 420000,
    shortDescription: "The most powerful Surface ever built.",
    fullDescription: "A versatile laptop with a dynamic woven hinge, the Surface Laptop Studio 2 transitions seamlessly from a laptop to an angled stage to a creative canvas.",
    specs: {
      "Processor": "Intel Core i7-13700H",
      "Graphics": "NVIDIA GeForce RTX 4060 8GB GDDR6",
      "RAM": "64GB LPDDR5x",
      "Storage": "2TB PCIe 4.0 SSD",
      "Display": "14.4-inch PixelSense Flow (2400x1600) Touch, 120Hz",
      "Weight": "1.98 kg"
    },
    images: ["https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "LG Gram 17",
    brand: "LG",
    categorySlug: "laptops",
    price: 280000,
    shortDescription: "Massive screen. Impossibly light.",
    fullDescription: "The LG Gram 17 delivers a massive 17-inch display and phenomenal battery life in a magnesium-alloy body that weighs less than most 13-inch laptops.",
    specs: {
      "Processor": "Intel Core 7 150U",
      "RAM": "32GB LPDDR5x-6400",
      "Storage": "1TB PCIe Gen4 NVMe",
      "Display": "17-inch WQXGA (2560x1600) IPS, 99% DCI-P3",
      "Battery": "77Wh, up to 21h video playback",
      "Weight": "1.35 kg"
    },
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Alienware m18 R2",
    brand: "Dell",
    categorySlug: "laptops",
    price: 680000,
    shortDescription: "Desktop replacement domination.",
    fullDescription: "The Alienware m18 R2 is an unapologetic desktop replacement, featuring advanced Cryo-tech cooling, CherryMX ultra-low profile mechanical keys, and max-TGP graphics.",
    specs: {
      "Processor": "Intel Core i9-14900HX",
      "Graphics": "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W)",
      "RAM": "64GB DDR5-5200",
      "Storage": "8TB (4x 2TB) PCIe 4.0 NVMe RAID 0",
      "Display": "18-inch QHD+ (2560x1600) 165Hz",
      "Weight": "4.23 kg"
    },
    images: ["https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&q=80&w=800"]
  },

  // AUDIO
  {
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    categorySlug: "audio",
    price: 45000,
    shortDescription: "Magical audio with USB-C.",
    fullDescription: "AirPods Pro feature up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. Now with USB-C and lossless audio support with Vision Pro.",
    specs: {
      "Chip": "Apple H2 headphone chip, Apple U1 chip in case",
      "Active Noise Cancellation": "Yes (Up to 2x more)",
      "Spatial Audio": "Personalized Spatial Audio with dynamic head tracking",
      "Battery": "Up to 6 hours listening time, 30 hours with case",
      "Resistance": "Dust, sweat, and water resistant (IP54)",
      "Charging": "USB-C, MagSafe, Apple Watch charger"
    },
    images: ["https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "WH-1000XM5",
    brand: "Sony",
    categorySlug: "audio",
    price: 65000,
    shortDescription: "Industry-leading noise cancellation.",
    fullDescription: "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening with two processors controlling eight microphones for unprecedented noise cancellation.",
    specs: {
      "Driver Unit": "30mm, specially designed",
      "Noise Cancellation": "Auto NC Optimizer with 8 microphones",
      "Battery Life": "Up to 30 hours with NC on",
      "Codecs": "SBC, AAC, LDAC",
      "Weight": "250g"
    },
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "QuietComfort Ultra",
    brand: "Bose",
    categorySlug: "audio",
    price: 75000,
    shortDescription: "Immersive audio and world-class ANC.",
    fullDescription: "Bose QC Ultra headphones feature breakthrough spatial audio for deeper immersion and CustomTune technology that auto-adjusts sound performance to your ears' liking.",
    specs: {
      "Acoustic Architecture": "Closed-back",
      "Immersive Audio": "Bose Immersive Audio (Spatialized)",
      "Noise Cancellation": "World-class CustomTune ANC",
      "Battery Life": "Up to 24 hours (18h with Immersive Audio)",
      "Weight": "252g"
    },
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Momentum 4 Wireless",
    brand: "Sennheiser",
    categorySlug: "audio",
    price: 62000,
    shortDescription: "Audiophile sound, 60h battery.",
    fullDescription: "The Momentum 4 delivers Sennheiser's Signature Sound, next-generation Adaptive ANC, and an extraordinary 60-hour battery life.",
    specs: {
      "Transducer Principle": "42mm dynamic",
      "Battery Life": "Up to 60 hours",
      "Audio Codecs": "SBC, AAC, aptX, aptX Adaptive",
      "Active Noise Cancellation": "Hybrid Adaptive ANC",
      "Weight": "293g"
    },
    images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Devialet Gemini II",
    brand: "Devialet",
    categorySlug: "audio",
    price: 95000,
    shortDescription: "Acoustic engineering masterpiece.",
    fullDescription: "Devialet Gemini II true wireless earbuds feature Devialet Adaptive Noise Cancellation™, exceptional acoustic architecture, and a wildly compact design.",
    specs: {
      "Drivers": "Custom 10mm Titanium coating",
      "Noise Cancellation": "Devialet Adaptive Noise Cancellation™ (Up to 40dB)",
      "Battery Life": "Up to 22 hours with charging case",
      "Frequency Response": "5Hz to 21kHz",
      "Weight": "6g per earbud"
    },
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "AirPods Max",
    brand: "Apple",
    categorySlug: "audio",
    price: 98000,
    shortDescription: "High-fidelity over-ear audio.",
    fullDescription: "AirPods Max perfectly combine high-fidelity audio with industry-leading Active Noise Cancellation to deliver an unparalleled listening experience. Designed with an acoustic seal for many different head shapes.",
    specs: {
      "Driver": "Apple-designed dynamic driver",
      "Design": "Knit mesh canopy and memory foam ear cushions",
      "Audio Technology": "Active Noise Cancellation, Transparency mode, Spatial audio",
      "Battery Life": "Up to 20 hours",
      "Weight": "384.8g"
    },
    images: ["https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "WF-1000XM5",
    brand: "Sony",
    categorySlug: "audio",
    price: 52000,
    shortDescription: "The best noise cancelling earbuds.",
    fullDescription: "Sony's WF-1000XM5 earbuds feature cutting-edge technology to deliver premium sound quality and the best noise-cancelling performance on the market in a compact design.",
    specs: {
      "Driver Unit": "8.4 mm Dynamic Driver X",
      "Noise Cancellation": "Dual Feedback mics, Integrated Processor V2",
      "High-Resolution Audio": "LDAC support, DSEE Extreme",
      "Battery Life": "Up to 24 hours (8h buds + 16h case)",
      "Weight": "5.9g per earbud"
    },
    images: ["https://images.unsplash.com/photo-1572569533612-85859ca447b9?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Beats Studio Pro",
    brand: "Beats",
    categorySlug: "audio",
    price: 58000,
    shortDescription: "Iconic sound, fully re-engineered.",
    fullDescription: "Beats Studio Pro delivers rich, immersive sound whether you’re listening via Bluetooth or USB-C. Fully custom acoustic platform for zero distortion.",
    specs: {
      "Acoustics": "Custom 40mm active drivers",
      "Audio Connectivity": "Class 1 Bluetooth, USB-C DAC, 3.5mm analog",
      "Battery Life": "Up to 40 hours",
      "Spatial Audio": "Personalized Spatial Audio with dynamic head tracking",
      "Weight": "260g"
    },
    images: ["https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Pi7 S2",
    brand: "Bowers & Wilkins",
    categorySlug: "audio",
    price: 85000,
    shortDescription: "True high-resolution audio.",
    fullDescription: "The Pi7 S2 continues the Bowers & Wilkins legacy of audio excellence with a 24-bit connection between earbuds, Dual Hybrid Drive units, and a smart charging case that acts as an audio retransmitter.",
    specs: {
      "Drive Units": "9.2mm Dynamic Drive + Balanced Armature",
      "Bluetooth Codecs": "aptX Adaptive, aptX HD, aptX Classic, AAC, SBC",
      "Special Feature": "Smartcase Audio Retransmission",
      "Battery Life": "Up to 21 hours total",
      "Weight": "7g per earbud"
    },
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Galaxy Buds2 Pro",
    brand: "Samsung",
    categorySlug: "audio",
    price: 35000,
    shortDescription: "24-bit Hi-Fi audio.",
    fullDescription: "Samsung's Galaxy Buds2 Pro feature a seamless, ergonomic design, 24-bit Hi-Fi audio, and Intelligent Active Noise Cancellation that tunes out the world.",
    specs: {
      "Audio": "24-bit Hi-Fi, 360 Audio with Direct Multi-channel",
      "Speakers": "Custom 2-way (Tweeter + Woofer)",
      "ANC": "Intelligent ANC with 3 high-SNR microphones",
      "Water Resistance": "IPX7",
      "Battery Life": "Up to 18 hours (with case, ANC on)"
    },
    images: ["https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?auto=format&fit=crop&q=80&w=800"]
  },

  // ACCESSORIES
  {
    name: "MX Master 3S",
    brand: "Logitech",
    categorySlug: "accessories",
    price: 22000,
    shortDescription: "The master of productivity.",
    fullDescription: "The Logitech MX Master 3S is an iconic mouse remastered for ultimate tactility, performance, and flow. Features quiet clicks and an 8,000 DPI track-on-glass sensor.",
    specs: {
      "Sensor": "Darkfield high precision (8000 DPI)",
      "Buttons": "7 buttons, MagSpeed wheel, Thumb wheel",
      "Connectivity": "Logi Bolt USB Receiver, Bluetooth Low Energy",
      "Battery": "500 mAh Li-Po, up to 70 days",
      "Weight": "141g"
    },
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Keychron Q1 Pro",
    brand: "Keychron",
    categorySlug: "accessories",
    price: 45000,
    shortDescription: "Wireless custom mechanical keyboard.",
    fullDescription: "The Q1 Pro is a premium full-metal QMK/VIA wireless custom mechanical keyboard. With a 75% layout, it allows anyone to master any keyboard keys or macro commands.",
    specs: {
      "Layout": "75% (81 Keys)",
      "Body Material": "CNC machined aluminum",
      "Connectivity": "Bluetooth 5.1 & Type-C wired",
      "Switches": "Keychron K Pro Mechanical (Hot-swappable)",
      "Battery": "4000 mAh rechargeable li-polymer"
    },
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Pro Display XDR",
    brand: "Apple",
    categorySlug: "accessories",
    price: 950000,
    shortDescription: "Mastering-grade 6K monitor.",
    fullDescription: "The first 32-inch Retina 6K display ever. Up to 1600 nits of brightness. An astonishing 1,000,000:1 contrast ratio and superwide viewing angle.",
    specs: {
      "Display": "32-inch IPS LCD with Oxide TFT technology",
      "Resolution": "6016 by 3384 pixels (20.4 million pixels) at 218 ppi",
      "Brightness": "1000 nits sustained, 1600 nits peak",
      "Contrast Ratio": "1,000,000:1",
      "Color Depth": "True 10-bit color, P3 wide color gamut"
    },
    images: ["https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Caldigit TS4 Dock",
    brand: "Caldigit",
    categorySlug: "accessories",
    price: 85000,
    shortDescription: "The ultimate Thunderbolt 4 dock.",
    fullDescription: "The TS4 offers an astounding 18 ports of connectivity, up to 98W of power delivery, and full Thunderbolt 4 40Gb/s performance for modern Mac and PC workflows.",
    specs: {
      "Interface": "Thunderbolt 4 (40Gb/s)",
      "Ports": "18 Total (3x TB4, 3x USB-C, 5x USB-A, 2.5GbE, DisplayPort, SD/microSD, Audio)",
      "Power Delivery": "Up to 98W to host",
      "Display Support": "Single 8K or Dual 6K 60Hz",
      "Material": "Premium Aluminum"
    },
    images: ["https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Herman Miller Aeron",
    brand: "Herman Miller",
    categorySlug: "accessories",
    price: 350000,
    shortDescription: "The gold standard of office seating.",
    fullDescription: "The Aeron chair revolutionized office seating with its defining design characteristics. It features 8Z Pellicle suspension material and PostureFit SL back support.",
    specs: {
      "Material": "8Z Pellicle elastomeric suspension",
      "Adjustability": "Fully adjustable arms, tilt, seat angle, PostureFit SL",
      "Environmental": "Contains ocean-bound plastic, up to 91% recyclable",
      "Weight Capacity": "Up to 350 lbs (159 kg)",
      "Warranty": "12-year, 3-shift warranty"
    },
    images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Logitech Brio 4K",
    brand: "Logitech",
    categorySlug: "accessories",
    price: 38000,
    shortDescription: "Ultra HD webcam for video conferencing.",
    fullDescription: "Step up to the world’s most technologically advanced webcam. Logitech Brio delivers 4K Ultra HD video with HDR and RightLight 3 technology.",
    specs: {
      "Resolution": "4K/30fps, 1080p/60fps",
      "Field of View": "Adjustable (65°, 78°, 90°)",
      "Focus Type": "Autofocus with glass lens",
      "Microphone": "Built-in dual omni-directional mics with noise cancellation",
      "Security": "Windows Hello infrared facial recognition"
    },
    images: ["https://images.unsplash.com/photo-1587826227038-0387b9ce052c?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Magic Keyboard with Touch ID",
    brand: "Apple",
    categorySlug: "accessories",
    price: 34000,
    shortDescription: "Wireless, rechargeable, secure.",
    fullDescription: "Magic Keyboard is now available with Touch ID, providing fast, easy, and secure authentication for logins and purchases on your Mac.",
    specs: {
      "Connectivity": "Bluetooth, Lightning port",
      "Security": "Integrated Touch ID sensor",
      "Battery": "Built-in rechargeable (1 month+ per charge)",
      "Compatibility": "Mac with Apple silicon",
      "Weight": "243g"
    },
    images: ["https://images.unsplash.com/photo-1587826227038-0387b9ce052c?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Elgato Stream Deck MK.2",
    brand: "Elgato",
    categorySlug: "accessories",
    price: 32000,
    shortDescription: "Studio control for creators.",
    fullDescription: "Stream Deck MK.2 features 15 customizable LCD keys to control apps and tools. Trigger actions, launch social posts, adjust audio, play sound clips, and much more.",
    specs: {
      "Keys": "15 customizable LCD keys",
      "Interface": "USB 2.0 (USB-C cable included)",
      "Customization": "Interchangeable faceplates",
      "Software": "Stream Deck app (macOS, Windows)",
      "Dimensions": "118 x 84 x 25 mm"
    },
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "Secretlab TITAN Evo",
    brand: "Secretlab",
    categorySlug: "accessories",
    price: 120000,
    shortDescription: "Award-winning comfort.",
    fullDescription: "The Secretlab TITAN Evo brings together the best of the TITAN and OMEGA series. Featuring 4-way L-ADAPT lumbar support and a magnetic memory foam head pillow.",
    specs: {
      "Upholstery": "Secretlab NEO Hybrid Leatherette",
      "Lumbar Support": "4-way L-ADAPT system",
      "Armrests": "Full-Metal 4D with CloudSwap replacement tech",
      "Base": "ADC12 Aluminum Wheel Base",
      "Warranty": "Up to 5 years"
    },
    images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800"]
  },
  {
    name: "LG UltraFine 5K Display",
    brand: "LG",
    categorySlug: "accessories",
    price: 280000,
    shortDescription: "The perfect Mac companion.",
    fullDescription: "The LG UltraFine 5K Display provides a breathtaking 5120-by-2880 resolution, P3 wide color gamut, and 94W of power delivery via a single Thunderbolt 3 cable.",
    specs: {
      "Display": "27-inch IPS (5120x2880)",
      "Brightness": "500 nits",
      "Color Gamut": "DCI-P3 99%",
      "Ports": "1x Thunderbolt 3 (94W PD), 3x USB-C",
      "Features": "Built-in camera, microphone, and stereo speakers"
    },
    images: ["https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800"]
  }
];

async function main() {
  console.log("Wiping existing products...");
  await prisma.product.deleteMany({});
  
  console.log("Seeding real data products...");

  const categoryMap: Record<string, string> = {};
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    categoryMap[cat.slug] = cat.id;
  }

  for (let i = 0; i < realProducts.length; i++) {
    const p = realProducts[i];
    const slug = `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}-${i}`;
    
    // Determine category ID, create if missing just in case
    let categoryId = categoryMap[p.categorySlug];
    if (!categoryId) {
      const newCat = await prisma.category.create({
        data: { name: p.categorySlug.charAt(0).toUpperCase() + p.categorySlug.slice(1), slug: p.categorySlug }
      });
      categoryId = newCat.id;
      categoryMap[p.categorySlug] = categoryId;
    }

    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        slug,
        brand: p.brand,
        price: p.price,
        discount: i % 5 === 0 ? 15 : null, // 15% discount on some items
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        categoryId: categoryId,
        images: {
          create: p.images.map((url, idx) => ({ url, isPrimary: idx === 0, order: idx }))
        },
        inventory: {
          create: {
            quantity: Math.floor(Math.random() * 50) + 1,
            status: "IN_STOCK"
          }
        },
        specifications: {
          create: Object.entries(p.specs).map(([name, value]) => ({ name, value }))
        }
      }
    });

    console.log(`Created: ${createdProduct.name}`);
  }

  console.log(`Seeding complete! Added ${realProducts.length} real products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
