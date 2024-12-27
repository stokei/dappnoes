export const routes = {
  home: '/',
  auth: {
    login: (data?: { redirectTo?: string }) => `/login${data?.redirectTo ? `?redirectTo=${data?.redirectTo}` : ''}`,
  },
  dashboard: {
    home: '/games',
    games: '/games',
    game: ({ game }: { game: string }) => ({
      home: `/games/${game}`,
    }),
  }
};
