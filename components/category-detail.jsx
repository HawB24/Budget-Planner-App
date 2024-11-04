import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../supabaseClient';
import { Ionicons } from '@expo/vector-icons';
import CourseInfo from '../components/CourseDetails/CourseInfo';
import CourseItemList from './CourseDetails/CourseItemList';
export default function CategoryDetails() {
    const { categoryId } = useLocalSearchParams();
    const [category, setCategoryData] = useState([])
    const router = useRouter();
    useEffect(() => {
        console.log(categoryId)
        categoryId && getCategoryDetail();
    }, [categoryId]);

    const getCategoryDetail = async () => {
        const { data, error } = await supabase.from('Category')
            .select('*,CategoryItems(*)')
            .eq('id', categoryId)
        setCategoryData(data[0]);

    }

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={44} color="black" />
            </TouchableOpacity>
            <CourseInfo categoryData={categoryData} />

            <CourseItemList categoryData={categoryData} />
        </View>

    )
}


