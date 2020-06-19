import models from './_models';

export function registerModels(app) {
  models.forEach((model) => {
    app.model(model);
  });
}
