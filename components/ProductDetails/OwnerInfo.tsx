import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OwnerInfo({ product }: { product: any }) {
  return (
    <View
      style={{
        // paddingHorizontal: 20,
        marginHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor:Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        justifyContent: "space-between",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 20 , alignItems:'center'}}>
        <Image
          source={{ uri: product.ownerimage }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        />

        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
            }}
          >
            {" "}
            {product?.ownername}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.GRAY,
            }}
          >
            Product Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
  );
}
