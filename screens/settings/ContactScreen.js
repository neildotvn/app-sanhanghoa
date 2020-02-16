import React from "react";
import { StyleSheet, View, Image, Linking, Platform, SafeAreaView } from "react-native";
import Touchable from '../../components/common/Touchable';
import TopBar from "../../components/TopBar";
import Strings from "../../constants/Strings";
import { BoldText, LightText, RegularText } from "../../components/common/StyledText";
import imgPhone from "../../assets/images/icons/ic-phone.png";
import imgEmail from "../../assets/images/icons/ic-email.png";
import imgZalo from "../../assets/images/icons/ic-zalo.png";
import imgWeb from "../../assets/images/icons/ic-web.png";
import imgYoutube from "../../assets/images/icons/ic-youtube.png";

class ContactScreen extends React.Component {
    onBackPressed() {
        this.props.navigation.pop();
    }

    topBarConfig = {
        title: Strings.SETTINGS_CONTACT,
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png")
    };

    call = () => {
        let phoneNumber = "";
        if (Platform.OS === "android") {
            phoneNumber = "tel:${02696286111}";
        } else {
            phoneNumber = "telprompt:${02696286111}";
        }
        Linking.openURL(phoneNumber).catch(err => console.log(err));
    };

    zalo = () => {
        let phoneNumber = "";
        if (Platform.OS === "android") {
            phoneNumber = "tel:${0906543852}";
        } else {
            phoneNumber = "telprompt:${0906543852}";
        }
        Linking.openURL(phoneNumber);
    };

    email = () => {
        let email = "mailto:congtytvtgialai@gmail.com";
        Linking.openURL(email);
    };

    website = () => {
        let url = "https://sanhanghoa24h.com";
        Linking.openURL(url);
    };

    youtube = () => {
        let youtube = "https://www.youtube.com/channel/UCEUO-mQP4o1vwcl68hWZsGA?view_as=subscriber";
        Linking.openURL(youtube);
    };

    render() {
        return (
            <SafeAreaView>
                <TopBar {...this.topBarConfig} onLeftButtonPress={this.onBackPressed.bind(this)} />
                <View style={styles.container}>
                    <BoldText style={{ marginBottom: 8 }}>Công Ty TNHH Thương Mại TVT Gia Lai</BoldText>
                    <LightText style={{ marginBottom: 4 }}>
                        Sàn giao dịch hàng hóa TVT Chúng tôi là thành viên kinh doanh của Sở giao dịch hàng hóa Việt
                        Nam, với tiêu chí "Không để khách hàng đắn đo về uy tín - chất lượng, mà đó là trách nhiệm của
                        mỗi mắt xích TVT".
                    </LightText>
                    <LightText style={{ marginBottom: 4 }}>
                        Chúng tôi tự tin mình đang là một trong những công ty hàng đầu của Việt Nam trong lĩnh vực giao
                        dịch hàng hóa phái sinh.
                    </LightText>
                    <LightText style={{ marginBottom: 4 }}>- Trụ sở chính: 12/01 Trần Hưng Đạo, Pleiku, Gia Lai </LightText>
                    <LightText style={{ marginBottom: 16 }}>
                        - Chi nhánh Đà Nẵng: Tầng 1 tòa nhà Đường Việt, số 30 Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng
                    </LightText>
                    <BoldText>Hotline</BoldText>
                    <View style={styles.infoContainer}>
                        <Image style={styles.image} source={imgPhone} />
                        <Touchable onPress={() => this.call()}>
                            <RegularText style={styles.text}>026 9628 6111</RegularText>
                        </Touchable>
                    </View>
                    <BoldText>Zalo</BoldText>
                    <View style={styles.infoContainer}>
                        <Image style={styles.image} source={imgZalo} />
                        <Touchable onPress={() => this.call()}>
                            <RegularText style={styles.text}>090 654 3852</RegularText>
                        </Touchable>
                    </View>
                    <BoldText>Email</BoldText>
                    <View style={styles.infoContainer}>
                        <Image style={styles.image} source={imgEmail} />
                        <Touchable onPress={() => this.email()}>
                            <RegularText style={styles.text}>congtytvtgialai@gmail.com</RegularText>
                        </Touchable>
                    </View>
                    <BoldText>Website</BoldText>
                    <View style={styles.infoContainer}>
                        <Image style={styles.image} source={imgWeb} />
                        <Touchable onPress={() => this.website()}>
                            <RegularText style={styles.text}>sanhanghoa24h.com</RegularText>
                        </Touchable>
                    </View>
                    <BoldText>Youtube</BoldText>
                    <View style={styles.infoContainer}>
                        <Image style={styles.image} source={imgYoutube} />
                        <Touchable onPress={() => this.youtube()}>
                            <RegularText style={styles.text}>Hướng dẫn giao dịch từ TVT</RegularText>
                        </Touchable>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 16
    },
    infoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        height: 40,
        marginBottom: 8
    },
    image: {
        height: 30,
        width: 30,
        marginEnd: 12
    },
    text: {
        textDecorationLine: "underline"
    }
});

export default ContactScreen;
