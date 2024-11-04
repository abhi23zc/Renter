import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "./MarkFav";

export default function ProductItem({ product }: { product: any }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/product-details",
          params: product,
        });
      }}
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View style={{position:'absolute', top:12, zIndex:10, right:12 }}>
        <MarkFav product={product} color={"white"}/>
      </View>
      <Image
        source={{ uri: product.imageurl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 18,
        }}
      >
        {product.name}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
          }}
        >
          {product.category}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            backgroundColor: Colors.LIGHT_PRIMARY,
            borderRadius: 18,
            fontSize: 10,
            paddingHorizontal: 7,
          }}
        >
          {product.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
}
