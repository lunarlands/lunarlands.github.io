import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/style/starlight.css"],
      title: "Republic Of Lunar",
      editLink: {
        baseUrl:
          "https://github.com/lunarlands/lunarlands.github.io/edit/main/",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      social: {
        github: "https://github.com/lunarlands",
        gitlab: "https://gitlab.com/l.r",
      },
      sidebar: [
        {
          label: "Volume I | Tutorials",
          items: [
            {
              label: "Chapter I",
              autogenerate: { directory: "welcome" },
            },
            {
              label: "Chapter II",
              autogenerate: { directory: "starlight" },
            },
            {
              label: "Chapter III",
              autogenerate: { directory: "arch" },
            },
          ],
        },

      ],
    }),
  ],
});
