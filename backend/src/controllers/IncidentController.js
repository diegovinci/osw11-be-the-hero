const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ngos.name',
        'ngos.email',
        'ngos.whatsapp',
        'ngos.city',
        'ngos.state'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.status(200).json(incidents);
  },

  async get(request, response) {
    const { id } = request.params;
    const incident = await connection('incidents')
      .where('id', id)
      .select('*')
      .first();

    return response.status(200).json(incident);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ngoId = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id: ngoId
    });

    return response.status(201).json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ngoId = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('id', id)
      .select('ngo_id')
      .first();

    if (incidents && incidents.ngo_id !== ngoId) {
      return response.status(403).json({
        error: 'Operation not allowed'
      });
    }

    await connection('incidents').where('id', id).delete();
    return response.status(204).send();
  }
};
