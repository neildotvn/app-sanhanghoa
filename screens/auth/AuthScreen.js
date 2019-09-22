import React, { Component } from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";

import Input from "../../components/Input";
import { LinearGradient } from "expo-linear-gradient";
import backgroundSource from "../../assets/images/auth-background.jpg";
import logoSource from "../../assets/images/app-logo.png";
import colors from "../../constants/Colors";
import * as actions from "../../store/actions/Auth";

class AuthScreen extends Component {
    state = {
        isSignup: false,
        inputs: {
            phone: {
                text: "",
                config: {
                    placeholder: "Số điện thoại"
                }
            },
            password: {
                text: "",
                config: { placeholder: "Mật khẩu" }
            }
        }
    };

    onTextChangedHandler(text, title) {
        const copiedState = { ...this.state };
        copiedState.inputs[title].text = text;
        this.setState(copiedState);
    }

    setIsSignUp(isSignup) {
        console.log(isSignup);
        this.setState({ isSignup });
        this.props.login();
    }

    render() {
        const renderedInputs = [];
        for (let key in this.state.inputs) {
            const input = this.state.inputs[key];
            renderedInputs.push(
                <Input
                    style={styles.input}
                    config={input.config}
                    key={key}
                    title={key}
                    onChangeText={(text, title) =>
                        this.onTextChangedHandler(text, title)
                    }
                />
            );
        }

        return (
            <ImageBackground
                source={backgroundSource}
                style={styles.container}
                blurRadius={2}
            >
                <View style={styles.secondaryContainer}>
                    {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                    <View style={[styles.logoAndInformation]}>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.logoContainer]}>
                                <Image
                                    style={styles.logo}
                                    source={logoSource}
                                />
                                <Text style={styles.title}>Đăng nhập</Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            {renderedInputs}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                anima
                                style={styles.mainButton}
                            >
                                <LinearGradient
                                    colors={[
                                        "#0F455E",
                                        "rgba(73,180,203,0.46)"
                                    ]}
                                    start={[0, 0.5]}
                                    end={[1, 0.5]}
                                    style={styles.mainButtonBackground}
                                >
                                    <Text style={styles.mainButtonText}>
                                        {this.state.isSignup
                                            ? "Đăng ký"
                                            : "Đăng nhập"}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                        }}
                    >
                        <View style={styles.buttonsContainer}>
                            <TouchableWithoutFeedback
                                onPress={() => this.setIsSignUp(false)}
                            >
                                <View
                                    style={[
                                        styles.bottomButton,
                                        this.state.isSignup
                                            ? styles.bottomButtonInactive
                                            : styles.bottomButtonActive
                                    ]}
                                >
                                    <Text style={styles.bottomButtonText}>
                                        Đăng nhập
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => this.setIsSignUp(true)}
                            >
                                <View
                                    style={[
                                        styles.bottomButton,
                                        this.state.isSignup
                                            ? styles.bottomButtonActive
                                            : styles.bottomButtonInactive
                                    ]}
                                >
                                    <Text style={styles.bottomButtonText}>
                                        Đăng ký
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    secondaryContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    logoAndInformation: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    logo: {
        width: 153,
        height: 65
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: 4
    },
    logoContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: wp(12)
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: wp(12),
        paddingRight: wp(12)
    },
    input: {
        alignSelf: "stretch",
        marginBottom: 20,
        borderBottomColor: "#fff",
        borderBottomWidth: 0.5,
        fontSize: 14,
        color: "#fff"
    },
    buttonsContainer: {
        height: 48,
        flexDirection: "row"
    },
    mainButton: {
        opacity: 0.8,
        alignSelf: "stretch",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "rgba(15,69,94,0.9)",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 4 },
        marginTop: 10
    },
    mainButtonBackground: {
        flex: 1,
        alignSelf: "stretch",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    mainButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 8,
        marginBottom: 2
    },
    bottomButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    bottomButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold"
    },
    bottomButtonActive: {
        backgroundColor: colors.darkBlueOpacity(0.8)
    },
    bottomButtonInactive: {
        backgroundColor: colors.whiteOpacity(0.3)
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: () => actions.login(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthScreen);
