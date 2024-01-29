import { useEffect, useState } from "react";
import { View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [takenImages, setTakenImages] = useState([]);
  useEffect(() => {
    const takenImageArr = async () => {
      let album = await MediaLibrary.getAlbumAsync("ImageTaken");
      if (album == null)
        album = await MediaLibrary.createAlbumAsync("ImageTaken");
      const imageFiles = await MediaLibrary.getAssetsAsync({
        album,
        mediaType: "photo",
      });
      const uriArr = imageFiles.assets.map((asset) => asset.uri);
      console.log(uriArr);
      return uriArr;
    };
    takenImageArr().then(setTakenImages);
  }, []);
  console.log(takenImages);
  return <View></View> 
}