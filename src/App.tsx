import React, { Suspense } from 'react';
import {
  ChakraProvider,
  Spinner
} from "@chakra-ui/react";
import theme from "./theme"; // Importing the theme from theme.ts for consistent styling
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';

const MainLayout = React.lazy(() => import("./routes/MainLayout"));
const ChatRoute = React.lazy(() => import("./routes/ChatRoute"));

// Define a helper function to wrap components with Suspense and a custom fallback
const lazyWithFallback = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<Spinner color="brand.peach" />}>
    <Component />
  </Suspense>
);

// Define routes using RouteObject for better type safety and maintainability
const routes: RouteObject[] = [
  {
    path: "/",
    element: lazyWithFallback(MainLayout),
    children: [
      {
        path: "chat",
        element: lazyWithFallback(ChatRoute),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
