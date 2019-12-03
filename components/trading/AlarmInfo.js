import React from "react";
import { StyleSheet, View, TouchableNativeFeedback, Switch } from "react-native";
import { RegularText, MediumText, BoldText } from "../common/StyledText";
import Colors from "../../constants/Colors";
import { parseTime } from "../../utils/TimeUtils";
import { getProductNameFromCode } from "../../constants/CommodityMap";

export default class AlarmInfo extends React.Component {
    state = {
        isActive: false
    };

    componentDidMount() {
        this.setState({ isActive: this.props.alarm.status === 0 });
    }

    onValueChange = value => {
        this.setState({ isActive: value });
        this.props.onValueChange(this.props.alarm.alarm_uid, value);
    };

    render() {
        return (
            <TouchableNativeFeedback onLongPress={() => this.props.onAlarmLongPress(this.props.alarm.alarm_uid)}>
                <View style={styles.container}>
                    <View style={styles.secondaryContainer}>
                        <View styles={styles.leftContainer}>
                            <BoldText style={styles.productInfo}>
                                {getProductNameFromCode(this.props.alarm.product)}
                            </BoldText>
                            <BoldText style={styles.productInfo}>{this.props.alarm.exchange}</BoldText>
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.timeAndPriceContainer}>
                                <RegularText style={styles.time}>{parseTime(this.props.alarm.created_at)}</RegularText>
                                <BoldText style={styles.price}>{this.props.alarm.price}</BoldText>
                            </View>
                            <View style={styles.switchContainer}>
                                <Switch
                                    trackColor={{ false: "#8c8c8c", true: Colors.midBlue }}
                                    thumbColor={"#fff"}
                                    value={this.state.isActive}
                                    onValueChange={value => this.onValueChange(value)}
                                />
                            </View>
                        </View>
                    </View>
                    {this.props.alarm.description ? (
                        <RegularText style={styles.description}>{this.props.alarm.description}</RegularText>
                    ) : null}
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: Colors.midBlue,
        borderBottomWidth: 0.5,
        paddingBottom: 8,
        marginBottom: 12
    },
    secondaryContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    leftContainer: {
        flexDirection: "column"
    },
    rightContainer: {
        flexDirection: "row"
    },
    timeAndPriceContainer: {
        flexDirection: "column",
        alignItems: "flex-end"
    },
    switchContainer: {
        marginStart: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    productInfo: {
        fontSize: 14,
        color: Colors.black3
    },
    time: {
        color: "#8C8C8C",
        fontSize: 14
    },
    price: {
        color: Colors.midBlue,
        fontSize: 16
    },
    description: {
        fontSize: 14,
        color: "#8c8c8c"
    }
});
