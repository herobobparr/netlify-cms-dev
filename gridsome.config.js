// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  templates: {
    // Post: [
    //   {
    //     path: '/posts/:slug',
    //     component: 'src/templates/Post.vue',
    //   },
    // ],
  },
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ],
    },
  },
  plugins: [
    {
      // https://gridsome.org/plugins/@gridsome/source-filesystem
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/projects/**/*.md',
        typeName: 'Project',
        route: '/projects/:title',
        remark: {
          plugins: [
            // ...local plugins
          ],
        },
      },
    },
    {
      // https://gridsome.org/plugins/@gridsome/source-filesystem
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/news/**/*.md',
        typeName: 'News',
        route: '/news/:title',
        remark: {
          plugins: [
            // ...local plugins
          ],
        },
      },
    },
    {
      // https://gridsome.org/plugins/@gridsome/source-filesystem
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/pages/**/*.md',
        typeName: 'SitePage',
        remark: {
          plugins: [
            // ...local plugins
          ],
        },
      },
    },
    {
      // https://gridsome.org/plugins/@gridsome/source-filesystem
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/tags/**/*.md',
        typeName: 'Tags',
        remark: {
          plugins: [
            // ...local plugins
          ],
        },
      },
    },		
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
        modulePath: `src/admin/index.js`,
      },
    },
  ],
};
