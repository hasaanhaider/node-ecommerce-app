const prisma = require("../../../config/db");

exports.createCategory = async (categoryData) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        image: categoryData.image,
        imageAlt: categoryData.imageAlt,
        parentId: categoryData.parentId,
        isActive:
          categoryData.isActive !== undefined ? categoryData.isActive : true,
      },
    });
    return newCategory;
  } catch (error) {
    throw error;
  }
};
