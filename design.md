# Design System: Quill

A cinematic, scrollytelling experience designed to showcase the heritage and craftsmanship of pure Cashmere Pashmina.

---

## 🎨 Visual Identity
The design focuses on **Editorial Luxury** and **Cinematic Narrative**. By using a "Dark Mode" foundation, we highlight the intricate textures and rich colors of the pashmina fibers.

### Core Aesthetic
- **Atmosphere**: Moody, premium, and calm.
- **Typography**: 
  - **Headings**: `Playfair Display` (Serif) — for a classic, sophisticated, and heritage-driven feel.
  - **Body**: `Inter` (Sans-serif) — for modern legibility and a clean look.
- **Layout**: Minimalist with generous whitespace (negative space) to let the visuals breathe.

---

## 🛠 Tech Stack
| Section | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14** | React framework with App Router for performance and SEO. |
| **Visual Engine** | **HTML5 Canvas** | High-performance rendering for 240+ image frames. |
| **Animations** | **Framer Motion** | Smooth scroll-driven reveals and UI transitions. |
| **Styling** | **Tailwind CSS** | Utility-first styling for precise design control. |
| **Image Hosting**| **Cloudinary** | Automated optimization and delivery of high-res sequence frames. |
| **Components** | **Radix UI / Shadcn**| Accessible, low-level UI primitives for premium components. |

---

## 🌓 Color Palette

### Primary Colors
- **Main Background**: `#04070B` (Obsidian Black) — Provides a rich, deep foundation for visuals.
- **Footer/Shadows**: `#020305` (Deep Midnight) — Used for depth and section differentiation.
- **Primary Text**: `rgba(255, 255, 255, 0.92)` (Pure Cloud) — High legibility with a soft touch.
- **Secondary Text**: `rgba(255, 255, 255, 0.65)` (Silver Mist) — For descriptions and subheadings.

### Accent Accents & Gradients
- **Heritage Blue**: `rgba(96, 165, 250, 0.8)` (`blue-400`) — Symbolizing tradition and depth.
- **Material Cyan**: `rgba(34, 211, 238, 0.8)` (`cyan-400`) — Representing the purity of fibers.
- **The Luxe Gradient**: `linear-gradient(to right, #60A5FA, #22D3EE)` — Used for hero highlights and premium badges.

---

## 📽 Key Design Features
1. **Interactive Scrollytelling**: An Apple-style image sequence that plays as the user scrolls, creating a tactile "unfolding" of the product.
2. **Multi-Step Loader**: A storytelling pre-loader that builds anticipation while preparing high-resolution assets.
3. **Glassmorphism**: Subtle `backdrop-blur` effects on the Navbar and section cards to maintain depth while scrolling.
4. **Cinematic Pacing**: Careful use of `framer-motion` to ensure text fades and slides in harmony with the background sequence.
