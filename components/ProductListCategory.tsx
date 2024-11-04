import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import ProductItem from "./ProductItem";

export default function ProductListCategory() {
  const [ProductList, setProductList] = useState<any[]>([]);

  const [loader, setloader] = useState(false)

  const getAllProductList = async () => {
    setProductList([]);
    setloader(true)
    const q = query(collection(db, "Products"));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setProductList((ProductList) => [...ProductList, doc.data()]);
    });
    setloader(false)
  };

  const getProductList = async (category: any) => {
    setProductList([]);
    setloader(true)
    const q = query(
      collection(db, "Products"),
      where("category", "==", category)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setProductList((ProductList) => [...ProductList, doc.data()]);
    });
    setloader(false)
  };

  useEffect(() => {
    getAllProductList();
  }, []);

  return (
    <View>
      <Category category={getProductList} />

      <FlatList
        refreshing={loader}
        onRefresh={()=>getAllProductList}
        horizontal={true}
        data={ProductList}
        renderItem={({ item, index }) => <ProductItem product={item} />}
      ></FlatList>
    </View>
  );
}
