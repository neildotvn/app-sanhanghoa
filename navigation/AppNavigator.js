import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { connect } from "react-redux";
import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";
import Spinner from "react-native-loading-spinner-overlay";

const AppContainer = createAppContainer(
    createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingScreen,
        Auth: AuthNavigator,
        Main: MainTabNavigator
    })
);

class HigherAppContainer extends React.Component {
    state = {
        loading: false
    };

    componentDidMount() {
        // this.setState({ loading: this.props.loading });
        // setInterval(() => {
        //     this.setState({
        //         spinner: !this.state.loading
        //     });
        // }, 3000);
    }

    render() {
        return (
            <React.Fragment>
                <Spinner visible={this.props.loading} />
                <AppContainer />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { loading: state.loading.loading };
};

export default connect(mapStateToProps)(HigherAppContainer);
