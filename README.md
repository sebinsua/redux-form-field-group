# redux-form-field-group
> Pass data to dependent fields with `redux-form@6`

**This is deprecated** [as a feature to pass dependent field state has been added upstream to `redux-form`](https://github.com/erikras/redux-form/issues/841) as of [`redux-form@6.0.0-rc5`](https://github.com/erikras/redux-form/releases/tag/v6.0.0-rc.5).

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
