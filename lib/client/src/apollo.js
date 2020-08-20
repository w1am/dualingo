import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const getURI = () => {
  if (process.env.NODE_ENV === 'production') {
     return `/graphql`
  } else {
    return `http://localhost:3000/graphql`
  }
}

const customFetch = (uri, options) => {
  return fetch(uri, options)
    .then(response => {
      if (response.status >= 500) {
        return Promise.reject(response.status);
      }
      return response;
    });
};

const link = createUploadLink({ uri: getURI(), fetch: customFetch });

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
