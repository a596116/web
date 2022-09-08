import dataApi from "@/apis/dataApi"
import { msg } from "@/utils/msg"
import { ElLoading } from "element-plus"
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
            this.data = []
            this.order = (useRoute().query['o'] as string || '') // 排序規則
            this.query = (useRoute().query as any || '') // 篩選權限
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
        // (更新資料) 
        async update<T>(table: string, id: number, obj: T, permission?: string) {
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
        // (獲取資料Data)
        async getData(table: string) {
            const loading = ElLoading.service({
                lock: true,
                text: '加載中...',
                background: 'rgba(0, 0, 0, 0.5)',
            })
            const tableName = `${table}List`
            this.data = await dataApi[tableName](this.query)
                .then((res: any) => {
                    if (res.code != 20000) {
                        msg('獲取資料失敗', 'error')
                        return []
                    }
                    this.dataCount = res.data.count // 總筆數
                    loading.close()
                    return res.data.rows // 資料
                })
        },
    },

})
