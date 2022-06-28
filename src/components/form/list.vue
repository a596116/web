<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <el-form :v-model:model="model" label-width="100px" :inline="false" size="large">
        <el-form-item :label="f.title" v-for="f of fields">
          <template v-if="f.type == 'image'">
            <!-- <div class="flex flex-col">
              <UploadSingleImage v-model="model[f.name]" />
              <FormError :name="f.error_name || f.name" />
            </div> -->
          </template>
          <template v-else-if="f.type == 'checkbox'">
            <el-checkbox-group v-model="model[f.name]['p']">
              <el-checkbox :label="val" v-for="val in f.options" />
            </el-checkbox-group>
          </template>
          <template v-else-if="f.type == 'preview'">
            <div class="flex flex-col">
              <el-image
                preview-teleported
                :hide-on-click-modal="true"
                :preview-src-list="[model[f.name]!]"
                :src="model[f.name]"
                fit="cover"
                class="w-[200px] rounded-sm" />
            </div>
          </template>
          <template v-else>
            <el-input
              v-model="model[f.name]"
              :placeholder="f.placeholder"
              :readonly="f.readonly"
              :disabled="f.disabled" />
          </template>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { formColumnsType } from '@/config/form'
import _ from 'lodash'
const { fields, model: PropsModel } = defineProps<{
  fields: formColumnsType[]
  model?: any
}>()
const model = ref(
  PropsModel ||
    _.zipObject(
      fields.map((f) => f.name),
      fields.map((f) => f.value ?? ''),
    ),
)
</script>

<style scoped></style>
