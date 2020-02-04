import React from "react";
import { View, StyleSheet, Image, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";
import TopBar from "../../components/TopBar";
import Spinner from "react-native-loading-spinner-overlay";
import Strings from "../../constants/Strings";
import { RegularText, MediumText } from "../../components/common/StyledText";
import MultipleSelect from "../../components/common/MultipleSelect";
import Colors from "../../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-easy-toast";
import * as actions from "../../store/actions/Alarm";

class CreateAlarmScreen extends React.Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
    }

    state = {
        termOptions: [],
        data: {
            ice: [],
            nyb: []
        },
        alarm: {
            price: 0,
            description: ""
        },
        selectedTermOption: 0
    };

    componentDidMount() {
        const args = this.props.navigation.getParam("product_name");
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
        const alarm = { ...this.state.alarm };
        alarm.exchange = termOptions[0].value;
        const rowData = [...data.ice, ...data.nyb][0];
        const currentPrice = rowData[1];
        alarm.price = currentPrice + 1;
        alarm.product = name;
        this.setState({ termOptions, data, alarm });
    }

    componentDidUpdate() {
        if (this.props.alarmStore.create_success) {
            this.toast.current.show("Tạo tin báo thành công");
            this.props.navigation.pop();
        }
        if (this.props.alarmStore.create_error) {
            this.toast.current.show("Tạo tin báo thất bại");
        }
    }

    onBackPressed = () => {
        this.props.navigation.pop();
    };

    onTermSelect = (position, value) => {
        const alarm = { ...this.state.alarm };
        alarm.exchange = value;
        this.setState({ selectedTermOption: position, alarm });
    };

    onAlarmPriceChange = price => {
        const alarm = { ...this.state.alarm };
        alarm.price = Number(price);
        this.setState({ alarm });
    };

    onAlarmDescriptionChange = description => {
        const alarm = { ...this.state.alarm };
        alarm.description = description;
        this.setState({ alarm });
    };

    onCreateAlarm = () => {
        const alarm = { ...this.state.alarm };
        const currentPrice = this.mapPrice();
        alarm.alarm_type = alarm.price < currentPrice ? 1 : 0;
        console.log(alarm);
        this.props.onCreateAlarm(alarm);
    };

    mapPrice = () => {
        let currentPrice;
        try {
            const data = [...this.state.data.ice, ...this.state.data.nyb];
            const rowData = data[this.state.selectedTermOption];
            currentPrice = rowData[1];
        } catch (err) {
            console.log("CreateAlarmScreen", err);
        }
        console.log(`currentPrice = ${currentPrice}`);
        return currentPrice;
    };

    topBarConfig = {
        title: this.props.navigation.getParam("product_name")[0],
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    render() {
        const currentPrice = this.mapPrice();

        return (
            <View style={styles.container}>
                <Spinner visible={this.props.alarmStore.create_loading} />
                <TopBar {...this.topBarConfig} />
                <View style={styles.secondaryContainer}>
                    <RegularText style={styles.termTitle}>{Strings.ORDER_TERM}</RegularText>
                    <MultipleSelect
                        values={this.state.termOptions}
                        selected={this.state.selectedTermOption}
                        onSelect={this.onTermSelect}
                    />
                    <RegularText style={styles.priceTitle}>Giá hiện tại</RegularText>
                    <MediumText style={styles.price}>{currentPrice}</MediumText>
                    <RegularText style={styles.alarmPriceTitle}>Cài đặt tin báo</RegularText>
                    <View style={styles.alarmPriceContainer}>
                        <Image
                            style={styles.icon}
                            source={
                                currentPrice < this.state.alarm.price
                                    ? require("../../assets/images/icons/ic-up-arrow-blue.png")
                                    : require("../../assets/images/icons/ic-down-arrow-blue.png")
                            }
                        />
                        <TextInput
                            keyboardType="numeric"
                            fontFamily="medium"
                            style={styles.alarmPriceInput}
                            onChangeText={text => this.onAlarmPriceChange(text)}
                            value={this.state.alarm.price.toString()}
                        />
                        {/* <View style={styles.icon}></View> */}
                    </View>
                    <RegularText style={styles.descriptionTitle}>Thêm ghi chú (Tuỳ chọn)</RegularText>
                    <TextInput
                        style={styles.description}
                        placeholder={"Nội dung ghi chú"}
                        onChangeText={text => this.onAlarmDescriptionChange(text)}
                        placeholderTextColor={"#8C8C8C"}
                        textAlign={"center"}
                        maxLength={70}
                    />
                    <View style={styles.descriptionBottomLine}></View>
                    <TouchableNativeFeedback onPress={() => this.onCreateAlarm()}>
                        <View style={styles.createAlarmButton}>
                            <MediumText style={styles.buttonText}>Tạo tin báo</MediumText>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <Toast ref={this.toast} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    secondaryContainer: {
        padding: 20
    },
    termTitle: {
        marginBottom: 12,
        textAlign: "center"
    },
    priceTitle: {
        textAlign: "center",
        marginTop: 20
    },
    price: {
        fontSize: 20,
        textAlign: "center",
        color: Colors.midBlue,
        marginTop: 12
    },
    alarmPriceContainer: {
        height: 40,
        marginTop: 12,
        borderColor: Colors.midBlue,
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    alarmPriceTitle: {
        textAlign: "center",
        marginTop: 20
    },
    descriptionTitle: {
        textAlign: "center",
        marginTop: 20
    },
    description: {
        marginTop: 12
    },
    descriptionBottomLine: {
        height: 0.5,
        backgroundColor: Colors.midBlue,
        marginTop: 4
    },
    alarmPriceInput: {
        marginStart: 8,
        marginEnd: 8,
        fontSize: 20,
        color: Colors.midBlue
    },
    icon: {
        height: 18,
        width: 18
    },
    createAlarmButton: {
        marginTop: 32,
        height: 40,
        backgroundColor: Colors.midBlue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },
    buttonText: {
        fontSize: 14,
        color: "#fff"
    }
});

const mapStateToProps = state => {
    return {
        pricesStore: state.pricesStore,
        alarmStore: state.alarmStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateAlarm: alarm => dispatch(actions.createAlarm(alarm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlarmScreen);
