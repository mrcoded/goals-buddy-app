import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GoalsBuddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
