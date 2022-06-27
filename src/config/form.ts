export type formType = {
  title: string
  name: string
  error_name?: string
  type?: 'input' | 'textarea' | 'image' | 'preview' | 'radio' | 'checkbox'
  options?: Record<keyof any, any>
  readonly?: boolean
  disabled?: boolean
  placeholder?: string
  value?: any
}

// 用戶編輯表單
export const userEditForm = [
  { title: '名稱', name: 'name', type: 'input' },
  {
    title: '權限', name: 'permissions', type: 'checkbox',
    options: ['浩呆', 'admin', 'user'],
  },
] as formType[]
// 用戶表單
export const userForm = [
  { title: '昵称', name: 'name' },
  { title: '邮箱', name: 'email' },
  {
    title: '性别',
    name: 'sex',
    type: 'radio',
    options: [
      ['男', 1],
      ['女', 2],
    ],
  },
  { title: '手机号', name: 'mobile' },
  { title: '真实姓名', name: 'real_name' },
  { title: '头像', name: 'avatar', type: 'preview' },
  { title: '主页', name: 'home' },
  { title: '注册时间', name: 'created_at' },
] as formType[]

//系统配置
export const systemForm = {
  base: [
    { title: '标题', name: 'title', type: 'input', error_name: 'title' },
    { title: '后台标志', name: 'logo', type: 'image' },
    { title: '电话', name: 'tel', type: 'input' },
    { title: '邮箱', name: 'email', type: 'input' },
    { title: '地址', name: 'address', type: 'input' },
    { title: '微信', name: 'wechat', type: 'image' },
    { title: 'QQ', name: 'qq', type: 'input' },
    { title: '备案号', name: 'icp', type: 'input' },
    { title: '版权信息', name: 'copyright', type: 'input' },
  ],
  code: [
    { title: '过期时间', name: 'expire', error_name: 'config.code.expire', placeholder: '单位为秒' },
    { title: '数量', name: 'length', error_name: 'config.code.length' },
    { title: '间隔时间', name: 'timeout', error_name: 'config.code.timeout', placeholder: '每次发送间隔时间' },
  ],
  aliyun: [
    { title: 'key', name: 'access_key_id', error_name: 'config.aliyun.access_key_id' },
    { title: 'secret', name: 'access_key_secret', error_name: 'config.aliyun.access_key_secret' },
    { title: '短信签名', name: 'sms_sign_name', error_name: 'config.aliyun.sms_sign_name' },
  ],
  avatar: [
    { title: '头像宽度', name: 'width', error_name: 'config.avatar.width' },
    { title: '头像高度', name: 'height', error_name: 'config.avatar.height' },
  ],
  upload: [
    { title: '文件大小', name: 'size', error_name: 'config.upload.size' },
    { title: '文件类型', name: 'mimes', error_name: 'config.upload.mimes' },
  ],
} as Record<string, formType[]>

//站点
// export const siteForm = [
//   { name: 'title', title: '网站名称', error_name: 'title' },
//   { name: 'url', title: '域名地址', error_name: 'url' },
// ] as formType[]

export const siteForm = {
  base: [
    { title: '标题', name: 'title', type: 'input', error_name: 'title' },
    { title: '后台标志', name: 'logo', type: 'image' },
    { title: '联系电话', name: 'tel', type: 'input' },
    { title: '企业邮箱', name: 'email', type: 'input' },
    { title: '公司地址', name: 'address', type: 'input' },
    { title: '微信二维码', name: 'wechat', type: 'image' },
    { title: 'QQ', name: 'qq', type: 'input' },
    { title: '备案号', name: 'icp', type: 'input' },
    { title: '版权信息', name: 'copyright', type: 'input' },
  ],
  aliyun: [
    { title: 'key', name: 'access_key_id', error_name: 'config.aliyun.access_key_id' },
    { title: 'secret', name: 'access_key_secret', error_name: 'config.aliyun.access_key_secret' },
    { title: '短信签名', name: 'sms_sign_name', error_name: 'config.aliyun.sms_sign_name' },
  ],
} as Record<string, formType[]>

//模块
export const moduleForm = [
  { title: '模块名称', name: 'title', error_name: 'title', placeholder: '请输入中文模块名称' },
  { title: '英文标识', name: 'name', error_name: 'name', placeholder: '模块的英文标识' },
  { title: '开发者', name: 'author', error_name: 'author', placeholder: '开发者名称' },
  { title: '版本号', name: 'version', error_name: 'version', value: '1.0.0' },
] as formType[]

export const roleForm = [
  { title: '角色名称', name: 'title', placeholder: '请输入角色描述' },
  { title: '角色标识', name: 'name', placeholder: '角色的英文标识' },
] as formType[]
