import React from "react";
import {
    StyleSheet,
    SafeAreaView
} from "react-native";
import TopBar from "../../components/TopBar";
import NotificationRow from "../../components/noti/NotificationRow";
import Loading from '../../components/common/Loading';
import NoData from '../../components/common/NoData';
import * as actions from "../../store/actions/Notifications";
import Strings from "../../constants/Strings";
import { connect } from "react-redux";
import { RegularText } from "../../components/common/StyledText";
import Colors from "../../constants/Colors";

class NotificationScreen extends React.Component {
    componentDidMount() {
        console.log("Component Did Mount!!");
        this.props.fetchAll();
    }

    render() {
        const notis = this.props.notiStore.notifications;
        console.log("rendering ", notis);
        const notiRows = notis.map((noti, index) => (
            <NotificationRow
                key={index}
                title={noti.title}
                read={noti.status === 1}
                description={noti.description}
            />
        ));

        return (
            <SafeAreaView style={styles.container}>
                <TopBar title={Strings.HEADER_NOTI} />
                {/* <ScrollView style={styles.notiContainer}>{notiRows}</ScrollView> */}
                {(() => {
                    if (this.props.notiStore.loading) return <Loading />
                    if (this.props.notiStore.error) return <NoData />
                    if (this.props.notiStore.notifications.length === 0) return <NoData text="Bạn chưa có thông báo!" />
                })()}
            </SafeAreaView>
        );
    }
}

NotificationScreen.navigationOptions = {
    header: null
};

const mapStateToProps = state => {
    return {
        notiStore: state.notiStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAll: () => dispatch(actions.fetAllNotis())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    notiContainer: {
        padding: 12
    },
    textContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 14,
        color: Colors.blackOpacity(0.8)
    }
});
