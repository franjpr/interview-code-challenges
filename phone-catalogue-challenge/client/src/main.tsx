import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { SwitchRoutes } from './core';
import { PhoneCatalogueScene } from './scenes';
import { rootCss, bodyCss } from './masterStyles';
import { createStore, combineReducers } from 'redux';
import { State } from './app.state';
import { phoneCatalogueReducer } from './pods/phone-catalogue/store/phone-catalogue.reducer';
import { Provider } from 'react-redux';

// reset styles
let body = document.getElementsByTagName('body')[0];
let root = document.getElementById('root');

Object.assign(body.style, bodyCss);
Object.assign(root.style, rootCss);

const reducers = combineReducers<State>({
    phonesCatalogueState: phoneCatalogueReducer
});

const store = createStore(
    reducers,
    window["__REDUX_DEVTOOLS_EXTENSION__"] &&
    window["__REDUX_DEVTOOLS_EXTENSION__"]()
);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact={true} path={SwitchRoutes.root} component={PhoneCatalogueScene}></Route>
                {/* <Route exact={true} path={SwitchRoutes.phoneDetails} component={UserProfileScene}></Route> */}
            </Switch>
        </HashRouter>
    </Provider>
    , root);
