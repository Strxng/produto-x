import { QueryCache, QueryClient } from "@tanstack/react-query";

const enum Intervals {
  short = 1 * 60 * 1000,
  medium = 3 * 60 * 1000,
  long = 5 * 60 * 1000,
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.log(error),
  }),
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: Intervals.long,
      staleTime: Intervals.long,
    },
    mutations: {
      retry: 2,
      onError: (error) => console.log(error),
    },
  },
});
