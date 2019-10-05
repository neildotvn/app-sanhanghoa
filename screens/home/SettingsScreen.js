import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Button,
    AsyncStorage
} from "react-native";
import TopBar from "../../components/TopBar";
import PersonalInfo from "../../components/settings/PersonalInfo";
import Strings from "../../constants/Strings";
import imAvatar from "../../assets/images/images/im-default-avatar.png";
import Toast from "react-native-simple-toast";
import icArrow from "../../assets/images/icons/ic-arrow-forward.png";
import { BoldText, RegularText } from "../../components/common/StyledText";
import * as StorageKeys from "../../store/storage/StorageKeys";

export default class NotificationScreen extends React.Component {
    logout = () => {
        AsyncStorage.removeItem(StorageKeys.KEY_USER_TOKEN)
            .then(() => {
                this.props.navigation.navigate("AuthLoading");
            })
            .catch(err => {
                console.log(err);
                Toast.show(Strings.AUTH_LOGOUT_FAIL);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <TopBar title={Strings.HEADER_SETTINGS} />
                <View style={styles.infoContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={imAvatar} />
                        <View style={styles.nameContainer}>
                            <BoldText style={styles.name}>
                                Nguyen Ca Phe
                            </BoldText>
                            <View style={styles.editContainer}>
                                <RegularText style={styles.edit}>
                                    Chinh sua thong tin
                                </RegularText>
                                <Image
                                    style={styles.icArrow}
                                    source={icArrow}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <PersonalInfo
                            title={"Ho ten"}
                            value={"Nguyen Ca Phe"}
                        />
                        <PersonalInfo
                            title={"Ho ten"}
                            value={"Nguyen Ca Phe"}
                        />
                        <PersonalInfo
                            title={"Ho ten"}
                            value={"Nguyen Ca Phe"}
                        />
                        <PersonalInfo
                            title={"Ho ten"}
                            value={"Nguyen Ca Phe"}
                        />
                        <Button
                            style={{ marginTop: 20 }}
                            onPress={() => this.logout()}
                            title="Logout"
                        />
                    </View>
                </View>
            </View>
        );
    }
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
