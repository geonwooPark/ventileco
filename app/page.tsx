import React from 'react'
import NewArrivals from './components/_home/NewArrivals/NewArrivals'
import Weather from './components/_home/Weather/Weather'
import MyCheckList from './components/_home/MyCheckList/MyCheckList'
import Container from './components/common/Container'
import NewUpdates from './components/_home/NewUpdates/NewUpdates'
import GridItem from './components/_home/GridItem'
import GridContainer from './components/_home/GridContainer'
import DashedBox from './components/common/DashedBox'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="h-auto w-full md:h-full">
      <section className="flex h-full items-center justify-center pb-[16px] pt-[72px] md:pb-0 md:pt-[56px]">
        <DashedBox>
          <Container className="flex h-full flex-col items-center justify-center py-4">
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
        </DashedBox>
      </section>
    </main>
  )
}
