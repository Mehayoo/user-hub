'use client'

import React, { useEffect, useMemo } from 'react'
import {
	Checkbox,
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	Space,
	Spin,
} from 'antd'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilValue } from 'recoil'
import { countriesSelector, queryParamsAtom, userAtom } from '@/recoil'
import { useAsyncRecoilValue, useRecoilAlert, useRecoilUser } from '@/hooks'
import { yupUserSchema } from './schema'
import { getOptionalFields, transformData, triggerRevalidation } from '@/utils'
import { UserWithCountry } from '@/db/queries/users'
import type { Country, User } from '@prisma/client'
import {
	FormAddUser,
	FormEditUser,
	GENDER,
	OptionalNullable,
	SessionStorage,
} from '@/constants'
import { OnFormSubmit, UserModalProps } from './types'

const UserModal = ({ open, setOpen, userId }: UserModalProps) => {
	const countries: Country[] | null = useAsyncRecoilValue(countriesSelector)

	const userActions = useRecoilUser()
	const userData: UserWithCountry | null = useRecoilValue(userAtom)

	const queryParamsState: SessionStorage = useRecoilValue(queryParamsAtom)

	const alertActions = useRecoilAlert()

	const mode = { add: !userId, edit: !!userId }

	const optionalFields: string[] = useMemo(
		() => getOptionalFields(yupUserSchema),
		[]
	)

	const memoUserSchema = useMemo(() => yupUserSchema, [])
	const {
		clearErrors,
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm({
		resolver: yupResolver(memoUserSchema),
		mode: 'all',
	})

	useEffect(() => {
		if (mode.edit && userId) {
			userActions.getUserById(userId)
		}

		return () => userActions.resetUser()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId])

	useEffect(() => {
		if (mode.edit && userData) {
			const { birthday, country, ...restOfUserData } = userData

			const sanitizedData = Object.entries(restOfUserData).reduce(
				(acc: any, [key, value]) => {
					acc[key] = value === null ? undefined : value
					return acc
				},
				{} as OptionalNullable<User>
			)

			reset(sanitizedData)

			setValue('country', country?.name)
			setValue('birthday', dayjs(birthday) as any) // This is a workaround for AntD's DatePicker which expects
			// a DayJs object. In order to also have validation enabled with Yup and react-hook-form,
			// the interface which defines the form must treat birthday as a string, since there's no type in
			// Yup for DayJs
		}

		return () => reset()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	const selectedCountry = watch('country')
	useEffect(() => {
		if (selectedCountry && countries) {
			const country: Country = countries.find(
				(c: Country) => c.name === selectedCountry
			)!
			setValue('country_prefix', country ? country.country_prefix : '')
		} else {
			setValue('country_prefix', '')
		}
	}, [countries, selectedCountry, setValue])

	const onSubmit = async (data: OnFormSubmit) => {
		const selectedCountryId = countries?.find(
			(c) => c.name === selectedCountry
		)?.id

		const transformedData = transformData(data, optionalFields)
		transformedData.country_id = selectedCountryId || null
		transformedData.newsletter_register = data.newsletter_register || false
		delete transformedData.country
		if (!selectedCountry) {
			delete transformedData.country_prefix
		}

		mode.edit && userData?.id
			? await updateUser(userData.id, transformedData as FormEditUser)
			: await addUser(transformedData as FormAddUser)

		await triggerRevalidation('/')
		userActions.getAllUsers(queryParamsState)

		reset()
		setOpen(false)
	}

	const handleCancel = (): void => {
		if (mode.add) {
			clearErrors()
			reset()
		}
		setTimeout(() => setOpen(false), 50)
	}

	const addUser = async (data: FormAddUser): Promise<void> => {
		try {
			await userActions.addUser(data)
			alertActions.success('User added')
		} catch (error: unknown) {
			alertActions.error('Failed to add user')
			throw error
		}
	}

	const updateUser = async (
		id: string,
		data: FormEditUser
	): Promise<void> => {
		try {
			await userActions.updateUser(id, data)
			alertActions.success('User updated')
		} catch (error: unknown) {
			alertActions.error('Failed to update user')
			throw error
		}
	}

	const loading: boolean = mode.edit && !userData
	return (
		<>
			{!loading ? (
				<Modal
					centered
					onCancel={handleCancel}
					onOk={handleSubmit(onSubmit)}
					open={open}
					title={mode.edit ? 'Edit user' : 'Add new user'}
				>
					<Form
						labelCol={{ span: 8 }}
						layout="horizontal"
						wrapperCol={{ span: 14 }}
					>
						<Form.Item
							label="Username"
							help={errors.user_name?.message}
							required
							validateStatus={errors.user_name && 'error'}
						>
							<Controller
								name="user_name"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder={'Username'}
										type="text"
									/>
								)}
							/>
						</Form.Item>

						<Form.Item
							label="First Name"
							help={errors.first_name?.message}
							required
							validateStatus={errors.first_name && 'error'}
						>
							<Controller
								name="first_name"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder={'First Name'}
										type="text"
									/>
								)}
							/>
						</Form.Item>

						<Form.Item
							label="Last Name"
							help={errors.last_name?.message}
							required
							validateStatus={errors.last_name && 'error'}
						>
							<Controller
								name="last_name"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder={'Last Name'}
										type="text"
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label="Gender">
							<Controller
								name="gender"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										allowClear
										onBlur={field.onBlur}
										onChange={(value) =>
											field.onChange(value)
										}
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
								)}
							/>
						</Form.Item>

						<Form.Item
							label="Date of birth"
							help={errors.birthday?.message}
							required
							validateStatus={errors.birthday && 'error'}
						>
							<Controller
								name="birthday"
								control={control}
								render={({ field }) => (
									<DatePicker
										{...field}
										allowClear
										format="YYYY-MM-DD"
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label="Address">
							<Controller
								name="address"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder={'Address'}
										type="text"
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label="City">
							<Controller
								name="city"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder={'City'}
										type="text"
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label="Register to newsletter">
							<Controller
								name="newsletter_register"
								control={control}
								render={({ field: { onChange, ref } }) => (
									<Checkbox onChange={onChange} ref={ref} />
								)}
							/>
						</Form.Item>

						<Form.Item name="country" label="Country">
							<Controller
								name="country"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										allowClear
										loading={!countries}
										onBlur={field.onBlur}
										onChange={(value) =>
											field.onChange(value)
										}
										placeholder="Select a country"
									>
										{countries ? (
											Object.values(countries).map(
												(country) => (
													<Select.Option
														key={country.name}
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
								)}
							/>
						</Form.Item>

						<Form.Item
							label="Phone"
							help={errors.phone?.message}
							validateStatus={errors.phone && 'error'}
						>
							<Space.Compact>
								<Controller
									name="country_prefix"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											disabled
											style={{ width: '25%' }}
										/>
									)}
								/>
								<Controller
									name="phone"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Phone number"
											style={{ width: '75%' }}
										/>
									)}
								/>
							</Space.Compact>
						</Form.Item>

						<Form.Item label="Details">
							<Controller
								name="details"
								control={control}
								render={({ field }) => (
									<Input.TextArea
										{...field}
										placeholder={'Details'}
										rows={4}
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label="Hobbies">
							<Controller
								name="hobbies"
								control={control}
								render={({ field }) => (
									<Input.TextArea
										{...field}
										placeholder={'Hobbies'}
										rows={4}
									/>
								)}
							/>
						</Form.Item>
					</Form>
				</Modal>
			) : (
				<div
					style={{
						alignItems: 'center',
						background: 'rgba(0, 0, 0, 0)',
						display: 'flex',
						height: '100%',
						justifyContent: 'center',
						left: 0,
						position: 'fixed',
						top: 0,
						width: '100%',
						zIndex: 2,
					}}
				>
					<Spin size="large" />
				</div>
			)}
		</>
	)
}

export default UserModal
