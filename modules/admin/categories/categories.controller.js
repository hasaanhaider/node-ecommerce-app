const categoriesService = require('./categories.service');
const categoriesValidation = require('./categories.validation');


exports.createCategory = async (req, res, next) => {
  try {
    const { error } = categoriesValidation.createCategoryValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const categoryData = req.body;
    const newCategory = await categoriesService.createCategory(categoryData);
    res.status(201).json({ category: newCategory });
  } catch (error) {
    next(error);
  }
};