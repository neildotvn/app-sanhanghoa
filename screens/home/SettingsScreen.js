import React from "react";
import { Platform, StatusBar, StyleSheet, View, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import TopBar from "../../components/TopBar";
import PersonalInfo from "../../components/settings/PersonalInfo";
import Strings from "../../constants/Strings";
import imAvatar from "../../assets/images/images/im-default-avatar.png";
import icArrow from "../../assets/images/icons/ic-arrow-forward.png";
import { BoldText, RegularText } from "../../components/common/StyledText";

export default function NotificationScreen(props) {
    return (
        <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <TopBar title={Strings.HEADER_SETTINGS} />
            <View style={styles.infoContainer}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={imAvatar} />
                    <View style={styles.nameContainer}>
                        <BoldText style={styles.name}>Nguyen Ca Phe</BoldText>
                        <View style={styles.editContainer}>
                            <RegularText style={styles.edit}>
                                Chinh sua thong tin
                            </RegularText>
                            <Image style={styles.icArrow} source={icArrow} />
                        </View>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <PersonalInfo title={"Ho ten"} value={"Nguyen Ca Phe"} />
                    <PersonalInfo title={"Ho ten"} value={"Nguyen Ca Phe"} />
                    <PersonalInfo title={"Ho ten"} value={"Nguyen Ca Phe"} />
                    <PersonalInfo title={"Ho ten"} value={"Nguyen Ca Phe"} />
                </View>
            </View>
        </View>
    );
}

NotificationScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    infoContainer: {
        padding: 16
    },
    avatarContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    nameContainer: {
        marginStart: 16
    },
    avatar: {
        height: 80,
        width: 80
    },
    name: {
        fontSize: 16
    },
    editContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 2
    },
    edit: {
        fontSize: 14
    },
    icArrow: {
        height: 12,
        width: 12,
        marginTop: 2
    },
    detailsContainer: {
        marginTop: 30
    }
});
