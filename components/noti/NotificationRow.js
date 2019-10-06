import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MediumText, LightText } from "../common/StyledText";
import icNotiUnread from "../../assets/images/icons/ic-noti-unread.png";
import icNotiRead from "../../assets/images/icons/ic-noti-read.png";
import icArrow from "../../assets/images/icons/ic-arrow-forward.png";
import Colors from "../../constants/Colors";

export default function(props) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.iconMail}
                source={props.read ? icNotiRead : icNotiUnread}
            />
            <View style={styles.textContainer}>
                <MediumText
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={styles.title}
                >
                    {props.title}
                </MediumText>
                <LightText
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                    style={styles.description}
                >
                    {props.description}
                </LightText>
            </View>
            <Image style={styles.iconArrow} source={icArrow} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.midBlueOpacity(0.3)
    },
    textContainer: {
        flex: 1,
        paddingStart: 8,
        paddingEnd: 8
    },
    iconMail: {
        height: 30,
        width: 30
    },
    iconArrow: {
        width: 16,
        height: 16
    },
    title: {
        fontSize: 12
    },
    description: {
        fontSize: 10
    }
});
