import React from "react";
import {
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import TopBar from "../../components/TopBar";
import NotificationRow from "../../components/noti/NotificationRow";
import Strings from "../../constants/Strings";

export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <TopBar title={Strings.HEADER_NOTI} />
            <ScrollView style={styles.notiContainer}>
                <NotificationRow />
                <NotificationRow />
                <NotificationRow />
                <NotificationRow />
            </ScrollView>
        </View>
    );
}

NotificationScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        backgroundColor: "#fff"
    },
    notiContainer: {
        padding: 12
    }
});
