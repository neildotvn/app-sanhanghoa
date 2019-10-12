import React from "react";
import { Platform, StatusBar, StyleSheet, View, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import { MediumText, RegularText } from "./StyledText";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

export default class MultipleSelect extends React.Component {
    state = {
        isOptionsShowed: false
    };

    toggleOptions = () => {
        this.setState({ isOptionsShowed: !this.state.isOptionsShowed });
    };

    onOptionChosen = position => {
        this.toggleOptions();
        this.props.onSelect(position);
    };

    render() {
        const items = this.props.options.map((option, position) => {
            return (
                <SelectItem
                    key={position}
                    label={option.label}
                    onSelect={this.onOptionChosen}
                    position={position}
                />
            );
        });

        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => this.toggleOptions()}>
                    <View
                        style={{
                            ...styles.selected
                        }}
                    >
                        <MediumText style={{ color: Colors.midBlue }}>
                            {this.props.options[this.props.selected].label}
                        </MediumText>
                        <Image
                            style={styles.dropSign}
                            source={require("../../assets/images/images/img-multiple-sign.png")}
                        />
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.popup}>
                    {this.state.isOptionsShowed ? items : null}
                </View>
            </View>
        );
    }
}

const SelectItem = props => {
    return (
        <TouchableNativeFeedback onPress={() => props.onSelect(props.position)}>
            <View style={styles.item}>
                <RegularText style={styles.itemText}>{props.label}</RegularText>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    selected: {
        position: "relative",
        height: 36,
        alignSelf: "stretch",
        backgroundColor: Colors.grey,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 4,
        color: Colors.midBlue
    },
    dropSign: {
        position: "absolute",
        bottom: 0,
        right: 0
    },
    popup: {
        position: "absolute",
        top: 36,
        left: 0,
        right: 0,
        marginTop: 2,
        zIndex: 100,
        backgroundColor: "white"
    },
    item: {
        height: 32,
        backgroundColor: Colors.midBlue,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginTop: 1
    },
    itemText: {
        fontSize: 14,
        color: "white",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
