import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Profile() {
  const List = [
    {
      id: 1,
      name: "Add New Product",
      icon: "add-circle",
      path: "/AddProduct",
    },
    {
      id: 4,
      name: "My Post",
      icon: "bookmark",
      path: "/mypost",
    },
    {
      id: 2,
      name: "Favourites",
      icon: "heart",
      path: "/(tabs)/favourite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "/logout",
    },
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        Profile
      </Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginVertical: 25,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 99,
          }}
        />

        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            marginTop: 6,
          }}
        >
          {user?.fullName}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            color: Colors.GRAY,
          }}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <FlatList
        data={List}
        renderItem={({ item, index }: { item: any; index: any }) => (
          <TouchableOpacity
            onPress={(e) => {
              if (item.name == "Logout") {
                signOut();
                return;
              }
              router.push(item.path);
            }}
            key={index}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              style={{
                padding: 10,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 10,
              }}
              name={item?.icon}
              color={Colors.PRIMARY}
              size={30}
            />

            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
