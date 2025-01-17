import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box, Flex, VStack, Text, Button, useColorModeValue, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { lazy, Suspense, useEffect } from 'react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import theme from '../../theme'; // Import custom theme
import { fetchProfile, logout_dp } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

const IconLogo = lazy(() => import("../../components/LogoIcon"));

const MainLayout = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const navBg = useColorModeValue(theme.colors.brand.skyBlue, theme.colors.brand.darkSkyBlue);
    const navColor = useColorModeValue(theme.colors.brand.black, theme.colors.brand.darkBlack);
    const hoverBg = useColorModeValue(theme.colors.brand.peach, theme.colors.brand.darkPeach);
    const contentBg = useColorModeValue(theme.colors.brand.white, theme.colors.brand.darkWhite);

    const routes = [
        { path: "/chat", label: "Чат" },
        { path: "/events", label: "События" },
        { path: "/projects", label: "Проекты" },
        
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.loggedInUser);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(logout_dp());
        navigate("/login");
    };

    useEffect(() => {
        dispatch(fetchProfile() as any);

    }, []);

    return (
        <Flex direction="row" height="100vh">
            <Box as="nav" width="200px" bg={navBg} color={navColor} p="5" height="100%" overflowY="auto">
                <Flex align="center" mb="5">
                    <Suspense fallback={<div>Loading...</div>}>
                        <IconLogo />
                    </Suspense>
                    <Text ml="2" fontSize="xl" fontWeight="bold">BIMHub</Text>
                </Flex>
                <VStack align="stretch" spacing="4">
                    {routes.map((route) => (
                        <Button key={route.path} onClick={() => navigate(route.path)} bg={hoverBg}>
                            <Text>{route.label}</Text>
                        </Button>
                    ))}
                </VStack>
            </Box>
            <Box flex="1" bg={contentBg} position="relative" height="100vh">
                <IconButton
                    aria-label="Toggle Color Mode"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    position="fixed"
                    bottom="20px"
                    left="20px"
                />
                <Menu>
                    <MenuButton
                        as={Avatar}
                        aria-label="Options"
                        src={user?.avatar}
                        size="sm"
                        position="fixed"
                        right="20px"
                        top="20px"
                    />
                    <MenuList>
                        <MenuItem as={Link} to="/profile">Профиль</MenuItem>
                        <MenuItem as={Link} to="/settings">Настройки</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logout}>Выйти</MenuItem>
                    </MenuList>
                </Menu>
                <Outlet />
            </Box>
        </Flex>
    );
};

export default MainLayout;
