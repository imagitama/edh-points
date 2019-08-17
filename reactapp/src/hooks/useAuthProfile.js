import { useSelector } from 'react-redux'

export default () => {
  return useSelector(({ firebase: { auth } }) => auth) || false
}
