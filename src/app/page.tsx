"use client"
import IntroPage from "@/components/Intropage";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Lastpage from "@/components/Lastpage";
import Search from "@/components/Search";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello").then((res) => res.json()).then(console.log)
  },[])
  return (
    <main className="flex h-[150vh]  flex-col bg-black ">
      {/* <Nav /> */}
      <IntroPage />
      <Search />
      <Services />
      {/* <Packages />  */}
      <Lastpage />
      
      
    </main>
  );
}
