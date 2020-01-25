const Barang = require('../../models/Barang.model')

module.exports = (client) => {
    client.on('bmn.initBMNTable', (data, cb_client)=>{
        Barang.find({}).sort({ruang: 1, nomor: 1}).exec((err, res)=>{
            if(err){
                cb_client([])
                return;
            }
            cb_client(res)
        })
    })
    client.on('bmn.updateRuang', (data, cb_client)=>{
        Barang.update({_id: data._id}, { ruang_saat_ini: data.ruang_saat_ini, petugas: data.petugas }, (err, res)=>{
            if(err){
                cb_client([])
                return;
            }
            client.broadcast.emit('bmn.bcUpdate', data);
            cb_client(true)
        })
    })
    client.on('bmn.updateStatus', (data, cb_client)=>{
        Barang.update({_id: data._id}, { status: data.status }, (err, res)=>{
            if(err){
                cb_client([])
                return;
            }
            client.broadcast.emit('bmn.bcUpdate', data);
            cb_client(true)
        })
    })
}