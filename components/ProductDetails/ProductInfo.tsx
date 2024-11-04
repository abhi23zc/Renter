import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MarkFav from "../MarkFav";

export default function ProductInfo({ product }: { product: any }) {
 
  return (
    <View>
      <Image
        source={{ uri: product.imageurl }}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{}}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 27 }}>
            {product.name}
          </Text>
          <Text
            style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
          >
            {product?.city}
          </Text>
        </View>
       <MarkFav product={product} color=""/>
      </View>
    </View>
  );
}
