export default {
  title: 'Mitch McAffee',
  description: 'Thanks for all the fish',
  themeConfig: {
    siteTitle: 'Mitch McAffee',
    nav: [
        { text: 'Contact', link: '/contact' },
        { text: 'Github', link: 'https://github.com/themcaffee' },
        { text: 'LinkedIn', link: 'https://www.linkedin.com/in/mitch-mcaffee' }
    ],
    sidebar: [
        {
            text: '2022',
            items: [
                { text: 'How to Deploy a Static Vue Blog on Github pages using Vitepress', link: '/2022/writing-a-static-vue-blog' }
            ]
        }
    ]
  }
}