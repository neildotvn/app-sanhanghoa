import React from "react";
import { Platform, StatusBar, StyleSheet, View, Button } from "react-native";
import TopBar from "../../components/TopBar";
import Input from "../../components/common/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/Auth";
import Toast from "react-native-simple-toast";
import Spinner from "react-native-loading-spinner-overlay";
import Strings from "../../constants/Strings";
import Colors from "../../constants/Colors";
import RadioGroup from "react-native-radio-buttons-group";

class UpdateProfileScreen extends React.Component {
    state = {
        inputs: {
            full_name: {
                config: {
                    value: "",
                    placeholder: Strings.SETTINGS_NAME
                }
            },
            email: {
                config: {
                    value: "",
                    placeholder: Strings.SETTINGS_EMAIL
                }
            },
            address: {
                config: {
                    value: "",
                    placeholder: Strings.SETTINGS_ADDRESS
                }
            },
            date_of_birth: {
                config: {
                    value: "",
                    placeholder: Strings.SETTINGS_DATE_OF_BIRTH
                }
            }
        },
        genderOptions: [
            {
                label: Strings.SETTINGS_GENDER_MALE,
                value: "male",
                size: 18,
                color: Colors.midBlue
            },
            {
                label: Strings.SETTINGS_GENDER_FEMALE,
                value: "female",
                size: 18,
                color: Colors.midBlue
            }
        ]
    };

    componentDidUpdate() {
        if (this.props.auth.updateSuccess) {
            Toast.show(Strings.SETTINGS_UPDATE_SUCCESS);
            this.props.navigation.pop();
        } else if (this.props.auth.error) {
            Toast.show(Strings.SETTINGS_UPDATE_FAIL);
        }
    }

    componentDidMount() {
        const copiedState = { ...this.state };
        for (let key in copiedState.inputs) {
            copiedState.inputs[key].config.value = this.props.user[key];
        }
        copiedState.genderOptions = copiedState.genderOptions.map(
            gender =>
                (gender.selected = gender.value === this.props.user.gender)
        );
        this.setState(copiedState);
    }

    onTextChangedHandler(value, title) {
        const copiedState = { ...this.state };
        copiedState.inputs[title].config.value = value;
        this.setState(copiedState);
    }

    onGenderChangedHandler = genderOptions => {
        console.log(genderOptions);
        this.setState({ genderOptions });
    };

    onBackPressed() {
        this.props.navigation.pop();
    }

    onUpdateProfile() {
        const user = {};
        for (let key in this.state.inputs) {
            user[key] = this.state.inputs[key].config.value;
        }
        for (const gender of this.state.genderOptions) {
            if (gender.selected) {
                user.gender = gender.value;
                break;
            }
        }
        console.log(user);
        this.props.updateProfile(user);
    }

    topBarConfig = {
        title: Strings.SETTINGS_EDIT_PROFILE,
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png")
    };

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
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <TopBar
                    {...this.topBarConfig}
                    onLeftButtonPress={this.onBackPressed.bind(this)}
                />
                <View style={styles.inputsContainer}>
                    {renderedInputs}
                    <RadioGroup
                        flexDirection="row"
                        radioButtons={this.state.genderOptions}
                        onPress={this.onGenderChangedHandler}
                    />
                    <View style={{ marginBottom: 10 }} />
                    <Button
                        onPress={() => this.onUpdateProfile()}
                        title={Strings.SETTINGS_FINISH_UPDATE}
                    />
                </View>
                <Spinner visible={this.props.auth.loading} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: user => dispatch(actions.updateProfile(user))
    };
};

UpdateProfileScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    inputsContainer: {
        padding: 16
    },
    input: {
        alignSelf: "stretch",
        marginBottom: 20,
        borderBottomColor: Colors.midBlueOpacity(80),
        borderBottomWidth: 0.5,
        fontSize: 14
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateProfileScreen);
