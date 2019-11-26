import React from "react";
import { StyleSheet, WebView, Platform, StatusBar, View, BackHandler } from "react-native";
import TopBar from "../../components/TopBar";
import Strings from "app/constants/Strings";

export default class NewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.WEBVIEW_REF = React.createRef();
    }

    state = {};

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backHandler);
    }

    backHandler = () => {
        if (this.state.backButtonEnabled) {
            this.WEBVIEW_REF.current.goBack();
            return true;
        }
    };

    onNavigationStateChange = navState => {
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    render() {
        console.log(`this.state.backButtonEnabled = ${this.state.backButtonEnabled}`);
        topBarAllowBackConfig = this.state.backButtonEnabled
            ? {
                  leftButtonLabel: Strings.HEADER_BUTTON_BACK,
                  leftImageSource: require("../../assets/images/icons/ic-back.png"),
                  onLeftButtonPress: () => this.backHandler()
              }
            : null;

        return (
            <View style={styles.container}>
                <TopBar title={Strings.HEADER_NEWS} {...topBarAllowBackConfig} />
                <WebView
                    ref={this.WEBVIEW_REF}
                    style={styles.flex}
                    source={{
                        uri: "https://sanhanghoa24h.com/chuyen-muc/tin-tuc-thi-truong/"
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                />
            </View>
        );
    }
}

NewsScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1
        // marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    webview: {
        flex: 1
    }
});
