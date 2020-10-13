// tslint:disable-next-line: class-name
interface stateProps {
    token?: string
}
export const getToken = (state: stateProps) => state.token
