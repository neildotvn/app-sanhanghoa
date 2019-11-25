import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { MediumText } from "../common/StyledText";
import Colors from "../../constants/Colors";

export default function(props) {
    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.priceContainer}>
                <MediumText>Giá bán</MediumText>
                <MediumText style={styles.sellPrice}>{props.sellPrice}</MediumText>
            </View>
            <View style={styles.priceContainer}>
                <MediumText>Giá mua</MediumText>
                <MediumText style={styles.buyPrice}>{props.buyPrice}</MediumText>
            </View>
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
    priceContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    sellPrice: {
        fontSize: 24,
        color: Colors.decrease,
        marginTop: 4
    },
    buyPrice: {
        fontSize: 24,
        color: Colors.midBlue,
        marginTop: 4
    }
});
