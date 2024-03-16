import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Republic Of Lunar",
  description: "",
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/lunarlands/lunarlands.github.io/edit/main/:path',
      text: '在 Github 上编辑本页'
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    outlineTitle: "文章大纲",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Arch Linux', link: '/markdown/arch/arch.md' },
    ],
    sidebar: [
      {
        items: [
          {
            text: 'Chapter I',
            items: [
              { text: '欢迎', link: '/markdown/welcome.md' },
            ]
          },
          {
            text: 'Chapter II',
            items: [
              { text: 'Arch Linux', link: '/markdown/arch/arch.md' },
              { text: 'Arch Linux是什么', link: '/markdown/arch/what_is_arch.md' },
              { text: '安装Arch Linux', link: '/markdown/arch/install_arch.md' },
              { text: '安装输入法', link: '/markdown/arch/input.md' },
            ]
          },
        ],
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lunarlands', },
    ]
  },
})
