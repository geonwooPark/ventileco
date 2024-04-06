import React, { PropsWithChildren, Suspense } from 'react'
import LoadingUI from './LoadingUI'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorUI from './ErrorUI'

interface GridItemProps {
  className: string
}

export default function GridItem({
  children,
  className,
}: PropsWithChildren<GridItemProps>) {
  return (
    <article
      className={`${className} w-full rounded-md bg-slate-700 px-4 py-3 md:max-w-[280px]`}
    >
      <ErrorBoundary FallbackComponent={ErrorUI}>
        <Suspense fallback={<LoadingUI />}>{children}</Suspense>
      </ErrorBoundary>
    </article>
  )
}
