const createSvgUrl = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

export const defaultPatterns = [
  {
    id: 'pattern-circles',
    name: 'Circles (বৃত্ত)',
    originalName: 'Circles (বৃত্ত)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="10" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-squares',
    name: 'Squares (বর্গক্ষেত্র)',
    originalName: 'Squares (বর্গক্ষেত্র)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect x="10" y="10" width="20" height="20" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-triangles',
    name: 'Triangles (ত্রিভুজ)',
    originalName: 'Triangles (ত্রিভুজ)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M20 10L30 30H10Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-hexagons',
    name: 'Hexagons (হেক্সাগন)',
    originalName: 'Hexagons (হেক্সাগন)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="34.64" height="40"><path d="M17.32 0L34.64 10V30L17.32 40L0 30V10Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-isometric',
    name: 'Isometric Cube (আইসোমেট্রিক কিউব)',
    originalName: 'Isometric Cube (আইসোমেট্রিক কিউব)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="103.92"><path d="M30 0L60 17.32V51.96L30 69.28L0 51.96V17.32Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/><path d="M30 34.64L60 17.32M30 34.64V69.28M30 34.64L0 17.32" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-islamic',
    name: 'Islamic Geometric (ইসলামিক জ্যামিতিক)',
    originalName: 'Islamic Geometric (ইসলামিক জ্যামিতিক)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><path d="M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/><rect x="20" y="20" width="40" height="40" fill="none" stroke="#888" stroke-width="1" opacity="0.3" transform="rotate(45 40 40)"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-mandala',
    name: 'Mandala (মানদালা)',
    originalName: 'Mandala (মানদালা)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/><circle cx="50" cy="50" r="20" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/><path d="M50 10C60 30 70 30 90 50C70 70 60 70 50 90C40 70 30 70 10 50C30 30 40 30 50 10Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-celtic',
    name: 'Celtic-inspired (সেল্টিক-অনুপ্রাণিত)',
    originalName: 'Celtic-inspired (সেল্টিক-অনুপ্রাণিত)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><path d="M10 30A20 20 0 0 1 50 30A20 20 0 0 1 10 30M30 10A20 20 0 0 1 30 50A20 20 0 0 1 30 10" fill="none" stroke="#888" stroke-width="2" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-asanoha',
    name: 'Asanoha (আসানোহ)',
    originalName: 'Asanoha (আসানোহ)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="103.92"><path d="M30 0L60 51.96L0 51.96Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/><path d="M30 103.92L60 51.96L0 51.96Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/><path d="M30 34.64L30 0M30 34.64L60 51.96M30 34.64L0 51.96" stroke="#888" stroke-width="1" opacity="0.3"/><path d="M30 69.28L30 103.92M30 69.28L60 51.96M30 69.28L0 51.96" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-minimalist',
    name: 'Minimalist Line Art (মিনিমালিস্ট লাইন আর্ট)',
    originalName: 'Minimalist Line Art (মিনিমালিস্ট লাইন আর্ট)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M0 20H40M20 0V40" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-polygonal',
    name: 'Polygonal Pattern (পলিগোনাল প্যাটার্ন)',
    originalName: 'Polygonal Pattern (পলিগোনাল প্যাটার্ন)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><path d="M0 0L30 20L60 0L40 30L60 60L30 40L0 60L20 30Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-chevron',
    name: 'Zigzag & Chevron (জিগজ্যাগ ও শেভরন)',
    originalName: 'Zigzag & Chevron (জিগজ্যাগ ও শেভরন)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M0 10L20 30L40 10" fill="none" stroke="#888" stroke-width="2" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-tessellation',
    name: 'Tessellation (টেসলেশন)',
    originalName: 'Tessellation (টেসলেশন)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M0 20L20 0L40 20L20 40Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/><path d="M20 0V40M0 20H40" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-dots',
    name: 'Dots (বিন্দু)',
    originalName: 'Dots (বিন্দু)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="2" fill="#888" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-diagonal-lines',
    name: 'Diagonal Lines (তেরছা রেখা)',
    originalName: 'Diagonal Lines (তেরছা রেখা)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M-5 25L25 -5" stroke="#888" stroke-width="2" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-grid',
    name: 'Grid (গ্রিড)',
    originalName: 'Grid (গ্রিড)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-waves',
    name: 'Waves (ঢেউ)',
    originalName: 'Waves (ঢেউ)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20"><path d="M0 10 Q10 0 20 10 T40 10" fill="none" stroke="#888" stroke-width="2" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-crosses',
    name: 'Crosses (প্লাস)',
    originalName: 'Crosses (প্লাস)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M10 5V15M5 10H15" stroke="#888" stroke-width="2" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-scales',
    name: 'Scales (আঁশ)',
    originalName: 'Scales (আঁশ)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20"><path d="M0 20 A20 20 0 0 1 40 20" fill="none" stroke="#888" stroke-width="2" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-moroccan',
    name: 'Moroccan (মরক্কান)',
    originalName: 'Moroccan (মরক্কান)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M20 0 A10 10 0 0 1 30 10 A10 10 0 0 1 40 20 A10 10 0 0 1 30 30 A10 10 0 0 1 20 40 A10 10 0 0 1 10 30 A10 10 0 0 1 0 20 A10 10 0 0 1 10 10 A10 10 0 0 1 20 0 Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-stars',
    name: 'Stars (তারা)',
    originalName: 'Stars (তারা)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M20 5 L24 15 L35 15 L26 22 L29 32 L20 26 L11 32 L14 22 L5 15 L16 15 Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  },
  {
    id: 'pattern-diamonds',
    name: 'Diamonds (ডায়মন্ড)',
    originalName: 'Diamonds (ডায়মন্ড)',
    url: createSvgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50"><path d="M15 0 L30 25 L15 50 L0 25 Z" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>'),
    createdAt: 0
  }
];
