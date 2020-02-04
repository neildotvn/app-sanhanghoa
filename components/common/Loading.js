import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { MediumText } from "./StyledText";
import Colors from "../../constants/Colors";

export default function(props) {
    const textViews = props.text
        ? props.text.split("{{br}}").map(text => (
              <MediumText key={text} style={styles.text}>
                  {text}
              </MediumText>
          ))
        : [
              <MediumText key={0} style={styles.text}>
                  Đang tải dữ liệu
              </MediumText>,
              <MediumText key={1} style={styles.text}>
                  Bạn chờ chút nhé!
              </MediumText>
          ];
    return (
        <View style={[styles.container, props.style]}>
            <ActivityIndicator style={styles.spinner} size="large" color={Colors.midBlue} />
            {textViews}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    spinner: {
        marginBottom: 12
    },
    text: {
        color: Colors.midBlue,
        textAlign: 'center'
    }
});