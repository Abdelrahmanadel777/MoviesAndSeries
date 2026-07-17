export const globalError = (err, req, res, next) => {
    let statuscode = err.statuscode || 500
    res.json({ error: err.message, statuscode })
}