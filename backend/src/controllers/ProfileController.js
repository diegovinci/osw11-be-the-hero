const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ngoId = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ngo_id', ngoId)
      .select('*');

    return response.status(200).json(incidents);
  }
};
