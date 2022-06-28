import dataApi from "@/apis/dataApi"
import { msg } from "@/utils/msg"
import { collection, addDoc, setDoc, doc, getDocs, getDoc, onSnapshot, query, updateDoc, where, deleteDoc, type DocumentData, } from "firebase/firestore"
import { db } from "../plugins/firebase"
import { userStores } from "./userStore"

export const dataStores = defineStore({
    id: 'data',
    state: () => ({
        userStore: userStores(),
        data: [] as any[], // 顯示資料
        dataCount: 0, // 總筆數
        order: '', // 排序規則
        query: '' as any //router query
    }),
    actions: {
        init() {
            this.order = (useRoute().query['o'] as string || '') // 排序規則
            this.query = (useRoute().query as any || '') // 篩選權限
        },
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
            } catch (error) {
                console.error('新增資料錯誤', error)
            }
        },
        // (獲取單筆資料)  await getdata('users',"aX5Y6kvyvgK5qwIwht5I")
        async get(name: string, id: string): Promise<DocumentData | null> {
            const getdoc = await getDoc(doc(db, name, id))
            return getdoc.exists() ? getdoc.data() : null
        },
        // (更新資料) 
        async update<T>(table: string, id: number, obj: T) {
            if (!this.userStore.info?.permissions['p'].includes('浩呆')) {
                msg('權限不足', 'error')
                return
            }
            await dataApi.update(table, id, obj)
                .then(async (res) => {
                    if (res.code == 20000) {
                        await this.getData(table)
                        msg('更新成功')
                    } else {
                        msg('更新失敗', 'error')
                    }
                })
                .catch((err) => {
                    msg('更新失敗', 'error')
                    console.error(err)
                })
        },
        // (刪除資料)  await delete_data("users","aX5Y6kvyvgK5qwIwht5I");
        async delete(name: string, id: string) {
            try {
                await deleteDoc(doc(db, name, id))
            } catch (e) {
                console.error("刪除資料失敗: ", e)
            }
        },
        // (獲取資料Data)
        async getData<T>(table: string) {
            this.data = await dataApi.dataList<T>(table, this.query)
                .then((res) => {
                    if (res.code != 20000) {
                        msg('獲取資料失敗', 'error')
                        return []
                    }
                    this.dataCount = res.data.count // 總筆數
                    return res.data.rows // 資料
                })
        },
    },

})
