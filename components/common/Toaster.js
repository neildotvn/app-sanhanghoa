import Toast, {DURATION} from 'react-native-easy-toast'

export default Toaster = React.forwardRef((props, ref) => (
    <View>
        <Toast ref={ref} />
    </View>
))