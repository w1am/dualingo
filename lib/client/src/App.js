import React, { useState } from 'react';
import Routes from './routes';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import { Styles } from './styles';
import Alert from './components/messages/Alert';
import Sidebar from './containers/navigations/Sidebar';
import ResponsiveSearch from './containers/search/ResponsiveSearch';

import TopNav from './containers/navigations/TopNav';
import Footer from './containers/navigations/Footer';

const { Common } = Styles;

const App = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ toggleSearch, setToggleSearch ] = useState(false);

  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <TopNav toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} isOpen={isOpen} setIsOpen={setIsOpen} />
        {
          toggleSearch && (
            <ResponsiveSearch setToggleSearch={setToggleSearch} />
          )
        }
        <Alert />
        <Common.Wrappers.Page>
          <Routes />
        </Common.Wrappers.Page>
        <Footer />
      </HashRouter>
    </ApolloProvider>
  )
}

export default App;
