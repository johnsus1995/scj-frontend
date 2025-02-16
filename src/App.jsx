import { RouterProvider } from "react-router";
import router from "./router/routes";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </>
  );
}

export default App;
