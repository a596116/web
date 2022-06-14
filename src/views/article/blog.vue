<template>
    <div>
        <!-- <section>
            <el-button @click="add"
                class="!bg-hd-theme-color text-gray-50 py-4 hover:!text-hd-white hover:!bg-hd-theme-hover-color !border-0 focus:!text-hd-white">
                <icon-plus theme="outline" size="24" /> 新增
            </el-button>

            <el-button @click="up"
                class="!bg-red-300 text-gray-100 py-4 hover:!text-hd-white hover:!bg-red-200 !border-0 focus:!text-hd-white">
                <icon-delete-one theme="outline" size="24" /> 刪除
            </el-button>
        </section> -->
        <el-table :data="usersList" style="width: 100%" tooltip-effect="dark" stripe show-overflow-tooltip
            class="text-base mt-5">
            <!-- <el-table-column type="selection"> </el-table-column> -->
            <el-table-column prop="date" label="日期" width='110' />
            <el-table-column prop="name" label="名稱" />

            <el-table-column label="權限">
                <template #default="scope">
                    <el-tag v-for="(item, index) in scope.row.permissions" :key="index"
                        :color="item == '浩呆' ? '#fdcb6e' : '#6bf4ba'" class="mx-1 !border-0" effect="dark">
                        {{ item }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="頭像">
                <template #default="scope">
                    <el-image :src="scope.row.avatar" fit="cover" alt="haodai" class="w-[100px]">
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column align="right">
                <template #header>
                    <el-input v-model="serchInput" placeholder="" @keydown.esc="serchInput = ''" class="border">
                        <template #prefix>
                            <icon-search theme="outline" size="18" />
                        </template>
                        <template #suffix>
                            <icon-close theme="outline" size="18" />
                        </template>
                    </el-input>
                </template>
                <template #default="scope">
                    <section class="flex justify-end">
                        <icon-edit theme="outline" size="26"
                            class="bg-green-200 hover:bg-green-300 text-hd-white p-2 mx-3 rounded-[50%] cursor-pointer"
                            @click="editUser(scope.row.name)" />
                        <icon-delete theme="outline" size="26"
                            class="bg-red-200 hover:bg-red-300 text-hd-white p-2 mx-3 rounded-[50%] cursor-pointer" />
                    </section>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="用戶資料" width="30%" :before-close="handleClose">
            <div class="">
                <el-checkbox-group v-model="permissions">
                    <el-checkbox label="浩呆" />
                    <el-checkbox label="admin" />
                    <el-checkbox label="user" />
                </el-checkbox-group>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">儲存</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { userStores } from '@/stores/userStore'
import { firebaseStores } from '@/stores/firebaseStore'
import { ElMessageBox } from 'element-plus'
const userStore = userStores()
const firebaseStore = firebaseStores()
// console.log(userStore.info)
const add = () => {
    firebaseStore.add('users', userStore.info!.name, userStore.info!)
}
const up = () => {
    firebaseStore.update('users', 'mWldBNgQ46jEdqt1IIMr', { permisson: Math.floor(Math.random() * 5) + 1 })
}
// console.log(await firebaseStore.get('users', 'mWldBNgQ46jEdqt1IIMr'))
// const a = firebaseStore.data('users')

const usersList = await firebaseStore.data('users')


const serchInput = ref("")
const c = (scope) => {
    console.log(scope.$index)
}

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('是否儲存？')
        .then(() => {
            done()
        })
}

const permissions = ref<string[]>([])
const editUser = async (id: string) => {
    const user = await firebaseStore.get('users', id)
    dialogVisible.value = true
    permissions.value = user!.permissions
}


</script>

<style scoped>
</style>