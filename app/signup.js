import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from './components/loading';
import CustomKeyboardView from './components/customkeyboardview';
import { useAuth } from './context/authContext';

export default function SignUp() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const{register}=useAuth()
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const usernameRef=useRef("")

    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
            Alert.alert('Warning', "Please fill all the fields!")
            return
        }
        setLoading(true)

        let response=await register(emailRef.current,passwordRef.current,usernameRef.current)
        setLoading(false)
        console.log('got result:',response)
        if(!response.success){
            Alert.alert('Warning',response.msg)
        }
    }
    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(5), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <View className="items-center">
                    <Image style={{ height: hp(20) }} resizeMode='contain' source={require('../assets/images/signup.png')} />
                </View>

                <View className="gap-10">
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800" >Sign Up</Text>
                    {/* inputs*/}
                    <View className="gap-4">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                            <Octicons name="person" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => usernameRef.current = value}
                                style={{ fontSize: hp(2.5) }}
                                placeholder='Username'
                                placeholderTextColor={'gray'}
                                className="flex-1 font-semibold text-neutral-700" />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2.5) }}
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                                className="flex-1 font-semibold text-neutral-700" />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                            <Octicons name="key" size={hp(2.7)} color="gray" />
                            <TextInput
                                secureTextEntry
                                onChangeText={value => passwordRef.current = value}
                                style={{ fontSize: hp(2.5) }}
                                placeholder='Password'
                                placeholderTextColor={'gray'}
                                className="flex-1 font-semibold text-neutral-700" />
                        </View>
                        {/* submit button */}

                        <View>
                            {
                                loading ? (
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(6.5)} />
                                    </View>

                                ) : (
                                    <TouchableOpacity onPress={handleRegister}
                                        style={{
                                            backgroundColor: '#abf7b1',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: hp(7),
                                            borderRadius: 10,
                                        }} >
                                        <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">Sign Up</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>


                        {/* signup text */}
                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-700">Already have an account? </Text>
                            <Pressable onPress={() => router.push('signin')}>
                                <Text style={{ fontSize: hp(2) }} className="font-bold text-green-400">Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

        </CustomKeyboardView>
    )
}