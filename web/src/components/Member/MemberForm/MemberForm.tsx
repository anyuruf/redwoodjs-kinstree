import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  DateField,
} from '@redwoodjs/forms'

import type { EditMemberById, UpdateMemberInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { formatDateForInput } from 'src/lib/formatters'
import ButtonInput from 'src/components/ButtonInput/ButtonInput'
import FormText from 'src/components/FormText/FormText'
import DateInput from 'src/components/DateInput/DateInput'

type FormMember = NonNullable<EditMemberById['member']>

interface MemberFormProps {
  member?: EditMemberById['member']
  onSave: (data: UpdateMemberInput, id?: FormMember['id']) => void
  error: RWGqlError
  loading: boolean
}

const MemberForm = (props: MemberFormProps) => {
  const onSubmit = (data: FormMember) => {
    props.onSave(data, props?.member?.id)
  }

  return (
    <div>
      <Form<FormMember> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="m-2"
          titleClassName="form-label text-danger fw-bold"
          listClassName="list-group text-danger"
        />
        <FormText
          name="firstName"
          label="First Name"
          defaultValue={props.member?.firstName}
          validation={{
            required:
              'Please! first name field is required for form submition.',
          }}
        />

        <FormText
          name="lastName"
          label="Last Name"
          defaultValue={props.member?.lastName}
          validation={{
            required: 'Please! last name field is required for form submition.',
          }}
        />

        <FormText
          name="tribeClan"
          label="Kingdom-Clan"
          defaultValue={props.member?.tribeClan}
        />
        <div className="row mb-3">
          <Label
            name="gender"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            Gender
          </Label>

          <div className="form-check form-check-inline">
            <RadioField
              id="member-gender-0"
              name="gender"
              defaultValue="male"
              defaultChecked={props.member?.gender?.includes('male')}
              className="form-check-input"
              errorClassName="form-check-input text-danger"
            />
            <div className="form-check-label">Male</div>
          </div>

          <div className="form-check form-check-inline">
            <RadioField
              id="member-gender-1"
              name="gender"
              defaultValue="female"
              defaultChecked={props.member?.gender?.includes('female')}
              className="form-check-input"
              errorClassName="form-check-input text-danger"
            />
            <Label className="form-check-label" name="female">
              Female
            </Label>
          </div>

          <FieldError
            name="gender"
            className="list-group-item fw-bold text-danger"
          />
        </div>
        <DateInput
          name="birthDate"
          defaultValue={formatDateForInput(props.member?.birthDate)}
          label="Birth Date"
          onChange={null}
        />
        <DateInput
          name="deathDate"
          label="Death Date"
          defaultValue={formatDateForInput(props.member?.deathDate)}
          onChange={null}
        />
        <FormText
          name="description"
          defaultValue={props.member?.description}
          label="Description"
        />
        <FormText
          name="nationality"
          defaultValue={props.member?.nationality}
          label="Nationality"
        />
        <div className="text-center">
          <ButtonInput
            type="submit"
            title="Add user to database"
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

export default MemberForm
