import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';

// Firebase imports
import { getAuth, updateProfile } from 'firebase/auth';
import { FIREBASE_DB, storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

// Image Picker import
import * as ImagePicker from 'expo-image-picker'

// Icons imports
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

// BottomSheet imports
import "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'

// Main export default
export default function EditProfileScreen() {
const User = getAuth().currentUser;

const bottomSheetModalRef = useRef(null)
const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
const [hasCameraPermission, setHasCameraPermission] = useState(null)
const [image, setImage] = useState(User.photoURL)

// const [progress, setProgress] = useState(0);

// Instantly ask permission to photos and camera
useEffect(() =>{
  (async () => {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
    const cameraStatus = await ImagePicker.getCameraPermissionsAsync()

    setHasGalleryPermission(galleryStatus.status === 'granted')
    setHasCameraPermission(cameraStatus.status === 'granted')
  })()
}, [])

// Permissions
if(hasGalleryPermission === false){
  ImagePicker.requestMediaLibraryPermissionsAsync()
  
  setHasGalleryPermission(galleryStatus.status === 'granted')
}
if(hasCameraPermission === false){
  ImagePicker.getCameraPermissionsAsync()
  
  setHasCameraPermission(cameraStatus.status === 'granted')
}

// Upload Image to firestore
async function uploadImage(uri, fileType) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    // Storage place
    const storageRef = ref(storage, `Users/${User.uid}/ProfilePicture`);
    const uploadTask = uploadBytesResumable(storageRef, blob)

    // Listen for events
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        console.log('Error: ' + error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{
          // Save record
          await saveRecord(fileType, downloadURL, new Date().toISOString())
          await updateProfile(User, {photoURL: downloadURL})
        })
      }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Saving to storage //ЭТИ ДАННЫЕ ДОЛЖНЫ ДОБАВЛЯТЬСЯ ТОЛЬКО ПРИ СОЗДАНИИ НОВОГО АККАУНТА И БОЛЬШЕ НИКОГДА
async function saveRecord(fileType, url, createdAt){
  try {
    const docRef = doc(FIREBASE_DB, 'Users', User.uid)
    const result = await setDoc(docRef, {
      createdAt,
      user_ID: User.uid,
      fname: '',
      lname: '',
      email: User.email,
      fileType,
      url,
      films: [],
    }, { merge: true})

    console.log('Document saved correctly')
  } catch(error){
    console.log(error)
  }
}


// Photo/Image picker
const pickImageFromLibrary = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1
    });

    if (!result.cancelled) {
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, 'image');
    } else {
      handleCloseModal();
    }
  } catch (error) {
    console.log('Canceled by user: ' + error);
    handleCloseModal();
  }
}

const takePhotoFromCamera = async () => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, 'image');
    }
    handleCloseModal();
  } catch (error) {
    console.log('Canceled by user: ' + error);
    handleCloseModal();
  }
}

// BottomSheet
const snapPoints = ['58%']
function handlePresentModal(){
  bottomSheetModalRef.current?.present();
}
function handleCloseModal(){
  bottomSheetModalRef.current?.close();
}

function saveChanges() {
updateProfile(User, {
  // displayName: '',
  // photoURL: '',
})
}

  return (
    <GestureHandlerRootView style={Styles.container}>
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={handlePresentModal}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* ProfileImage */}
              <ImageBackground
                source={{uri: User.photoURL != null ? User.photoURL : image}}
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
          onPress={saveChanges}
        >
          <Text style={Styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
        {/* BottomSheet */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          imdex={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          style={{flex: 1, borderWidth:1, borderRadius: 15, borderColor: 'grey'}}
        >
          <View style={Styles.panel}>
            <Text style={Styles.panelTitle}>Upload Photo</Text>
            <Text style={Styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={Styles.panelButton} onPress={takePhotoFromCamera}>
              <Text style={Styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.panelButton} onPress={pickImageFromLibrary}>
              <Text style={Styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.panelButton} onPress={handleCloseModal}>
              <Text style={Styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </BottomSheetModal>
      </BottomSheetModalProvider>
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
    alignItems: 'center',
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
    width: '80%',
    padding: 13,
    borderRadius: 15,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginBottom: 20,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    width: '',
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    paddingLeft: 10,
    color: '#05375a',
  },
});
