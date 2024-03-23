type PickNullable<T> = {
	[K in keyof T as null extends T[K] ? K : never]: T[K]
	// Iterate over each property key K in the type T and for each property, check whether null can fit
	// into the type of T[K]
}

type PickNotNullable<T> = {
	[K in keyof T as null extends T[K] ? never : K]: T[K]
}

export type OptionalNullable<T> = {
	// Take all the properties of T that can be null, make them optional, and also ensure that their type no longer includes null
	[K in keyof PickNullable<T>]?: Exclude<T[K], null>
} & {
	// Keep non-nullable properties unchanged
	[K in keyof PickNotNullable<T>]: T[K]
}
