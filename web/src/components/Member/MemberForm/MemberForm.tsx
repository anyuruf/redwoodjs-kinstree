import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  Submit,
  DateField,
} from '@redwoodjs/forms'

import type { EditMemberById, UpdateMemberInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { formatDateForInput } from 'src/lib/formatters'
import ButtonInput from 'src/components/ButtonInput/ButtonInput'

export enum Gender {
  female,
  male,
}

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
    <div className="mx-md-auto">
      <Form<FormMember> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="border rounded m-2"
          titleClassName="form-label fw-bold"
          listClassName="list-group"
        />
        <div className="row mb-3">
          <Label
            name="firstName"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            First name
          </Label>

          <TextField
            name="firstName"
            defaultValue={props.member?.firstName}
            className="form-control"
            errorClassName="form-control border-danger"
            validation={{
              required:
                'Please! first name field is required for form submition.',
            }}
          />

          <FieldError
            name="firstName"
            className="list-group-item fw-bold text-danger"
          />
        </div>
        <div className="row mb-3">
          <Label
            name="lastName"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            Last name
          </Label>

          <TextField
            name="lastName"
            defaultValue={props.member?.lastName}
            className="form-control"
            errorClassName="form-control border-danger"
            validation={{
              required:
                'Please! last name field is required for form submition.',
            }}
          />

          <FieldError
            name="lastName"
            className="list-group-item fw-bold text-danger"
          />
        </div>
        <div className="row mb-3">
          <Label
            name="tribeClan"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            Tribe clan
          </Label>

          <TextField
            name="tribeClan"
            defaultValue={props.member?.tribeClan}
            className="form-control"
            errorClassName="form-control border-danger"
          />

          <FieldError
            name="tribeClan"
            className="list-group-item fw-bold text-danger"
          />
        </div>
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
              errorClassName="rw-input rw-input-error"
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
              errorClassName="rw-input rw-input-error"
            />
            <Label className="form-check-label" name="female">
              Female
            </Label>
          </div>

          <FieldError name="gender" className="rw-field-error" />
        </div>
        <div className="row mb-3">
          <Label
            name="birthDate"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            Birth date
          </Label>

          <DateField
            name="birthDate"
            defaultValue={formatDateForInput(props.member?.birthDate)}
            className="form-control"
            errorClassName="form-control border-danger"
          />

          <FieldError
            name="birthDate"
            className="list-group-item fw-bold text-danger"
          />
        </div>
        <div className="row mb-3">
          <Label
            name="deathDate"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            Death date
          </Label>

          <DateField
            name="deathDate"
            value={formatDateForInput(props.member?.deathDate)}
            className="form-control"
            errorClassName="form-control border-danger"
          />

          <FieldError
            name="deathDate"
            className="list-group-item fw-bold text-danger"
          />
        </div>
        <div className="row mb-3">
          <Label
            name="description"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            Description
          </Label>

          <TextField
            name="description"
            defaultValue={props.member?.description}
            className="form-control"
            errorClassName="form-control border-danger"
          />

          <FieldError
            name="description"
            className="list-group-item fw-bold text-danger"
          />
        </div>
        <div className="row mb-3">
          <Label
            name="avatarUrl"
            className="form-label fw-bold"
            errorClassName="form-label fw-bold text-danger"
          >
            Avatar url
          </Label>

          <TextField
            name="avatarUrl"
            defaultValue={props.member?.avatarUrl}
            className="form-control"
            errorClassName="form-control border-danger"
          />

          <FieldError
            name="avatarUrl"
            className="list-group-item fw-bold text-danger"
          />
        </div>
        <div className="mb-3">
          <ButtonInput
            type="submit"
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
