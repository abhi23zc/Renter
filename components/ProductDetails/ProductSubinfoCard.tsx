import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function ProductSubinfoCard({
  value,
  icon,
  title,
}: {
  value:any;
  icon: any;
  title: String;
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        margin: 5,
        padding: 10,
        flex: 1,
        borderRadius: 8,
        gap: 10,
      }}
    >
      <Image
        source={icon}
        style={{ width: 40, height: 40 }}
      />
      <View style={{
        display:'flex',
        flex:1,
        flexDirection:'column'
      }}>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            color: Colors.GRAY,
          }}
        >
          {" "}
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
