import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ApolloClientProvider from './Providers/ApolloClient.tsx';
import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './Libs/i18n';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloClientProvider>
            <BrowserRouter>
                <App />
                <ToastContainer/>
            </BrowserRouter>
        </ApolloClientProvider>

    </React.StrictMode>,
);
