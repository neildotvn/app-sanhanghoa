import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import Touchable from '../common/Touchable'
import { MediumText } from "./StyledText";
import Colors from "../../constants/Colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function(props) {
    return (
        <Modal {...props.config}>
            <Touchable onPress={() => props.onPopupCancel()}>
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <View style={styles.description}>
                            <MediumText style={styles.descriptionText}>{props.description}</MediumText>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Touchable onPress={() => props.onPopupOk()}>
                                <View style={styles.button}>
                                    <MediumText style={styles.okText}>Đồng ý</MediumText>
                                </View>
                            </Touchable>
                            <Touchable onPress={() => props.onPopupCancel()}>
                                <View style={styles.button}>
                                    <MediumText style={styles.cancelText}>Huỷ</MediumText>
                                </View>
                            </Touchable>
                        </View>
                    </View>
                </View>
            </Touchable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackOpacity(0.5),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        flex: 1,
        padding: 24,
        height: 150,
        maxWidth: wp(60),
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 8
    },
    description: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16
    },
    descriptionText: {
        color: Colors.black3
    },
    buttonsContainer: {
        height: 40,
        flexDirection: "row"
    },
    button: {
        flex: 1
    },
    okText: {
        textAlign: "center"
    },
    cancelText: {
        textAlign: "center",
        color: "#c00"
    }
});
