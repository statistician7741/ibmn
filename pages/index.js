import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { initStore } from "../util/redux/store";
import { addEvent } from "../util/redux/actions/socketAction";
import page from "../hocs/page";
import {
  Card,
  Row,
  Col,
  Table,
  Badge,
  Input,
  Divider,
  Button,
  Menu,
  Modal,
  Upload,
  Icon,
  Dropdown,
  Select,
  Spin,
  message
} from "antd";
const Option = Select.Option;
import React, { Component, Fragment } from "react";
const Search = Input.Search;
const Dragger = Upload.Dragger;


const menu = (setRuang) => (
  <Menu>
    {["BENDAHARA", "GUDANG", "IPDS", "KEPALA KANTOR", "KEPALA SEKSI",
      "KSK DAN STAF", "PERPUSTAKAAN", "TATA USAHA", "DAPUR"].map((r, i) => <Menu.Item key={i}>
        <a onClick={() => setRuang(r)}>{r}</a>
      </Menu.Item>)}
  </Menu>
);

class Opt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  setLoading = (loading, cb) => {
    this.setState({ loading }, () => {
      cb && cb(this.setLoading)
    });
  }

  render() {
    const { loading } = this.state;
    return loading ? (
      <Spin />
    ) : (
        <span>
          <a
            onClick={() => {
              this.setLoading(true, this.props.yaHandler)
            }
            }
          >
            {this.props.label}
          </a>
        </span>
      );
  }
}

class BMNTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tableLoading: true,
      ruang: "Pilih",
      commonBMNTableFilterQuery: "",
      namaBrgFilterQuery: "",
      petugasInput: "",
      petugas: "",
      data: []
    };
    this.inputChangeHandler_BMNTableFilter = this.inputChangeHandler_BMNTableFilter.bind(
      this
    );
  }

  handleSelectStatus = (selected, record) => {
    this.props.socket.emit(
      "bmn.updateStatus",
      {
        _id: record._id,
        status: selected
      },
      data => {
        if (data) {
          record.status = selected
          message.success('Berhasil diubah.');
        }
      }
    );
  }

  componentDidMount() {
    this.props.addEvent("bmn.bcUpdate", data => {
      this.setState({
        data: this.state.data.map(record => {
          if (record._id === data._id) {
            if (data.ruang_saat_ini) {
              return {
                ...record,
                ruang_saat_ini: data.ruang_saat_ini,
                petugas: data.petugas
              };
            } else if (data.status) {
              return {
                ...record,
                status: data.status
              };
            } else {
              return { ...record };
            }
          } else {
            return { ...record };
          }
        })
      });
    });
    this.setState({ loading: false });
    this.props.socket.emit("bmn.initBMNTable", "hi from clients", data => {
      this.setState({
        data,
        tableLoading: false
      });
    });

    var petugas = prompt("Mohon input nama Anda (minimal 3 huruf)", "");

    if (petugas != null) {
      if (petugas.length < 3) petugas = "Guest";
      this.setState({ petugas });
    }
  }

  inputChangeHandler_BMNTableFilter(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setRuang = (ruang) => {
    this.setState({ ruang });
  }

  render() {
    const {
      data,
      loading,
      tableLoading,
      ruang,
      petugas,
      petugasInput
    } = this.state;
    let {
      commonBMNTableFilterQuery,
      namaBrgFilterQuery,
    } = this.state
    commonBMNTableFilterQuery = [commonBMNTableFilterQuery] || "";
    namaBrgFilterQuery = [namaBrgFilterQuery] || "";
    const columns = [
      {
        title: "No.",
        dataIndex: "nomor",
        key: "nomor",
        width: 50
      },
      {
        title: "Nama",
        dataIndex: "nama",
        key: "nama",
        sorter: (a, b) => a.nama.length - b.nama.length,
        filteredValue: namaBrgFilterQuery || "",
        onFilter: (value, record) =>
          record.nama.toLowerCase().includes(value.toLowerCase())
      },
      {
        title: "Identitas Barang",
        children: [
          {
            title: "Merk/Type",
            dataIndex: "id_merk",
            key: "id_merk",
            // width: 120,
            sorter: (a, b) => a.id_merk.length - b.id_merk.length
          },
          {
            title: "Kd Barang",
            dataIndex: "id_kode",
            key: "id_kode",
            width: 120,
            filteredValue: commonBMNTableFilterQuery || "",
            onFilter: (value, record) =>
              (
                record.id_kode.replace(/\./g, "") + record.nmr_urut_pendaft
              ).includes(value),
            render: (id_kode, record) => {
              return id_kode.replace(/\./g, "") + record.nmr_urut_pendaft;
            }
          },
          {
            title: "Tahun",
            dataIndex: "id_tahun",
            key: "id_tahun",
            width: 70,
            sorter: (a, b) => a.id_tahun - b.id_tahun
          }
        ]
      },
      {
        title: "No.Urut Pendaft",
        dataIndex: "nmr_urut_pendaft",
        key: "nmr_urut_pendaft",
        width: 70,
        sorter: (a, b) => a.nmr_urut_pendaft - b.nmr_urut_pendaft
      },
      {
        title: "Jumlah",
        dataIndex: "jumlah",
        key: "jumlah",
        width: 50
      },
      {
        title: "Keterangan",
        dataIndex: "ket",
        key: "ket"
        // width: 120
      },
      {
        title: "Ruang asal",
        dataIndex: "ruang",
        key: "ruang",
        width: 140,
        onFilter: (value, record) => record.ruang.indexOf(value) === 0,
        filters: [
          {
            text: "BENDAHARA",
            value: "BENDAHARA"
          },
          {
            text: "GUDANG",
            value: "GUDANG"
          },
          {
            text: "IPDS",
            value: "IPDS"
          },
          {
            text: "KEPALA KANTOR",
            value: "KEPALA KANTOR"
          },
          {
            text: "KEPALA SEKSI",
            value: "KEPALA SEKSI"
          },
          {
            text: "KSK DAN STAF",
            value: "KSK DAN STAF"
          },
          {
            text: "PERPUSTAKAAN",
            value: "PERPUSTAKAAN"
          },
          {
            text: "TATA USAHA",
            value: "TATA USAHA"
          },
          {
            text: "DAPUR",
            value: "DAPUR"
          }
        ],
        sorter: (a, b) => a.ruang.length - b.ruang.length
      },
      {
        title: "Ruang saat ini",
        dataIndex: "ruang_saat_ini",
        key: "ruang_saat_ini",
        width: 140,
        render: (ruang_saat_ini, record) =>
          ruang_saat_ini === "none" ? "-" : ruang_saat_ini,
        sorter: (a, b) => a.ruang_saat_ini.length - b.ruang_saat_ini.length
      },
      {
        title: "Petugas",
        dataIndex: "petugas",
        key: "petugas",
        width: 140,
        render: (petugas, record) => (petugas ? petugas : "-"),
        sorter: (a, b) => a.petugas.length - b.petugas.length
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 140,
        fixed: "right",
        render: (ruang_saat_ini, record) => {
          return <Select defaultValue={record.status} style={{ width: 120 }} onChange={(selected) => this.handleSelectStatus(selected, record)}>
            {["BAIK", "RUSAK RINGAN", "RUSAK BERAT"].map(s => <Option value={s}>{s}</Option>)}
          </Select>
        }
      },
      {
        title: "Ditemukan?",
        dataIndex: "ruang_saat_ini",
        key: "ada",
        width: 140,
        fixed: "right",
        render: (ruang_saat_ini, record) => {
          if (ruang === "Pilih") {
            return "-";
          } else {
            if (ruang === record.ruang) {
              if (record.ruang_saat_ini === ruang) {
                return (
                  <span>
                    Ya
                    <Divider type="vertical" key="line" />
                    <Opt
                      label="Batal"
                      yaHandler={setLoading => {
                        this.props.socket.emit(
                          "bmn.updateRuang",
                          {
                            _id: record._id,
                            ruang_saat_ini: "none",
                            petugas: ""
                          },
                          data => {
                            if (data) {
                              record.ruang_saat_ini = "none";
                              record.petugas = "";
                            }
                            setLoading(false);
                          }
                        );
                      }}
                    />
                  </span>
                );
              } else if (record.ruang_saat_ini !== "none") {
                return "di " + record.ruang_saat_ini;
              } else {
                return (
                  <Opt
                    label="Ya"
                    yaHandler={setLoading => {
                      this.props.socket.emit(
                        "bmn.updateRuang",
                        {
                          _id: record._id,
                          ruang_saat_ini: ruang,
                          petugas: petugas
                        },
                        data => {
                          if (data) {
                            record.ruang_saat_ini = ruang;
                            record.petugas = petugas;
                          }
                          setLoading(false);
                        }
                      );
                    }}
                  />
                );
              }
            } else {
              if (record.ruang_saat_ini === "none") {
                return (
                  <span>
                    <Opt
                      label="di sini"
                      yaHandler={setLoading => {
                        this.props.socket.emit(
                          "bmn.updateRuang",
                          {
                            _id: record._id,
                            ruang_saat_ini: ruang,
                            petugas: petugas
                          },
                          data => {
                            if (data) {
                              record.ruang_saat_ini = ruang;
                              record.petugas = petugas;
                            }
                            setLoading(false);
                          }
                        );
                      }}
                    />
                  </span>
                );
              } else {
                if (record.ruang_saat_ini === ruang) {
                  return (
                    <span>
                      di sini
                      <Divider type="vertical" key="line" />
                      <Opt
                        label="Batal"
                        yaHandler={setLoading => {
                          this.props.socket.emit(
                            "bmn.updateRuang",
                            {
                              _id: record._id,
                              ruang_saat_ini: "none",
                              petugas: ""
                            },
                            data => {
                              if (data) {
                                record.ruang_saat_ini = "none";
                                record.petugas = "";
                              }
                              setLoading(false);
                            }
                          );
                        }}
                      />
                    </span>
                  );
                } else {
                  return "di " + record.ruang_saat_ini;
                }
              }
            }
          }
        }
      }
    ];
    return (
      <Card loading={loading} title={`Updating BMN`} bordered={false}>
        <Row type="flex" justify="center" style={{ paddingBottom: 7 }}>
          <Col xs={24} sm={12}>
            <Search
              size="large"
              name="commonBMNTableFilterQuery"
              placeholder="Kode Barang"
              value={commonBMNTableFilterQuery}
              onChange={this.inputChangeHandler_BMNTableFilter}
              onSearch={commonBMNTableFilterQuery => this.setState({ commonBMNTableFilterQuery })}
              enterButton
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ paddingBottom: 7 }}>
          <Col xs={24} sm={12}>
            <Search
              size="large"
              name="namaBrgFilterQuery"
              placeholder="Nama Barang"
              value={namaBrgFilterQuery}
              onChange={this.inputChangeHandler_BMNTableFilter}
              onSearch={namaBrgFilterQuery => this.setState({ namaBrgFilterQuery })}
              enterButton
            />
          </Col>
        </Row>
        <Row style={{ paddingBottom: 7 }}>
          <Col xs={24} sm={24}>
            Saya ({petugas}) berada di ruang{" "}
            <Dropdown overlay={menu(this.setRuang)} trigger={["click"]}>
              <a className="ant-dropdown-link">
                {tableLoading ? (
                  <Spin />
                ) : (
                    <span>
                      {ruang}
                      <Icon type="down" />
                    </span>
                  )}
              </a>
            </Dropdown>
            <a href='/bmn/download_xlsx' style={{ float: 'right' }}><Icon type="file-excel" /> Download Xlsx</a>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              loading={tableLoading}
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              scroll={{ x: "1460px" }}
              size="small"
              rowKey="_id"
              defaultExpandAllRows={true}
              indentSize={5}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 7 }}>
          <Col sm={10}>
            <Dragger
              action="/bmn/import_bmn"
              name="data_bmn"
              multiple={false}
              onChange={info => {
                console.log(info);
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload (Excel file)
        </p>
            </Dragger>
          </Col>
        </Row>
      </Card>
    );
  }
}

const Index = page(props => <BMNTable {...props} />);

const mapStateToProps = ({ socket }) => ({ socket });

const mapDispatchToProps = dispatch => {
  return {
    addEvent: bindActionCreators(addEvent, dispatch)
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);
