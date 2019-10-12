import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Image,
    View,
    Text
} from "react-native";
import { RegularText, MediumText } from "./common/StyledText";
import CustomImageButton from "./TouchableImageButton";
import Colors from "../constants/Colors";

export default function(props) {
    return (
        <View style={styles.container}>
            <CustomImageButton
                label={props.leftButtonLabel}
                imageSource={props.leftImageSource}
                onPress={props.onLeftButtonPress}
            />
            <MediumText style={styles.title}>{props.title}</MediumText>
            <CustomImageButton
                label={props.rightButtonLabel}
                imageSource={props.rightImageSource}
                onPress={props.onRightButtonPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        alignItems: "center",
        height: 48,
        paddingStart: 8,
        paddingEnd: 8,
        backgroundColor: Colors.grey,
        marginBottom: 1
    },
    title: {
        color: Colors.black3,
        fontSize: 14,
        textTransform: "uppercase"
    }
});
