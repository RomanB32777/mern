import React from 'react'
import {Link} from 'react-router-dom'

export const PostList = ({ posts }) => {
  if (!posts.length) {
    return <p className="center">Постов пока нет</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Заголовок</th>
        <th>Текст</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      { posts.map((post, index) => {
        return (
          <tr key={post._id}>
            <td>{index + 1}</td>
            <td>{post.title}</td>
            <td>{post.text}</td>
            <td>
              <Link to={`/detail/${post._id}`}>Открыть</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}