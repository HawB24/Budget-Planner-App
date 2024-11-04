import { View, Text, TextInput, StyleSheet, ToastAndroid } from "react-native";
import React, { useState } from "react";
import Colors from "./../utils/Colors";
import ColorPicker from "../components/ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { supabase } from "./../utils/SupabaseConfig";
import { client } from "./../utils/KindeConfig";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [categoryName, setCategoryName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");

  const router = useRouter();

  const onCreateCategory = async () => {
    const user = await client.getUserDetails();
    const budgetValue = parseFloat(totalBudget); // Chuyển đổi sang số

    // Kiểm tra các trường nhập
    if (!categoryName || isNaN(budgetValue) || budgetValue <= 0) {
      ToastAndroid.show("Please fill in all fields correctly!", ToastAndroid.SHORT);
      return;
    }

    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          name: categoryName,
          assigned_budget: budgetValue,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating category:", error);
      ToastAndroid.show("Error creating category!", ToastAndroid.SHORT);
      return;
    }

    if (data) {
      router.replace({
        pathname: "category-detail",
        params: {
          categoryId: data[0].id,
        },
      });
      ToastAndroid.show("Category Created!", ToastAndroid.SHORT);
      // Reset trường nhập
      setCategoryName("");
      setTotalBudget("");
      setSelectedIcon("");
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
          value={selectedIcon} // Đảm bảo có giá trị trong trường
        />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>

      {/* Add Category Name and Total Budget Section */}
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Category Name"
          onChangeText={(v) => setCategoryName(v)}
          style={{ width: "100%", fontSize: 17 }}
          value={categoryName} // Đảm bảo có giá trị trong trường
        />
      </View>

      <View style={styles.inputView}>
        <FontAwesome6 name="dollar-sign" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Total Budget"
          keyboardType="numeric"
          onChangeText={(v) => setTotalBudget(v)}
          style={{ width: "100%", fontSize: 17 }}
          value={totalBudget} // Đảm bảo có giá trị trong trường
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        disabled={!categoryName || !totalBudget}
        onPress={() => onCreateCategory()}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: Colors.WHITE,
          }}
        >
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE,
  },
  inputView: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
});
