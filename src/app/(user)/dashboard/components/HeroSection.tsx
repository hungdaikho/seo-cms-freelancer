"use client";

import React, { memo } from "react";

const HeroSection = memo(() => {
  return (
    <div
      style={{
        height: "200px",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diamond pattern overlay */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20L0 0h40L20 20zM20 20L40 40H0L20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
