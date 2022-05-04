import React from 'react'
import useTitle from '../../utilities/useTitle'

export default function Home({ title }) {
  useTitle(title);
  return (
    <div>Home</div>
  )
}
