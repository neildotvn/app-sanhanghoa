import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Image,
    TouchableNativeFeedback
} from "react-native";
import TopBar from "../../components/TopBar";
import { connect } from "react-redux";
import LotChooser from "../../components/trading/LotChooser";
import OrderPrices from "../../components/trading/OderPrices";
import { MediumText, RegularText } from "../../components/common/StyledText";
import Strings, { commodityNames } from "../../constants/Strings";
import Colors from "../../constants/Colors";
import MultipleSelect from "../../components/common/MultipleSelect";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { createOrder } from "../../store/actions/Order";
import Toast from "react-native-simple-toast";
import Spinner from "react-native-loading-spinner-overlay";

class CreateOrderScreen extends React.Component {
    state = {
        orderTypes: [
            {
                label: "Market Execution",
                value: -1
            },
            {
                label: "Buy Limit",
                value: 2
            },
            {
                label: "Sell Limit",
                value: 3
            },
            {
                label: "Buy Stop",
                value: 4
            },
            {
                label: "Sell Stop",
                value: 5
            }
        ],
        selectedOption: 0
    };

    componentDidUpdate() {
        if (this.props.orderStore.create_success) {
            Toast.show(Strings.ORDER_CREATE_SUCESS);
        }
        if (this.props.orderStore.error) {
            Toast.show(Strings.ORDER_CREATE_FAIL);
        }
    }

    onPlaceOrder = () => {
        const order = {
            exchange: "zme",
            order_status: 0,
            order_type: 0,
            placing_price: 314,
            volume: 123.32,
            take_profit_price: 3443,
            stop_loss_price: 342
        };
        this.props.createOrder(order);
    };

    onOptionSelect = position => {
        this.setState({ selectedOption: position });
    };

    onBackPressed = () => {
        this.props.navigation.pop();
    };

    topBarConfig = {
        title: commodityNames.KHO_DAU_TUONG,
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <TopBar {...this.topBarConfig} />
                <View style={styles.secondaryContainer}>
                    <MultipleSelect
                        options={this.state.orderTypes}
                        selected={this.state.selectedOption}
                        onSelect={this.onOptionSelect}
                    />
                    <LotChooser style={styles.lotChooser} />
                    <OrderPrices
                        style={styles.orderPrices}
                        sellPrice={73612}
                        buyPrice={87162}
                    />
                    {this.state.selectedOption === 0 ? null : (
                        <View style={styles.orderPriceContainer}>
                            <View style={styles.orderPrice}>
                                <TouchableNativeFeedback>
                                    <Image
                                        style={styles.volumnAdjustImage}
                                        source={require("../../assets/images/icons/ic-subtract.png")}
                                    />
                                </TouchableNativeFeedback>
                                <MediumText>1234</MediumText>
                                <TouchableNativeFeedback>
                                    <Image
                                        style={styles.volumnAdjustImage}
                                        source={require("../../assets/images/icons/ic-add.png")}
                                    />
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.bottomLine} />
                        </View>
                    )}
                    <View style={styles.slAndTpSection}>
                        <View style={[styles.slAndTp, styles.stopLoss]}>
                            <TouchableNativeFeedback>
                                <Image
                                    style={styles.volumnAdjustImage}
                                    source={require("../../assets/images/icons/ic-subtract.png")}
                                />
                            </TouchableNativeFeedback>
                            <MediumText>1234</MediumText>
                            <TouchableNativeFeedback>
                                <Image
                                    style={styles.volumnAdjustImage}
                                    source={require("../../assets/images/icons/ic-add.png")}
                                />
                            </TouchableNativeFeedback>
                        </View>
                        <View style={[styles.slAndTp, styles.takeProfit]}>
                            <TouchableNativeFeedback>
                                <Image
                                    style={styles.volumnAdjustImage}
                                    source={require("../../assets/images/icons/ic-subtract.png")}
                                />
                            </TouchableNativeFeedback>
                            <MediumText>5343</MediumText>
                            <TouchableNativeFeedback>
                                <Image
                                    style={styles.volumnAdjustImage}
                                    source={require("../../assets/images/icons/ic-add.png")}
                                />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
                <View style={styles.orderButtonsContainer}>
                    {this.state.selectedOption !== 0 ? (
                        <TouchableNativeFeedback
                            onPress={() => this.onPlaceOrder()}
                        >
                            <View style={styles.placeOrderButton}>
                                <MediumText style={styles.placeOrderButtonText}>
                                    {Strings.ORDER_PLACE_ORDER}
                                </MediumText>
                            </View>
                        </TouchableNativeFeedback>
                    ) : (
                        <View style={styles.byMarketButtons}>
                            <TouchableNativeFeedback>
                                <View style={styles.byMarketButton}>
                                    <MediumText
                                        style={[
                                            styles.byMarketActionText,
                                            styles.sellText
                                        ]}
                                    >
                                        {Strings.ORDER_SELL}
                                    </MediumText>
                                    <RegularText
                                        style={[
                                            styles.byMarketText,
                                            styles.sellText
                                        ]}
                                    >
                                        {Strings.ORDER_BY_MARKET}
                                    </RegularText>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.divider} />
                            <TouchableNativeFeedback>
                                <View style={[styles.byMarketButton]}>
                                    <MediumText
                                        style={[
                                            styles.byMarketActionText,
                                            styles.buyText
                                        ]}
                                    >
                                        {Strings.ORDER_BUY}
                                    </MediumText>
                                    <RegularText
                                        style={[
                                            styles.byMarketText,
                                            styles.buyText
                                        ]}
                                    >
                                        {Strings.ORDER_BY_MARKET}
                                    </RegularText>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

CreateOrderScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    secondaryContainer: {
        padding: 20
    },
    lotChooser: {
        marginTop: 20,
        marginStart: 5,
        marginEnd: 5
    },
    orderPrices: {
        marginTop: 20
    },
    orderPriceContainer: {
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    orderPrice: {
        width: wp(65),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottomLine: {
        width: wp(55),
        backgroundColor: Colors.midBlueOpacity(0.5),
        height: 1,
        marginTop: 8
    },
    slAndTpSection: {
        marginTop: 20,
        flexDirection: "row",
        alignSelf: "stretch",
        height: 48
    },
    slAndTp: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    stopLoss: {
        backgroundColor: Colors.redOpacity(0.15)
    },
    takeProfit: {
        backgroundColor: Colors.midBlueOpacity(0.15)
    },
    volumnAdjustImage: {
        height: 28,
        width: 28
    },
    orderButtonsContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    placeOrderButton: {
        alignSelf: "stretch",
        height: 48,
        backgroundColor: Colors.grey,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    placeOrderButtonText: {
        fontSize: 14,
        color: Colors.midBlue
    },
    byMarketButtons: {
        flexDirection: "row",
        height: 48,
        backgroundColor: Colors.grey
    },
    byMarketButton: {
        flex: 1,
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        width: 2,
        backgroundColor: "white"
    },
    byMarketActionText: {
        fontSize: 14
    },
    byMarketText: {
        fontSize: 10
    },
    sellText: {
        color: Colors.decrease
    },
    buyText: {
        color: Colors.midBlue
    }
});

const mapStateToProps = state => {
    return {
        orderStore: state.orderStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createOrder: order => dispatch(createOrder(order))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrderScreen);
