import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <SiteHeader />
      <main className="flex-1 pt-[5.25rem] sm:pt-[5.5rem]">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
