import React from 'react'
import NewArrivals from './components/_home/NewArrivals/NewArrivals'
import Weather from './components/_home/Weather/Weather'
import MyCheckList from './components/_home/MyCheckList/MyCheckList'
import Container from './components/common/Container'
import NewUpdates from './components/_home/NewUpdates/NewUpdates'
import GridItem from './components/_home/GridItem'
import GridContainer from './components/_home/GridContainer'
import BackgroundImage from './components/_home/BackgroundImage'
import CowboyHat from './components/_home/Models/CowboyHat'
import dynamic from 'next/dynamic'
import Particle from './components/_home/Models/Particle'
import Signs from './components/_home/Models/Signs'
import Spinner from './components/common/Spinner'

const RenderModel = dynamic(() => import('@home/RenderModel'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner width="w-8" height="w-8" />
    </div>
  ),
})

export default async function Home() {
  return (
    <main className="h-full w-full">
      <BackgroundImage />

      <RenderModel>
        <CowboyHat />
        <Signs />
        <Particle />
      </RenderModel>

      <section className="h-auto md:h-full">
        <Container className="flex h-full items-center justify-center py-4">
          <GridContainer>
            <GridItem className="row-span-2 h-[300px]">
              <Weather />
            </GridItem>
            <GridItem className="row-span-2 h-[300px]">
              <MyCheckList />
            </GridItem>
            <GridItem className="row-span-1 h-[184px]">
              <NewArrivals />
            </GridItem>
            <GridItem className="row-span-1 h-[184px]">
              <NewUpdates />
            </GridItem>
          </GridContainer>
        </Container>
      </section>
    </main>
  )
}
