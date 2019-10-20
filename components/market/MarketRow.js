import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { RegularText, LightText } from "../common/StyledText";
import ChangeCell from "../market/ChangeCell";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";

class MarketRow extends React.Component {
    render() {
        const props = this.props;
        return !props.isTitle ? (
            <TouchableNativeFeedback
                onPress={() => this.props.onOpenProductDetails(props.title)}
            >
                <View style={styles.container}>
                    <View style={styles.first}>
                        <RegularText style={styles.title}>
                            {props.title}
                        </RegularText>
                    </View>
                    <View style={styles.second}>
                        {/* <RegularText style={styles.price}>
                            {props.price}
                        </RegularText> */}
                    </View>
                    <View style={styles.third}>
                        {/* <ChangeCell
                            isIncrease={props.isIncrease}
                            value={props.change}
                        /> */}
                    </View>
                </View>
            </TouchableNativeFeedback>
        ) : (
            <View style={styles.titleContainer}>
                <View style={styles.first}>
                    <LightText style={styles.titleText}>
                        {Strings.MARKTET_TITLE}
                    </LightText>
                </View>
                <View style={styles.second}>
                    {/* <LightText style={styles.titleText}>
                        {Strings.MARKET_PRICE}
                    </LightText> */}
                </View>
                <View style={styles.third}>
                    {/* <LightText style={styles.titleText}>
                        {Strings.MARKET_CHANGE}
                    </LightText> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 12,
        paddingEnd: 12,
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        backgroundColor: Colors.lightGrey,
        marginBottom: 2
    },
    titleContainer: {
        height: 32,
        paddingStart: 12,
        paddingEnd: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white"
    },
    titleText: {
        fontSize: 12,
        color: Colors.darkBlueOpacity(0.5)
    },
    first: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    second: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    third: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    title: {
        fontSize: 12,
        textTransform: "uppercase"
    },
    price: {
        fontSize: 12
    },
    change: { fontSize: 12 }
});

export default MarketRow;
