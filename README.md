# Shoes Store Frontend

This is the frontend application for a shoes e-commerce store, built with Next.js, TypeScript, and Tailwind CSS. It provides a modern and responsive user interface for browsing products, managing a shopping cart, handling user authentication, and viewing order history.

## Features

*   **Product Catalog:** Browse a wide range of shoes categorized by type (e.g., sneakers, sandals, slip-on).
*   **Product Details:** View detailed information for each product, including images, descriptions, and available sizes.
*   **Shopping Cart:** Add, update, and remove items from the shopping cart.
*   **User Authentication:** Sign up, sign in, and manage user profiles.
*   **Order History:** View past orders and their details.
*   **Responsive Design:** Optimized for various screen sizes, from mobile devices to desktops.
*   **Search Functionality:** Easily find products using the search bar.
*   **Newsletter Subscription:** Subscribe to receive updates and promotions.

## Technologies Used

*   **Framework:** Next.js (React Framework)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API (for Cart)
*   **API Integration:** Fetch API / Axios (implied by `src/api` directory)

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/shoes-store-frontend.git
    cd shoes-store-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your API endpoint:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api # Replace with your actual backend API URL
    ```

## Usage

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
.
├── public/                 # Static assets (images, icons)
├── src/
│   ├── api/                # API service integrations
│   ├── app/                # Next.js pages and routes
│   │   ├── (auth)/         # Authentication pages (signin, signup)
│   │   ├── cart/           # Shopping cart page
│   │   ├── home/           # Home page
│   │   ├── me/             # User profile and order history
│   │   ├── sandals/        # Sandals product category
│   │   ├── slipon/         # Slip-on product category
│   │   └── sneakers/       # Sneakers product category
│   ├── components/         # Reusable UI components
│   │   ├── form/           # Form-related components
│   │   ├── home/           # Home page specific components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   ├── me/             # User profile specific components
│   │   └── ui/             # Generic UI components (buttons, cards)
│   ├── context/            # React Context for global state
│   ├── lib/                # Utility functions
│   ├── mocks/              # Mock data (e.g., productmock.ts)
│   └── types/              # TypeScript type definitions
├── .gitignore              # Git ignore file
├── components.json         # Shadcn/ui components configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License.
