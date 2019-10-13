import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { MediumText } from "../common/StyledText";
import Colors from "../../constants/Colors";

export default function(props) {
    return (
        <View style={[styles.container, props.style]}>
            <MediumText style={styles.sellPrice}>{props.sellPrice}</MediumText>
            <MediumText style={styles.buyPrice}>{props.buyPrice}</MediumText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 40,
        paddingEnd: 40,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    sellPrice: {
        fontSize: 24,
        color: Colors.decrease
    },
    buyPrice: {
        fontSize: 24,
        color: Colors.midBlue
    }
});
