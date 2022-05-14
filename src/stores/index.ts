import { collection, addDoc, doc, getDocs, getDoc, onSnapshot, query, updateDoc, where, deleteDoc, } from "firebase/firestore"

import { db } from "../plugins/firebase"

// (新增資料)  await add({id: 1, name: "王"})
export const add_data = async (data: any, obj: object) => {
    try {
        await addDoc(collection(db, data), obj)
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

// (獲取單筆資料)  await getdata("aX5Y6kvyvgK5qwIwht5I")
export const get_data = async (data: any, id: string) => {
    const getdoc = await getDoc(doc(db, data, id))
    return getdoc.exists() ? getdoc.data() : null
}

// (更新資料)  await update_data("aX5Y6kvyvgK5qwIwht5I", { name: "帥馬" });
export const update_data = async (data: any, id: string, obj: object) => {
    try {
        await updateDoc(doc(db, data, id), obj)
    } catch (e) {
        console.error("Error update document: ", e)
    }
}

// (刪除資料)  await delete_data("aX5Y6kvyvgK5qwIwht5I")
export const delete_data = async (data: any, id: string) => {
    try {
        await deleteDoc(doc(db, data, id))
    } catch (e) {
        console.error("Error dalete document: ", e)
    }
}

// (動態更新資料)
export const listen_data = (data: any) => {
    const datalist = ref({})
    const close = onSnapshot(collection(db, data), (querySnapshot) => {
        datalist.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
    })

    const route = useRoute()
    watch(
        () => route.params.id,
        (o, n) => {
            if (route.name == "resource") {
                onSnapshot(collection(db, o), (querySnapshot) => {
                    datalist.value = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                })
            }
        }
    )
    onUnmounted(close)
    console.log("connect db")
    return datalist
}



