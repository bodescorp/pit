const connection = require('../database/connection');

const listAcademic_activities = async(request, response) => {
    const activities = await connection('academic_activities').select('*');
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

module.exports = {
    listAcademic_activities,
    createAcademic_activities
};