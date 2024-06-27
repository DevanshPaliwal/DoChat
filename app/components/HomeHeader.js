import { View, Text, Platform } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blurhash } from './utils/common';
import { useAuth } from '../context/authContext';
import { MenuItem } from './custommenuitems';
import { useRouter } from 'expo-router'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { Octicons } from '@expo/vector-icons';




const android = Platform.OS == 'android'

export default function HomeHeader() {
    const { user,logout } = useAuth()
    const { top } = useSafeAreaInsets()

    const router=useRouter()
    const handleProfile=()=>{
        router.push({pathname:'../ImageUpload'})
    }

    const handleLogout=async()=>{
        await logout()
    }

    return (
        <View style={{ paddingTop: android ? top + 10 : top }} className="flex-row justify-between px-5 bg-orange-400 pb-6 rounded-b-3xl shadow">
            <View>
                <Text style={{ fontSize: hp(3) }} className="font-bold text-white" >Chats</Text>
            </View>

            <View>
            <Menu>
                <MenuTrigger>
                    {/* <Uploadimage/> */}
                <Octicons name="person" size={hp(4.2)} color="white" />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionsContainer:{
                        borderRadius:10,
                        marginTop:20,
                        marginLeft:-10,
                        backgroundColor:'white',
                        width:130,

                    }
                  }}
                >
                    
                    <MenuItem
                    text="Profile"
                    action={handleProfile}
                    value={null} 
                    icon={<Octicons name="person" size={hp(2.5)} color="black"/>}
                     />
                     <Divider/>
                     <MenuItem
                    text="Logout"
                    action={handleLogout}
                    value={null} 
                    icon={<Octicons name="sign-out" size={hp(2.5)} color="black"/>}
                     />
                </MenuOptions>
            </Menu>
                
            </View>
        </View>
    )
}

const Divider=()=>{
    return(
        <View className="p-[1px] w-full bg-neutral-200"/>
    )
}