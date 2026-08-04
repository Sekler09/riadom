import { queryClient, router } from '@/app/router';
import { ThemeProvider } from '@repo/ui/components/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

const AppProvider = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="riadom-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export { AppProvider };
