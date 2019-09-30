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
import * as storageKeys from "../../store/storage/StorageKeys";

class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem(
            storageKeys.KEY_USER_TOKEN
        );

        const that = this;
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        setTimeout(function() {
            that.props.navigation.navigate(userToken ? "Main" : "Auth");
        }, 0);
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

export default AuthLoadingScreen;
