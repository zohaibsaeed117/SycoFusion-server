const notFound = (req, res) => {
    res.status(404).send({ success: false, type: "error", message: "Route doesn't exists" });
}

module.exports = notFound