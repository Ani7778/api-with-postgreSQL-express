const { DEFAULT_PAGE, DEFAULT_LIMIT } = require("../utils/constants");

function apiSuccessHandler (req, res, next) {
    const {respData: data, status} = res;
    const reqStatus = 200 ;

    if (data.rows instanceof Array && !isNaN(data.count)) {
        let {page, size} = req.query;
        page = page ? page : DEFAULT_PAGE;
        size = size ? size : DEFAULT_LIMIT;

        return res.status(reqStatus).json({
            data: data.rows,
            meta: {
                total: data.count,
                limit: size,
                offset: (page - 1) * size
            }
        })
    } else {
        return res.status(reqStatus).json({data});
    }
}

module.exports = apiSuccessHandler;
