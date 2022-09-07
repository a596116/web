export type tableColumnsType = {
  prop: string
  title: string
  width?: number
  align?: 'left' | 'center' | 'right'
  type?: 'image' | 'date' | 'input' | 'tag' | 'alert' | 'switch' | 'preview' | 'category'
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
  // { prop: 'id', title: 'ID', align: 'center', width: 80 },
  { prop: 'name', title: '名稱', align: 'center', width: 200 },
  { prop: 'phone', title: '手機', align: 'center', width: 150 },
  { prop: 'active', title: '狀態', type: 'switch', align: 'center', width: 100 },
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
  { prop: 'avatar', title: '頭像', type: 'image', align: 'center', width: 140 },
] as tableColumnsType[]

export const blogTableColumns = [
  { prop: 'id', title: '編號', width: 80, align: 'center' },
  { prop: 'title', title: '標題', align: 'center' },
  { prop: 'content', title: '文章', width: 160, align: 'center', type: 'preview' },
  {
    prop: 'category', title: '類別', align: 'center', type: 'category',
    options: {
      HTML: '#ff6b6b',
      JS: '#feca57',
      CSS: '#54a0ff',
    }
  },
  { prop: 'image', title: '封面', width: 140, align: 'center', type: 'image' },
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
