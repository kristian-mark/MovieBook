/* components/Loading.js */
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

/**
 * This Component will show a circular loading 
 * indicator in the center of the screen while the servises.js 
 * functions are fetching the data from TMDB.
*/

const Loading = () => {
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'rgb(21,21,21)',
      }}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={{ color: 'black', alignSelf: 'center' }}>
        loading too long? setup api keys in config/const.js ...
      </Text>
    </View>
  );
};

export default Loading;
