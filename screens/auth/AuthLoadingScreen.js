import React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Loading from '../../components/common/Loading';
import * as actions from "../../store/actions/Auth";
import * as storageKeys from "../../store/storage/StorageKeys";

class AuthLoadingScreen extends React.Component {
    state = {
        isFirstTime: "true"
    };

    componentDidUpdate() {
        console.log(`Day co phai la lan dung app dau tien cua ban k? ${this.state.isFirstTime}`);
        if (this.props.auth.error) {
            this.props.navigation.navigate("Auth");
        } else if (this.props.user.user_uid) {
            if (this.state.isFirstTime === "true" || this.state.isFirstTime === null) {
                console.log("Go to Intro");
                AsyncStorage.setItem(storageKeys.KEY_FIRST_OPEN_APP, "false", () => {});
                this.props.navigation.navigate("Intro");
            } else {
                console.log("Go to main");
                this.props.navigation.navigate("Main");
                // AsyncStorage.setItem(storageKeys.KEY_FIRST_OPEN_APP, "true", () => {});
            }
        }
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem(storageKeys.KEY_USER_TOKEN);
        const isFirstTime = await AsyncStorage.getItem(storageKeys.KEY_FIRST_OPEN_APP);
        this.setState({ isFirstTime }, () => {
            userToken ? this.props.verifyMe() : this.props.navigation.navigate("Auth");
        });
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Loading text="" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
    // statusBar: {
    //     height: 100,
    //     width: 100
    // }
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        verifyMe: () => dispatch(actions.verify())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
