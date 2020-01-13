import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { connect } from "react-redux";
import MainTabNavigator from "./MainTabNavigator";
import MainStackNavigator from "./MainStackNavigator";
import AuthNavigator from "./AuthNavigator";
import IntroScreen from "../screens/intro/IntroScreen";
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";
import Spinner from "react-native-loading-spinner-overlay";
import NavigationService from "./NavigationService";

const AppContainer = createAppContainer(
    createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingScreen,
        Auth: AuthNavigator,
        Main: MainStackNavigator,
        Intro: IntroScreen
    })
);

class HigherAppContainer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Spinner visible={this.props.loading} />
                <AppContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { loading: state.loading.loading };
};

export default connect(mapStateToProps)(HigherAppContainer);
