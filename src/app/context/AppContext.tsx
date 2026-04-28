import { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "order" | "booking" | "offer" | "inventory" | "system";
}

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferredDining: "dine-in" | "takeaway";
  profilePicture?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Order Ready",
      message: "Your Butter Chicken order is ready for pickup!",
      timestamp: new Date(Date.now() - 300000),
      read: false,
      type: "order",
    },
    {
      id: "2",
      title: "Table Confirmed",
      message: "Table 5 booking confirmed for today at 7:00 PM",
      timestamp: new Date(Date.now() - 600000),
      read: false,
      type: "booking",
    },
    {
      id: "3",
      title: "Special Offer",
      message: "Get 20% off on all orders above ₹1000 today!",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      type: "offer",
    },
  ]);

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        notifications,
        addNotification,
        markAsRead,
        clearAllNotifications,
        unreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
