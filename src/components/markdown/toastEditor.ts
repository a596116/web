import uploadApi from '@/apis/uploadApi'
import Editor from '@toast-ui/editor'

export default class {
  editor: Editor

  constructor(el: string, initialValue: string, public height: string) {
    this.editor = new Editor({
      el: document.querySelector(el)!,
      height: height,
      initialValue: initialValue,
      previewStyle: 'vertical',
      initialEditType: 'markdown',
      toolbarItems: this.toolbar() as [],
      plugins: [],
    })
    this.ImageHook()
  }

  private toolbar() {
    return [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'image', 'link'],
      ['code', 'codeblock'],
      [
        {
          el: this.fullscreen(),
          command: 'fullscreen',
          tooltip: 'fullscreen',
        },
      ],
    ]
  }

  private fullscreen() { }

  private ImageHook() {
    this.editor.removeHook('addImageBlobHook')
    this.editor.addHook('addImageBlobHook', async (file: File, callback: Function) => {
      const formData = new FormData()
      formData.append('file', file, file.name)

      const res = await uploadApi.uploadImage(formData)

      callback(res.result.url, file.name)
    })
  }
}
