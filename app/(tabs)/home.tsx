import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import ProductListCategory from "@/components/ProductListCategory";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function home() {
  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Category */}
      <ProductListCategory />

      {/* List of Products */}
      <View >
        <Link href={"/AddProduct"} style={styles.addNewProduct}>
          <Ionicons name="bag-add" size={24} color={Colors.PRIMARY} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "outfit-medium",
              color: Colors.PRIMARY,
            }}
          >
            Add New Product
          </Text>
        </Link >
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewProduct: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
  },
});
