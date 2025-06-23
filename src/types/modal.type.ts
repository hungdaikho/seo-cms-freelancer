export interface IModalType {
    key: EModalType,
    open: boolean,
    width?: string,
    className?: string,
    title?: string,
}
export enum EModalType {
    DEFAULT_MODAL = "DEFAULT_MODAL"
}