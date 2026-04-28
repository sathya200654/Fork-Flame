import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#F5F5F5",
            border: "1px solid rgba(212, 175, 55, 0.3)",
          },
        }}
      />
    </AppProvider>
  );
}