import React from "react";
import { Platform, StyleSheet, StatusBar, View, SafeAreaView } from "react-native";
import MarketTab from "../../components/market/MarketTab";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";
import Strings, { commodityNames } from "../../constants/Strings";
import { connect } from "react-redux";
import getAllPrices from "../../store/actions/Prices";
import registerForPushNotificationsAsync from "../../notifications/NotificationsUtils";

const tabs = [
    [
        [commodityNames.CA_PHE_ROBUSTA, "robusta"],
        [commodityNames.CA_PHE_ARABICA, "arabica"],
        [commodityNames.COTTON, "cotton"],
        [commodityNames.CAO_SU, "rubber"],
        [commodityNames.CA_CAO, "cocoa"]
        // commodityNames.DUONG
    ],
    [
        [commodityNames.DAU_TUONG, "us_soybeans"],
        // commodityNames.KHO_DAU_TUONG,
        [commodityNames.DAU_DAU_TUONG, "us_soybean_oil"],
        // commodityNames.LUA_MI,
        [commodityNames.NGO, "us_corn"]
    ],
    [
        // commodityNames.QUANG_SAT,
        [commodityNames.BACH_KIM, "platinum"],
        // [commodityNames.BAC, "silver"],
        [commodityNames.PALLADIUM, "palladium"],
        [commodityNames.DONG, "copper"]
    ],
    [
        [commodityNames.DAU_WTI, "crude_oil_wti"],
        // commodityNames.DAU_LUU_HUYNH,
        // commodityNames.XANG_PHA_CHE,
        [commodityNames.KHI_TU_NHIEN, "natural_gas"],
        // commodityNames.DAU_THO,
        [commodityNames.DAU_THO_BRENT, "brent_oil"]
    ]
];

class MarketScreen extends React.Component {
    state = {
        tabButtons: [
            // {
            //     title: Strings.TAB_FAVORITE,
            //     isActive: true
            // },
            {
                title: Strings.TAB_FUEL,
                isActive: true
            },
            {
                title: Strings.TAB_AGRICULTURE,
                isActive: false
            },
            {
                title: Strings.TAB_METAL,
                isActive: false
            },
            {
                title: Strings.TAB_ENERGY,
                isActive: false
            }
        ],
        activePosition: 0
    };

    async componentDidMount() {
        // await registerForPushNotificationsAsync();
        this.timer = setInterval(() => {
            this.props.fetchPrices();
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    onOpenAlarms = () => this.props.navigation.push("AlarmList");

    onTabChanged = position => {
        const cState = { ...this.state };
        for (let i = 0; i < cState.tabButtons.length; ++i) {
            cState.tabButtons[i].isActive = i === position;
        }
        cState.activePosition = position;
        this.setState(cState);
    };

    onOpenProductDetails = name => {
        console.log(name);
        this.props.navigation.push("PricesDetail", { product_name: name });
    };

    topBarConfig = {
        title: Strings.HEADER_MARKET,
        rightButtonLabel: Strings.HEADER_BUTTON_ALERT,
        rightImageSource: require("../../assets/images/icons/ic-alert.png"),
        onRightButtonPress: this.onOpenAlarms
    };

    render() {
        const activeTab = (
            <MarketTab rows={tabs[this.state.activePosition]} onOpenProductDetails={this.onOpenProductDetails} />
        );
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <TopBar {...this.topBarConfig} />
                    <TopTabBar onTabChanged={this.onTabChanged} tabButtons={this.state.tabButtons} />
                    {activeTab}
                </View>
            </SafeAreaView>
        );
    }
}

MarketScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1
        // marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
});

const mapStateToProps = state => {
    return {
        pricesStore: state.pricesStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPrices: () => dispatch(getAllPrices())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketScreen);
