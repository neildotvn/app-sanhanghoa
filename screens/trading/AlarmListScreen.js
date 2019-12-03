import React from "react";
import { ScrollView, StyleSheet, View, Modal, Text, Alert } from "react-native";
import TopBar from "../../components/TopBar";
import Strings from "../../constants/Strings";
import { connect } from "react-redux";
import AlarmInfo from "../../components/trading/AlarmInfo";
import ClosedOrder from "../../components/trading/ClosedOrder";
import YesNoPopup from "../../components//common/YesNoPopup";
import Colors from "../../constants/Colors";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-simple-toast";
import * as actions from "../../store/actions/Alarm";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

class AlarmListScreen extends React.Component {
    state = {
        modalVisible: false,
        selectedAlarmUid: ""
    };

    componentDidMount() {
        this.props.fetchAlarms();
    }

    componentDidUpdate() {
        if (this.props.alarmStore.delete_success) {
            Toast.show("Xoá tin báo thành công");
        }
        if (this.props.alarmStore.delete_error) {
            Toast.show("Xoá tin báo thất bại");
        }
    }

    onBackPressed = () => {
        this.props.navigation.pop();
    };

    onCreateAlarm = () => {
        this.props.navigation.push("CreateAlarm");
    };

    topBarConfig = {
        title: "TIN BÁO",
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
        // rightButtonLabel: "Thêm",
        // rightImageSource: require("../../assets/images/icons/ic-plus.png"),
        // onRightButtonPress: this.onCreateAlarm
    };

    onValueChange = (alarm_uid, value) => {
        value ? actions.enableAlarm(alarm_uid) : actions.disableAlarm(alarm_uid);
    };

    onAlarmLongPress = alarm_uid => {
        this.setState({ modalVisible: true, selectedAlarmUid: alarm_uid });
    };

    onPopupCancel = () => {
        this.setState({ modalVisible: false, selectedAlarmUid: "" });
    };

    onPopupOk = () => {
        this.props.deleteAlarm(this.state.selectedAlarmUid);
        this.setState({ modalVisible: false, selectedAlarmUid: "" });
    };

    render() {
        const alarms = this.props.alarmStore.alarms.map((alarm, index) => (
            <AlarmInfo
                onValueChange={this.onValueChange}
                onAlarmLongPress={this.onAlarmLongPress}
                key={index}
                alarm={alarm}
            />
        ));

        console.log(this.props.alarmStore.alarms);

        return (
            <View style={styles.container}>
                <Spinner visible={this.props.alarmStore.fetch_loading || this.props.alarmStore.delete_loading} />
                <TopBar {...this.topBarConfig} />
                <YesNoPopup
                    config={{
                        animationType: "fade",
                        transparent: true,
                        visible: this.state.modalVisible
                    }}
                    onPopupCancel={this.onPopupCancel}
                    onPopupOk={this.onPopupOk}
                    description={"Bạn muốn xoá tin báo?"}
                />
                <ScrollView style={styles.scrollView}>
                    <View styles={styles.openOrderContainer}>{alarms}</View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        alarmStore: state.alarmStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAlarms: () => dispatch(actions.fetchAlarms()),
        deleteAlarm: alarm_uid => dispatch(actions.deleteAlarm(alarm_uid))
    };
};

AlarmListScreen.navigationOptions = {
    header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmListScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
        // marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    scrollView: {
        padding: 20
    },
    balanceInfoContainer: {
        marginTop: 12
    },
    titleOpenOrderContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 36,
        backgroundColor: Colors.grey,
        marginTop: 16,
        marginBottom: 8
    },
    titleOpenOrder: {
        fontSize: 14,
        color: Colors.black3
    }
});
