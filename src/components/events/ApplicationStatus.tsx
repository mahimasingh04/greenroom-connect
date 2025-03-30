
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Check, Clock, X, AlertTriangle } from 'lucide-react';
import { EventApplication } from '@/types/event';

interface ApplicationStatusProps {
  application: EventApplication;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ application }) => {
  const getStatusIcon = () => {
    switch (application.status) {
      case 'approved':
        return <Check size={16} />;
      case 'rejected':
        return <X size={16} />;
      case 'pending':
        return <Clock size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getStatusColor = () => {
    switch (application.status) {
      case 'approved':
        return 'bg-green-500 hover:bg-green-600';
      case 'rejected':
        return 'bg-red-500 hover:bg-red-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Your Application</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">Status:</span>
          <Badge className={getStatusColor()}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
          </Badge>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Submitted: {new Date(application.submittedAt).toLocaleDateString()}</p>
          {application.reviewedAt && (
            <p>Reviewed: {new Date(application.reviewedAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
