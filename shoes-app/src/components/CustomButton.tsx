import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      {props.isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.text}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 8,
  },
  text: {
    color: '#fff',
  }
});

export default CustomButton;