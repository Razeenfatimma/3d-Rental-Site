// assets.js
// Central asset registry for the Villa Lumina architectural showcase.

import heroBanner from '../assets/images/villa_hero_banner_1789739571590.jpg';
import thumbLiving from '../assets/images/villa_thumb_living_1789739589914.jpg';
import thumbBedroom from '../assets/images/villa_thumb_bedroom_1789739627041.jpg';
import thumbBath from '../assets/images/villa_thumb_bath_1789739642665.jpg';
import botanicalsImg from '../assets/images/villa_botanicals_1789739606119.jpg';
import agentPortrait from '../assets/images/luxury_agent_portrait_1789741310103.jpg';
import roofTerraceImg from '../assets/images/villa_roof_terrace_1789741325202.jpg';
import verdantExterior from '../assets/images/verdant_terraces_exterior_1790402561373.jpg';
import glassPavilionExterior from '../assets/images/glass_pavilion_exterior_1790402580074.jpg';

export const propertyImages = {
  heroBanner,
  thumbLiving,
  thumbBedroom,
  thumbBath,
  botanicalsImg,
  agentPortrait,
  roofTerraceImg,
  verdantExterior,
  glassPavilionExterior,
  gallery: [
    {
      id: 'exterior',
      title: 'Architectural Dusk Exterior & Pool',
      src: heroBanner,
      caption: '3-story cantilevered modern residence with infinity pool',
    },
    {
      id: 'living',
      title: 'Great Room & Open Kitchen',
      src: thumbLiving,
      caption: 'Floor-to-ceiling glass panoramic living lounge with Italian furniture',
    },
    {
      id: 'bedroom',
      title: 'Master Penthouse Suite',
      src: thumbBedroom,
      caption: 'Top-floor bedroom suite with panoramic skyline views',
    },
    {
      id: 'bath',
      title: 'Spa Bathroom & Soaking Tub',
      src: thumbBath,
      caption: 'Travertine stone bath sanctuary with freestanding soaking tub',
    },
    {
      id: 'roof',
      title: 'Rooftop Solarium & Lounge',
      src: roofTerraceImg,
      caption: '360° panoramic sunset deck with cedar pergola and fire pit',
    },
  ],
};
