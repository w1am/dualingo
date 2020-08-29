import React, { useState } from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
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
  const [ activate, setActivate ] = useState(false);
  const [ toggleSearch, setToggleSearch ] = useState(false);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Sidebar activate={activate} setActivate={setActivate} isOpen={isOpen} setIsOpen={setIsOpen}/>
        <TopNav activate={activate} setActivate={setActivate} toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} isOpen={isOpen} setIsOpen={setIsOpen} />
        {
          toggleSearch && (
            <ResponsiveSearch setToggleSearch={setToggleSearch} />
          )
        }
        <Alert />
        <div style={{ maxWidth: '1366px', margin: '0 auto' }}>
          <Routes />
        </div>
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
