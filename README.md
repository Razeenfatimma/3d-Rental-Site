# 3D Real Estate Explorer

An interactive 3D real-estate showcase built for the Front-End Development Internship capstone project. Visitors can browse three fictional properties, explore interactive 3D models, click floor hotspots for room details, and submit a private showing inquiry (saved locally in the browser).


## Tech Stack

- **React 19** — component-based UI, with root-level state managing the selected property, floor, and room modal
- **Vite** — dev server and production build tool
- **React Three Fiber** (`@react-three/fiber`) + **Drei** (`@react-three/drei`) — React bindings for Three.js; Drei supplies orbit controls, HTML overlays, and line helpers
- **Three.js** — underlying 3D engine; all property models are built from primitive geometry (boxes, cylinders, cones) rather than imported 3D files
- **Bootstrap 5** — base CSS framework and layout classes
- **Motion** — UI animations
- **Lucide React** — icons
- **TypeScript** — used for the app entry point and build config; most components are JavaScript/JSX

## Features

- Three fully modeled properties (Villa Lumina, Verdant Terraces Estate, The Horizon Glass Pavilion) with swipe/arrow/dot navigation between them
- Rotate, zoom, and pan controls on each 3D scene
- Clickable floor/room hotspots with animated camera transitions and detail callouts
- Property details panel (price, specs, address) driven by property data
- Inquiry form with client-side validation (name, email, phone) and Local Storage persistence — no backend or real booking service
- Fully responsive layout

## Getting Started

```bash
# install dependencies
npm install --legacy-peer-deps

# start the dev server
npm run dev

# production build
npm run build

# lint
npm run lint
```

> Note: `--legacy-peer-deps` is required due to a peer dependency version mismatch between React 19 and some current package versions.

## Project Structuresrc/
components/
scene/ — 3D scene, camera controller, floor callouts, property models
panels/ — property details, inquiry form
form/ — form inputs
layout/ — navbar, hero, footer
data/ — propertyData.js, roomsData.js
assets/ — images


## Credits

- Property models are built entirely from Three.js primitive geometry — no external 3D model files are used.
- All property names, addresses, agent details, and pricing are fictional and created for this project; no real individuals, companies, or listings are represented.

## Disclaimer

This is a student capstone project built for demonstration purposes. It is not a real property listing service, contains no real estate data, and does not submit inquiries to any external party — all form data is stored only in the visitor's own browser via Local Storage.