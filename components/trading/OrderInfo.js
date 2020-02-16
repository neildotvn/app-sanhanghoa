import React from "react";
import { StyleSheet, View } from "react-native";
import Touchable from '../common/Touchable';
import { RegularText, MediumText, BoldText } from "../common/StyledText";
import Colors from "../../constants/Colors";
import { orderTypes } from "../../constants/Strings";

export default function(props) {
    let typeStyle;
    if (props.order.order_type === 0 || props.order.order_type === 2 || props.order.order_type === 4) {
        typeStyle = styles.buyText;
    } else {
        typeStyle = styles.sellText;
    }

    let value;
    let valueStyle = [];
    const isBuy = props.order.order_type % 2 === 0;
    console.log(props.order);
    if (props.order.order_status === 1) {
        value = "Đợi khớp";
        valueStyle = [styles.textValue];
    } else {
        value = props.order.value; //.toFixed(2);
    }
    if (isBuy) {
        valueStyle.push(styles.buyText);
    } else {
        valueStyle.push(styles.sellText);
    }

    return (
        <Touchable onPress={props.onPress ? () => props.onPress(props.order) : null}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <BoldText style={styles.title}>{props.order.productName}</BoldText>
                    <RegularText style={styles.date}>{props.order.createdAt}</RegularText>
                </View>
                <View style={styles.infoContainer}>
                    <View>
                        <View style={styles.exchangeContainer}>
                            <BoldText style={styles.exchange}>{props.order.exchange}</BoldText>
                            <MediumText style={[styles.typeAndLot, typeStyle]}>
                                {orderTypes[props.order.order_type]} {props.order.volume.toFixed(1)}
                            </MediumText>
                        </View>
                        <RegularText style={styles.range}>
                            {props.order.placing_price} ->{" "}
                            {props.order.currentPrice ? props.order.currentPrice : props.order.closing_price}
                        </RegularText>
                    </View>
                    <View style={styles.valueContainer}>
                        <BoldText style={valueStyle}>{value}</BoldText>
                    </View>
                </View>
            </View>
        </Touchable>
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
    textValue: { fontSize: 14 },
    buyText: { color: Colors.midBlue },
    sellText: { color: Colors.sell }
});
