"use client";

import React from "react";
import { FiCheck, FiPackage, FiTruck, FiHome, FiClock } from "react-icons/fi";

const OrderTimeline = ({ currentStatus, createdAt }) => {
  // Define the ordered flow of statuses
  const steps = [
    { id: "Confirmed", label: "Order Confirmed", icon: FiCheck },
    { id: "Processing", label: "Processing", icon: FiPackage },
    { id: "Shipped", label: "Shipped", icon: FiTruck },
    { id: "Delivered", label: "Delivered", icon: FiHome },
  ];

  // Find the index of the current status to determine progress
  const currentIndex = steps.findIndex(
    (step) => step.id.toLowerCase() === (currentStatus || "confirmed").toLowerCase()
  );

  return (
    <div className="bg-base-100 rounded-[2rem] p-8 shadow-sm mb-8 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-base-200 gap-4">
        <div>
           <h3 className="font-bold text-lg">Order Status</h3>
           <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
             <FiClock size={12}/> Placed on {new Date(createdAt).toLocaleDateString("en-US", {
                 month: "long", day: "numeric", year: "numeric", hour: '2-digit', minute:'2-digit'
             })}
           </p>
        </div>
        <div className={`badge badge-lg font-bold border-none
           ${currentStatus === 'Delivered' ? 'bg-success/10 text-success' : 
             currentStatus === 'Shipped' ? 'bg-primary/10 text-primary' : 
             currentStatus === 'Processing' ? 'bg-warning/10 text-warning-content' : 
             'bg-info/10 text-info'}`}>
           {currentStatus || "Confirmed"}
        </div>
      </div>

      <div className="relative">
        {/* Background Track Line (Desktop only) */}
        <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-base-200 rounded-full z-0"></div>
        
        {/* Active Progress Line (Desktop only) */}
        <div 
           className="hidden sm:block absolute top-5 left-8 h-1 bg-primary rounded-full z-0 transition-all duration-500 ease-in-out"
           style={{ width: `${Math.max(0, (currentIndex / (steps.length - 1)) * 100)}%` }}
        ></div>

        <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-6 sm:gap-0">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex sm:flex-col items-center gap-4 sm:gap-3 group relative w-full sm:w-auto">
                <div 
                   className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 z-10 transition-colors duration-300
                     ${isCompleted 
                        ? 'bg-primary text-primary-content border-base-100 shadow-[0_0_0_4px_theme(colors.primary.100)]' 
                        : 'bg-base-200 text-gray-400 border-base-100'}`}
                >
                  <Icon size={16} className={isCompleted ? "" : "opacity-50"} />
                </div>
                
                <div className="flex flex-col sm:items-center text-left sm:text-center">
                  <span className={`text-sm font-bold ${isCompleted ? 'text-base-content' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                  {/* Subtle pulsing indicator for current step */}
                  {isCurrent && (
                     <span className="text-[10px] font-bold text-primary uppercase tracking-wider mt-1 sm:mt-0 flex items-center gap-1 sm:justify-center">
                       <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                       In Progress
                     </span>
                  )}
                </div>

                {/* Mobile vertical connection line */}
                {index < steps.length - 1 && (
                  <div className={`sm:hidden absolute left-5 top-10 bottom-[-24px] w-0.5 -ml-[1px]
                     ${index < currentIndex ? 'bg-primary' : 'bg-base-200'}`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
