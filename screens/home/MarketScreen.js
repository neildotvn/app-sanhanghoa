import React from "react";
import {
    Platform,
    StyleSheet,
    StatusBar,
    View,
    SafeAreaView
} from "react-native";
import MarketTab from "../../components/market/MarketTab";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";
import Strings, { commodityNames } from "../../constants/Strings";
import { connect } from "react-redux";
import getAllPrices from "../../store/actions/Prices";

const tabs = [
    [
        commodityNames.CA_PHE,
        // commodityNames.CA_PHE_ROBUSTA,
        // commodityNames.CA_PHE_ARABICA,
        commodityNames.COTTON,
        commodityNames.CAO_SU,
        commodityNames.CA_CAO
        // commodityNames.DUONG
    ],
    [
        // commodityNames.DAU_TUONG,
        // commodityNames.KHO_DAU_TUONG,
        // commodityNames.DAU_DAU_TUONG,
        // commodityNames.LUA_MI,
        // commodityNames.NGO
    ],
    [
        // commodityNames.QUANG_SAT,
        // commodityNames.BACH_KIM,
        // commodityNames.BAC,
        // commodityNames.DONG
    ],
    [
        // commodityNames.DAU_WTI,
        // commodityNames.DAU_LUU_HUYNH,
        // commodityNames.XANG_PHA_CHE,
        // commodityNames.KHI_TU_NHIEN,
        // commodityNames.DAU_THO,
        // commodityNames.DAU_THO_BRENT
    ]
];

class MarketScreen extends React.Component {
    state = {
        activePosition: 0
    };

    componentDidMount() {
        this.props.fetchPrices();
    }

    onTabChanged = position => {
        this.setState({ activePosition: position });
    };

    onOpenProductDetails = name => {
        console.log(name);
        this.props.navigation.push("PricesDetail", { product_name: name });
    };

    topBarConfig = {
        title: Strings.HEADER_MARKET
        // rightButtonLabel: Strings.HEADER_BUTTON_ALERT,
        // rightImageSource: require("../../assets/images/icons/ic-alert.png")
    };

    render() {
        const activeTab = (
            <MarketTab
                rows={tabs[this.state.activePosition]}
                onOpenProductDetails={this.onOpenProductDetails}
            />
        );
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <TopBar {...this.topBarConfig} />
                    <TopTabBar onTabChanged={this.onTabChanged} />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketScreen);
