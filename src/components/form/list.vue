<template>
  <div>
    <el-card
      shadow="hover"
      :body-style="{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }">
      <div class="flex">
        <slot name="image"></slot>
        <el-form
          ref="formRef"
          v-model:model="model"
          label-width="100px"
          :rules="formRules"
          :inline="false"
          size="large"
          class="flex-1">
          <el-form-item :label="f.title" v-for="f of fields" :key="f.name" :prop="f.name">
            <template v-if="f.type == 'checkbox'">
              <el-checkbox-group v-model="model[f.name]['p']">
                <el-checkbox :label="val" v-for="val in f.options" />
              </el-checkbox-group>
            </template>
            <template v-else-if="f.type === 'tag'">
              <template v-for="(item, index) in model[f.name]['p']" :key="index">
                <el-tag :color="f.options[item]" class="mx-1 !border-0" effect="dark">
                  {{ item }}
                </el-tag>
              </template>
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
                v-if="!f.readonly"
                v-model.trim="model[f.name]"
                :placeholder="f.placeholder"
                :readonly="f.readonly"
                :disabled="f.disabled"
                class="border rounded-md" />
              <span v-else>{{ model[f.name] }}</span>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <slot name="button"></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { formColumnsType } from '@/config/form'
import _ from 'lodash'
const {
  fields,
  model: PropsModel,
  formRules,
} = defineProps<{
  fields: formColumnsType[]
  model?: any
  formRules?: any
}>()
const model = ref(
  PropsModel ||
    _.zipObject(
      fields.map((f) => f.name),
      fields.map((f) => f.value ?? ''),
    ),
)
const formRef = ref()
defineExpose({ formRef })
</script>

<style scoped></style>
