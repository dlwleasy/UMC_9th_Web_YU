export type LoginInfo = {
    name : string
    email : string
    password : string
}

export type singinResponse = {
  status: boolean
  message: string
  statusCode: number
  data: singInDate
}

export type singInDate = {
    id : number
    name : string
    accessToken: string
    refreshTokem: string
}