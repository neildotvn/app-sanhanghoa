import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { RegularText, MediumText, BoldText } from "../common/StyledText";
import Colors from "../../constants/Colors";
import { orderTypes } from "../../constants/Strings";

export default function(props) {
    let typeStyle;
    if (
        props.order.type === 0 ||
        props.order.type === 2 ||
        props.order.type === 4
    ) {
        typeStyle = styles.buyText;
    } else {
        typeStyle = styles.sellText;
    }

    return (
        <TouchableNativeFeedback
            onPress={props.onPress ? () => props.onPress(props.order) : null}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <BoldText style={styles.title}>
                        {props.order.productName}
                    </BoldText>
                    <RegularText style={styles.date}>
                        {props.order.createdAt}
                    </RegularText>
                </View>
                <View style={styles.infoContainer}>
                    <View>
                        <View style={styles.exchangeContainer}>
                            <BoldText style={styles.exchange}>
                                {props.order.exchange}
                            </BoldText>
                            <MediumText style={[styles.typeAndLot, typeStyle]}>
                                {orderTypes[props.order.order_type]}{" "}
                                {props.order.volume.toFixed(1)}
                            </MediumText>
                        </View>
                        <RegularText style={styles.range}>
                            {props.order.placing_price} ->{" "}
                            {props.order.currentPrice
                                ? props.order.currentPrice
                                : props.order.closing_price}
                        </RegularText>
                    </View>
                    <View style={styles.valueContainer}>
                        <BoldText style={styles.value}>
                            {props.order.currentPrice ? "open" : "close"}
                        </BoldText>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 4,
        paddingTop: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightGrey
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    date: {
        fontSize: 12,
        color: "#8c8c8c"
    },
    exchangeContainer: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    title: { fontSize: 14 },
    exchange: { fontSize: 14, textTransform: "uppercase" },
    typeAndLot: { fontSize: 14, marginStart: 8 },
    valueContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    range: { fontSize: 14, color: Colors.black3 },
    value: { fontSize: 16, color: Colors.midBlue },
    buyText: { color: Colors.midBlue },
    sellText: { color: Colors.sell }
});
