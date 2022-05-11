import { viteMockServe } from 'vite-plugin-mock'
export const setupMockPlugin = (isBuild: boolean) => {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: !isBuild,
  })
}
