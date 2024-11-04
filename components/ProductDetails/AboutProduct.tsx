import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

export default function AboutProduct({ product }: { product: any }) {
  const [readmore, setreadmore] = useState(true);
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        About {product.name}
      </Text>
      <Text
        numberOfLines={readmore ? 3 : 20}
        style={{
          fontFamily: "outfit",
          fontSize: 14,
        }}
      >
        {product?.about}
      </Text>

      <Pressable onPress={() => setreadmore(!readmore)}>
        {readmore ? (
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 14,
              color: Colors.SECONDARY,
            }}
          >
            Read More
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 14,
              color: Colors.SECONDARY,
            }}
          >
            Read Less
          </Text>
        )}
      </Pressable>
    </View>
  );
}
