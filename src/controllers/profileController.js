const connection = require('../database/connection');

const listProfile_academic_activities = async(request, response) => {
    const users_id = request.headers.authorization;

    const users = await connection('academic_activities')
        .where('users_id', users_id)
        .select('*');

    return response.json(users);
};

module.exports = {
    listProfile_academic_activities
}




