import React from 'react'
import { useParams } from 'react-router-dom'
import useTitle from '../../../utilities/useTitle'


export default function Detail({ title }) {
  useTitle(title)
  const { id } = useParams();
  return (
    <div>Detail : {id}</div>
  )
}
