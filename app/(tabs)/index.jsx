import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import "../../global.css";
import services from "../../utils/services";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/SupabaseConfig";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);
  /**
   * Use check user is already auth or not
   */
  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    }
  };
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      await services.storeData("login", "false");
      router.replace("/login");
    }
  };
  const getCategoryList = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", user.email);
    console.log("Data", data);
  };
  return (
    <View className="mt-[25px]">
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
