import { collection, getDocs } from "firebase/firestore";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebaseConfig";

export default function Slider() {
  const [sliderList, setsliderList] = useState<any>([]);

  async function fetchData() {
    setsliderList([])
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setsliderList((prevSliderList: any[]) => [...prevSliderList, doc.data()]);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{
        marginTop:15
    }}>
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({ item, index }) => (
          <View>
            <Image style={styles.SliderImage} source={{ uri: item.imageurl }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  SliderImage: {
    width: Dimensions.get('screen').width*0.9,
    height: 180,
    marginRight:15,
    borderRadius:15

  },
});
