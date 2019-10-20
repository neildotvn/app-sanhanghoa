import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import TopTabButton from "./TopTabButton";
import Strings from "../constants/Strings";
import Colors from "../constants/Colors";

class TopTabBar extends React.Component {
    state = {
        tabButtons: [
            // {
            //     title: Strings.TAB_FAVORITE,
            //     isActive: true
            // },
            {
                title: Strings.TAB_FUEL,
                isActive: true
            },
            {
                title: Strings.TAB_AGRICULTURE,
                isActive: false
            },
            {
                title: Strings.TAB_METAL,
                isActive: false
            },
            {
                title: Strings.TAB_ENERGY,
                isActive: false
            }
        ]
    };

    onTopButtonPress = position => {
        const cState = { ...this.state };
        for (let i = 0; i < cState.tabButtons.length; ++i) {
            cState.tabButtons[i].isActive = i === position;
        }
        this.setState(cState);
        this.props.onTabChanged(position);
    };

    render() {
        const tabButtons = this.state.tabButtons.map((button, position) => (
            <TopTabButton
                key={button.title}
                {...button}
                onPress={this.onTopButtonPress}
                position={position}
            />
        ));

        return <View style={styles.container}>{tabButtons}</View>;
    }
}

export default TopTabBar;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: Colors.grey,
        height: 27
    }
});
