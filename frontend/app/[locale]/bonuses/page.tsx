'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { FaClock } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { GoDotFill } from "react-icons/go"
import { Any } from '@react-spring/web'

type BonusProps = {
  img: string
  timeout: string
  title: string
  caption: string
  active: boolean
}

type ModalProps = {
  close: () => void
}


function Modal({close}: ModalProps) {
  return (
    <div className='absolute rounded-lg size-full bg-[#0c0c0f] flex flex-col z-50'>
      <div className='m-[8px]'>
        <RxCross2 onClick={close} size={24} color='white' className='bg-[#242424] cursor-pointer w-[36px] h-[36px] bg-opacity-0 hover:bg-opacity-100 rounded-full duration-300 p-[4px]' />
      </div>
      <div className='text-[#eeeeee] p-[24px] text-wrap size-full overflow-y-auto overflow-x-hidden'>
        <h1 className='text-[24px] font-semibold text-center mb-[8px] text-white'>Бонус на 1 депозит</h1>
        <div>Вам начислен бонус-пакет "Welcome Pack"<br />
          <br />
          <div className='font-bold'>до 150% + 100FS на депозит</div>
          <br />
          Для получения бонуса внесите депозит выбрав бонус к начислению в разделе "Касса":<br />
          <br />
          <div className='flex flex-row gap-[8px]'><GoDotFill size={14} className='my-auto' color='#fabe00' />от <div className='font-bold'>100 грн - 100%</div> на сумму + <div className='font-bold'>25FS</div><br /></div>
          <div className='flex flex-row gap-[8px]'><GoDotFill size={14} className='my-auto' color='#fabe00' />от <div className='font-bold'>300 грн - 125%</div> на сумму + <div className='font-bold'>50FS</div><br /></div>
          <div className='flex flex-row gap-[8px]'><GoDotFill size={14} className='my-auto' color='#fabe00' />от <div className='font-bold'>500 грн - 150%</div> на сумму + <div className='font-bold'>100FS</div><br /></div>
          <br />
          Макс. бонус для % на депозит: <div className='font-bold'>40.000₴</div><br />
          <br />
          Макс. ставка для отыгрыша вейджера: 100₴<br />
          <br />
          Максимальный выигрыш с бонуса (после отыгрыша) x4 от суммы депозита<br />
          <br />
          После активации бонус необходимо отыграть с вейджером 35х в течение 24 часов.<br />
          <br />
          Отказываясь от бонуса, Вы теряете как %, так и FS
        </div>
      </div>
    </div>
  )
}


function Bonus({ img, title, caption, timeout, active }: BonusProps) {
  const [showModal, setShowModal] = useState(false)
  
  const openModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className='flex flex-col bg-[#0c0c0f] border rounded-lg w-[380px] relative'>
      {showModal ? (<Modal close={openModal} />) : (<></>)}
      <div className="absolute place-self-end w-full">
        <p className="bg-[#fcc20066] p-[8px] pr-[16px] font-bold text-[#fabe00] text-[14px] text-center rounded-md flex flex-row w-fit ml-auto mr-[6px] mt-[6px]">
          <FaClock size={21} />
          <span className="ml-[6px]">{timeout}</span>
        </p>
      </div>
      <div className='mt-auto mb-[16px] px-[16px] pt-[32px] flex flex-col-reverse items-center'>
        <p className='text-[12px] text-[#a1a1a1] font-semibold text-center'>
          {caption}
        </p>
        <p className='text-[20px] text-white font-bold text-center'>
          {title}
        </p>
        <p className="text-[#a1a1a1] text-[10px] bg-[#1c1c1c] px-[8px] py-[2px] rounded-full border text-center">
          {active ? 'АКТИВИРОВАН' : 'ДОСТУПЕН'}
        </p>
        <Image src={img} width={100} height={100} alt='icon' className='mb-[16px]' />
      </div>
      {active ? (
        <div className='bg-[#202021] p-[16px] mt-auto mb-0 flex flex-row gap-[8px]'>
          <div onClick={openModal} className="flex mx-auto flex-row w-full hover:bg-[#5c5c5c] duration-300 gap-[6px] text-white cursor-pointer font-semibold py-[12px] bg-[#333333] rounded-md">
            <Image src='/info.svg' alt='icon' width={24} height={24} className='ml-auto mr-0' />
            <p className='text-center ml-0 mr-auto'>Условия</p>
          </div>
        </div>
      ) : (
        <div className='bg-[#202021] p-[16px] mt-auto mb-0 flex flex-row gap-[8px]'>
          <div onClick={openModal} className="flex mx-auto flex-row w-[50%] hover:bg-[#5c5c5c] duration-300 gap-[6px] text-white cursor-pointer font-semibold py-[12px] bg-[#333333] rounded-md">
            <Image src='/info.svg' alt='icon' width={24} height={24} className='ml-auto mr-0' />
            <p className='text-center ml-0 mr-auto'>Условия</p>
          </div>
          <div className="hover:bg-[#01c365] mx-auto w-[50%] duration-300 text-white cursor-pointer font-semibold py-[12px] bg-[#018642] rounded-md">
            <p className='text-center'>Активировать</p>
          </div>
        </div>
      )}
    </div>
  )
}


export default function Bonuses() {
  const data = {
    available: [
      {
        img: '/bonus.webp',
        expire: '23д 14:88:22',
        title: 'Бонус на 1 депозит',
        caption: 'Депозит от 100р',
      },
      {
        img: '/bonus.webp',
        expire: '23д 14:88:22',
        title: 'Бонус на 1 депозит',
        caption: 'Депозит от 100р',
      },
      {
        img: '/bonus.webp',
        expire: '23д 14:88:22',
        title: 'Бонус на 1 депозит',
        caption: 'Депозит от 100р',
      },
      {
        img: '/bonus.webp',
        expire: '23д 14:88:22',
        title: 'Бонус на 1 депозит',
        caption: 'Депозит от 100р',
      },
      {
        img: '/bonus.webp',
        expire: '23д 14:88:22',
        title: 'Бонус на 1 депозит',
        caption: 'Депозит от 100р',
      }
    ],
    active: [
      {
        img: '/bonus.webp',
        expire: '23д 14:88:22',
        title: 'Бонус на 1 депозит',
        caption: 'Депозит от 100р',
      }
    ]
  }

  const availableBonuses = data.available.map((bonus, index) => (
    <Bonus key={index} img={bonus.img} timeout={bonus.expire} title={bonus.title} caption={bonus.caption} active={false} />
  ))

  const activeBonuses = data.active.map((bonus, index) => (
    <Bonus key={index} img={bonus.img} timeout={bonus.expire} title={bonus.title} caption={bonus.caption} active={true} />
  ))

  return (
    <div className='container mt-[60px]'>
      <p className="text-center text-white font-bold text-[40px]">Бонусы</p>
      <TabGroup className='flex flex-col items-center mt-[46px]'>
        <TabList className='bg-[#1c1c1e] rounded-full p-[4px]'>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button className={clsx(hover && 'bg-opacity-50', selected && 'text-white rounded-full bg-opacity-100', true && 'duration-300 bg-[#313131] bg-opacity-0 text-[16px] text-[#767676] py-[8px] px-[32px] mr-[2px] outline-none border-none rounded-full')}>Доступные</button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button className={clsx(hover && 'bg-opacity-50', selected && 'text-white rounded-full bg-opacity-100', true && 'duration-300 bg-[#313131] bg-opacity-0 text-[16px] text-[#767676] py-[8px] px-[32px] outline-none border-none rounded-full')}>Активные</button>
            )}
          </Tab>
        </TabList>
        <TabPanels className='mt-[46px] w-full'>
          <TabPanel>
            {data.available.length > 0 ? (
              <div className='flex flex-row flex-wrap gap-[16px] mx-auto place-content-center'>
                {availableBonuses}
              </div>
            ) : (
              <div className='flex flex-col mt-[24px]'>
                <Image src='/bonus.webp' width={185} height={185} alt='icon' className='mb-[16px] grayscale place-self-center mx-auto' />
                <p className='text-center text-white font-semibold text-[24px] place-self-center mx-auto'>Сейчас нет доступных розыгрышей</p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {data.active.length > 0 ? (
              <div className='flex flex-row flex-wrap gap-[16px] mx-auto place-content-center'>
                {activeBonuses}
              </div>
            ) : (
              <div className='flex flex-col mt-[24px]'>
                <Image src='/bonus.webp' width={185} height={185} alt='icon' className='mb-[16px] grayscale place-self-center mx-auto' />
                <p className='text-center text-white font-semibold text-[24px] place-self-center mx-auto'>У вас нет активированных бонусов</p>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}