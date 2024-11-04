import { View, Text, Image, FlatList, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";

export default function Category({category}:{category:any}) {
  const [data, setData] = useState<any[]>([]);
  const [selectedCategory, setselectedCategory] = useState("Laptop");
  async function getCategories() {
    setData([]);
    const snapshot = await getDocs(collection(db, "Category"));
    const categories = snapshot.docs.map((doc) => doc.data());
    setData(categories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>

      <FlatList
        numColumns={5}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{
              setselectedCategory(item.name)
              category(item.name)
          }}>
          
          <View>
            <View
              style={[
                styles.itemContainer,
                selectedCategory == item.name &&
                  styles.selectedCategoryContainer,
              ]}
              >
              <Image source={{ uri: item?.imageurl }} style={styles.icon} />
            </View>
            <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
              {item?.name}
            </Text>
          </View>
              </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderColor: Colors.PRIMARY,
    padding: 8,
    borderRadius: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 12,
    textAlign: "center",
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor:Colors.SECONDARY
  },
});
