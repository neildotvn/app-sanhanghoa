import React from "react";
import { StyleSheet, Platform, BackHandler, View, WebView } from "react-native";
import TopBar from "../../components/TopBar";
import Strings from "../../constants/Strings";
import Colors from "../../constants/Colors";

class NewsArticleScreen extends React.Component {
    // onBackPressed = () => this.props.navigation.pop();

    constructor(props) {
        super(props);
        this.WEBVIEW_REF = React.createRef();
    }

    state = {
        backButtonEnabled: true
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backHandler);
    }

    hardwareBackHandler = () => {
        console.log("Backpressed");
        return true;
    };

    backHandler = () => {
        if (this.state.backButtonEnabled) {
            this.WEBVIEW_REF.current.goBack();
            return true;
        } else {
            this.props.navigation.pop();
            return true;
        }
    };

    onNavigationStateChange = navState => {
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    render() {
        topBarAllowBackConfig = {
            title: Strings.HEADER_NEWS,
            leftButtonLabel: Strings.HEADER_BUTTON_BACK,
            leftImageSource: require("../../assets/images/icons/ic-back.png"),
            onLeftButtonPress: () => this.backHandler()
        };

        return (
            <View style={styles.container}>
                <TopBar {...topBarAllowBackConfig} />
                <WebView
                    ref={this.WEBVIEW_REF}
                    style={styles.flex}
                    source={{
                        uri: this.props.navigation.getParam("uri")
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.midBlue,
        flex: 1
    },
    webView: {}
});

export default NewsArticleScreen;
