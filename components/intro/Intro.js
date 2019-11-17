import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Image from 'react-native-scalable-image';
import Colors from "../../constants/Colors";

export default class Intro extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image
                        width={Dimensions.get('window').width} // height will be calculated automatically
                        source={this.props.top}
                    />
                </View>
                <View style={styles.botContainer}>
                    <Image
                        width={Dimensions.get('window').width} // height will be calculated automatically
                        source={this.props.bottom}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    topContainer: {
        backgroundColor: '#f00'
    },
    botContainer: {
        backgroundColor: '#0f0'
    },
    image: {
        width: '100%',
        height: undefined
    }
});
