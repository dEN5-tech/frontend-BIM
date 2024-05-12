import React, { Suspense } from 'react';
import {
  ChakraProvider,
  Spinner
} from "@chakra-ui/react";
import theme from "./theme"; // Importing the theme from theme.ts for consistent styling
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './store';
import "./App.css";


const MainLayout = React.lazy(() => import("./routes/MainLayout"));
const ChatRoute = React.lazy(() => import("./routes/ChatRoute"));
const EventsRoute = React.lazy(() => import("./routes/EventsRoute"));
const ProjectsRoute = React.lazy(() => import("./routes/ProjectsRoute"));
const ProjectDetailsRoute = React.lazy(() => import("./routes/ProjectDetailsRoute"));
const CreateProjectRoute = React.lazy(() => import("./routes/CreateProjectRoute"));


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
      {
        path: "events",
        element: lazyWithFallback(EventsRoute),
      },
      {
        path: "projects",
        element: lazyWithFallback(ProjectsRoute)
      },
      {
        path: "projects/:projectId",
        element: lazyWithFallback(ProjectDetailsRoute),
      },
      {
        path: "projects/create",
        element: lazyWithFallback(CreateProjectRoute),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

// Configure Redux store
const store = configureStore({
  reducer: rootReducer
});

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
