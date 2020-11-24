const path = require("path"); 

exports.get_file = function(req, res, next) {
    var tempFile= path.join(process.cwd(), '/public/assets/file-surat/' + req.params.file_name)
    res.sendFile(tempFile + ".pdf");
} 