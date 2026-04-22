import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Users, Brain, BarChart3, Building2, LogOut, Sparkles, Bell } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { AIChatbot } from "@/components/AIChatbot";

const items = [
  { title: "Dashboard", url: "/recruiter/dashboard", icon: LayoutDashboard },
  { title: "Post Job", url: "/recruiter/post-job", icon: PlusCircle },
  { title: "Applicants", url: "/recruiter/applicants", icon: Users },
  { title: "AI Rankings", url: "/recruiter/ai-rankings", icon: Brain },
  { title: "Analytics", url: "/recruiter/analytics", icon: BarChart3 },
  { title: "Organization", url: "/recruiter/organization", icon: Building2 },
];

function RecruiterSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <SidebarGroup>
          <div className={`flex items-center gap-2 px-3 pb-4 pt-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero shadow-hero-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-display text-base font-bold text-gradient-primary">HireSphere AI</span>
            )}
          </div>
          <SidebarGroupLabel className="font-display text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {!collapsed && "Recruiter"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-all duration-200">
                    <NavLink
                      to={item.url}
                      className="relative hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-gradient-primary"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/")} className="mt-4 text-muted-foreground hover:text-destructive">
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

export default function RecruiterLayout() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <RecruiterSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center glass border-b border-border/60 px-4 sticky top-0 z-30">
            <SidebarTrigger className="mr-4" />
            <span className="font-display text-sm font-semibold text-foreground">Recruiter Portal</span>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-ai" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">R</div>
            </div>
          </header>
          <main key={location.pathname} className="flex-1 overflow-auto p-6 animate-page-in">
            <Outlet />
          </main>
        </div>
        <AIChatbot role="recruiter" />
      </div>
    </SidebarProvider>
  );
}
