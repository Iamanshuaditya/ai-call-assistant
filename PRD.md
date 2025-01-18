# Product Requirements Document (PRD): Landing Page with Components

## Objective

Build a landing page using the provided components and ensure the application is functional and visually appealing.

---

## Components to Use

1. **Navbar:** `npx shadcn@latest add "https://21st.dev/r/ayushmxxn/tubelight-navbar"`
2. **Hero Section:** `npx shadcn@latest add "https://21st.dev/r/kinfe123/hero-section-dark"`
3. **Video Dialog:** `npx shadcn@latest add "https://21st.dev/r/magicui/hero-video-dialog"`
4. **Testimonials:** `npx shadcn@latest add "https://21st.dev/r/serafimcloud/testimonials-with-marquee"`
5. **Pricing:** `npx shadcn@latest add "https://21st.dev/r/vaib215/dark-gradient-pricing"`
6. **Footer:** `npx shadcn@latest add "https://21st.dev/r/arihantcodes/large-name-footer"`

---

## Steps to Execute the App

### 1. Setup the Project



3. **Install Shadcn UI:**

   ```bash
   npm install shadcn-ui
   ```

4. **Set up Tailwind CSS:**
   Ensure Tailwind CSS is properly configured. Follow the setup steps:

   ```bash
   npx shadcn@latest init
   ```

   This command initializes Shadcn components and Tailwind CSS configuration.

### 2. Add Components

Add each component sequentially as per the provided commands:

1. **Navbar:**

   ```bash
   npx shadcn@latest add "https://21st.dev/r/ayushmxxn/tubelight-navbar"
   ```

2. **Hero Section:**

   ```bash
   npx shadcn@latest add "https://21st.dev/r/kinfe123/hero-section-dark"
   ```

3. **Video Dialog:**

   ```bash
   npx shadcn@latest add "https://21st.dev/r/magicui/hero-video-dialog"
   ```

4. **Testimonials:**

   ```bash
   npx shadcn@latest add "https://21st.dev/r/serafimcloud/testimonials-with-marquee"
   ```

5. **Pricing:**

   ```bash
   npx shadcn@latest add "https://21st.dev/r/vaib215/dark-gradient-pricing"
   ```

6. **Footer:**

   ```bash
   npx shadcn@latest add "https://21st.dev/r/arihantcodes/large-name-footer"
   ```

### 3. Arrange the Components

Edit the `pages/index.js` (or `index.tsx` if TypeScript is used) file to arrange the imported components into a cohesive landing page structure.

Example:

```jsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoDialog from "@/components/VideoDialog";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <VideoDialog />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}
```

### 4. Customize Components

Modify the content, styles, or props of the components as needed. Check the respective documentation or inspect the code for each component for customization options.

### 5. Test the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000` in your browser to view the application.

3. Verify the following:

   - Navbar displays correctly with functional links.
   - Hero section is visually appealing.
   - Video dialog opens and plays videos as expected.
   - Testimonials scroll properly.
   - Pricing section is readable and styled.
   - Footer includes relevant information.

4. Test responsiveness across various devices using browser developer tools.

### 6. Deploy the Application

1. **Build the application for production:**

   ```bash
   npm run build
   ```

2. **Deploy to a hosting platform:**
   Example with Vercel:

   ```bash
   npm install -g vercel
   vercel
   ```

---

## Landing Page Features

- **Navbar:** Sticky navigation bar with links to various sections.
- **Hero Section:** Catchy headline, subheading, and call-to-action.
- **Video Dialog:** Showcase video content with a modal dialog.
- **Testimonials:** Highlight user feedback in a marquee style.
- **Pricing Section:** Detailed pricing plans with a dark gradient background.
- **Footer:** Concluding section with social links and additional resources.

---

## Additional Notes

- Ensure accessibility by adding `aria` labels and proper semantic HTML.
- Optimize images and videos to reduce page load time.
- Perform SEO optimization by adding meta tags and appropriate headers.
- Integrate analytics (e.g., Google Analytics) for user tracking if required.

