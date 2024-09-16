import React from 'react'
import styles from './styles/singleColor.module.scss'

const SingleColor = ({
                       onClick,
                       name,
                       value,
                     }: {
  onClick: ({ name, value }: { name: string; value: string | number }) => void;
  name: string;
  value: string | number;
}) => {
  return (
    <div
      className={styles.color}
      style={{ backgroundColor: value.toString() }}
      onClick={() => onClick({ name, value })}
    ></div>
  )
}

export default SingleColor