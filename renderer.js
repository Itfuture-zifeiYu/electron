/**渲染器
 * 渲染器可以访问 versions 全局变量，该变量可以通过 window.versions 或简单地 versions 访问
 */
// 使用 document.getElementById DOM API 将 HTML 元素的显示文本替换为 info 作为其 id 属性
const info = document.getElementById('info')
info.innerText = `这个app的Chrome版本是V${versions.chrome()}，Node.js版本是V${versions.node()}，Electron版本是V${versions.electron()}`

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}
func()