'use client'

import { useAlertActions, useAlerts } from '@/hooks/store/useAlertStore'
import React from 'react'
import { IconError, IconInfo, IconSuccess } from '../../../../public/svgs/icons'

const alertIcons = {
  success: <IconSuccess className="text-green-600" />,
  error: <IconError className="text-red-600" />,
  info: <IconInfo className="text-blue-600" />,
}

export default function AlertContainer() {
  const alerts = useAlerts()
  const { removeAlert } = useAlertActions()

  return alerts.length !== 0 ? (
    <div className="fixed left-[50%] top-4 z-[500] flex translate-x-[-50%] flex-col gap-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          onClick={() => removeAlert(alert.id)}
          className="flex h-[50px] w-[300px] cursor-pointer items-center rounded-full border-4 border-dashed border-beige-dark bg-beige-normal px-3 py-2 text-brown-dark shadow-lg"
        >
          <div className="mr-1 size-5 shrink-0">{alertIcons[alert.type]}</div>
          <p className="truncate">{alert.message}</p>
        </div>
      ))}
    </div>
  ) : null
}
