import React from "react";
import { Platform, StatusBar, StyleSheet, View, ScrollView, TouchableWithoutFeedback, Text, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import TopTabButton from "./TopTabButton";
import Strings from "../constants/Strings";
import Colors from "../constants/Colors";
import { MediumText } from "./common/StyledText";

class TopTabBar extends React.Component {
    onTopButtonPress = position => {
        this.props.onTabChanged(position);
    };

    render() {
        const tabButtons = this.props.tabButtons.map((button, position) => (
            <TopTabButton
                buttonStyle={this.props.buttonStyle}
                key={button.title}
                {...button}
                onPress={this.onTopButtonPress}
                position={position}
            />
        ));

        // return <View style={styles.container}>{tabButtons}</View>;
        return (
            <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                {tabButtons}
            </ScrollView>
        );
    }
}

export default TopTabBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: Colors.grey,
        height: 27,
        zIndex: 200
    }
});
