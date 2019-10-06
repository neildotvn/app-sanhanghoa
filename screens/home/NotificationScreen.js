import React from "react";
import {
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import TopBar from "../../components/TopBar";
import NotificationRow from "../../components/noti/NotificationRow";
import * as actions from "../../store/actions/Notifications";
import Strings from "../../constants/Strings";
import { connect } from "react-redux";

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
            <View style={styles.container}>
                <TopBar title={Strings.HEADER_NOTI} />
                <ScrollView style={styles.notiContainer}>{notiRows}</ScrollView>
            </View>
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
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        backgroundColor: "#fff"
    },
    notiContainer: {
        padding: 12
    }
});
