type PickNullable<T> = {
	[K in keyof T as null extends T[K] ? K : never]: T[K]
}

type PickNotNullable<T> = {
	[K in keyof T as null extends T[K] ? never : K]: T[K]
}

export type OptionalNullable<T> = {
	[K in keyof PickNullable<T>]?: Exclude<T[K], null>
} & {
	[K in keyof PickNotNullable<T>]: T[K]
}
