import { useState } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import MainApp from "@/components/MainApp";

const Index = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <MainApp user={user} onLogout={handleLogout} />;
};

export default Index;
