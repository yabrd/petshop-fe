import type { Dispatch, SetStateAction } from 'react';

export interface Order {
  id: number;
  product: string;
  date: string;
  status: string;
}

export interface UserSettings {
  name: string;
  email: string;
  joinedDate: string;
  notification: boolean;
  theme: string;
}

export interface NavbarProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  isOrdersOpen: boolean;
  setIsOrdersOpen: Dispatch<SetStateAction<boolean>>;
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  userSettings: UserSettings;
  orders: Order[];
}