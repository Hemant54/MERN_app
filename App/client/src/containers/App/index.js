import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar } from "antd";
import AppRouter from "./AppRouter";
import { ContentWrapper } from "helpers/commonStyle";
import authAction from "redux/auth/actions";
import { useDispatch } from "react-redux";
import { Logo } from "./app.style";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	DashboardOutlined,
	PoweroffOutlined
} from "@ant-design/icons";

const { Header, Sider } = Layout;

const { logout } = authAction;

export default (props) => {
	const [sidebar, setSidebar] = useState(false);
	const [selected, setSelected] = useState(["dashboard"]);
	const dispatch = useDispatch();
	const {
		match: { url },
		location: { pathname },
	} = props;

	useEffect(() => {
		const array = pathname.split("/");
		if (array[2]) {
			setSelected([array[2]]);
		}
	}, [pathname]);

	const logUserOut = (data) => {
		dispatch(logout());
	};

	const onCollapse = () => {
		setSidebar(!sidebar);
	};

	const moveTo = ({ keyPath, key }) => {
		if(key==="logout")
			logUserOut()	
		props.history.push(`/admin/${key}`);
	};

	return (
		<Layout>
			
			<Sider
				collapsedWidth={0}
				trigger={null}
				collapsible
				collapsed={sidebar}
			>
				<Logo >Gyan Metrics</Logo>
				<Menu
					onClick={moveTo}
					theme="dark"
					mode="inline"
					selectedKeys={selected}
				>
					<Menu.Item key="dashboard">
						<DashboardOutlined />
						<span>Dashboard</span>
					</Menu.Item>
					<Menu.Item key="logout">
						<PoweroffOutlined />
						<span>Logout</span>
					</Menu.Item>	
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background "
					style={{ padding: 0 }}
				>
					{React.createElement(
						sidebar ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: "trigger",
							onClick: onCollapse,
						}
					)}
					<Avatar style={{allign : "right"}}>U</Avatar>
				</Header>
				<ContentWrapper
					className="site-layout-background"
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 360,
					}}
				>
					<AppRouter url={url} />
				</ContentWrapper>
			</Layout>
		</Layout>
	);
};
