
export function msg(msg: string, type: "info" | "success" | "warning" | "error" = 'success') {
  ElMessage({
    message: msg,
    center: true,
    type,
    showClose: true,
  })
}

