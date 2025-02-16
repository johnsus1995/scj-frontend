import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes before refetching
            cacheTime: 1000 * 60 * 10, // 10 minutes cache duration
            refetchOnWindowFocus: false, // Disable refetching on tab switch
            retry: 2, // Retry failed requests twice
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
