'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  shopPage: async (ctx) => {
    const data = await strapi.services.product.find();
    console.log("data", data);
    return await ctx.render("products_66", {
      data,
      title: "shop Products",
    });
  },

  overviewPage: async (ctx) => {
    const category = ctx.params.category;
    console.log("category", category);
    const cat = await strapi.services.category.findOne({name: category});
    console.log("cat", category, cat.id);
    const data_h = await strapi.connections.default.raw(
        `SELECT * FROM products WHERE category = 1`
        );
    const data_j = await strapi.connections.default.raw(
        `SELECT * FROM products WHERE category = 2`
        );
    const data_s = await strapi.connections.default.raw(
        `SELECT * FROM products WHERE category = 3`
        );
    const data_w = await strapi.connections.default.raw(
        `SELECT * FROM products WHERE category = 4`
        );
    const data_m = await strapi.connections.default.raw(
        `SELECT * FROM products WHERE category = 5`
        );
    const count = 4;
    //console.log("data", data);
    return await ctx.render("shopOverview2_66", {
        data_h,
        data_j,
        data_s,
        data_w,
        data_m,
        count,
        title: 'Shop Overview'
    });
  },

  categoryPage: async(ctx) => {
    const category = ctx.params.category;
    console.log('category', category);
    const cat = await strapi.services.category.findOne({ name: category });
    console.log('cat', category, cat.id);
    const data = await strapi.connections.default.raw(
      `SELECT * FROM products where category = ${cat.id}`
    );
    console.log('data', JSON.stringify(data));
    return await ctx.render("products_66", {
      data,
      title: ctx.params.category,
    })
  },

  productPage: async (ctx) => {
    const category = ctx.params.category;
    console.log("category", category);
    const cat = await strapi.services.category.findOne({name: category});
    console.log("cat", category, cat.cid);
    const data = await strapi.connections.default.raw(
        `SELECT * FROM products WHERE category = ${cat.cid}`
        );
    console.log("data", JSON.stringify(data));
    return data
  },
};
