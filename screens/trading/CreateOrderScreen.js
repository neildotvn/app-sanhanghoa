import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Image,
    TouchableNativeFeedback,
    TextInput
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
import { orderProductMap, commodityMap } from "../../constants/CommodityMap";
import _ from "lodash";

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
        thisCom: {},
        termOptions: [],
        selectedTermOption: 0,
        selectedOptionType: 0,
        orderType: 0,
        order: {
            exchange: null,
            lot: 1.0,
            placing_price: 0,
            volume: 1.0,
            take_profit_price: null,
            stop_loss_price: null
        }
    };

    componentDidMount() {
        const name = this.props.navigation.getParam("product_name");
        let thisCom;
        for (const commodity of commodityMap) {
            if (commodity.name === name) {
                thisCom = { ...commodity };
                break;
            }
        }
        const iceTerms = thisCom.iceTerms
            ? thisCom.iceTerms.map(term => {
                  return { label: `ICE ${term}`, value: `ICE ${term}` };
              })
            : [];
        const nybTerms = thisCom.nybTerms
            ? thisCom.nybTerms.map(term => {
                  return { label: `NYB ${term}`, value: `NYB ${term}` };
              })
            : [];
        const termOptions = [...iceTerms, ...nybTerms];
        const order = { ...this.state.order };
        order.exchange = termOptions[0].value;
        this.setState({ termOptions, thisCom, order });
    }

    componentDidUpdate() {
        if (this.props.orderStore.create_success) {
            Toast.show(Strings.ORDER_CREATE_SUCESS);
            this.props.navigation.pop();
        }
        if (this.props.orderStore.error) {
            Toast.show(Strings.ORDER_CREATE_FAIL);
        }
    }

    onVolumeChange = change => {
        const order = { ...this.state.order };
        order.volume += change;
        if (order.volume < 0) {
            order.volume = 0;
        }
        this.setState({ order: order });
    };

    onOrderPriceChange = text => {
        const order = { ...this.state.order };
        order.placing_price = text;
        this.setState({ order: order });
    };

    onStopLossChange = text => {
        const order = { ...this.state.order };
        order.stop_loss_price = text == 0 ? null : text;
        this.setState({ order: order });
    };

    onTakeProfitChange = text => {
        const order = { ...this.state.order };
        order.take_profit_price = text == 0 ? null : text;
        this.setState({ order: order });
    };

    onPlaceOrderByMarket = isBuy => {
        const checkResult = this.onCheckNumberInput(true, isBuy);
        if (!checkResult.result) {
            Toast.show(checkResult.message);
            return;
        }
        const productName = this.props.navigation.getParam("product_name");
        let productCode;
        for (const product of orderProductMap) {
            if (product.name === productName) {
                productCode = product.productCode;
            }
        }
        const { buyPrice, sellPrice } = this.mapPrice();
        const orderPrice = isBuy ? buyPrice : sellPrice;
        const volume = _.round(this.state.order.volume, 1);
        const order = {
            product: productCode,
            exchange: this.state.order.exchange,
            order_status: 0,
            order_type: isBuy ? 0 : 1,
            placing_price: orderPrice,
            volume,
            take_profit_price: this.state.order.take_profit_price,
            stop_loss_price: this.state.order.stop_loss_price
        };
        console.log(order);
        this.props.createOrder(order);
    };

    onPlaceOrder = () => {
        const checkResult = this.onCheckNumberInput();
        if (!checkResult.result) {
            Toast.show(checkResult.message);
            return;
        }
        const productName = this.props.navigation.getParam("product_name");
        let productCode;
        for (const product of orderProductMap) {
            if (product.name === productName) {
                productCode = product.productCode;
            }
        }
        const volume = _.round(this.state.order.volume, 1);
        const order = {
            product: productCode,
            exchange: this.state.order.exchange,
            order_status: 0,
            order_type: this.state.orderType,
            placing_price: this.state.order.placing_price,
            volume,
            take_profit_price: this.state.order.take_profit_price,
            stop_loss_price: this.state.order.stop_loss_price
        };
        console.log(order);
        this.props.createOrder(order);
    };

    onCheckNumberInput = (isByMarket = false, isBuyByMarket = false) => {
        const order = _.omit(this.state.order, ["exchange"]);
        for (const orderInput of Object.values(order)) {
            if (orderInput != null && isNaN(orderInput)) {
                return { result: false, message: Strings.ERROR_NAN };
            }
        }
        if (order.volume == 0) {
            return { result: false, message: Strings.ERROR_LOT_ZERO };
        }
        const { buyPrice, sellPrice } = this.mapPrice();
        const orderPrice = order.placing_price;
        const slPrice = order.stop_loss_price;
        const tpPrice = order.take_profit_price;
        switch (this.state.orderType) {
            case 2: // buy limit
                if (orderPrice >= buyPrice)
                    return { result: false, message: Strings.ERROR_BUY_LIMIT };
                if (slPrice != null && slPrice >= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_BUY_STOP_LOSS
                    };
                }
                if (tpPrice != null && tpPrice <= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_BUY_TAKE_PROFIT
                    };
                }
                break;
            case 3: // sell limit
                if (orderPrice <= sellPrice)
                    return { result: false, message: Strings.ERROR_SELL_LIMIT };
                if (slPrice != null && slPrice <= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_SELL_STOP_LOSS
                    };
                }
                if (tpPrice != null && tpPrice >= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_SELL_TAKE_PROFIT
                    };
                }
                break;
            case 4: // buy stop
                if (orderPrice <= buyPrice)
                    return { result: false, message: Strings.ERROR_BUY_STOP };
                if (slPrice != null && slPrice >= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_BUY_STOP_LOSS
                    };
                }
                if (tpPrice != null && tpPrice <= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_BUY_TAKE_PROFIT
                    };
                }
                break;
            case 5: // sell stop
                if (orderPrice >= sellPrice)
                    return { result: false, message: Strings.ERROR_SELL_STOP };
                if (slPrice != null && slPrice <= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_SELL_STOP_LOSS
                    };
                }
                if (tpPrice != null && tpPrice >= orderPrice) {
                    return {
                        result: false,
                        message: Strings.ERROR_SELL_TAKE_PROFIT
                    };
                }
                break;
            default:
                // by market
                if (isByMarket) {
                    if (isBuyByMarket) {
                        if (slPrice != null && slPrice >= orderPrice) {
                            return {
                                result: false,
                                message: Strings.ERROR_BUY_STOP_LOSS
                            };
                        }
                        if (tpPrice != null && tpPrice <= orderPrice) {
                            return {
                                result: false,
                                message: Strings.ERROR_BUY_TAKE_PROFIT
                            };
                        }
                    } else {
                        if (slPrice != null && slPrice <= orderPrice) {
                            return {
                                result: false,
                                message: Strings.ERROR_SELL_STOP_LOSS
                            };
                        }
                        if (tpPrice != null && tpPrice >= orderPrice) {
                            return {
                                result: false,
                                message: Strings.ERROR_SELL_TAKE_PROFIT
                            };
                        }
                    }
                }
                break;
        }
        return { result: true };
    };

    onOptionSelect = (position, value) => {
        this.setState({ selectedOptionType: position, orderType: value });
    };

    onTermSelect = (position, value) => {
        order = { ...this.state.order };
        order.exchange = value;
        this.setState({ selectedTermOption: position, order });
    };

    mapPrice = () => {
        let buyPrice;
        let sellPrice;
        try {
            const valueIndices = [
                ...this.state.thisCom.ice,
                ...this.state.thisCom.nyb
            ];
            const rowIndex = valueIndices[this.state.selectedTermOption];
            const rowData = this.props.pricesStore.prices[rowIndex];
            buyPrice = rowData.vs[11];
            sellPrice = rowData.vs[13];
        } catch (err) {
            console.log(err);
        }
        return { buyPrice, sellPrice };
    };

    onBackPressed = () => {
        this.props.navigation.pop();
    };

    topBarConfig = {
        title: this.props.navigation.getParam("product_name"),
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    render() {
        const { buyPrice, sellPrice } = this.mapPrice();
        return (
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <Spinner visible={this.props.orderStore.create_loading} />
                <TopBar {...this.topBarConfig} />
                <View style={styles.secondaryContainer}>
                    <RegularText style={styles.titleText}>
                        {Strings.ORDER_TERM}
                    </RegularText>
                    <MultipleSelect
                        values={this.state.termOptions}
                        selected={this.state.selectedTermOption}
                        onSelect={this.onTermSelect}
                    />
                    <RegularText style={styles.titleText}>
                        {Strings.ORDER_TYPE}
                    </RegularText>
                    <MultipleSelect
                        values={this.state.orderTypes}
                        selected={this.state.selectedOptionType}
                        onSelect={this.onOptionSelect}
                    />
                    <LotChooser
                        style={styles.lotChooser}
                        volume={this.state.order.volume}
                        onVolumeChange={this.onVolumeChange}
                    />
                    <OrderPrices
                        style={styles.orderPrices}
                        sellPrice={sellPrice}
                        buyPrice={buyPrice}
                    />
                    {this.state.selectedOptionType === 0 ? null : (
                        <View style={styles.orderPriceContainer}>
                            <View style={styles.orderPrice}>
                                <TouchableNativeFeedback>
                                    <Image
                                        style={styles.volumnAdjustImage}
                                        source={require("../../assets/images/icons/ic-subtract.png")}
                                    />
                                </TouchableNativeFeedback>
                                <TextInput
                                    value={this.state.order.placing_price.toString()}
                                    style={styles.input}
                                    onChangeText={text =>
                                        this.onOrderPriceChange(text)
                                    }
                                />
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
                            <TextInput
                                value={
                                    this.state.order.stop_loss_price
                                        ? this.state.order.stop_loss_price.toString()
                                        : "0"
                                }
                                style={styles.input}
                                onChangeText={text =>
                                    this.onStopLossChange(text)
                                }
                            />
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
                            <TextInput
                                value={
                                    this.state.order.take_profit_price
                                        ? this.state.order.take_profit_price.toString()
                                        : "0"
                                }
                                style={styles.input}
                                onChangeText={text =>
                                    this.onTakeProfitChange(text)
                                }
                            />
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
                    {this.state.selectedOptionType !== 0 ? (
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
                            <TouchableNativeFeedback
                                onPress={() => this.onPlaceOrderByMarket(false)}
                            >
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
                            <TouchableNativeFeedback
                                onPress={() => this.onPlaceOrderByMarket(true)}
                            >
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
        padding: 20,
        paddingTop: 10
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
    },
    input: {
        flex: 1,
        textAlign: "center"
    },
    titleText: {
        alignSelf: "stretch",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        color: Colors.blackOpacity(0.8)
    }
});

const mapStateToProps = state => {
    return {
        orderStore: state.orderStore,
        pricesStore: state.pricesStore
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
