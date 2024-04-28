import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../components/ChatRoomHeader'
import MessageList from '../components/MessageList'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from '../components/customkeyboardview'
import { useAuth } from '../context/authContext'
import { getRoomId } from '../components/utils/common'
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'


export default function ChatRoom() {
  const item = useLocalSearchParams()
  const {user}= useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const textRef=useRef('')
  const inputRef=useRef(null)
  const scroll=useRef(null)

  useEffect(()=>{
    createChatRoom()
    let roomId=getRoomId(user?.userId,item?.userId)
    const docRef=doc(db,'rooms',roomId)
    const messagesRef=collection(docRef,'messages')
    const q=query(messagesRef,orderBy('createdAt','asc'))

    let unsub=onSnapshot(q,(snapshot)=>{
      let allMessages=snapshot.docs.map(doc=>{
        return doc.data()
      })
      setMessages([...allMessages])
    })
    
    const keyboardView=Keyboard.addListener(
      'keyboardDidShow',updateScroll
    )
    return ()=>{
      unsub()
      keyboardView.remove()
    }

  },[])

  const createChatRoom=async()=>{
    let roomId=getRoomId(user?.userId,item?.userId)
    await setDoc(doc(db,'rooms',roomId),{
      roomId,
      createdAt:Timestamp.fromDate(new Date())
    })
    console.log('room: ',roomId)
  }

  const sendMessage=async()=>{
    let message=textRef.current.trim()
    if(!message){
      return 
    }
    try {
      let roomId=getRoomId(user?.userId,item?.userId)
      const docRef=doc(db,'rooms',roomId)
      const messagesRef=collection(docRef,'messages')
      textRef.current=""
      if(inputRef){
        inputRef?.current?.clear()
      }
      const newDoc=await addDoc(messagesRef,{
        userId:user?.userId,
        text:message,
        senderName:user?.username,
        createdAt:Timestamp.fromDate(new Date())
      })
      console.log("message id: ",newDoc.id)
    } 
    catch (error) {
      Alert.alert('Message ',error.message)
    }
  }

  

  useEffect(()=>{
    updateScroll()
  },[messages])

  const updateScroll=()=>{
    setTimeout(()=>{
      scroll?.current?.scrollToEnd({animated:false})
    },10)
  }

  return (
    <CustomKeyboardView inChat={true}>
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} currentUser={user} scroll={scroll} />
        </View>
        <View style={{ marginBottom: hp(2.5) }} className="pt-2">
          <View className="flex-row justify-between mx-3 bg-white border p-2 border-neutral-300 rounded-full pl-5">
            <TextInput
            ref={inputRef}
            onChangeText={value=>textRef.current=value}
              placeholder='Message'
              className="flex-1 mr-2"
              style={{ fontSize: hp(2) }}
            />
            <TouchableOpacity onPress={()=>sendMessage()} style={{ backgroundColor: '#f0f3f3', padding: 2, marginRight: 2, borderRadius: 10 }}>
              <Feather name="send" size={hp(4)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </CustomKeyboardView>
  )
}