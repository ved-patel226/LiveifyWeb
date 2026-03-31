"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import { ReactNode } from "react";

export function RootProviderWrapper({ children }: { children: ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}
