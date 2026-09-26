// propertyData.js
// Centralized luxury property data registry.
// Contains detailed architectural records for all 3 properties:
// 1. Villa Lumina Modern Residence
// 2. Verdant Terraces Estate
// 3. The Horizon Glass Pavilion

import { propertyImages } from './assets';

export const propertiesData = [
  // -------------------------------------------------------------
  // PROPERTY 1: Villa Lumina Modern Residence
  // -------------------------------------------------------------
  {
    id: 'villa-lumina',
    modelType: 'villa-lumina',
    title: 'Villa Lumina Modern Residence',
    subtitle: 'Contemporary 3-Story Luxury Residence with Architectural Cantilevers & Infinity Pool',
    tagline: 'An architectural tour de force combining raw structural poise with warm organic finishes.',
    price: '$4,850,000',
    pricePerSqFt: '$1,260 / sq ft',
    monthlyEst: '$11,850/mo',
    status: 'Signature Residence',
    mlsNumber: 'LX-VIL-001',
    escrowStatus: 'Contemporary architecture · indoor-outdoor living',
    architect: 'Studio Lumina + Olson & Partners Arch',
    image: propertyImages.heroBanner,
    address: {
      street: '001 Lumina Way',
      neighborhood: 'Lumina Ridge',
      city: 'Lumen Bay',
      state: 'LB',
      zip: '00000',
    },
    agent: {
      name: 'Morgan Vale',
      title: 'Private Client Advisor',
      brokerage: 'Northlight Property Atelier',
      phone: '000-000-0000',
      email: 'morgan@example.invalid',
      image: propertyImages.agentPortrait,
      bio: 'A considered approach to distinctive architecture, thoughtful design, and private viewings.',
    },
    proximity: [
      { label: 'Lumina Garden Walk', distance: '8 mins' },
      { label: 'Lumen Bay Design Quarter', distance: '12 mins' },
      { label: 'Cedar Ridge Conservatory', distance: '6 mins' },
      { label: 'Northlight Airfield', distance: '14 mins' },
    ],
    specs: [
      { label: 'Bedrooms', value: '4 Suites', icon: 'bed' },
      { label: 'Bathrooms', value: '3.5 Baths', icon: 'bath' },
      { label: 'Living Area', value: '3,850 sq ft', icon: 'square' },
      { label: 'Garage', value: '2-Car EV Ready', icon: 'car' },
      { label: 'Year Built', value: '2024 (Brand New)', icon: 'calendar' },
      { label: 'Lot Size', value: '0.28 Acres', icon: 'map' },
    ],
    highlights: {
      priceBadge: '$4.85M',
      bedroomsBadge: '4 Suites',
      areaBadge: '3,850 sq ft',
      locationBadge: 'Lumen Bay',
    },
    description:
      'Villa Lumina is a state-of-the-art 3-story modern architectural home featuring expansive cantilevered glass volumes, sustainable cedar accents, and uninterrupted views. The residence offers seamless indoor-outdoor living, an illuminated infinity pool, top-tier energy efficiency, and handcrafted architectural finishes throughout.',
    amenities: [
      'Smart Home Automation (Savant Whole-Home Touchscreen & App)',
      'Heated Saltwater Infinity Pool & Underwater LED Illuminations',
      'Architectural Float-Steel & Oak Floating Tread Staircase',
      'Built-in Sub-Zero & Miele Chef Appliance Suite',
      'Dual Tesla Level 2 EV Fast Charging Bays in Finished Garage',
      'Rooftop Solarium with Cedar Pergola & Linear Natural Gas Fire Pit',
      'Whole-Home Solar Array with Tesla Powerwall Energy Storage',
      'Lutron Palladiom Motorized Architectural Window Treatments',
    ],
  },

  // -------------------------------------------------------------
  // PROPERTY 2: Verdant Terraces Estate
  // -------------------------------------------------------------
  {
    id: 'verdant-terraces',
    modelType: 'verdant-terraces',
    title: 'Verdant Terraces Estate',
    subtitle: 'Biophilic 3-Story Residence with Stepped Sky Gardens & Mirror Reflection Pool',
    tagline: 'Harmonious biophilic architecture seamlessly integrating cascading flora, cedar louvers, and reflection water.',
    price: '$5,450,000',
    pricePerSqFt: '$1,233 / sq ft',
    monthlyEst: '$13,200/mo',
    status: 'Signature Residence',
    mlsNumber: 'LX-VER-002',
    escrowStatus: 'Biophilic architecture · stepped garden terraces',
    architect: 'Kengo Mori & Biophilic Design Studio',
    image: propertyImages.verdantExterior,
    address: {
      street: '002 Fernlight Terrace',
      neighborhood: 'Fernlight Gardens',
      city: 'Lumen Bay',
      state: 'LB',
      zip: '00000',
    },
    agent: {
      name: 'Morgan Vale',
      title: 'Private Client Advisor',
      brokerage: 'Northlight Property Atelier',
      phone: '000-000-0000',
      email: 'morgan@example.invalid',
      image: propertyImages.agentPortrait,
      bio: 'A considered approach to distinctive architecture, thoughtful design, and private viewings.',
    },
    proximity: [
      { label: 'Fernlight Botanical Walk', distance: '5 mins' },
      { label: 'Lumen Bay Terrace Market', distance: '7 mins' },
      { label: 'Cedar Canopy Pavilion', distance: '14 mins' },
      { label: 'Glasshouse Shoreline', distance: '20 mins' },
    ],
    specs: [
      { label: 'Bedrooms', value: '4 Suites', icon: 'bed' },
      { label: 'Bathrooms', value: '4.5 Baths', icon: 'bath' },
      { label: 'Living Area', value: '4,420 sq ft', icon: 'square' },
      { label: 'Garage', value: '3-Car Showcase', icon: 'car' },
      { label: 'Year Built', value: '2024 (Brand New)', icon: 'calendar' },
      { label: 'Lot Size', value: '0.35 Acres', icon: 'map' },
    ],
    highlights: {
      priceBadge: '$5.45M',
      bedroomsBadge: '4 Suites',
      areaBadge: '4,420 sq ft',
      locationBadge: 'Lumen Bay',
    },
    description:
      'Verdant Terraces Estate is an organic biophilic sanctuary sculpted across three terraced levels. Built with sustainable western red cedar louvers, honed travertine slabs, and cascading rooftop gardens, it features tranquil reflecting pools with floating stepping stones, floor-to-ceiling glass pavilions, and holistic wellness amenities.',
    amenities: [
      'Cascading Living Green Roofs with Native Drought-Tolerant Botanicals',
      'Reflecting Pool Sanctuary with Submerged Stone Stepping Walkway',
      'Motorized Vertical Cedar Shading Louvers with Sun-Tracking Sensors',
      'Integrated Finnish Cedar Sauna and Hydrotherapy Cold Plunge Pool',
      'Bespoke Italian Poliform Kitchen with Basalt Stone Countertops',
      'Rooftop Tea Pavilion with 360-Degree Canyon Greenery Views',
      'Geothermal Radiant Floor Heating and Cooling throughout All Levels',
      'Triple-Pane Low-E Acoustically Dampened Architectural Glass',
    ],
  },

  // -------------------------------------------------------------
  // PROPERTY 3: The Horizon Glass Pavilion
  // -------------------------------------------------------------
  {
    id: 'glass-pavilion',
    modelType: 'glass-pavilion',
    title: 'The Horizon Glass Pavilion',
    subtitle: 'Ultra-Minimalist Steel & Frameless Glass Masterpiece with Sunken Fire Lounge',
    tagline: 'A pure geometric marvel framed in matte black structural steel, floating wings, and an illuminated fire lounge.',
    price: '$6,250,000',
    pricePerSqFt: '$1,262 / sq ft',
    monthlyEst: '$15,100/mo',
    status: 'Signature Residence',
    mlsNumber: 'LX-HZN-003',
    escrowStatus: 'Minimalist architecture · panoramic glass pavilion',
    architect: 'Ludwig & Meier International Architecture',
    image: propertyImages.glassPavilionExterior,
    address: {
      street: '003 Horizon Glass Lane',
      neighborhood: 'Horizon Point',
      city: 'Lumen Bay',
      state: 'LB',
      zip: '00000',
    },
    agent: {
      name: 'Morgan Vale',
      title: 'Private Client Advisor',
      brokerage: 'Northlight Property Atelier',
      phone: '000-000-0000',
      email: 'morgan@example.invalid',
      image: propertyImages.agentPortrait,
      bio: 'A considered approach to distinctive architecture, thoughtful design, and private viewings.',
    },
    proximity: [
      { label: 'Horizon Design Walk', distance: '6 mins' },
      { label: 'Lumen Bay Arts Quarter', distance: '9 mins' },
      { label: 'Mirrorwater Garden', distance: '4 mins' },
      { label: 'Lumen Bay Airfield', distance: '22 mins' },
    ],
    specs: [
      { label: 'Bedrooms', value: '5 Suites', icon: 'bed' },
      { label: 'Bathrooms', value: '5.5 Baths', icon: 'bath' },
      { label: 'Living Area', value: '4,950 sq ft', icon: 'square' },
      { label: 'Garage', value: '4-Car Gallery', icon: 'car' },
      { label: 'Year Built', value: '2024 (Brand New)', icon: 'calendar' },
      { label: 'Lot Size', value: '0.42 Acres', icon: 'map' },
    ],
    highlights: {
      priceBadge: '$6.25M',
      bedroomsBadge: '5 Suites',
      areaBadge: '4,950 sq ft',
      locationBadge: 'Lumen Bay',
    },
    description:
      'The Horizon Glass Pavilion pairs sweeping floating structural steel cantilevers with frameless floor-to-ceiling glass and a sunken outdoor conversation lounge beside reflecting water.',
    amenities: [
      'Dramatic Sunken Outdoor Conversation Lounge with Custom Linear Fire Basin',
      'Suspended Glass Bridge Connecting the Primary Penthouse Wing',
      'Perimeter Water Reflection Canal with Soft Underwater Fiber-Optic Glow',
      '4-Car Climate-Controlled Gallery Garage with Turn-Table Display Platform',
      'Frameless Motorized Sliding Glass Pocket Walls Opening to Horizon Deck',
      'Whole-Home Creston Smart Lighting, Climate & Multi-Zone Sound Control',
      'Custom Floating Black Steel Open-Tread Staircase with LED Edge Glow',
    ],
  },
];

// Default export for backward compatibility with existing single-property references
export const propertyData = propertiesData[0];
