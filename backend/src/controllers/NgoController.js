const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(request, response) {
    const ngos = await connection('ngos').select('*');

    return response.status(200).json(ngos);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, state } = request.body;
    const id = generateUniqueId();

    await connection('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      state
    });

    return response.status(201).json({ id });
  }
};
