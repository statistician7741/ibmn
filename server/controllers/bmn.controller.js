const formidable = require("formidable");
const ensurePath = require("../../functions/ensurePath");
const xlsx = require("node-xlsx").default;
const async = require('async');
const Barang = require('../models/Barang.model')
const XlsxPopulate = require('xlsx-populate');
const moment = require('moment')
const _ = require('underscore')
const act = {};

act.DOWNLOAD_XLSX = (req, res, user, client) => {
    Barang.find({}).sort({ruang: 1, nomor: 1}).exec((err, all_barang)=>{
        var row = 3;
        XlsxPopulate.fromFileAsync(__dirname+"/../../templates/bmn_updating_template.xlsx")
        .then(workbook => {
            _.each(all_barang, function(brg, index, list){
                var r = workbook.sheet(0).range('A'+row+':L'+row);
                r.value([[brg.nomor,
                    brg.nama,
                    brg.id_merk, 
                    brg.id_kode,
                    brg.id_tahun,
                    brg.nmr_urut_pendaft,
                    brg.jumlah,
                    brg.ket,
                    brg.ruang,
                    brg.ruang_saat_ini === 'none'?'-':brg.ruang_saat_ini,
                    brg.petugas,
                    brg.status
                ]]);
                row++;
            })
            return workbook.outputAsync();
        }).then(data => {
            // Set the output file name.
            res.attachment("bmn_updated "+moment().format('HH_mm DD-MM-YYYY')+".xlsx");
            
            // Send the workbook.
            res.send(data);
        })
    })
}

act.IMPORT_BMN = (req, res, user, client) => {
  const form = new formidable.IncomingForm();
  const file_path = __dirname + "/../../temporary_file/";

  async.auto(
    {
      parseExcel: cb => {
        form.parse(req, function(err, fields, file) {
          if (err) {
            res.sendStatus(500);
            return;
          }
          const data = xlsx.parse(file_path + "imported_bmn.xlsx");
          cb(err, data[0].data);
        });

        form.on("fileBegin", function(name, file) {
          ensurePath(file_path, () => {
            file.path = file_path + "imported_bmn.xlsx";
          });
        });
      },
      refine_data: [
        "parseExcel",
        (prev_result, cb) => {
          cb(null, 'prev_result');
        }
      ]
    },
    (err, finish) => {
        finish.parseExcel.forEach((row, i, arr) => {
            if(i>1){
                Barang.findOne({_id: row[3]+'.'+row[5]}, (err, res)=>{
                    if(err) return;
                    if(!res){
                        Barang.create({
                            _id: row[3]+'.'+row[5],
                            nomor: row[0],
                            nama: row[1],
                            id_merk: row[2],
                            id_kode: row[3],
                            id_tahun: row[4],
                            nmr_urut_pendaft: row[5],
                            jumlah: row[6],
                            ket: row[7],
                            ruang: row[8],
                            ruang_saat_ini: 'none'
                        }, (err, status)=>{
                            if(err){
                                console.log(err);
                                return;
                            }
                        })
                    }
                })
            }
        })
        res.sendStatus(200);
    }
  );
};

module.exports = act;