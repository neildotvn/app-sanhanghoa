import React from "react";
import { View, StyleSheet } from "react-native";
import { RegularText } from "../common/StyledText";
import Colors from "app/constants/Colors";
import Strings from "app/constants/Strings";

export default function(props) {
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: props.isIncrease
                        ? Colors.increase
                        : Colors.decrease
                }
            ]}
        >
            <RegularText style={styles.text}>
                {props.isIncrease ? "+" : "-"}
                {props.value}
            </RegularText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 24,
        width: 48,
        borderRadius: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 12,
        color: "white"
    }
});
