/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
(async () => {
  const path = require('path');
  const fs = require('fs');
  const ejs = require('ejs');
  const routerParser = require('./routerParser');
  const { generateFile, getStat } = require('./generateFile.js');

  const { pages } = require('../pages.js');

  const defaultTemplatePage = fs.readFileSync(
    path.resolve(__dirname, './template/template.page.ejs'),
  );
  const defaultTemplateModel = fs.readFileSync(
    path.resolve(__dirname, './template/template.model.ejs'),
  );
  const templateLess = fs.readFileSync(
    path.resolve(__dirname, './template/template.less.ejs'),
  );
  const templateService = fs.readFileSync(
    path.resolve(__dirname, './template/template.service.ejs'),
  );
  const templateStore = fs.readFileSync(
    path.resolve(__dirname, './template/template.store.index.ejs'),
  );
  const templateRouter = fs.readFileSync(
    path.resolve(__dirname, './template/template.router.ejs'),
  );

  // 存储所有model信息，用于生产store.js
  const models = [];

  const api = require('./fetch/api.json');

  const pagesPath = path.resolve(__dirname, '../src/pages');
  const utilsPath = path.resolve(__dirname, '../src/utils');
  const storePath = path.resolve(__dirname, '../src/models');
  const sourceCodePath = path.resolve(__dirname, '../src');

  const generatePages = async (pageConfig) => {
    let { path: route } = pageConfig;
    const { template } = pageConfig;
    let templatePage = defaultTemplatePage;
    let templateModel = defaultTemplateModel;

    if (!route) return; // 如果没有path，说明不用生成页面，是用于创建menus

    // 如果存在自定义模板，则选自定义模板为输入
    if (template) {
      const templatePagePath = path.resolve(
        __dirname,
        `./template/${template}/template.page.ejs`,
      );
      const templateModelPath = path.resolve(
        __dirname,
        `./template/${template}/template.model.ejs`,
      );
      if (await getStat(templatePagePath)) {
        console.log(`使用 ${template} page模板`);
        templatePage = fs.readFileSync(templatePagePath);
      }
      if (await getStat(templateModelPath)) {
        console.log(`使用 ${template} model模板`);
        templateModel = fs.readFileSync(templateModelPath);
      }
    }

    // 做一些初始路由处理
    if (route.startsWith('/')) {
      route = route.slice(1);
    }

    const fullPath = path.resolve(sourceCodePath, route);
    const extname = path.extname(fullPath);
    let basePath = fullPath;
    if (extname) {
      basePath = fullPath.replace(extname, '');
    }
    const filename = path.win32.basename(basePath);
    const dirname = path.dirname(basePath);
    // console.log(basePath);
    // 注入page的参数, 过滤掉最后的index
    const modelName = `${path
      .relative(pagesPath, filename === 'index' ? dirname : basePath)
      .split('\\')
      .map((str) => str[0].toUpperCase() + str.substr(1))
      .join('')}`;
    // console.log(modelName);

    const serviceName = path.win32.basename(dirname);

    // path.relative(sourceCodePath, basePath);

    // 生成页面文件
    await generateFile({
      filePath: `${basePath}.js`,
      template: ejs.render(templatePage.toString(), {
        modelName,
        stylePath: `./${filename}.less`,
        servicePath: `./_service.${serviceName}.js`,
        config: pageConfig,
      }),
    });
    // 生成less文件
    await generateFile({
      filePath: `${basePath}.less`,
      template: ejs.render(templateLess.toString()),
      config: pageConfig,
    });
    // 生成model文件
    await generateFile({
      filePath: `${basePath}.model.js`,
      template: ejs.render(templateModel.toString(), {
        modelName,
        servicePath: `./_service.${serviceName}.js`,
        config: pageConfig,
      }),
    });
    // 生成service文件
    await generateFile({
      filePath: path.resolve(dirname, `_service.${serviceName}.js`),
      template: ejs.render(templateService.toString(), {
        name: modelName,
        list: api[modelName] || [],
        utilsPath: `${path.relative(dirname, utilsPath).split('\\').join('/')}`,
        config: pageConfig,
      }),
    });

    models.push({
      name: modelName,
      path: `${path
        .relative(storePath, `${basePath}.model`)
        .split('\\')
        .join('/')}`,
    });
  };

  // 注意forEach不支持async await
  for (let i = 0; i < pages.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await generatePages(pages[i]);
  }

  await generateFile(
    {
      filePath: path.resolve(storePath, '_models.js'),
      template: ejs.render(templateStore.toString(), {
        models,
      }),
    },
    true,
  );

  await generateFile(
    {
      filePath: path.resolve(sourceCodePath, '_router.js'), // 取名下划线开头，代表内部生成
      template: ejs.render(templateRouter.toString(), {
        router: JSON.stringify(routerParser(pages), null, 2),
      }),
    },
    true,
  );

  console.log('ok！');
})();
