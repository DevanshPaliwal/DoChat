import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function ImageUpload({router}) {

  const [image, setImage] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)
    if (!result.canceled) {
      setImage(result.uri)
    }
  }

  return (
    <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button style={styles.button} title='Pick an image' onPress={pickImage} />
      {
        image && <Image source={{ uri: image }} style={styles.image} />
      }
      <View style={styles.goback}>
        <TouchableOpacity style={styles.gobackbut} onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  
  goback:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gobackbut: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    backgroundColor: 'orange',
    width: 90,
    height: '40%',
    borderWidth: 1,
    borderRadius: 40,
  },
  button:{
    backgroundColor:'Yellow',
    borderRadius:4,
  },
})
