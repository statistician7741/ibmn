const bmn_controller = require('../controllers/bmn.controller')

module.exports = (app, nextApp = null, client = null) => {
    app.post("/bmn/import_bmn", (req, res) => {
        bmn_controller.IMPORT_BMN(req, res, null, client);
    })
    app.get("/bmn/download_xlsx", (req, res) => {
        bmn_controller.DOWNLOAD_XLSX(req, res, null, null);
    })
}