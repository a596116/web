export type formColumnsType = {
  title: string
  name: string
  error_name?: string
  type?: 'input' | 'textarea' | 'image' | 'preview' | 'radio' | 'checkbox' | 'tag' | 'password' | 'select'
  options?: any
  readonly?: boolean
  disabled?: boolean
  placeholder?: string
  value?: any
}

// 用戶登入表單
export const userLoginForm = [
  { title: '帳號', name: 'account', placeholder: '帳號' },
  { title: '密碼', name: 'password', type: 'password', placeholder: '密碼' },
] as formColumnsType[]

// 用戶註冊表單
export const userRegisterForm = [
  { title: '暱稱', name: 'name', placeholder: '暱稱' },
  { title: '帳號', name: 'account', placeholder: '帳號' },
  { title: '密碼', name: 'password', type: 'password', placeholder: '密碼' },
  { title: '驗證碼', name: 'token', placeholder: '驗證碼' },
] as formColumnsType[]

// 用戶編輯表單
export const userEditForm = [
  { title: '名稱', name: 'name', type: 'input', readonly: true },
  {
    title: '權限', name: 'permissions', type: 'checkbox',
    options: ['浩呆', 'admin', 'user'],
  },
] as formColumnsType[]

// 用戶表單
export const userForm = [
  { title: '名稱', name: 'name' },
  { title: '帳號', name: 'account', readonly: true },
  { title: '密碼', name: 'password' },
  {
    title: '權限',
    name: 'permissions',
    type: 'tag',
    options: {
      浩呆: '#fdcb6e',
      admin: '#6ec7a2',
      user: '#75cdd8',
    }
  },
  { title: '註冊時間', name: 'createdAt', readonly: true },
] as formColumnsType[]



/**
 * 新增表單區
 * content和image不用寫,其他需要填寫的要放
 **/
// Blog新增表單
export const blogForm = [
  { title: '標題', name: 'title', type: 'input' },
  { title: '圖片', name: 'image' },
  { title: '文章', name: 'content' },
  { title: '類別', name: 'category', options: ['HTML', 'JS', 'CSS'], type: 'select' },
] as formColumnsType[]

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
} as Record<string, formColumnsType[]>

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
} as Record<string, formColumnsType[]>

//模块
export const moduleForm = [
  { title: '模块名称', name: 'title', error_name: 'title', placeholder: '请输入中文模块名称' },
  { title: '英文标识', name: 'name', error_name: 'name', placeholder: '模块的英文标识' },
  { title: '开发者', name: 'author', error_name: 'author', placeholder: '开发者名称' },
  { title: '版本号', name: 'version', error_name: 'version', value: '1.0.0' },
] as formColumnsType[]

export const roleForm = [
  { title: '角色名称', name: 'title', placeholder: '请输入角色描述' },
  { title: '角色标识', name: 'name', placeholder: '角色的英文标识' },
] as formColumnsType[]
