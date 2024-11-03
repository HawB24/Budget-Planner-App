import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function CategoryDetail() {
    const {categoryId}=useLocalSearchParams();
    useEffect(()=>{
    console.log(categoryId)
}, [categoryId])
    return (    
        <View>
            <Text></Text>
        </View>
    )
}