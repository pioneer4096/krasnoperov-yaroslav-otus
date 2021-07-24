const errorResponse = (res, code = 500, errorMessage) => {
    const message = errorMessage || 'Internal server error. Try to repeat request later.'
    res.status(code).send(message);
}

module.exports = errorResponse
