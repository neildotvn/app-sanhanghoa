import React from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    TouchableNativeFeedback,
    Image
} from "react-native";
import { connect } from "react-redux";
import TopBar from "../../components/TopBar";
import Colors from "../../constants/Colors";
import Strings, { priceColumns } from "../../constants/Strings";
import { commodityMap } from "../../constants/CommodityMap";
import {
    RegularText,
    MediumText,
    LightText
} from "../../components/common/StyledText";

class MarketPricesScreen extends React.Component {
    // magic numbers: 1,2,6,7,11,13 - map data from tincaphe.com
    magicNumbers = [1, 2, 6, 7, 11, 13];

    mapData() {
        const prices = this.props.pricesStore.prices;
        const name = this.props.navigation.getParam("product_name");
        let thisCom;
        for (const commodity of commodityMap) {
            if (commodity.name === name) {
                thisCom = { ...commodity };
                break;
            }
        }
        let dataICE = [];
        let dataNYB = [];
        try {
            dataICE = thisCom.ice.map((rowNumber, index) => {
                const rawData = prices[rowNumber].vs;
                const processedData = rawData.filter((data, index) =>
                    this.magicNumbers.includes(index)
                );
                processedData.push(rawData[5] == "+");
                let change = processedData[1];
                if (!Number.isInteger(change)) {
                    change = change.toFixed(2);
                }
                processedData[1] = `${rawData[5]}${change}`;
                processedData.unshift(thisCom.iceTerms[index]);
                return processedData;
            });
        } catch (err) {
            console.log(err);
        }
        try {
            dataNYB = thisCom.nyb.map((rowNumber, index) => {
                const rawData = prices[rowNumber].vs;
                const processedData = rawData.filter((data, index) =>
                    this.magicNumbers.includes(index)
                );
                processedData.push(rawData[5] == "+");
                let change = processedData[1];
                if (!Number.isInteger(change)) {
                    change = change.toFixed(2);
                }
                processedData[1] = `${rawData[5]}${change}`;
                processedData.unshift(thisCom.nybTerms[index]);
                return processedData;
            });
        } catch (err) {
            console.log(err);
        }
        return { dataICE, dataNYB };
    }

    onBackPressed = () => this.props.navigation.pop();

    onCreateAlarm = () => {
        console.log("alarm");
    };

    onCreateOrder = () => {
        this.props.navigation.push("CreateOrder", {
            product_name: this.props.navigation.getParam("product_name")
        });
    };

    topBarConfig = {
        title: this.props.navigation.getParam("product_name"),
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    render() {
        const data = this.mapData();
        const iceRows = data.dataICE.map((data, index) => {
            const temp = [...data];
            temp.pop();
            return (
                <Row
                    key={index}
                    rowData={temp}
                    changeTextStyle={styles.changeText}
                    changeTextWrapperStyle={styles.changeTextWrapper}
                    increaseStyle={
                        data[7]
                            ? styles.textWrapperIncrease
                            : styles.textWrapperDecrease
                    }
                />
            );
        });
        const nycRows = data.dataNYB.map((data, index) => {
            const temp = [...data];
            temp.pop();
            return (
                <Row
                    key={index}
                    rowData={temp}
                    changeTextStyle={styles.changeText}
                    changeTextWrapperStyle={styles.changeTextWrapper}
                    increaseStyle={
                        data[7]
                            ? styles.textWrapperIncrease
                            : styles.textWrapperDecrease
                    }
                />
            );
        });
        return (
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <TopBar {...this.topBarConfig} />
                {iceRows.length > 0 ? (
                    <View style={styles.table}>
                        <MediumText style={styles.exchange}>London</MediumText>
                        <Row
                            rowData={priceColumns}
                            firstRowStyle={styles.firstRow}
                            firstTextStyle={styles.firstText}
                        />
                        {iceRows}
                    </View>
                ) : null}
                {nycRows.length > 0 ? (
                    <View style={styles.table}>
                        <MediumText style={styles.exchange}>
                            New York
                        </MediumText>
                        <Row
                            rowData={priceColumns}
                            firstRowStyle={styles.firstRow}
                            firstTextStyle={styles.firstText}
                        />
                        {nycRows}
                    </View>
                ) : null}
                {iceRows.length === 0 && nycRows.length === 0 ? (
                    <View style={styles.noDataWrapper}>
                        <RegularText>Đang cập nhật...</RegularText>
                    </View>
                ) : (
                    <View style={styles.bottomButtonsWrapper}>
                        <View style={styles.bottomButtons}>
                            {/* <TouchableNativeFeedback
                                onPress={() => this.onCreateAlarm()}
                            >
                                <View style={styles.alarmButton}>
                                    <Image
                                        style={styles.bottomButtonImage}
                                        source={require("../../assets/images/icons/ic-bottom-alarm.png")}
                                    />
                                    <LightText style={styles.buttonText}>
                                        {Strings.PRICES_PLACE_ALARM}
                                    </LightText>
                                </View>
                            </TouchableNativeFeedback> */}
                            <TouchableNativeFeedback
                                onPress={() => this.onCreateOrder()}
                            >
                                <View style={[styles.createOrderButton]}>
                                    <Image
                                        style={styles.bottomButtonImage}
                                        source={require("../../assets/images/icons/ic-place-order.png")}
                                    />
                                    <LightText style={styles.buttonText}>
                                        {Strings.PRICES_PLACE_ORDER}
                                    </LightText>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const Row = props => {
    const cells = props.rowData
        ? props.rowData.map((data, index) => (
              <Cell
                  position={index}
                  key={index}
                  data={data}
                  firstRowStyle={props.firstRowStyle}
                  firstTextStyle={props.firstTextStyle}
                  changeTextStyle={index === 2 ? props.changeTextStyle : null}
                  changeTextWrapperStyle={
                      index === 2
                          ? {
                                ...props.changeTextWrapperStyle,
                                ...props.increaseStyle
                            }
                          : null
                  }
              />
          ))
        : null;
    return (
        <View style={{ flexDirection: "row", marginBottom: 2 }}>{cells}</View>
    );
};

const Cell = props => {
    return (
        <View style={[styles.cell, props.firstRowStyle]}>
            <View style={[props.changeTextWrapperStyle, props.increaseStyle]}>
                <RegularText
                    style={[
                        styles.text,
                        props.firstTextStyle,
                        props.changeTextStyle
                    ]}
                >
                    {props.data}
                </RegularText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
        // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    table: {
        alignSelf: "stretch",
        flexDirection: "column",
        marginTop: 5
    },
    exchange: {
        color: Colors.midBlue,
        fontSize: 14,
        marginStart: 10,
        marginTop: 5,
        marginBottom: 5
    },
    cell: {
        flex: 1,
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fbfbfb"
    },
    text: { fontSize: 12 },
    firstRow: {
        height: 24,
        backgroundColor: "white"
    },
    firstText: {
        fontSize: 12,
        color: Colors.midBlueOpacity(0.5)
    },
    changeTextWrapper: {
        height: 24,
        flex: 1,
        maxWidth: 58,
        margin: 4,
        borderRadius: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textWrapperIncrease: {
        backgroundColor: Colors.increase
    },
    textWrapperDecrease: {
        backgroundColor: Colors.decrease
    },
    changeText: {
        color: "white"
    },
    noDataWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    noDataText: {
        fontSize: 14,
        color: Colors.blackOpacity(0.5)
    },
    bottomButtonsWrapper: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    bottomButtons: {
        height: 48,
        backgroundColor: Colors.grey,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    alarmButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    createOrderButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        width: 0,
        backgroundColor: "white"
    },
    bottomButtonImage: {
        height: 30,
        width: 30
    },
    buttonText: {
        fontSize: 8,
        color: Colors.midBlue
    }
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
)(MarketPricesScreen);
