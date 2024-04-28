import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {router} from 'expo-router';
import Loading from './components/loading';
import CustomKeyboardView from './components/customkeyboardview';
import { useAuth } from './context/authContext';

export default function SignIn() {
   
    const [loading, setLoading] = useState(false)

    const emailRef = useRef("")
    const passwordRef = useRef("")
    const { login } = useAuth()

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Warning', "Please fill all the fields!")
            return
        }
        //login process
        setLoading(true)
        const response = await login(emailRef.current, passwordRef.current)
        setLoading(false)
        // console.log('sign in response: ',response)
        if (!response.success) {
            Alert.alert('Warning', response.msg)
        }
    }
    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <View className='items-center'>
                    <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.jpg')} />
                </View>

                <View className="gap-10">
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800" >Sign In</Text>
                    {/* inputs*/}
                    <View className="gap-4">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2.5) }}
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                                className="flex-1 font-semibold text-neutral-700" />
                        </View>
                        <View className="gap-3">
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
                            <Text style={{ fontSize: hp(2) }} className="font-semibold text-right text-neutral-600">Forgot Password?</Text>
                        </View>
                        {/* submit button */}

                        <View>
                            {
                                loading ? (
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(6.5)} />
                                    </View>

                                ) : (
                                    <TouchableOpacity onPress={handleLogin}
                                        style={{
                                            backgroundColor: '#ffb76b',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: hp(7),
                                            borderRadius: 10,
                                        }} >
                                        <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">Sign In</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>


                        {/* signup text */}
                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-700">Dont have an account? </Text>
                            <Pressable onPress={() => router.push('signup')}>
                                <Text style={{ fontSize: hp(2) }} className="font-bold text-orange-400">Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

        </CustomKeyboardView>
    )
}