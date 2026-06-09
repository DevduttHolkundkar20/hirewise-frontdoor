import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import RecruiterLayout from "./layouts/RecruiterLayout";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import PostJob from "./pages/recruiter/PostJob";
import Applicants from "./pages/recruiter/Applicants";
import AIRankings from "./pages/recruiter/AIRankings";
import Analytics from "./pages/recruiter/Analytics";
import OrganizationProfile from "./pages/recruiter/OrganizationProfile";
import CandidateLayout from "./layouts/CandidateLayout";
import CandidateDashboard from "./pages/candidate/Dashboard";
import MyProfile from "./pages/candidate/MyProfile";
import ResumeAnalyzer from "./pages/candidate/ResumeAnalyzer";
import JobMatches from "./pages/candidate/JobMatches";
import InterviewPrep from "./pages/candidate/InterviewPrep";
import Performance from "./pages/candidate/Performance";
import PracticeQuestions from "./pages/candidate/PracticeQuestions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:role/login" element={<LoginPage />} />
          <Route path="/:role/register" element={<RegisterPage />} />

          <Route path="/recruiter" element={<RecruiterLayout />}>
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="ai-rankings" element={<AIRankings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="organization" element={<OrganizationProfile />} />
          </Route>

          <Route path="/candidate" element={<CandidateLayout />}>
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="resume" element={<ResumeAnalyzer />} />
            <Route path="jobs" element={<JobMatches />} />
            <Route path="interview" element={<InterviewPrep />} />
            <Route path="practice" element={<PracticeQuestions />} />
            <Route path="performance" element={<Performance />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
