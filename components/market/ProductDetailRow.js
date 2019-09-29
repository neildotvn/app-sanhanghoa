import React from "react";
import { View, StyleSheet } from "react-native";
import { RegularText, LightText } from "../common/StyledText";
import ChangeCell from "../market/ChangeCell";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";

class ProductDetailRow extends React.Component {
    render() {
        const props = this.props;
        return props.isTitle ? (
            <View style={styles.container}>
                <View style={styles.first}>
                    <RegularText style={styles.title}>
                        {props.title}
                    </RegularText>
                </View>
                <View style={styles.second}>
                    <RegularText style={styles.price}>
                        {props.price}
                    </RegularText>
                </View>
                <View style={styles.third}>
                    <ChangeCell
                        isIncrease={props.isIncrease}
                        value={props.change}
                    />
                </View>
            </View>
        ) : (
            <View style={styles.titleContainer}>
                <View style={styles.column}>
                    <LightText style={styles.titleText}>
                        {Strings.MARKTET_TITLE}
                    </LightText>
                </View>
                <View style={styles.column}>
                    <LightText style={styles.titleText}>
                        {Strings.MARKET_PRICE}
                    </LightText>
                </View>
                <View style={styles.column}>
                    <LightText style={styles.titleText}>
                        {Strings.MARKET_CHANGE}
                    </LightText>
                </View>
                <View style={styles.column}>
                    <LightText style={styles.titleText}>
                        {Strings.MARKET_CHANGE}
                    </LightText>
                </View>
                <View style={styles.column}>
                    <LightText style={styles.titleText}>
                        {Strings.MARKET_CHANGE}
                    </LightText>
                </View>
                <View style={styles.column}>
                    <LightText style={styles.titleText}>
                        {Strings.MARKET_CHANGE}
                    </LightText>
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
    column: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
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

export default ProductDetailRow;
