import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import imgNormalTop from "../../assets/images/images/intro-normal-top.png";
import imgNormalBottom from "../../assets/images/images/intro-normal-bottom.png";
import imgMainNavigationBot from "../../assets/images/images/intro-main-navigation-bottom.png";
import imgProductTop from "../../assets/images/images/intro-product-top.png";
import imgProductCategoryTop from "../../assets/images/images/intro-product-category-top.png";
import Intro from "../../components/intro/Intro";
import { RegularText } from "../../components/common/StyledText";
import Colors from "../../constants/Colors";

export default class IntroScreen extends React.Component {
    state = {
        step: 1
    };

    next = () => {
        let step = this.state.step + 1;
        step = step % 4;
        if (step === 0) this.props.navigation.navigate("Main");
        this.setState({step});
    };

    render() {
        console.log(this.state.step);
        let intro;
        switch (this.state.step) {
            case 1:
                intro = <Intro top={imgNormalTop} bottom={imgMainNavigationBot} />;
                break;
            case 2:
                intro = <Intro top={imgProductTop} bottom={imgNormalBottom} />;
                break;
            case 3:
                intro = <Intro top={imgProductCategoryTop} bottom={imgNormalBottom} />;
                break;
            default:                break;
        }

        return (
            <View style={styles.container}>
                {intro}
                <TouchableNativeFeedback onPress={() => this.next()}>
                    <View style={styles.btNext}>
                        <RegularText style={styles.text}>Tiếp theo</RegularText>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackOpacity(0.39)
    },
    btNext: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        backgroundColor: Colors.midBlue,
        paddingStart: 12,
        paddingEnd: 12,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 16,
        right: 16,
        bottom: 60
    },
    text: {
        color: "#fff",
        fontSize: 12
    }
});
