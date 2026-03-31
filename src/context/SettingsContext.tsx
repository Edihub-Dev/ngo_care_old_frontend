'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';

interface Settings {
  orgName: string;
  contactEmail: string;
  supportPhone: string;
  membershipFee: number;
  [key: string]: any;
}

interface SettingsContextType {
  settings: Settings;
  isLoading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  orgName: 'Golden Years Care Foundation',
  contactEmail: 'support@goldenyearscare.org',
  supportPhone: '+91 1800-123-4567',
  membershipFee: 1100
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get<any>('/api/public/settings');
      if (res.success && res.data?.settings) {
        setSettings({
          ...defaultSettings,
          ...res.data.settings
        });
        setError(null);
      } else {
        setError('Failed to load settings');
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading, error, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
