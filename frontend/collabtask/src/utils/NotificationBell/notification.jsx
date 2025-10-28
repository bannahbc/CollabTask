import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationButton() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New task assigned to you." },
    { id: 2, text: "Collaborator joined your project." },
    
  ]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute sm:right-0 sm:left-none md:left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="p-2 font-semibold border-b">Notifications</div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {n.text}
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-500 text-center">
                No new notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
