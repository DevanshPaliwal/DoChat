import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Octicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router'
import { formatDate, getRoomId } from './utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({item,noBorder,currentUser}) {
  const [lastMessage,setlastMessage]=useState(undefined)
  useEffect(()=>{
    let roomId=getRoomId(currentUser?.userId,item?.userId)
    const docRef=doc(db,'rooms',roomId)
    const messagesRef=collection(docRef,'messages')
    const q=query(messagesRef,orderBy('createdAt','desc'))

    let unsub=onSnapshot(q,(snapshot)=>{
      let allMessages=snapshot.docs.map(doc=>{
        return doc.data()
      })
      setlastMessage(allMessages[0]?allMessages[0]:null)
    })
    return unsub
  },[])


  const router = useRouter()
  const openChatRoom=()=>{
    router.push({pathname:'/chatRoom',params:item})
  }

  const renderTime=()=>{
    if(lastMessage){
      let date=lastMessage?.createdAt
      return formatDate(new Date(date?.seconds * 1000))
    }
  }

  const renderLastMessage=()=>{
    if(typeof lastMessage=='undefined'){
      return 'loading...'
    }
      if(lastMessage){
        if(currentUser?.userId==lastMessage?.userId){
          return "You: "+lastMessage?.text
        }
        return lastMessage?.text
      }
      else{
        return "Type a message..."
      }
    }

  return (
    //error
    <TouchableOpacity onPress={openChatRoom} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:4,gap:5,
    marginBottom:6,paddingBottom:8,borderBottomColor:'black',borderBottomWidth:0.3,paddingHorizontal:8
  }} >
        <Octicons name="person" size={hp(5)} color="grey" />
        {/* name and last message */}
        <View style={{flex:1,gap:1}}>
            <View className="flex-row justify-between">
                <Text style={{fontSize:hp(2.7)}} className="font-bold text-black">{item?.username}</Text>
                <Text style={{fontSize:hp(2.2)}} className="font-normal text-neutral-600">{renderTime()}</Text>
            </View>
            <Text style={{fontSize:hp(1.9),fontWeight:'600'}} className="font-normal text-neutral-500">{renderLastMessage()}</Text>
        </View>
    </TouchableOpacity>
  )
}