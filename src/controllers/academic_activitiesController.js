const connection = require('../database/connection');

const listAcademic_activities = async(request, response) => {
    const { page =1 } = request.query;

    const [ count ] = await connection('academic_activities')
        .count();

    const activities = await connection('academic_activities')
        .join('users', 'users.id', '=', 'academic_activities.users_id')
        .limit(5)
        .offset((page -1) * 5)
        .select([
            'academic_activities.*',
            'users.nome',
            'users.email'
        ]);

    response.header('X-Total-Count', count['count']);

    return response.json(activities);
};

const createAcademic_activities = async(request, response) => {
    const { unidade_curricular, tempo_ensino, tempo_extra_classe } = request.body;
    const users_id = request.headers.authorization;

    await connection('academic_activities').insert({
        unidade_curricular,
        tempo_ensino,
        tempo_extra_classe,
        users_id
    });

    return response.json();
};

const deleteAcademic_activities = async(request, response) => {
    const { id } = request.params;
    const users_id = request.headers.authorization;

    const activities = await connection('academic_activities')
        .where('id', id)
        .select('users_id')
        .first();

    if (activities.users_id === users_id) {
       await connection('academic_activities').where('id', id).delete();
       return response.json({activities: 'deleted'});
    }

    return response.json({error: 'erro'});
};

module.exports = {
    listAcademic_activities,
    createAcademic_activities,
    deleteAcademic_activities
};