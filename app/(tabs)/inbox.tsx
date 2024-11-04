import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "@/components/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loader, setloader] = useState(false);

  const getUserList = async () => {
    setloader(true);
    setUserList([]);
    const q = query(
      collection(db, "Chat"),
      where(
        "userIds",
        "array-contains",
        user?.primaryEmailAddress?.emailAddress
      )
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserList((prev: any[]) => [...prev, doc.data()]);
    });
    setloader(false);
  };

  const filterUsers = () => {
    const list: any[] = [];
    userList.forEach((data: any) => {
      const otherUser = data.users?.filter(
        (nuser: any) => nuser?.email != user?.primaryEmailAddress?.emailAddress
      );

      const result = {
        docId: data.id,
        ...otherUser[0],
      };

      list.push(result);
    });

    setFilteredUsers(list);
  };

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [userList]);

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
        Inbox
      </Text>

      <FlatList
        style={{
          marginTop: 20,
        }}
        onRefresh={() => getUserList()}
        refreshing={loader}
        data={filteredUsers}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      ></FlatList>
    </View>
  );
}
