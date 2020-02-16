import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MarketRow from "./MarketRow";

export default function(props) {
    const rows = props.rows.map((row, index) => (
        <MarketRow
            key={index}
            row={row}
            price={1234.56}
            isIncrease={false}
            change={3}
            onOpenProductDetails={props.onOpenProductDetails}
        />
    ));
    return (
        <View style={styles.container}>
            {/* {rows.length === 0 ? null : <MarketRow onPress={() => console.log("idiot")} isTitle={true} />} */}
            <MarketRow onPress={() => console.log("idiot")} isTitle={true} />
            {/* {rows} */}
            <FlatList
                style={styles.list}
                data={props.rows}
                isTitle={false}
                // removeClippedSubviews={false}
                renderItem={({item}) => <MarketRow row={item} onOpenProductDetails={props.onOpenProductDetails} />}
                keyExtractor={item => item[1] }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1
    }
});
