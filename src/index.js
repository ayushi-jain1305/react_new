import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware, compose , combineReducers } from 'redux';
import reducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import reducerOrder from './store/reducers/orderRed';
import reducerAuth from './store/reducers/authRed';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	bbRed :reducer,
	orderRed : reducerOrder,
	authRed : reducerAuth
})

const store = createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)) );

const newapp = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(newapp, document.getElementById('root'));
registerServiceWorker();
