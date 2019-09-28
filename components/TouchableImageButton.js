import React from "react";
import { View, Image, TouchableNativeFeedback, StyleSheet } from "react-native";
import { RegularText } from "./common/StyledText";
import Colors from "../constants/Colors";

class TouchableImageButton extends React.Component {
    render() {
        return (
            <View style={styles.button}>
                <TouchableNativeFeedback
                    onPress={
                        this.props.onPress ? () => this.props.onPress() : null
                    }
                >
                    <Image
                        style={styles.image}
                        source={this.props.imageSource}
                    />
                </TouchableNativeFeedback>
                {this.props.label ? (
                    <RegularText style={styles.label}>
                        {this.props.label}
                    </RegularText>
                ) : null}
            </View>
        );
    }
}

styles = StyleSheet.create({
    button: {
        height: 36,
        width: 36,
        flexDirection: "column",
        alignItems: "center"
        // backgroundColor: "red"
    },
    image: {
        flex: 1,
        height: 28,
        width: 28
    },
    label: {
        fontSize: 8,
        color: Colors.darkBlue,
        textAlign: "center"
    }
});

export default TouchableImageButton;
