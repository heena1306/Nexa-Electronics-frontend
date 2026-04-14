/** Shared catalog — UI-only mock data for Nexa Electronics */

export const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=2`;

export const PRODUCT_IMAGES = {
  1: pexels(3780681), // headphones
  2: pexels(4342090), // television
  3: pexels(274924), // mirrorless camera
  4: pexels(1647451), // bluetooth speaker
  5: pexels(1229861), // laptop stand
  6: pexels(1779487), // mechanical keyboard
  7: pexels(437037), // smartwatch
  8: pexels(3861969), // usb-c hub
  9: pexels(5082579), // soundbar
  10: pexels(3394650), // earbuds
  11: pexels(2882521), // monitor
  12: pexels(320617), // action camera
  13: pexels(1571458), // studio monitor pair
  14: pexels(767648), // compact photo printer
  15: pexels(248533), // router
  16: pexels(1714208), // portable ssd
  17: pexels(2399840), // earbuds lite
  18: pexels(265667), // streaming device
  19: pexels(164821), // gaming mouse
  20: pexels(3930477), // turntable
  21: pexels(274924), // dash cam
  22: pexels(437037), // smartphone
  23: pexels(1229861), // ultrabook
  24: pexels(3780681), // headphones max
  25: pexels(1647451), // smart speaker
  26: pexels(2882521), // oled monitor
  27: pexels(3861969), // charging pad
  28: pexels(3930477), // fitness band
  29: pexels(437037), // tablet
  30: pexels(274924), // camera lens
  31: pexels(3780681), // gaming headset
  32: pexels(3861969), // smart plug
  33: pexels(265667), // projector
  34: pexels(3861969), // 100w charger
  35: pexels(320617), // drone
  36: pexels(767648), // e-reader
  37: pexels(5082579), // atmos soundbar
  38: pexels(1779487), // webcam
  39: pexels(248533), // thermostat
  40: pexels(1714208), // nvme
  41: pexels(3394650), // sport earbuds
  42: pexels(274924), // camera body
  43: pexels(248533), // wifi 7 router
  44: pexels(1229861), // drawing tablet
  45: pexels(248533), // smart doorbell
};

export const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Noise-Cancel Headphones",
    price: 199.99,
    compareAtPrice: 249.99,
    image: PRODUCT_IMAGES[1],
    images: [
      PRODUCT_IMAGES[1],
      PRODUCT_IMAGES[6],
      PRODUCT_IMAGES[13],
      PRODUCT_IMAGES[21],
    ],
    category: "Audio",
    tag: "Music",
    rating: 5.0,
    reviews: 1200,
    description:
      "Premium active noise cancellation with plush ear cushions, 30-hour battery life, and Nexa-tuned drivers for clear highs and deep bass.",
    colors: [
      { id: "blk", label: "Black", hex: "#171717" },
      { id: "nvy", label: "Navy", hex: "#1e3a5f" },
      { id: "slv", label: "Silver", hex: "#a3a3a3" },
    ],
    stock: "in",
  },
  {
    id: 2,
    title: "4K Smart LED Television",
    price: 849.0,
    compareAtPrice: 999.0,
    image: PRODUCT_IMAGES[2],
    category: "TV",
    tag: "Home",
    rating: 4.8,
    reviews: 342,
    description:
      "Cinematic 4K HDR with smart apps, voice control, and slim bezels—perfect for movies and gaming nights.",
    colors: [
      { id: "blk", label: "Black", hex: "#171717" },
      { id: "slv", label: "Silver", hex: "#d4d4d4" },
    ],
  },
  {
    id: 3,
    title: "Mirrorless Camera Kit",
    price: 1249.5,
    compareAtPrice: 1399.0,
    image: PRODUCT_IMAGES[3],
    category: "Cameras",
    tag: "Other",
    rating: 4.9,
    reviews: 89,
    description:
      "Pro-grade sensor, fast autofocus, and a versatile zoom lens—capture detail in any light.",
    colors: [
      { id: "blk", label: "Black", hex: "#171717" },
    ],
  },
  {
    id: 4,
    title: "Portable Bluetooth Speaker",
    price: 79.95,
    compareAtPrice: 99.99,
    image: PRODUCT_IMAGES[4],
    category: "Speakers",
    tag: "Music",
    rating: 4.5,
    reviews: 256,
    description:
      "Room-filling 360° sound, IPX7 water resistance, and all-day battery for indoor/outdoor use.",
    colors: [
      { id: "blk", label: "Black", hex: "#171717" },
      { id: "blu", label: "Blue", hex: "#2563eb" },
    ],
  },
  {
    id: 5,
    title: "Ergonomic Laptop Stand",
    price: 49.0,
    compareAtPrice: 69.0,
    image: PRODUCT_IMAGES[5],
    category: "Accessories",
    tag: "Home",
    rating: 4.7,
    reviews: 412,
    description:
      "Aluminum stand with adjustable height—better posture and cleaner desk ergonomics.",
    colors: [
      { id: "slv", label: "Silver", hex: "#d4d4d4" },
      { id: "blk", label: "Space Gray", hex: "#525252" },
    ],
  },
  {
    id: 6,
    title: "Mechanical Gaming Keyboard",
    price: 129.0,
    compareAtPrice: 159.0,
    image: PRODUCT_IMAGES[6],
    category: "Accessories",
    tag: "Other",
    rating: 4.4,
    reviews: 167,
    description:
      "Tactile switches, per-key RGB, and durable PBT keycaps built for competitive play.",
    colors: [
      { id: "blk", label: "Black", hex: "#171717" },
    ],
  },
  {
    id: 7,
    title: "Smart Watch Pro",
    price: 299.0,
    compareAtPrice: 349.0,
    image: PRODUCT_IMAGES[7],
    category: "Wearables",
    tag: "Phone",
    rating: 4.6,
    reviews: 521,
    description:
      "Always-on display, health sensors, GPS, and seamless notifications on your wrist.",
    colors: [
      { id: "blk", label: "Midnight", hex: "#171717" },
      { id: "slv", label: "Silver", hex: "#e5e5e5" },
      { id: "red", label: "Product Red", hex: "#dc2626" },
    ],
  },
  {
    id: 8,
    title: "USB-C Hub 7-in-1",
    price: 39.99,
    compareAtPrice: 49.99,
    image: PRODUCT_IMAGES[8],
    category: "Accessories",
    tag: "Storage",
    rating: 4.3,
    reviews: 98,
    description:
      "HDMI, USB-A, SD/microSD, and pass-through charging—one hub for your entire setup.",
    colors: [
      { id: "gry", label: "Gray", hex: "#737373" },
    ],
  },
  {
    id: 9,
    title: "Smart Soundbar Mini",
    price: 29.9,
    compareAtPrice: 39.99,
    image: PRODUCT_IMAGES[9],
    category: "Audio",
    tag: "Music",
    rating: 5.0,
    reviews: 1200,
    description:
      "Compact soundbar with clear dialogue mode and wireless sub pairing.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 10,
    title: "Wireless Earbuds Pro",
    price: 119.0,
    compareAtPrice: 159.0,
    image: PRODUCT_IMAGES[10],
    category: "Audio",
    tag: "Music",
    rating: 4.7,
    reviews: 890,
    description:
      "ANC earbuds with transparency mode, spatial audio, and a pocketable charging case.",
    colors: [
      { id: "wht", label: "White", hex: "#f5f5f5" },
      { id: "blk", label: "Black", hex: "#171717" },
    ],
  },
  {
    id: 11,
    title: "Ultrawide USB-C Monitor",
    price: 449.0,
    compareAtPrice: 529.0,
    image: PRODUCT_IMAGES[11],
    category: "TV",
    tag: "Home",
    rating: 4.6,
    reviews: 203,
    description:
      "34\" ultrawide for multitasking—USB-C single-cable connectivity and accurate color.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 12,
    title: "4K Action Camera",
    price: 279.0,
    compareAtPrice: 329.0,
    image: PRODUCT_IMAGES[12],
    category: "Cameras",
    tag: "Other",
    rating: 4.5,
    reviews: 112,
    description:
      "Waterproof housing, hyper-smooth stabilization, and 4K/60 capture for adventures.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 13,
    title: "Studio Monitor Pair",
    price: 329.0,
    compareAtPrice: 399.0,
    image: PRODUCT_IMAGES[13],
    category: "Audio",
    tag: "Music",
    rating: 4.8,
    reviews: 640,
    description:
      "Flat frequency response for mixing—balanced inputs and room-friendly imaging.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 14,
    title: "Compact Photo Printer",
    price: 89.0,
    compareAtPrice: 119.0,
    image: PRODUCT_IMAGES[14],
    category: "Accessories",
    tag: "Home",
    rating: 4.2,
    reviews: 54,
    description:
      "Print photos instantly from your phone—compact, dye-sub quality without hassle.",
    colors: [{ id: "wht", label: "White", hex: "#fafafa" }],
  },
  {
    id: 15,
    title: "Mesh Wi-Fi Router",
    price: 149.0,
    compareAtPrice: 189.0,
    image: PRODUCT_IMAGES[15],
    category: "Networking",
    tag: "Home",
    rating: 4.4,
    reviews: 312,
    description:
      "Whole-home coverage with easy app setup and parental controls.",
    colors: [{ id: "wht", label: "White", hex: "#f5f5f5" }],
  },
  {
    id: 16,
    title: "Portable SSD 1TB",
    price: 109.0,
    compareAtPrice: 139.0,
    image: PRODUCT_IMAGES[16],
    category: "Storage",
    tag: "Storage",
    rating: 4.8,
    reviews: 441,
    description:
      "Blazing transfers, shock-resistant shell, and hardware encryption for peace of mind.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 17,
    title: "Noise-Cancel Earbuds Lite",
    price: 59.0,
    compareAtPrice: 79.0,
    image: PRODUCT_IMAGES[17],
    category: "Audio",
    tag: "Music",
    rating: 4.3,
    reviews: 678,
    description:
      "Lightweight ANC earbuds with punchy bass and quick charge in minutes.",
    colors: [
      { id: "blk", label: "Black", hex: "#171717" },
      { id: "blu", label: "Blue", hex: "#2563eb" },
    ],
  },
  {
    id: 18,
    title: "Streaming Stick 4K",
    price: 39.0,
    compareAtPrice: 54.99,
    image: PRODUCT_IMAGES[18],
    category: "TV",
    tag: "Home",
    rating: 4.5,
    reviews: 920,
    description:
      "Plug-in 4K streaming with voice remote and support for all major apps.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 19,
    title: "RGB Gaming Mouse",
    price: 49.0,
    compareAtPrice: 69.0,
    image: PRODUCT_IMAGES[19],
    category: "Gaming",
    tag: "Other",
    rating: 4.6,
    reviews: 334,
    description:
      "Precision sensor, lightweight shell, and smooth PTFE feet for flick shots.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 20,
    title: "Bluetooth Turntable",
    price: 179.0,
    compareAtPrice: 229.0,
    image: PRODUCT_IMAGES[20],
    category: "Audio",
    tag: "Music",
    rating: 4.5,
    reviews: 156,
    description:
      "Belt-drive turntable with Bluetooth out—warm vinyl sound, modern convenience.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 21,
    title: "Car Dash Cam HD",
    price: 89.0,
    compareAtPrice: 119.0,
    image: PRODUCT_IMAGES[21],
    category: "Cameras",
    tag: "Other",
    rating: 4.4,
    reviews: 267,
    description:
      "Wide-angle recording, night vision, and loop recording for safer drives.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 22,
    title: "Nexa Phone 15 Pro",
    price: 999.0,
    compareAtPrice: 1099.0,
    image: PRODUCT_IMAGES[22],
    category: "Mobiles",
    tag: "New",
    rating: 4.9,
    reviews: 4521,
    badge: "new",
    description: "Titanium build, pro camera system, all-day battery.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 23,
    title: "Ultrabook Air 14\"",
    price: 1199.0,
    compareAtPrice: 1349.0,
    image: PRODUCT_IMAGES[23],
    category: "Laptops",
    tag: "New",
    rating: 4.8,
    reviews: 892,
    badge: "new",
    description: "Feather-light aluminum, vivid display, silent cooling.",
    colors: [{ id: "slv", label: "Silver", hex: "#d4d4d4" }],
  },
  {
    id: 24,
    title: "Studio Headphones Max",
    price: 349.0,
    compareAtPrice: 399.0,
    image: PRODUCT_IMAGES[24],
    category: "Audio",
    tag: "Music",
    rating: 4.7,
    reviews: 1203,
    description: "Reference sound with plush memory foam and folding design.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 25,
    title: "Mini Smart Speaker",
    price: 59.0,
    compareAtPrice: 79.0,
    image: PRODUCT_IMAGES[25],
    category: "Speakers",
    tag: "Home",
    rating: 4.4,
    reviews: 678,
    description: "Room-filling sound with voice assistant built in.",
    colors: [{ id: "wht", label: "White", hex: "#fafafa" }],
  },
  {
    id: 26,
    title: "4K OLED Monitor 32\"",
    price: 699.0,
    compareAtPrice: 849.0,
    image: PRODUCT_IMAGES[26],
    category: "Monitors",
    tag: "Home",
    rating: 4.6,
    reviews: 445,
    description: "HDR OLED with USB-C hub and ergonomic stand.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 27,
    title: "Wireless Charging Pad Duo",
    price: 45.0,
    compareAtPrice: 59.0,
    image: PRODUCT_IMAGES[27],
    category: "Accessories",
    tag: "Other",
    rating: 4.3,
    reviews: 334,
    description: "Fast dual-device charging with LED status ring.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 28,
    title: "Fitness Band Pulse",
    price: 79.0,
    compareAtPrice: 99.0,
    image: PRODUCT_IMAGES[28],
    category: "Wearables",
    tag: "Phone",
    rating: 4.5,
    reviews: 2100,
    description: "AMOLED display, SpO₂, sleep tracking, 14-day battery.",
    colors: [{ id: "blk", label: "Midnight", hex: "#171717" }],
  },
  {
    id: 29,
    title: "Pro Tablet 11\"",
    price: 649.0,
    compareAtPrice: 749.0,
    image: PRODUCT_IMAGES[29],
    category: "Tablets",
    tag: "New",
    rating: 4.8,
    reviews: 567,
    badge: "new",
    description: "120Hz display, stylus support, desktop-class chip.",
    colors: [{ id: "slv", label: "Silver", hex: "#e5e5e5" }],
  },
  {
    id: 30,
    title: "Mirrorless Lens 24-70mm",
    price: 899.0,
    compareAtPrice: null,
    image: PRODUCT_IMAGES[30],
    category: "Cameras",
    tag: "Other",
    rating: 4.9,
    reviews: 156,
    description: "Constant f/2.8, weather-sealed, nano coating.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 31,
    title: "Gaming Headset 7.1",
    price: 119.0,
    compareAtPrice: 149.0,
    image: PRODUCT_IMAGES[31],
    category: "Gaming",
    tag: "Other",
    rating: 4.5,
    reviews: 889,
    description: "Surround USB DAC, detachable mic, cooling gel ear cups.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 32,
    title: "Smart Plug Mini (4-pack)",
    price: 49.0,
    compareAtPrice: 69.0,
    image: PRODUCT_IMAGES[32],
    category: "Smart Home",
    tag: "Home",
    rating: 4.6,
    reviews: 1205,
    description: "Energy monitoring, schedules, works with major assistants.",
    colors: [{ id: "wht", label: "White", hex: "#fff" }],
  },
  {
    id: 33,
    title: "Portable Projector 1080p",
    price: 279.0,
    compareAtPrice: 349.0,
    image: PRODUCT_IMAGES[33],
    category: "TV",
    tag: "Home",
    rating: 4.4,
    reviews: 412,
    description: "Auto keystone, battery mode, built-in speakers.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 34,
    title: "USB-C PD Charger 100W",
    price: 69.0,
    compareAtPrice: 89.0,
    image: PRODUCT_IMAGES[34],
    category: "Accessories",
    tag: "Storage",
    rating: 4.7,
    reviews: 723,
    description: "GaN compact brick with dual USB-C and foldable prongs.",
    colors: [{ id: "gry", label: "Gray", hex: "#737373" }],
  },
  {
    id: 35,
    title: "Drone Mini 4K",
    price: 599.0,
    compareAtPrice: 699.0,
    image: PRODUCT_IMAGES[35],
    category: "Cameras",
    tag: "Other",
    rating: 4.6,
    reviews: 298,
    description: "3-axis gimbal, obstacle sensing, 34-min flight time.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 36,
    title: "E-Reader Paper 7\"",
    price: 139.0,
    compareAtPrice: 159.0,
    image: PRODUCT_IMAGES[36],
    category: "Tablets",
    tag: "Home",
    rating: 4.5,
    reviews: 1567,
    description: "Glare-free e-ink, warm light, weeks of battery.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 37,
    title: "Soundbar Dolby Atmos",
    price: 449.0,
    compareAtPrice: 529.0,
    image: PRODUCT_IMAGES[37],
    category: "Audio",
    tag: "Music",
    rating: 4.7,
    reviews: 634,
    description: "Wireless sub, HDMI eARC, voice enhancement mode.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 38,
    title: "Webcam Pro 4K",
    price: 159.0,
    compareAtPrice: 199.0,
    image: PRODUCT_IMAGES[38],
    category: "Accessories",
    tag: "Other",
    rating: 4.4,
    reviews: 445,
    description: "HDR, dual mics, privacy shutter, tripod thread.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 39,
    title: "Smart Thermostat",
    price: 199.0,
    compareAtPrice: 249.0,
    image: PRODUCT_IMAGES[39],
    category: "Smart Home",
    tag: "Home",
    rating: 4.5,
    reviews: 876,
    description: "Learning schedules, humidity sensing, app control.",
    colors: [{ id: "wht", label: "White", hex: "#f5f5f5" }],
  },
  {
    id: 40,
    title: "NVMe SSD 2TB Gen4",
    price: 179.0,
    compareAtPrice: 219.0,
    image: PRODUCT_IMAGES[40],
    category: "Storage",
    tag: "Storage",
    rating: 4.8,
    reviews: 2341,
    badge: "new",
    description: "7400 MB/s reads, heatsink included, 5-year warranty.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 41,
    title: "Noise Earbuds Sport",
    price: 99.0,
    compareAtPrice: 129.0,
    image: PRODUCT_IMAGES[41],
    category: "Audio",
    tag: "Music",
    rating: 4.6,
    reviews: 1122,
    description: "IPX7, secure fit wings, multipoint pairing.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 42,
    title: "Compact Mirrorless Body",
    price: 1599.0,
    compareAtPrice: 1799.0,
    image: PRODUCT_IMAGES[42],
    category: "Cameras",
    tag: "Other",
    rating: 4.9,
    reviews: 212,
    description: "Full-frame sensor, 8K video, dual card slots.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 43,
    title: "Router Wi-Fi 7",
    price: 329.0,
    compareAtPrice: 399.0,
    image: PRODUCT_IMAGES[43],
    category: "Networking",
    tag: "Home",
    rating: 4.5,
    reviews: 567,
    description: "Mesh-ready, 2.5G WAN, parental controls.",
    colors: [{ id: "wht", label: "White", hex: "#fafafa" }],
  },
  {
    id: 44,
    title: "Drawing Tablet 13\"",
    price: 399.0,
    compareAtPrice: 479.0,
    image: PRODUCT_IMAGES[44],
    category: "Accessories",
    tag: "Home",
    rating: 4.6,
    reviews: 334,
    description: "Laminated display, 8192 pressure levels, USB-C.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
  {
    id: 45,
    title: "Smart Doorbell 2K",
    price: 149.0,
    compareAtPrice: 189.0,
    image: PRODUCT_IMAGES[45],
    category: "Smart Home",
    tag: "Home",
    rating: 4.4,
    reviews: 990,
    description: "HDR night vision, package detection, local storage.",
    colors: [{ id: "blk", label: "Black", hex: "#171717" }],
  },
];

/** Category rows for search autocomplete (labels + thumbnails) */
/** Homepage “Trending categories” — circular tiles (image 2 style) */
export const TRENDING_CIRCLES = [
  {
    id: "t1",
    label: "iPhone",
    to: "/shop/mobiles",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "t2",
    label: "Speakers",
    to: "/shop/headphones",
    image:
      pexels(1647451),
  },
  {
    id: "t3",
    label: "Tablets",
    to: "/shop/accessories",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "t4",
    label: "Headphones",
    to: "/shop/headphones",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "t5",
    label: "Laptops",
    to: "/shop/laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "t6",
    label: "Accessories",
    to: "/shop/accessories",
    image:
      pexels(3861969),
  },
];

export const QUICK_CATEGORY_SEARCH = [
  {
    id: "mobiles",
    label: "Mobiles & smartphones",
    to: "/shop/mobiles",
    thumb:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: "laptops",
    label: "Laptops",
    to: "/shop/laptops",
    thumb:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: "headphones",
    label: "Headphones & audio",
    to: "/shop/headphones",
    thumb:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e2?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: "watches",
    label: "Smart watches",
    to: "/shop/smart-watches",
    thumb:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17c?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: "accessories",
    label: "Accessories",
    to: "/shop/accessories",
    thumb:
      "https://images.unsplash.com/photo-1625948515291-4a4e2f6d0c1?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: "gaming",
    label: "Gaming gear",
    to: "/shop/gaming",
    thumb:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&q=80&auto=format&fit=crop",
  },
];

export function getSearchSuggestions(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return { products: [], categories: [] };
  const products = PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.tag && String(p.tag).toLowerCase().includes(q))
  ).slice(0, 8);
  const categories = QUICK_CATEGORY_SEARCH.filter((c) =>
    c.label.toLowerCase().includes(q)
  ).slice(0, 5);
  return { products, categories };
}

export function getProductById(id) {
  const n = Number(id);
  return PRODUCTS.find((p) => p.id === n) ?? null;
}

export function productGalleryImages(p) {
  if (p.images?.length) return p.images;
  return [p.image];
}

/** Route slug for /shop/:category */
export function shopSlugForProduct(p) {
  const cat = (p.category || "").toLowerCase();
  if (cat === "mobiles") return "mobiles";
  if (cat === "laptops") return "laptops";
  const t = `${p.title} ${p.category ?? ""} ${p.tag ?? ""}`.toLowerCase();
  if (/\b(smart watch|wearable)\b/i.test(t)) return "smart-watches";
  if (/\bwatch\b/.test(t) && /smart|pro|pulse|band/i.test(t)) return "smart-watches";
  if (/headphone|earbud|speaker|soundbar|audio|turntable|noise|monitor pair|soundbar/i.test(t))
    return "headphones";
  if (/laptop|macbook|chromebook|ultrabook/i.test(t)) return "laptops";
  if (/iphone|galaxy|pixel|mobile|smartphone|\bphone\b|nexa phone/i.test(t)) return "mobiles";
  if (/gaming|rgb|headset 7/i.test(t)) return "gaming";
  return "accessories";
}

export function filterProductsByShopSlug(products, slug) {
  const s = (slug || "all").toLowerCase();
  if (s === "all" || s === "electronics") return products;
  return products.filter((p) => shopSlugForProduct(p) === s);
}

/** UI-only brand filter for `/shop/all?brand=` — maps to curated product IDs */
export const BRAND_PRODUCT_IDS = {
  apple: [7, 10, 22, 23, 29, 36],
  samsung: [2, 4, 16, 25, 33, 40],
  sony: [1, 3, 9, 13, 24, 37],
  hp: [14, 17, 26, 38, 8, 39],
  dell: [5, 11, 12, 35, 44, 18],
  lenovo: [19, 21, 28, 32, 41, 42],
  asus: [6, 15, 31, 34, 43, 45],
};

export const BRAND_SLUG_TO_LABEL = {
  apple: "Apple",
  samsung: "Samsung",
  sony: "Sony",
  hp: "HP",
  dell: "Dell",
  lenovo: "Lenovo",
  asus: "ASUS",
};

export function filterProductsByBrandSlug(products, brandSlug) {
  const s = (brandSlug || "").trim().toLowerCase();
  if (!s || !BRAND_PRODUCT_IDS[s]) return products;
  const ids = new Set(BRAND_PRODUCT_IDS[s]);
  return products.filter((p) => ids.has(p.id));
}

/** Brands landing page — cards + logo strip */
export const SHOP_BRANDS = [
  {
    slug: "apple",
    name: "Apple",
    tagline: "Innovation by Apple",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "samsung",
    name: "Samsung",
    tagline: "Do what you can’t",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "sony",
    name: "Sony",
    tagline: "Make believe",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "hp",
    name: "HP",
    tagline: "Keep reinventing",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "dell",
    name: "Dell",
    tagline: "Innovation that matters",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80&auto=format&fit=crop",
  },
  {
    slug: "lenovo",
    name: "Lenovo",
    tagline: "Smarter technology for all",
    image:
      pexels(1229861),
  },
  {
    slug: "asus",
    name: "ASUS",
    tagline: "In search of incredible",
    image:
      pexels(1779487),
  },
];

export function getShopBrandBySlug(slug) {
  const s = (slug || "").trim().toLowerCase();
  return SHOP_BRANDS.find((b) => b.slug === s) ?? null;
}

export const HOME_CATEGORY_SHOP_LINKS = {
  mobiles: "/shop/mobiles",
  laptops: "/shop/laptops",
  audio: "/shop/headphones",
  accessories: "/shop/accessories",
  gaming: "/shop/gaming",
};

/** All categories grid — matches requested storefront groups */
export const CATEGORIES_PAGE_ITEMS = [
  {
    id: "mobiles",
    label: "Mobiles",
    blurb: "Phones & essentials",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80&auto=format&fit=crop",
    to: "/shop/mobiles",
  },
  {
    id: "laptops",
    label: "Laptops",
    blurb: "Work & play",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80&auto=format&fit=crop",
    to: "/shop/laptops",
  },
  {
    id: "headphones",
    label: "Headphones",
    blurb: "Audio & ANC",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=80&auto=format&fit=crop",
    to: "/shop/headphones",
  },
  {
    id: "smart-watches",
    label: "Smart Watches",
    blurb: "Fitness & style",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17c?w=1200&q=80&auto=format&fit=crop",
    to: "/shop/smart-watches",
  },
  {
    id: "accessories",
    label: "Accessories",
    blurb: "Cables, hubs & more",
    image:
      "https://images.unsplash.com/photo-1625948515291-4a4e2f6d0c1?w=1200&q=80&auto=format&fit=crop",
    to: "/shop/accessories",
  },
];

export const BLOG_POSTS = [
  {
    id: "b1",
    title: "The 2026 Nexa buying guide: displays, audio, and smart home",
    excerpt: "How to pick gear that lasts—panels, codecs, and ecosystem fit.",
    date: "Apr 2, 2026",
    author: "Nexa Editorial",
    image: pexels(4342090),
  },
  {
    id: "b2",
    title: "Desk setup ideas for focused work",
    excerpt: "Lighting, ergonomics, and cable management that actually sticks.",
    date: "Mar 18, 2026",
    author: "Priya N.",
    image: pexels(1779487),
  },
  {
    id: "b3",
    title: "Event: Nexa Spring Tech Weekend",
    excerpt: "Hands-on demos, bundle deals, and expert Q&A—online and in select cities.",
    date: "Mar 4, 2026",
    author: "Events Team",
    image: pexels(3780681),
  },
];
