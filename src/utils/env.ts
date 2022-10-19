import { cloneDeep } from "lodash-es"

const env: any = cloneDeep(import.meta.env)
Object.entries(import.meta.env as Record<string, any>).forEach(([key, value]) => {
  if (value == 'true' || value == 'false') {
    env[key] = value == 'true' ? true : false
  } else if (/^\d+$/.test(value)) {
    env[key] = Number(value)
  } else if (value == 'null') {
    env[key] = null
  } else if (value == 'undefined') {
    env[key] = undefined
  } else {
    env[key] = value
  }
})
export default env as ViteEnv
