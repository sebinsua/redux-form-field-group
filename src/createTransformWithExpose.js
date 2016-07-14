import transform from 'lodash/transform'
import find from 'lodash/fp/find'

function createTransformWithExpose (exposeArr) {
  return function transformWithExpose (values) {
    return transform(values, (newValue, valueValue, valueKey) => {
      const match = find(exposeItem => exposeItem.from === valueKey, exposeArr)
      const toKey = match ? match.to : valueKey
      newValue[toKey] = valueValue
      return newValue
    }, {})
  }
}

export default createTransformWithExpose
