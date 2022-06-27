export type tableColumnsType = {
  prop: string
  label: string
  width?: number
  align?: 'left' | 'center' | 'right'
  type?: 'image' | 'date' | 'input' | 'tag' | 'alert' | 'switch'
  options: any
  search?: boolean
  fixed?: boolean
}

export type tableButtonType = {
  title: string
  command: string
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}

export const userTableColumns = [
  { prop: 'id', label: 'ID', align: 'center', width: 80 },
  { prop: 'name', label: '名稱', search: true, width: 120 },
  { prop: 'avatar', label: '頭像', type: 'image', align: 'center', width: 120 },
  { prop: 'active', label: '狀態', type: 'switch', align: 'center', width: 80 },
  {
    prop: 'permissions',
    label: '權限',
    align: 'center',
    type: 'tag',
    options: {
      浩呆: '#fdcb6e',
      admin: '#6ec7a2',
      user: '#75cdd8',
    },
  },
] as tableColumnsType[]

export const moduleTableColumns = [
  { prop: 'id', label: '编号', width: 80, align: 'center' },
  { prop: 'title', label: '模块名称', search: true },
  { prop: 'name', label: '标识', search: true },
  { prop: 'author', label: '作者', search: true },
  { prop: 'version', label: '版本号' },
  { prop: 'preview', label: '预览图', type: 'image', width: 80, align: 'center' },
  { prop: 'created_at', label: '创建时间', type: 'date', width: 120 },
] as tableColumnsType[]

export const roleTableColumns = [
  { prop: 'id', label: '编号', width: 80, align: 'center' },
  { prop: 'title', label: '角色名称', search: true },
  { prop: 'name', label: '英文标识', search: true },
  { prop: 'permissions', label: '权限', type: 'alert', alert_field: 'title' },
  { prop: 'created_at', label: '创建时间', type: 'date', width: 120 },
  { prop: 'updated_at', label: '更新时间', type: 'date', width: 120 },
] as tableColumnsType[]

export const adminTableColumns = [
  ...userTableColumns,
  { prop: 'roles', label: '角色', type: 'alert', alert_field: 'title' },
] as tableColumnsType[]
