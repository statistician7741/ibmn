import { PureComponent } from "react";
import DocumentTitle from "react-document-title";
import { Layout, Menu, Breadcrumb, Icon, Button, Avatar, Row, Col } from "antd";
import Router from "next/router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setDefaultOpenKeys } from "../../util/redux/actions/layoutAction";
import LinkWithHand from "../../components/LinkWithHand";
import { setUser } from "../../util/redux/actions/userAction";
import { setSidebarCollapsed } from "../../util/redux/actions/layoutAction";
import configureProgressBar from "../../util/routing";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default ComposedComponent => {
  class BasicLayout extends PureComponent {
    state = {
      isMobile: true
    };

    componentDidMount() {
      configureProgressBar();
    }

    render() {
      const layout = (
        <Row>
          <Col>
            <ComposedComponent {...this.props} />
          </Col>
        </Row>
      );

      return <DocumentTitle title="TU - BPS Kolaka">{layout}</DocumentTitle>;
    }
  }

  const mapStateToProps = ({ layout, user }) => {
    return {
      collapsed: layout.menuCollapsed,
      loading: layout.loading,
      nama: user.nama
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      setDefaultOpenKeys: bindActionCreators(setDefaultOpenKeys, dispatch),
      setUser: bindActionCreators(setUser, dispatch),
      setSidebarCollapsed: bindActionCreators(setSidebarCollapsed, dispatch)
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
};
