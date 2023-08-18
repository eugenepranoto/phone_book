import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
    from
} from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import React, { useEffect, useState } from 'react';

export default function ApolloClientProvider({
    children,
}: {
    children: React.ReactNode
}) : JSX.Element{
    const [ client, setClient ] = useState<ApolloClient<NormalizedCacheObject>>();

    useEffect(() => {
        async function init() : Promise<void> {
            const authLink = new ApolloLink((operation, forward) => {
                operation.setContext({
                    headers: {
                        ...operation.getContext().headers,
                        credentials: 'omit',
                    },
                });

                return forward(operation);
            });

            const terminatingLink = new HttpLink({
                uri: `${import.meta.env.VITE_API_URL}/graphql`,
            });


            const cache = new InMemoryCache({
                typePolicies: {
                    Query: {
                        fields: {
                            contact: {
                                keyArgs: [],
                                merge(existing = [], incoming) {
                                    return [ ...existing, ...incoming ];
                                },
                            },
                        },
                    },
                },
            });

            await persistCache({
                cache,
                storage: new LocalStorageWrapper(window.localStorage),
            });

            setClient(new ApolloClient({
                link: from([ authLink, terminatingLink ]),
                credentials: 'include',
                cache,
            }));
        }

        init();
    }, []);

    if (!client) {
        return <p>Initializing app...</p>;
    }
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
