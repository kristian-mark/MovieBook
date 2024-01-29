import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Loading = () => {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={{ color: 'black', alignSelf: 'center' }}>
        loading too long? Maybe we don't have this film yet ...
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <IonIcon
          onPress={() => navigation.navigate('Search')}
          name="arrow-back"
          size={25}
          style={{ color: 'black' }}
        />
        <Text style={{ color: 'black', marginLeft: 5 }}>Go back</Text>
      </View>
    </View>
  );
};

export default Loading;