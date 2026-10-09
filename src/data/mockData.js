// Realistic seed dataset for RentiPair marketplace

export const INITIAL_EQUIPMENT = [
  {
    id: "eq-101",
    title: "Casio fx-991EX ClassWiz Scientific Calculator",
    category: "Scientific Calculators",
    brand: "Casio",
    model: "fx-991EX",
    dailyRate: 40,
    securityDeposit: 500,
    rating: 4.9,
    reviewsCount: 38,
    location: "Adyar, Chennai",
    city: "Chennai",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Original Casio fx-991EX ClassWiz with 552 functions, high-resolution spreadsheet capabilities, and matrix/vector operations. Perfect for Anna University, IIT, and competitive engineering exams.",
    specs: {
      "Functions": "552 scientific functions",
      "Display": "Natural Textbook Display (High-res LCD)",
      "Power Source": "Dual (Solar + Battery)",
      "Battery Type": "LR44 button cell (freshly replaced)",
      "Exam Approved": "UPSC, GATE, Anna Univ, JEE (non-programmable)"
    },
    owner: {
      id: "usr-201",
      name: "Karthik Subramanian",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Aug 2024",
      responseTime: "< 15 mins",
      completedRentals: 42,
      rating: 4.95
    },
    rentalRules: [
      "Original college ID or Aadhaar copy required at pickup",
      "Do not scratch screen or peel serial number sticker",
      "Late return charged at ₹50/day"
    ]
  },
  {
    id: "eq-102",
    title: "Sony Alpha A7 IV Full-Frame Mirrorless Camera Kit",
    category: "Cameras",
    brand: "Sony",
    model: "ILCE-7M4 + FE 24-70mm f/2.8 GM",
    dailyRate: 1450,
    securityDeposit: 12000,
    rating: 4.9,
    reviewsCount: 54,
    location: "Indiranagar, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Flagship 33MP BSI full-frame sensor, 4K 60p 10-bit video, S-Cinetone, and industry-leading real-time eye autofocus. Comes with 2 high-capacity batteries, 128GB V90 SD card, dual charger, and weather-sealed bag.",
    specs: {
      "Sensor": "33MP Full-Frame Exmor R CMOS",
      "Lens Included": "Sony FE 24-70mm f/2.8 GM",
      "Video Recording": "4K 60p 10-bit 4:2:2 All-Intra",
      "Storage": "Dual SD/CFexpress Type A slots",
      "Stabilization": "5-axis active SteadyShot (5.5 stops)"
    },
    owner: {
      id: "usr-202",
      name: "Rohit Varma (Studio Reel)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Jan 2024",
      responseTime: "< 30 mins",
      completedRentals: 88,
      rating: 4.92
    },
    rentalRules: [
      "Government photo ID & refundable security deposit mandatory",
      "Rain or dusty shoot requires protective rain sleeve provided",
      "Sensor cleaning fee applies if lens swapped without care"
    ]
  },
  {
    id: "eq-103",
    title: "Apple MacBook Pro 16\" (M2 Pro, 32GB RAM, 1TB SSD)",
    category: "Laptops",
    brand: "Apple",
    model: "MacBook Pro 16 (2023)",
    dailyRate: 850,
    securityDeposit: 8000,
    rating: 4.8,
    reviewsCount: 29,
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Excellent",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "High-performance editing and software development workstation with 12-core CPU, 19-core GPU, Liquid Retina XDR screen with 120Hz ProMotion. Includes MagSafe charger and leather sleeve.",
    specs: {
      "Processor": "Apple M2 Pro (12-core CPU, 19-core GPU)",
      "Memory": "32GB Unified Memory",
      "Storage": "1TB High-speed NVMe SSD",
      "Display": "16.2\" Liquid Retina XDR (3456x2234)",
      "Battery Health": "96% (up to 18 hours)"
    },
    owner: {
      id: "usr-203",
      name: "Sneha Nair",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Mar 2024",
      responseTime: "< 10 mins",
      completedRentals: 31,
      rating: 4.88
    },
    rentalRules: [
      "iCloud account logout verified upon return",
      "Zero food/liquid contact policy",
      "Preloaded developer CLI tools available on request"
    ]
  },
  {
    id: "eq-104",
    title: "Rigol DS1054Z 50MHz 4-Channel Digital Oscilloscope",
    category: "Electronics",
    brand: "Rigol",
    model: "DS1054Z",
    dailyRate: 180,
    securityDeposit: 1500,
    rating: 4.9,
    reviewsCount: 22,
    location: "Guindy, Chennai",
    city: "Chennai",
    pickupAvailable: true,
    deliveryAvailable: false,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Industry-standard lab oscilloscope for electronic hardware debugging, audio circuit testing, and microcontroller protocol decoding (I2C, SPI, UART). Includes 4 passive probes and power cord.",
    specs: {
      "Bandwidth": "50 MHz (Upgraded to 100MHz)",
      "Channels": "4 Analog Channels",
      "Sample Rate": "1 GSa/s real-time",
      "Memory Depth": "24 Mpts standard",
      "Waveform Capture": "Up to 30,000 wfms/s"
    },
    owner: {
      id: "usr-204",
      name: "Prof. S. Ranganathan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Feb 2024",
      responseTime: "< 1 hour",
      completedRentals: 47,
      rating: 4.96
    },
    rentalRules: [
      "Do not exceed input voltage rating (300V CAT II)",
      "Return with all 4 probe grounding clips intact",
      "Pickup from Guindy Tech Park during 9 AM - 7 PM"
    ]
  },
  {
    id: "eq-105",
    title: "NVIDIA Jetson Orin Nano 8GB Developer Kit",
    category: "Development Boards",
    brand: "NVIDIA",
    model: "Orin Nano DevKit",
    dailyRate: 220,
    securityDeposit: 2500,
    rating: 4.8,
    reviewsCount: 16,
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Brings 40 TOPS of edge AI performance in a compact board. Pre-flashed with JetPack 6.0, TensorRT, PyTorch, and OpenCV. Ideal for computer vision, robotics, and capstone college projects.",
    specs: {
      "AI Performance": "Up to 40 TOPS",
      "GPU": "1024-core NVIDIA Ampere with 32 Tensor Cores",
      "CPU": "6-core Arm Cortex-A78AE v8.2 64-bit",
      "Memory": "8GB 128-bit LPDDR5 68 GB/s",
      "Storage": "64GB High endurance MicroSD included"
    },
    owner: {
      id: "usr-205",
      name: "Ananya Reddy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "May 2024",
      responseTime: "< 20 mins",
      completedRentals: 19,
      rating: 4.85
    },
    rentalRules: [
      "Use supplied official 19V power supply only",
      "Do not solder pins or detach heat sink fan",
      "Backup personal models before returning"
    ]
  },
  {
    id: "eq-106",
    title: "FLIR E4 Compact Thermal Imaging Infrared Camera",
    category: "Tools",
    brand: "FLIR",
    model: "FLIR E4 Wi-Fi",
    dailyRate: 350,
    securityDeposit: 3000,
    rating: 4.9,
    reviewsCount: 14,
    location: "Powai, Mumbai",
    city: "Mumbai",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Good",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Professional handheld thermal imaging camera featuring MSX technology (embosses visual details onto thermal images). Ideal for electrical inspections, PCB short-circuit diagnostics, and HVAC.",
    specs: {
      "IR Resolution": "80 x 60 pixels (4,800 pixels)",
      "Thermal Sensitivity": "<0.15°C (NETD <150 mK)",
      "Temperature Range": "-20°C to +250°C",
      "Display": "3.0\" color LCD 320x240",
      "Connectivity": "Wi-Fi & USB for FLIR Tools reports"
    },
    owner: {
      id: "usr-206",
      name: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Nov 2023",
      responseTime: "< 45 mins",
      completedRentals: 36,
      rating: 4.9
    },
    rentalRules: [
      "Do not expose lens directly to high-power industrial lasers",
      "Keep in shock-proof hard shell case during transit",
      "Charge via standard Micro-USB cable included"
    ]
  },
  {
    id: "eq-107",
    title: "Epson EB-E01 XGA 3300 Lumens HDMI Projector",
    category: "Projectors",
    brand: "Epson",
    model: "EB-E01",
    dailyRate: 400,
    securityDeposit: 3000,
    rating: 4.7,
    reviewsCount: 41,
    location: "T. Nagar, Chennai",
    city: "Chennai",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Excellent",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80"
    ],
    description: "High-brightness 3300 lumens 3LCD projector with crystal clear text and color reproduction. Perfect for college seminar presentations, classroom pitches, tech workshops, and weekend film screenings.",
    specs: {
      "Brightness": "3300 ANSI Lumens (White & Colour)",
      "Resolution": "XGA (1024 x 768), 1080p compatible",
      "Contrast Ratio": "15,000 : 1",
      "Lamp Life": "Up to 12,000 hours in Eco mode",
      "Ports": "HDMI, VGA, USB 2.0 Type B"
    },
    owner: {
      id: "usr-207",
      name: "Manoj Swaminathan",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Apr 2024",
      responseTime: "< 15 mins",
      completedRentals: 58,
      rating: 4.79
    },
    rentalRules: [
      "Includes 10-meter HDMI cable and remote control with batteries",
      "Let lamp cool for 3 minutes before packing into bag",
      "Clean lens cap before closing"
    ]
  },
  {
    id: "eq-108",
    title: "Sony PlayStation 5 Console + 2 DualSense Controllers",
    category: "Gaming Devices",
    brand: "Sony",
    model: "PS5 Disc Edition (CFI-1208A)",
    dailyRate: 500,
    securityDeposit: 4000,
    rating: 4.95,
    reviewsCount: 72,
    location: "HSR Layout, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "PS5 console with ultra-high speed SSD, ray tracing, 4K 120Hz support, and 2 DualSense wireless controllers with haptic feedback. Preloaded with FIFA/EA FC 24 and Spider-Man 2.",
    specs: {
      "Storage": "825GB Custom NVMe SSD",
      "Controllers": "2x DualSense Wireless Controllers with Type-C",
      "Resolution": "Up to 4K 120fps / 8K output support",
      "Audio": "Tempest 3D AudioTech",
      "Included Games": "EA FC 24, Marvel's Spider-Man 2, Gran Turismo 7"
    },
    owner: {
      id: "usr-208",
      name: "Aditya & Rahul (GameNest)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Dec 2023",
      responseTime: "< 10 mins",
      completedRentals: 110,
      rating: 4.97
    },
    rentalRules: [
      "Original packaging box provided for safe return",
      "Do not format or erase pre-installed games",
      "Valid govt ID card scan taken at delivery"
    ]
  },
  {
    id: "eq-109",
    title: "iPad Pro 11\" M2 (128GB, Wi-Fi + Apple Pencil 2)",
    category: "Tablets",
    brand: "Apple",
    model: "iPad Pro 11 (4th Gen)",
    dailyRate: 450,
    securityDeposit: 4500,
    rating: 4.85,
    reviewsCount: 33,
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Incredible tablet for digital artists, UI/UX designers, and students. M2 chip performance, 120Hz ProMotion screen, and Apple Pencil 2 with magnetic charging and hover preview.",
    specs: {
      "Processor": "Apple M2 8-core CPU, 10-core GPU",
      "Display": "11-inch Liquid Retina Display with ProMotion 120Hz",
      "Included Accessories": "Apple Pencil (2nd Gen) + Magnetic Smart Folio",
      "Weight": "466 grams",
      "Camera": "12MP Wide + 10MP Ultra Wide with LiDAR Scanner"
    },
    owner: {
      id: "usr-209",
      name: "Pooja Hegde",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Jun 2024",
      responseTime: "< 25 mins",
      completedRentals: 27,
      rating: 4.88
    },
    rentalRules: [
      "Tempered glass screen protector already installed",
      "Use only the provided Apple braided Type-C cable",
      "Pencil tip wear is normal, avoid dropping on hard floor"
    ]
  },
  {
    id: "eq-110",
    title: "Olympus CX23 Binocular Biological Lab Microscope",
    category: "Lab Equipment",
    brand: "Olympus",
    model: "CX23 LED",
    dailyRate: 300,
    securityDeposit: 3500,
    rating: 4.9,
    reviewsCount: 18,
    location: "Velachery, Chennai",
    city: "Chennai",
    pickupAvailable: true,
    deliveryAvailable: false,
    condition: "Excellent",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Renowned Olympus optical excellence with plan achromat objectives (4X, 10X, 40X, 100X Oil). Stable ergonomic stand with anti-fungal optical coating. Used by medical, biotech, and pharmacy students.",
    specs: {
      "Optical System": "Infinity optical system",
      "Magnification": "40X to 1000X",
      "Illumination": "Built-in LED illumination (uniform daylight)",
      "Focusing": "Coaxial coarse and fine adjustment",
      "Accessories": "Immersion oil vial, dust cover, power adapter"
    },
    owner: {
      id: "usr-210",
      name: "Dr. Arvind Sivaram",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Feb 2024",
      responseTime: "< 40 mins",
      completedRentals: 24,
      rating: 4.95
    },
    rentalRules: [
      "Must clean 100x oil objective with lens paper before return",
      "Carry using the two built-in ergonomic carry handles only",
      "In-person inspection at lab before handover"
    ]
  },
  {
    id: "eq-111",
    title: "Bosch Professional GSB 18V-50 Cordless Brushless Impact Drill Set",
    category: "Tools",
    brand: "Bosch",
    model: "GSB 18V-50 Heavy Duty",
    dailyRate: 150,
    securityDeposit: 1200,
    rating: 4.8,
    reviewsCount: 45,
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Good",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Robust brushless impact driver and drill with 50 Nm torque. Drills into masonry, wood, and metal with ease. Includes 2x 2.0Ah batteries, fast charger, L-BOXX carry case, and 35-piece masonry/metal bit set.",
    specs: {
      "Motor": "Brushless EC Motor (longer life, compact)",
      "Torque (Max)": "50 Nm",
      "Chuck Capacity": "1.5 - 13 mm all-metal chuck",
      "Batteries": "2x 18V 2.0Ah CoolPack Lithium-Ion",
      "Bit Set": "35-piece screwdriver and drill bits included"
    },
    owner: {
      id: "usr-211",
      name: "Dinesh Kumar (DK Tools)",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Oct 2023",
      responseTime: "< 15 mins",
      completedRentals: 65,
      rating: 4.84
    },
    rentalRules: [
      "Wear safety goggles while drilling into concrete",
      "Recharge batteries before returning",
      "Report damaged bits so they can be replaced"
    ]
  },
  {
    id: "eq-112",
    title: "Texas Instruments TI-84 Plus CE Graphing Calculator",
    category: "Scientific Calculators",
    brand: "Texas Instruments",
    model: "TI-84 Plus CE Color",
    dailyRate: 65,
    securityDeposit: 800,
    rating: 4.88,
    reviewsCount: 31,
    location: "Vasant Kunj, New Delhi",
    city: "Delhi",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=80"
    ],
    description: "High-resolution full color backlit screen graphing calculator with TI rechargeable battery. Preloaded with math, statistics, and science apps. Approved for SAT, ACT, AP, and IB exams.",
    specs: {
      "Display": "320 x 240 pixel (2.8\" diagonal) Color Screen",
      "Battery": "TI Rechargeable Lithium-ion battery",
      "Memory": "3MB Flash ROM & 154KB RAM",
      "Exam Compatibility": "SAT, ACT, AP, PSAT/NMSQT, IB",
      "Cable Included": "USB mini-B connectivity & charging cable"
    },
    owner: {
      id: "usr-212",
      name: "Simran Kaur",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Mar 2024",
      responseTime: "< 20 mins",
      completedRentals: 29,
      rating: 4.91
    },
    rentalRules: [
      "Test mode can be unlocked after exam completion",
      "Protective slide case must be kept on when not in use",
      "Aadhaar or Student ID copy required"
    ]
  },
  {
    id: "eq-113",
    title: "Sony FE 70-200mm f/2.8 GM OSS II Telephoto Zoom Lens",
    category: "Cameras",
    brand: "Sony",
    model: "SEL70200GM2",
    dailyRate: 950,
    securityDeposit: 9000,
    rating: 4.94,
    reviewsCount: 37,
    location: "Indiranagar, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Premium G Master telephoto zoom lens with constant f/2.8 aperture, 4 XD linear autofocus motors, and optical image stabilization. Incredible bokeh and edge-to-edge sharpness for portrait, sports, and event cinema.",
    specs: {
      "Focal Length": "70-200mm (Full Frame)",
      "Maximum Aperture": "f/2.8 constant",
      "Mount": "Sony E-mount",
      "Weight": "1,045 grams (29% lighter than Gen 1)",
      "Filter Thread": "77mm"
    },
    owner: {
      id: "usr-202",
      name: "Rohit Varma (Studio Reel)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Jan 2024",
      responseTime: "< 30 mins",
      completedRentals: 88,
      rating: 4.92
    },
    rentalRules: [
      "Front and rear lens caps must remain on during transit",
      "Lens hood and padded pouch included",
      "UV filter installed; do not remove"
    ]
  },
  {
    id: "eq-114",
    title: "Fluke 87V Industrial True-RMS Digital Multimeter Kit",
    category: "Electronics",
    brand: "Fluke",
    model: "87V MAX Heavy Duty",
    dailyRate: 110,
    securityDeposit: 1200,
    rating: 4.92,
    reviewsCount: 28,
    location: "Guindy, Chennai",
    city: "Chennai",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Rugged, high-accuracy True-RMS digital multimeter with low-pass filter for accurate motor drive measurements and temperature probe. CAT III 1000V / CAT IV 600V safety rated.",
    specs: {
      "DC Voltage": "0.1 mV to 1000 V (0.05% accuracy)",
      "AC Voltage": "0.1 mV to 1000 V True-RMS",
      "Current": "Up to 10A continuous (20A for 30s)",
      "Bandwidth": "20 kHz",
      "Safety Rating": "CAT IV 600V, CAT III 1000V"
    },
    owner: {
      id: "usr-204",
      name: "Prof. S. Ranganathan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Feb 2024",
      responseTime: "< 1 hour",
      completedRentals: 47,
      rating: 4.96
    },
    rentalRules: [
      "Use silicon leads provided with alligator clips",
      "Ensure probes plugged into correct jacks before testing current",
      "Keep rubber holster on"
    ]
  },
  {
    id: "eq-115",
    title: "Hakko FX-888D Digital Soldering Station & Heat Gun Kit",
    category: "Tools",
    brand: "Hakko",
    model: "FX-888D ESD-Safe",
    dailyRate: 90,
    securityDeposit: 800,
    rating: 4.86,
    reviewsCount: 34,
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Excellent",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Authentic Hakko digital soldering station with rapid thermal recovery, ceramic heating element, and ESD-safe silicone cable. Includes brass wire cleaner, sponge, heat-resistant silicone mat, and solder sucker.",
    specs: {
      "Power Output": "70W",
      "Temperature Range": "50°C to 480°C (120°F to 899°F)",
      "Stability": "±1°C at idle",
      "ESD Safe": "Yes, certified for sensitive logic boards",
      "Tips Included": "T18-B (Conical), T18-D16 (Chisel), T18-K (Knife)"
    },
    owner: {
      id: "usr-211",
      name: "Dinesh Kumar (DK Tools)",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Oct 2023",
      responseTime: "< 15 mins",
      completedRentals: 65,
      rating: 4.84
    },
    rentalRules: [
      "Tin soldering tip before turning off unit",
      "Operate on provided heat-resistant silicone mat",
      "Lead-free 63/37 rosin core solder available separately"
    ]
  },
  {
    id: "eq-116",
    title: "Arduino Uno R4 WiFi Ultimate Maker & Robotics Starter Kit",
    category: "Development Boards",
    brand: "Arduino",
    model: "Uno R4 WiFi Super Kit",
    dailyRate: 75,
    securityDeposit: 600,
    rating: 4.9,
    reviewsCount: 25,
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Latest 32-bit Arm Cortex-M4 Arduino with built-in Wi-Fi, Bluetooth, 12x8 LED matrix, and Qwiic connector. Kit includes 830-point breadboard, ultrasonic sensor, servos, relay module, and 40+ electronic parts.",
    specs: {
      "Microcontroller": "Renesas RA4M1 32-bit Cortex-M4 (48 MHz)",
      "Wireless": "ESP32-S3 Wi-Fi 802.11 b/g/n & BLE 5.0",
      "Memory": "256 KB Flash, 32 KB SRAM",
      "Display": "12x8 Red LED Matrix directly on board",
      "Operating Voltage": "5V (supports up to 24V input)"
    },
    owner: {
      id: "usr-205",
      name: "Ananya Reddy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "May 2024",
      responseTime: "< 20 mins",
      completedRentals: 19,
      rating: 4.85
    },
    rentalRules: [
      "Keep all components in compartmentalized organizer box",
      "Do not short circuit power pins directly to ground",
      "USB Type-C cable included"
    ]
  },
  {
    id: "eq-117",
    title: "Raspberry Pi 5 (8GB RAM) Desktop Starter Kit with Active Cooler",
    category: "Development Boards",
    brand: "Raspberry Pi",
    model: "Pi 5 8GB Official",
    dailyRate: 120,
    securityDeposit: 1200,
    rating: 4.93,
    reviewsCount: 39,
    location: "Velachery, Chennai",
    city: "Chennai",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
    ],
    description: "2-3x faster than Pi 4 with 2.4GHz quad-core Arm Cortex-A76, dual 4K 60Hz HDMI, and PCIe 2.0 interface. Comes with 27W official power supply, active cooler fan, 64GB A2 MicroSD with Raspberry Pi OS, and micro-HDMI cable.",
    specs: {
      "Processor": "Broadcom BCM2712 2.4GHz quad-core 64-bit Arm Cortex-A76",
      "RAM": "8GB LPDDR4X-4267 SDRAM",
      "Graphics": "VideoCore VII GPU @ 800MHz (OpenGL ES 3.1, Vulkan 1.2)",
      "Video Output": "2x micro-HDMI ports (up to dual 4Kp60)",
      "PCIe": "PCIe 2.0 x1 interface for M.2 NVMe SSDs"
    },
    owner: {
      id: "usr-205",
      name: "Ananya Reddy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "May 2024",
      responseTime: "< 20 mins",
      completedRentals: 19,
      rating: 4.85
    },
    rentalRules: [
      "Use only the provided official 27W USB-C PD power adapter",
      "Do not detach the pre-mounted active thermal cooler",
      "Format or backup your files before return"
    ]
  },
  {
    id: "eq-118",
    title: "Creality Ender-3 V3 SE High-Speed 3D Printer",
    category: "Tools",
    brand: "Creality",
    model: "Ender-3 V3 SE",
    dailyRate: 250,
    securityDeposit: 2200,
    rating: 4.82,
    reviewsCount: 20,
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: false,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Fast 250mm/s 3D printer with CR Touch auto-bed leveling, Sprite direct extruder, and dual Z-axis stabilization. Perfect for college engineering prototypes, custom enclosures, and robotics brackets.",
    specs: {
      "Build Volume": "220 x 220 x 250 mm",
      "Max Print Speed": "250 mm/s (Acceleration: 2500mm/s²)",
      "Extruder": "Sprite Direct Drive Extruder",
      "Bed Leveling": "CR Touch Auto-Leveling + Strain Gauge Z-offset",
      "Supported Filament": "PLA, PETG, TPU (1.75mm)"
    },
    owner: {
      id: "usr-211",
      name: "Dinesh Kumar (DK Tools)",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Oct 2023",
      responseTime: "< 15 mins",
      completedRentals: 65,
      rating: 4.84
    },
    rentalRules: [
      "Self-pickup only to prevent transit frame misalignment",
      "Do not use abrasive metal scraper on magnetic PC spring steel bed",
      "Complimentary 200g white PLA filament spool included"
    ]
  },
  {
    id: "eq-119",
    title: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    category: "Electronics",
    brand: "Keychron",
    model: "Q1 Pro 75% QMK/VIA",
    dailyRate: 80,
    securityDeposit: 900,
    rating: 4.9,
    reviewsCount: 19,
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Full CNC machined aluminum body mechanical keyboard with double-gasket design, Bluetooth 5.1 & Type-C wired, hot-swappable Keychron K Pro Banana tactile switches, and south-facing RGB.",
    specs: {
      "Layout": "75% Exploded Layout with Programmable Rotary Knob",
      "Body Material": "Full CNC Machined 6063 Aluminum",
      "Switches": "Hot-swappable Keychron K Pro Banana (Tactile)",
      "Keycaps": "KSA Double-shot PBT Keycaps",
      "Compatibility": "macOS, Windows, Linux (swappable keycaps included)"
    },
    owner: {
      id: "usr-203",
      name: "Sneha Nair",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Mar 2024",
      responseTime: "< 10 mins",
      completedRentals: 31,
      rating: 4.88
    },
    rentalRules: [
      "Do not spill liquids on mechanical switches",
      "Includes coiled aviator cable, keycap puller, and switch puller",
      "Keep in padded hard shell case when traveling"
    ]
  },
  {
    id: "eq-120",
    title: "Dell UltraSharp U2723QE 27\" 4K USB-C Hub Monitor",
    category: "Electronics",
    brand: "Dell",
    model: "U2723QE IPS Black",
    dailyRate: 260,
    securityDeposit: 2500,
    rating: 4.91,
    reviewsCount: 27,
    location: "Adyar, Chennai",
    city: "Chennai",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Stunning 4K resolution (3840x2160) IPS Black technology with 2000:1 contrast ratio and 98% DCI-P3 color coverage. Acts as a USB-C hub with 90W power delivery, RJ45 Ethernet, and DisplayPort daisy chain.",
    specs: {
      "Screen Size": "27-inch Anti-glare 4K UHD (3840 x 2160)",
      "Panel": "IPS Black Technology (2000:1 Contrast)",
      "Color Accuracy": "100% sRGB, 98% DCI-P3, Delta E < 2",
      "USB-C Hub": "90W laptop charging + DisplayPort over USB-C",
      "Stand": "Height-adjustable, tilt, swivel, and pivot 90° portrait"
    },
    owner: {
      id: "usr-201",
      name: "Karthik Subramanian",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Aug 2024",
      responseTime: "< 15 mins",
      completedRentals: 42,
      rating: 4.95
    },
    rentalRules: [
      "Original foam packaging box provided for safe transport",
      "Includes HDMI cable, DisplayPort cable, and 100W USB-C cable",
      "No pressure or wiping screen with harsh solvents"
    ]
  },
  {
    id: "eq-121",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    brand: "Sony",
    model: "WH-1000XM5 (Black)",
    dailyRate: 150,
    securityDeposit: 1400,
    rating: 4.95,
    reviewsCount: 51,
    location: "HSR Layout, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Industry-leading active noise cancellation with 8 microphones and two processors. Hi-Res Audio wireless with LDAC, crystal clear hands-free calling, and 30-hour battery life. Sanitized earpads after every rental.",
    specs: {
      "Noise Cancellation": "Auto NC Optimizer with Integrated Processor V1 + QN1",
      "Driver Unit": "30mm precision-engineered carbon fiber composite",
      "Battery Life": "Up to 30 hours (3 min quick charge = 3 hours)",
      "Bluetooth": "Version 5.2 with Multipoint connection to 2 devices",
      "Weight": "250 grams"
    },
    owner: {
      id: "usr-208",
      name: "Aditya & Rahul (GameNest)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Dec 2023",
      responseTime: "< 10 mins",
      completedRentals: 110,
      rating: 4.97
    },
    rentalRules: [
      "Carry in the official magnetic collapsible travel case",
      "Keep away from rain or high humidity",
      "Type-C charging cable and 3.5mm audio jack cable included"
    ]
  },
  {
    id: "eq-122",
    title: "Nintendo Switch OLED Model with Neon Blue & Red Joy-Con",
    category: "Gaming Devices",
    brand: "Nintendo",
    model: "Switch OLED (HEG-001)",
    dailyRate: 320,
    securityDeposit: 2500,
    rating: 4.88,
    reviewsCount: 46,
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Vibrant 7-inch OLED screen with deep blacks, wide adjustable kickstand, dock with wired LAN port, and 64GB storage. Includes dock, power adapter, HDMI cable, and Super Mario Odyssey + Mario Kart 8 Deluxe.",
    specs: {
      "Display": "7.0-inch OLED Multi-touch capacitive screen (720p handheld)",
      "TV Output": "Up to 1080p 60fps via HDMI dock",
      "Storage": "64GB internal + 128GB MicroSD installed",
      "Audio": "Enhanced onboard stereo speakers",
      "Games Included": "Mario Kart 8 Deluxe, Super Mario Odyssey, Zelda: Tears of the Kingdom"
    },
    owner: {
      id: "usr-208",
      name: "Aditya & Rahul (GameNest)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Dec 2023",
      responseTime: "< 10 mins",
      completedRentals: 110,
      rating: 4.97
    },
    rentalRules: [
      "Screen protected by tempered glass",
      "Keep game cartridges inside hard cases when swapped",
      "All original Joy-Con straps and grip included"
    ]
  },
  {
    id: "eq-123",
    title: "Dell XPS 15 (Intel Core i9, 32GB RAM, RTX 4060, OLED)",
    category: "Laptops",
    brand: "Dell",
    model: "XPS 15 9530",
    dailyRate: 780,
    securityDeposit: 7500,
    rating: 4.87,
    reviewsCount: 24,
    location: "Powai, Mumbai",
    city: "Mumbai",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Premier creator laptop featuring a 3.5K OLED InfinityEdge touch screen, 13th Gen Intel Core i9-13900H, NVIDIA GeForce RTX 4060 8GB GPU, and machined aluminum chassis with carbon fiber palm rest.",
    specs: {
      "Processor": "Intel Core i9-13900H (14 cores, 20 threads, up to 5.4 GHz)",
      "GPU": "NVIDIA GeForce RTX 4060 8GB GDDR6 (NVIDIA Studio Drivers)",
      "RAM": "32GB DDR5 4800MHz Dual-Channel",
      "Storage": "1TB PCIe Gen4 NVMe M.2 SSD",
      "Display": "15.6\" 3.5K (3456x2160) OLED Touch, 400-nit, 100% DCI-P3"
    },
    owner: {
      id: "usr-206",
      name: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Nov 2023",
      responseTime: "< 45 mins",
      completedRentals: 36,
      rating: 4.9
    },
    rentalRules: [
      "Comes with Dell 130W USB-C charger and USB-C to USB-A/HDMI dongle",
      "Keep in padded sleeve provided during commute",
      "Clean wipe of personal data before return"
    ]
  },
  {
    id: "eq-124",
    title: "BenQ W1800 4K HDR Cinematic Home Theater Projector",
    category: "Projectors",
    brand: "BenQ",
    model: "W1800 True 4K",
    dailyRate: 520,
    securityDeposit: 4200,
    rating: 4.89,
    reviewsCount: 22,
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    pickupAvailable: true,
    deliveryAvailable: true,
    condition: "Like New",
    status: "Approved",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80",
    image_url: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80"
    ],
    description: "True 4K UHD 8.3 million pixels with factory-calibrated 100% Rec.709 CinematicColor and HDR10/HLG support. Includes auto vertical keystone and 2D keystone for effortless setup in any room.",
    specs: {
      "Resolution": "True 4K UHD (3840 x 2160)",
      "Color Accuracy": "100% Rec.709 with factory calibration report",
      "Brightness": "2000 ANSI Lumens",
      "Contrast": "10,000 : 1",
      "Projection Size": "60 to 200 inches"
    },
    owner: {
      id: "usr-207",
      name: "Manoj Swaminathan",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
      verified: true,
      memberSince: "Apr 2024",
      responseTime: "< 15 mins",
      completedRentals: 58,
      rating: 4.79
    },
    rentalRules: [
      "High speed 4K HDMI cable and backlit remote included",
      "Allow fan to completely spin down before switching off main switch",
      "Use padded carry bag provided"
    ]
  }
];

export const INITIAL_TECHNICIANS = [
  {
    id: "tech-301",
    name: "Rajesh Kannan",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    title: "Senior Apple & Laptop Micro-Soldering Specialist",
    rating: 4.96,
    reviewsCount: 148,
    jobsCompleted: 312,
    yearsExperience: 9,
    baseRate: 499,
    serviceArea: "Chennai (Adyar, T. Nagar, OMR, Velachery, Anna Nagar)",
    city: "Chennai",
    categories: ["Laptop Repair", "Electronics Repair", "Tablet Repair"],
    verifiedBadges: {
      identityVerified: true,
      skillVerified: true,
      experienceVerified: true
    },
    verificationDocMasked: "Govt ID: ****-****-9204 | Cert: ACMT-IN-8841",
    status: "Approved",
    bio: "Ex-Authorised Apple Service technician with 9 years of board-level micro-soldering experience. Specialist in MacBook logic board revive, liquid spill ultrasonic cleaning, GPU re-balling, and screen hinge repairs.",
    certifications: [
      "Apple Certified Mac Technician (ACMT)",
      "IPC-7711/7721 Component Level Rework Specialist",
      "CompTIA A+ Hardware & IT Support"
    ],
    pricing: [
      { service: "Laptop Diagnostic & Thermal Paste Service", price: "₹499" },
      { service: "Display / Screen Panel Replacement", price: "₹899 + parts" },
      { service: "Logic Board Short-Circuit Repair (BGA/Power IC)", price: "₹1,850" },
      { service: "Liquid Damage Ultrasonic Decontamination", price: "₹1,400" }
    ],
    portfolio: [
      {
        title: "MacBook Pro M1 Liquid Ingress Revived",
        device: "MacBook Pro 14",
        desc: "Restored corroded 3.3V power rails and replaced ISL9240 charging IC.",
        beforeAfterImg: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80"
      },
      {
        title: "Dell XPS 15 Broken Hinge & Bezel Rebuilt",
        device: "Dell XPS 15 9500",
        desc: "Custom brass threaded insert reconstruction with zero chassis gap.",
        beforeAfterImg: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80"
      }
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Venkatesh Babu",
        rating: 5,
        date: "2 days ago",
        verified: true,
        text: "Authorized service center quoted ₹45,000 to replace the entire logic board for a tiny charging issue. Rajesh solved it in 4 hours for ₹2,200! True genius."
      },
      {
        id: "rev-2",
        author: "Meera Krishnan",
        rating: 5,
        date: "1 week ago",
        verified: true,
        text: "Very professional, showed microscope images of the burnt capacitor and tested all ports in front of me."
      }
    ]
  },
  {
    id: "tech-302",
    name: "Arun Kumar Sharma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    title: "Master Smartphone & Tablet Diagnostic Tech",
    rating: 4.92,
    reviewsCount: 194,
    jobsCompleted: 440,
    yearsExperience: 7,
    baseRate: 350,
    serviceArea: "Bengaluru (Koramangala, Indiranagar, HSR, BTM, Marathahalli)",
    city: "Bengaluru",
    categories: ["Smartphone Repair", "Tablet Repair"],
    verifiedBadges: {
      identityVerified: true,
      skillVerified: true,
      experienceVerified: true
    },
    verificationDocMasked: "Govt ID: ****-****-3312 | Cert: GSMA-CERT-1190",
    status: "Approved",
    bio: "Precision technician for iPhone, iPad, Samsung Galaxy, and OnePlus devices. Cleanroom OCA glass refurbishment, genuine battery replacements, Face ID & TrueTone calibration.",
    certifications: [
      "Certified Mobile Hardware Engineer (CMHE)",
      "Samsung Authorized Repair Certification",
      "Cleanroom OCA Display Laminating Master"
    ],
    pricing: [
      { service: "Glass OCA Replacement (Retaining Original OLED)", price: "₹1,200" },
      { service: "Genuine Battery Replacement with BMS Transplant", price: "₹599 + battery" },
      { service: "Charging Port Flex / Mic Restoration", price: "₹450" },
      { service: "FaceID Dot Projector Alignment", price: "₹1,600" }
    ],
    portfolio: [
      {
        title: "iPhone 13 Pro Smashed Front Glass Laminated",
        device: "iPhone 13 Pro OLED",
        desc: "Cold-laser debonding and bubble-free autoclave lamination.",
        beforeAfterImg: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80"
      }
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Praveen Gowda",
        rating: 5,
        date: "3 days ago",
        verified: true,
        text: "Replaced my iPad 9 digitizer smoothly. Works like factory new with Apple Pencil."
      }
    ]
  },
  {
    id: "tech-303",
    name: "Naveen Chandran",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    title: "DSLR & Mirrorless Optical Instrument Technician",
    rating: 4.98,
    reviewsCount: 86,
    jobsCompleted: 180,
    yearsExperience: 11,
    baseRate: 600,
    serviceArea: "Hyderabad (Secunderabad, Banjara Hills, Hitec City, Jubilee Hills)",
    city: "Hyderabad",
    categories: ["Camera Repair", "Electronics Repair"],
    verifiedBadges: {
      identityVerified: true,
      skillVerified: true,
      experienceVerified: true
    },
    verificationDocMasked: "Govt ID: ****-****-5519 | Cert: JCCA-OPT-7740",
    status: "Approved",
    bio: "Trained in optical alignment and shutter recalibration. Specialized in Sony, Canon, and Nikon camera bodies, stuck aperture blades, ultrasonic sensor cleaning, and lens fungus elimination.",
    certifications: [
      "Canon Professional Services (CPS) Tech Level 3",
      "Precision Optical Collimation Certified",
      "Sensor Cleaning & Alignment Specialist"
    ],
    pricing: [
      { service: "Full-Frame Sensor Wet Cleaning & Chamber De-dusting", price: "₹600" },
      { service: "Lens Internal Fungus UV Sterilization & Cleaning", price: "₹1,500" },
      { service: "Mechanical Shutter Unit Replacement", price: "₹2,200 + parts" },
      { service: "Mount Calibration & Autofocus Micro-Adjustment", price: "₹850" }
    ],
    portfolio: [
      {
        title: "Canon 70-200mm f/2.8 IS De-centered Element Realignment",
        device: "EF 70-200 f/2.8L",
        desc: "Laser collimator optical centering and zoom barrel bushing replacement.",
        beforeAfterImg: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&auto=format&fit=crop&q=80"
      }
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Kavya Menon",
        rating: 5,
        date: "5 days ago",
        verified: true,
        text: "Cleaned fungal spores from my 50mm f/1.2 lens without disturbing optical coating. Sharpness is 100% back!"
      }
    ]
  },
  {
    id: "tech-304",
    name: "Mohammad Irfan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    title: "High-End PC Builder & Diagnostic Engineer",
    rating: 4.9,
    reviewsCount: 112,
    jobsCompleted: 260,
    yearsExperience: 8,
    baseRate: 450,
    serviceArea: "Mumbai (Andheri, Powai, Bandra, Borivali, Thane)",
    city: "Mumbai",
    categories: ["PC Repair", "CCTV & Networking", "Laptop Repair"],
    verifiedBadges: {
      identityVerified: true,
      skillVerified: true,
      experienceVerified: true
    },
    verificationDocMasked: "Govt ID: ****-****-8840 | Cert: CCNA-2022-901",
    status: "Approved",
    bio: "Workstation builder, custom water-cooling specialist, and enterprise network troubleshooter. Expert in GPU crash diagnosis, blue screen errors (BSOD), RAM timing faults, and NAS setup.",
    certifications: [
      "CompTIA Network+ & Linux+",
      "Cisco CCNA Routing & Switching",
      "ASUS ROG Certified PC Tuning Specialist"
    ],
    pricing: [
      { service: "Complete System Diagnostic & Stress Testing", price: "₹450" },
      { service: "Full Custom PC Assembly & Cable Management", price: "₹1,200" },
      { service: "GPU Thermal Pad & Liquid Metal Refurbish", price: "₹950" },
      { service: "Home Office Dual-WAN Router / Mesh Wi-Fi Setup", price: "₹800" }
    ],
    portfolio: [
      {
        title: "RTX 4090 Workstation 0x00000116 BSOD Solved",
        device: "Custom Deep Learning Rig",
        desc: "Isolated faulty PCIe 5.0 riser cable and stabilized VRAM power phases.",
        beforeAfterImg: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
      }
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Farhan Qureshi",
        rating: 5,
        date: "1 week ago",
        verified: true,
        text: "Irfan came to my apartment in Bandra, ran thorough memory diagnostics and fixed random crashes that had baffled me for months."
      }
    ]
  },
  {
    id: "tech-305",
    name: "Deepak S. Rao",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    title: "CCTV, NVR, Access Control & Enterprise Networking Engineer",
    rating: 4.88,
    reviewsCount: 78,
    jobsCompleted: 195,
    yearsExperience: 10,
    baseRate: 400,
    serviceArea: "Bengaluru (Hebbal, Manyata, Electronic City, Whitefield)",
    city: "Bengaluru",
    categories: ["CCTV & Networking", "Electronics Repair"],
    verifiedBadges: {
      identityVerified: true,
      skillVerified: true,
      experienceVerified: true
    },
    verificationDocMasked: "Govt ID: ****-****-1092 | Cert: HIK-HCSA-419",
    status: "Approved",
    bio: "Hikvision and Dahua certified installer. Specializing in PoE IP cameras, remote mobile live-view setup, 8/16 channel NVR troubleshooting, hard drive data recovery, and commercial switch routing.",
    certifications: [
      "Hikvision Certified Security Associate (HCSA)",
      "Ubiquiti Enterprise Wireless Admin (UEWA)",
      "Govt Certified Electrical Safety Inspector"
    ],
    pricing: [
      { service: "CCTV Camera Video Loss / IP Conflict Fix", price: "₹400" },
      { service: "NVR Hard Drive Setup & Remote Port Forwarding", price: "₹750" },
      { service: "PoE Switch & Patch Panel Punching", price: "₹650" }
    ],
    portfolio: [
      {
        title: "32-Camera Warehouse IP Surveillance Overhaul",
        device: "Industrial NVR",
        desc: "Eliminated packet drops with managed VLAN segregation.",
        beforeAfterImg: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80"
      }
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Satish Reddy",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        text: "Set up our 8 IP cameras with clean hidden conduit wiring. Mobile app streaming is instant."
      }
    ]
  },
  {
    id: "tech-306",
    name: "Vikas Deshmukh",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    title: "Commercial & Office Laser/Inkjet Printer Specialist",
    rating: 4.85,
    reviewsCount: 65,
    jobsCompleted: 150,
    yearsExperience: 6,
    baseRate: 350,
    serviceArea: "Pune (Hinjawadi, Kothrud, Viman Nagar, Shivajinagar)",
    city: "Pune",
    categories: ["Printer Repair", "Electronics Repair"],
    verifiedBadges: {
      identityVerified: true,
      skillVerified: true,
      experienceVerified: true
    },
    verificationDocMasked: "Govt ID: ****-****-4428 | Cert: HP-CPS-9912",
    status: "Approved",
    bio: "HP, Canon, and Epson authorized specialist. Paper jam solenoid troubleshooting, clogged printhead ultrasonic flush, fuser sleeve overhaul, and network driver installation.",
    certifications: [
      "HP Certified Print Specialist",
      "Epson EcoTank Service Engineer",
      "Brother Laser Maintenance Certified"
    ],
    pricing: [
      { service: "LaserJet Paper Jam / Pickup Roller Replacement", price: "₹350 + parts" },
      { service: "Epson Inkjet Printhead Ultrasonic Unclog", price: "₹650" },
      { service: "Fuser Unit Film / Teflon Sleeve Replacement", price: "₹850" }
    ],
    portfolio: [
      {
        title: "Epson L805 Clogged Photo Head Rescued",
        device: "Epson EcoTank L805",
        desc: "Cleared micro-piezo nozzle blockages using safe chemical flush.",
        beforeAfterImg: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=80"
      }
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Prashant Joshi",
        rating: 5,
        date: "4 days ago",
        verified: true,
        text: "Very knowledgeable technician. Fixed my office HP LaserJet paper feed issue on the spot."
      }
    ]
  }
];

export const INITIAL_RENTAL_ORDERS = [
  {
    id: "RNT-9041",
    equipmentId: "eq-101",
    equipmentTitle: "Casio fx-991EX ClassWiz Scientific Calculator",
    equipmentImage: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=400&auto=format&fit=crop&q=80",
    renterId: "usr-current",
    renterName: "Aditya Narayan",
    ownerId: "usr-201",
    ownerName: "Karthik Subramanian",
    startDate: "2026-10-12",
    endDate: "2026-10-15",
    durationDays: 3,
    dailyRate: 40,
    rentalFee: 120,
    securityDeposit: 500,
    platformFee: 20,
    totalPaid: 640,
    deliveryOption: "Self Pickup (Adyar, Chennai)",
    status: "Active", // Pending, Confirmed, Active, Return Pending, Completed, Cancelled, Disputed
    paymentMethod: "UPI (Google Pay / rentipair@icici)",
    createdAt: "2026-10-09",
    trackingId: "RP-PICKUP-ADY-9041"
  },
  {
    id: "RNT-8812",
    equipmentId: "eq-102",
    equipmentTitle: "Sony Alpha A7 IV Full-Frame Camera Kit",
    equipmentImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80",
    renterId: "usr-current",
    renterName: "Aditya Narayan",
    ownerId: "usr-202",
    ownerName: "Rohit Varma (Studio Reel)",
    startDate: "2026-09-25",
    endDate: "2026-09-28",
    durationDays: 3,
    dailyRate: 1450,
    rentalFee: 4350,
    securityDeposit: 12000,
    platformFee: 200,
    totalPaid: 16550,
    deliveryOption: "Verified Doorstep Delivery",
    status: "Completed",
    paymentMethod: "HDFC Credit Card",
    createdAt: "2026-09-24",
    trackingId: "RP-DEL-BLR-8812"
  }
];

export const INITIAL_REPAIR_REQUESTS = [
  {
    id: "REP-4011",
    userId: "usr-current",
    userName: "Aditya Narayan",
    deviceType: "Laptop",
    deviceBrand: "Apple",
    deviceModel: "MacBook Air M1 2020",
    problemCategory: "Laptop Repair",
    issueSummary: "Screen shows vertical lines and battery health dropped to Service required (lasts 45 mins).",
    preferredLocation: "At Home Service",
    address: "Flat 4B, Shanthi Heights, T. Nagar, Chennai",
    preferredDate: "2026-10-14",
    timeSlot: "11:00 AM - 01:00 PM",
    status: "In Progress", // Requested, Finding Technician, Technician Assigned, Accepted, In Progress, Completed, Cancelled, Disputed
    assignedTechnician: {
      id: "tech-301",
      name: "Rajesh Kannan",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
      phone: "+91 98401 22890"
    },
    estimatedQuote: "₹2,450 (Including OEM Battery + Labour)",
    createdAt: "2026-10-08"
  },
  {
    id: "REP-3902",
    userId: "usr-current",
    userName: "Aditya Narayan",
    deviceType: "Smartphone",
    deviceBrand: "OnePlus",
    deviceModel: "OnePlus 9 Pro",
    problemCategory: "Smartphone Repair",
    issueSummary: "Warp charge port loose, cable falls out and charges intermittently.",
    preferredLocation: "Technician Workshop Drop",
    address: "Koramangala, Bengaluru",
    preferredDate: "2026-09-20",
    timeSlot: "04:00 PM - 06:00 PM",
    status: "Completed",
    assignedTechnician: {
      id: "tech-302",
      name: "Arun Kumar Sharma",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      phone: "+91 97412 55019"
    },
    estimatedQuote: "₹650",
    createdAt: "2026-09-19"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Rental Pickup Scheduled",
    message: "Your Casio fx-991EX calculator is ready for pickup in Adyar. Security deposit ₹500 is safely held in escrow.",
    time: "2 hours ago",
    read: false,
    type: "rental",
    link: "/dashboard?tab=rentals"
  },
  {
    id: "notif-2",
    title: "Technician Assigned",
    message: "Rajesh Kannan accepted your MacBook repair request and will arrive on Oct 14 at 11:00 AM.",
    time: "Yesterday",
    read: false,
    type: "repair",
    link: "/dashboard?tab=repairs"
  },
  {
    id: "notif-3",
    title: "Security Deposit Refunded",
    message: "Sony A7 IV was successfully returned in inspected condition. ₹12,000 security deposit refunded to original payment method.",
    time: "Oct 01",
    read: true,
    type: "payment",
    link: "/dashboard?tab=payments"
  },
  {
    id: "notif-4",
    title: "Verification Badge Granted",
    message: "Your government identity verification has been confirmed with Level 3 Trust rating.",
    time: "Sep 28",
    read: true,
    type: "verification",
    link: "/dashboard?tab=profile"
  }
];

export const RENTAL_CATEGORIES = [
  { id: "all", name: "All Equipment", icon: "Boxes", count: 48 },
  { id: "Scientific Calculators", name: "Scientific Calculators", icon: "Calculator", count: 14, tag: "Exam Favorite" },
  { id: "Laptops", name: "Laptops & Workstations", icon: "Laptop", count: 26, tag: "Popular" },
  { id: "Tablets", name: "Tablets & Stylus", icon: "Tablet", count: 12 },
  { id: "Cameras", name: "Cameras & Lenses", icon: "Camera", count: 32, tag: "Pro Gear" },
  { id: "Projectors", name: "Projectors & Screens", icon: "Projector", count: 9 },
  { id: "Electronics", name: "Electronics & Testing", icon: "Cpu", count: 18 },
  { id: "Lab Equipment", name: "Lab Equipment", icon: "FlaskConical", count: 11 },
  { id: "Development Boards", name: "Development Boards", icon: "CircuitBoard", count: 15 },
  { id: "Tools", name: "Tools & Power Gear", icon: "Wrench", count: 22 },
  { id: "Gaming Devices", name: "Gaming Consoles", icon: "Gamepad2", count: 19 }
];

export const REPAIR_SERVICES = [
  { id: "Laptop Repair", name: "Laptop Repair", icon: "Laptop", desc: "Display, battery, logic board, hinge & liquid damage fixes", startingPrice: "₹499" },
  { id: "Smartphone Repair", name: "Smartphone Repair", icon: "Smartphone", desc: "OLED glass OCA lamination, battery, FaceID & charge port", startingPrice: "₹349" },
  { id: "Tablet Repair", name: "Tablet Repair", icon: "Tablet", desc: "Digitizer glass, frame bent realignment & charging ports", startingPrice: "₹449" },
  { id: "PC Repair", name: "PC & Desktop Repair", icon: "Monitor", desc: "GPU diagnosis, custom builds, thermal paste, BSOD & PSU", startingPrice: "₹450" },
  { id: "Electronics Repair", name: "Electronics Repair", icon: "Cpu", desc: "PCB micro-soldering, audio gear, amplifiers & power supplies", startingPrice: "₹499" },
  { id: "Printer Repair", name: "Printer Repair", icon: "Printer", desc: "LaserJet rollers, clogged printheads & network scanner setup", startingPrice: "₹350" },
  { id: "Camera Repair", name: "Camera & Lens Repair", icon: "Camera", desc: "Sensor cleaning, shutter replacement & optical calibration", startingPrice: "₹599" },
  { id: "CCTV & Networking", name: "CCTV & Networking", icon: "ShieldAlert", desc: "IP camera setup, NVR hard drives & enterprise Wi-Fi mesh", startingPrice: "₹400" }
];

export const DATABASE_SCHEMA_DOCUMENTATION = [
  {
    table: "Users",
    description: "Core authentication and authorization entity supporting multi-role capabilities.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Unique user identifier" },
      { name: "email", type: "VARCHAR(255) UNIQUE NOT NULL", note: "Verified email" },
      { name: "phone", type: "VARCHAR(20) UNIQUE NOT NULL", note: "OTP verified mobile" },
      { name: "password_hash", type: "VARCHAR(255) NOT NULL", note: "Argon2id hashed credential" },
      { name: "role_flags", type: "BITFIELD / ENUM", note: "USER, TECHNICIAN, OWNER, ADMIN" },
      { name: "is_suspended", type: "BOOLEAN DEFAULT FALSE", note: "Admin moderation flag" },
      { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", note: "Account creation time" }
    ]
  },
  {
    table: "Profiles",
    description: "User public and private KYC profile details.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Profile ID" },
      { name: "user_id", type: "UUID (Foreign Key -> Users.id)", note: "Owner of profile" },
      { name: "full_name", type: "VARCHAR(120) NOT NULL", note: "Display name" },
      { name: "avatar_url", type: "TEXT", note: "CDN image URL" },
      { name: "city", type: "VARCHAR(80) NOT NULL", note: "Primary operational city" },
      { name: "address_masked", type: "TEXT", note: "Private delivery address" },
      { name: "identity_verified", type: "BOOLEAN DEFAULT FALSE", note: "KYC approval status" },
      { name: "trust_score", type: "DECIMAL(3,2)", note: "Calculated rating score" }
    ]
  },
  {
    table: "Technicians",
    description: "Verified technicians listing profile and specialties.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Technician ID" },
      { name: "user_id", type: "UUID (Foreign Key -> Users.id)", note: "Associated user" },
      { name: "title", type: "VARCHAR(150)", note: "Professional specialization" },
      { name: "years_experience", type: "INT NOT NULL", note: "Years in field" },
      { name: "base_rate", type: "DECIMAL(10,2)", note: "Minimum consultation fee" },
      { name: "service_area", type: "TEXT", note: "Covered localities" },
      { name: "verification_status", type: "ENUM('PENDING','APPROVED','REJECTED')", note: "Admin verification status" },
      { name: "jobs_completed_count", type: "INT DEFAULT 0", note: "Verified count" },
      { name: "average_rating", type: "DECIMAL(3,2) DEFAULT 5.0", note: "Aggregate rating" }
    ]
  },
  {
    table: "VerificationDocuments",
    description: "Secure storage for technician identity & skill proofs (never public).",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Doc ID" },
      { name: "technician_id", type: "UUID (FK -> Technicians.id)", note: "Applicant" },
      { name: "document_type", type: "ENUM('GOVT_ID','SKILL_CERT','BUSINESS_PROOF')", note: "Type" },
      { name: "encrypted_file_path", type: "TEXT NOT NULL", note: "Private S3/GCS bucket URI" },
      { name: "document_number_masked", type: "VARCHAR(50)", note: "Masked string (e.g. ****-9204)" },
      { name: "reviewed_by_admin_id", type: "UUID (FK -> Users.id)", note: "Auditor" },
      { name: "review_status", type: "ENUM('PENDING','APPROVED','REJECTED')", note: "Audit state" }
    ]
  },
  {
    table: "Equipment",
    description: "Catalog of rental equipment with specifications and daily rates.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Equipment ID" },
      { name: "owner_id", type: "UUID (FK -> Users.id)", note: "Equipment owner" },
      { name: "category_id", type: "UUID (FK -> Categories.id)", note: "Category" },
      { name: "title", type: "VARCHAR(200) NOT NULL", note: "Item name" },
      { name: "brand", type: "VARCHAR(100)", note: "Brand" },
      { name: "model", type: "VARCHAR(100)", note: "Model" },
      { name: "daily_rate", type: "DECIMAL(10,2) NOT NULL", note: "Price per day in ₹" },
      { name: "security_deposit", type: "DECIMAL(10,2) NOT NULL", note: "Refundable deposit" },
      { name: "condition", type: "ENUM('LIKE_NEW','EXCELLENT','GOOD','FAIR')", note: "Equipment condition" },
      { name: "status", type: "ENUM('PENDING_MODERATION','APPROVED','REJECTED','ARCHIVED')", note: "Moderation" },
      { name: "is_available", type: "BOOLEAN DEFAULT TRUE", note: "Current lease status" }
    ]
  },
  {
    table: "Rentals",
    description: "Active and completed rental leases and escrow handling.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Rental Agreement ID" },
      { name: "equipment_id", type: "UUID (FK -> Equipment.id)", note: "Rented equipment" },
      { name: "renter_id", type: "UUID (FK -> Users.id)", note: "Borrowing user" },
      { name: "start_date", type: "DATE NOT NULL", note: "Lease start" },
      { name: "end_date", type: "DATE NOT NULL", note: "Lease return expected" },
      { name: "rental_fee", type: "DECIMAL(10,2) NOT NULL", note: "Days * daily_rate" },
      { name: "deposit_amount", type: "DECIMAL(10,2) NOT NULL", note: "Escrow hold" },
      { name: "status", type: "ENUM('PENDING','CONFIRMED','ACTIVE','RETURN_PENDING','COMPLETED','CANCELLED','DISPUTED')", note: "Workflow status" },
      { name: "deposit_status", type: "ENUM('HELD','REFUNDED','PARTIAL_DEDUCTION','DISPUTED')", note: "Escrow status" }
    ]
  },
  {
    table: "RepairRequests",
    description: "End-to-end device repair service requests.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Repair Request ID" },
      { name: "customer_id", type: "UUID (FK -> Users.id)", note: "Requester" },
      { name: "technician_id", type: "UUID (FK -> Technicians.id)", note: "Assigned tech" },
      { name: "category", type: "VARCHAR(80) NOT NULL", note: "Repair category" },
      { name: "device_details", type: "JSONB", note: "Brand, model, serial, issue notes" },
      { name: "service_type", type: "ENUM('AT_HOME','WORKSHOP_DROP','COURIER')", note: "Location" },
      { name: "status", type: "ENUM('REQUESTED','FINDING_TECHNICIAN','TECHNICIAN_ASSIGNED','ACCEPTED','IN_PROGRESS','COMPLETED','CANCELLED','DISPUTED')", note: "Repair status" },
      { name: "final_quote", type: "DECIMAL(10,2)", note: "Agreed repair fee" }
    ]
  },
  {
    table: "Payments",
    description: "Financial ledger tracking payments, platform commission, and deposits.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Transaction ID" },
      { name: "reference_type", type: "ENUM('RENTAL','REPAIR')", note: "Transaction context" },
      { name: "reference_id", type: "UUID", note: "Rental ID or Repair ID" },
      { name: "amount", type: "DECIMAL(10,2) NOT NULL", note: "Total charged" },
      { name: "gateway_txn_id", type: "VARCHAR(100)", note: "UPI / Bank reference" },
      { name: "status", type: "ENUM('PAID','REFUNDED','FAILED')", note: "Gateway response" },
      { name: "created_at", type: "TIMESTAMP", note: "Timestamp" }
    ]
  },
  {
    table: "Reviews",
    description: "Verified post-transaction ratings and feedback.",
    columns: [
      { name: "id", type: "UUID (Primary Key)", note: "Review ID" },
      { name: "author_id", type: "UUID (FK -> Users.id)", note: "Reviewer" },
      { name: "target_type", type: "ENUM('EQUIPMENT','TECHNICIAN','RENTER')", note: "Entity reviewed" },
      { name: "target_id", type: "UUID NOT NULL", note: "Subject ID" },
      { name: "order_reference_id", type: "UUID NOT NULL", note: "Guarantees verified transaction" },
      { name: "rating", type: "INT CHECK (rating BETWEEN 1 AND 5)", note: "Stars (1-5)" },
      { name: "comment", type: "TEXT NOT NULL", note: "Feedback text" }
    ]
  }
];
