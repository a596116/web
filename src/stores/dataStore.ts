import dataApi from "@/apis/dataApi"
import { CacheEnum } from "@/enum/cacheEnum"
import { store } from "@/utils"
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
            const tableName = `${table}List`
            this.data = await dataApi[tableName](this.route.params.id, store.get(CacheEnum.SEARCH_RULE))
                .then((res: any) => {
                    if (res.code != 20000) {
                        return []
                    }
                    this.dataCount = res.data.count // 總筆數
                    return res.data.rows // 資料
                })

        },

        async create(table: string, obj: object) {
            const res = await dataApi.create(table, obj)
            if (res.code == 20000) {
                await this.getData(table)
            }
        },

        /**
         * 更新資料
         * @date 2022-09-14
         */
        async update<T>(table: string, id: string, obj: T, permission?: string) {
            if (permission) {
                if (!this.userStore.info?.permissions?.includes(permission)) {
                    ElMessage.error('權限不足')
                    return
                }
            }
            await dataApi.update(table, id, obj)
                .then(async (res) => {
                    if (res.code == 20000) {
                        await this.getData(table)
                    }
                })
                .catch((err) => {
                    ElMessage.error('更新失敗')
                    console.error(err)
                })
        },

        /**
         * 刪除資料
         * @date 2022-09-19
         */
        async delete(table: string, id: number) {
            const res = await dataApi.delete(table, id)
            if (res.code == 20000) {
                await this.getData(table)
            }
        },
    },

})
