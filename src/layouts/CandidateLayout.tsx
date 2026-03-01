import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, UserCircle, FileSearch, Briefcase, GraduationCap, TrendingUp, LogOut } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";

const items = [
  { title: "Dashboard", url: "/candidate/dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/candidate/profile", icon: UserCircle },
  { title: "Resume Analyzer", url: "/candidate/resume", icon: FileSearch },
  { title: "Job Matches", url: "/candidate/jobs", icon: Briefcase },
  { title: "Interview Prep", url: "/candidate/interview", icon: GraduationCap },
  { title: "Performance", url: "/candidate/performance", icon: TrendingUp },
];

function CandidateSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-xs font-semibold uppercase tracking-wider">
            {!collapsed && "HireSphere AI"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {!collapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function CandidateLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CandidateSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border bg-card px-4">
            <SidebarTrigger className="mr-4" />
            <span className="font-display text-sm font-semibold text-foreground">Candidate Portal</span>
          </header>
          <main className="flex-1 overflow-auto bg-background p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
