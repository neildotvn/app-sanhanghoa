import React from "react";
import { StyleSheet, WebView, Platform, StatusBar, View, BackHandler } from "react-native";
import NewsPageScreen from "../news/NewsPageScreen";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";
import Strings from "../../constants/Strings";
import Axios from "axios";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default class NewsScreen extends React.Component {
    state = {
        tabButtons: [
            {
                title: "Tin tức",
                isActive: true,
                categories: 13
            },
            {
                title: "Thông báo",
                isActive: false,
                categories: 312
            },
            {
                title: "Cà phê",
                isActive: false,
                categories: 17
            },
            {
                title: "Nông sản",
                isActive: false,
                categories: 21
            },
            {
                title: "Nhiên liệu",
                isActive: false,
                categories: 20
            },
            {
                title: "Kim loại",
                isActive: false,
                categories: 18
            },
            {
                title: "Năng lượng",
                isActive: false,
                categories: 19
            }
        ],
        activePosition: 0
    };

    onNavigationStateChange = navState => {
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    onTabChanged = position => {
        const cState = { ...this.state };
        for (let i = 0; i < cState.tabButtons.length; ++i) {
            cState.tabButtons[i].isActive = i === position;
        }
        cState.activePosition = position;
        this.setState(cState);
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar title={Strings.HEADER_NEWS} />
                <View style={{height: 28}}>
                <TopTabBar onTabChanged={this.onTabChanged} tabButtons={this.state.tabButtons} buttonStyle={{paddingStart: 12, paddingEnd: 12}} />
                </View>
                {this.state.tabButtons.map((tab, index) => {
                    return index === this.state.activePosition ? (
                        <NewsPageScreen key={index} tab={tab} />
                    ) : null;
                })}
            </View>
        );
    }
}

NewsScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingBottom: 49
        // marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    webview: {
        flex: 1
    },
    gone: {
        opacity: 0
    }
});
