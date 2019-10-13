import React from "react";
import { StyleSheet, View } from "react-native";
import { RegularText, MediumText, BoldText } from "../common/StyledText";
import Colors from "../../constants/Colors";
import { orderTypes } from "../../constants/Strings";

export default function(props) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <BoldText style={styles.title}>Kho dau tuong</BoldText>
                <RegularText style={styles.date}>{props.createdAt}</RegularText>
            </View>
            <View style={styles.infoContainer}>
                <View>
                    <View style={styles.exchangeContainer}>
                        <BoldText style={styles.exchange}>
                            {props.exchange}
                        </BoldText>
                        <MediumText style={styles.typeAndLot}>
                            {orderTypes[props.orderType]} {props.volume}
                        </MediumText>
                    </View>
                    <RegularText style={styles.range}>
                        {props.placingPrice} -> 12376
                    </RegularText>
                </View>
                <View style={styles.valueContainer}>
                    <BoldText style={styles.value}>+930</BoldText>
                </View>
            </View>
        </View>
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
    typeAndLot: { fontSize: 14, color: Colors.sell, marginStart: 8 },
    valueContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    range: { fontSize: 14, color: Colors.black3 },
    value: { fontSize: 16, color: Colors.midBlue }
});
