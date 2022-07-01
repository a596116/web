export type searchColumnsType = {
    title: string
    name: string
    type?: 'input' | 'select' | 'radio' | 'checkbox'
    options?: any
    readonly?: boolean
    disabled?: boolean
    placeholder?: string
    value?: any
}

// 用戶
export const userSearchForm = [
    { title: '用戶姓名', name: 'name', type: 'input' },
    {
        title: '用戶狀態', name: 'permissions', type: 'select',
        options: [
            { 'true': '1' },
            { 'false': '0' }
        ],
    },
    {
        title: '用戶權限', name: 'permissions', type: 'radio',
        options: ['浩呆', 'admin', 'user'],
    },
] as searchColumnsType[]

// blog
export const blogSearchForm = [
    { title: '標題', name: 'title', type: 'input' },
    {
        title: '類別', name: 'category', type: 'radio',
        options: ['HTML', 'JS', 'CSS'],
    },
] as searchColumnsType[]