import React from "react";
import { ScrollView, StyleSheet, View, SafeAreaView, Text, Alert } from "react-native";
import TopBar from "../../components/TopBar";
import Strings from "../../constants/Strings";
import { connect } from "react-redux";
import AlarmInfo from "../../components/trading/AlarmInfo";
import Loading from "../../components/common/Loading";
import NoData from "../../components/common/NoData";
import YesNoPopup from "../../components//common/YesNoPopup";
import Colors from "../../constants/Colors";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-easy-toast";
import * as actions from "../../store/actions/Alarm";

class AlarmListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
    }
    
    state = {
        modalVisible: false,
        selectedAlarmUid: ""
    };

    componentDidMount() {
        this.props.fetchAlarms();
    }

    componentDidUpdate() {
        if (this.props.alarmStore.delete_success) {
            this.toast.current.show("Xoá tin báo thành công");
        }
        if (this.props.alarmStore.delete_error) {
            this.toast.current.show("Xoá tin báo thất bại");
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

        const main = (
            alarms.length === 0 ? <NoData text="Bạn chưa cài đặt tin báo!{{br}}Vui lòng cài đặt trong chi tiết mặt hàng!" /> :
            <React.Fragment>
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
            </React.Fragment>
        );

        return (
            <SafeAreaView style={styles.container}>
                <TopBar {...this.topBarConfig} />
                <Spinner visible={this.props.alarmStore.delete_loading} />
                {this.props.alarmStore.fetch_loading ? <Loading /> : main}
                <Toast ref={this.toast} />
            </SafeAreaView>
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
