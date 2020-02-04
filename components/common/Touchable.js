import {TouchableNativeFeedback, TouchableHighlight} from 'react-native';

export default function(props) {
    return (
        <TouchableNativeFeedback>
            {props.children}
        </TouchableNativeFeedback>
    )
}