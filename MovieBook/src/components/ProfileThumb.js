/* components/ProfileThumb.js */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

/** 
 * ProfileThumb is rendered in MovieScreen FlatList, 
 * it is used to render both, Cast's ThumbNail and Crew's ThumbNail.
 * It takes "item" prop, which has the data about a person,
 * 
 * In this component, we are just rendering their thumbnail image and 
 * name.
 * You can extend its functionality, let's say, click on thumbnail and
 * navigate to a new screen showing their filmography. 
 * Very simple to implement.
*/

const ProfileThumb = ({ item }) => {
  return (
    <View style={styles.profileThumb}>
      <>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w342${item?.profile_path}`,
          }}
          style={styles.crewImages}
        />
      </>
      <View style={styles.nameCard}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </View>
  );
};

export default ProfileThumb;

const styles = StyleSheet.create({
  crewImages: {
    width: 130,
    height: 150,
    borderColor: 'black',
  },

  profileThumb: {
    width: 130,
    height: 150,
    flexDirection: 'column',
    backgroundColor: '#212121',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 5,
    overflow: 'hidden',
  },
  nameCard: {
    position: 'absolute',
    width: '100%',
    left: 0,
    // right: 0,
    // bottom: 0,
    top: 100,
    backgroundColor: 'rgba(0,0,0, 0.35)',
    paddingVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    left: 5,
    bottom: 3
  },
});
