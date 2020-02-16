import React from "react";
import { Platform, StatusBar, StyleSheet, View, Image, SafeAreaView } from "react-native";
import Touchable from '../../components/common/Touchable'
import { connect } from "react-redux";
import TopBar from "../../components/TopBar";
import Colors from "../../constants/Colors";
import Strings, { priceColumns } from "../../constants/Strings";
import { RegularText, MediumText, LightText } from "../../components/common/StyledText";

const tradeableCommodities = ["robusta", "arabica", "cotton", "rubber", "cocoa", "us_soybean_oil"];

class MarketPricesScreen extends React.Component {
    onBackPressed = () => this.props.navigation.pop();

    onCreateAlarm = () => {
        this.props.navigation.push("CreateAlarm", {
            product_name: this.props.navigation.getParam("product_name")
        });
    };

    onCreateOrder = () => {
        this.props.navigation.push("CreateOrder", {
            product_name: this.props.navigation.getParam("product_name")
        });
    };

    topBarConfig = {
        title: this.props.navigation.getParam("product_name")[0],
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    render() {
        const productName = this.props.navigation.getParam("product_name")[1];
        const data = this.props.pricesStore.prices[productName];
        let iceRows;
        try {
            iceRows = data.ice.map((row, index) => {
                const temp = [...row];
                const orderCount = temp.splice(7);
                temp[5] = orderCount[1] ? `${temp[5]}(${orderCount[1]})` : `${temp[5]}(0)`;
                temp[6] = orderCount[2] ? `${temp[6]}(${orderCount[2]})` : `${temp[6]}(0)`;

                if (!temp[2].toString().includes("+") && !temp[2].toString().includes("-")) {
                    temp[2] = row[7] ? `+${temp[2]}` : `-${temp[2]}`;
                }
                if (productName === "cotton") {
                    console.log(row[7])
                }
                return (
                    <Row
                        key={index}
                        rowData={temp}
                        changeTextStyle={styles.changeText}
                        changeTextWrapperStyle={styles.changeTextWrapper}
                        increaseStyle={row[7] ? styles.textWrapperIncrease : styles.textWrapperDecrease}
                    />
                );
            });
        } catch (error) {
            console.log(error);
        }
        let nybRows;
        try {
            nybRows = data.nyb.map((row, index) => {
                let temp;
                temp = [...row];
                const orderCount = temp.splice(7);

                temp[5] = orderCount[1] ? `${temp[5]}(${orderCount[1]})` : `${temp[5]}(0)`;
                temp[6] = orderCount[2] ? `${temp[6]}(${orderCount[2]})` : `${temp[6]}(0)`;
                if (!temp[2].toString().includes("+") && !temp[2].toString().includes("-")) {
                    temp[2] = row[7] ? `+${temp[2]}` : `-${temp[2]}`;
                }
                if (productName === "cotton") {
                    console.log(row[7])
                }
                return (
                    <Row
                        key={index}
                        rowData={temp}
                        changeTextStyle={styles.changeText}
                        changeTextWrapperStyle={styles.changeTextWrapper}
                        increaseStyle={row[7] ? styles.textWrapperIncrease : styles.textWrapperDecrease}
                    />
                );
            });
        } catch (error) {
            console.log(error);
        }
        return (
            <SafeAreaView style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <TopBar {...this.topBarConfig} />
                {iceRows ? (
                    <View style={styles.table}>
                        <MediumText style={styles.exchange}>London</MediumText>
                        <Row rowData={priceColumns} firstRowStyle={styles.firstRow} firstTextStyle={styles.firstText} />
                        {iceRows}
                    </View>
                ) : null}
                {nybRows ? (
                    <View style={styles.table}>
                        <MediumText style={styles.exchange}>New York</MediumText>
                        <Row rowData={priceColumns} firstRowStyle={styles.firstRow} firstTextStyle={styles.firstText} />
                        {nybRows}
                    </View>
                ) : null}
                {!iceRows && !nybRows ? (
                    <View style={styles.noDataWrapper}>
                        <RegularText>Đang cập nhật...</RegularText>
                    </View>
                ) : (
                    <View style={styles.bottomButtonsWrapper}>
                        <View style={styles.bottomButtons}>
                            <Touchable onPress={() => this.onCreateAlarm()}>
                                <View style={styles.alarmButton}>
                                    <Image
                                        style={styles.bottomButtonImage}
                                        source={require("../../assets/images/icons/ic-bottom-alarm.png")}
                                    />
                                    <LightText style={styles.buttonText}>{Strings.PRICES_PLACE_ALARM}</LightText>
                                </View>
                            </Touchable>
                            {/* {tradeableCommodities.includes(this.props.navigation.getParam("product_name")[1]) ? (
                                <Touchable onPress={() => this.onCreateOrder()}>
                                    <View style={[styles.createOrderButton]}>
                                        <Image
                                            style={styles.bottomButtonImage}
                                            source={require("../../assets/images/icons/ic-place-order.png")}
                                        />
                                        <LightText style={styles.buttonText}>{Strings.PRICES_PLACE_ORDER}</LightText>
                                    </View>
                                </Touchable>
                            ) : null} */}
                        </View>
                    </View>
                )}
            </SafeAreaView>
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
    return <View style={{ flexDirection: "row", marginBottom: 2 }}>{cells}</View>;
};

const Cell = props => {
    return (
        <View style={[styles.cell, props.firstRowStyle]}>
            <View style={[props.changeTextWrapperStyle, props.increaseStyle]}>
                <RegularText style={[styles.text, props.firstTextStyle, props.changeTextStyle]}>
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
        justifyContent: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketPricesScreen);
