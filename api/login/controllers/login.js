'use strict';

module.exports = {
  async signup(ctx) {
    const { number, password } = ctx.request.body;

    try {
      const existingUser = await strapi.query('login').findOne({ number });
      if (existingUser) {
        return ctx.badRequest('User already exists');
      }

      const newUser = await strapi.query('login').create({
        number,
        password,
      });

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async login(ctx) {
    const { number, password } = ctx.request.body;

    console.log("loginnnnnnn", ctx.request.body);

    try {
      const user = await strapi.query('login').findOne({ number });
      if (!user) {
        return ctx.badRequest('User not found');
      }

      if (user.password !== password) {
        return ctx.badRequest('Invalid credentials');
      }

      return {
        user,
        token: strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id }),
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },
};
