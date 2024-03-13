import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Republic Of Lunar",
  description: "Republic Of Lunar 的小窝!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
    ],
    sidebar: [
      {
        items: [
          {
            text: '前言',
            items: [
              { text: '欢迎', link: '/markdown/welcome.md' }
            ]
          },
          {
            text: 'Arch Linux',
            items: [
              { text: 'Arch Linux是什么', link: '/markdown/arch/what_is_arch.md' },
              { text: '安装Arch Linux', link: '/markdown/arch/install_arch.md' },
            ]
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Memory-Studio' },
    ]
  },
})
