import { defineStore } from "pinia";

export const useItemsStore = defineStore("ItemsStore", {
  state: () => {
    return {
      lang: "zh",
      color:'rgb(21,128,61)',
      languages: [{ value: 'zh', display: '中文' }, { value: 'en', display: 'English' }],
      phoneNumber: '155 5555 5205',
      page: 'https://gitee.com/Xu-pixel',
      emailNumber: 'pixel-xu@cau.edu.cn',
      title: [
        {
          lang: 'zh',
          name: '徐柱柱',
          mail: '邮箱',
          phone: '手机'
        },
        {
          lang: 'en',
          name: 'Pixel Xu',
          mail: 'Email',
          phone: 'Mobile'
        }
      ],
      resume: [
        {
          lang: "en",
          contents: [
            {
              title: "EDUCATION",
              list: [
                {
                  name: 'China Agricultural University',
                  intro:
                    "Bachelor of Engineering in Computer Science and Technology GPA:3.52",
                  location: "Beijing,China",
                  period: "Sep. 2019 - July. 2023",
                  link: "http://en.cau.edu.cn/",
                  details: [
                    {
                      bold: '',
                      text: '',

                    }
                  ],
                },
              ],
            },
            {
              title: "EXPERIENCE",
              list: [
                {
                  name: 'Talk-now',
                  intro: 'chatApp based on Socket.io and Vue3 ',
                  location: 'personal',
                  period: 'Apr. 2022 - May. 2022',
                  link: 'https://gitee.com/Xu-pixel/talk-now-fe',
                  details: [
                    {
                      bold: "Modern UI",
                      text:
                        "built by tailwindcss",

                    }
                  ],
                },
              ],
            },
          ],
        },
        {
          lang: "zh",
          contents: [
            {
              title: "教育经历",
              list: [
                {
                  name: '中国农业大学',
                  intro: '计算机科学与技术 本科在读 GPA:3.52',
                  location: '中国 北京',
                  period: '2019.09 - 2023.7',
                  link: 'http://www.cau.edu.cn/',
                  details: [
                    {
                      bold: '',
                      text: ''

                    }
                  ],
                },
              ],
            },
            {
              title: "经历 / 项目",
              list: [
                {
                  name: 'Talk-now',
                  intro: '基于Socket.io和Vue3的即时通讯APP',
                  location: '个人',
                  period: '2022.04 - 2022.05',
                  link: 'https://gitee.com/Xu-pixel/talk-now-fe',
                  details: [
                    {
                      bold: '现代化 UI',
                      text:
                        '使用tailwindcss构建'

                    }
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  getters: {
    getContents: (state) => state.resume.find(v => v.lang == state.lang).contents,
    getTitle: (state) => state.title.find(v => v.lang == state.lang),
    // 用于展示的Details
    getDetails: (state) => (contentId, listId) => {
      const details = state.getContents[contentId].list[listId].details
      return details.filter(v => v.bold)
    },
    getDetailsLength:(state) => (contentId, listId) => {
      return state.getContents[contentId].list[listId].details.length
    },
  },
  actions: {
    deleteContents(id) {
      for (const r of this.resume) {
        r.contents.splice(id, 1)
      }
    },
    createContents() {
      for (const r of this.resume) {
        r.contents.push(
          {
            title: "标题 " + this.getContents.length.toString(),
            list: [
              {
                name: '做了啥捏',
                intro: '简单介绍下',
                location: '在哪 或者 和谁',
                period: '时间',
                link: '项目或者相关的链接',
                details: [
                  {
                    bold: '',
                    text:
                      ''
                  }
                ],
                hasDetail: true,
              },
            ],
          },
        )
      }
    },
    swapContents(i, j) {
      for (const r of this.resume) {
        const t = r.contents[i]
        r.contents[i] = r.contents[j]
        r.contents[j] = t
      }
    },
    createList(contentId) {
      for (const r of this.resume) {
        r.contents[contentId].list.push({
          name: '做了啥捏' + r.contents[contentId].list.length.toString(),
          intro: '简单介绍下',
          location: '在哪 或者 和谁',
          period: '时间',
          link: '项目或者相关的链接',
          details: [
            {
              bold: '',
              text: '',
            }
          ],
          hasDetail: true,
        })
      }
    },
    deleteList(contentId, listId) {
      for (const r of this.resume) {
        r.contents[contentId].list.splice(listId, 1)
      }
    },
    createDetail(contentId, listId) {
      for (const r of this.resume) {
        r.contents[contentId].list[listId].details.push({
          bold: '',
          text: ''
        })
      }
    },
    deleteDetail(contentId, listId, detailId) {
      for (const r of this.resume) {
        r.contents[contentId].list[listId].details.splice(detailId, 1)
      }
    }
  }
});
