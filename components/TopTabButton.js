import React, { Fragment } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RegularText, LightText } from "./common/StyledText";
import Colors from "../constants/Colors";
import {
    TouchableHighlight,
    TouchableWithoutFeedback
} from "react-native-gesture-handler";

export default function(props) {
    return (
        <View
            style={[
                styles.container,
                props.isActive ? styles.active : styles.inActive
            ]}
        >
            <TouchableWithoutFeedback
                onPress={() => props.onPress(props.identifier)}
            >
                <RegularText
                    style={[
                        styles.text,
                        {
                            color: props.isActive
                                ? Colors.midBlue
                                : Colors.black3
                        }
                    ]}
                >
                    {props.title}
                </RegularText>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        borderBottomWidth: 2,
        height: 27
    },
    inActive: {
        borderBottomColor: "white"
    },
    active: {
        borderBottomColor: Colors.midBlue
    },
    text: {
        fontSize: 12,
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: "center"
    }
});
