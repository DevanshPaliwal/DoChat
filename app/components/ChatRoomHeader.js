import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Stack, router} from 'expo-router'
import {Entypo,Octicons,Ionicons} from '@expo/vector-icons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function ChatRoomHeader({user,router}) {
  return (
    <Stack.Screen 
        options={{
            title:'',
            headerShadowVisible:false,
            headerLeft:()=>{
            return (
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={()=>{
                        router.back()
                    }}>
                        <Entypo name="chevron-left" size={hp(4)} color='#737373'/>
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3">
                        <Octicons name="person" size={hp(4)} color="#737373" />
                        <Text style={{fontSize:hp(3.1)}} className="text-neutral-700 font-bold">{user?.username}</Text>
                    </View>
                </View>
            )
        },
        headerRight:()=>{
           return(
            <View className="flex-row items-center gap-5">
                <Ionicons name="call" size={hp(2.8)} color='#737373'/>
                <Ionicons name="videocam" size={hp(2.8)} color='#737373'/>
            </View>
           ) 
        }
        }}
    />
  )
}