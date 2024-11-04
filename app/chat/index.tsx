import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

export default function ChatScreen() {
  const navigation = useNavigation();
  const { user }: { user: any } = useUser();
  const params = useLocalSearchParams();
  useEffect(() => {
    getUserDetails();
    const unsubscribe = onSnapshot(
      collection(db, "Chat",String(params?.id), "Messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);

  const [messages, setMessages] = useState<any>([]);

  const getUserDetails = async () => {
    const docRef = doc(db, "Chat", String(params?.id));
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();

    const otherUser = result?.users.filter(
      (item: any) => item.email != user?.primaryEmailAddress?.emailAddress
    );
    navigation.setOptions({
      headerTitle: otherUser[0]?.name || "Rental User",
    });
  };

  const onSend = useCallback(async (messages: any) => {
    setMessages((previousMessages:any) =>
      GiftedChat.append(previousMessages, messages)
    );
    messages[0].createdAt = moment().format("MM-DD-YYYY HH:MM:SS")
    await addDoc(collection(db, "Chat",String(params?.id), "Messages"), messages[0]);

  
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl ? user?.imageUrl : 'https://firebasestorage.googleapis.com/v0/b/r-service-84a6b.appspot.com/o/user.png?alt=media&token=268c4f68-3c2e-4c4b-b17b-32bcd41b1209', 
      }}
    />
  );
}
