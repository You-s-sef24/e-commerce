// components/app-sidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "My Cart", href: "/cart", icon: ShoppingCart },
  { label: "Sign up", href: "/signup", icon: User },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-blue-600 font-bold text-xl"}>
            Shopify
          </SidebarGroupLabel>
          <hr />
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  <Link href={link.href}>
                    <link.icon />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
