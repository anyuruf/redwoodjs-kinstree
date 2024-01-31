import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditParentById, UpdateParentInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormParent = NonNullable<EditParentById['parent']>

interface ParentFormProps {
  parent?: EditParentById['parent']
  onSave: (data: UpdateParentInput, id?: FormParent['id']) => void
  error: RWGqlError
  loading: boolean
}

const ParentForm = (props: ParentFormProps) => {
  const onSubmit = (data: FormParent) => {
    props.onSave(data, props?.parent?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormParent> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="source"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Parent Id
        </Label>

        <TextField
          name="source"
          defaultValue={props.parent?.source}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="source" className="rw-field-error" />

        <Label
          name="target"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sibling Id
        </Label>

        <TextField
          name="target"
          defaultValue={props.parent?.target}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="target" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ParentForm
