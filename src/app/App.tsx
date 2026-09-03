import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </HelmetProvider>
  );
}
