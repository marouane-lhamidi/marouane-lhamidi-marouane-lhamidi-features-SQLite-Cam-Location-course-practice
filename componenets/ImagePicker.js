import React,{useState} from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const ImgPicker = props => {
  const [tokeImage, setTokeImage] = useState('');



  const takeImageHandler = async () => {
    const hasPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!hasPermission) {
        return;
    }
     const ourImage =await ImagePicker.launchCameraAsync({
       allowsEditing : true,
       aspect : [16, 9],
       quality : 0.5
     });
    setTokeImage(ourImage.uri);
    props.Imagetaken(ourImage.uri)
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!tokeImage ?<Text>No image picked yet.</Text> :
          <Image style={styles.image} source={{uri : tokeImage}}/>}
      </View>
      <View style={styles.button}>
        <Button
            title="Take Image"
            onPress={takeImageHandler}
        />

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button : {
    marginVertical: 10,
  }
});

export default ImgPicker;
