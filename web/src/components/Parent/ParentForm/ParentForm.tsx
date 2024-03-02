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
import FormText from 'src/components/FormText/FormText'
import ButtonInput from 'src/components/ButtonInput/ButtonInput'

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
    <div>
      <Form<FormParent> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="m-2"
          titleClassName="form-label text-danger fw-bold"
          listClassName="list-group text-danger"
        />
        <FormText
          name="source"
          defaultValue={props.parent?.source}
          label="Parent Id"
          validation={{
            required: 'Please! parent id field is required for form submition.',
          }}
        />
        <FormText
          name="target"
          defaultValue={props.parent?.target}
          label="Child Id"
          validation={{
            required: 'Please! child id field is required for form submition.',
          }}
        />
        <div className="text-center">
          <ButtonInput
            type="submit"
            title="Add relation to database"
            disabled={props.loading}
            className="btn btn-primary"
          >
            Save
          </ButtonInput>
        </div>
      </Form>
    </div>
  )
}

export default ParentForm
