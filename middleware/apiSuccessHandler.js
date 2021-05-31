function apiSuccessHandler (req, res, next) {
    const success = res.success;
    const data = success.data;
    const status = success.status;
    return res.status(status).json({data});
}

module.exports = apiSuccessHandler;
