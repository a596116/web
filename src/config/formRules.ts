export const userLoginFormRules = {
    phone: [
        { required: true, message: '請輸入手機', trigger: 'blur' },
        { length: 10, message: '手機長度10碼', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '請輸入名稱', trigger: 'blur' },
        { min: 2, max: 12, message: '名稱在2到12個字', trigger: 'blur' },
    ],
}
export const userRegistFormRules = {
    phone: [
        { required: true, message: '請輸入手機', trigger: 'blur' },
        { length: 10, message: '手機長度10碼', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '請輸入名稱', trigger: 'blur' },
        { min: 2, max: 12, message: '名稱在2到12個字', trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: '請輸入驗證碼', trigger: 'blur' },
        { min: 4, max: 4, message: '請輸入4位驗證碼', trigger: 'blur' },
    ],
}

export const userInfoFormRules = {
    name: [
        { required: true, message: '請輸入名稱', trigger: 'blur' },
        { min: 2, max: 12, message: '名稱在2到12個字', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '請輸入手機', trigger: 'blur' },
        { length: 10, message: '手機長度10碼', trigger: 'blur' },
    ],
    // password: [
    //     { required: true, message: '請輸入密碼', trigger: 'blur' },
    //     { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' },
    // ],
}
export const userPasswordAlterFormRules = {
    password: [
        { required: true, message: '請輸入舊密碼', trigger: 'blur' },
        { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: '請輸入新密碼', trigger: 'blur' },
        { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' },
    ],
}