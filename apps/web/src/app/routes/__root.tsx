import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

type RouterContext = {
  queryClient: QueryClient;
};

const RootLayout = () => {
  return <Outlet />;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

export type { RouterContext };
