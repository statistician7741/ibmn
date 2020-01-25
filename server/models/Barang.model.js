var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BarangSchema = new Schema({
    _id: String,
    nomor: Number,
    nama: String,
    id_merk: String,
    id_kode: String,
    id_tahun: String,
    nmr_urut_pendaft: Number,
    jumlah: Number,
    ket: String,
    ruang: String,
    ruang_saat_ini: {
        type: String,
        default: 'none'
    },
    status: {
        type: String,
        default: '-'
    },
    petugas: {
        type: String,
        default: '-'
    }
}, { collection: 'bmn_kolaka_barang' });

module.exports = mongoose.model('Barang', BarangSchema);