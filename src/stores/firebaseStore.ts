import { collection, addDoc, setDoc, doc, getDocs, getDoc, onSnapshot, query, updateDoc, where, deleteDoc, type DocumentData, } from "firebase/firestore"
import { db } from "../plugins/firebase"

export const firebaseStores = defineStore('firebase', {
    state: () => ({
    }),
    getters: {

    },
    actions: {
        async add(name: string, id: string, obj: object) {
            try {
                await setDoc(doc(collection(db, name), id), {
                    date:
                        new Date().getFullYear() +
                        "-" +
                        (new Date().getUTCMonth() + 1) +
                        "-" +
                        new Date().getDate() +
                        " " +
                        new Date().getHours() +
                        ":" +
                        new Date().getMinutes(),
                    ...obj
                })
                // await addDoc(collection(db, name), {
                //     date:
                //         new Date().getFullYear() +
                //         "-" +
                //         (new Date().getUTCMonth() + 1) +
                //         "-" +
                //         new Date().getDate(),
                //     ...obj
                // })
            } catch (error) {
                console.error('新增資料錯誤', error)
            }
        },
        // (獲取單筆資料)  await getdata('users',"aX5Y6kvyvgK5qwIwht5I")
        async get(name: string, id: string): Promise<DocumentData | null> {
            const getdoc = await getDoc(doc(db, name, id))
            return getdoc.exists() ? getdoc.data() : null
        },
        // (更新資料)  await update_data("users","aX5Y6kvyvgK5qwIwht5I", { name: "浩呆" });
        async update(name: string, id: string, obj: object) {
            try {
                await updateDoc(doc(db, name, id), obj)
            } catch (e) {
                console.error("更新資料失敗: ", e)
            }
        },
        // (刪除資料)  await delete_data("users","aX5Y6kvyvgK5qwIwht5I");
        async delete(name: string, id: string) {
            try {
                await deleteDoc(doc(db, name, id))
            } catch (e) {
                console.error("刪除資料失敗: ", e)
            }
        },
        // (動態更新資料)
        async data(name: string) {
            const datalist = ref<any>([])
            onSnapshot(collection(db, name), (querySnapshot) => {
                datalist.value = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            })

            // const route = useRoute()
            // watch(
            //     () => route.params.id,
            //     (o, n) => {
            //         if (route.name == "resource") {
            //             onSnapshot(collection(db, o), (querySnapshot) => {
            //                 datalist = querySnapshot.docs.map((doc) => ({
            //                     id: doc.id,
            //                     ...doc.data(),
            //                 }))
            //             })
            //         }
            //     }
            // )
            // onUnmounted(close)

            // console.log("connect db")
            return datalist
        },
    },

})
