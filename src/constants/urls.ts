const ROOT_URL = "https://api.amertainvitation.my.id"
const AUTH = ROOT_URL + "/auth"
const CHECK = ROOT_URL + '/check'
const VISITOR = ROOT_URL + '/visitor'
const VISITOR_CREATE = VISITOR + '/create'
const VISITOR_MANUAL = VISITOR + '/manual'
const VISITOR_SCAN = (id : any) => VISITOR + '/scan' + `/${id}`
const VISITOR_COUNT = VISITOR + '/count'

export {
  ROOT_URL,
  AUTH,
  CHECK,
  VISITOR,
  VISITOR_CREATE,
  VISITOR_MANUAL,
  VISITOR_SCAN,
  VISITOR_COUNT
}