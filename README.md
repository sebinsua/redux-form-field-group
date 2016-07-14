# redux-form-field-group
> Pass data to dependent fields with `redux-form@6`

This can be deprecated [if a feature to pass dependent field state is added upstream to `redux-form`](https://github.com/erikras/redux-form/issues/841).

**Example**: Passing a single property into some inner `<Field>`s.

```js
<FieldGroup name="inputs.measurementUnit">
  <Field
    name={`inputs.amount`}
    component={renderInputAmount}
  />
</FieldGroup>
```

**Example**: Passing in multiple properties from a single object.

```js
<FieldGroup name="inputs" expose={['measurementUnit', 'currency']}>
  <Field
    name="inputs.amount"
    component={renderInputAmount}
  />
  <Field
    name="inputs.cost"
    component={renderInputCost}
  />
</FieldGroup>
```

Additionally if you need to transform property keys then you can pass in `{ from, to }` to `expose`.
