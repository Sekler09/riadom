import { queryClient, router } from '@/app/router';
import { Toaster } from '@repo/ui/components/sonner';
import { ThemeProvider } from '@repo/ui/components/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

const AppProvider = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="riadom-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors closeButton position="top-center" />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export { AppProvider };
