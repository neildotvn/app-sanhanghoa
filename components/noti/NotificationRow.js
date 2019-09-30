import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
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
                <MediumText>
                    Tham gia thị trường hàng hoá triệu người tin
                </MediumText>
                <LightText>Được hàng triệu người tin tưởng </LightText>
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
    }
});
