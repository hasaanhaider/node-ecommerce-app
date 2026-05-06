// const parseInt = require("lodash/parseInt");
const categoriesRepository = require('./categories.repository');

exports.createCategory = async (categoryData) => {  
    try {
        const newCategory = await categoriesRepository.createCategory(categoryData);
        return newCategory;
    } catch (error) {
        throw error;
    }
};