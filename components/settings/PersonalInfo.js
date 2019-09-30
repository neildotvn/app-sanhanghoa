import React from "react";
import { StyleSheet, View } from "react-native";
import { RegularText, MediumText } from "../common/StyledText";
import Colors from "../../constants/Colors";
import Strings from "app/constants/Strings";

export default function(props) {
    return (
        <View style={styles.container}>
            <RegularText style={styles.title}>{props.title}</RegularText>
            <View style={styles.line} />
            <MediumText style={styles.value}>{props.value}</MediumText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12
    },
    line: {
        flex: 1,
        height: 12,
        borderBottomColor: Colors.midBlueOpacity(0.3),
        marginStart: 12,
        marginEnd: 12,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 14,
        color: Colors.black3
    },
    value: {
        fontSize: 14,
        color: Colors.midBlue
    }
});
