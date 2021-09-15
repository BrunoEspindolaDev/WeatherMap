// Packages
import React, {FC} from 'react';
import {Provider} from 'context/app';
import dotenv from 'dotenv';

// UI
import {ChakraProvider, CSSReset} from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import theme from 'styles/theme';

// Fonts
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

// Pages
import Home from 'pages/Home';
dotenv.config();
dotenv.config();

// Component
const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Provider>
        <Home />
      </Provider>
    </ChakraProvider>
  );
};

export default App;
