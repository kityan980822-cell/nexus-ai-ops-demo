import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS AI｜智能运营中台Demo",
  description: "连接经营数据、市场情报与企业知识，辅助完成洞察、策划、执行和复盘。",
  openGraph: {
    title: "NEXUS AI｜AI智能运营中台",
    description: "数据洞察 · 市场情报 · 加盟商运营 · 活动闭环",
    images: [{ url: "/og.png", width: 1680, height: 945 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS AI｜AI智能运营中台",
    description: "数据洞察 · 市场情报 · 加盟商运营 · 活动闭环",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
