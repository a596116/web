import dataApi from "@/apis/dataApi"
import userApi from "@/apis/userApi"
import { msg } from "@/utils/msg"
import { collection, addDoc, setDoc, doc, getDocs, getDoc, onSnapshot, query, updateDoc, where, deleteDoc, type DocumentData, } from "firebase/firestore"
import { db } from "../plugins/firebase"


export const firebaseStores = defineStore({
    id: 'firebase',
    state: () => ({
        data: [] as any[], // 顯示資料
        total: 0, // 總筆數
        pagesize: 3,  // 每頁筆數
        currentPage: '', // 目前頁數
        order: '', // 排序規則
        searchInput: '', // 搜尋條件
        filterPermission: '', // 篩選權限
        filterActive: '', // 篩選狀態
    }),
    actions: {
        init() {
            this.currentPage = (useRoute().query['p'] as string || '1')// 目前頁數
            this.order = (useRoute().query['o'] as string || '') // 排序規則
            this.searchInput = (useRoute().query['s'] as string || '') // 搜尋條件
            this.filterPermission = (useRoute().query['m'] as string || '') // 篩選權限
            this.filterActive = (useRoute().query['a'] as string || '') // 篩選權限
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
        async update<T>(table: string, id: string, obj: T) {
            const user = await userApi.info() as any
            if (user.name != '浩呆') {
                msg('權限不足', 'error')
                return
            }
            await dataApi.update(table, id, obj)
                .then(async (res) => {
                    if (res.code == 20000) {
                        await this.getData(table)
                        msg('更新成功')
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
        async getData(table: string) {
            this.data = await dataApi.dataList(table, this.currentPage, this.order, this.searchInput, this.filterPermission, this.filterActive)
                .then((res: any) => {
                    this.total = res.count // 總筆數
                    return res.rows // 資料
                })
        },
    },

})
