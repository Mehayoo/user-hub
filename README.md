# UserHub Record Management App

This app showcases a blend of modern web technologies and best practices, emphasizing a strongly typed and secure approach to web development.

## Key Features

-   **CRUD Operations**: View, create, edit, and delete user records directly from a responsive data table.
-   **Tech Stack**: Built with Next.js, React, TypeScript, Ant Design (AntD), React Hook Form, Recoil, and Prisma, ensuring a type-safe and robust application.
-   **Dynamic Data Fetching**: Leverages Next.js's Server-Side Generation (SSG) with on-demand cache revalidation for up-to-date data presentation without sacrificing performance.
-   **State Management**: Utilizes Recoil for efficient global state management across the app, enabling dynamic updates and consistent state across components.
-   **Form Handling and Validation**: Integrates React Hook Form with AntD for fluid form experiences and employs Yup and Zod for comprehensive client and server-side validation.
-   **Server Actions**: Employs Next.js server actions for server-side data processing and validation, ensuring data integrity and security.
-   **Session Storage**: Retains query parameters (like sorting, pagination, and filters) in session storage for a persistent user experience across page refreshes and navigation.
-   **Relational Data Modeling**: Features a relational database design with Prisma, modeling users and countries with a many-to-one relationship.
-   **Type Safety**: Enforces a strongly typed codebase using TypeScript, enhancing code reliability and maintainability.
-   **User-Friendly UI**: Offers an ergonomic and intuitive user interface, designed with AntD components for a seamless user experience.
-   **Notification System**: Integrates a real-time notification system, providing immediate visual feedback for user actions, enhancing the interactive experience.

## Getting Started

This app is pre-seeded with sample data for immediate exploration. Upon the first launch, it checks for the presence of the SQLite database; if absent, it seeds the database with initial data, providing a ready-to-use setup.

### Installation Instructions

1. Clone the repository to your local machine
2. Navigate to the project directory and run `npm install` to install all required dependencies.
3. To start the app in development mode, run `npm run dev`. This allows for hot reloading and immediate feedback on code changes.
4. For a more production-like experience, it is encouraged to build the app and run it in production mode. To do this, first build the app using `npm run build`
5. Once the build process is complete, start the app in production mode by running `npm run start`.
6. While in production mode, inspect which routes are dynamically generated and which are statically generated for a comprehensive understanding of the app's rendering behavior.

> [!IMPORTANT]

If any error is received when first trying to run the app with `npm install`, `npm run build`, `npm run start`, then you might need to configure the prisma client.

1. Copy **_schema.prisma_** from **_/prisma_** folder aywhere outside the project folder.
2. Delete **_/prisma_** folder.
3. Run `npx prisma  init --datasource-provider sqlite` command.
4. Replace newly generated **_schema.prisma_** file from **_/prisma_** folder with the old **_schema.prisma_** file (this is where the entities are located).
5. Run `npx prisma migrate dev` and give it a name.
6. Run `npm run dev` for development mode or `npm run build` and `npm run start` for production mode.

## Key Technologies

-   **Frontend**: React, Next.js (**_App router_**), AntD, React Hook Form, Recoil
-   **Backend**: Next.js API routes, Prisma ORM
-   **Database**: SQLite for ease of use and quick setup
-   **Validation**: Yup (client-side), Zod (server-side)
-   **Styling**: Styling is mostly done through AntD's component base. Since the implication in actual styling was minimal, inline styles were used in favor of scss files

## Special Features

-   **Dynamic and Static Rendering**: Combines the best of both worlds by using SSG for initial page loads and React's client-side capabilities for dynamic updates.
-   **Session Persistence**: Manages session storage to maintain user state across the app, providing a consistent and reliable user experience.
-   **Adaptive URL Management**: Dynamically updates URLs with query parameters reflecting the current app state, offering clear navigation cues to the user.
-   **Adaptable Codebase**: Demonstrates best practices in web development, with a focus on adaptability, scalability, and maintainability.

> [!IMPORTANT]

## Intellectual Property

This app is my intellectual property, **_Mihaiu Sorin-Ionut_** and serves as a demonstration of my professional skills, adaptability, and commitment to delivering high-quality software solutions. It showcases modern web development practices, emphasizing type safety, user experience, and robust architecture.
