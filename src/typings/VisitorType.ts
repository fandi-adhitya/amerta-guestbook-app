type VisitorType = {
  message : string
  data : VisitorData[]
}

type VisitorData = {
  id: number
  nama : string
  alamat : string
}

export type {
  VisitorType,
  VisitorData
}