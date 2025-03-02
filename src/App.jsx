import { RouterProvider } from "react-router";
import router from "./router/routes";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
      <Toaster />
    </>
  );
}

export default App;
