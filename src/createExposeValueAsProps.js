import isPlainObject from 'lodash/isPlainObject'
import flow from 'lodash/flow'
import some from 'lodash/fp/some'
import pick from 'lodash/fp/pick'
import identity from 'lodash/identity'

import createTransformWithExpose from './createTransformWithExpose'

function createExposeValueAsProps (groupName, expose) {
  // Read down...
  // The constants defined here are units of functionality used within exposeValueAsProps.
  const exposeArr = [].concat(expose) // We default to exposing a list of properties.
  const exposeKeys = exposeArr.map(exposeItem => isPlainObject(exposeItem) ? exposeItem.from : exposeItem)

  const pickPropsFromValueObject = exposeKeys.length > 0 ? pick(exposeKeys) : identity

  const toPropsFromValue = (fieldName) => {
    const propertyName = fieldName.split('.').slice(-1).pop()
    return (value) => ({
      [`${propertyName}`]: value
    })
  }

  const exposeHasTransforms = some(isPlainObject, exposeArr)
  const transformKeys = exposeHasTransforms ? createTransformWithExpose(exposeArr) : identity

  const getTransformedPropsOfValueObject = flow([ pickPropsFromValueObject, transformKeys ])
  const getTransformedPropsOfValue = flow([ toPropsFromValue(groupName), transformKeys ])

  return function exposeValueAsProps (value) {
    if (isPlainObject(value)) {
      // get the relevant props from a value object
      return getTransformedPropsOfValueObject(value)
    }

    // else, construct the props from a singular value, if it's truthy
    return value ? getTransformedPropsOfValue(value) : {}
  }
}

export default createExposeValueAsProps
