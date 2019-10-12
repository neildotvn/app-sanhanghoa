import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MediumText, RegularText } from "../common/StyledText";
import Colors from "../../constants/Colors";
import {
    TouchableNativeFeedback,
    TouchableWithoutFeedback
} from "react-native-gesture-handler";
import Strings from "../../constants/Strings";

export default function(props) {
    const placeOrderButton = (
        <TouchableNativeFeedback>
            <View style={styles.placeOrderButton}>
                <MediumText style={styles.placeOrderButtonText}>
                    {Strings.ORDER_PLACE_ORDER}
                </MediumText>
            </View>
        </TouchableNativeFeedback>
    );

    const byMarketButtons = (
        <View style={styles.byMarketButtons}>
            <TouchableWithoutFeedback>
                <View style={styles.byMarketButton}>
                    <MediumText
                        style={[styles.byMarketActionText, styles.sellText]}
                    >
                        {Strings.ORDER_SELL}
                    </MediumText>
                    {/* <RegularText style={[styles.byMarketText, styles.sellText]}>
                        {Strings.ORDER_BY_MARKET}
                    </RegularText> */}
                </View>
            </TouchableWithoutFeedback>
            {/* <View style={styles.divider} /> */}
            <TouchableWithoutFeedback>
                <View style={[styles.byMarketButton]}>
                    <MediumText
                        style={[styles.byMarketActionText, styles.buyText]}
                    >
                        {Strings.ORDER_BUY}
                    </MediumText>
                    {/* <RegularText style={[styles.byMarketText, styles.buyText]}>
                        {Strings.ORDER_BY_MARKET}
                    </RegularText> */}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );

    return byMarketButtons;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    placeOrderButton: {
        alignSelf: "stretch",
        height: 48,
        backgroundColor: Colors.grey,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    placeOrderButtonText: {
        fontSize: 14,
        color: Colors.midBlue
    },
    byMarketButtons: {
        flex: 1,
        flexDirection: "row",
        height: 48,
        backgroundColor: Colors.grey
    },
    byMarketButton: {
        flex: 1,
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        width: 2,
        backgroundColor: "white"
    },
    byMarketActionText: {
        fontSize: 14
    },
    byMarketText: {
        fontSize: 10
    },
    sellText: {
        color: Colors.decrease
    },
    buyText: {
        color: Colors.midBlue
    }
});
