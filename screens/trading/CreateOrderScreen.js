import React from "react";
import { Platform, StatusBar, StyleSheet, View, Image, TouchableNativeFeedback, TextInput } from "react-native";
import TopBar from "../../components/TopBar";
import { connect } from "react-redux";
import LotChooser from "../../components/trading/LotChooser";
import OrderPrices from "../../components/trading/OderPrices";
import { MediumText, RegularText } from "../../components/common/StyledText";
import Strings, { commodityNames } from "../../constants/Strings";
import Colors from "../../constants/Colors";
import MultipleSelect from "../../components/common/MultipleSelect";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { createOrder } from "../../store/actions/Order";
import Toast from "react-native-simple-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { orderProductMap } from "../../constants/CommodityMap";
import _ from "lodash";

class CreateOrderScreen extends React.Component {
    state = {
        orderTypes: [
            {
                label: "Theo thị trường",
                value: -1
            },
            {
                label: "Mua giới hạn",
                value: 2
            },
            {
                label: "Bán giới hạn",
                value: 3
            },
            {
                label: "Mua dừng",
                value: 4
            },
            {
                label: "Bán dừng",
                value: 5
            }
        ],
        data: {
            ice: [],
            nyb: []
        },
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
        const args = this.props.navigation.getParam("product_name");
        const title = args[0];
        const name = args[1];
        const data = { ...this.state.data, ...this.props.pricesStore.prices[name] };

        const iceTerms = data.ice
            ? data.ice.map(row => {
                  return { label: `ICE ${row[0]}`, value: `ICE ${row[0]}` };
              })
            : [];
        const nybTerms = data.nyb
            ? data.nyb.map(row => {
                  return { label: `NYB ${row[0]}`, value: `NYB ${row[0]}` };
              })
            : [];
        const termOptions = [...iceTerms, ...nybTerms];
        const order = { ...this.state.order };
        order.exchange = termOptions[0].value;
        this.setState({ termOptions, data, order });
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

    onOrderPriceChangeBit = isIncreased => {
        try {
            const order = { ...this.state.order };
            let numericStopLoss = order.placing_price === null ? 0 : Number(order.placing_price);
            let temp = isIncreased ? (numericStopLoss += 1) : (numericStopLoss -= 1);
            order.placing_price = temp >= 0 ? temp.toString() : 0;
            this.setState({ order: order });
        } catch (err) {
            console.log(err);
        }
    };

    onStopLossChange = text => {
        const order = { ...this.state.order };
        order.stop_loss_price = text == 0 ? null : text;
        this.setState({ order: order });
    };

    onStopLossChangeBit = isIncreased => {
        try {
            const order = { ...this.state.order };
            let numericStopLoss = order.stop_loss_price === null ? 0 : Number(order.stop_loss_price);
            let temp = isIncreased ? (numericStopLoss += 1) : (numericStopLoss -= 1);
            order.stop_loss_price = temp >= 0 ? temp.toString() : 0;
            this.setState({ order: order });
        } catch (err) {
            console.log(err);
        }
    };

    onTakeProfitChange = text => {
        const order = { ...this.state.order };
        order.take_profit_price = text == 0 ? null : text;
        this.setState({ order: order });
    };

    onTakeProfitChangeBit = isIncreased => {
        try {
            const order = { ...this.state.order };
            let numericStopLoss = order.take_profit_price === null ? 0 : Number(order.take_profit_price);
            let temp = isIncreased ? (numericStopLoss += 1) : (numericStopLoss -= 1);
            order.take_profit_price = temp >= 0 ? temp.toString() : 0;
            this.setState({ order: order });
        } catch (err) {
            console.log(err);
        }
    };

    onPlaceOrderByMarket = isBuy => {
        const product = this.props.navigation.getParam("product_name")[1];
        const { buyPrice, sellPrice } = this.mapPrice();
        const orderPrice = isBuy ? buyPrice : sellPrice;
        const tpPrice = this.state.order.take_profit_price ? Number(this.state.order.take_profit_price) : null;
        const slPrice = this.state.order.stop_loss_price ? Number(this.state.order.stop_loss_price) : null;
        const volume = _.round(this.state.order.volume, 1);
        const order = {
            product,
            exchange: this.state.order.exchange,
            order_status: 0,
            order_type: isBuy ? 0 : 1,
            placing_price: orderPrice,
            volume,
            take_profit_price: tpPrice,
            stop_loss_price: slPrice
        };
        const checkResult = this.onCheckNumberInput(true, isBuy, order);
        if (!checkResult.result) {
            Toast.show(checkResult.message);
            return;
        }
        this.props.createOrder(order);
    };

    onPlaceOrder = () => {
        const product = this.props.navigation.getParam("product_name")[1];
        const volume = _.round(this.state.order.volume, 1);
        const tpPrice = this.state.order.take_profit_price ? Number(this.state.order.take_profit_price) : null;
        const slPrice = this.state.order.stop_loss_price ? Number(this.state.order.stop_loss_price) : null;
        const order = {
            product,
            exchange: this.state.order.exchange,
            order_status: 0,
            order_type: this.state.orderType,
            placing_price: this.state.order.placing_price,
            volume,
            take_profit_price: tpPrice,
            stop_loss_price: slPrice
        };
        const checkResult = this.onCheckNumberInput(false, false, order);
        if (!checkResult.result) {
            Toast.show(checkResult.message);
            return;
        }
        this.props.createOrder(order);
    };

    onCheckNumberInput = (isByMarket = false, isBuyByMarket = false, orderObj) => {
        const order = _.omit(orderObj, ["exchange", "product"]);
        for (const orderInput of Object.values(order)) {
            if (orderInput != null && isNaN(orderInput)) {
                return { result: false, message: Strings.ERROR_NAN };
            }
        }
        let { buyPrice, sellPrice, currentPrice } = this.mapPrice();
        const orderPrice = order.placing_price;
        const slPrice = order.stop_loss_price;
        const tpPrice = order.take_profit_price;
        if (order.volume == 0) {
            return { result: false, message: Strings.ERROR_LOT_ZERO };
        }
        switch (this.state.orderType) {
            case 2: // buy limit
                if (orderPrice >= buyPrice) return { result: false, message: Strings.ERROR_BUY_LIMIT };
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
                if (orderPrice <= sellPrice) return { result: false, message: Strings.ERROR_SELL_LIMIT };
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
                if (orderPrice <= buyPrice) return { result: false, message: Strings.ERROR_BUY_STOP };
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
                if (orderPrice >= sellPrice) return { result: false, message: Strings.ERROR_SELL_STOP };
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
        const order = { ...this.state.order };
        order.exchange = value;
        this.setState({ selectedTermOption: position, order });
    };

    mapPrice = () => {
        let buyPrice = 0;
        let sellPrice = 0;
        let currentPrice = 0;
        let inTrading = true;
        try {
            const data = [...this.state.data.ice, ...this.state.data.nyb];
            const rowData = data[this.state.selectedTermOption];
            console.log("rowData", rowData);
            currentPrice = rowData[1];
            if (isNaN(Number(currentPrice))) {
                currentPrice = Number(currentPrice.replace("s", "").replace(",", ""));
            }
            buyPrice = rowData[5] === 0 ? currentPrice : rowData[5];
            sellPrice = rowData[6] === 0 ? currentPrice : rowData[6];
            if (buyPrice === sellPrice) inTrading = false;
        } catch (err) {
            console.log("CreateOrderScreen", err);
        }
        console.log(`buy = ${buyPrice}`);
        console.log(`sell = ${sellPrice}`);
        return { buyPrice, sellPrice, currentPrice, inTrading };
    };

    onBackPressed = () => {
        this.props.navigation.pop();
    };

    topBarConfig = {
        title: this.props.navigation.getParam("product_name")[0],
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    render() {
        const { buyPrice, sellPrice, currentPrice, inTrading } = this.mapPrice();
        console.log("CreateOrderScreen");
        return (
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <Spinner visible={this.props.orderStore.create_loading} />
                <TopBar {...this.topBarConfig} />
                <View style={styles.secondaryContainer}>
                    <RegularText style={styles.titleText}>{Strings.ORDER_TERM}</RegularText>
                    <MultipleSelect
                        values={this.state.termOptions}
                        selected={this.state.selectedTermOption}
                        onSelect={this.onTermSelect}
                    />
                    <RegularText style={styles.titleText}>{Strings.ORDER_TYPE}</RegularText>
                    <MultipleSelect
                        values={this.state.orderTypes}
                        selected={this.state.selectedOptionType}
                        onSelect={this.onOptionSelect}
                    />
                    <MediumText style={styles.lotTitle}>Lot</MediumText>
                    <LotChooser
                        style={styles.lotChooser}
                        volume={this.state.order.volume}
                        onVolumeChange={this.onVolumeChange}
                    />
                    <OrderPrices style={styles.orderPrices} sellPrice={sellPrice} buyPrice={buyPrice} />
                    {this.state.selectedOptionType === 0 ? null : (
                        <View style={styles.orderPriceContainer}>
                            <View style={styles.orderPrice}>
                                <TouchableNativeFeedback onPress={() => this.onOrderPriceChangeBit(false)}>
                                    <Image
                                        style={styles.volumnAdjustImage}
                                        source={require("../../assets/images/icons/ic-subtract.png")}
                                    />
                                </TouchableNativeFeedback>
                                <TextInput
                                    value={this.state.order.placing_price.toString()}
                                    style={styles.input}
                                    onChangeText={text => this.onOrderPriceChange(text)}
                                />
                                <TouchableNativeFeedback onPress={() => this.onOrderPriceChangeBit(true)}>
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
                            <TouchableNativeFeedback onPress={() => this.onStopLossChangeBit(false)}>
                                <Image
                                    style={styles.volumnAdjustImage}
                                    source={require("../../assets/images/icons/ic-subtract.png")}
                                />
                            </TouchableNativeFeedback>
                            <TextInput
                                value={
                                    this.state.order.stop_loss_price ? this.state.order.stop_loss_price.toString() : "0"
                                }
                                style={styles.input}
                                onChangeText={text => this.onStopLossChange(text)}
                            />
                            <TouchableNativeFeedback onPress={() => this.onStopLossChangeBit(true)}>
                                <Image
                                    style={styles.volumnAdjustImage}
                                    source={require("../../assets/images/icons/ic-add.png")}
                                />
                            </TouchableNativeFeedback>
                        </View>
                        <View style={[styles.slAndTp, styles.takeProfit]}>
                            <TouchableNativeFeedback onPress={() => this.onTakeProfitChangeBit(false)}>
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
                                onChangeText={text => this.onTakeProfitChange(text)}
                            />
                            <TouchableNativeFeedback onPress={() => this.onTakeProfitChangeBit(true)}>
                                <Image
                                    style={styles.volumnAdjustImage}
                                    source={require("../../assets/images/icons/ic-add.png")}
                                />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
                {/* {buyPrice !== 0 || sellPrice !== 0 ? ( */}
                <View style={styles.orderButtonsContainer}>
                    {this.state.selectedOptionType !== 0 ? (
                        <TouchableNativeFeedback onPress={() => this.onPlaceOrder()}>
                            <View style={styles.placeOrderButton}>
                                <MediumText style={styles.placeOrderButtonText}>{Strings.ORDER_PLACE_ORDER}</MediumText>
                            </View>
                        </TouchableNativeFeedback>
                    ) : inTrading ? (
                        <View style={styles.byMarketButtons}>
                            <TouchableNativeFeedback onPress={() => this.onPlaceOrderByMarket(false)}>
                                <View style={styles.byMarketButton}>
                                    <MediumText style={[styles.byMarketActionText, styles.sellText]}>
                                        {Strings.ORDER_SELL}
                                    </MediumText>
                                    <RegularText style={[styles.byMarketText, styles.sellText]}>
                                        {Strings.ORDER_BY_MARKET}
                                    </RegularText>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.divider} />
                            <TouchableNativeFeedback onPress={() => this.onPlaceOrderByMarket(true)}>
                                <View style={[styles.byMarketButton]}>
                                    <MediumText style={[styles.byMarketActionText, styles.buyText]}>
                                        {Strings.ORDER_BUY}
                                    </MediumText>
                                    <RegularText style={[styles.byMarketText, styles.buyText]}>
                                        {Strings.ORDER_BY_MARKET}
                                    </RegularText>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    ) : null}
                </View>
                {/* ) : null} */}
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
        backgroundColor: "#fff"
        // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    secondaryContainer: {
        padding: 20,
        paddingTop: 10
    },
    lotTitle: {
        marginTop: 20,
        textAlign: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderScreen);
