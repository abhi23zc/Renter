import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import ProductItem from "@/components/ProductItem";
import Colors from "@/constants/Colors";

export default function MyPost() {
  const navigation = useNavigation();
  const [userPost, setuserPost] = useState<any>([]);
  const [loader, setloader] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Post",
    });
    user && fetchPost();
  }, []);
  const { user } = useUser();

  async function fetchPost() {
    setloader(true);
    setuserPost([]);
    const q = query(
      collection(db, "Products"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setuserPost((prev: any) => [...prev, doc.data()]);
    });
    setloader(false);
  }

  async function deletePost(docId: String) {
    Alert.alert("Do you want to delete ?", "Do you really want to delete", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelled"),
      },
      {
        text: "Delete",
        onPress: async () => {
          await deleteDoc(doc(db, "Products", String(docId)));
        },
      },
    ]);
  }

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        MyPost
      </Text>
      <FlatList
        refreshing={loader}
        onRefresh={fetchPost}
        numColumns={2}
        data={userPost}
        style={{
          marginTop: 5,
        }}
        renderItem={({ item, index }) => (
          <View>
            <ProductItem product={item} key={index} />
            <Pressable
              onPress={() => {
                deletePost(item.id);
              }}
              style={styles.deleteButton}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  textAlign: "center",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />

      {userPost?.length == 0 && <Text>No Post Found </Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 7,
    marginRight: 10,
    marginTop: 5,
  },
});
