import React, { Suspense } from 'react'
import NewArrivals from './components/_home/NewArrivals/NewArrivals'
import Weather from './components/_home/Weather/Weather'
import MyCheckList from './components/_home/MyCheckList/MyCheckList'
import LoadingUI from './components/_home/LoadingUI'
import ErrorUI from './components/_home/ErrorUI'
import { ErrorBoundary } from 'react-error-boundary'
import Container from './components/common/Container'
import MenAnimation from './components/common/Animation/MenAnimation'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="h-full w-full">
      <section className="flex min-h-full items-center py-[82px] text-white md:py-[102px]">
        <Container>
          <div className="mb-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <article className="h-[300px] w-full rounded-md bg-slate-700 px-4 py-3 md:max-w-[280px]">
              <ErrorBoundary FallbackComponent={ErrorUI}>
                <Suspense fallback={<LoadingUI />}>
                  <Weather />
                </Suspense>
              </ErrorBoundary>
            </article>
            <article className="h-[300px] w-full rounded-md bg-slate-700 px-4 py-3 md:max-w-[280px]">
              <ErrorBoundary FallbackComponent={ErrorUI}>
                <Suspense fallback={<LoadingUI />}>
                  <MyCheckList />
                </Suspense>
              </ErrorBoundary>
            </article>
          </div>
          <article className="mx-auto h-[184px] w-full max-w-[580px] rounded-md bg-slate-700 px-4 py-3">
            <ErrorBoundary FallbackComponent={ErrorUI}>
              <Suspense fallback={<LoadingUI />}>
                <NewArrivals />
              </Suspense>
            </ErrorBoundary>
          </article>
        </Container>
      </section>
      <MenAnimation />
    </main>
  )
}
