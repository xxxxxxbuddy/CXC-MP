var config = require('./../../config.js')
var id
function timeCalc(time) {
  var now = new Date()
  var timeDiff = parseInt((now - time) / 1000)     //单位为秒
  if (timeDiff > 604800) {
    if (time.getFullYear() != now.getFullYear()) {
      return time.getFullYear() + time.getMonth() + time.getDate()
    } else {
      return time.getMonth() + 1 + '-' + time.getDate()
    }
  } else if (timeDiff >= 518400) {
    return '六天前'
  } else if (timeDiff >= 432000) {
    return '五天前'
  } else if (timeDiff >= 345600) {
    return '四天前'
  } else if (timeDiff >= 259200) {
    return '三天前'
  } else if (timeDiff >= 172800) {
    return '二天前'
  } else if (timeDiff >= 86400) {
    return '一天前'
  } else if (timeDiff >= 3600) {
    return parseInt(timeDiff / 60 / 60) + '小时前'
  } else return parseInt(timeDiff / 60) + '分钟前'

}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:{},
    "question": '',
    avatar_url: 'data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMjU1LCAxNDEsIDI2LCAxKSI+CiAgICA8cGF0aCBkPSJNMjQgNEMxMi45NSA0IDQgMTIuOTUgNCAyNHM4Ljk1IDIwIDIwIDIwIDIwLTguOTUgMjAtMjBTMzUuMDUgNCAyNCA0em0wIDZjMy4zMSAwIDYgMi42OSA2IDYgMCAzLjMyLTIuNjkgNi02IDZzLTYtMi42OC02LTZjMC0zLjMxIDIuNjktNiA2LTZ6bTAgMjguNGMtNS4wMSAwLTkuNDEtMi41Ni0xMi02LjQ0LjA1LTMuOTcgOC4wMS02LjE2IDEyLTYuMTZzMTEuOTQgMi4xOSAxMiA2LjE2Yy0yLjU5IDMuODgtNi45OSA2LjQ0LTEyIDYuNDR6Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNMCAwaDQ4djQ4SDB6IiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==',
    answer_url: 'data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMTg3LCAxODcsIDE4NywgMSkiPgogICAgPHBhdGggZD0iTTM4IDZIMTBjLTIuMjEgMC00IDEuNzktNCA0djI4YzAgMi4yMSAxLjc5IDQgNCA0aDI4YzIuMjEgMCA0LTEuNzkgNC00VjEwYzAtMi4yMS0xLjc5LTQtNC00ek0xOCAzNGgtNFYyMGg0djE0em04IDBoLTRWMTRoNHYyMHptOCAwaC00di04aDR2OHoiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik0wIDBoNDh2NDhIMHoiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+',
    back_url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMTMgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Q2hldnJvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQmFycy9OYXZpZ2F0aW9uLUJhci9fL0xpZ2h0L0xlZnQtQ29tYmluYXRpb25zL0JhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOC4wMDAwMDAsIC0xMS4wMDAwMDApIiBmaWxsPSIjMDA3QUZGIj4KICAgICAgICAgICAgPGcgaWQ9IkJhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgMTAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuMDM3MTM0OSwyMS41ODI2NjczIEwwLjc5MjE1MTg1MiwxMi40NDU4MDQyIEMwLjQwMjYxNjA0OSwxMi4wNjExODg4IDAuNDAyNjE2MDQ5LDExLjQzOTgxMDIgMC43OTIxNTE4NTIsMTEuMDU0MTk1OCBMMTAuMDM3MTM0OSwxLjkxNzMzMjY3IEMxMC41OTk0NjQ4LDEuMzYwODg5MTEgMTEuNTE0Mzc0NSwxLjM2MDg4OTExIDEyLjA3NzcwMzIsMS45MTczMzI2NyBDMTIuNjQwMDMzMSwyLjQ3Mzc3NjIyIDEyLjY0MDAzMzEsMy4zNzY4NzMxMyAxMi4wNzc3MDMyLDMuOTMzMzE2NjggTDQuMTY5MTI3NjIsMTEuNzUwNDk5NSBMMTIuMDc3NzAzMiwxOS41NjU2ODQzIEMxMi42NDAwMzMxLDIwLjEyMzEyNjkgMTIuNjQwMDMzMSwyMS4wMjYyMjM4IDEyLjA3NzcwMzIsMjEuNTgyNjY3MyBDMTEuNTE0Mzc0NSwyMi4xMzkxMTA5IDEwLjU5OTQ2NDgsMjIuMTM5MTEwOSAxMC4wMzcxMzQ5LDIxLjU4MjY2NzMiIGlkPSJDaGV2cm9uIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
    avatar_icon: 'data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMjU1LCAxNDEsIDI2LCAxKSI+CiAgICA8cGF0aCBkPSJNMjQgNEMxMi45NSA0IDQgMTIuOTUgNCAyNHM4Ljk1IDIwIDIwIDIwIDIwLTguOTUgMjAtMjBTMzUuMDUgNCAyNCA0em0wIDZjMy4zMSAwIDYgMi42OSA2IDYgMCAzLjMyLTIuNjkgNi02IDZzLTYtMi42OC02LTZjMC0zLjMxIDIuNjktNiA2LTZ6bTAgMjguNGMtNS4wMSAwLTkuNDEtMi41Ni0xMi02LjQ0LjA1LTMuOTcgOC4wMS02LjE2IDEyLTYuMTZzMTEuOTQgMi4xOSAxMiA2LjE2Yy0yLjU5IDMuODgtNi45OSA2LjQ0LTEyIDYuNDR6Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNMCAwaDQ4djQ4SDB6IiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==',
    comment_icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iIzMzMzMzMyIgZD0iTTI4OS4wMTM4MzMgMzg5Ljc0MTU0N2MtMzAuNzQzMTU2IDAtNTUuNzA0MDMzIDI1Ljg1Nzg2OC01NS43MDQwMzMgNTcuNzg1MjIyIDAgMzEuOTA2NzY3IDI0Ljk2MTA3NiA1Ny43NjQyMzYgNTUuNzA0MDMzIDU3Ljc2NDIzNiAzMC43ODgxMjYgMCA1NS43MDQ2MzItMjUuODU3NDY5IDU1LjcwNDYzMi01Ny43NjQyMzZDMzQ0LjcxODI2NSA0MTUuNTk5NDE2IDMxOS44MDE3NTggMzg5Ljc0MTU0NyAyODkuMDEzODMzIDM4OS43NDE1NDdMMjg5LjAxMzgzMyAzODkuNzQxNTQ3IDI4OS4wMTM4MzMgMzg5Ljc0MTU0N3pNNTExLjgzMjE2MiAzODkuNzQxNTQ3Yy0zMC43ODMxMjkgMC01NS43MDQ2MzIgMjUuODU3ODY4LTU1LjcwNDYzMiA1Ny43ODUyMjIgMCAzMS45MDY3NjcgMjQuOTIxNTAzIDU3Ljc2NDIzNiA1NS43MDQ2MzIgNTcuNzY0MjM2IDMwLjc0MzE1NiAwIDU1LjY2MzA2LTI1Ljg1NzQ2OSA1NS42NjMwNi01Ny43NjQyMzZDNTY3LjQ5NTIyMiA0MTUuNTk5NDE2IDU0Mi41NzUxMTggMzg5Ljc0MTU0NyA1MTEuODMyMTYyIDM4OS43NDE1NDdMNTExLjgzMjE2MiAzODkuNzQxNTQ3IDUxMS44MzIxNjIgMzg5Ljc0MTU0N3pNNzM0LjYxMDUxOCAzODkuNzQxNTQ3Yy0zMC43NDI5NTYgMC01NS43MDcwMzEgMjUuODU3ODY4LTU1LjcwNzAzMSA1Ny43ODUyMjIgMCAzMS45MDY3NjcgMjQuOTY0MDc0IDU3Ljc2NDIzNiA1NS43MDcwMzEgNTcuNzY0MjM2IDMwLjczODE2IDAgNTUuNzAyMjM0LTI1Ljg1NzQ2OSA1NS43MDIyMzQtNTcuNzY0MjM2Qzc5MC4zMTI1NTIgNDE1LjU5OTQxNiA3NjUuMzQ4Njc4IDM4OS43NDE1NDcgNzM0LjYxMDUxOCAzODkuNzQxNTQ3TDczNC42MTA1MTggMzg5Ljc0MTU0NyA3MzQuNjEwNTE4IDM4OS43NDE1NDd6TTg0Ni4wMTQ3ODYgMTI4LjQ4ODg3NyAxNzcuNjQ3NTM5IDEyOC40ODg4NzdjLTYxLjUyODY4NCAwLTExMS40MDY2NjYgNTEuNzQ4MzE1LTExMS40MDY2NjYgMTE1LjU3MjQ0MmwwIDM3OC4wNTU2NzhjMCA2My44MDM1NDEgNTAuOTcyMjQxIDEyMi42MjI2NjIgMTEzLjkwMzk3MyAxMjIuNjIyNjYybDE2OS43ODU0ODUgMGMyOS41NjIzNTcgMzEuNTI3NjI0IDE1Mi4wNDc1MTIgMTQ1LjAwMjI4OCAxNTIuMDQ3NTEyIDE0NS4wMDIyODggNS40MzQzMTYgNS42NjkxNTYgMTQuMjM1MzQ4IDUuNjY5MTU2IDE5LjY2MzY2OCAwIDAgMCA4OS42ODY5OTItODguMzQxOTA0IDE0OC4xMDcxODMtMTQ1LjAwMjI4OGwxNzMuNzI4NjEyIDBjNjIuOTM0MTMxIDAgMTEzLjkwNjU3MS01OC44MTg5MjEgMTEzLjkwNjU3MS0xMjIuNjIyNjYybDAtMzc4LjA1NTY3OEM5NTcuMzgzODc4IDE4MC4yMzcxOTEgOTA3LjUwMDg5OCAxMjguNDg4ODc3IDg0Ni4wMTQ3ODYgMTI4LjQ4ODg3N0w4NDYuMDE0Nzg2IDEyOC40ODg4NzcgODQ2LjAxNDc4NiAxMjguNDg4ODc3ek05MDEuNjc2ODQ3IDYyMi4xMTY5OTdjMCAzMS44OTYzNzQtMjYuNzUyNjYyIDY1LjM4MjQ3MS01OC4xOTkzNDEgNjUuMzgyNDcxbC0xNzAuODM3NzcyIDBjLTIwLjcxMzk1NiAwLTM5LjMyMzMzOSAyMS4yNTc1ODctMzkuMzIzMzM5IDIxLjI1NzU4N2wtMTE5Ljk1MDQ3NCAxMTEuMTM3MjQ5LTExOS45NDgyNzUtMTExLjEzNzI0OWMwIDAtMjIuODE1OTMxLTIxLjI1NzU4Ny00Mi4zOTA2NTktMjEuMjU3NTg3bC0xNzAuODgyMTQyIDBjLTMxLjQ0NDY4MSAwLTU4LjIwMTkzOS0zMy40ODYwOTYtNTguMjAxOTM5LTY1LjM4MjQ3MWwwLTM3OC4wNTU2NzhjMC0zMS45MjY3NTQgMjQuOTE5MTA1LTU3Ljc3OTYyNSA1NS43MDQ2MzItNTcuNzc5NjI1bDY2OC4zNjcyNDcgMGMzMC43NDc5NTMgMCA1NS42NjIwNjEgMjUuODUyODcyIDU1LjY2MjA2MSA1Ny43Nzk2MjVMOTAxLjY3Njg0NyA2MjIuMTE2OTk3IDkwMS42NzY4NDcgNjIyLjExNjk5NyA5MDEuNjc2ODQ3IDYyMi4xMTY5OTd6IiAvPjwvc3ZnPg==',
    like_icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjE5OS44MHB4IiB2aWV3Qm94PSIwIDAgMTAyNSAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iIzMzMzMzMyIgZD0iTTk2OC4wMjggNTczLjk5OWMyNC0yNy4zMyAzNi02NC4zMyAzNi0xMTEuMDA3IDAtMTMuMzMyLTEuNS0yNS44MzItNC41MS0zNy41MDItMy4wMS0xMS42NjctNy4xOC0yMi4xNjUtMTIuNTEtMzEuNDg1LTMuMzMtNS4zMzUtNy41LTEwLjMzNy0xMi41MS0xNS4wMS01LjAxNS00LjY3LTEwLjE4LTguNS0xNS40OS0xMS40ODctNS4zMS0yLjk4NS0xMS4xNDUtNS4zMjItMTcuNS03LjAwNy02LjM2LTEuNjg1LTEyLjg2LTIuNTE4LTE5LjQ5LTIuNDk1bC0xMzQuMDEgMGM3Mi42Ni0xMzIuNjY3IDkwLjY2LTIzMS42NjIgNTQuMDEtMjk2Ljk4Mi0xMS4zMjUtMjAuNjcyLTI2LjgyNS0zNi4wMS00Ni40OS00Ni4wMTVDNzc1Ljg1OCA1LjAwMiA3NTYuNjg4IDAgNzM4LjAyMyAwYy0zLjMyNSAwLTYuNDk1IDAuNS05LjUwNSAxLjUwNS0zLjAxIDEuMDAyLTUuNjcgMi41MDUtOCA0LjUxLTIuMzI1IDIuMDA1LTQuMTYgNC4zNDItNS41IDcuMDA3LTEuMzUgMi42NjctMi4zNSA1LjY2NS0zLjAxIDguOTkyLTEuMzQ1IDEzLjMzMi00LjY4IDI3LjMzNy0xMC4wMTUgNDIuMDE1LTUuMzM1IDE0LjY3Ny0xMi4xNzUgMjkuNTE1LTIwLjUxNSA0NC41MS04LjM0IDE0Ljk5Ny0xOCAyOS45OTUtMjguOTkgNDQuOTktMTAuOTg1IDE0Ljk5Ny0yMy4zMTUgMjkuOTk1LTM2Ljk5IDQ0Ljk5Mi0xMy42NyAxNC45OTctMjguNTEgMjkuODMyLTQ0LjUxIDQ0LjUxLTc5Ljk5NyA3MS45OTctMTcwLjMzIDEyNC45OTctMjcwLjk5OSAxNTkuMDAyLTUuOTk1LTEyLjY3LTE1LjMyNy0yMy4xNjctMjcuOTk3LTMxLjQ4Ny0xMi42NzItOC4zMTctMjYuMzM1LTEyLjQ5LTQwLjk5Mi0xMi41MUw3Ni45OSAzNTguMDM2Yy0yMS4zMzIgMC0zOS40OTcgNy40OTctNTQuNDk1IDIyLjQ5NVMwIDQxMy42OTQgMCA0MzUuMDI2bDAgNDYwLjk3NmMwIDIxLjMzNSA3LjQ5NyAzOS40OTUgMjIuNDk1IDU0LjQ5NSAxNC45OTcgMTQuOTk1IDMzLjE2MiAyMi40OSA1NC40OTUgMjIuNDlsMTU0LjAxIDBjMTAuMDA1IDAgMTkuODQtMi4xNiAyOS41MDUtNi40OSA5LjY2Mi00LjMzIDE3Ljk5Mi0xMC4xNyAyNC45OS0xNy41MDUgNi45OTctNy4zNCAxMi41LTE1LjY3IDE2LjUxMi0yNC45OTUgMzEuMzM3IDQuMDE1IDU5LjAwNSA5LjE3NSA4My4wMDUgMTUuNDkgMjMuOTk3IDYuMzE1IDQxLjE2IDExLjgyIDUxLjQ4NSAxNi41MSAxMC4zMjUgNC42OTUgMjMuODMgMTEuMzYgNDAuNTEyIDIwIDIwLjAxIDExLjMzIDM2LjUxIDE5LjUgNDkuNSAyNC41MSAxMi45OSA1LjAxNSAzNS4zMyAxMC4xOCA2Ny4wMSAxNS40OSAzMS42OCA1LjMxIDY5LjUxIDcuOTggMTEzLjUgOCAxOC42NjUgMCAzNi4zMy0yLjMzNSA1Mi45OS03LjAxIDE2LjY2LTQuNjcgMzEuNjU1LTExLjMzNSA0NC45OS0yMCAyNi0xNy4zNCA0Mi00MC4zNCA0OC02OC45OSAyMC42Ny04LjY2IDM4LTI3LjMyNSA1MS45OTUtNTUuOTk1IDE0LjY3NS0yOS45OTUgMjIuMDE1LTU5Ljk5NSAyMi4wMTUtOTAuMDE1bDAtOGMwLTItMC4zMy00LjAxLTAuOTktNi4wMTUgNC42Ny0zLjMyNSA5LTcuMTU1IDEyLjk5LTExLjQ4NSAzLjk5LTQuMzMgNy44Mi05LjE2NSAxMS40OS0xNC41IDMuNjctNS4zMyA2LjgzNS0xMS4zMzUgOS41LTE4LjAxIDE1LjM0LTI5LjMzNSAyMy4wMS02MC4zMyAyMy4wMS05Mi45OSAwLTIxLjk5NS00LTQwLTEyLTU0LjAxNS0xLjM0NS0xLjM0NS0yLjAyLTIuMzQ1LTIuMDItMy4wMWwtMC45OSAwTDk2OC4wMjggNTczLjk5OXpNMjMwLjA3MiA5MjEuOTg4IDc3LjA4NSA5MjEuOTg4Yy0zLjMyNyAwLTYuNjY1LTAuODM1LTEwLjAxNS0yLjUtMy4zNS0xLjY2LTYuMTg3LTMuNS04LjUxMi01LjUtMi4zMjUtMi4wMS00LjE2LTQuNjc1LTUuNTAyLTgtMS4zNDUtMy4zMy0yLjAxNy02LjY3LTIuMDE3LTEwLjAyTDUxLjAzOSA0MzQuOTk0YzAtNi42NzcgMi40OTctMTIuNTEyIDcuNDg3LTE3LjUwNSA0Ljk5Mi00Ljk5IDExLjE1Ny03LjQ4NyAxOC40OTctNy40ODdsMTUyLjk4NyAwYzcuMzM3IDAgMTMuNTAyIDIuNDk3IDE4LjQ5NSA3LjQ4NyA0Ljk5IDQuOTkyIDcuNDg3IDEwLjgyNyA3LjQ4NyAxNy41MDVsMCA0NjAuOTc0YzAgMTMuMzM1LTYuMzM3IDIxLjY2NS0xOS4wMDcgMjQuOTktMi42NjcgMC01LjAwMiAwLjMzNS03LjAwNyAwLjk5NUwyMzAuMDcyIDkyMS45ODh6TTkzOS4wMzggNTI1Ljk5OWMtNy4zMzUgMTMuOTk1LTEzLjY3IDIwLjk5LTE5LjAwNSAyMC45OS03LjMzNSAwLTEzLjUwNSAyLjUtMTguNDk1IDcuNDlzLTcuNDkgMTAuOTk1LTcuNDkgMTguMDE1YzAgNy4wMTUgMi41IDEzLjAyNSA3LjQ5IDE4LjAxNXMxMS4xNiA3LjQ5IDE4LjQ5NSA3LjQ5YzIuNjY1IDAgNC42NzUgMS4zMyA2LjAxNSA0IDMuMzMgNi42NzUgNC45OSAxNi4zNCA0Ljk5IDI4Ljk5IDAgMjQuNjYtNS4zMyA0OC4zMy0xNiA3MS4wMDUtOS4zNCAxOC42NjUtMTcuNjcgMjcuOTk1LTI0Ljk5IDI3Ljk5NS00LjY3IDAtOSAxLjAwNS0xMi45OSAzLjAxLTMuOTkgMi4wMS03LjE2IDUuMDA1LTkuNSA4Ljk5LTIuMzUgMy45OS0zLjUxIDguMzItMy40OSAxMi45OTUgMCAzLjMyNSAwLjUgNi4zMjUgMS41IDguOTkgMS4wMDUgMi42NjUgMi4zNCA1LjAwNSA0IDcuMDEgMS42NyAyLjAwNSAzLjgzIDQuMDEgNi41IDYuMDE1IDAuNjYgOS4zNC0xLjE3NSAyMy4wMS01LjUwNSA0MC45OS00LjMzIDE3Ljk4NS0xMS4xNjUgMzMuNjUtMjAuNTE1IDQ3LjAxLTggMTEuMzI1LTE0Ljk5IDE2Ljk5LTIwLjk5IDE2Ljk5LTQuNjcgMC05IDEtMTIuOTkgMy4wMS0zLjk5IDItNy4xNiA1LTkuNSA4Ljk5LTIuMzUgMy45OS0zLjUxIDguMzItMy40OSAxMi45OSAwIDIxLjMzLTkuNTA1IDM3LjY2LTI4LjUxIDQ4Ljk5LTE5LjAxIDExLjMzLTQxLjUwNSAxNi45OS02Ny40OSAxNi45OS00MCAwLTc0LTIuMTY1LTEwMi4wMS02LjQ5NS0yOC4wMS00LjMzLTQ3Ljg0LTguODMtNTkuNDktMTMuNTA1LTExLjY0NS00LjY3LTI2LjQ4LTEyLjAxLTQ0LjUwNy0yMi4wMS0xOC4wMDUtOS4zNS0zMi44NDItMTYuNjg1LTQ0LjUxLTIyLjAyLTExLjY3LTUuMzMtMzAuODM3LTExLjUtNTcuNTAyLTE4LjQ5NS0yNi42NjctNi45OTUtNTcuMzMyLTEyLjgzLTkxLjk5Ny0xNy41MDVMMzA3LjA2MiA0NTMuOTM2YzExMS4zMzUtMzYuNjcgMjEwLjY2Ny05NC4zMzIgMjk4LjAwNy0xNzIuOTg3IDgzLjMyNS03NS4zMjUgMTM0LjMyLTE1MC42NiAxNTIuOTg1LTIyNi4wMDcgMTguMDA1IDUuMzMyIDMxLjM0IDE1LjY2NyA0MCAzMS4wMDcgNC42NzUgOS4zNDIgNy44NCAyMC41MSA5LjUwNSAzMy41MDIgMS42NiAxMi45OTIgMS4xNiAzMC42NTUtMS41MDUgNTIuOTlzLTExLjE2NSA1MC41MDUtMjUuNTA1IDg0LjUxYy0xNC4zMzUgMzQuMDAyLTM0LjE2IDcyLjAwNy01OS40ODUgMTE0LjAxMi0yLjAwNSA0LjAxLTMuMDA1IDguMzQtMy4wMDUgMTIuOTkgMCA0LjY1MiAxIDguOTgyIDMuMDA1IDEyLjk5MiA0LjY3NSA4LjY2MiAxMi4wMSAxMi45OTIgMjIuMDE1IDEyLjk5MmwxODcgMCAyLjAyIDIuMDE1YzEuMzQgMCAyLjUwNSAwLjMzIDMuNDkgMC45OTIgMC45OCAwLjY2IDEuOTggMS40OTIgMy4wMDUgMi40OTVzMS44NTUgMi4wMDUgMi40OTUgMy4wMDdjMC42NCAxLjAwMyAxLjY0IDIuMTY1IDMuMDEgMy40OSAyLjY2NSA0LjY3IDQuODMgMTAuNTA1IDYuNDk1IDE3LjUwMiAxLjY2NSA2Ljk5NyAyLjQ5NSAxNC44MjUgMi40OTUgMjMuNDg3IDAgMjMuMzM3LTQuNjcgNDQuMzQtMTQuMDE1IDYzLjAwNUw5MzkuMDM4IDUyNS45OTl6IiAvPjwvc3ZnPg==',
    maskOpacity: "0",
    mask_z_index: -1,
    userName: '',
    pubTime: '',
    questionInfo: '',
    answerNum: '',
    questionTitle: '',
    answerList: '',
    commentAwsPos: '-100%',
    user_id: '',
    answer_id: '',
    object_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     id=options.id
    var that = this
    wx.request({
      url: config.service.detail,
      method: 'get',
      data: {
        object_id: id,
      },
      success: function (res) {
        console.log(res);
        let result = res.data.result[0]
        let answer = res.data.answer
        if (!result) {
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        }
        that.setData({
          questionTitle: result.question_title,
          userName: result.user_id,
          pubTime: timeCalc(new Date(result.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))),
          questionInfo: result.question_info,
          answerNum: result.answernum,
          answerList: answer,
          object_id: id
        })
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var object_id = [];
    var that=this;

    if(that.data.id){
      for (var item in that.data.id) {
        if (that.data.id[item]) {
          object_id.push(item)
        }
      }
      console.log(object_id)
      wx.request({
        url: config.service.praise,
        data: {
          user_type: 0,
          user_id: '15827576787',
          object_type: 0,
          object_id: object_id
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  commentAws: function(e){
    wx.navigateTo({
      url: "./../comment/comment?answer_id="+e.target.dataset.answerid
    })
  },
  ansQuestion: function (e) {
    this.setData({
      commentAwsPos: 0,
      maskOpacity: "0.3",
      mask_z_index: "2"
    })
  },
  closeComment: function () {
    this.setData({
      commentAwsPos: "-100%",
      maskOpacity: "0",
      mask_z_index: -1
    })
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  like: function(e){
    console.log(e)
    var that = this

    let id = e.target.dataset.id
    if(that.data.id[id]){
      let count = -1
      for (var ans of that.data.answerList) {
        count++
        if (ans.answer_id == id) {
          that.data.answerList[count].praisenum--;
          that.data.id[id]= false;
          that.setData({
            answerList: that.data.answerList,
          })
          break
        }
      }

    }
    else {
      let count = -1
      for (var ans of that.data.answerList) {
        count++
        if (ans.answer_id == id) {
          that.data.answerList[count].praisenum++;
          that.data.id[id] = true;
          that.setData({
            answerList: that.data.answerList,
          })
          break
        }
      }
    } 
  },
  submitAns: function(e){
     //回答问题，传输数据举例{user_type: 0/1, user_id:18211949726, answer_info: '你好，我也好',object_type:0,object_id:1}
    wx.request({
      url: config.service.answer,
      data: {
        user_type: 0,      //app.globalData.user_type,
        user_id: "15827576787",   //app.globalData.user_id,
        answer_info: e.detail.value.answerInfo,
        object_type: 1,
        object_id: this.data.object_id
      },
      success: function(){
        wx.showToast({
          title: '回答成功！',
          icon: 'none'
        })
      }
    })
  }
})
