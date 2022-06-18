import { getStorage, ref as ref_, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'

export const storageStores = defineStore({
  id: 'storage',

  state: () => ({
    storage: getStorage()
  }),

  actions: {
    async upload(data: Blob, name: string) {
      const mountainImagesRef = ref_(this.storage, name)
      const metadata = {
        contentType: 'image/jpeg',
      }
      await uploadBytes(mountainImagesRef, data, metadata)
        .then((snapshot) => {
          console.log('上傳成功')
        })
        .catch((error) => {
          console.log('上傳失敗')
          console.log(error)
        })
    },
    async getURL(name: string) {
      const forestRef = ref_(this.storage, name)
      return await getDownloadURL(forestRef)
        .then((url) => {
          return url
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
})
