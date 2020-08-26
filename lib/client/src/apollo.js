import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
// import withData from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';

const getURI = () => {
  if (process.env.NODE_ENV === 'production') {
     return `/graphql`
  } else {
    return `http://localhost:3000/graphql`
  }
}

const link = createUploadLink({ uri: getURI(), credentials: 'include' });

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
  credentials: 'include' 
});
