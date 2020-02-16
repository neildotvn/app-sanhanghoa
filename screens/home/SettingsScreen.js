import React from "react";
import { Platform, StatusBar, StyleSheet, View, Image, Button, AsyncStorage, SafeAreaView } from "react-native";
import TopBar from "../../components/TopBar";
import PersonalInfo from "../../components/settings/PersonalInfo";
import Strings from "../../constants/Strings";
import imAvatar from "../../assets/images/images/im-default-avatar.png";
import Toast from "react-native-easy-toast";
import icArrow from "../../assets/images/icons/ic-arrow-forward.png";
import { BoldText, RegularText } from "../../components/common/StyledText";
import * as StorageKeys from "../../store/storage/StorageKeys";
import { connect } from "react-redux";
import Touchable from '../../components/common/Touchable';
import Colors from "../../constants/Colors";

class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
    }

    openContactScreen = () => {
        this.props.navigation.navigate("Contact");
    };

    openEditProfile = () => {
        this.props.navigation.navigate("EditProfile");
    };

    logout = () => {
        AsyncStorage.removeItem(StorageKeys.KEY_USER_TOKEN)
            .then(() => {
                this.props.navigation.navigate("AuthLoading");
            })
            .catch(err => {
                console.log(err);
                this.toast.current.show(Strings.AUTH_LOGOUT_FAIL);
            });
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <TopBar title={Strings.HEADER_SETTINGS} />
                <View style={styles.infoContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={imAvatar} />
                        <Touchable onPress={() => this.openEditProfile()}>
                            <View style={styles.nameContainer}>
                                <BoldText style={styles.name}>{this.props.user.full_name}</BoldText>
                                <View style={styles.editContainer}>
                                    <RegularText style={styles.edit}>{Strings.SETTINGS_EDIT_PROFILE}</RegularText>
                                    <Image style={styles.icArrow} source={icArrow} />
                                </View>
                            </View>
                        </Touchable>
                    </View>
                    <View style={styles.detailsContainer}>
                        <PersonalInfo title={Strings.SETTINGS_PHONE} value={this.props.user.phone} />
                        <PersonalInfo
                            title={Strings.SETTINGS_NAME ? Strings.SETTINGS_NAME : Strings.SETTINGS_NOT_YET_UPDATED}
                            value={this.props.user.full_name}
                        />
                        <PersonalInfo title={Strings.SETTINGS_EMAIL} value={this.props.user.email} />
                        <PersonalInfo title={Strings.SETTINGS_SEX} value={processGender(this.props.user.gender)} />
                        <PersonalInfo
                            title={Strings.SETTINGS_ADDRESS}
                            value={processAddress(this.props.user.address)}
                        />
                        {/* <PersonalInfo
                            title={Strings.SETTINGS_DATE_OF_BIRTH}
                            value={this.props.user.date_of_birth}
                        /> */}
                        <View style={{ marginBottom: 10 }} />
                        <Button title="Liên hệ" onPress={() => this.openContactScreen()} />
                    </View>
                </View>

                <View style={styles.logoutContainer}>
                    <Button
                        style={{ marginTop: 20 }}
                        onPress={() => this.logout()}
                        title="Đăng xuất"
                        color={Colors.decrease}
                    />
                </View>
                <Toast ref={this.toast} />
            </SafeAreaView>
        );
    }
}

const processGender = gender => {
    switch (gender) {
        case "male":
            return Strings.SETTINGS_GENDER_MALE;
        case "female":
            return Strings.SETTINGS_GENDER_FEMALE;
        default:
            return Strings.SETTINGS_NOT_YET_UPDATED;
    }
};

const processAddress = address => {
    if (address === null) return Strings.SETTINGS_NOT_YET_UPDATED;
    var words = address.split(" ");
    var wordsCount = words.length;
    if (wordsCount < 8) return address;
    else {
        let result = "";
        for (let i = 0; i < 7; i++) {
            result += " ";
            result += words[i];
        }
        result += "...";
        return result;
    }
};

NotificationScreen.navigationOptions = {
    header: null
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
        // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
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
        margin: 16
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
        marginTop: 2,
        marginStart: 3
    },
    detailsContainer: {
        marginTop: 30
    },
    logoutContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 16
    }
});
