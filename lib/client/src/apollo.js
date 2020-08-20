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

const link = createUploadLink({ uri: getURI() });

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
