import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';

export const API_URL = "https://localhost:8080"

export const API_ROUTES = {
  review: (passkey: string) => `${API_URL}/review/out/${passkey}`,
  reviewDisplay: (id: string) => `${API_URL}/review/review_display/${id}`,
};

export const idukkiClient = new ApolloClient({
  link: from([
    createHttpLink({
      uri: API_URL + '/graphql',
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache(),
});