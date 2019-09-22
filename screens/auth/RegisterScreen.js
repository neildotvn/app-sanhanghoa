import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

export default function(props) {
    return (
        <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
});
