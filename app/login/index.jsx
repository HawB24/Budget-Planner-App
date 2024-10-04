import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import { TouchableOpacity } from "react-native";
import { client } from "../../utils/KindeConfig";
import services from "../../utils/services";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  return (
    <View className="w-full h-full flex flex-col items-center">
      <Image
        source={{ uri: "https://i.pinimg.com/474x/73/d7/14/73d71451ea985d1309bc70be39d6912e.jpg" }}
        style={styles.bgImages}
      />
      <View
        style={{ backgroundColor: Colors.PRIMARY }}
        className="w-full h-full flex flex-col items-center gap-y-[15px] rounded-t-3xl px-[20px]"
      >
        <Text className="text-white text-[30px]">Personal Budget Planner</Text>
        <Text className="text-[16px] text-white">
          Stay on Track, Event by Event:Your Personal Budget
        </Text>
        <TouchableOpacity
          className="w-full bg-white flex items-center p-3 rounded-full"
          onPress={handleSignIn}
        >
          <Text style={{ color: Colors.PRIMARY }}>Login/SignUp</Text>
        </TouchableOpacity>
        <Text className="text-white text-[12px]">
          * By Login/SignUp you will agree to our tearms and condition
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bgImages: {
    width: 250,
    height: 350,
    marginTop: 100,
  },
});
