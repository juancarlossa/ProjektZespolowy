import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { ChevronDown } from "./lib/icons";
import { AuthButtonServer } from "@/app/(login)/login/components/AuthButtonServer";
import { Avatar } from "@nextui-org/react";

type NavProps = {
  userImg: string
}

export default function Nav ({ userImg }: NavProps) {

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />
  };
  const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Chatily</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>

          <Link href="/" className="text-inherit" color="foreground">
            Home
          </Link>

        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button

                href="#"
                className=" bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}

                variant="light"
              >
                Categories
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Categories">
              <></>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/profile">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" >
        <NavbarItem>
          <Link href="/profile" className="flex flex-col items-end">
            <Avatar
              isBordered
              src={userImg}
              alt={`${userImg} profile picture`}
              className='rounded-full'
              size='md'
            />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <AuthButtonServer />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
