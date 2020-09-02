import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// screens
import ScreenPertama from './src/screens/screenPertama';
import ScreenKedua from './src/screens/screenKedua';

// navigator
import {setNavigator} from './navigationRef';

// assets

// redux
import {reducer as formReducer} from 'redux-form';
import allReducer from './src/store/reducer';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

// library

const rootReducer = combineReducers({
  form: formReducer,
  allReducer: allReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const mainFlow = createStackNavigator(
  {
    ScreenPertama: {
      screen: ScreenPertama,
      navigationOptions: {
        headerShown: false,
      },
    },
    ScreenKedua: {
      screen: ScreenKedua,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ScreenPertama',
  },
);

const switchNavigator = createSwitchNavigator(
  {
    // ResolveAuth: ResolveAuthScreen,
    // loginFlow: newUserFlow,

    mainFlow: {
      screen: mainFlow,
    },
  },
  {
    initialRouteName: 'mainFlow',
  },
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <Provider store={store}>
      <App
        // uriPrefix={prefix}
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
};
