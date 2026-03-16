# NextJS Academic Theme（数据驱动的学术主页）

## 前言

本项目已部署到 vercel 上，对于组内维护人员维护成本极低，只需要按照下面“维护方法”步骤进行即可，不需要额外操作。 对于其他用途的，同样可以按照“维护方法”步骤进行，并自行部署到服务器中。

特别注意，本项目由以下项目修改而成，这里注明出处：

https://github.com/lydhr/NextJSAcademicTheme

## 如何配环境 & 本地运行

先确保你本机有 Node.js + npm（建议用 nvm 管理 Node 版本）。

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 生产构建
npm run build

# 本地启动（生产模式）
npm run start
```

由于本项目已部署至vercel，组内人员维护仅需要进行`npm install` 和 `npm run dev`操作，后者可以进行预览，任何修改都实时更新至页面。

## 这个项目的一些特征

- **Next.js（Pages Router）+ React + TypeScript**
- **Tailwind CSS**：整体样式由 Tailwind 负责
- **数据驱动**：页面内容主要来自 `components/data/*.json`，多数情况下只改 data 不用改组件代码
- **暗色模式支持**：项目依赖了 `next-themes`
- **SEO/sitemap**：构建后会跑 `next-sitemap`（见 `package.json` 的 `postbuild`）

## 数据怎么改

### (a) 针对 `components/data`

你主要会改这些文件（按板块对应）：

- **个人信息**：`components/data/personalInfo.json`
- **News**：`components/data/news.json`
- **Publications**：`components/data/publications.json`
- **Projects**：`components/data/projects.json`
- **Teaching**：`components/data/teaching.json`
- **Team**：`components/data/team.json`

资源文件一般在 `public/` 下（例如论文/项目图片、`public/images/publications/20-1-Prediction.png` 等）。

### (b) 对应每个页面：通常只需要改 data

- **首页**：`pages/index.tsx`
  - 当前渲染：`About` + `NewsList`
  - `PublicationList / Teaching / Education` 在代码里被注释掉了；若要展示，取消注释即可
- **Publications 页**：`pages/publications.tsx` → `components/PublicationList.tsx` → `components/data/publications.json`
- **Projects 页**：`pages/projects.tsx` → `components/ProjectList.tsx` → `components/data/projects.json`
- **Team 页**：`pages/team.tsx` → `components/TeamList.tsx` → `components/data/team.json`

## 板块特征

- **About**（`components/About.tsx`）
  - **数据来源**：`personalInfo.name`、`personalInfo.about.email`
  - **注意**：简介/中文简介等大段文本目前是写在组件里的（不是 data 驱动）

- **News**（`components/NewsList.tsx` → `components/data/news.json`）
  - **字段**：`id`, `content`, `date`（形如 `YYYY-MM`）, `isNew`, `links`
  - **排序**：按 `date` **从新到旧**（字符串比较 `localeCompare`）

- **Publications**（`components/PublicationList.tsx` → `components/data/publications.json`）
  - **字段**：`id`, `author`, `title`, `conference`, `year`（字符串）, `image`, `links`
  - **排序**：先按 `year` **降序**；同一年再按 `id` **降序**

- **Projects**（`components/ProjectList.tsx` → `components/data/projects.json`）
  - **字段**：由 `ProjectItem` 使用：`img`, `title`, `description`
  - **排序**：**不排序**，按 JSON 数组原始顺序渲染
  - <u>目前没有使用</u>

- **Teaching**（`components/Teaching.tsx` → `components/data/teaching.json`）
  - **字段**：`id`, `name`
  - **排序**：**不排序**，按 JSON 数组原始顺序渲染
  - <u>目前没有使用</u>

- **Education**（`components/Education.tsx` → `components/data/personalInfo.json` 的 `education` 数组）
  - **字段**：`name`, `link`
  - **排序**：**不排序**，按 `education` 数组顺序展示
  - <u>目前没有使用</u>

- **Team**（`components/TeamList.tsx` → `components/data/team.json`）
  - **Alumni / graduates**
    - **字段**：`name`, `chineseName?`, `degree`, `graduationYear`, `destination`, `destinationEn?`
    - **排序**：按 `graduationYear` **升序**（字符串比较）
  - **Current Students / currentStudents**
    - **字段**：`name`, `chineseName?`, `degree`, `year`
    - **排序**：
      - 先按学位类型优先级：**PhD/Doctoral > Master/Postgraduate > Undergraduate > 其他**
      - 同一学位类型内，再按 `year` **升序**

## 维护方法

1. 把该项目克隆到本地
2. 根据“如何配环境&本地运行”配置好项目环境并运行
3. 大部分修改需求仅需修改 data/xxx.json 即可解决，具体可以看上面“板块特征”
4. 大部分常维护字段已经做了排序处理，这些字段只需要在 json 后面添加新的素材即可，不需要考虑顺序
5. Team 字段预存了PhD 的字段，具体模板详见“conponents/data/team.json”中“_comments”部分
6. 附件、图片等素材存放位置为“publics/”，例如最常见的“publics/images/”
7. 维护完成后做好 commit 描述，并推至本仓库，vercel 会自动完成识别并更新网站，不需要额外操作

## 预见性待维护信息

1. 目前 News 没有限数量上限的逻辑，后续有需要可以加入
2. 目前 Projects、Teaching、Education 字段并没有加入页面，后续有需要需要加入页面逻辑 (例如 Projects)
