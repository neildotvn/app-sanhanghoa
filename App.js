import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Ionicons } from "@expo/vector-icons";
import authReducer from "./store/reducers/AuthReducer";

import AppNavigator from "./navigation/AppNavigator";
import loadingReducer from "./store/reducers/LoadingReducer";
import accountReduer from "./store/reducers/AccountReducer";
import notificationReducer from "./store/reducers/NotificationReducer";
import orderReducer from "./store/reducers/OrderReducer";
import pricesReducer from "./store/reducers/PriceReducer";
import alarmReducer from "./store/reducers/AlarmReducer";

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    const store = createStore(
        combineReducers({
            auth: authReducer,
            accountStore: accountReduer,
            loading: loadingReducer,
            notiStore: notificationReducer,
            orderStore: orderReducer,
            pricesStore: pricesReducer,
            alarmStore: alarmReducer
        }),
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                    <AppNavigator />
                </View>
            </Provider>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([require("./assets/images/robot-dev.png"), require("./assets/images/robot-prod.png")]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            regular: require("./assets/fonts/Roboto-Regular.ttf"),
            medium: require("./assets/fonts/Roboto-Medium.ttf"),
            light: require("./assets/fonts/Roboto-Light.ttf"),
            bold: require("./assets/fonts/Roboto-Bold.ttf")
        })
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
