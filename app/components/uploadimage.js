import { View, Text,Image, TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function Uploadimage() {
    const checkForCameraRollPermission=async()=>{
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        //   alert("Please grant camera roll permissions inside your system's settings");
        }
        else{
          console.log('Media Permissions are granted')
        }
    }
    useEffect(()=>{
        checkForCameraRollPermission()
    },[])
    const [image,setImage]=useState(null)
    const addImage=async()=>{
        let _image=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        })
        console.log(JSON.stringify(_image));
            setImage(_image.uri)
    }
  return (
    <View style={styles.container}>
        {
            image && <Image source={{uri:image}} style={{width:40,height:40}}/>
        }
        <View>
            <TouchableOpacity onPress={addImage}
             style={styles.uploadbtn}
            >
                <Text>{image?'Edit':'Upload'}</Text>
                </TouchableOpacity>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        height:40,
        width:40,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadbtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        height:20,
        width:30,
    }
    
    
  })