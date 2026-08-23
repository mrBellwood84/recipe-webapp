import {ReactNode} from "react";
import {AppShell, AppShellFooter, AppShellHeader, AppShellMain} from "@mantine/core";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";

interface IProps {
  children: ReactNode;
}

const MainShell = ({children}: IProps) => {
  return (
    <AppShell
      padding="sm"
      header={{height:48}}>
      <AppShellHeader>
        <Header/>
      </AppShellHeader>

      <AppShellMain>
        {children}
      </AppShellMain>

      <AppShellFooter>
        <Footer/>
      </AppShellFooter>
    </AppShell>
  )
}

export default MainShell