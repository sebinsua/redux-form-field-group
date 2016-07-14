import test from 'ava'
import { shallow } from 'enzyme'

import React from 'react'
import FieldGroup from '../src/FieldGroup'

function getProps () {
  return { name: 'test-name' }
}

test.skip('pass some props into the <Field>s within', (t) => {
  const props = getProps()
  const renderedComponent = shallow(<FieldGroup {...props} />)

  t.is(
    renderedComponent.length,
    1
  )
})
