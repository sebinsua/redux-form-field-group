import { Children, isValidElement, cloneElement } from 'react'
import merge from 'lodash/merge'

function isNotDom (child) {
  return typeof child.type !== 'string'
}

function recursiveCloneChildrenWithProps (children, extraProps, shouldPlaceExtraPropsOntoChild = isNotDom) {
  return Children.map(
    children,
    child => {
      if (!isValidElement(child)) {
        return child
      }

      const newChildProps = {}
      if (child.props && child.props.children) {
        newChildProps.children = recursiveCloneChildrenWithProps(child.props.children, extraProps, shouldPlaceExtraPropsOntoChild)
      }
      return cloneElement(child, shouldPlaceExtraPropsOntoChild(child) ? merge(newChildProps, extraProps) : newChildProps)
    }
  )
}

export default recursiveCloneChildrenWithProps
