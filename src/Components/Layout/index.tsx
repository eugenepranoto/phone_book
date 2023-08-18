import React, { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

import Header from './Header';
import Box from '../Box';
import Navigation from './Navigation';

type AppContextType = {
    hasMoreData: boolean;
    setHasMoreData: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = React.createContext<AppContextType>({} as AppContextType);

export default function LayoutComponent({ children }: PropsWithChildren): JSX.Element {
    const [ hasMoreData, setHasMoreData ] = useState(true);

    return (
        <AppContext.Provider value={{ hasMoreData, setHasMoreData }}>
            <Header />
            <Box pad="small" style={{ padding: '60px 0 80px 0' }}>
                {children}
            </Box>
            <Navigation />
        </AppContext.Provider>
    );
}
