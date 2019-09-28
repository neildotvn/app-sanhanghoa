import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import MarketRow from "../../components/market/MarketRow";

export default function(props) {
    return (
        <View style={styles.container}>
            <MarketRow isTitle={true} />
            <MarketRow
                title={"khô đậu tương"}
                price={1234.56}
                isIncrease={true}
                change={2}
            />
            <MarketRow
                title={"DẦU ĐẬU TƯƠNG"}
                price={1234.56}
                isIncrease={false}
                change={3}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
