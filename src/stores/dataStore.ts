import dataApi from "@/apis/dataApi"
import { CacheEnum } from "@/enum/cacheEnum"
import { store } from "@/utils"
import { msg } from "@/utils/msg"
import { ElLoading } from "element-plus"
import { userStores } from "./userStore"

export const dataStores = defineStore({
    id: 'data',
    state: () => ({
        route: useRoute(),
        userStore: userStores(),
        data: [] as any[], // 顯示資料
        dataCount: 0, // 總筆數

    }),
    actions: {
        async init(tableName: string) {
            this.data = []
            await this.getData(tableName)
        },

        /**
         * 獲取資料Data
         * @date 2022-09-15
         */
        async getData(table: string) {
            const loading = ElLoading.service({
                lock: true,
                text: '',
                background: 'rgba(0, 0, 0, 0.5)',
            })
            const tableName = `${table}List`
            this.data = await dataApi[tableName](this.route.params.id, store.get(CacheEnum.SEARCH_RULE))
                .then((res: any) => {
                    if (res.code != 20000) {
                        msg('獲取資料失敗', 'error')
                        return []
                    }
                    this.dataCount = res.data.count // 總筆數
                    loading.close()
                    return res.data.rows // 資料
                })
                .catch(() => {
                    loading.close()
                })

        },

        async create(table: string, obj: object) {
            const res = await dataApi.create(table, obj)
            if (res.code == 20000) {
                await this.getData(table)
                msg('新增成功')
            } else {
                msg('失敗')
            }
        },

        /**
         * 更新資料
         * @date 2022-09-14
         */
        async update<T>(table: string, id: string, obj: T, permission?: string) {
            if (permission) {
                if (!this.userStore.info?.permissions?.includes(permission)) {
                    msg('權限不足', 'error')
                    return
                }
            }
            await dataApi.update(table, id, obj)
                .then(async (res) => {
                    if (res.code == 20000) {
                        await this.getData(table)
                        msg(res.message)
                    } else {
                        msg(res.message, 'error')
                    }
                })
                .catch((err) => {
                    msg('更新失敗', 'error')
                    console.error(err)
                })
        },
        // (刪除資料) 
        async delete(table: string, id: number) {
            const res = await dataApi.delete(table, id)
            if (res.code == 20000) {
                await this.getData(table)
                msg("刪除成功")
            } else {
                msg('刪除失敗', 'error')
            }
        },


    },

})
