import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

function headerNav(): object[] {
  let naviItems = [
    { to: "/downloads", label: "Downloads", position: "left" },
    {
      type: "docSidebar",
      sidebarId: "tutorialSidebar",
      position: "left",
      label: "Docs",
    },
    { to: "/blog", label: "Blog", position: "left" },
    {
      type: "custom-github-stars",
      position: "right",
    },
    {
      href: "https://github.com/xvrlang/xvr",
      label: "GitHub",
      position: "right",
    },
  ];

  return naviItems;
}

const config: Config = {
  title: " Xvr – A Tiny Educational Interpreter",
  tagline: "Learn how interpreters work by writing and running simple code",
  favicon: "img/favicon.ico",
  customFields: {
    discordServerID: "1229809804935954572",
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // url: "https://xvrlang.github.io/website",
  url: "https://xvrlang.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/website/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "xvrlang", // Usually your GitHub org/user name.
  projectName: "website", // Usually your repo name.

  onBrokenLinks: "throw",

  plugins: ["docusaurus-plugin-sass"],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/xvrlang/xvr/tree/main/docs",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/xvrlang/xvr/tree/main/blog/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/banner_xvr.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: "announcement-1",
      content:
        '🌟 If you like Xvr, don\'t forget to give us a star on <a href="https://github.com/xvrlang/xvr">Github</a> 🌟',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: true,
    },
    navbar: {
      title: "XvrLang",
      logo: {
        alt: "Xvr Lang Logo",
        src: "img/xvr_logo_circle.png",
      },
      items: headerNav(),
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Guide",
              to: "/docs/installation",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.com/invite/xkvjwsDrnx",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/xvrlang/xvr",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Xvr Site, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["shell-session", "bash"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
