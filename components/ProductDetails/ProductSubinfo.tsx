import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import ProductSubinfoCard from "./ProductSubinfoCard";

export default function ProductSubinfo({ product }: { product: any }) {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          
        }}
      >
        <ProductSubinfoCard
          value={product?.age}
          icon={require("../../assets/images/calendar.png")}
          title={"Age"}
        />
        <ProductSubinfoCard
          value={product?.city}
          icon={require("../../assets/images/home.png")}
          title={"Address"}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ProductSubinfoCard
          value={product?.Category}
          icon={require("../../assets/images/category.png")}
          title={"category"}
        />
        <ProductSubinfoCard
          value={product?.available}
          icon={require("../../assets/images/available.png")}
          title={"Availability"}
        />
      </View>
    </View>
  );
}
