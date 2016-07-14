import React, { PropTypes } from 'react'
import { Field } from 'redux-form'

import kebabCase from 'lodash/kebabCase'

import placePropsOntoChildren from './recursiveCloneChildrenWithProps'
import createExposeValueAsProps from './createExposeValueAsProps'

// NOTE: This can be removed if a feature to pass fields dependent state is added upstream.
// See: https://github.com/erikras/redux-form/issues/841

const exposeValuePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
  })
])
const exposePropType = PropTypes.oneOfType([ PropTypes.arrayOf(exposeValuePropType), exposeValuePropType ])

function isReduxFormField (child) {
  const componentName = typeof child.type === 'string' ? child.type : child.type.displayName || child.type.name
  return ['Field', 'FieldArray'].includes(componentName)
}

function renderChildrenWithGroupsProps ({
  input: {
    value,
    className,
    groupName,
    expose,
    children
  }
}) {
  // Take the field group name and a list of properties you wish to expose
  // and place each of these into the props of the non-DOM, redux-formy children within
  // the current FieldGroup while transforming the key names as necessary.
  const exposeValueAsProps = createExposeValueAsProps(groupName, expose)
  const childrenWithProps = placePropsOntoChildren(children, exposeValueAsProps(value), isReduxFormField)
  return (
    <div className={`field-group ${className}`}>
      {childrenWithProps}
    </div>
  )
}

renderChildrenWithGroupsProps.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
    className: PropTypes.string.isRequired,
    expose: exposePropType,
    children: PropTypes.node.isRequired
  }).isRequired
}

export function FieldGroup ({
  name,
  expose,
  children
}) {
  return (
    <Field
      name={name}
      component={renderChildrenWithGroupsProps}
      className={`field-group-${kebabCase(name)}`}
      groupName={name}
      expose={expose}
      children={children}
    />
  )
}

FieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  expose: exposePropType,
  children: PropTypes.node.isRequired
}

export default FieldGroup
