import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RegularText, MediumText } from "../common/StyledText";
import Colors from "../../constants/Colors";
import Touchable from "../common/Touchable";

export default class LotChooser extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.lotContainer}>
                    <Touchable onPress={() => this.props.onVolumeChange(-10)}>
                        <RegularText style={styles.modifier}>-10</RegularText>
                    </Touchable>
                    <Touchable onPress={() => this.props.onVolumeChange(-1)}>
                        <RegularText style={styles.modifier}>-1</RegularText>
                    </Touchable>
                    <RegularText autoCompleteType="off" keyboardType="numeric" type style={styles.lot}>
                        {this.props.volume.toFixed(1)}
                    </RegularText>
                    <Touchable onPress={() => this.props.onVolumeChange(1)}>
                        <RegularText style={styles.modifier}>+1</RegularText>
                    </Touchable>
                    <Touchable onPress={() => this.props.onVolumeChange(10)}>
                        <RegularText style={styles.modifier}>+10</RegularText>
                    </Touchable>
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
