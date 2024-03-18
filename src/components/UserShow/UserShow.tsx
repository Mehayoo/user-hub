'use client'

import { useRouter } from 'next/navigation'
import { Badge, Button, Card, Col, Row, Typography } from 'antd'
import {
	ArrowLeftOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined,
	EditOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import paths from '@/paths'
import { UserShowProps } from './types'

const UserShowPage = ({ user }: UserShowProps) => {
	const {
		id,
		user_name,
		first_name,
		last_name,
		gender,
		birthday,
		country,
		city,
		address,
		phone,
		newsletter_register,
		details,
		hobbies,
		created_at,
		updated_at,
	} = user
	const router = useRouter()

	return (
		<Row justify="center" style={{ marginTop: 20 }}>
			<Col xs={24} sm={20} md={16} lg={14} xl={12}>
				<Button
					onClick={() => router.push(paths.home())}
					type="primary"
				>
					<ArrowLeftOutlined />
					Back
				</Button>
				<Button
					onClick={() => router.push(paths.userEdit(id))}
					danger
					style={{ float: 'right' }}
				>
					<EditOutlined />
					Edit
				</Button>
				<Card style={{ marginTop: 16 }}>
					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Username
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '75%',
						}}
					>
						<Badge status="success" text={user_name} />
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						First Name
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							width: '25%',
							textAlign: 'center',
						}}
					>
						{first_name}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Last Name
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '25%',
						}}
					>
						{last_name}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '50%',
						}}
					>
						Gender
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '50%',
						}}
					>
						{gender ? (
							gender
						) : (
							<Typography.Text type="secondary">
								<QuestionCircleOutlined
									style={{ marginRight: 4 }}
								/>
								Not available
							</Typography.Text>
						)}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '50%',
						}}
					>
						Birthday
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '50%',
						}}
					>
						{dayjs(birthday).format('YYYY-MM-DD')}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Country
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '25%',
						}}
					>
						{country?.name ? (
							country.name
						) : (
							<Typography.Text type="secondary">
								<QuestionCircleOutlined
									style={{ marginRight: 4 }}
								/>
								Not available
							</Typography.Text>
						)}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						City
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '25%',
						}}
					>
						{city ? (
							city
						) : (
							<Typography.Text type="secondary">
								<QuestionCircleOutlined
									style={{ marginRight: 4 }}
								/>
								Not available
							</Typography.Text>
						)}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Phone
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '25%',
						}}
					>
						{!phone ? (
							<Typography.Text type="secondary">
								<QuestionCircleOutlined
									style={{ marginRight: 4 }}
								/>
								Not available
							</Typography.Text>
						) : (
							`${country?.country_prefix || ''}${phone}`
						)}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Newsletter Subscription
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							display: 'flex',
							textAlign: 'center',
							width: '25%',
						}}
					>
						{newsletter_register ? (
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
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Address
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '75%',
						}}
					>
						{address ? (
							address
						) : (
							<Typography.Text type="secondary">
								<QuestionCircleOutlined
									style={{ marginRight: 4 }}
								/>
								Not available
							</Typography.Text>
						)}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Details
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '75%',
						}}
					>
						{details ? (
							details
						) : (
							<Typography.Text type="secondary">
								<QuestionCircleOutlined
									style={{ marginRight: 4 }}
								/>
								Not available
							</Typography.Text>
						)}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Hobbies
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '75%',
						}}
					>
						{hobbies ? (
							hobbies
						) : (
							<Typography.Text type="secondary">
								<QuestionCircleOutlined
									style={{ marginRight: 4 }}
								/>
								Not available
							</Typography.Text>
						)}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Created
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '75%',
						}}
					>
						{dayjs(created_at).format('YYYY-MM-DD')}
					</Card.Grid>

					<Card.Grid
						hoverable={false}
						style={{
							color: 'rgba(0, 0, 0, 0.39)',
							textAlign: 'center',
							width: '25%',
						}}
					>
						Last Updated
					</Card.Grid>
					<Card.Grid
						hoverable={false}
						style={{
							textAlign: 'center',
							width: '75%',
						}}
					>
						{dayjs(updated_at).format('YYYY-MM-DD')}
					</Card.Grid>
				</Card>
			</Col>
		</Row>
	)
}

export default UserShowPage
