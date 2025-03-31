
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar";
import { 
  User, 
  Calendar, 
  Ticket, 
  Award, 
  Settings, 
  Clock,
  UserCog
} from 'lucide-react';

type MainLayoutProps = {
  children: React.ReactNode;
  showSidebar?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, showSidebar = false }) => {
  const location = useLocation();
  
  const getSidebarItems = () => {
    const isProfilePage = location.pathname.includes('/profile');
    if (!showSidebar || !isProfilePage) return null;
    
    return (
      <>
        <SidebarHeader>
          <div className="px-3 py-2 font-semibold text-lg">
            My Profile
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={location.pathname === '/profile'} tooltip="Overview">
                <User size={18} className="mr-2" />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="My Events">
                <Calendar size={18} className="mr-2" />
                <span>My Events</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="My Tickets">
                <Ticket size={18} className="mr-2" />
                <span>My Tickets</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Past Events">
                <Clock size={18} className="mr-2" />
                <span>Past Events</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Credentials">
                <Award size={18} className="mr-2" />
                <span>Credentials</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Admin items for organizers */}
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Event Management">
                <UserCog size={18} className="mr-2" />
                <span>Event Management</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings size={18} className="mr-2" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </>
    );
  };

  if (showSidebar) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <SidebarProvider>
          <Sidebar variant="floating">
            {getSidebarItems()}
          </Sidebar>
          <SidebarRail />
          <SidebarInset>
            <main className="flex-grow p-6">
              {children}
            </main>
            <Footer />
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
