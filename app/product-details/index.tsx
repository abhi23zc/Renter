import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ProductInfo from "@/components/ProductDetails/ProductInfo";
import ProductSubinfo from "@/components/ProductDetails/ProductSubinfo";
import AboutProduct from "@/components/ProductDetails/AboutProduct";
import OwnerInfo from "@/components/ProductDetails/OwnerInfo";
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export default function ProductsDetails() {
  const product = useLocalSearchParams();
  const navigation = useNavigation();
  const { user }: { user: any } = useUser();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const chatInit = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + product?.email;
    const docId2 = product?.email + user?.primaryEmailAddress?.emailAddress;
    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapShot = await getDocs(q);
    if (querySnapShot.docs?.length == 0) {
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageurl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: product?.email,
            name: product?.ownername,
            imageurl: product?.ownerimage,
          },
        ],
        userIds: [user?.primaryEmailAddress?.emailAddress, product.email],
      });
    }
    querySnapShot.forEach((doc) => {
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });
  };

  return (
    <View>
      <ScrollView>
        {/* Product Info */}
        <ProductInfo product={product} />

        {/* Product Details */}
        <ProductSubinfo product={product} />

        {/* About */}
        <AboutProduct product={product} />

        {/* Owner Details */}
        <OwnerInfo product={product} />
        <View style={{ height: 70 }}></View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={chatInit}
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {" "}
            Rent Now
          </Text>
        </TouchableOpacity>
      </View>
      {/* Rent Now  */}
    </View>
  );
}
