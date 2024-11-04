import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function AddProduct() {
  const [formData, setformData] = useState({});
  const [selectedCategory, setselectedCategory] = useState("Other");
  const [image, setimage] = useState<any>("");
  const { user } = useUser();
  const [loading, setloading] = useState(false);

  async function handleChange(fieldName: any, fieldValue: any) {
    // console.log(fieldName, fieldValue);
    setformData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  }

  async function imagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.canceled) {
      setformData((prev) => ({ ...prev, imageurl: result.assets[0]?.uri }));
      setimage(result.assets[0]?.uri);
    }
  }

  async function handleSubmit() {
    console.log(formData)
    setformData((prev) => ({ ...prev, Category: selectedCategory }));
    if (Object.keys(formData).length != 9) {
      ToastAndroid.show("Enter all details", ToastAndroid.SHORT);
      return;
    }
    setloading(true);
    uploadImage();
  }

  const uploadImage = async () => {
    const res = await fetch(image);
    const blobImage = await res.blob();
    const storageRef = ref(storage, Date.now() + ".jpg");
    uploadBytes(storageRef, blobImage)
      .then((snapShot) => {
        console.log("File uploaded");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          //   console.log(downloadUrl);
          SaveFormData(downloadUrl);
        });
      });
  };

  const SaveFormData = async (imageurl: String) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Products", docId), {
      ...formData,
      imageurl: imageurl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      available: "YES",
      ownername: user?.fullName,
      ownerimage: user?.imageUrl,
      id: docId,
    });
    setloading(false);
    router.replace("/")
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Product",
    });
  }, []);
  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        Add New Product
      </Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("./../../assets/images/addProduct.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 15,
              marginTop: 15,
              borderColor: Colors.GRAY,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 15,
              marginTop: 15,
              borderColor: Colors.GRAY,
            }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> Product Name *</Text>
        <TextInput
          placeholder="Product Name"
          onChangeText={(value) => handleChange("name", value)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> Age *</Text>
        <TextInput
          placeholder="How old is this product ? "
          keyboardType="numeric"
          onChangeText={(value) => handleChange("age", value)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> About *</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          onChangeText={(value) => handleChange("about", value)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> Price *</Text>
        <TextInput
          placeholder="Price"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleChange("price", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> City *</Text>
        <TextInput
          placeholder="City"
          style={styles.input}
          onChangeText={(value) => handleChange("city", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> PinCode *</Text>
        <TextInput
          placeholder="PinCode"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => handleChange("pincode", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> Category *</Text>

        <Picker
          style={styles.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setselectedCategory(itemValue);
            handleChange("Category", itemValue);
          }}
        >
          <Picker.Item label="Laptop" value="Laptop" />
          <Picker.Item label="Sports" value="Sports" />
          <Picker.Item label="Electronics" value="Electronics" />
          <Picker.Item label="Books" value="Book" />
          <Picker.Item label="Vehicle" value="Vehicle" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        {/* <TextInput
          placeholder="Category"
          style={styles.input}
          onChangeText={(value) => handleChange("category", value)}
        /> */}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> State *</Text>
        <TextInput
          placeholder="State"
          style={styles.input}
          onChangeText={(value) => handleChange("state", value)}
        />
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={() => {
          handleSubmit();
        }}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginVertical: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          height: 30,
        }}
      ></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },

  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  label: {
    fontFamily: "outfit",
    marginVertical: 5,
  },
});
