import React from 'react'
import '../../../../styles/rating.css'
import { UseFormRegisterReturn } from 'react-hook-form'
import ErrorMessage from '../../../common/ErrorMessage'

interface RatingStarProps {
  ratingRegister: UseFormRegisterReturn<'rating'>
  rating?: number
  errorMessage?: string
}

export default function RatingStar({
  ratingRegister,
  rating,
  errorMessage,
}: RatingStarProps) {
  return (
    <div>
      <div id="container" className="mb-1">
        <input
          {...ratingRegister}
          type="radio"
          id="rate5"
          value={5}
          defaultChecked={rating === 5}
        />
        <label htmlFor="rate5">
          <StarRight />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate4.5"
          value={4.5}
          defaultChecked={rating === 4.5}
        />
        <label htmlFor="rate4.5">
          <StarLeft />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate4"
          value={4}
          defaultChecked={rating === 4}
        />
        <label htmlFor="rate4">
          <StarRight />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate3.5"
          value={3.5}
          defaultChecked={rating === 3.5}
        />
        <label htmlFor="rate3.5">
          <StarLeft />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate3"
          value={3}
          defaultChecked={rating === 3}
        />
        <label htmlFor="rate3">
          <StarRight />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate2.5"
          value={2.5}
          defaultChecked={rating === 2.5}
        />
        <label htmlFor="rate2.5">
          <StarLeft />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate2"
          value={2}
          defaultChecked={rating === 2}
        />
        <label htmlFor="rate2">
          <StarRight />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate1.5"
          value={1.5}
          defaultChecked={rating === 1.5}
        />
        <label htmlFor="rate1.5">
          <StarLeft />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate1"
          value={1}
          defaultChecked={rating === 1}
        />
        <label htmlFor="rate1">
          <StarRight />
        </label>
        <input
          {...ratingRegister}
          type="radio"
          id="rate0.5"
          value={0.5}
          defaultChecked={rating === 0.5}
        />
        <label htmlFor="rate0.5">
          <StarLeft />
        </label>
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

function StarLeft() {
  return (
    <svg
      width="20"
      height="38"
      viewBox="0 0 20 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_16_51" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 0L15.2852 14.5106H0.0278168L12.3713 23.4787L7.65651 37.9894L20 29.0213V0Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0L15.2852 14.5106H0.0278168L12.3713 23.4787L7.65651 37.9894L20 29.0213V0Z"
      />
      <path
        d="M15.2852 14.5106V15.5106H16.0118L16.2363 14.8197L15.2852 14.5106ZM20 0H21L19.0489 -0.309017L20 0ZM0.0278168 14.5106V13.5106H-3.04987L-0.559968 15.3197L0.0278168 14.5106ZM12.3713 23.4787L13.3224 23.7877L13.5469 23.0967L12.9591 22.6697L12.3713 23.4787ZM7.65651 37.9894L6.70546 37.6803L5.7544 40.6074L8.2443 38.7984L7.65651 37.9894ZM20 29.0213L20.5878 29.8303L21 29.5308V29.0213H20ZM16.2363 14.8197L20.9511 0.309017L19.0489 -0.309017L14.3342 14.2016L16.2363 14.8197ZM0.0278168 15.5106H15.2852V13.5106H0.0278168V15.5106ZM12.9591 22.6697L0.615602 13.7016L-0.559968 15.3197L11.7835 24.2877L12.9591 22.6697ZM8.60757 38.2984L13.3224 23.7877L11.4203 23.1697L6.70546 37.6803L8.60757 38.2984ZM19.4122 28.2123L7.06873 37.1803L8.2443 38.7984L20.5878 29.8303L19.4122 28.2123ZM21 29.0213V0H19V29.0213H21Z"
        mask="url(#path-1-inside-1_16_51)"
      />
    </svg>
  )
}
function StarRight() {
  return (
    <svg
      width="20"
      height="38"
      viewBox="0 0 20 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_16_52" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.027813 0L4.74261 14.5106H20L7.65651 23.4787L12.3713 37.9894L0.027813 29.0213V0Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.027813 0L4.74261 14.5106H20L7.65651 23.4787L12.3713 37.9894L0.027813 29.0213V0Z"
      />
      <path
        d="M4.74261 14.5106V15.5106H4.01606L3.79155 14.8197L4.74261 14.5106ZM0.027813 0H-0.972187L0.978869 -0.309017L0.027813 0ZM20 14.5106V13.5106H23.0777L20.5878 15.3197L20 14.5106ZM7.65651 23.4787L6.70545 23.7877L6.48094 23.0967L7.06872 22.6697L7.65651 23.4787ZM12.3713 37.9894L13.3224 37.6803L14.2734 40.6074L11.7835 38.7984L12.3713 37.9894ZM0.027813 29.0213L-0.559972 29.8303L-0.972187 29.5308V29.0213H0.027813ZM3.79155 14.8197L-0.923244 0.309017L0.978869 -0.309017L5.69366 14.2016L3.79155 14.8197ZM20 15.5106H4.74261V13.5106H20V15.5106ZM7.06872 22.6697L19.4122 13.7016L20.5878 15.3197L8.24429 24.2877L7.06872 22.6697ZM11.4202 38.2984L6.70545 23.7877L8.60757 23.1697L13.3224 37.6803L11.4202 38.2984ZM0.615598 28.2123L12.9591 37.1803L11.7835 38.7984L-0.559972 29.8303L0.615598 28.2123ZM-0.972187 29.0213V0H1.02781V29.0213H-0.972187Z"
        mask="url(#path-1-inside-1_16_52)"
      />
    </svg>
  )
}
