// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// auth 0 
import { Auth0ProviderWithHistory  } from 'Auth0/Auth0ProviderWithHistory';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
        <ReduxProvider store={store}>
            <BrowserRouter basename="/">
                <Auth0ProviderWithHistory>
                    <App />
                </Auth0ProviderWithHistory>
            </BrowserRouter>
        </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/*<StrictMode>
        <ReduxProvider store={store}>
            <BrowserRouter basename="/">
                <Auth0ProviderWithHistory>
                    <App />
                </Auth0ProviderWithHistory>
            </BrowserRouter>
        </ReduxProvider>
    </StrictMode> */
reportWebVitals();
