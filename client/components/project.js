// components/project.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    avatar_url: 'data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMjU1LCAxNDEsIDI2LCAxKSI+CiAgICA8cGF0aCBkPSJNMjQgNEMxMi45NSA0IDQgMTIuOTUgNCAyNHM4Ljk1IDIwIDIwIDIwIDIwLTguOTUgMjAtMjBTMzUuMDUgNCAyNCA0em0wIDZjMy4zMSAwIDYgMi42OSA2IDYgMCAzLjMyLTIuNjkgNi02IDZzLTYtMi42OC02LTZjMC0zLjMxIDIuNjktNiA2LTZ6bTAgMjguNGMtNS4wMSAwLTkuNDEtMi41Ni0xMi02LjQ0LjA1LTMuOTcgOC4wMS02LjE2IDEyLTYuMTZzMTEuOTQgMi4xOSAxMiA2LjE2Yy0yLjU5IDMuODgtNi45OSA2LjQ0LTEyIDYuNDR6Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNMCAwaDQ4djQ4SDB6IiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==',
    answer_url:app.globalData.answernum_url,
    type_url: app.globalData.label_url,
    privaty_url: app.globalData.power1_url  
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})