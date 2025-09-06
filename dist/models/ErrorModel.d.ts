/**
 *
 *
 * @export
 * @interface ErrorModel
 */
export interface ErrorModel {
    code: string | number;
    message?: string;
    details?: object | string;
}
