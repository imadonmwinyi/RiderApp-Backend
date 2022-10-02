export type ID = string | number

export type ColumnData = string | {
  name: string
  hidden?: boolean
}

export type AnyObject = Record<string, any>