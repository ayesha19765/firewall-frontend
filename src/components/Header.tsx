import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";

const Header = () => {
	return (
		<div className='w-[99vw] h-[5vh] bg-[#102542] flex justify-between items-center px-8 z-50 sticky top-0  '>
			<div className='text-white'>CSS ADMIN PORTAL</div>
			<Menubar className='rounded-full w-8 h-8 flex justify-center'>
				<MenubarMenu>
					<MenubarTrigger>
						<Avatar className='w-6 h-6 items-stretch'>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>Admin</AvatarFallback>
						</Avatar>
					</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Profile</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Logout</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default Header;
