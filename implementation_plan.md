# Goal
Build a modern, eye-catching static school website for LearnVerse where parents can enroll their wards and tutors can apply for positions. The site will have a premium design using an orange and white color scheme and subtle animations.

## Proposed Changes

We will build an HTML/CSS/JS static site structure within the workspace directory (`c:\Users\Lucas\Documents\LearnVerse`).

---

### Static Website Files

#### [NEW] [index.html](file:///c:/Users/Lucas/Documents/LearnVerse/index.html)
The main HTML file containing the structure of the website. It will include:
- A 3-second full-screen loading animation displaying `logoImg.jpeg`.
- Navigation bar with the logo and anchor links.
- Hero Section: A background container with sliding images (`slide1.jpg.jpeg` to `slide6.jpeg`), overlaid with a welcome message and two distinct Call to Action (CTA) buttons: "Parent Sign Up" and "Tutor Apply" (placeholders for the Google Forms links).
- About the Founder Section: A section featuring `founderImg.jpeg`, highlighting the founder's vision.
- Instructors Section: A dedicated section for Justine, using `JUSTINE.jpeg`, detailing his role as the IT Specialist and Coding Instructor.
- Footer: Basic contact and copyright information.

#### [NEW] [styles.css](file:///c:/Users/Lucas/Documents/LearnVerse/styles.css)
The stylesheet containing all styling rules based on the "vanilla CSS" constraints:
- Color Scheme: Primary orange (`#ff6b00` or similar vibrant shade) and white (`#ffffff`).
- Loading Screen: CSS keyframes for a fade-out animation after 3 seconds.
- Typography: Setup base typography utilizing modern fonts like Inter or Outfit via Google Fonts.
- Layout: Flexbox and Grid layouts for the navbar, hero, and about sections.
- Hero Slider: CSS implementation using keyframes for a smooth background slideshow, or a lightweight JS-based carousel.
- Animations: Scroll-triggered fade-up animations on sections and cards to make the site feel dynamic and premium.

#### [NEW] [script.js](file:///c:/Users/Lucas/Documents/LearnVerse/script.js)
The Javascript file to control dynamic behaviors:
- Loading screen removal logic (3000ms timeout).
- Image slider logic to handle cross-fading or sliding between the provided slide images.
- Intersection Observer to trigger subtle entrance animations for elements when they scroll into view.

## Open Questions

> [!IMPORTANT]
> 1. You mentioned you will provide the Google Form links. Would you like me to leave them as `#` placeholders for now, or would you like to provide them so I can include them immediately?
> 2. What is the name of the Founder? If not provided, I will use placeholder text (e.g., "Our Founder").
> 3. Are there any specific tagline or welcome messages you'd like on the hero banner and the About sections?

## Verification Plan

### Automated Tests
- N/A for a static site, but I can use an http-server command to preview the site with my browser subagent tool to ensure the layout matches the prompt.

### Manual Verification
- You can open the `index.html` file in your browser to verify the layout, the 3-second logo loading animation, color scheme, sliding banner, and responsive behaviors.
