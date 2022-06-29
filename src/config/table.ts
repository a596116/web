export type tableColumnsType = {
  prop: string
  title: string
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
  { prop: 'id', title: 'ID', align: 'center', width: 80 },
  { prop: 'name', title: '名稱', search: true, width: 120 },
  { prop: 'avatar', title: '頭像', type: 'image', align: 'center', width: 120 },
  { prop: 'active', title: '狀態', type: 'switch', align: 'center', width: 80 },
  {
    prop: 'permissions',
    title: '權限',
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
  { prop: 'id', title: '编号', width: 80, align: 'center' },
  { prop: 'title', title: '模块名称', search: true },
  { prop: 'name', title: '标识', search: true },
  { prop: 'author', title: '作者', search: true },
  { prop: 'version', title: '版本号' },
  { prop: 'preview', title: '预览图', type: 'image', width: 80, align: 'center' },
  { prop: 'created_at', title: '创建时间', type: 'date', width: 120 },
] as tableColumnsType[]

export const roleTableColumns = [
  { prop: 'id', title: '编号', width: 80, align: 'center' },
  { prop: 'title', title: '角色名称', search: true },
  { prop: 'name', title: '英文标识', search: true },
  { prop: 'permissions', title: '权限', type: 'alert', alert_field: 'title' },
  { prop: 'created_at', title: '创建时间', type: 'date', width: 120 },
  { prop: 'updated_at', title: '更新时间', type: 'date', width: 120 },
] as tableColumnsType[]

export const adminTableColumns = [
  ...userTableColumns,
  { prop: 'roles', title: '角色', type: 'alert', alert_field: 'title' },
] as tableColumnsType[]
