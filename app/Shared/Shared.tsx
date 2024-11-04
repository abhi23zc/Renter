import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const getFavProd = async ({ user }: { user: any }) => {
  const docSnap = await getDoc(
    doc(db, "userFavProd", user?.primaryEmailAddress?.emailAddress)
  );
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    await setDoc(
      doc(db, "userFavProd", user?.primaryEmailAddress?.emailAddress),
      {
        email: user?.primaryEmailAddress?.emailAddress,
        fav: [],
      }
    );
  }
};

export const updateFav = async (user:any, fav:any)=>{
    const docRef = await doc(db, 'userFavProd', user?.primaryEmailAddress?.emailAddress)
    try{
        await updateDoc(docRef,{
            fav:fav
        })
    }catch(e){
        console.log("Error Occured")
    }
}

export default {
  getFavProd,
  updateFav
};
