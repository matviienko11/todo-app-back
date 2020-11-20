import {sequelizeService} from "../models";




exports.findAll = (req, res) => {

    const getPagination = (page, size) => {
        const limit = size ? +size: 3;
        const offset = page? page * limit: 0;
        return {limit, offset};
    };

    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: todos } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        return { totalItems, todos, totalPages, currentPage };
    };

    const {page, size} = req.query;

    const {limit, offset} = getPagination(page, size);

    sequelizeService.db.todos.findAndCountAll({
        limit,
        offset,
        include: [{model: sequelizeService.db.users, as: 'users'}]
    })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });


}
