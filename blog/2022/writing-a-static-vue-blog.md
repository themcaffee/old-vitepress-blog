# How to Deploy a Static Vue Blog on Github Pages using Vitepress

There are many ways to setup a blog on github pages but this is one of the best ways that I have found so far. If you are 
already familiar with Vue but want the speed of a static site then this is for you. I'm going to be deploy on Github pages
but everything except the last section is applicable regardless of where you decide to publish your site. I really like this method
it's easy to create blog posts using markdown but also possible to use Vue for themeing and other places in your blog. This is the same
method I used to setup this blog and you can view the source [here](https://github.com/themcaffee/themcaffee.github.io).


### Setup

The first step is to install the necessary dependencies. We are going to be using Vue and Vitepress to handle building our site. This guide
assumes that you have Node.js>=16.10 installed.

Create your project folder
```
mkdir yourgithubusername.github.io && cd yourgithubusername.io
```

Enable corepack to install yarn
```
corepack enable
```

Initalize the project
```
yarn init -2
```

Install VitePress
```
yarn add --dev vitepress vue
```


### Making your first page

Create your home page
```
mkdir blog && echo '# Hello World!' > blog/index.md
```

Add these scripts to `package.json`
```
{
    ...
    "scripts": {
        "blog:dev": "vitepress dev blog",
        "blog:build": "vitepress build blog",
        "blog:serve": "vitepress serve blog"
    }
    ...
}
```

Run your new blog locally
```
yarn blog:dev
```


### Configuring your site

To customize the site title and navigation, first create the file `blog/.vitepress/config.js` in your project folder with the following:
```
export default {
  title: 'Mitch McAffee',
  description: 'Thanks for all the fish',
  themeConfig: {
    siteTitle: 'Mitch McAffee'
  }
}
```
This will set your site title and description to whatever you would like. There are also other options to [update your icon](https://vitepress.vuejs.org/config/theme-configs) if you so please.

### Adding links

If you wanted to link to other pages in your header then add the following to `blog/.vitepress/config.js`:

```
export default {
  ...
  themeConfig: {
    ...
    nav: [
        { text: 'About', link: '/about' },
        { text: 'Github', link: 'https://github.com/themcaffee' },
        { text: 'LinkedIn', link: 'https://www.linkedin.com/in/mitch-mcaffee' }
    ],
    ...
  }
}
```

### Adding a blog post

Create a new file at `blog/2022/new-blog-post.md` with the following:
```
# New Blog Post

This is a new blog post
```

To add this to navigation, let's add it to a sidebar. Edit `blog/.vitepress/config.js` to look like the following:
```
export default {
  ...
  themeConfig: {
    ...
    sidebar: [
        {
            text: '2022',
            items: [
                { text: 'New Blog Post', link: '/2022/new-blog-post' }
            ]
        }
    ]
    ...
  }
}
```
Now if you navigate to `/newpage`, you will see the new page that has been created and is navigable from the sidebar.


### Deploy to Github Pages

The first step to deploy to github pages is to setup the github action that will run to build and deploy our files. Create a new file `.github/workflows/deploy.yml` in your project root with the following:
```
name: Deploy

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "deploy"
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - run: yarn install --frozen-lockfile
      - name: Build
        run: yarn blog:build
      - name: Setup Pages
        uses: actions/configure-pages@v2
      - name: Deploy
        uses: actions/upload-pages-artifact@v1
        with:
          path: blog/.vitepress/dist
      - name: Deploy to Github Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

Go to Github and create a new project with the name `<yourgithubusername>.github.io`. Then push your project to the project's `main` branch:
```
git init -b main
git add . && git commit -am "initial commit"
git add remote origin <your repo url>
git push origin main
```

Once your github action has finished you can visit `https://<yourgithubusername>.github.io` to see your new blog in action!
