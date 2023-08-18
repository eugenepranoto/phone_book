import {
    DocumentNode,
    MutationHookOptions,
    OperationVariables,
    QueryHookOptions,
    TypedDocumentNode,
    useMutation,
    useQuery,
} from '@apollo/client';
import { toast } from 'react-toastify';


export interface AlertMessageOptions {
    successMessage?: string
    errorMessage?: string
    noAlerts?: boolean
}

export const createMutationHook =
    <TData, TVariables = unknown>(
        query: DocumentNode | TypedDocumentNode<TData, TVariables>
    ) =>
        (options?: MutationHookOptions<TData, TVariables> & AlertMessageOptions) => {
            const { errorMessage, successMessage, noAlerts = false } = options ?? {};

            return useMutation<TData, TVariables>(query, {
                onError(err) {
                    if (options?.onError) options?.onError(err);
                    if (!noAlerts)
                        toast(errorMessage ?? err.message, { type:'error' });
                },
                onCompleted(...args) {
                    if (options?.onCompleted) options?.onCompleted(...args);
                    if (!noAlerts && successMessage !== undefined)
                        toast(successMessage ?? 'Success', { type:'success' });
                },
                ...options,
            });
        };

export const createQueryHook =
    <TData, TVariables extends OperationVariables = Record<string, unknown>>(
        query: DocumentNode | TypedDocumentNode<TData, TVariables>
    ) =>
        (options?: QueryHookOptions<TData, TVariables> & AlertMessageOptions) => {
            const { errorMessage, successMessage, noAlerts } = options ?? {};
            return useQuery<TData, TVariables>(query, {
                onError(err) {
                    if (options?.onError) options?.onError(err);
                    if (!noAlerts)
                        toast(errorMessage ?? err.message, { type:'error' });
                },
                onCompleted(...args) {
                    if (options?.onCompleted) options?.onCompleted(...args);
                    if (!noAlerts && successMessage !== undefined)
                        toast(successMessage ?? 'Success', { type:'success' });
                },
                ...options,
            });
        };

