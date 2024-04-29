import React from 'react'
import NewArrivals from './components/_home/NewArrivals/NewArrivals'
import Weather from './components/_home/Weather/Weather'
import Container from './components/common/Container'
import NewUpdates from './components/_home/NewUpdates/NewUpdates'
import GridItem from './components/_home/GridItem'
import GridContainer from './components/_home/GridContainer'
import BackgroundImage from './components/_home/BackgroundImage'
import MyCheckList from './components/_home/MyCheckList/MyCheckList'
import CanvasRenderer from './components/_home/Three/CanvasRenderer'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="h-full w-full">
      <BackgroundImage />
      <CanvasRenderer />

      <section className="h-auto py-4 md:h-[calc(100%-56px)]">
        <Container className="flex h-full items-center justify-center">
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
