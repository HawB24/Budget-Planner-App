import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { supabase } from './../../utils/SupabaseConfig'
import services from './../../utils/services'
import { client } from './../../utils/KindeConfig'
import Colors from './../../utils/Colors'
import Header from './../../components/Header'
import CircularChart from '../../components/CircularChart'
import CategoryList from '../../components/CategoryList'
import { RefreshControl, ScrollView } from 'react-native-web'

export default function Home() {

  const router = useRouter();
  const [categoryList, setCategoryList] = useState();
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, [])

  /**
   * Used to check user Is already auth or not
   */

  const checkUserAuth = async () => {
    const result = await services.getData('login');
    if (result !== 'true') {
      router.replace('/login');
    }
  }

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData('login', 'false');
      router.replace('/login');
      // User was logged out
    }
  };

  const getCategoryList = async () => {
    setLoading(true)
    const user = await client.getUserDetails();
    const { data, error } = await supabase.from('Category')
      .select('*,CategoryItems(*)')
      .eq('created_by', user.email)

    console.log("Data", data);
    setCategoryList(data);
    data&&setLoading(false)

  }

  return (
    <View style={{
      marginTop: 20,
      flex: 1
    }}>
      <ScrollView 
    
        refreshControl={
          <RefreshControl
          onRefresh={()=>getCategoryList()}
          refreshing={loading}
          />
      }
      >
        <View style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          height: 150
        }}>
          <Header />
        </View>
        <View style={{
          padding:20,
          marginTop:-75
        }}>
          <CircularChart />
        <CategoryList categoryList={categoryList} />
        </View>
          
        
      </ScrollView>
      </View>
      )
}

      const styles = StyleSheet.create({
        text:{
        fontSize: 20
    }
})