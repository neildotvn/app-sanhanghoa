import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Picker,
    TouchableNativeFeedback
} from "react-native";
import TopBar from "../../components/TopBar";
import { connect } from "react-redux";
import LotChooser from "../../components/trading/LotChooser";
import OrderPrices from "../../components/trading/OderPrices";
import PlaceOrderButtons from "../../components/trading/PlaceOrderButtons";
import { MediumText, RegularText } from "../../components/common/StyledText";
import Strings, { commodityNames } from "../../constants/Strings";
import Colors from "../../constants/Colors";
import MultipleSelect from "../../components/common/MultipleSelect";

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
                </View>
                <View style={styles.orderButtonsContainer}>
                    {this.state.selectedOption !== 0 ? (
                        <TouchableNativeFeedback>
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
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrderScreen);
