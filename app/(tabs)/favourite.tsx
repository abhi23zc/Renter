import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import ProductItem from "@/components/ProductItem";

export default function Favourite() {
  const { user }: { user: any } = useUser();
  const [productsId, setproductsId] = useState<any[]>([]);
  const [productsData, setproductsData] = useState<any[]>([]);
  const [loader, setloader] = useState(false);

  const getFavProductId = async () => {
    setloader(true);
    const result = await Shared.getFavProd({ user });
    setproductsId(result?.fav);
    setloader(false);
    getFavProductList(result?.fav);
  };

  const getFavProductList = async (favId: any) => {
    setloader(true);
    setproductsData([]);
    const q = query(collection(db, "Products"), where("id", "in", favId));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setproductsData((prev: any) => [...prev, doc.data()]);
    });
    setloader(false);
  };

  useEffect(() => {
    user && getFavProductId();
  }, [user]);

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
        Favourites
      </Text>

      <FlatList
        numColumns={2}
        onRefresh={() => {
          getFavProductId();
        }}
        refreshing={loader}
        data={productsData}
        renderItem={({ item, index }) => (
          <View>
            <ProductItem key={index} product={item} />
          </View>
        )}
      ></FlatList>
    </View>
  );
}
