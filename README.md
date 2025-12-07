# Creative Portfolio — Graphics Designer & Video Editor

An Awwwards-level, editorial-style portfolio website with a minimalist, high-fashion aesthetic.

![Portfolio Preview](https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=600&fit=crop)

---

## ✨ Features

### Design Aesthetic
- **Minimalist Editorial Style** — Clean, high-fashion look inspired by luxury magazines
- **Sophisticated Typography** — Playfair Display (Italic Serif) for headings + Inter (Sans-Serif) for body
- **Strict Monochrome Palette** — Off-white background (#f9f9f9) with dark charcoal text (#1a1a1a)

### Technical Implementation
- **Responsive CSS Grid** — 2 columns (mobile) → 3 columns (tablet) → 4 columns (desktop)
- **Semantic HTML5** — Proper structure with header, main, section, article, footer
- **Intersection Observer Animations** — Smooth slide-up and fade-in on scroll
- **Mixed Media Support** — Images and video embeds (YouTube/Vimeo) side-by-side

### Animations & Interactions
- **Scroll Animations** — Elements gracefully appear as you scroll
- **Hover Effects** — Images scale with parallax micro-interaction
- **Title Enhancement** — Italic titles become bold on hover
- **Smooth Navigation** — Anchor links with smooth scroll behavior

---

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (grid, typography, animations)
├── js/
│   └── script.js       # Intersection Observer & interactions
└── README.md           # This file
```

---

## 🚀 Entry Points

| Path | Description |
|------|-------------|
| `/` or `/index.html` | Main portfolio page |
| `/#work` | Portfolio grid section (anchor) |
| `/#contact` | Footer with contact links (anchor) |

---

## 🎨 Customization Guide

### Adding a New Image Project

Copy and paste this block into the `.portfolio__grid` section:

```html
<div class="project-card animate-on-scroll">
    <div class="project-card__media">
        <img 
            src="YOUR_IMAGE_URL_HERE" 
            alt="Description of your project"
            class="project-card__image"
            loading="lazy"
        >
    </div>
    <div class="project-card__info">
        <h3 class="project-card__title">Project Title</h3>
        <span class="project-card__category">Category</span>
    </div>
</div>
```

### Adding a New YouTube Video

```html
<div class="project-card project-card--video animate-on-scroll">
    <div class="project-card__media">
        <iframe 
            src="https://www.youtube.com/embed/VIDEO_ID?controls=1&rel=0&modestbranding=1" 
            title="Video title"
            class="project-card__video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
        ></iframe>
    </div>
    <div class="project-card__info">
        <h3 class="project-card__title">Video Title</h3>
        <span class="project-card__category">Video Production</span>
    </div>
</div>
```

### Adding a New Vimeo Video

```html
<div class="project-card project-card--video animate-on-scroll">
    <div class="project-card__media">
        <iframe 
            src="https://player.vimeo.com/video/VIDEO_ID?h=0&title=0&byline=0&portrait=0" 
            title="Video title"
            class="project-card__video"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            loading="lazy"
        ></iframe>
    </div>
    <div class="project-card__info">
        <h3 class="project-card__title">Video Title</h3>
        <span class="project-card__category">Brand Film</span>
    </div>
</div>
```

---

## 🎯 Completed Features

- [x] Hero section with italicized tagline
- [x] Responsive CSS Grid portfolio (2/3/4 columns)
- [x] Image project cards with hover zoom effect
- [x] Video embed support (YouTube & Vimeo)
- [x] Intersection Observer scroll animations
- [x] Parallax micro-interactions on hover
- [x] Smooth scroll navigation
- [x] Fixed header with backdrop blur
- [x] Footer with social links and CTA
- [x] Accessibility features (focus states, reduced motion)
- [x] Semantic HTML5 structure
- [x] Clean, commented, production-ready code

---

## 🔮 Recommended Next Steps

1. **Replace placeholder content** — Add your actual projects, images, and videos
2. **Update contact information** — Change email and social media links
3. **Add project detail pages** — Create individual pages for each project
4. **Implement lightbox** — Add image/video lightbox for expanded viewing
5. **Add filtering** — Category-based filtering for the portfolio grid
6. **SEO optimization** — Add meta tags, Open Graph, structured data
7. **Performance audit** — Optimize images, add preloading for critical assets

---

## 🛠 Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Grid, Custom Properties, Animations
- **JavaScript (ES6+)** — Intersection Observer API, Classes
- **Google Fonts** — Playfair Display, Inter

---

## 📱 Responsive Breakpoints

| Breakpoint | Grid Columns | Description |
|------------|--------------|-------------|
| < 768px | 2 columns | Mobile |
| ≥ 768px | 3 columns | Tablet |
| ≥ 1200px | 4 columns | Desktop |

---

## ♿ Accessibility

- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- Focus-visible states for keyboard navigation
- `prefers-reduced-motion` support for users who prefer no animations
- Semantic HTML landmarks

---

## 📄 License

Feel free to use and modify for personal or commercial projects.

---

*Crafted with passion ✨*
