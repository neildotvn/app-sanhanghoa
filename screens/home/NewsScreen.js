import React from "react";
import { StyleSheet, WebView, Platform, StatusBar, View, BackHandler } from "react-native";
import NewsPageScreen from "../news/NewsPageScreen";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";
import Strings from "../../constants/Strings";
import Axios from "axios";

export default class NewsScreen extends React.Component {
    state = {
        tabButtons: [
            {
                title: "Cà phê",
                isActive: true,
                categories: 17
            },
            {
                title: "Kim loại",
                isActive: false,
                categories: 18
            },
            {
                title: "Nhiên liệu",
                isActive: false,
                categories: 20
            },
            {
                title: "Năng lượng",
                isActive: false,
                categories: 19
            },
            {
                title: "Nông sản",
                isActive: false,
                categories: 21
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
                <TopTabBar onTabChanged={this.onTabChanged} tabButtons={this.state.tabButtons} />
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
        flex: 1,
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
