import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RegularText, MediumText } from "../common/StyledText";
import {
    TextInput,
    TouchableNativeFeedback
} from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

export default class LotChooser extends React.Component {
    state = {
        lot: 1.0
    };

    onLotChanged = changed => {
        const copiedState = { ...this.state };
        copiedState.lot = copiedState.lot += changed;
        this.setState(copiedState);
    };

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.lotContainer}>
                    <TouchableNativeFeedback
                        onPress={() => this.onLotChanged(-0.1)}
                    >
                        <RegularText style={styles.modifier}>-0.1</RegularText>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => this.onLotChanged(-0.01)}
                    >
                        <RegularText style={styles.modifier}>-0.01</RegularText>
                    </TouchableNativeFeedback>
                    <TextInput
                        autoCompleteType="off"
                        keyboardType="numeric"
                        type
                        style={styles.lot}
                    >
                        {this.state.lot.toFixed(2)}
                    </TextInput>
                    <TouchableNativeFeedback
                        onPress={() => this.onLotChanged(0.01)}
                    >
                        <RegularText style={styles.modifier}>+0.01</RegularText>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => this.onLotChanged(0.1)}
                    >
                        <RegularText style={styles.modifier}>+0.1</RegularText>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.bottomLine} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lotContainer: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    modifier: {
        color: Colors.midBlue,
        fontSize: 13
    },
    lot: {
        fontSize: 14,
        fontFamily: "medium"
    },
    bottomLine: {
        height: 1,
        backgroundColor: Colors.midBlueOpacity(0.5),
        marginTop: 8,
        marginStart: 30,
        marginEnd: 30
    }
});
