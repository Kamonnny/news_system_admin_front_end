export interface State {
  accessToken: string | null
  username: string | null
  email: string | null
}

export const state: State = {
  accessToken: null,
  username: null,
  email: null,
}
