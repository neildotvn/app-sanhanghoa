import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Image,
    View,
    Text
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { MonoText } from "./StyledText";
import CustomImageButton from "./TouchableImageButton";
import Colors from "../constants/Colors";

export default function(props) {
    return (
        <View style={styles.container}>
            <CustomImageButton
                label={props.leftButtonLabel}
                imageSource={props.leftImageSource} //
                onPress={props.onPress}
            />
            <MonoText style={styles.title}>{props.title}</MonoText>
            <CustomImageButton
                label={props.rightButtonLabel}
                imageSource={props.rightImageSource}
                onPress={props.onPress}
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
