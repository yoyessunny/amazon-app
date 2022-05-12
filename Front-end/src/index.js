import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './rootReducer';
import './index.css';

const store = createStore(rootReducer);

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <Provider store={store}>
        <App />
    </Provider>);