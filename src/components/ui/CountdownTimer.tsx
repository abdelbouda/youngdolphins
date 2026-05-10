import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ 
  targetDate, 
  className = '',
  size = 'md',
  showLabels = true
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const sizeClasses = {
    sm: {
      container: 'text-sm',
      number: 'text-base font-bold',
      label: 'text-[10px]'
    },
    md: {
      container: 'text-base',
      number: 'text-2xl font-bold',
      label: 'text-sm'
    },
    lg: {
      container: 'text-lg',
      number: 'text-3xl font-bold',
      label: 'text-base'
    }
  };

  if (isExpired) {
    return (
      <div className={`text-center ${sizeClasses[size].container} ${className}`}>
        <div className="inline-flex items-center px-4 py-2 bg-achievement-orange-light text-achievement-orange rounded-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Launch time has arrived!
        </div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'days', shortLabel: 'd' },
    { value: timeLeft.hours, label: 'hours', shortLabel: 'h' },
    { value: timeLeft.minutes, label: 'minutes', shortLabel: 'm' },
    { value: timeLeft.seconds, label: 'seconds', shortLabel: 's' }
  ];

  return (
    <div className={`inline-flex gap-1 ${sizeClasses[size].container} ${className}`}>
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          {index > 0 && <span className="text-gray-500">:</span>}
          <div className="text-center">
            <span className={`${sizeClasses[size].number} tabular-nums`}>
              {String(unit.value).padStart(2, '0')}
            </span>
            {showLabels && (
              <span className={`${sizeClasses[size].label} text-gray-500 ml-1`}>
                {unit.shortLabel}
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}