import React from "react";
import { Platform, StyleSheet, StatusBar, View } from "react-native";
import MarketTab from "../../components/market/MarketTab";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";
import Strings, { commodityNames } from "../../constants/Strings";
import { connect } from "react-redux";
import getAllPrices from "../../store/actions/Prices";

const agriculture = [
    commodityNames.CA_PHE,
    commodityNames.COTTON,
    commodityNames.CAO_SU,
    commodityNames.CA_CAO
    // commodityNames.TIEU
];

class MarketScreen extends React.Component {
    componentDidMount() {
        this.props.fetchPrices();
    }

    onTabChanged = position => {
        console.log(position);
    };

    onOpenProductDetails = name => {
        console.log(name);
        this.props.navigation.push("PricesDetail", { product_name: name });
    };

    topBarConfig = {
        title: Strings.HEADER_MARKET,
        rightButtonLabel: Strings.HEADER_BUTTON_ALERT,
        rightImageSource: require("../../assets/images/icons/ic-alert.png")
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar {...this.topBarConfig} />
                <TopTabBar onTabChanged={this.onTabChanged} />
                <MarketTab
                    rows={agriculture}
                    onOpenProductDetails={this.onOpenProductDetails}
                />
            </View>
        );
    }
}

MarketScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
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
