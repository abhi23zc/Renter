import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function UserItem({ userInfo }: { userInfo: any }) {
  useEffect(() => {
    // console.log("userinfo", userInfo);
  }, []);

  return (
    <Link
      style={{
        marginTop: 10,
        borderBottomColor: Colors.GRAY,
        borderBottomWidth: 0.2,
      }}
      href={{ pathname: "/chat", params: { id: userInfo?.docId || "" } }}
    >
      <View
        style={{
          padding: 5,
          marginVertical: 7,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: userInfo?.imageurl }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
          }}
        />

        <Text
          style={{
            fontFamily: "outfit",
          }}
        >
          {userInfo?.name}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.2,
          marginVertical: 7,
          borderColor: Colors.GRAY,
        }}
      ></View>
    </Link>
  );
}
