"use client";

import "../../styles/admin.css";
import React from "react";

interface AdminRootProps {
  children: React.ReactNode;
}

export default function AdminRoot({ children }: AdminRootProps) {
  return <>{children}</>;
}
