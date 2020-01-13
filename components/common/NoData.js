import React from "react";
import { View, StyleSheet } from "react-native";
import { MediumText } from "./StyledText";
import Colors from "../../constants/Colors";

export default function(props) {
    const textViews = props.text ? (
        props.text.split("{{br}}").map(text => (
            <MediumText key={text} style={styles.text}>
                {text}
            </MediumText>
        ))
    ) : (
        <MediumText style={styles.text}>Mất kết nối</MediumText>
    );
    return <View style={styles.container}>{textViews}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    spinner: {
        marginBottom: 12
    },
    text: {
        color: Colors.midBlue
    }
});
