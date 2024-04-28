import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function MessageItem({ message, currentUser }) {
    if (currentUser?.userId == message?.userId) {
        return (
            <View className="flex-row justify-end mb-2 mr-3 ">
                <View style={{ width: wp(80) }}>
                    <View className="flex self-end p-3 px-4 rounded-2xl bg-white border border-neutral-300">
                        <Text >
                            {message?.text}
                        </Text>
                    </View>

                </View>
            </View>
        )
    }
    else{
        return(
            <View style={{width:wp(80)}} className="ml-3 mb-2">
                <View className="flex self-start p-3 px-4 rounded-2xl bg-orange-200 border border-orange-300">
                    <Text>
                        {message?.text}
                    </Text>
                </View>

            </View>
        )
    }
}