import React, { Suspense } from 'react';
import {
  ChakraProvider,
  Flex,
  Spinner
} from "@chakra-ui/react";
import theme from "./theme"; // Importing the theme from theme.ts for consistent styling
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './store';
import "./App.css";
import RouteLoader from './components/RouteLoader';



const MainLayout = React.lazy(() => import("./routes/MainLayout"));
const ChatRoute = React.lazy(() => import("./routes/ChatRoute"));
const EventsRoute = React.lazy(() => import("./routes/EventsRoute"));
const ProjectsRoute = React.lazy(() => import("./routes/ProjectsRoute"));
const ProjectDetailsRoute = React.lazy(() => import("./routes/ProjectDetailsRoute"));
const CreateProjectRoute = React.lazy(() => import("./routes/CreateProjectRoute"));
const LoginRoute = React.lazy(() => import("./routes/LoginRoute"));
const ProfileRoute = React.lazy(() => import("./routes/ProfileRoute"));
const SettingsRoute = React.lazy(() => import("./routes/SettingsRoute"));



// Configure Redux store
export const store = configureStore({
  reducer: rootReducer
});



// Define a helper function to wrap components with Suspense and a custom fallback
const lazyWithFallback = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<Flex justify="center" align="center" h="100vh"><Spinner color="brand.peach"/></Flex>}>
    <Component />
  </Suspense>
);

// Define routes using RouteObject for better type safety and maintainability
const routes: RouteObject[] = [
  {
    path: "/",
    element: lazyWithFallback(MainLayout),
    loader: RouteLoader,
    children: [
      {
        path: "chat",
        element: lazyWithFallback(ChatRoute),
        // Redirect to login if not authenticated for chat
        loader: RouteLoader

      },
      {
        path: "events",
        element: lazyWithFallback(EventsRoute),
        // Redirect to login if not authenticated for events
        loader: RouteLoader
      },
      {
        path: "projects",
        element: lazyWithFallback(ProjectsRoute)
      },
      {
        path: "profile",
        element: lazyWithFallback(ProfileRoute),
        // Redirect to login if not authenticated for profile
        loader: RouteLoader
      },
      {
        path: "settings",
        element: lazyWithFallback(SettingsRoute),
        // Redirect to login if not authenticated for settings
        loader: RouteLoader
      },
      {
        path: "projects/:projectId",
        element: lazyWithFallback(ProjectDetailsRoute),
        // Redirect to login if not authenticated for project details
        loader: RouteLoader
      },
      {
        path: "projects/create",
        element: lazyWithFallback(CreateProjectRoute),
        // Redirect to login if not authenticated for creating projects
        loader: RouteLoader
      },
    ],
  },
  {
    path: "/login",
    element: lazyWithFallback(LoginRoute),
  },
];
const router = createBrowserRouter(routes);




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



