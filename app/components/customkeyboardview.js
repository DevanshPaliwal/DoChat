import { View, Text, Platform,KeyboardAvoidingView,ScrollView } from 'react-native'
import React from 'react'

const android=Platform.OS=='android'
export default function CustomKeyboardView({children,inChat}) {
  let kav={}
  let scrollViewConfig={}
  if(inChat){
    kav={
      keyboardVerticalOffset:80
    }
    scrollViewConfig={
      contentContainerStyle:{flex:1}
    }
  }
  return (
    <KeyboardAvoidingView
    behavior={android?'height':'padding'}
    style={{flex:1}}
    {...kav}
    
    >
        <ScrollView style={{flex:1}}
        bounces={false}
        {...scrollViewConfig}
        showsVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}