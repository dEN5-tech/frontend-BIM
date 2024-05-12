import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box, Flex, VStack, Text, Button, useColorModeValue, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { lazy, Suspense } from 'react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import theme from '../../theme'; // Import custom theme

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

    const logout = () => {
        /* logout */
    };

    return (
        <Flex direction="row" height="100vh">
            <Box as="nav" width="200px" bg={navBg} color={navColor} p="5">
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
            <Box flex="1" bg={contentBg} position="relative">
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
                        src="https://bit.ly/dan-abramov"
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
