# RB Digital Design Portfolio

This is a Next.js portfolio website for Rich Bartlett (RB Digital Design), built with Next.js (App Router), TypeScript, and Tailwind CSS, and configured for deployment on Firebase Hosting.

## Overview

The purpose of this site is to showcase UX, Learning Design, Hackathon, and Coding projects in a clean, modern interface. It features a filterable and searchable project gallery, detailed case study pages, a blog, and contact functionality.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

## Project Structure

- `src/app/`: Contains all the application routes.
- `src/components/`: Reusable React components.
- `src/data/`: JSON files for content like projects and blog posts.
- `src/styles/`: Global styles and design tokens.
- `public/`: Static assets like images and documents.

## How to Update Content

### Projects

All project data is stored in `src/data/projects.json`. To add, remove, or edit a project, modify this file.

Each project object has the following structure:

```json
{
  "slug": "unique-project-identifier",
  "title": "Project Title",
  "category": "User Experience",
  "summary": "A brief one-sentence summary of the project.",
  "tags": ["UX", "UI", "Prototyping"],
  "coverImage": "https://placehold.co/600x400.png",
  "gallery": [
    "https://placehold.co/1200x800.png",
    "https://placehold.co/1200x800.png"
  ],
  "overview": "A more detailed paragraph about the project.",
  "problem": "The problem statement or challenge.",
  "process": "Description of the process and methodology.",
  "outcomes": "Results and impact of the project.",
  "role": "My Role",
  "year": 2023,
  "duration": "6 Weeks",
  "team": "Solo, with mentorship",
  "tools": ["Figma", "React", "Next.js"],
  "links": {
    "live": "#",
    "github": "#"
  }
}
```

- **`slug`**: Must be unique. It's used for the URL (e.g., `/projects/your-slug`).
- **`category`**: Should be one of the predefined categories: `User Experience`, `Learning Design`, `Hackathons`, `Coding Projects`.
- **Images**: Use placeholder URLs or upload images to the `public` folder and use a relative path (e.g., `/images/my-project-cover.png`).

### Blog Posts

*This feature is currently under development.*

Blog post data will be stored in a similar fashion in a file like `src/data/posts.json`. Follow the existing structure for projects as a template.

### Design Tokens

The site's visual identity is controlled by design tokens located in `src/styles/brand-tokens.json`. These tokens define colours, typography, spacing, and more.

While you can edit this file to keep a record of the design system, the actual styles are implemented as CSS variables in `src/app/globals.css`.

To change a core colour, you will need to:
1.  Find the corresponding HSL variable in `src/app/globals.css` (e.g., `--primary`).
2.  Convert your new hex colour to HSL values.
3.  Update the HSL values for both the light (`:root`) and dark (`.dark`) themes.

Example for changing the primary colour:
```css
/* In src/app/globals.css */
:root {
  --primary: 180 25% 37%; /* New HSL value */
}

.dark {
  --primary: 180 25% 37%; /* New HSL value for dark mode */
}
```

## Deployment

This project is pre-configured for Firebase Hosting. To deploy:

1.  Make sure you have the Firebase CLI installed and are logged in.
2.  Set up a Firebase project and connect it to your local repository.
3.  Run the build command:
    ```bash
    npm run build
    ```
4.  Deploy to Firebase:
    ```bash
    firebase deploy --only hosting
    ```
