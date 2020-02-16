import React from "react";
import { StyleSheet, Platform, SafeAreaView, View, WebView } from "react-native";
import TopBar from "../../components/TopBar";
import Strings from "../../constants/Strings";
import Colors from "../../constants/Colors";
import Loading from "../../components/common/Loading";

class NewsArticleScreen extends React.Component {
    // onBackPressed = () => this.props.navigation.pop();

    constructor(props) {
        super(props);
        this.WEBVIEW_REF = React.createRef();
    }

    state = {
        backButtonEnabled: true,
        loading: true,
        loadingCount: 0
    };

    componentDidMount() {
        // BackHandler.addEventListener("hardwareBackPress", this.backHandler);
        this._mounted = true;
        setTimeout(() => {
            if (this._mounted) this.setState({ loading: false });
        }, 2000);
        console.log("componentDidMount");
    }

    componentDidUpdate() {
        if (!this.state.loading) {
            setTimeout(() => {
                if (this._mounted) this.setState({ loading: false });
            }, 2000);
        }
        console.log("componentDidUpdate");
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener("hardwareBackPress", this.backHandler);
        this._mounted = false;
    }

    hardwareBackHandler = () => {
        console.log("Backpressed");
        return true;
    };

    backHandler = () => {
        this.props.navigation.pop();
        // if (this.state.backButtonEnabled) {
        //     this.WEBVIEW_REF.current.goBack();
        //     return true;
        // } else {
        //     this.props.navigation.pop();
        //     return true;
        // }
    };

    onNavigationStateChange = navState => {
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    onShouldStartLoadWithRequestAndroid = navigator => {
        console.log(navigator.url);
        if (navigator.url.indexOf(this.props.navigation.getParam("uri")) !== -1) {
            if (this.state.loadingCount !== 0) {
                this.setState({
                    loading: true,
                    loadingCount: this.state.loadingCount + 1
                });
                return true;
            } else {
                return false;
            }
        } else {
            console.log("STOP LOADING");
            this.WEBVIEW_REF.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            return false;
        }
    };

    onShouldStartLoadWithRequestIos = ({ url }) => {
        console.log(navigator.url);
        return url === this.props.navigation.getParam("uri");
    };

    render() {
        topBarAllowBackConfig = {
            title: Strings.HEADER_NEWS,
            leftButtonLabel: Strings.HEADER_BUTTON_BACK,
            leftImageSource: require("../../assets/images/icons/ic-back.png"),
            onLeftButtonPress: () => this.backHandler()
        };

        return (
            // <SafeAreaView style={styles.container}>
            //     <TopBar {...topBarAllowBackConfig} />
            //     {/* <View style={styles.webViewContainer}> */}
            //     <WebView
            //         ref={this.WEBVIEW_REF}
            //         useWebKit={true}
            //         javaScriptEnabled={true}
            //         domStorageEnabled={true}
            //         injectedJavaScript={injectedJs}
            //         source={{ uri: this.props.navigation.getParam("uri") }}
            //         style={styles.webView}
            //         startInLoadingState={true}
            //         onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
            //         onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
            //     />
            //     {this.state.loading ? <Loading style={styles.loading} text="Đang tải bài viết" /> : null}
            //     {/* </View> */}
            // </SafeAreaView>
            <SafeAreaView style={styles.container}>
                <TopBar {...topBarAllowBackConfig} />
                <WebView
                    ref={this.WEBVIEW_REF}
                    javaScriptEnabled={true}
                    injectedJavaScript={injectedJs}
                    startInLoadingState={true}
                    useWebKit={true}
                    style={styles.webView}
                    source={{ uri: this.props.navigation.getParam("uri") }}
                    style={{ marginTop: 20 }}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequestIos} //for iOS
                    onNavigationStateChange={this.onShouldStartLoadWithRequestAndroid} //for Android
                />
            </SafeAreaView>
        );
    }
}

const injectedJs = `
    const f = () => {
        const article = document.querySelector("article");
        document.querySelectorAll("* :not(article)").forEach(e => {
            if (!e.querySelector("article") 
                && !article.contains(e)
            ) {
                e.classList.add("hidden");
            }
        });
        article.querySelector("nav").classList.add("hidden");
    }
    f();
    setInterval(function() {
        f();
    }, 2000)
`;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webView: {
        flex: 1
    },
    webViewContainer: {
        flex: 1,
        position: "relative"
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: "#fff"
    }
});

export default NewsArticleScreen;
