'use client'

import React from 'react'
import Image from 'next/image'
import men from '../../../../public/images/men.png'
import Modal from './Modal/Modal'

export default function IntroModal() {
  return (
    <Modal>
      <Modal.Dim>
        <Modal.Card size="large">
          <Modal.Header>
            <Modal.Title>Intro</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Content>
            <div className="text-beige-light">
              <div className="relative mx-auto mb-4 size-[200px] overflow-hidden rounded-full bg-beige-normal">
                <Image
                  src={men}
                  alt="profile"
                  fill
                  objectFit="cover"
                  placeholder="blur"
                />
              </div>
              <div className="space-y-4 ">
                <p>
                  안녕하세요, 프론트엔드 개발자를 꿈꾸는 박건우라고 합니다.
                  1년전부터 개발에 관심을 가지게 되어서 작년 4월부터 개발자를
                  목표로 공부하고 있습니다. 주로 인터넷 강의나, 공식문서, 기술
                  블로그를 보며 독학하였습니다.
                </p>
                <p>
                  저의 장점은 사용자의 관점을 고려하면서 지속적인 리팩토링을
                  통해 코드를 개선해나가는 것입니다. 또한 단기적으로 진행하여
                  금방 버려지는 프로젝트보다는 하나의 프로젝트를 계속 발전시키는
                  것을 지향합니다.
                </p>
                <p>
                  다양한 분야의 전문가분들과 함께 일하며 협업과 의사소통 능력을
                  키우고, 제가 속한 팀의 성과에 기여할 수 있는 사람이 되는 것이
                  제 목표입니다. 개발자로서 출발이 늦었지만 그만큼 개발에 대한
                  관심과 끊임 없는 학습으로 빠르게 성장해나가겠습니다.
                </p>
              </div>
            </div>
          </Modal.Content>
        </Modal.Card>
      </Modal.Dim>
    </Modal>
  )
}
