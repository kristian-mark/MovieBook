import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'

export default function EditProfileScreen() {
const User = getAuth().currentUser;

const bottomSheetModalRef = useRef(null)
const snapPoints = ['58%']

function handlePresentModal(){
  bottomSheetModalRef.current?.present();

}
  return (
    <GestureHandlerRootView style={Styles.container}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          imdex={0}
          snapPoints={snapPoints}
          backg
        >
          <View>
            <Text>Hello</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity omPress={() => {}}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* ProfileImage */}
              <ImageBackground
                source={User.photoURL != null ? User.photoURL : require('../../assets/no-profile-picture.png')}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}
              >
                {/* Camera Icon */}
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Icon name='camera' size={35} color='#fff' style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}/>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          {/* User Name */}
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'bold'
            }}>
            {User.displayName}
            </Text>
        </View>

        {/* First Name Input */}
        <View style={Styles.action}>
          <FontAwesome name='user-o' size={20} />
          <TextInput
            placeholder='First Name'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={Styles.textInput}
          />
        </View>

        {/* Last Name Input */}
        <View style={Styles.action}>
          <FontAwesome name='user-o' size={20} />
          <TextInput
            placeholder='Last Name'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={Styles.textInput}
          />
        </View>

        {/* Phone Number Input */}
        <View style={Styles.action}>
          <Feather name='phone' size={20} />
          <TextInput
            placeholder='Phone'
            placeholderTextColor='#666666'
            keyboardType='number-pad'
            autoCorrect={false}
            style={Styles.textInput}
          />
        </View>

        {/* Email Input */}
        <View style={Styles.action}>
          <FontAwesome name='envelope-o' size={20} />
          <TextInput
            placeholder='Email'
            placeholderTextColor='#666666'
            keyboardType='email-address'
            autoCorrect={false}
            style={Styles.textInput}
          />
        </View>

        {/* Country Input */}
        <View style={Styles.action}>
          <FontAwesome name='globe' size={20} />
          <TextInput
            placeholder='Counry'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={Styles.textInput}
          />
        </View>

        {/* City Input */}
        <View style={Styles.action}>
          <Icon name='map-marker-outline' size={20} />
          <TextInput
            placeholder='City'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={Styles.textInput}
          />
        </View>
        <TouchableOpacity
          style={Styles.commandButton}
          onPress={handlePresentModal}
        >
          <Text style={Styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
    
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347', //tomato
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    paddingLeft: 10,
    color: '#05375a',
  },
});