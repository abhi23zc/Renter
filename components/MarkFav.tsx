import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Shared from "@/app/Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({
  product,
  color = "black",
}: {
  product: any;
  color: string;
}) {
  const { user }: { user: any } = useUser();
  const [favList, setfavList] = useState<any>([]);
  useEffect(() => {
    user && getFav();
  }, []);

  const getFav = async () => {
    const result = await Shared.getFavProd({ user });
    setfavList(result?.fav ? result.fav : []);
  };

  async function addToFav() {
    const favourites = favList;
    favourites.push(product?.id);
    setfavList(favourites);
    await Shared.updateFav(user, favList);
    getFav();
  }
  async function removeFromFav() {
    let favourites = favList.filter((elem: any) => {
      if (elem != product?.id) return elem;
    });
    setfavList(favourites);

    await Shared.updateFav(user, favourites);
    getFav();
  }

  return (
    <View>
      {favList?.includes(product?.id) ? (
        <Pressable
          onPress={() => {
            removeFromFav();
          }}
        >
          <Ionicons name="heart" size={24} color="red" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            addToFav();
          }}
        >
          <Ionicons name="heart-outline" size={24} color={color} />
        </Pressable>
      )}
    </View>
  );
}
