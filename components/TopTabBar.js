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
        tabButtons: {
            favorite: {
                title: Strings.TAB_FAVORITE,
                isActive: true
            },
            agri: {
                title: Strings.TAB_AGRICULTURE,
                isActive: false
            },
            metal: {
                title: Strings.TAB_METAL,
                isActive: false
            },
            fuel: {
                title: Strings.TAB_FUEL,
                isActive: false
            },
            energy: {
                title: Strings.TAB_ENERGY,
                isActive: false
            }
        }
    };

    onTopButtonPress = identifier => {
        const cState = { ...this.state };
        for (key in cState.tabButtons) {
            cState.tabButtons[key].isActive = key === identifier;
        }
        this.setState(cState);
    };

    render() {
        let tabButtons = [];
        for (key in this.state.tabButtons) {
            let button = this.state.tabButtons[key];
            console.log(key);
            tabButtons.push(
                <TopTabButton
                    key={key}
                    identifier={key}
                    {...button}
                    onPress={this.onTopButtonPress}
                />
            );
        }

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
