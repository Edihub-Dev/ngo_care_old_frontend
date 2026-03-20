'use client';

import { 
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BanknotesIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/admin' },
  { icon: UsersIcon, label: 'Users', href: '/admin/users' },
  { icon: DocumentTextIcon, label: 'Service Requests', href: '/admin/requests' },
  { icon: UserGroupIcon, label: 'Staff', href: '/admin/staff' },
  { icon: BanknotesIcon, label: 'Payments', href: '/admin/payments' },
  { icon: Cog6ToothIcon, label: 'Settings', href: '/admin/settings' },
];

interface AdminSidebarProps {
  className?: string;
}

export default function AdminSidebar({ className = '' }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`w-64 bg-white shadow-md ${className}`}>
      <div className="p-6">
        <Link href="/admin" className="flex items-center">
          <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </Link>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
