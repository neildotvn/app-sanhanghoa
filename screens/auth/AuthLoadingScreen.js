import React from "react";
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Platform
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../store/actions/Auth";
import * as storageKeys from "../../store/storage/StorageKeys";

class AuthLoadingScreen extends React.Component {
    componentDidUpdate() {
        if (this.props.user.user_uid) {
            this.props.navigation.navigate("Main");
        }
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem(
            storageKeys.KEY_USER_TOKEN
        );
        userToken
            ? this.props.verifyMe()
            : this.props.navigation.navigate("Auth");
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar style={styles.statusBar} barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    statusBar: {
        height: 100,
        width: 100
    }
});

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        verifyMe: () => dispatch(actions.verify())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthLoadingScreen);
