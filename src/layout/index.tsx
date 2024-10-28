import { useEffect, useMemo } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useImmer } from "use-immer";
import {
  Watermark,
  Layout,
  Menu,
  Input,
  Button,
  Breadcrumb,
  Space,
  Dropdown,
  Avatar,
  Divider,
} from "@arco-design/web-react";
import { IconExport, IconMenuFold, IconMenuUnfold, IconSettings, IconUser } from "@arco-design/web-react/icon";
import { cloneDeep } from "lodash";
import IconFont from "@/components/IconFont";
import styles from "./style.module.less";

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const BreadcrumbItem = Breadcrumb.Item;

const Index = ({ menuRoutes }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState]: any = useImmer({
    collapsed: false,
    openKeys: [],
    menuList: [],
    filteredMenuList: [],
    selectedMenuList: [],
  });

  useEffect(() => {
    const openKeys = getOpenkeys();

    setState((slot: any) => {
      slot.openKeys = openKeys;
    });
  }, []);

  useEffect(() => {
    const refactorMenuList = (items: object[], parentPath: string) =>
      items.map((item: any) => {
        // 处理相对路由
        if (!item.path.startsWith("/")) {
          item.path = parentPath + "/" + item.path;
        }

        if (item.children?.length) {
          item.children = refactorMenuList(item.children, item.path);
        }

        return item;
      });

    let menuList = cloneDeep(menuRoutes);
    menuList = refactorMenuList(menuList, "");

    setState((slot: any) => {
      slot.menuList = menuList;
      slot.filteredMenuList = menuList;
    });
  }, [menuRoutes]);

  useEffect(() => {
    if (state.menuList?.length) {
      const menuList = cloneDeep(state.menuList);
      const result = findElements(menuList, location.pathname);

      setState((slot: any) => {
        slot.selectedMenuList = result;
      });
    }
  }, [location.pathname, state.menuList]);

  // 根据当前页面路径设置展开的菜单项
  const getOpenkeys = () => {
    const pathList = location.pathname.split("/");

    let result: string[] = [];
    let path: string = "";

    for (let i = 1; i < pathList.length - 1; i++) {
      path += "/" + pathList[i];
      result.push(path);
    }

    return result;
  };

  // 递归获取选中的菜单及其所有父菜单
  const findElements = (data: object[], targetPath: string) => {
    const result: object[] = [];

    function findRecursive(elements: any, parents: object[]) {
      for (const element of elements) {
        if (element.isHiddenInMenu) return;

        const newParents = [...parents, element];

        if (element.path === targetPath) {
          result.push(...newParents);
        }

        if (element.children?.length) {
          findRecursive(element.children, newParents);
        }
      }
    }

    findRecursive(data, []);

    return result;
  };

  // 递归获取所有匹配搜索的菜单
  const filterMenuList = (
    data: object[],
    keyword: string,
    openKeys: string[]
  ) => {
    const filteredMenuList = data.filter((item: any) => {
      let hasMatchedCurrent = item.title.includes(keyword);
      let hasMatchedChild = false;

      if (item.children?.length) {
        const filteredChildren = filterMenuList(
          item.children,
          keyword,
          openKeys
        );

        if (filteredChildren.length) {
          hasMatchedChild = true;
          item.children = filteredChildren;

          // 命中子菜单时，展开父菜单
          openKeys.push(item.path);
        }
      }

      return hasMatchedCurrent || hasMatchedChild;
    });

    return filteredMenuList;
  };

  // 菜单检索
  const handleSearch = (value: any) => {
    const menuList = cloneDeep(state.menuList);

    if (!value) {
      const openKeys = getOpenkeys();

      setState((slot: any) => {
        slot.filteredMenuList = menuList;
        slot.openKeys = openKeys;
      });
    } else {
      const openKeys: string[] = [];
      const filteredMenuList = filterMenuList(menuList, value, openKeys);

      setState((slot: any) => {
        slot.filteredMenuList = filteredMenuList;
        slot.openKeys = openKeys;
      });
    }
  };

  // 菜单展开/收起
  const handleCollapsed = () => {
    setState((slot: any) => {
      slot.collapsed = !slot.collapsed;
    });
  };

  // 点击菜单项的回调
  const handleClickMenuItem = (key: string) => {
    navigate(key);
  };

  // 点击子菜单标题的回调
  const handleClickSubMenu = (_: string, openKeys: string[]) => {
    setState((slot: any) => {
      slot.openKeys = openKeys;
    });
  };

  // 渲染菜单列表
  const renderMenu = useMemo(() => {
    const renderSubMenu = (items: object[]) =>
      items.map((item: any) => {
        if (item.isHiddenInMenu) return;

        return item.children?.length ? (
          <SubMenu
            key={item.path}
            title={
              <>
                <IconFont type={item.icon} />
                {item.title}
              </>
            }
          >
            {renderSubMenu(item.children)}
          </SubMenu>
        ) : (
          <MenuItem key={item.path}>
            {<IconFont type={item.icon} />}
            {item.title}
          </MenuItem>
        );
      });

    const menuList = cloneDeep(state.filteredMenuList);
    return renderSubMenu(menuList);
  }, [state.filteredMenuList]);

  // 自定义侧边栏展开图标
  const trigger = useMemo(() => {
    return (
      <div className={styles["layout-sider-trigger"]}>
        <Button
          onClick={handleCollapsed}
          size="small"
          icon={
            state.collapsed ? (
              <IconMenuUnfold style={{ color: "#86909c" }} />
            ) : (
              <IconMenuFold style={{ color: "#86909c" }} />
            )
          }
        />
      </div>
    );
  }, [state.collapsed]);

  /************** 顶部右侧下拉按钮 ****************/
  const iconStyle = {
    marginRight: 10,
    fontSize: 16
  }
  const onClickDrop=(key:string)=>{
    console.log(key,'点击dropList')
  }
  const dropList = (
  <Menu onClickMenuItem={onClickDrop}>
    <Menu.Item key='1'><IconUser style={iconStyle} />修改密码</Menu.Item>
    <Menu.Item key='2'><IconSettings style={iconStyle} />用户设置</Menu.Item>
    <Divider style={{ margin: '4px 0' }} />
    <Menu.Item key='3'><IconExport style={iconStyle} />退出登录</Menu.Item>
  </Menu>
)


  return (
    <Watermark
      content="ALONE"
      width={200}
      height={200}
      fontStyle={{ fontWeight: "lighter" }}
    >
      <Layout className={styles["layout"]}>
        <Header className={styles["layout-header"]}>
          <div className="h-full flex flex-justify-between items-center">
            <div>业财一体化</div>
            <div>
              <span className={styles["name-box"]}>你好，牛卡福</span>
              <Dropdown droplist={dropList} position='br'>
                <Avatar style={{ backgroundColor: '#3370ff',cursor:'pointer' }}>
                  <IconUser style={{ fontSize: '20px'}} />
                </Avatar>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            className={styles["layout-sider"]}
            collapsible
            collapsed={state.collapsed}
            trigger={trigger}
          >
            {!state.collapsed && (
              <Input
                className={styles["layout-sider-search"]}
                allowClear
                placeholder="请输入"
                onChange={handleSearch}
              />
            )}
            {!!state.menuList?.length && (
              <Menu
                defaultSelectedKeys={[location.pathname]}
                onClickMenuItem={handleClickMenuItem}
                onClickSubMenu={handleClickSubMenu}
                openKeys={state.openKeys}
              >
                {renderMenu}
              </Menu>
            )}
          </Sider>
          <Content className={styles["layout-content"]}>
            {!!state.selectedMenuList?.length && (
              <Space size={40} className={styles["layout-content-space"]}>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <IconFont type={state.selectedMenuList[0].icon} />
                  </BreadcrumbItem>
                  {state.selectedMenuList.map((item: any) => (
                    <BreadcrumbItem key={item.path}>
                      {item.title}
                    </BreadcrumbItem>
                  ))}
                </Breadcrumb>
              </Space>
            )}
            <Outlet />
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </Watermark>
  );
};

export default Index;
