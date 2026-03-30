import type { Notification } from "../types/types";
export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Order Shipped",
    description:
      "Your thrift order #1234 (KSh 1,500) from NguoAffordable has been shipped and is on the way.",
    category: "Orders",
  },
  {
    id: 2,
    title: "New Offer",
    description:
      "Get KSh 200 off all tops and dresses this weekend only.",
    category: "Offers",
  },
  {
    id: 3,
    title: "Vendor Message",
    description:
      "Toi Market stall 67: Your reserved floral dress (KSh 1,200) is ready for pickup.",
    category: "Messages",
  },
];