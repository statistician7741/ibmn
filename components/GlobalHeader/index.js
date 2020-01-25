import React, { PureComponent } from "react";
import {
  Menu,
  Icon,
  Spin,
  Tag,
  Dropdown,
  Avatar,
  Divider,
  Tooltip
} from "antd";
import moment from "moment";
// import groupBy from 'lodash/groupBy';
// import Debounce from 'lodash-decorators/debounce';
import Link from "../LinkWithHand";
// import NoticeIcon from '../NoticeIcon';
// import HeaderSearch from '../HeaderSearch';
import styles from "./index.less";

export default class GlobalHeader extends PureComponent {
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const { isMobile, Logo, currentUser, collapsed } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item key="logout">
          <Link href="/logout">
            <Icon type="logout" />Logout
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        {isMobile && [ 
          <Link href="/" className={styles.logo} key="logo">
            <Logo width="32" />
          </Link>,
          <Divider type="vertical" key="line" />
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} icon="user" />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
