import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * screen, navigation.pop() removes the topmost screen from Navigation
 *Stack and takes us back, in this case, HomeScreen.
*/

export default BackButton = ({ navigation, color }) => {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.pop()}>
      <Ionicons name="md-arrow-back" size={25} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        left: 15,
        // top: 5,
        zIndex: 100,
        width: 30,
        height: 30,
        // backgroundColor: 'rgba(21,21,21,0.5)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// export default BackButton;