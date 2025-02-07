import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutGrid,
  Settings,
  Users,
  SettingsIcon as Functions,
  Layers,
  Eye,
  BarChart2,
  X,
} from "lucide-react";
import logo from "./logo.png";
import Image from "next/image";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#141414] max-h-screen overflow-y-hidden text-[#F1E9E9]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#606060] md:block hidden bg-[#212121]  bg">
        <div className="p-4 border-b border-[#3C2322]">
          <div className="flex items-center gap-2">
            <div className="rounded-full h-fit overflow-hidden">
              <Image src={logo} width={40} className="" alt="" />
            </div>
            <span className="font-semibold">Buck</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="space-y-4 p-4">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Tasks
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <Functions className="mr-2 h-4 w-4" />
                Functions
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <Layers className="mr-2 h-4 w-4" />
                Integrations
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
            <div className="pt-4 border-t border-[#3C2322]">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <Eye className="mr-2 h-4 w-4" />
                Live preview
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Performance
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-[#3C2322] px-4 flex items-center justify-between">
            <h1 className="text-sm font-medium">Voice conversation</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                Save conversation
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-[#F1E9E9] hover:bg-[#3C2322]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          {children}
        </div>

        {/* Right Panel */}
        {/* <div className="w-80 border-l border-[#3C2322]">
          <div className="h-14 border-b border-[#3C2322] px-4 flex items-center">
            <h2 className="font-medium">Conversation details</h2>
          </div>
          <div className="p-4">
            <div className="flex gap-4 border-b border-[#3C2322] pb-4">
              <Button variant="secondary" size="sm" className="rounded-full text-[#F1E9E9] hover:bg-[#3C2322]">
                Actions
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full text-[#F1E9E9] hover:bg-[#3C2322]">
                Customer
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full text-[#F1E9E9] hover:bg-[#3C2322]">
                Settings
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
