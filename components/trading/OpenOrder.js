import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { RegularText, MediumText, BoldText } from "../common/StyledText";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { orderTypes } from "../../constants/Strings";
import {
    getRowDataWithCodeAndExchange,
    getProductNameFromCode
} from "../../constants/CommodityMap";

class OpenOrder extends React.Component {
    render() {
        const date = new Date(this.props.order.created_at.replace(" ", "T"));
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month =
            date.getMonth() < 9
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1;
        const year = date.getFullYear();
        const hour =
            date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes =
            date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes();
        const createdAt = `${day}/${month}/${year} - ${hour}:${minutes}`;
        let rowData;
        let currentPrice;
        let productName;

        try {
            productName = getProductNameFromCode(this.props.order.product);
            rowData = getRowDataWithCodeAndExchange(
                this.props.pricesStore.prices,
                this.props.order.product,
                this.props.order.exchange
            );
            currentPrice = rowData[1];
        } catch (err) {
            console.log(err);
        }

        let typeStyle;
        const type = this.props.order.order_type;
        if (type === 0 || type === 2 || type === 4) {
            typeStyle = styles.buyText;
        } else {
            typeStyle = styles.sellText;
        }

        return (
            <TouchableNativeFeedback
                onPress={() => this.props.onPress(this.props.order)}
            >
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <BoldText style={styles.title}>{productName}</BoldText>
                        <RegularText style={styles.date}>
                            {createdAt}
                        </RegularText>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <View style={styles.exchangeContainer}>
                                <BoldText style={styles.exchange}>
                                    {this.props.order.exchange}
                                </BoldText>
                                <MediumText
                                    style={[styles.typeAndLot, typeStyle]}
                                >
                                    {orderTypes[this.props.order.order_type]}{" "}
                                    {this.props.order.volume.toFixed(1)}
                                </MediumText>
                            </View>
                            <RegularText style={styles.range}>
                                {this.props.order.placing_price} ->{" "}
                                {currentPrice}
                            </RegularText>
                        </View>
                        <View style={styles.valueContainer}>
                            <BoldText style={styles.value}></BoldText>
                            {/*+930*/}
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 4,
        paddingTop: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightGrey
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    date: {
        fontSize: 12,
        color: "#8c8c8c"
    },
    exchangeContainer: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    title: { fontSize: 14 },
    exchange: { fontSize: 14, textTransform: "uppercase" },
    typeAndLot: { fontSize: 14, marginStart: 8 },
    valueContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    range: { fontSize: 14, color: Colors.black3 },
    value: { fontSize: 16, color: Colors.midBlue },
    buyText: { color: Colors.midBlue },
    sellText: { color: Colors.sell }
});

const mapStateToProps = state => {
    return {
        pricesStore: state.pricesStore
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpenOrder);
