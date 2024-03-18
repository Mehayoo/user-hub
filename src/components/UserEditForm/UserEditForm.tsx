'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import {
	Form,
	Input,
	Button,
	DatePicker,
	Select,
	Col,
	Row,
	Card,
	Space,
	Spin,
	Checkbox,
	Typography,
	Divider,
} from 'antd'
import {
	ArrowLeftOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import { editUserAction } from '@/actions/edit-user'
import { useRecoilAlert } from '@/hooks'
import paths from '@/paths'
import { transformData } from '@/utils'
import { Country } from '@prisma/client'
import { EditableUser, FormEditUser, GENDER } from '@/constants'
import { UserEditFormProps } from './types'

const UserEditForm = ({ countriesList, user }: UserEditFormProps) => {
	const { id, birthday, country, newsletter_register } = user

	const [displayIcon, setDisplayIcon] = useState<boolean>(
		newsletter_register!
	)

	const router = useRouter()

	const alertActions = useRecoilAlert()

	const [form] = Form.useForm()

	const [formState, action] = useFormState(editUserAction.bind(null, id), {
		errors: {},
	})

	const flattenedInitialData = {
		...user,
		country: user.country ? user.country.name : undefined,
		birthday: birthday ? dayjs(birthday) : null,
	}

	useEffect(() => {
		if (Object.keys(formState.errors).length) {
			if (formState.errors._form) {
				alertActions.error(formState.errors._form?.join(', '))
			} else {
				alertActions.error('Failed to update user')
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState.errors])

	const selectedCountry: string = Form.useWatch('country', form)
	useEffect(() => {
		if (selectedCountry && countriesList) {
			const country: Country = countriesList.find(
				(c: Country) => c.name === selectedCountry
			)!
			form.setFieldsValue({ country_prefix: country.country_prefix })
		} else {
			form.setFieldsValue({ country_prefix: '' })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countriesList, selectedCountry])

	const handleSubmit = (values: FormEditUser) => {
		const submissionData = {
			...omit(values, ['country', 'country_prefix']),
			birthday: new Date(values.birthday),
			country_id:
				countriesList.find((country) => country.name === values.country)
					?.id || null,
		}

		action(
			transformData(submissionData, [
				'gender',
				'address',
				'city',
				'phone',
				'details',
				'hobbies',
			]) as EditableUser
		)
	}

	return (
		<Row justify="center" style={{ marginTop: 20 }}>
			<Col xs={24} sm={20} md={16} lg={14} xl={14}>
				<Card style={{ marginTop: 16 }}>
					<Typography.Text type="secondary">
						This part of the app uses server actions and server
						validation with useFormState and zod
					</Typography.Text>
					<Divider />
					<Form
						form={form}
						layout="vertical"
						onFinish={handleSubmit}
						initialValues={flattenedInitialData}
					>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item
									help={formState.errors?.user_name}
									label="Username"
									name="user_name"
									required
									validateStatus={
										formState.errors?.user_name && 'error'
									}
								>
									<Input placeholder="Username" />
								</Form.Item>
							</Col>

							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item
									help={formState.errors?.first_name}
									label="First Name"
									name="first_name"
									required
									validateStatus={
										formState.errors?.first_name && 'error'
									}
								>
									<Input placeholder="First Name" />
								</Form.Item>
							</Col>

							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item
									help={formState.errors?.last_name}
									label="Last Name"
									name="last_name"
									required
									validateStatus={
										formState.errors?.last_name && 'error'
									}
								>
									<Input placeholder="Last Name" />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item label="Gender" name="gender">
									<Select
										allowClear
										placeholder="Select a gender"
									>
										{Object.values(GENDER).map((gender) => (
											<Select.Option
												key={gender}
												value={gender}
											>
												{gender
													.charAt(0)
													.toUpperCase() +
													gender.slice(1)}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>

							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item
									help={formState.errors?.birthday}
									label="Birthday"
									name="birthday"
									required
									validateStatus={
										formState.errors?.birthday && 'error'
									}
								>
									<DatePicker
										allowClear
										format="YYYY-MM-DD"
									/>
								</Form.Item>
							</Col>

							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item
									label="Register to newsletter"
									name="newsletter_register"
									valuePropName="checked"
								>
									<Checkbox
										onChange={() =>
											setDisplayIcon(!displayIcon)
										}
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										{displayIcon ? (
											<div
												style={{
													alignItems: 'center',
													display: 'flex',
												}}
											>
												<CheckCircleOutlined
													color="green"
													style={{
														color: 'green',
														fontSize: '18px',
														marginRight: 7,
													}}
												/>
												Yes
											</div>
										) : (
											<div
												style={{
													alignItems: 'center',
													display: 'flex',
												}}
											>
												<CloseCircleOutlined
													style={{
														color: 'red',
														fontSize: '18px',
														marginRight: 7,
													}}
												/>
												No
											</div>
										)}
									</Checkbox>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item label="Country" name="country">
									<Select
										allowClear
										loading={!countriesList}
										placeholder="Select a country"
									>
										{countriesList ? (
											Object.values(countriesList).map(
												(country) => (
													<Select.Option
														key={country.id}
														value={country.name}
													>
														{country.name}
													</Select.Option>
												)
											)
										) : (
											<Select.Option
												disabled
												value="loading"
											>
												<Spin size="large" />
											</Select.Option>
										)}
									</Select>
								</Form.Item>
							</Col>

							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Form.Item label="City" name="city">
									<Input placeholder="City" />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
							<Col className="gutter-row" xs={24} sm={24} md={16}>
								<Form.Item label="Address" name="address">
									<Input placeholder="Address" />
								</Form.Item>
							</Col>

							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<Space.Compact>
									<Form.Item
										initialValue={country?.country_prefix}
										label="Phone"
										name="country_prefix"
										style={{ width: '25%' }}
									>
										<Input disabled />
									</Form.Item>
									<Form.Item label=" " name="phone">
										<Input placeholder="Phone number" />
									</Form.Item>
								</Space.Compact>
							</Col>
						</Row>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
							<Col className="gutter-row" xs={24} sm={24} md={24}>
								<Form.Item label="Details" name="details">
									<Input placeholder="Details" />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
							<Col className="gutter-row" xs={24} sm={24} md={24}>
								<Form.Item label="Hobbies" name="hobbies">
									<Input placeholder="Hobbies" />
								</Form.Item>
							</Col>
						</Row>

						<Form.Item>
							<Button
								onClick={() => router.push(paths.userShow(id))}
								danger
								htmlType="submit"
								style={{ marginRight: 15 }}
							>
								<ArrowLeftOutlined />
								Back
							</Button>

							<Button type="primary" htmlType="submit">
								Save Changes
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	)
}

export default UserEditForm
